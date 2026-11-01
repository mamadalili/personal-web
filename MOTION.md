# Article data motion

## Direction

Read these as evidence-led interactive figures for readers of the existing bilingual personal site. Design dials: ENERGY 2 / RHYTHM 2 / MOTION 2. Keep the light article frame, Vazirmatn, indigo/navy identity and a small lime selection accent. Existing author instructions override generic motion recipes.

The author supplied seventeen short motion references. They inform timing, continuity and readable state changes; their footage, artwork, prompts and demo statistics are not website assets or evidence. The original files and review contact sheets are not part of the public repository.

| Reference | Useful pattern | Content boundary |
| --- | --- | --- |
| 1 | Particles settle into a coherent symbol | Do not scatter data into an unrelated logo. |
| 2 | Monthly/yearly state change | Compare matching periods and units before animating prices. |
| 3 | A gallery of motion examples | Choose a relevant pattern; a gallery is not an article requirement. |
| 4 | A brief names the starting state, action and ending state | Write the reader question and final state before implementation. |
| 5 | Bars draw on before emphasis appears | Bar length must retain the actual scale; do not invent growth. |
| 6 | A control transitions into a completion state | Show completion only for a real action, or label the demonstration. |
| 7 | A funnel connects incoming visits and outcomes | Use only when both quantities and the conversion definition exist. |
| 8 | Weight changes express emphasis | Essential prose stays readable and still. |
| 9 | Payment state changes on a card | An illustration must not impersonate a real payment action. |
| 10 | A number settles into its final value | Intermediate frames are not observations; retain exact values separately. |
| 11 | A path reveals stops on a map | Geographic data must exist; do not invent locations or expansion. |
| 12 | One card reveals another side | Both sides need useful content and a keyboard/touch alternative. |
| 13 | A ring closes toward a defined goal | Requires a real numerator, denominator and meaningful completion. |
| 14 | A selected report opens from a dock | Open the selected evidence; do not fabricate dashboard metrics. |
| 15 | A sketch resolves into a finished interface | Explain an actual transformation, not a fake implementation result. |
| 16 | Dragging resolves into a scheduled event | Needs real or explicitly planned dates; no invented schedule. |
| 17 | Notifications consolidate into a readable summary | Do not simulate real customer orders or unsupported totals. |

## Current implementation

`blog-data-motion-model.mjs` projects six existing articles into separate figure data without mutating their text, covers, source ledgers or registry. `withDataMotion` inserts one stable `data-motion` section after the relevant passage. Unsupported articles remain unchanged. The shared article outline and reading progress include the inserted section.

| Article | Reader question | Representation and evidence |
| --- | --- | --- |
| AI payoff | Does the longer bar mean better performance? | The existing METR time indices, 100 and 119; lower means less time. Historical setting and follow-up limitations remain visible. |
| Normalized friction | How much scheduling work does the vendor report? | Existing 80/15 weekly person-hours. Sponsored/vendor status stays visible; the difference is arithmetic, not ROI. |
| Capital One | Are the two task durations comparable? | Company-reported five hours and three minutes, converted to 300/3 minutes. Other bank measures are not combined with this task. |
| AI model market | How do costs differing by orders of magnitude compare? | Six existing Epoch estimates, unchanged underlying values, release years and sources. A logarithmic axis has tenfold intervals; there is no interpolated time series. |
| AI marketing | What travels from one role to the next? | Four actual jobs from the existing workflow. The moving document indicates a selected handoff, not real execution, approval, measured duration or automation rate. |
| Store beyond storefront | Where must an order's promise be carried forward? | An explicitly editorial test-order path. No order, payment, message, delivery estimate or sales statistic is created. |

`blog-data-motion.mjs` renders native controls, exact values, source anchors and readable detail. Motion supports the explanation; the information remains available without playback. The source of numbers is the existing article data, not the videos. For a new observation or a changed claim, review its source separately rather than treating this implementation as a current-data feed.

The visual grammar varies by the content: paired time bars and a derived difference, logarithmic magnitude rows, or a document traveling between handoffs. Bars encode quantities; the moving document encodes a transfer. Navy/indigo mark data, and the restrained lime underline marks the selected record. No new glass layer, background grid, icon library, font, canvas engine or third-party runtime is added.

## Playback and lifecycle

- One one-shot clock per figure: 3.4 seconds for a comparison, 4.8 for magnitudes, 4.6 for a handoff. A figure plays once on first entry, then rests; replay and pause remain available.
- Growth eases out. Handoffs ease between stops with a short dwell, and the highlighted stop follows the document's position. No loop reset, layout motion or per-frame randomization.
- Exact labels remain exact while geometry moves. Do not count up a reported observation as though intermediate values were new data.
- The scrubber is explicitly playback progress, not a timeline or a performance metric. It works with native keyboard input. Selecting a record reveals its own evidence or handoff criteria.
- Pause offscreen and in hidden documents. Resume from the same point, without adding hidden elapsed time. Reduced motion shows a still final figure; record selection remains usable.
- Stop clocks, observers and event handlers on article/language disposal. Keep the market renderer's chart/source associations tied to section identity, rather than array position.
- Size the figure to its article column with container queries. Phones stack the plot and details; controls have 44px targets, visible focus, and native fa/en labels and direction.

## Future article decisions

Consult the interactive-blog and data-visuals workflows first. Name the reader's question, enumerate source objects and unknowns, then choose a motion only if it reveals a useful relationship. Keep the article unchanged when the data or teaching purpose does not support one. Date pickers, maps, Gantt charts, funnels, counters and rings are options, not a checklist. A conceptual path needs an editorial label; a reported quantity needs its unit, scope and source.

Check models and playback with `node --test tests/blog-data-motion.test.mjs`; run the full scoped site suite and inspect the real fa/en article on desktop and phone. Also check selection, play/pause, scrubbing, reduced motion, offscreen/hidden behavior, source anchors and language remount. Record the actual verification evidence, not an inferred performance score.
