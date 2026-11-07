"""Deploy tracked static runtime files through verified explicit FTPS."""
import argparse
from datetime import datetime, timezone
from email.utils import format_datetime
import ftplib
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import ssl
import subprocess
import sys
import time
import urllib.request

SITE = 'https://mrdalili.ir/'
MARKER = 'site-release.json'


def is_runtime(name):
    if not re.fullmatch(r'[A-Za-z0-9_./-]+', name) or any(p in ('', '.', '..') for p in name.split('/')):
        return False
    p = PurePosixPath(name)
    if len(p.parts) == 1:
        return not name.startswith('.') and name != 'blog-template.html' and (p.suffix in ('.html', '.css', '.js', '.mjs') or name in ('robots.txt', 'sitemap.xml'))
    if re.fullmatch(r'assets/(?:blog/(?:previews/)?|companies/)[a-z0-9-]+\.webp', name):
        return True
    if re.fullmatch(r'assets/posts/(?!article-template-)[a-z0-9-]+-[a-f0-9]{16}\.json', name):
        return True
    if re.fullmatch(r'assets/brand/[a-z0-9-]+\.svg', name):
        return True
    if re.fullmatch(r'posts/[a-z0-9-]+\.mjs', name) or re.fullmatch(r'images/[a-z0-9-]+\.(?:webp|jpg)', name):
        return True
    return name in ('assets/anatomy/iso-kit.mjs', 'assets/anatomy/iso.css', 'assets/anatomy/LICENSE', 'figures/solo-model.mjs', 'fonts/OFL.txt', 'fonts/Vazirmatn.ttf', 'fonts/Vazirmatn.woff2')


def file_order(name):
    if '/' in name:
        return (0, name)
    if name in ('blog-data.mjs', 'blog-summaries.mjs', 'portfolio.js'):
        return (2, name)
    if name.endswith('.html'):
        return (3, name)
    if name in ('robots.txt', 'sitemap.xml'):
        return (4, name)
    return (1, name)


def collect_files(root, tracked):
    root = Path(root).resolve()
    result = {}
    for name in sorted(set(tracked), key=file_order):
        if not is_runtime(name):
            continue
        source = root / name
        if not source.is_file() or not source.resolve().is_relative_to(root) or any(p.is_symlink() for p in [source, *source.parents] if p != root):
            raise ValueError('Runtime input must be an existing regular file within the checkout')
        result[name] = source.read_bytes()
    if len(result) > 4096 or sum(map(len, result.values())) > 80 * 1024 * 1024:
        raise ValueError('Release exceeds the reviewed static-site limits')
    return result


def read_marker(ftp):
    data = io.BytesIO()
    try:
        ftp.retrbinary('RETR ' + MARKER, data.write)
    except ftplib.error_perm as error:
        if str(error).startswith('550'):
            return {}
        raise
    try:
        marker = json.loads(data.getvalue())
        return marker['files'] if isinstance(marker.get('files'), dict) else {}
    except (ValueError, KeyError, TypeError, AttributeError):
        return {}


def remote_stamp(ftp, name):
    try:
        response = ftp.sendcmd('MDTM ' + name)
        return response[4:] if re.fullmatch(r'213 [0-9]{14}', response) else None
    except ftplib.error_perm:
        return None


def promote(ftp, name, data, commit):
    parent = PurePosixPath(name).parent
    path = ''
    for part in parent.parts:
        path = part if not path else path + '/' + part
        try:
            ftp.mkd(path)
        except ftplib.error_perm:
            pass  # An existing directory is normal; STOR still checks actual write access.
    temporary = name + '.deploying-' + commit[:12]
    ftp.storbinary('STOR ' + temporary, io.BytesIO(data))
    ftp.sendcmd('SITE CHMOD 0644 ' + temporary)
    ftp.rename(temporary, name)


