# Interactive blog authoring

The site uses its existing static HTML/CSS/JavaScript stack. There is no CMS, AI API, tracking or build dependency. The reusable authoring prompt is [interactive-blog.fa.md](../prompts/interactive-blog.fa.md).

## Choose interactions for the article

Start with [interactive-blog-anatomy](../.agents/skills/interactive-blog-anatomy/SKILL.md), the companion authoring workflow, and the reusable prompt. Identify the reader’s question before choosing a widget. Filters, focused details, comparisons, charts or a calculator can each be sufficient when they directly support that question. There is no minimum figure count.

When the article has dated, categorical, geographic or scheduled observations, consult [interactive-data-visuals](../.agents/skills/interactive-data-visuals/SKILL.md). A Persian date picker, RTL slicer, SVG map or Gantt chart needs data at the right precision and a specific reader question. Do not fill gaps with invented dates, places, durations or totals.

For source-led articles, inventory source objects before drawing: which observations have links, which are the source author's proposals, which are the site's interpretation, what fields are missing, and what the reader can meaningfully select. A process article can use a categorical dependency map even without measured outcomes. Do not turn proposed cadence into dated Gantt bars or draft counts into ROI. When a concept benefits from a visual pause, place an original image inside the relevant section and write native alt/caption; it should clarify an example or decision rather than fill space.

**Anatomy is optional.** Use it when a recognisable mechanism genuinely makes the subject easier to understand. Omit it when it adds visual distraction, an unrelated physical metaphor or extra work for the reader. Do not add a device to satisfy a skill requirement. The Solo article now focuses on real offer choices, AI/human responsibilities and first experiments; the rejected workbench and its artificial timing exercise are removed from the article and template.

When a figure is useful, load the complete [Anatomy skill](../.agents/skills/anatomy/SKILL.md), its `references/craft.md` and the closest relevant example. Record the reader’s question, what the reader controls, what changes and why that change explains the subject. State any formula, unit, source/date, assumption and limitation; keep reported data separate from illustrative models. Do not invent facts to make an analogy work.

Keep the existing framework-free HTML/CSS/JavaScript stack. The upstream package at `.agents/skills/anatomy` stays unmodified and is authoring material. Place article figures and any needed runtime assets outside it; load only what the chosen interaction uses. Integrate reusable behavior through the shared renderer with proper mount/dispose handling.

Provide native Persian and English content and controls, mirrored RTL/LTR, `#1c0998`, light surfaces and bold black action labels. Keep cards unnumbered. Verify keyboard/pointer input, focus, accessible results, language remount and mobile/desktop fit. For motion, also verify reduced motion, offscreen behavior and relevant moving states. Use the host’s permitted browser tools; do not substitute upstream headless capture/drive/CDP helpers. Optional community-gallery publishing and session-log collection require their own explicit human request.

The source remains pinned to [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy/tree/1482e8469b0a9e0d8cc18ea2740a01423d29ae80), revision `1482e8469b0a9e0d8cc18ea2740a01423d29ae80`, under its MIT license. [anatomy-source.json](anatomy-source.json) records upstream hashes; `node scripts/check-blog-skills.mjs` checks integrity offline. Availability of the package does not require using it in an article.

## Files and entry points

- `MOTION.md`, `blog-data-motion-model.mjs`, `blog-data-motion.mjs` and `blog-data-motion.css`: selective evidence-led motion figures. The shared renderer inserts a bilingual section for six suitable articles, without changing their original content or covers. Reported figures retain units and sources; editorial handoff paths contain no invented metrics. The one-shot player pauses offscreen/hidden and shows a static final view under reduced motion. The playback scrubber is not a data time axis. Consult the motion notes before extending this to another article.

