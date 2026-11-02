"""Build card/portrait exports and WOFF2 without changing the original artwork."""
import argparse
import json
import re
from pathlib import Path

from PIL import Image, ImageOps
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]


def image_export(source, target, width, check=False):
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        image.thumbnail((width, 8192), Image.Resampling.LANCZOS)
        if check:
            with Image.open(target) as result:
                if result.size != image.size:
                    raise ValueError(f'Unexpected preview dimensions: {target.name}')
            if target.stat().st_size >= source.stat().st_size:
                raise ValueError(f'Export is not smaller: {target.name}')
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            image.save(target, 'WEBP', quality=84, method=6)


def build(check=False):
    manifest = json.loads((ROOT / 'assets/blog/previews/manifest.json').read_text(encoding='utf-8'))
    before = after = 0
    for name in manifest['covers']:
        if not re.fullmatch(r'assets/blog/[a-z0-9]+(?:-[a-z0-9]+)*\.webp', name):
            raise ValueError('Invalid source cover')
        source = ROOT / name
        target = ROOT / 'assets/blog/previews' / source.name
        image_export(source, target, manifest['width'], check)
        before += source.stat().st_size
        after += target.stat().st_size
    for kind, width in [('avatar', 256), ('profile', 512)]:
        image_export(ROOT / 'images/myphoto.webp', ROOT / f'images/myphoto-{kind}-v1.webp', width, check)
    original = TTFont(ROOT / 'fonts/Vazirmatn.ttf')
    if check:
        with TTFont(ROOT / 'fonts/Vazirmatn.woff2') as exported:
            if original.getBestCmap() != exported.getBestCmap():
                raise ValueError('The WOFF2 export lost glyph coverage')
    else:
        original.flavor = 'woff2'
        original.save(ROOT / 'fonts/Vazirmatn.woff2')
    original.close()
    print(json.dumps({'covers': len(manifest['covers']), 'original_bytes': before, 'preview_bytes': after, 'checked': check}))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    build(parser.parse_args().check)
