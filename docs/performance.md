# Runtime assets

Production still uses the root application. `react-site/` is the staged migration preview; performance work must not accidentally publish that preview.

`blog-data.mjs` and `posts/` remain the article sources. Home and the archive import only `blog-summaries.mjs`. Article pages fetch a single content-hashed JSON export from `assets/posts/`; all article fields and both native languages are preserved. The generated index must be deployed with the data files it names. Keep older hashed files on the host so previously opened pages continue to work.

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

## Verified production comparison — 2 November 2026

The same foreground Chrome viewport loaded Persian Home with caching disabled before and after this release. All transferred sizes include protocol response overhead, as reported by Chrome's loading-finished events.

| Measurement | Before | After |
| --- | ---: | ---: |
| Same-origin resources | 68 | 31 |
| Transferred bytes | 2,815,808 | 634,219 |
| Full article source modules on Home | 38 | 0 |
| JavaScript transferred bytes | 325,127 | 49,713 |
| Image transferred bytes | 2,325,187 | 450,477 |

Home transferred 77.5% fewer bytes in this comparison. This is a payload measurement, not a claim that every connection becomes 77.5% faster. Server compression was already active before the change.

All 113 published runtime/assets matched their release SHA-256 hashes over HTTPS. Conditional requests using the preceding release's modification time returned current 200 responses for changed HTML, CSS and JavaScript; host-managed runtime revalidation remained intact. Original banners, the source portrait and all 29 complete bilingual articles were retained.