- `blog.html`, `blog-index.mjs` and `blog-library-model.mjs`: editorial feature, nonduplicated archive, topic selection and keyword search. With no posts, it links to the interactive example.
- `home-blog.mjs`: the Home carousel reads the same published registry automatically, up to six articles per desktop page (three columns, two rows), four on tablets and two on phones. Publishing a bilingual article updates Home without a separate card edit; drafts and the template remain excluded.
- `blog-covers.mjs`: validated local native fa/en cover selection and image markup; full banners on articles/lists, compact artwork-focused Home thumbnails beside native titles. Each post's `cover.fa` and `cover.en` contain `src`, descriptive `alt`, and actual integer `width`/`height`. Never fall back to an image with the other language's headline. [Banner prompts and provenance](blog-covers.md) accompany the six current exports.
- `blog-inline-image.mjs`: validated local WebP article figures with both languages' alt and captions. A language-neutral bitmap can serve both languages if the visible image itself has no words.
- `blog-workflow-model.mjs` and `blog-workflow.mjs`: source-modelled categorical workflows with stage filters, job inputs/outputs, dependencies, cadence and human review. They do not invent dates or outcome measures.
- `blog-template.html`: bilingual, explicitly labelled example. It has `noindex,follow` and is excluded from the article registry.
- `article.html?post=slug&lang=fa`: a published article; `lang=en` opens its English version.
- `blog-data.mjs`: `posts` registry and the separate `articleTemplate` example.
- `posts/*.mjs`: individual bilingual article data, imported into the registry.
- `blog.mjs`: article/list renderer and local interaction handlers.
- `blog-market.mjs`, `blog-market-model.mjs` and `blog-market.css`: the AI-market article’s chart chapters and a country-affiliation map, mounted inside the shared article frame. The shared renderer owns the header/banner, sidebar, reading progress, takeaways, sources, related cards and dialog. Market charts keep their own content-led interactions and abort lifecycle; do not replace the shared frame. Funding compares the named round (including commitments), rather than lifetime capital or profit. The SVG basemap in `assets/maps/world-land-110m.svg` derives from [Natural Earth 1:110m land](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), a public-domain dataset; country markers denote approximate country positions, not model-building sites.
- `blog-widgets.mjs`: reusable application explorers, treemaps, calculators, quizzes and source cards.
- `blog-solo.mjs` and `blog-solo.css`: reusable offer filters, search and detail dialogs.
- `figures/solo-model.mjs`: offer filtering and historical capacity-model utilities. The old `solo-workbench.mjs`/`solo-order.mjs` prototype remains authoring source only and is not imported by the site.
- `assets/anatomy/`: preserved optional SVG core, scoped CSS and MIT license; the current blog pages do not load them.
- `blog-core.mjs`: safe link resolution, publication filtering and numerical helpers.
- `blog.css`: scoped article and widget styles. The shared liquid-glass footer remains in `portfolio.css`.

`portfolio.js` loads the blog module on blog/article pages only. Its CV tab handlers are scoped to CV controls, so article comparisons do not affect the work-history tabs. Language changes remount the current article and remove its old event handlers.

## Article contract

Add an object to the exported `posts` array. Use `articleTemplate` as the complete working reference, replacing its content rather than publishing its illustrative data.

```js
{
  slug: 'unique-lowercase-slug',
  status: 'published', // only published, non-template posts are listed/rendered
  // date: 'YYYY-MM-DD', // actual date; optional, never invent one
  // reviewed: 'YYYY-MM-DD', // actual source-review date
  fa: { title: '…', excerpt: '…', category: '…', readTime: '…', takeaways: ['…'] },
  en: { title: '…', excerpt: '…', category: '…', readTime: '…', takeaways: ['…'] },
  glossary: {
    'term-id': { fa: {title:'…',text:'…'}, en: {title:'…',text:'…'} }
  },
  sources: [/* optional source ledger; schema below */],
  sections: [
    { id:'stable-section-id', fa:{title:'…'}, en:{title:'…'}, blocks:[/* below */] }
  ],
  related: [
    {target:'cv:projects',fa:{title:'…',description:'…'},en:{title:'…',description:'…'}}
  ]
}
```

Use unique, lowercase ASCII section IDs with letters, digits and hyphens. Keep section and article IDs stable after publication. Provide both languages for every visible string. `readTime` is an editorial estimate, not tracking. Do not add private drafts to a public repository: `status:'draft'` excludes an article from the UI but does not make its source private.

## Text and links

