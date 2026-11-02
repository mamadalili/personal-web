"""Package explicitly named root runtime files with fresh dates and Unix 0644 modes."""
import argparse
import hashlib
import json
import stat
from datetime import datetime
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo


def package_runtime(root, names, destination, released_at=None):
    root = Path(root).resolve()
    destination = Path(destination).resolve()
    stamp = released_at or datetime.now()
    if stamp.year < 2000:
        raise ValueError('Release timestamp must be contemporary')
    if not names or len(names) != len(set(names)):
        raise ValueError('Provide unique runtime filenames')
    files = []
    for name in names:
        relative = Path(name)
        if relative.name != name or relative.suffix.lower() not in {'.html', '.css', '.js', '.mjs'}:
            raise ValueError('Only explicitly named root runtime files may be packaged')
        source = root / relative
        if source.is_symlink() or source.resolve().parent != root or not source.is_file():
            raise ValueError('Runtime file must exist within the release root')
        if destination == source.resolve() or (destination.exists() and destination.samefile(source)):
            raise ValueError('Archive destination must not overwrite a runtime input')
        files.append((name, source.read_bytes()))
    manifest = []
    with ZipFile(destination, 'w') as archive:
        for name, data in files:
            info = ZipInfo(name, date_time=stamp.timetuple()[:6])
            info.create_system = 3
            info.external_attr = (stat.S_IFREG | 0o644) << 16
            info.compress_type = ZIP_DEFLATED
            archive.writestr(info, data)
            manifest.append({'file': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
    return manifest


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', required=True, type=Path)
    parser.add_argument('files', nargs='+')
    args = parser.parse_args()
    manifest = package_runtime(Path(__file__).resolve().parents[1], args.files, args.output)
    print(json.dumps(manifest, indent=2))
