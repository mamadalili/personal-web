# Compact homepage blog carousel

> **For agentic workers:** Use superpowers:executing-plans in this session, followed by a fresh read-only review.

**Goal:** Give the homepage a larger blog area with two compact recent posts in its initial carousel view, smaller CV/Contact cards and a glass navigation bar about one fifth shorter.

**Architecture:** Keep the existing pinned capability hero and below-fold card deck. Replace the static blog preview with a module that reads the published bilingual registry, groups posts in pairs and mounts a native scroll-snap carousel. A pure wheel-gesture helper handles vertical wheel pagination while releasing ordinary page scroll at the ends. The homepage layout gets a dedicated stylesheet; footer sizing changes remain shared across pages.

**Spec:** The user's request in this conversation; existing `AGENTS.md` design, native fa/en and publication rules. “First view” means the carousel's own initial view. The current two published posts fill one page; further pages appear when more articles are published, without duplicate or fabricated posts.

**Files:** `home-blog.mjs`, `home-blog.css`, `portfolio.js`, `portfolio.css`, `index.html`, `landing.html`, `tests/home-blog.test.mjs`, design documentation.

## Constraints and review focus

- Two posts per page: side by side on desktop, compact stacked cards on mobile.
- Published registry order and article language links stay correct; templates/drafts never appear.
- Buttons, keyboard, horizontal touch/trackpad and vertical mouse wheel support paging. No autoplay.
- One deliberate vertical wheel gesture advances one page; horizontal touch/trackpad scrolling stays native. Outward boundary scrolling and modifier-wheel zoom remain native.
- Old language mounts dispose listeners, observers and timers; reduced motion avoids smooth movement.
- No stretched parent link may block the post links or carousel controls.
- Preserve liquid-glass appearance and top-center position, five nav links and at least 44px touch targets. Baseline heights measured: 75px desktop, 70.5px at 390px; targets roughly 60px and 56px.
- Keep home cards unnumbered and CTA labels bold/black. Preserve the existing hero flow.

## Steps

- [x] Write failing behavior tests for publication grouping, wheel thresholds, momentum, boundaries and modifiers; implement the pure helpers.
- [x] Implement the mounted carousel and connect it to Home with safe language cleanup.
- [x] Enlarge the blog column, compact the quick links and shorten shared glass navigation.
- [x] Verify actual fa/en desktop/mobile and a temporary multi-page fixture; run scoped tests and relevant checks.
- [x] Complete read-only review and final verification. Integration follows the user's standing instruction to commit and push directly to main; Git history records the integration result.

## Evidence

- The five new behavior tests were first run against the missing module and failed, then passed with the implementation. Final `node scripts/test-site.mjs`: 32 passed, zero failed.
- Syntax checks passed for `portfolio.js` and `home-blog.mjs`. `node scripts/check-blog-skills.mjs` confirmed the pinned package/workflow; `node scripts/generate-sitemap.mjs --check` verified all 24 existing localized URLs. `git diff --check` passed.
- Actual Persian and English posts render from the published registry, with native language article links. The current two posts fill one group, with disabled navigation arrows and ordinary wheel scrolling.
- A temporary five-post local fixture verified multiple groups: vertical wheel paging, native horizontal scrolling, buttons, RTL/LTR arrow keys, Home/End, last-page scroll release, language remount cleanup and mobile resizing. Reduced-motion mode was exercised. The fixture and its fake entries were removed after verification.
- At 1280px, the blog section is 844px wide; its two cards are about 239px high. CV/Contact occupy a narrower column and are about 212px high, versus about 286px before. The pinned hero and below-fold deck remain intact.
- At 390px, both actual Persian post cards fit together in the carousel's initial view (roughly y=231–619 in an 844px viewport). English also fits. No document overflow at 1280px, 390px or 320px.
- Shared glass navigation measures 60px on desktop (previously 75px) and 56px at 390px (previously 70.5px). At 320px it is 54px with 44px minimum link targets; the glass finish and top-center position are preserved.
- Fresh read-only review found one small-text contrast issue. Darkened the relevant copy and verified at least 4.95:1 against the applicable light surfaces; focused re-review resolved the finding with no new issues. Final screenshots and computed browser styles confirm the updated colors and geometry.
