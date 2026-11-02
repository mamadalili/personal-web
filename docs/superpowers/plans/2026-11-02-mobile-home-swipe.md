# Mobile Home blog swipe

The author requested a simple touch carousel on mobile Home, with no paging buttons or nested scrolling. Keep desktop six-post groups and tablet four-post groups. Mobile now shows one full-width article at a time, using native horizontal scrolling and snap. The main document retains vertical scrolling.

The baseline at 390px had two articles per group, two visible paging buttons and a rail with 884px client height versus 945px scroll height. This reproduced both the duplicate controls and hidden vertical overflow.

Use the existing renderer and React migration component. On phones, flatten the group wrappers for CSS layout so native one-card swiping also works before hydration. Calculate page positions from the actual card, retain group semantics and stable links, remove mobile controls from the mounted DOM, hide the native horizontal scrollbar and never intercept vertical wheel input. Let the flex line size to its content instead of setting an active-group height. Preserve keyboard arrows, focus/visible-article restoration, native fa/en, reduced motion and disposal.

Design: the existing article card and banner stay intact. ENERGY 2 / RHYTHM 2 / MOTION 1. Motion is the reader's direct swipe, without autoplay or decorative transitions. No new library or illustration.

Verify 390px and narrow phone layouts, actual touch swiping and vertical movement, no buttons/scrollbar/vertical rail overflow, native English, resize restoration and unchanged desktop controls. Run site tests, migration typecheck/build/output checks, then one independent read-only review. Publish only changed runtime files with Unix 0644 ZIP modes; keep hosting SSL directives intact. Save the complete change in Git and verify the live site.

## Verification

- `node scripts/test-site.mjs`: 93 passed, zero failures.
- React package: typecheck and static build passed; `npm test`: 21 passed, zero failures.
- Chrome at 390px, Persian: one card per slide, zero paging buttons, no document overflow; rail client and scroll heights both 473px. A simulated touch swipe settled on the next article at -305px. A vertical touch gesture over that card moved the document from 1037px to 1222px while the rail stayed at scrollTop 0 and horizontal position -305px.
- English at 320px: one card per slide, no paging buttons, no document or vertical rail overflow; LTR keyboard navigation moved to the second article. Resizing to 1280px restored its six-card group and track focus. The desktop next button advanced to the next group; 820px retained four cards and two buttons.
- The React static preview hydrated to 29 one-card groups at 390px, with no paging buttons, vertical rail overflow or console errors. Its native touch gesture also moved the rail. These are browser-emulated touch checks, not a physical-device test.
- Independent read-only review reported no findings and reran the seven Home blog tests successfully.

The scoped anti-slop delivery gate passes: the change adds no claims, assets, decorative effects or color/font changes; banners, excerpts, native links, focus styles and the existing identity remain. Native direct manipulation supplies the motion. The checked phone layouts fit without nested vertical scrolling; desktop/tablet controls retain their real behavior. This gate covers the changed carousel, not an audit of unrelated pages.
