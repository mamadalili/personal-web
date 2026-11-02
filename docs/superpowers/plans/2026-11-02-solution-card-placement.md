# Solution card placement

The author requested simpler four-way links on Home and the existing animated capsule treatment in place of the plain selector above every canonical Solution page. Implement this directly in the existing legacy renderer and the staged React package. Keep the four destinations, native copy, RTL/LTR order, lime strokes, selected-page semantics, glass navigation and Home swipe carousel.

Home uses compact light links with the existing meaningful icons and titles. Solutions keeps the original four SVG materials and capsule silhouette, with a readable dark scrim and a visible current-page label. Four columns on desktop become two on phones. This is a placement and styling change, not a content rewrite or React production cutover.

ENERGY 2 / RHYTHM 2 / MOTION 2 for the Solutions selector; Home shortcuts use only direct hover/focus feedback. The supplied artwork identifies the four branches. Existing hidden-page and reduced-motion handling remain. A dedicated `solution-portals.css` owns the moved treatment, while `home-hero.css` retains Home composition and compact shortcuts.

- [x] Update legacy and React renderers and page asset dependencies.
- [x] Verify both languages, four selected states, real links, keyboard focus, phone fit and Home carousel preservation.
- [x] Run existing site tests and React typecheck/build/static checks; obtain one independent read-only review.
- [x] Publish the required legacy assets and verify trusted HTTPS file equality. Save the complete change on main using the author's approved workflow.

## Evidence

The site suite passed 93 tests. React typecheck and static build passed, with 21 static/output tests passing, including the moved artwork and localized selected states. The first build encountered a Windows directory lock held by our old preview server; stopping that server and serving from the parent directory resolved it without source changes.

Chrome confirmed four 78px-high Home links at desktop width, no Home capsule artwork, and working navigation between all four standalone Solutions. At 320px English, Home remained two columns with at least 70px-high targets and no horizontal overflow. The phone blog retained its swipe-only state. Solutions fit both 320px English and 390px Persian in two columns, with real current-page text and no document overflow. At 1280px, all four Persian titles share the same top coordinate. Reduced motion reports `animation-name: none` and a zero-duration artwork transition; keyboard focus has a visible solid outline. React client navigation moved from Strategy to Execution, and generated artwork IDs remained unique.

Measured text contrasts: navy on white 15.70:1, light copy on the dark card surface 14.15:1, navy on lime 13.36:1. The independent read-only review found no actionable issues and checked all eight generated fa/en selectors for unique SVG IDs and valid references.

All ten release files returned HTTP 200 over trusted HTTPS and matched local bytes. Production was checked at desktop and phone widths. The package has Unix 0644 file modes and excludes hosting SSL directives.

The scoped anti-slop gate passes: no new visual assets, claims, ordinals, libraries or decorative controls were introduced. Existing artwork is reused at the requested destination, its scrim protects the text, the selected label communicates a real state, and Home links retain the site's colors with less visual weight. Focus, destinations, mobile fit and motion preferences were exercised. This covers the changed Home links and Solutions selector, not unrelated pages.
