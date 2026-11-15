# Repository layout

`public/` is the current static website. Keeping its HTML, styles, modules, data and assets together preserves the public URL tree and all browser-relative imports. Source article data and generated outputs remain distinguishable by their existing names and generation headers. This organization does not change the framework or production host.

The repository root contains development resources: `scripts/`, `tests/`, `docs/`, `prompts/`, `.agents/skills/` and the `react-site/` page renderer. `figures/` retains two retired authoring prototypes; the calculation model consumed by the website is at `public/figures/solo-model.mjs`. The original one-line `README.ms` is preserved in `docs/history/`.

## Local preview

From the repository root:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory public
```

Open `http://localhost:8080/`, not `/public/`. Python's static server does not apply Apache `.htaccess` rules; localized entry files and direct `reading/fa/` / `reading/en/` files can be inspected directly. Apache hosting continues to use the existing language and reading rewrites.

## Editing and generation

Edit `public/portfolio.js`, `public/solutions-data.mjs`, `public/posts/` and the relevant styles/modules. Keep native Persian and English in sync. Install the pinned tooling once with `npm ci --prefix react-site` (Node 22.22.0 or newer), then run generation from the repository root:

```sh
node scripts/generate-entry-pages.mjs
node scripts/generate-blog-runtime.mjs
node scripts/generate-sitemap.mjs
```

Generated HTML, bundles, summaries, article JSON, sitemap and robots all stay inside `public/`. Do not edit generated output as a substitute for its source.

```sh
node scripts/test-site.mjs
node scripts/generate-entry-pages.mjs --check
node scripts/generate-blog-runtime.mjs --check
node scripts/generate-sitemap.mjs --check
node scripts/check-blog-skills.mjs
node scripts/check-design-skills.mjs
python3 -B -m unittest discover -s tests -p test_package_runtime.py
```

## Publication boundary

Upload the **contents** of `public/` to the existing host document root. Preserve its managed HTTPS configuration and merge the marked rules from `public/.htaccess`. Keep the article template and upload archives out of production as described in [deployment](deployment.md).

For explicit releases, filenames remain public-relative:

```sh
python3 scripts/package_runtime.py --output /tmp/site-release.zip index.html portfolio.js portfolio.css
```

The example packages only those three files; a real release must include every changed dependency. ZIP entries are `index.html` and so on, never `public/index.html`. Runtime packaging retains the existing allowlist, fresh timestamps and Unix 0644 modes.

`react-site/public/legacy/` and `react-site/build/client/` are ignored, generated preview output. The preview adapter reads the same production sources in `public/`. Build and verify it separately with the commands in [its README](../react-site/README.md); do not deploy the partial React preview over production.