Text is escaped. Raw HTML in article text is displayed as text, not executed. Two inline forms are supported:

```text
Click [[term-id|the visible term]] for a definition.
Explore [selected projects](@cv:projects) or [a section](#stable-section-id).
```

Internal targets: `@home`, `@solutions`, `@strategy`, `@execution`, `@technology`, `@ai-tools`, `@blog`, `@cv`, `@cv:projects`, `@contact`, and `@post:published-slug`. The legacy `@skills` alias resolves to CV experience; new articles should use `@cv`. Solutions is the category hub; the four paths have dedicated bilingual pages. Related cards use the same target strings without `@`. Unknown/draft/template article targets are not linked. Internal links preserve the current language and work under a static-hosting subdirectory. Explicit `http://` and `https://` source URLs are allowed. Other schemes, protocol-relative URLs, raw HTML and executable URLs are not supported.

## Block types

| Type | Data | Use |
| --- | --- | --- |
| `paragraph` | `{type:'paragraph',fa:'…',en:'…'}` | Main text; supports the inline forms above |
| `image` | Local `src,width,height`; `fa/en:{alt,caption}` | An original in-body WebP that explains the adjacent passage |
| `callout` | Same text fields | A supplementary note; supports inline forms |
| `details` | `fa/en:{title,text}` | An expandable explanation or FAQ |
| `tabs` | `items:[{fa/en:{label,title,text}}]` | Comparable approaches; keyboard arrows and Home/End |
| `chart` | Localized `title,source,method`; labels, metrics, series | Metric/view/series switching, period dialogs, accessible table |
| `workflow` | Localized `title,hint,source`; stages and jobs with `dependsOn`, input/output/check/cadence | Filter and inspect sourced or clearly proposed categorical dependencies without fake metrics |
| `data-motion` | Validated model from `withDataMotion`; native copy, sourced rows and explicit units | One-shot comparisons, logarithmic magnitudes or editorial handoffs; consult `MOTION.md` |
| `simulator` | `visits`, `rate`, localized `title,note` | **Specifically** estimated orders = visits × rate ÷ 100 |
| `explorer` | Localized `title,hint`; `items` with `id` and localized `title,text,detail` | Select a concept to reveal a focused explanation; equal tiles are not market shares |
| `treemap` | Localized `title,note`; `items:[{id,name,value,source}]`, optional `share` | Proportional reported-revenue areas, source dialogs, explicit attribution scenario |
| `calculator` | `formula`, localized `title,note`, input definitions, optional `source` | Tested compound-cost or revenue/cost/capital learning labs |
| `quiz` | Localized `question`, choices with `correct,fa,en`, `faExplanation,enExplanation` | A reader-selected interpretation check with immediate feedback |
| `opportunities` | Localized `eyebrow,title,note`; `groups`, bilingual `items` | Group filtering, Persian/English search, focused dialogs and contextual links |

Widget `id` values in the example are author-facing references; the renderer generates unique DOM IDs. A glossary definition should be self-contained plain text. Native dialog behavior provides focus containment, Escape and return focus. Dialogs open only after reader action. The outline tracks the active section and reading progress; it starts collapsed on mobile. Sources remain readable in a visible ledger, outside dialogs.

`image.src` must match `assets/blog/kebab-case.webp`, with actual positive integer dimensions and both languages' nonempty alt and caption. Keep it next to the paragraph it clarifies. For `workflow`, `stages` use unique `{id,fa,en}` entries. Each job has a stable ID, matching `stage`, `dependsOn` IDs, author-facing `cadence`, `gate:'human'|'none'` and native `{title,input,output,check,cadence}`. The model rejects missing dependencies and cycles. `fa/en.source` must state the evidence type and limits. The workflow view uses native buttons and makes dependencies, review criteria and data limits visible; it is not a measured performance chart.

### Opportunity browser

See `posts/solo-opportunities.mjs` for complete bilingual data. Groups use `{id,fa,en}`; items have a stable `id`, matching `group`, optional internal `target` and `fa/en:{title,buyer,outcome,proof,ai,human,experiment,boundary}`. Search covers localized fields and normalizes Persian/Arabic yeh and kaf. Filters are keyboard-accessible buttons; dialogs return focus to the triggering card.

