---
name: interactive-data-visuals
description: Use when creating or revising an interactive article that may benefit from a Persian date picker, RTL slicer, SVG map, or Persian Gantt chart. Select a visual only when the article has suitable sourced data and the interaction answers a reader question.
---

# Interactive data visuals for articles

Treat the reader's question and the dataset as the design brief. The four Persian Power BI visual types in the author's reference image are inspiration for presentation, not a requirement to install Power BI, copy vendor code, or add every control to each article. A useful article may need none of them.

Author-provided references: [Persian visuals](https://www.tahlilgary.com/product/vands/) and [free Power BI course](https://www.tahlilgary.com/pbifree/). Consult their current documentation when relevant; the reference image alone does not establish implementation details or a reuse licence.

## Decide from the data

For each candidate, record the fields available: object ID, label, measure, unit, time precision, place, source, and missing/estimated status. Name what the reader can select and what changes. Add a visual only if that action reveals a relationship the prose or existing chart does not already show.

| Visual | Use when | Do not infer |
| --- | --- | --- |
| Solar Hijri date picker | Verified day-level dates and a meaningful time window or event lookup exist | A day from a year/month-only source; a trend from isolated snapshots |
| RTL slicer | A real category or metric filter changes a chart, table, or decision | A decorative selector that repeats static cards |
| SVG map | Verified location-linked observations make spatial distribution relevant | Geographic precision, national totals, or causation from approximate markers |
| Persian Gantt | Tasks have actual or explicitly planned start/end dates and dependencies | A schedule from a prose sequence or fabricated durations |

The reference date picker offers single-day, relative and range selection; choose only the mode supported by the article's records. The RTL slicer places choices and selection affordances in reading order and can add search when the list is long. An SVG map may color named regions when values cover comparable regions; for a selected-country sample, use labelled markers and a value list instead of implying a complete choropleth. A Gantt can show a work breakdown, dependencies, progress and baseline only when those fields really exist.

Model each observation as data, not as text painted into a graphic. Preserve units, source links, date precision, estimation flags and caveats in the visual, a readable table or detail view, and the surrounding article. Missing values stay missing. Avoid summing overlapping categories or affiliations. If an illustrative scenario is explicitly wanted, label it beside the result and keep it apart from reported observations.

In Persian, mirror layout and controls for RTL and use Solar Hijri dates only when an exact conversion is possible and useful. In English, write native labels and use the corresponding date convention. The underlying timestamp or period remains unchanged across languages. Numerals can be localized for display; source values and calculations must not change.

## Fit the site

For personal-web, also read `AGENTS.md`, `docs/interactive-blog.md`, `prompts/interactive-blog.fa.md`, and the existing interactive-blog skill. Use the shared article frame and lifecycle. A map can use an openly licensed base; keep its provenance in the repository. Do not import the reference site's scripts or embed its commercial visuals unless separately licensed and requested.

Provide pointer and keyboard controls, visible focus, accessible names and exact values outside color/shape alone. A mobile reader must be able to reach the same result through a list or table if map targets are small. Dispose listeners on article/language remount; honor reduced motion. Test data transformations separately from rendering, then inspect the actual Persian and English article at desktop and phone widths.

If no candidate passes the data and reader-question checks, leave the article unchanged and report why. Do not create numbers, dates, locations or schedules to make a widget fit.
