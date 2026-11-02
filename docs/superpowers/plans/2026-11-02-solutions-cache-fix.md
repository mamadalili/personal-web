# Solutions cached-entry compatibility

The reported blank page was reproduced on the live canonical Strategy URL. Its cached HTML referenced the earlier portfolio script and omitted both new selector stylesheet and art script; the updated portfolio runtime threw `ReferenceError: renderHomeCapabilityArt is not defined`. The origin already served current HTML, while the browser reused its older copy. Reloading the entry restored the page.

Make the Solutions module import and initialize its own renderer and wait for its stylesheet, including when called by an older portfolio runtime. Keep the existing classic renderer compatible with module import and with the React content adapter. Preserve the current design and content. HTML/CSS/JS/MJS responses should revalidate; deploy the cache header block without replacing hosting HTTPS directives.

The two regression tests first failed: zero art figures from an import-only mount, and no stylesheet preparation function. The fix must make both pass. Verify an actual older HTML shell and an older portfolio caller against current module assets in the browser, then the ordinary public links in fa/en and on a phone. Run the site suite and the React adapter/build/output checks, obtain an independent review, publish and compare exact runtime bytes, then save to main under the author's approved workflow.

## Verification

The compatibility fixture served the actual older HTML and previous portfolio caller alongside the fixed current module. It rendered four 300px art cards with the correct four-column CSS, despite having no classic artwork script tag; there were no browser console errors. This verifies the failing file combination, rather than only a fresh entry page.

Independent review found that a stylesheet which had already failed could leave the loader waiting on a past event. A regression reproduced it; the loader now creates an observable fresh link, removes stale links after success, and rejects/removes failed owned links before retry. Coverage also verifies request failure followed by a successful new attempt. The final site suite passes 97 tests; React typecheck, build and 21 output checks pass. The reviewer confirmed no remaining important findings.

Production verification compared all nine public runtime files without cache-busting query parameters: HTTP 200, exact local bytes, and `Cache-Control: no-cache, max-age=0, must-revalidate`. The hosting configuration was backed up and its original 855 bytes were preserved exactly before appending the cache block. HTTP still redirects to trusted HTTPS while preserving the Solutions URL and language parameter.

All four public Solutions routes were followed successfully, each with four artworks and complete content. English at 390px retained two columns and no horizontal overflow. The Persian live page was restored after verification.

The scoped anti-slop gate retains the approved design and content without new decoration or claims. This change addresses asset ownership, error handling and cache consistency; it does not restyle the cards or unrelated pages.