The old physical workbench is no longer a supported article block. Do not reintroduce it through the template or authoring prompt. Its [historical figure brief](figures/solo-workbench.md) documents the retired prototype, not an instruction to add it.

### Charts


```js
{
  type:'chart', id:'my-chart',
  fa:{title:'…',source:'…',method:'…'},
  en:{title:'…',source:'…',method:'…'},
  labels:{fa:['…','…'],en:['…','…']},
  metrics:[
    {id:'orders',key:'orders',format:'number',fa:'…',en:'…'},
    {id:'rate',numerator:'orders',denominator:'visits',multiplier:100,format:'percent',fa:'…',en:'…'}
  ],
  series:[{id:'first',fa:'…',en:'…',values:{visits:[100,200],orders:[2,6]}}]
}
```

The numeric values above illustrate the schema only. Supply actual sourced data for a real article. Each series array must have the same number of entries as the category labels. Use a small number of categories/series for readable comparison; the current visual palette is designed for two series. `format` is `number`, `decimal`, `percent` or `multiple`. A ratio multiplies numerator/denominator by the configured multiplier. Zero/missing denominators and non-finite values display `—`, not a fabricated zero. The chart supports positive and negative direct values; ratio denominators must be positive. The table and period detail buttons expose the same selected data as the visual.

Optional `views:['dots','bars']` limits view controls; default views are bars/lines. Use dots for unrelated companies, avoiding a line that implies continuity. `allowLog:true, defaultScale:'log'` adds a linear/log switch. Log positions represent ratios and exclude zero/negative values, with an explicit note. Both axes and marks use the same scale.

For mixed disclosure dates, add `observations` aligned with labels:

```js
observations:[{
  date:'YYYY-MM-DD', source:'source-id',
  qualifiers:{runrate:'≥',multiple:'≤'},
  fa:'یادداشت تعریف و محدودیت داده', en:'Definition and limitation note'
}]
```

Dates and notes remain visible; details include the primary-source link. A disclosed revenue floor implies an upper bound for valuation/revenue. Preserve those qualifiers in the plot controls, table and dialog. Display upper bounds rounded upward and lower bounds rounded downward, so display precision cannot invalidate a bound. Annualising a monthly number is a calculation, not booked full-year revenue.

### Evidence, inspiration and adaptation

```js
sources:[{
  id:'source-id', url:'https://primary.example/report', publisher:'Publisher',
  date:'YYYY-MM-DD', kind:'reported',
  fa:{title:'…',note:'…'}, en:{title:'…',note:'…'}
}]
```

`kind` is `reported`, `derived`, `company`, `estimate`, `research`, `analysis`, `guide` or `inspiration`. Use `analysis` for an analytical opinion, distinct from a causal experiment. Optional localized `fa/en.sourceNote` supplies the source-ledger introduction for the article’s evidence type. A date may describe disclosure or the covered period; explain which in the note. If only a month is known, state it in text and omit the day-based `date`. Explain derived sums, assumed shares, estimates and data boundaries next to the result. Do not combine overlapping revenues into a market total. Never treat revenue/capital raised as profitability.

Localized article metadata may include `credit` for a visible attribution line. Link external inspiration in `sources`; independently write text/code and verify figures against primary sources. Do not reproduce a third party's complete article or graphics without permission or a suitable licence. The first published article, `posts/ai-model-market.mjs`, is a worked example of this evidence-led structure.

### Treemap and calculators

Treemap `value` is reported advertising revenue in USD billions. Areas stay proportional to those reported values. The optional AI-attribution scenario multiplies each value by the reader's 0–100% assumption; coloured coverage changes inside each fixed-area tile. The scenario is explicitly labelled as hypothetical, never as reported AI revenue. Select a tile for its source, exact source note and period.

Calculator inputs use `{key,value,min,max,step,fa,en}`. Supported formulas are deliberately explicit:

