# Lime site refresh implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans for inline implementation; obtain a separate read-only review before publishing.

**Goal:** One Solutions experience, a full-width Home blog stage and a more editorial Blog index, with restrained `#CCFF00` accents and ambient motion.

**Architecture:** Keep the framework-free bilingual site. The Solutions navigation and Home CTA enter `strategy.html`, which already has the shared four-branch selector; the old `solutions.html` becomes a compatible redirect. Keep the other three detail routes. Extract Blog-index rendering into its own module, and adapt the existing carousel to six posts per desktop page, four on tablets and two on phones.

**Tech Stack:** Static HTML, CSS and framework-free JavaScript modules; Node for scoped tests.

**Spec:** The latest requested changes: centre and embolden all four solution options with lime strokes; remove output stars and process bullets; replace diagonal CTA arrows; keep the first Home view, then give Blog its own scroll stage, followed by CV/Contact. Add subtle drifting lime particles and glints to page backgrounds. No invented articles: the three current posts occupy the available grid until new posts are published.

**Constraints:** Native fa/en and RTL/LTR; preserve the top-centred 60px/56px liquid-glass navigation; black bold CTA labels; no decorative numbering; reduced motion and keyboard access; direct main publication under standing user authorization.

- [x] Test the canonical Solutions link, six-card pagination, native editorial filtering and sitemap exclusion of the duplicate hub.
- [x] Unify Solutions entry and selector, simplify output/process marks and refresh CTA styling.
- [x] Add a shared decorative ambient layer with pointer events disabled, visibility pause and reduced-motion handling.
- [x] Make Home’s blog deck full-width, responsive and separate from the later CV/Contact section.
- [x] Build the Blog-index feature, archive, category selection and search using real published posts.
- [x] Verify fa/en desktop and phone views, scroll staging, selection, motion fallback and disposal; run the scoped suite, integrity and sitemap checks.
- [x] Obtain fresh read-only review and resolve its carousel focus and tall-grid scrolling findings.

Publication: commit the verified changes, push main and compare the remote revision under the standing user authorization.

Review focus verified: language/prefix-preserving canonical navigation; no fake or duplicated posts; keyboard and breakpoint focus; readable multirow scrolling; reduced motion and nonblocking decorations.
