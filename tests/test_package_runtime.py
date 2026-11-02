import importlib.util
import stat
import tempfile
import unittest
from datetime import datetime
from pathlib import Path
from zipfile import ZipFile

script = Path(__file__).resolve().parents[1] / 'scripts' / 'package_runtime.py'


class RuntimePackageTests(unittest.TestCase):
    def test_release_time_bytes_and_unix_permissions(self):
        self.assertTrue(script.exists(), 'A reusable release packager must own timestamps')
        spec = importlib.util.spec_from_file_location('package_runtime', script)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'index.html').write_bytes(b'<main>Current Home</main>')
            archive = root / 'release.zip'
            module.package_runtime(root, ['index.html'], archive, datetime(2026, 11, 2, 17, 0, 0))
            with ZipFile(archive) as bundle:
                info = bundle.getinfo('index.html')
                self.assertEqual(info.date_time, (2026, 11, 2, 17, 0, 0))
                self.assertEqual(info.create_system, 3)
                self.assertEqual(stat.S_IMODE(info.external_attr >> 16), 0o644)
                self.assertEqual(bundle.read(info), b'<main>Current Home</main>')
            for invalid in ['../private.js', '.htaccess', 'docs/notes.js']:
                with self.assertRaises(ValueError):
                    module.package_runtime(root, [invalid], archive)
            with self.assertRaises(ValueError):
                module.package_runtime(root, ['index.html'], root / 'index.html')
            self.assertEqual((root / 'index.html').read_bytes(), b'<main>Current Home</main>')
            cover = root / 'assets/blog/previews/example-fa.webp'
            cover.parent.mkdir(parents=True)
            cover.write_bytes(b'public optimized image')
            module.package_runtime(root, ['assets/blog/previews/example-fa.webp'], archive)
            with ZipFile(archive) as bundle:
                self.assertEqual(bundle.read('assets/blog/previews/example-fa.webp'), cover.read_bytes())
                self.assertEqual(stat.S_IMODE(bundle.getinfo('assets/blog/previews/example-fa.webp').external_attr >> 16), 0o644)
            for invalid in ['assets/../../private.js', 'assets/posts/private.json', 'assets/blog/previews/../../private.webp', 'images/private.webp', 'fonts/private.ttf']:
                with self.assertRaises(ValueError):
                    module.package_runtime(root, [invalid], archive)


if __name__ == '__main__':
    unittest.main()
