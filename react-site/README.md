# React migration package

Phase 1 is the bilingual Contact pilot. Architecture and remaining phases are in [the migration guide](../docs/react-migration.md). The original website remains at the repository root.

```sh
npm ci
npm run typecheck
npm run build
npm test
```

Serve `build/client/` with a static HTTP server. `/fa/contact/` and `/en/contact/` contain actual rendered HTML. There is no production Node process. `npm run dev` provides the Vite development server.

Build preparation generates Contact data from selected existing declarations and copies only public runtime files/assets into `public/legacy/`. Do not edit generated data or assets: update their current source and rebuild. Dependencies, generated assets, framework types and build outputs are excluded from Git.

The pilot is intentionally noindex. Other menu entries use the generated legacy pages. Do not upload this partial preview over the production document root; complete the later migration phases and cutover checks first.