def publish(ftp, files, commit, verify):
    if not re.fullmatch(r'[a-f0-9]{40}', commit) or any(not is_runtime(name) for name in files):
        raise ValueError('Invalid release identity or runtime path')
    previous = read_marker(ftp)
    records = {}
    for name, data in files.items():
        digest = hashlib.sha256(data).hexdigest()
        old = previous.get(name, {})
        same = False
        if isinstance(old, dict) and old.get('sha256') == digest and old.get('mtime'):
            try:
                same = ftp.size(name) == len(data) and remote_stamp(ftp, name) == old['mtime']
            except ftplib.error_perm:
                pass
        if not same:
            promote(ftp, name, data, commit)
            verify(name, data)
        records[name] = {'sha256': digest, 'bytes': len(data), 'mtime': remote_stamp(ftp, name)}
    marker = {'commit': commit, 'published_at': datetime.now(timezone.utc).isoformat(), 'files': records}
    payload = (json.dumps(marker, separators=(',', ':')) + '\n').encode()
    promote(ftp, MARKER, payload, commit)
    verify(MARKER, payload)
    return marker


def verify_public(name, expected, previous_stamp=None):
    headers = {'Cache-Control': 'no-cache', 'User-Agent': 'personal-web-deploy'}
    if previous_stamp and re.fullmatch(r'[0-9]{14}', previous_stamp):
        before = datetime.strptime(previous_stamp, '%Y%m%d%H%M%S').replace(tzinfo=timezone.utc)
        headers['If-Modified-Since'] = format_datetime(before, usegmt=True)
    for attempt in range(3):
        try:
            request = urllib.request.Request(SITE + name, headers=headers)
            with urllib.request.urlopen(request, timeout=30, context=ssl.create_default_context()) as response:
                if response.status == 200 and hashlib.sha256(response.read()).digest() == hashlib.sha256(expected).digest():
                    return
        except (OSError, ValueError):
            pass
        if attempt < 2:
            time.sleep(2 ** attempt)
    raise RuntimeError('Public bytes or cache verification failed for ' + name)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    tracked = subprocess.check_output(['git', 'ls-files', '-z'], cwd=root).decode().split('\0')
    files = collect_files(root, [p for p in tracked if p])
    commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip()
    if not {'index.html', 'site-config.mjs', 'blog-summaries.mjs'}.issubset(files):
        raise ValueError('Incomplete production checkout')
    if args.dry_run:
        print(json.dumps({'commit': commit, 'file_count': len(files), 'bytes': sum(map(len, files.values())), 'files': list(files)}, indent=2))
        return
    host, user, password = (os.environ.get(key, '') for key in ('DEPLOY_FTPS_HOST', 'DEPLOY_FTPS_USER', 'DEPLOY_FTPS_PASSWORD'))
    if not all((host, user, password)):
        raise ValueError('The three deployment secrets must be configured before publication')
    with ftplib.FTP_TLS(context=ssl.create_default_context(), timeout=30) as ftp:
        ftp.connect(host, 21)
        ftp.auth()
        ftp.login(user, password)
        ftp.prot_p()
        ftp.cwd('/')
        identity = io.BytesIO()
        ftp.retrbinary('RETR site-config.mjs', identity.write)
        if b'https://mrdalili.ir' not in identity.getvalue():
            raise ValueError('FTP root is not the existing production site')
        previous = read_marker(ftp)
        def verify(name, data):
            old = previous.get(name, {})
            stamp = old.get('mtime') if isinstance(old, dict) and name.endswith(('.html', '.js', '.mjs', '.css')) else None
            verify_public(name, data, stamp)
        marker = publish(ftp, files, commit, verify)
        print('Published commit ' + marker['commit'] + ' with ' + str(len(marker['files'])) + ' runtime files.')


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        # FTP/server errors can contain account data; never echo them into CI logs.
        print('Deployment failed (' + type(error).__name__ + '). Check secrets, FTPS access and public verification.', file=sys.stderr)
        sys.exit(1)
