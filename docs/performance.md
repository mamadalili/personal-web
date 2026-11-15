# Runtime assets

Production uses the static application in `public/`. Runtime paths in this guide are relative to `public/`; run authoring commands from the repository root. The separate renderer produces its own local preview.

`blog-data.mjs` and `posts/` remain the article sources. Home and the archive import only `blog-summaries.mjs`. Both archive languages and every article now ship as readable HTML before JavaScript runs. Article interactions fetch a single content-hashed JSON export from `assets/posts/`; all article fields and both native languages are preserved. The generated index must be deployed with the data files it names. Keep older hashed files on the host so previously opened pages continue to work.

After editing or publishing an article:

```sh
node scripts/generate-blog-runtime.mjs
node scripts/generate-sitemap.mjs
node scripts/generate-blog-runtime.mjs --check
node scripts/generate-sitemap.mjs --check
node scripts/test-site.mjs
```

The runtime test compares every complete generated article with its source and catches stale exports. Do not edit generated summaries or JSON files directly.

After adding or changing a banner, rebuild technical previews with a Python environment containing `scripts/asset-requirements.txt`:

```sh
python scripts/optimize_assets.py
python scripts/optimize_assets.py --check
```

This exports 768px-wide WebP previews, 256px/512px portrait derivatives and WOFF2 with the same font character coverage. It never overwrites the source portrait, original article covers or TTF. Home and archive cards use previews; article hero banners use originals. Preserve the font's existing OFL license.

Publish explicit files with `scripts/package_runtime.py`. It accepts root runtime files plus the supported generated public assets, uses current release timestamps and Unix 0644 file permissions, and excludes host configuration. Publish data/assets before the entries that reference them. Preserve host-managed HTTPS and runtime revalidation rules. Verify changed-file conditional requests against the previous release's modification time.

Measure production cold loads in the same foreground browser and viewport with cache disabled, then restore normal caching. Record resource counts and transferred bytes separately from network-dependent load times. Do not call a payload reduction a Lighthouse score or a Core Web Vitals result.

The same generator writes `blog.html` and `reading/{fa,en}/`. Ship the affected reading files and both archives when publishing. Only content-hashed JSON and explicitly versioned portraits receive a one-year immutable cache lifetime. WOFF2 revalidates after a day. Keep HTML, readable routes and unversioned scripts revalidatable. When installing the reading rewrite rules, merge the marked block into the live root configuration and preserve cPanel's own directives.
