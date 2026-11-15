# Bilingual page renderer

This package builds static Persian and English versions of Home, Contact and Solutions from the shared content in `../public/`. The entry routes are `/fa/` and `/en/`.

```sh
npm ci
npm run typecheck
npm run build
npm test
```

Run `npm run dev` for local development. The static preview is written to `build/client/`. Edit source data in `../public/` and rebuild to update the pages.
