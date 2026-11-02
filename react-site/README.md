# React migration package

Phases 1 and 2 provide native bilingual Contact, Home and the four Solutions. Architecture and remaining phases are in [the migration guide](../docs/react-migration.md). The original website remains at the repository root.

```sh
npm ci
npm run typecheck
npm run build
npm test
```

Serve `build/client/` with a static HTTP server. Home is at `/fa/` and `/en/`; Contact is at `/{lang}/contact/`; Solutions use `/{lang}/solutions/{strategy|execution|technology|ai-tools}/`. All contain actual rendered HTML. The root route previews Persian Home. There is no production Node process. `npm run dev` provides the Vite development server.

Build preparation derives reviewed copy, trusted decorative SVG, minimal published-post summaries and the existing pure wheel rules from their current sources. It copies only public runtime files/assets into `public/legacy/`. Do not edit generated data or assets: update their current source and rebuild. Dependencies, generated assets, framework types and build outputs are excluded from Git.

The preview is intentionally noindex. CV, Work Stories, the blog index and articles use the generated legacy pages. With JavaScript disabled, Home still exposes native article links and horizontal browsing; scripted pager controls appear only after hydration. Do not upload this partial preview over the production document root; complete the later migration phases and cutover checks first.
