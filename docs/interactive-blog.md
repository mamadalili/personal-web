# Interactive blog authoring

The site uses its existing static HTML/CSS/JavaScript stack. There is no CMS, AI API, tracking or build dependency. The reusable authoring prompt is [interactive-blog.fa.md](../prompts/interactive-blog.fa.md).

## Choose interactions for the article

Start with [interactive-blog-anatomy](../.agents/skills/interactive-blog-anatomy/SKILL.md), the companion authoring workflow, and the reusable prompt. Identify the reader’s question before choosing a widget. Filters, focused details, comparisons, charts or a calculator can each be sufficient when they directly support that question. There is no minimum figure count.

**Anatomy is optional.** Use it when a recognisable mechanism genuinely makes the subject easier to understand. Omit it when it adds visual distraction, an unrelated physical metaphor or extra work for the reader. Do not add a device to satisfy a skill requirement. The Solo article now focuses on real offer choices, AI/human responsibilities and first experiments; the rejected workbench and its artificial timing exercise are removed from the article and template.

When a figure is useful, load the complete [Anatomy skill](../.agents/skills/anatomy/SKILL.md), its `references/craft.md` and the closest relevant example. Record the reader’s question, what the reader controls, what changes and why that change explains the subject. State any formula, unit, source/date, assumption and limitation; keep reported data separate from illustrative models. Do not invent facts to make an analogy work.

Keep the existing framework-free HTML/CSS/JavaScript stack. The upstream package at `.agents/skills/anatomy` stays unmodified and is authoring material. Place article figures and any needed runtime assets outside it; load only what the chosen interaction uses. Integrate reusable behavior through the shared renderer with proper mount/dispose handling.

Provide native Persian and English content and controls, mirrored RTL/LTR, `#1c0998`, light surfaces and bold black action labels. Keep cards unnumbered. Verify keyboard/pointer input, focus, accessible results, language remount and mobile/desktop fit. For motion, also verify reduced motion, offscreen behavior and relevant moving states. Use the host’s permitted browser tools; do not substitute upstream headless capture/drive/CDP helpers. Optional community-gallery publishing and session-log collection require their own explicit human request.

The source remains pinned to [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy/tree/1482e8469b0a9e0d8cc18ea2740a01423d29ae80), revision `1482e8469b0a9e0d8cc18ea2740a01423d29ae80`, under its MIT license. [anatomy-source.json](anatomy-source.json) records upstream hashes; `node scripts/check-blog-skills.mjs` checks integrity offline. Availability of the package does not require using it in an article.

## Files and entry points

- `blog.html`: published-article list and search. With no posts, it links to the interactive example.
- `home-blog.mjs`: the Home carousel reads the same published registry automatically, two articles per page. Publishing a bilingual article updates Home without a separate card edit; drafts and the template remain excluded.
- `blog-template.html`: bilingual, explicitly labelled example. It has `noindex,follow` and is excluded from the article registry.
- `article.html?post=slug&lang=fa`: a published article; `lang=en` opens its English version.
- `blog-data.mjs`: `posts` registry and the separate `articleTemplate` example.
- `posts/*.mjs`: individual bilingual article data, imported into the registry.
- `blog.mjs`: article/list renderer and local interaction handlers.
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

Internal targets: `@home`, `@solutions`, `@strategy`, `@execution`, `@technology`, `@ai-tools`, `@blog`, `@cv`, `@cv:projects`, `@contact`, `@skills`, and `@post:published-slug`. Solutions is the category hub; the four paths have dedicated bilingual pages. Related cards use the same target strings without `@`. Unknown/draft/template article targets are not linked. Internal links preserve the current language and work under a static-hosting subdirectory. Explicit `http://` and `https://` source URLs are allowed. Other schemes, protocol-relative URLs, raw HTML and executable URLs are not supported.

## Block types

| Type | Data | Use |
| --- | --- | --- |
| `paragraph` | `{type:'paragraph',fa:'…',en:'…'}` | Main text; supports the inline forms above |
| `callout` | Same text fields | A supplementary note; supports inline forms |
| `details` | `fa/en:{title,text}` | An expandable explanation or FAQ |
| `tabs` | `items:[{fa/en:{label,title,text}}]` | Comparable approaches; keyboard arrows and Home/End |
| `chart` | Localized `title,source,method`; labels, metrics, series | Metric/view/series switching, period dialogs, accessible table |
| `simulator` | `visits`, `rate`, localized `title,note` | **Specifically** estimated orders = visits × rate ÷ 100 |
| `explorer` | Localized `title,hint`; `items` with `id` and localized `title,text,detail` | Select a concept to reveal a focused explanation; equal tiles are not market shares |
| `treemap` | Localized `title,note`; `items:[{id,name,value,source}]`, optional `share` | Proportional reported-revenue areas, source dialogs, explicit attribution scenario |
| `calculator` | `formula`, localized `title,note`, input definitions, optional `source` | Tested compound-cost or revenue/cost/capital learning labs |
| `quiz` | Localized `question`, choices with `correct,fa,en`, `faExplanation,enExplanation` | A reader-selected interpretation check with immediate feedback |
| `opportunities` | Localized `eyebrow,title,note`; `groups`, bilingual `items` | Group filtering, Persian/English search, focused dialogs and contextual links |

Widget `id` values in the example are author-facing references; the renderer generates unique DOM IDs. A glossary definition should be self-contained plain text. Native dialog behavior provides focus containment, Escape and return focus. Dialogs open only after reader action. The outline tracks the active section and reading progress; it starts collapsed on mobile. Sources remain readable in a visible ledger, outside dialogs.

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

`kind` is `reported`, `derived`, `company`, `estimate`, `research`, `guide` or `inspiration`. Optional localized `fa/en.sourceNote` supplies the source-ledger introduction for the article’s actual evidence type. The date can describe the disclosure or the covered period; explain which in the title/note. Explain derived sums, assumed shares, estimates and data boundaries next to the result. Do not combine overlapping revenues into a market total. Never treat revenue/capital raised as profitability.

Localized article metadata may include `credit` for a visible attribution line. Link external inspiration in `sources`; independently write text/code and verify figures against primary sources. Do not reproduce a third party's complete article or graphics without permission or a suitable licence. The first published article, `posts/ai-model-market.mjs`, is a worked example of this evidence-led structure.

### Treemap and calculators

Treemap `value` is reported advertising revenue in USD billions. Areas stay proportional to those reported values. The optional AI-attribution scenario multiplies each value by the reader's 0–100% assumption; coloured coverage changes inside each fixed-area tile. The scenario is explicitly labelled as hypothetical, never as reported AI revenue. Select a tile for its source, exact source note and period.

Calculator inputs use `{key,value,min,max,step,fa,en}`. Supported formulas are deliberately explicit:

- `compound`: keys `base,growth,years`; result `base × growth^years`. Periods are integers (0–10), growth is 0–10, and the base is nonnegative. Label currency and illustrative scope in the block note. The UI may impose narrower bounds.
- `business`: keys `revenue,cost,funding`; outputs revenue minus cost, `(revenue − cost) / revenue × 100`, and revenue / capital raised. Inputs must be nonnegative. Zero denominators display `—`. This simplified balance is not financial-statement net income.

Keep the hypothetical badge and formulas visible. Range and numeric inputs stay in sync; invalid values display a message and no result. A new formula requires a new numerical helper, meaningful tests and corresponding rendering; changing labels is insufficient.

### Simulator

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
