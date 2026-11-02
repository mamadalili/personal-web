# Shared Home and Solutions cards

The author clarified and confirmed that the same four tall illustrated cards belong on both Home and the top of Solutions. Keep their artwork, native titles, descriptions, meaningful icons, destinations, proportions, motion and responsive grid identical. Only Solutions adds its truthful current-page label and selected outline. Preserve the existing Home copy, blog swipe carousel, glass navigation and cache/deployment fixes.

Use a single legacy card renderer exported by the existing Solutions module, which already owns artwork and stylesheet loading. Home loads that module and mounts the cards without remounting the blog; guard language changes and detached roots. The React migration uses one shared CapabilityCards component in both routes and the same stylesheet. ENERGY 2 / RHYTHM 2 / MOTION 2 follows the approved existing capsules, with hidden-page and reduced-motion handling.

Remove obsolete compact-link CSS, update the static Home contract and compare the shared card output across both routes in each language. Run site tests, React typecheck/build/output checks and browser verification, including native fa/en, desktop/phone, navigation and reduced motion. Obtain an independent review, package runtime files with the tested timestamp/0644 packager, verify ordinary and conditional public responses, then save to main under the author's approved workflow.

## Verification

The revised Home/equality checks failed against the earlier compact output, then passed after implementation. The final site suite passes 97 tests; React typecheck, static build and 22 output tests pass. The output comparison checks the complete native card markup and artwork in both languages after removing only the current-page state.

Browser measurements confirmed the same titles, descriptions, icons, SVG paths and dimensions between Home and Solutions. Desktop cards measure 223 by 300px; at 320px English, both routes use matching 134 by 270px cards in two columns with no document overflow. Reduced motion reports no artwork animation. React Home renders four artworks with no console errors.

Independent review identified the asynchronously inserted cards missing the original focus listeners and an undersized mobile loader reservation. Home now delegates `focusin` from its card section; keyboard return from Blog moved the document from 753px to 10px and kept the cards above the Blog deck. Loader reservations match the 532px and 556px mobile grids. Short desktop viewports at 700px and below use ordinary flow; 680px was checked, and the complete card grid fits the 720px pinned layout. The reviewer reported no outstanding code findings after these fixes.

All nine released files match local bytes over trusted HTTPS with contemporary dates and the existing revalidation policy. Conditional requests carrying the prior release date return 200 and the updated content. The same four cards were compared again on the ordinary live Home and Solutions URLs, with matching content and geometry (to 0.01px to ignore transient transform rounding).

The scoped design gate preserves the approved artwork, colors, native copy and motion. No new claims, numbering, images or libraries were added. The current-page badge communicates actual navigation state, focus remains visible, loading has reserved space, and the shared stylesheet handles phone layout and reduced motion. This covers the shared card change rather than an audit of unrelated pages.
