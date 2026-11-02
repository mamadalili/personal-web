# Home and Solutions React migration implementation plan

> Execute inline with superpowers:executing-plans; one independent read-only review of the complete change.

**Goal:** Complete phase 2 with real bilingual prerendered Home and all four Solutions, preserving reviewed content, art, navigation and interaction.

**Spec:** `docs/react-migration.md`, `DESIGN.md` and `AGENTS.md`; the author requested continuing the staged migration after reviewing phase 1.

**Architecture:** Continue the existing isolated React/Vite/React Router package. Extend the build adapter to expose the existing approved Home/Solutions copy, trusted decorative SVG markup and minimal published-post summaries. React owns the page DOM and carousel lifecycle. Extract the existing pure wheel rules into generated build-time code rather than shipping the old browser application or maintaining another wheel algorithm.

**Constraints:** No content rewrite, invented claims, banner changes, new dependency or production cutover. Preserve native fa/en, four capsule destinations, indigo/lime, desktop pinned stages and normal phone flow, compact glass navigation, hidden/reduced motion and keyboard access. CV, Work Stories and article pages stay explicitly legacy.

**Files:** Extend `scripts/prepare-public.mjs`, `src/lib/routing.ts`, shared header/nav/document, routes and static-output checks. Add `features/home/` (page, carousel, pure grouping/anchor helpers), `features/solutions/` (page and route), `components/ui/` (trusted art, shared CTA/link), and the phase-2 regression checks.

## Tasks

- [x] Write/run failing checks for native Home/solution HTML, complete article summaries, real internal destinations and carousel model boundaries.
- [x] Extend the adapter and shared routing/shell; prerender `/`, `/fa`, `/en`, both Contact pages and all eight localized solution paths.
- [x] Port Home and its 6/4/2-post carousel, preserving native horizontal scrolling, direction-aware keys, deliberate wheel paging only with the full track visible, breakpoint anchor/focus restoration and cleanup.
- [x] Port the four solution details, selected controls, FAQ, evidence and shared collaboration CTA; keep links in React for migrated pages and native legacy links elsewhere.
- [x] Pass typecheck/build, migration tests and the 86 legacy tests; verify built output in the browser on desktop/phone, languages, carousel controls, solution selection, anchors, reduced motion and hydration.
- [x] Obtain independent read-only review, resolve findings and record evidence. Publish only the isolated phase-2 branch; production cutover remains phase 5.

## Review focus

- Resize while a later article or control has focus: preserve the article/group and a usable focus target.
- RTL versus LTR, rapid wheel momentum, a tall grid and edge pages: preserve native scrolling and do not skip content.
- Client navigation between Home, Contact and different solutions: body classes, title, language, active navigation, artwork IDs and cleanup must follow the current route.
- Static delivery without JavaScript: actual headings, article links and solution/FAQ text must already exist in HTML.
- Evidence links with CV tabs, article slugs or fragments: retain their meaning and current language.

## Execution ledger

Base: `7cfb88701b0d5f9f2b93920459bd8399d4e20560`. Existing isolated linked worktree reused on `codex/react-ssg-phase-2`; no unrelated infrastructure repository changes. The phase-1 layout and content adapter are the shared interfaces consumed by both pages.

Pre-flight: Home and Solutions share page URLs, the header/nav document state and generated data; those interfaces are extended before either page mounts. The Contact paths and data contract remain supported.

## Verification and review

- Initial phase-2 tests failed 14/14 on missing routes/data/model; after implementation, the combined migration suite passed 18/18.
- Review: independently confirmed native HTML, all article links in source order, unique artwork IDs, evidence params and listener/observer/timer cleanup. It found two important defects and one static-control affordance issue.
- Focus regression, browser RED→GREEN: desktop group 2, third article (`team-capacity`), resized to 390px. Before the fix focus became BODY; afterward the same article retained focus in group 5 of 15. A separate phone group-2 Previous button test enlarged to 1280px: the new first group's Previous button was disabled and focus safely moved to the track. Restoration now runs after React commits group/control states.
- Incomplete translation regression, unit RED→GREEN: a published post with a null fa/en side previously threw while preparing every route. Summary selection now reuses `homePostPages`, preserving its exclusion of incomplete translations and empty slugs.
- Static controls regression, RED→GREEN: enabled script-only buttons were present without JavaScript. They now appear only after readiness, with layout space reserved. All native article links remain in static HTML. The finding was treated as an interaction defect and fixed.
- Additional cover-parity regression, RED→GREEN: text-only or unsafe cover metadata now passes through the existing `coverFor` validator, retaining article text without rendering an invalid image.
- Final commands passed: `npm run typecheck`, `npm run build`, `npm test` (21/21) and `node scripts/test-site.mjs` (86/86).
- Browser: native fa/en Home; RTL ArrowLeft and LTR ArrowRight; buttons; focus regressions; emulated wheel paging with a fully visible track and native vertical release when outside that boundary. Four solution selectors updated route, title, active state and body classes; changing language retained the solution. FAQ opened natively and collaboration led to Contact. At 320px Solutions had four equal 136px controls, lime borders, no horizontal overflow and bottom glass navigation; at 390px Home articles were stacked with full-width banners. Reduced motion disabled scene animations. Visibility-hook cleanup was reviewed in source; no physical-device gesture claim is made.

The reviewer left live browser behavior to the parent; the checks above cover that boundary. Later migration phases and production deployment remain outside this change.
