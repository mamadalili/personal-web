# React foundation and Contact pilot implementation plan

> **For agentic workers:** Use `superpowers:executing-plans` for inline implementation; request one independent read-only review at the end.

**Goal:** Complete phase 1 of the author's phased React/SSG migration with a real bilingual Contact preview.

**Spec:** `docs/react-migration.md` and the existing `DESIGN.md`/`AGENTS.md` visual and content constraints.

**Architecture:** An isolated `react-site/` package uses React Router + Vite to prerender actual fa/en HTML. An adapter prepares shared legacy content/assets without executing the old browser runtime. Existing navigation targets remain usable under a generated compatibility prefix.

**Constraints:** Native fa/en and RTL/LTR; approved indigo/lime and rounded glass nav; original portrait and supplied channels/logos; no content rewriting, invented claims, API/backend or production cutover. No empty context/services scaffolds.

- [x] Write/run failing static-output tests before implementation.
- [x] Add exact package versions, lockfile, TypeScript/Vite/router config and explicit prerender routes.
- [x] Add a bounded legacy-content/public-asset preparation script; port shared layout and Contact into React components.
- [x] Pass static-output tests, typecheck/build and the legacy scoped suite; inspect both languages, desktop/mobile layout, keyboard navigation, reduced motion and JS-independent HTML. Review visibility-listener cleanup in source.
- [x] Obtain a read-only review, fix actual defects and save preview evidence. Keep later phases and production cutover explicit.

## Execution ledger

Baseline: original 86 tests passed. Native worktree creation could not target this nested repository in the chat; a Git worktree on `codex/react-ssg-phase-1` was created within the authorized workspace instead. No unrelated infrastructure repository was changed.

## Phase-1 evidence

- The first static-output run failed because no HTML had been generated. After implementation, native fa/en Contact HTML, five contact channels, six employer references and asset/link checks passed.
- Independent review found missing compatibility article modules. A new recursive relative-import test first failed on the missing post modules and the solo figure model. The asset allowlist was corrected; the rebuilt suite passed 4/4. Retired figure workbenches and authoring/private files remain excluded. The reviewer independently rechecked the fix and reported no remaining actionable source findings.
- `npm run typecheck`, `npm run build`, `npm test` and `git diff --check` passed. The existing `node scripts/test-site.mjs` suite passed 86/86 in the migration worktree.
- Browser checks used the built static files: native fa/en switching updated document language/direction/title; keyboard Enter switched back; no hydration/console errors were reported. At 320px the document width was 320px and the glass navigation was at the bottom. The contact anchor reached its section. Reduced-motion emulation disabled the ambient animation. Temporary emulation was cleared.
- Compatibility Home and Blog both loaded all 29 published article links. The Persian React Contact preview and a desktop screenshot were retained for review.

Only Contact is migrated. Home, Solutions, CV, Work Stories, articles and production cutover remain in later phases.
