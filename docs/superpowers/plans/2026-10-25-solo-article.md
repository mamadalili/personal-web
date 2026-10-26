# Solo business interactive article implementation plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Keep implementation in this session and use a fresh read-only final reviewer.

**Goal:** Publish the second native Persian/English interactive article, inspired by Kooshiar's Solo experience, with original writing and a substantive Anatomy figure.

**Architecture:** Extend the existing static article renderer with reusable opportunity cards and a capacity-workbench block. A pure model drives the readout and isometric mechanism. Preserve the immutable skill; copy only the framework-free runtime and MIT license to public assets.

**Tech stack:** Existing HTML/CSS/ES modules, Node tests, Anatomy SVG core; no service, framework or new package runtime.

**Spec:** The user's request to inspect https://kooshiar.com/solo, adapt it into this site's bilingual template, use Anatomy and update GitHub. The first AI-market article remains published. This is an independently authored adaptation, not a translation of the source's full protected text or drawings.

## Global constraints

- Native fa/en for every visitor string; logical RTL/LTR layout; accent `#1c0998`; black bold CTA labels.
- Preserve the fixed rounded liquid-glass navigation and existing pages.
- No decorative numbering, leading-zero labels, invented earnings, professional credentials or guaranteed timelines.
- Explicitly label all capacity inputs and assumptions as educational. Do not imply estimates are market data.
- Read Anatomy, craft, motion and the dial-indicator example. Figure scope: one bench mechanism with at least 40 purposeful solids, shading and geometric depth order.
- All UI verification through `cua_repl`; no headless/CDP scripts. Optional external gallery/log publishing is outside scope.
- Save to the existing main branch and push per the user's standing authorization, after verification and review.

## Design decisions

Use six capability starting points and twelve original offers: commerce, content, design, systems, teaching and domain knowledge. Each shows a buyer, bounded deliverable, proof, AI contribution, human responsibility and a concrete first experiment. These are editorial proposals, not a demand/rate survey.

The Anatomy object is a small workshop press with a paper feeder, preparation platen, output tray and load dial. Controls change weekly hours, requested orders and preparation delegated to AI. The fixed educational assumptions per order are 75 preparation minutes, 25 review minutes and 20 communication minutes. Delegation affects preparation only. Capacity is floor(available minutes / human minutes per order); completed plus waiting equals requested. The same model sets the paper counts, carriage position and dial.

Use ordinary readable sections rather than forced full-screen slides. Keep contextual internal links, visible sources, glossary, a short delivery-roadmap disclosure and an interpretation quiz. Improve the renderer's source-note contract so an essay need not inherit the first article's market-specific warning.

## Review focus

- Zero time, zero demand and invalid/non-finite inputs yield truthful, finite output or an explicit error.
- More automation never removes review/client time or invents demand.
- Filters work for Persian/English spelling and no-result searches, without mutating article data.
- Dialog focus/Escape, range keyboard access, reduced motion and language disposal remain usable.
- Both articles stay published and all language URLs enter the sitemap.

## Tasks

- [x] Write failing pure-model/filter tests; implement `soloCapacity` and `filterOpportunities` in `figures/solo-model.mjs`; run the tests.
- [x] Build `figures/solo-workbench.mjs` from real Anatomy primitives with a recorded scene, then verify geometry/order in Node. Copy selected runtime assets and their license, leaving the source skill unchanged.
- [x] Add `blog-solo.mjs` and `blog-solo.css` for `opportunities` and `capacity-rig`; connect render/mount/abort to `blog.mjs`. Add localized per-article `sourceNote`.
- [x] Author `posts/solo-business.mjs` and its opportunity data in native fa/en, with attribution and primary-source notes. Register it, update docs/prompt/README and regenerate the sitemap.
- [x] Run scoped tests, skill integrity, syntax, geometry and crawl checks. Verify the actual pages in both languages, desktop/mobile, moving/reduced-motion states and 4× details with permitted UI tools.
- [x] Obtain fresh read-only review, address material findings and complete final verification. Final integration follows the standing main-branch commit/push instructions; the Git history records the released revision.

## Verification results

- `node scripts/test-site.mjs`: 27 passed, including zero/invalid model cases, optional links, and a deliberately reversed painter-order control that must fail.
- `node scripts/check-blog-skills.mjs --global`: all 173 pinned source files match in the project and installed skill; selected public assets/license and companion workflow match.
- `node scripts/build-solo-figure.mjs --check`: 75 true solids, nine boundary states, zero failures with the browser ranks frozen during audit. Generated order is current.
- `node scripts/generate-sitemap.mjs --check`: 24 localized URLs; both published articles included and the template excluded.
- Syntax and authored-file whitespace checks passed.
- CUA: native fa/en, desktop and 390px mobile fit; ranges with Home/End and pointer presets; zero/full hours; reset; filters/search including Arabic yeh; no results/clear; detail dialog Escape/focus return; keyboard tabs; roadmap disclosure; quiz; language remount and reduced motion.
- Accessible numeric announcements are separate from per-frame visuals and settle after a quiet delay. Abort cancels timers and frames.
- Desktop, phone and 4× mechanism details inspected. Ordinary browser settings restored. Template demo and first-article regression views passed; Blog lists exactly the two published articles.
- Fresh read-only review identified and rechecked optional-target, announcement and frozen-order validation fixes; no material findings remain.
