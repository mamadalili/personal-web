# Repository layout

The production site is static: Apache serves the contents of `public/` at the domain root. React renders shared components during the build. Reading a page does not require a React download or a Node process on the host.

| To change… | Edit here |
| --- | --- |
| Persian and English portfolio copy | `src/content/cv.mjs` (CV, employers and projects), `site.mjs` (pages and navigation), `contact.mjs` (contact channels) |
| Portfolio markup, icons and browser interactions | `src/portfolio/view.mjs`, `icons.mjs` and `browser.mjs` |
| Shared navigation and coastal illustration | `src/components/site-chrome.mjs`; labels and destinations come from `src/content/site.mjs` |
| Entry page assets, loading recovery and HTML composition | `src/templates/` and `scripts/generate-entry-pages.mjs` |
| Editorial content, solution details, images and styles | `public/posts/`, `public/blog-data.mjs`, `public/solutions-data.mjs`, `public/assets/` and the public stylesheets |
| React Router layouts and interactions | `react-site/src/` (separate preview; [supported routes](../react-site/README.md)) |

Author browser modules in `public/` when they are also public URLs. The home cards and work stories keep their HTML views separate from event handlers. The two renderers import these modules and the portfolio sources directly. Generated files such as `public/portfolio.js`, `runtime-*.mjs`, localized entry HTML and `reading/` should be rebuilt from source.

## Editing and generation

From the repository root, using Node 22.22 or newer:

```sh
npm ci
npm run build
npm run check
npm test
```

`npm run dev` serves the production files locally, including language selection, article URLs and older CV bookmarks. `npm run check:react` separately checks types, builds the React routes and tests their output. Both use the root lockfile. For skill integrity and release tooling:

```sh
node scripts/check-blog-skills.mjs
node scripts/check-design-skills.mjs
python -B -m unittest discover -s tests -p test_package_runtime.py
```

## Publication boundary

Release changed public files using [the packaging instructions](deployment.md). The package uses public-relative paths and excludes host configuration. Keep source, Node dependencies, the article template and the React preview off the host.
