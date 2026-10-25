# Interactive blog authoring

The site uses its existing static HTML/CSS/JavaScript stack. There is no CMS, AI API, tracking or build dependency. The reusable authoring prompt is [interactive-blog.fa.md](../prompts/interactive-blog.fa.md).

## Files and entry points

- `blog.html`: published-article list and search. With no posts, it links to the interactive example.
- `blog-template.html`: bilingual, explicitly labelled example. It has `noindex,follow` and is excluded from the article registry.
- `article.html?post=slug&lang=fa`: a published article; `lang=en` opens its English version.
- `blog-data.mjs`: `posts` registry and the separate `articleTemplate` example.
- `blog.mjs`: article/list renderer and local interaction handlers.
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
  fa: { title: '…', excerpt: '…', category: '…', readTime: '…', takeaways: ['…'] },
  en: { title: '…', excerpt: '…', category: '…', readTime: '…', takeaways: ['…'] },
  glossary: {
    'term-id': { fa: {title:'…',text:'…'}, en: {title:'…',text:'…'} }
  },
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

Internal targets: `@home`, `@blog`, `@cv`, `@cv:projects`, `@contact`, and `@post:published-slug`. Related cards use the same target strings without `@`. Unknown/draft/template article targets are not linked. Internal links preserve the current language and work under a static-hosting subdirectory. Explicit `http://` and `https://` source URLs are allowed. Other schemes, protocol-relative URLs, raw HTML and executable URLs are not supported.

## Block types

| Type | Data | Use |
| --- | --- | --- |
| `paragraph` | `{type:'paragraph',fa:'…',en:'…'}` | Main text; supports the inline forms above |
| `callout` | Same text fields | A supplementary note; supports inline forms |
| `details` | `fa/en:{title,text}` | An expandable explanation or FAQ |
| `tabs` | `items:[{fa/en:{label,title,text}}]` | Comparable approaches; keyboard arrows and Home/End |
| `chart` | Localized `title,source,method`; labels, metrics, series | Metric/view/series switching, period dialogs, accessible table |
| `simulator` | `visits`, `rate`, localized `title,note` | **Specifically** estimated orders = visits × rate ÷ 100 |

Widget `id` values in the example are author-facing references; the renderer generates unique DOM IDs. A glossary definition should be self-contained plain text. Native dialog behavior provides focus containment, Escape and return focus. Dialogs open only after reader action.

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

The numeric values above illustrate the schema only. Supply actual sourced data for a real article. Each series array must have the same number of entries as the category labels. Use a small number of categories/series for readable comparison; the current visual palette is designed for two series. `format` is `number` or `percent`. A ratio multiplies numerator/denominator by the configured multiplier. Zero/missing denominators and non-finite values display `—`, not a fabricated zero. The chart supports positive and negative direct values; ratio denominators must be positive. The table and period detail buttons expose the same selected data as the visual.

### Simulator

The included simulator is a mathematical demonstration, not a forecast. Visits must be 0–1,000,000; the slider ranges from 0–10% in 0.1-point steps. The core formula accepts valid percentages through 100 and rounds estimated orders to a whole number. Invalid inputs show a message and `—`. Do not repurpose this widget for revenue, ROI or unrelated formulas by changing its labels: implement and test an appropriate calculator block instead.

## Verification

```sh
node --test
node --check portfolio.js
node --check blog-core.mjs
node --check blog-data.mjs
node --check blog.mjs
git diff --check
```

Open the actual article in Persian and English. Check glossary dialogs (including Escape/focus return), comparison tabs with keyboard arrows, disclosure, each metric/view/series combination, period details and data table, simulator values/reset/invalid input, section links, contextual links and related cards. Check desktop and a narrow mobile viewport for overflow and modal fit. Confirm the Blog item remains active in the shared footer. Unknown/unpublished article URLs must show a useful not-found state.
