# React migration

The author selected a phased React migration with prebuilt HTML and supplied a Vite/React folder-structure reference. This supersedes the legacy no-framework authoring rule only within `react-site/`. Existing copy, imagery, native fa/en, motion and rounded glass navigation remain the design baseline.

## Architecture decision

Use React, TypeScript, Vite and React Router Framework Mode. Configure `ssr:false` **with explicit prerender paths** so the deliverable is static HTML plus browser assets, not a Node production server or an empty client-rendered shell. Node/npm are build tools. The official [pre-rendering guide](https://reactrouter.com/how-to/pre-rendering) documents this mode; the [maintained template](https://github.com/remix-run/react-router-templates/tree/main/default) supplies the configuration conventions. Versions are verified against npm and locked in the migration package.

```text
react-site/
  src/
    root.tsx                  document, metadata and shared shell
    routes.ts                 explicit routes
    components/layout/        header, glass navigation and ambient scene
    components/ui/            signature, title and existing icons
    features/contact/         first converted page and route
    hooks/                    document-visibility lifecycle
    content/                  typed access to generated legacy data
    lib/                      route/language helpers
    styles/                   migration-specific CSS only
  scripts/                    build preparation and static-output checks
  public/legacy/              generated compatibility assets/pages, ignored
  build/client/               static deliverable, ignored
  package.json
  package-lock.json
  vite.config.ts
  react-router.config.ts
  tsconfig.json
```

No empty `services`, global-state `context` or generic `utils` directory is created. Locale is encoded in the route. React Router owns the document entry, replacing the plain Vite template's `App.jsx`/`main.jsx` boilerplate. Add shared components only when real callers need them.

## Phases and gates

1. **Foundation + Contact pilot:** real fa/en Contact pages, shared header/navigation, preserved portrait/channels/employer logos and motion; static HTML, typecheck and browser evidence. This is the current scope.
2. **Home + Solutions:** move their existing content and scenes, preserve the carousel, pinned desktop stages and mobile flow.
3. **CV + Work Stories:** migrate real data, tabs and role links without changing reviewed content.
4. **Blog:** reuse the article data and pure models; migrate the shared frame and then each widget with native-language and lifecycle checks. Read the existing content-production and blog skills.
5. **Cutover:** finalize fa/en canonical URLs, old query/fragment redirects, sitemap/robots, 404s, cache policy and measured performance; deploy a reviewed complete static build and retain a rollback.

Each phase must show functioning outputs, not folder placeholders. Complete only phase 1 in this change; later phases remain explicit work.

## Compatibility during phase 1

Contact is served at `/fa/contact` and `/en/contact`; `/` is the Persian Contact preview. Other menu entries open generated copies of the existing site at `/legacy/*.html?lang=…`. Those remain legacy pages, including their own Contact links. This compatibility boundary is temporary, not a claim that the whole site has migrated. The existing files are the single source for Contact's channels, names, employer logos and copy; a build adapter reads their declarations instead of maintaining competing data.

The pilot is `noindex` and robots-disallowed. Canonical links retain the current Contact URLs until cutover. The phase-1 artifact is a local review preview, not a production-host replacement. Runtime folders are copied from an allowlist; authoring skills, private files, Git metadata, tests, docs and archives are excluded.

## Verification

Phase 1 passed 86 existing site tests and four static-output checks for native fa/en HTML, all five supplied contact destinations, six employer references, language links, required assets, recursive compatibility module dependencies and exclusion of authoring/private material. Typecheck and static build passed. Browser verification covered desktop fa/en, keyboard language switching, the contact anchor, the 320px mobile layout, bottom navigation, reduced motion and Home/Blog compatibility loading. No hydration or console errors were observed. See the implementation plan for the evidence ledger. No speed improvement is claimed without measurements.
