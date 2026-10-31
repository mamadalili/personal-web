# Home Art Portals Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan in the current session. Do not delegate implementation.

**Goal:** Apply the supplied capsule composition to the Home hero while retaining the site's identity and real solution links.

**Architecture:** Keep `portfolio.js` as the shell and bilingual content owner. Add a small synchronous, framework-free SVG art renderer loaded only by Home and one scoped Home stylesheet. Reuse existing hidden-page motion handling and the current Blog carousel lifecycle.

**Tech Stack:** Static HTML, CSS, JavaScript, inline SVG, existing Node test runner.

**Spec:** ../specs/2026-10-31-home-art-portals.md

## Constraints

- Native fa/en and mirrored RTL/LTR; no decorative numbering.
- Preserve `#1c0998`, `#CCFF00`, portrait, monogram, existing motion scene and navigation.
- Four desktop capsules and two mobile columns; readable text and visible keyboard focus.
- Use canonical `strategy.html`, `execution.html`, `technology.html` and `ai-tools.html` links.
- No added runtime dependency, remote image, framework or hosting change.

## Review focus

- Long English and Persian titles must fit without clipping.
- At narrow widths no card, scene or glass navigation may overflow the viewport.
- Keyboard focus must reveal links if the Blog stage covers the pinned view.
- New motion must stop for reduced motion and hidden documents.
- Preserve Blog-only next scroll stage and its existing carousel behavior.

## Implementation

- [x] Add `home-hero-art.js` for four unique abstract SVG compositions and `home-hero.css` for the scoped layout, surfaces and motion.
- [x] Update `portfolio.js` Home markup and both Home entry files' asset loading; preserve the existing introduction and canonical destinations, using concise native navigation copy on the capsules.
- [x] Update the superseded Home layout rule in `AGENTS.md` and relevant README descriptions.
- [x] Run syntax checks and the existing site suite. Use real browser checks for layout, navigation, languages, focus and motion rather than implementation-mirroring CSS tests.
- [x] Review the final diff and prepare the verified preview and screenshot for handoff.

Delivery uses the author's standing authorization to commit and push to the existing GitHub repository.

## Execution record

- Initial state: clean `main`, `f926cce`, origin `mamadalili/personal-web`.
- The author's reference and existing authorization specify the design and GitHub destination; continue without a separate approval gate.
- Validation: both JavaScript syntax checks and all 64 existing site tests passed. `git diff --check` is clean.
- Browser evidence: native fa/en, mirrored capsule order, 1280×720 and 1440×900 desktops, 390×844 and 320×740 phones, visible keyboard focus, canonical links, top/bottom glass navigation and the existing overlapping Blog stage. No horizontal overflow at tested widths.
- Reduced-motion emulation at 320px stops both capsule entry and material animation. It was cleared after verification; the final preview uses normal motion and the original viewport. The existing visibility-change handler is retained and the new motion uses its shared pause class.
- SVG artwork is local, decorative and unnumbered; generated IDs have no collisions. No framework, image download or hosting change was introduced.
