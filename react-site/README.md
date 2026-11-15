# Bilingual React preview

Home, Contact and the four Solutions pages have React routes under `/fa` and `/en`. Each renders its content and reading direction into the initial HTML. CV, work stories and articles open their production URLs on the same local server.

Run these from the repository root:

```sh
npm ci
npm run dev:react       # Vite, with live editing
npm run check:react     # types, prerender and route tests
npm run preview:react   # serve the built routes alongside public assets
```

The preview imports portfolio data and components from `../src/`. Styles, art and native page links use the existing `../public/` tree directly. Only the preview's own files are built into `build/client/`. Its robots policy excludes it from indexing; production is built with the root `npm run build`.
