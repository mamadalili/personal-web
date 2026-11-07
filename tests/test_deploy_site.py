import importlib.util
import io
import json
import tempfile
import unittest
from unittest.mock import MagicMock, patch
from urllib.error import HTTPError
from pathlib import Path

spec = importlib.util.spec_from_file_location('deploy_site', Path(__file__).parents[1] / 'scripts/deploy_site.py')
deploy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(deploy)


class FakeFTP:
    def __init__(self, files=None):
        self.files = dict(files or {})
        self.writes = []
        self.commands = []

    def retrbinary(self, command, callback):
        name = command.removeprefix('RETR ')
        if name not in self.files:
            raise deploy.ftplib.error_perm('550 Missing')
        callback(self.files[name])

    def storbinary(self, command, stream):
        name = command.removeprefix('STOR ')
        self.files[name] = stream.read()
        self.writes.append(name)

    def mkd(self, path):
        return path

    def sendcmd(self, command):
        self.commands.append(command)
        if command.startswith('MDTM '):
            if command[5:] not in self.files:
                raise deploy.ftplib.error_perm('550 Missing')
            return '213 20261107120000'
        return '200 OK'

    def size(self, path):
        if path not in self.files:
            raise deploy.ftplib.error_perm('550 Missing')
        return len(self.files[path])

    def rename(self, old, new):
        self.files[new] = self.files.pop(old)
        self.writes.append(new)


class DeploymentTests(unittest.TestCase):
    def test_public_allowlist_excludes_source_configuration_and_unrelated_content(self):
        for name in ['index.html', 'blog.mjs', 'assets/anatomy/iso-kit.mjs', 'assets/blog/a-fa.webp', 'assets/posts/a-0123456789abcdef.json', 'posts/a.mjs', 'figures/solo-model.mjs', 'fonts/Vazirmatn.woff2', 'images/myphoto.webp']:
            self.assertTrue(deploy.is_runtime(name), name)
        for name in ['.htaccess', '.git/config', '.env', '.github/workflows/deploy.yml', '.agents/SKILL.md', 'docs/a.md', 'react-site/build/client/index.html', 'blog-template.html', 'WEB.zip', 'figures/solo-workbench.mjs', 'assets/blog/previews/manifest.json', '../index.html', '/index.html', 'assets/../x.js', 'images/a\nDELE x.webp']:
            self.assertFalse(deploy.is_runtime(name), name)

    def test_selection_requires_existing_regular_files_and_keeps_dependencies_first(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            for name in ['blog.mjs', 'index.html', 'assets/blog/x.webp']:
                p = root / name
                p.parent.mkdir(parents=True, exist_ok=True)
                p.write_bytes(b'test')
            result = deploy.collect_files(root, ['index.html', 'assets/blog/x.webp', 'blog.mjs', 'docs/a.md'])
            self.assertEqual(list(result), ['assets/blog/x.webp', 'blog.mjs', 'index.html'])
            with self.assertRaises(ValueError):
                deploy.collect_files(root, ['missing.js'])

    def test_retries_missing_or_changed_remote_files_and_retains_unrelated_files(self):
        ftp = FakeFTP({'unrelated/private.php': b'keep'})
        files = {'assets/blog/a.webp': b'image', 'index.html': b'new page'}
        verified = []
        result = deploy.publish(ftp, files, 'a'*40, lambda name, data: verified.append(name))
        self.assertEqual(ftp.files['unrelated/private.php'], b'keep')
        self.assertEqual(verified, list(files) + ['site-release.json'])
        self.assertEqual(ftp.writes[-1], 'site-release.json')
        self.assertEqual(result['commit'], 'a'*40)
        self.assertFalse(any('.deploying-' in name for name in ftp.files))
        ftp.writes.clear()
        deploy.publish(ftp, files, 'b'*40, lambda name, data: None)
        self.assertEqual(ftp.writes, ['site-release.json.deploying-bbbbbbbbbbbb', 'site-release.json'])
        del ftp.files['index.html']
        ftp.writes.clear()
        deploy.publish(ftp, files, 'c'*40, lambda name, data: None)
        self.assertIn('index.html', ftp.writes)

    def test_symlink_cannot_send_a_file_outside_the_checkout(self):
        with tempfile.TemporaryDirectory() as tmp:
            outside = Path(tmp) / 'outside.webp'
            outside.write_bytes(b'not part of the site')
            root = Path(tmp) / 'checkout'
            target = root / 'images' / 'x.webp'
            target.parent.mkdir(parents=True)
            try:
                target.symlink_to(outside)
            except OSError:
                self.skipTest('Symlink creation is unavailable on this host')
            with self.assertRaises(ValueError):
                deploy.collect_files(root, ['images/x.webp'])

    def test_failed_public_check_never_publishes_success_marker(self):
        ftp = FakeFTP()
        def fail(name, data):
            raise RuntimeError('public mismatch')
        with self.assertRaises(RuntimeError):
            deploy.publish(ftp, {'index.html': b'page'}, 'd'*40, fail)
        self.assertNotIn('site-release.json', ftp.files)

    def test_untrusted_marker_cannot_add_files_to_transfer(self):
        ftp = FakeFTP({'site-release.json': b'{invalid'})
        deploy.publish(ftp, {'index.html': b'page'}, 'e'*40, lambda name, data: None)
        marker = json.loads(ftp.files['site-release.json'])
        self.assertEqual(list(marker['files']), ['index.html'])

    def test_public_verification_retries_stale_cache_then_requires_exact_bytes(self):
        def response(data):
            manager = MagicMock()
            manager.__enter__.return_value.status = 200
            manager.__enter__.return_value.read.return_value = data
            return manager
        stale = HTTPError('https://mrdalili.ir/blog.mjs', 304, 'Not Modified', {}, None)
        with patch.object(deploy.urllib.request, 'urlopen', side_effect=[stale, response(b'old'), response(b'new')]) as request, patch.object(deploy.time, 'sleep'):
            deploy.verify_public('blog.mjs', b'new', '20261102155210')
            self.assertEqual(request.call_count, 3)
            headers = {key.lower(): value for key, value in request.call_args.args[0].header_items()}
            self.assertEqual(headers['if-modified-since'], 'Mon, 02 Nov 2026 15:52:10 GMT')

    def test_public_verification_fails_after_bounded_retries(self):
        response = MagicMock()
        response.__enter__.return_value.status = 200
        response.__enter__.return_value.read.return_value = b'wrong bytes'
        with patch.object(deploy.urllib.request, 'urlopen', return_value=response) as request, patch.object(deploy.time, 'sleep'):
            with self.assertRaisesRegex(RuntimeError, 'Public bytes or cache verification failed'):
                deploy.verify_public('index.html', b'expected')
            self.assertEqual(request.call_count, 3)


if __name__ == '__main__':
    unittest.main()
