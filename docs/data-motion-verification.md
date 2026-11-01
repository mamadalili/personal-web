# Data motion: scoped delivery check

Verified 2026-11-01. Scope: the new figures in six existing articles and the shared renderer integration. This is not an audit of untouched site pages or a fresh review of previously published market observations. The author selected anti-slop during implementation.

## Hard Gate — PASS

| Item | Evidence |
| --- | --- |
| R-02: relevant, native copy | New fa/en titles, controls, units, evidence notes and details inspected in all six articles. Original article text and covers remain unchanged. |
| R-03: responsive layout | All six figures inspected in fa/en at 390px, plus representative figures at 320px, 768px, 1265px and 1366px. No page horizontal overflow; tested controls meet 44px targets. Figures stack within narrow article columns, including tablet sidebars. |
| R-17/18/36/38: truthful content | Model tests preserve existing 100/119 time indices, 80/15 person-hours and Epoch observations. Capital One converts reported 5 hours to 300 minutes before comparing with 3 minutes. Percentage differences are arithmetic, with noninteger results displayed approximately at whole-percent precision. Source limitations remain visible. No invented outcomes, endorsements or customers. |
| R-23/24: authorized assets and real destinations | The author explicitly requested motion based on the references. New figures use source-linked data and original HTML/SVG; reference footage and demo statistics are not shipped. Every new source anchor resolves; the market ledger opens at the linked source. |
| R-25: contrast | Computed text ratios: muted #46506b on #f3f5fa 7.35:1; navy #172144 on #f3f5fa 14.39:1; black on white 21:1; indigo #1c0998 on #f3f5fa 12.49:1. Control border #6b7490 on white is 4.64:1. |
| R-26/27: real behavior and failure boundaries | Selection, replay, pause and scrubbing exercised in the browser. Invalid models/missing evidence are rejected; unrelated articles remain intact. Existing article loading/not-found behavior is preserved. |
| R-32/39: keyboard, semantics and motion preferences | Native buttons and range input, named group/controls, exact readable values, source links, solid visible focus and keyboard Home/End/arrow operation verified. Reduced-motion emulation disables playback and retains static bars plus working record selection. |
| R-33: source changes | Feature authored in repository source files; no script rewrites of page markup or CSS, no framework conversion. |
| R-35: executed verification | Scoped site suite: 69 tests passed. Syntax checks, source-package integrity and sitemap check passed. Actual browser checks cover six articles in both languages, rather than relying on the test runner alone. |
| R-37: direction | Existing `DESIGN.md` supplies the site identity; `MOTION.md` records figure direction, data semantics and motion decisions. |
| R-40: performance mechanisms | Fixed SVG viewBox/dimensions, transform-based bar movement, one finite clock per figure, offscreen/hidden gating and abort cleanup. No third-party runtime, bitmap/video payload, new font or artificial loading delay added. |

## Purpose-Gate — PASS

| Item | Reason |
| --- | --- |
| R-01/06: color and type | Reuse the approved indigo/navy, restrained lime selection and site typography for continuity and readable data. |
| R-04/07/08/09/10/12/13: restraint | No generic icon set, background grid, decorative button arrows, promotional badges, extra glass layer, broad shadows or ambient glow. The document shape means a handoff; axis ticks encode the actual logarithmic scale. |
| R-14/19/22: content and motion | Different compositions serve paired time comparisons, cost magnitudes and categorical handoffs. Movement reveals the relation, then rests. No unrelated physical mechanism or decorative figure is required. |

## Liveliness — PASS

Direction: evidence-led interactive article figures, ENERGY 2 / RHYTHM 2 / MOTION 2. The focal point is the quantity difference or selected handoff. Structural whitespace separates figure, controls and evidence; indigo/navy data with one lime selection accent carries the established identity. One-shot motion and user-controlled replay support reading without an endless loop.

## Craftsmanship and quality locks — PASS

| Item | Evidence |
| --- | --- |
| C-1/3 and R-05/14/20/30/31: composition | Six content-selected figures, not one mandatory widget on every post. Comparisons, logarithmic magnitudes and handoffs have different explanatory jobs. `MOTION.md` records the question and evidence for each. |
| C-2/4 and R-11/15/16/21/29: usable controls and identity | Functional native labels, restrained radii, existing light theme/palette, no new generic marketing promises. Mobile navigation retains its bottom placement. |
| C-5: data lineage | Six-projection tests check source membership, native strings, unchanged original sections/covers and canonical values. Render tests check escaping and language isolation. No video example metric is reused. |
| Lifecycle | Deterministic clock test covers hidden/offscreen pause, no hidden elapsed-time jump, reduced motion, finite completion and disposal. Browser playback advanced, paused, stopped offscreen, and remounted to exactly one figure/control set after language switching. |
| Market compatibility | Nine original market figures remain. Inserted content no longer shifts their source association because chart sections are selected and resolved by identity. Epoch source navigation and ledger expansion were exercised. |
| Independent review | Read-only review inspected model, renderer, styles, integration and targeted tests; no Critical, Important or Minor findings. It did not claim video fidelity or independently recheck prior publisher observations. |

Manual screen-reader use, field Web Vitals and a Lighthouse score were not measured. Native semantics, keyboard behavior and computed contrast were checked within the stated scope.