- `compound`: keys `base,growth,years`; result `base × growth^years`. Periods are integers (0–10), growth is 0–10, and the base is nonnegative. Label currency and illustrative scope in the block note. The UI may impose narrower bounds.
- `business`: keys `revenue,cost,funding`; outputs revenue minus cost, `(revenue − cost) / revenue × 100`, and revenue / capital raised. Inputs must be nonnegative. Zero denominators display `—`. This simplified balance is not financial-statement net income.

Keep the hypothetical badge and formulas visible. Range and numeric inputs stay in sync; invalid values display a message and no result. A new formula requires a new numerical helper, meaningful tests and corresponding rendering; changing labels is insufficient.

### Content starter

`type:'content-studio'` accepts native `fa/en:{title,hint}` and uses `blog-content-studio.mjs` with the shared AbortSignal. Its pure composer in `blog-content-model.mjs` selects ChatGPT Project or Claude Code guidance and a trust, enquiry or learning objective. The reader can edit an audience and note, review/copy a prompt or download a Markdown starter. It makes no model call, stores no input and publishes nothing. See [the complete example and evidence boundaries](ai-content-system.md). Keep unsupported inputs invalid and preserve literal user material; do not convert this local exercise into an account connection by changing its labels.

### Financial examples

`type:'finance'` uses `blog-finance.mjs` with the shared AbortSignal lifecycle. Supported modes are `compound`, `doubling`, `present`, `returns` and `real`; supply native `fa/en` title, hint and assumptions. Pure calculations and bounds live in `blog-finance-model.mjs`, with model tests in `tests/blog-finance.test.mjs`. The example contract, timing, money units and source checks are recorded in [Five Formulas for Understanding Money](five-money-formulas.md). Never substitute actual market claims for the explicitly hypothetical inputs without matching sourced observations and dates.

### Conversion simulator

The included simulator is a mathematical demonstration, not a forecast. Visits must be 0–1,000,000; the slider ranges from 0–10% in 0.1-point steps. The core formula accepts valid percentages through 100 and rounds estimated orders to a whole number. Invalid inputs show a message and `—`. Do not repurpose this widget for revenue, ROI or unrelated formulas by changing its labels: implement and test an appropriate calculator block instead.

## Verification

After adding or removing a published article, regenerate the crawl metadata with `node scripts/generate-sitemap.mjs`; check it with `node scripts/generate-sitemap.mjs --check`. The generator includes both language versions from the public registry and omits the template and drafts.

```sh
node scripts/check-blog-skills.mjs
node scripts/test-site.mjs
node --check portfolio.js
node --check blog-core.mjs
node --check blog-data.mjs
node --check blog.mjs
node --check blog-widgets.mjs
node --check posts/ai-model-market.mjs
git diff --check
```

Use the scoped test runner: bare `node --test` can also discover the vendored skill's independent tests. Skill authoring resources are not part of the site's runtime test suite.

Open the actual article in Persian and English. Check glossary dialogs (including Escape/focus return), comparison tabs with keyboard arrows, disclosure, each metric/view/series combination, period details and data table, simulator values/reset/invalid input, section links, contextual links and related cards. Check desktop and a narrow mobile viewport for overflow and modal fit. Confirm the Blog item remains active in the shared footer. Unknown/unpublished article URLs must show a useful not-found state.

For research blocks, also check the treemap at 0%, 30% and 100%; linear/log scale positions; visible bounds/dates; calculator updates and zero denominators; quiz feedback; active outline/progress; and direct source links. Confirm a language change stays on the same article and cleans up event handlers and resize observers.

## Evidence checklist block

`decision-audit` is optional when the reader can inspect actual evidence. Supply localized `title`, `hint`, `complete` plus unique item IDs with native `label` and `next`. The renderer returns the first unchecked item in authored priority and can reveal all remaining items; there is no score, sales forecast or stored personal response. Native checkboxes support keyboard input, reset and abortable lifecycle. Choose this only when checking a real page/task is the article’s point; other articles can use tabs, explorer, disclosures or interpretation quizzes.

For multi-source collections, record one source-to-article mapping, access status and commercial context. Publisher paraphrase budgets apply across both languages together. Substantial original exercises must be identified as proposals, not publisher research. See [the sixteen-article coverage audit](blog-series-2026.md).
