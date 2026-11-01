# Five Formulas for Understanding Money

Published 1 November 2026 as `five-money-formulas`, with independently written Persian and English. Estimated reading time is **12–16 minutes**, including time to try the five labs; it is an editorial estimate, not measured reader telemetry.

## Source and numerical checks

The topic comes from [Lumen's public post](https://x.com/lumenxbt/status/2082101954206130402), dated 28 July 2026. Direct X access was restricted. The article text was available in a [public indexed copy](https://teapawt.org/lumenxbt/article/2082101954206130402), and the public post linked to X article `2082087335726825472`. The site's prose and artwork are original; the source's rhetoric and full text are not republished.

The formulas were checked against [Investor.gov](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator), [NYU Stern](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/PVPrimer/pvprimer.htm), [Wolfram MathWorld](https://mathworld.wolfram.com/Ruleof72.html), [Microsoft Learn](https://learn.microsoft.com/en-us/office/vba/api/excel.worksheetfunction.geomean), [FRED](https://fred.stlouisfed.org/blog/2022/05/constructing-ex-ante-real-interest-rates-on-fred/) and [Investor.gov's fee guidance](https://www.investor.gov/introduction-investing/getting-started/understanding-fees). The localized article source ledger explains each reference's role.

Two source examples needed correction:

- A single 10,000-unit deposit compounded at 8% for 40 years reaches approximately 217,245.21. Twenty-five end-of-year deposits of 10,000 at 8% reach 731,059.40. Contributions are 10,000 versus 250,000; this does not establish that starting later is better. The source does not specify deposit timing, so the article makes the year-end assumption explicit.
- Returns of +50%, −50% and +50% take 100 to 112.5. The equivalent annual compound return is approximately 4.00419%, while the arithmetic average is 16.66667%. The source contains inconsistent values for the compound rate.

The annuity fixture was independently checked by summing the future value of each deposit with decimal arithmetic. All model outputs are educational calculations, not historical returns, inflation statistics or recommended rates.

## Interaction and design decisions

Five `finance` modes use the shared article renderer and the pure helpers in `blog-finance-model.mjs`:

| Mode | Reader question | Explicit assumptions |
| --- | --- | --- |
| Compound | How do duration and recurring fees change the balance? | Constant annual rate; a fee on assets after each year's growth; no external flows, tax or inflation. Deducted fees and the gross/net wealth gap remain distinct. |
| Doubling | How close is the rule of 72? | Annual compounding; exact logarithmic time alongside the approximation; no doubling at zero or negative rates. |
| Present value | What is a future receipt worth on today's comparison basis? | One receipt, stated whole-year delay and discount rate; the tool does not select an appropriate contractual rate. |
| Returns | Why can average percentages mislead? | Three equal periods, a fixed initial amount, no contributions or withdrawals; complete loss handled separately. |
| Real return | Does a higher balance buy more? | Nominal growth and inflation cover the same period; purchasing power uses starting-year prices. |

Each lab offers native number/range inputs, visible bounds, reset, useful presets, formula disclosure, a calculated table, an accessible result announcement and localized validation. Charts use common zero baselines, solid/dashed series and explicit units. There is no stored financial input, network request or animation timer in the labs. Event handlers use the article's AbortSignal.

The pale working surface distinguishes adjustable examples from surrounding prose. Green solid and rust dashed series distinguish balances without relying only on color. The graphite/seafoam/papaya artwork connects this article to its cover companion while the site's indigo navigation remains unchanged. No map, calendar or Gantt is warranted by the data. No physical Anatomy metaphor improves these numerical comparisons, so none was added.

## Verification

The model tests cover zero time/rate, fee timing, exact versus approximate doubling, present value, sequence compounding, complete loss, exact purchasing power, contribution timing and invalid inputs. Browser checks cover all five modes in both languages, number/range synchronization, reset, empty and fractional-year validation, glossary Escape/focus return, the formula table, and narrow layouts at 320 and 390 pixels. The shared Blog sidebar, progress and related routes remain in place.

## Original artwork and final prompts

Tool mode: **built-in image generation**, three new images, no reference image edit. All exports are 1672 × 941 RGB WebP at quality 90. Both covers were inspected for native spelling, full composition and small-screen legibility. The in-body image is language-neutral, with native captions and alternatives.

| Export | Role |
| --- | --- |
| `assets/blog/five-money-formulas-fa.webp` | Persian cover |
| `assets/blog/five-money-formulas-en.webp` | English cover |
| `assets/blog/money-and-purchasing-power.webp` | In-body balance/purchasing-power illustration |

This completes `graphite-seafoam-papaya-pair` at position 2, following AI Marketing Team at position 1. The next new article starts a new pair. Conceptual lines in artwork have no numerical scale and are not evidence.

### Persian cover prompt

Create one polished 16:9 editorial blog cover, landscape 1672x941 or equivalent. Topic: understanding money through five mathematical formulas. This is the second cover in a paired family: matte graphite #17242a, seafoam #a9ded0, papaya orange #ff9e76, ivory-white accents; premium realistic tactile photography with very restrained conceptual graphic traces, not a website mockup. On the LEFT, compose an original still life on a dark graphite desk: an unbranded small calculator, white working notebook, five translucent seafoam paper leaves stepping from near to far, and a slim papaya line that gently curves upward across the leaves. The curve is conceptual and has no ticks, axes, values or financial claims. No people, hands, money piles, coins, currency logos, robots, magic symbols or shiny generic 3D blobs. On the RIGHT use generous quiet dark space and large beautifully typeset native Persian headline EXACTLY: «پنج فرمول برای فهم پول». Render it as two balanced lines, bold clean Persian sans, seafoam and white with one papaya accent. The actual headline must be unambiguous and correctly joined Persian; do not draw guillemets. Very faint, small Persian keywords in the backdrop: «زمان»، «بازده»، «تورم». Keep every letter comfortably within 8% safe margins, legible in a small thumbnail. Strong photographic texture, focused directional daylight, calm professional financial-literacy editorial, no watermark or extra text. Use the same visual sophistication as a crafted magazine cover, not a stock investment ad.

### English cover prompt

Create one polished 16:9 editorial blog cover, landscape 1672x941 or equivalent. Topic: understanding money through five mathematical formulas. Paired palette strictly matte graphite #17242a, seafoam #a9ded0, papaya orange #ff9e76, ivory-white accents. Premium realistic tactile editorial still-life photography with restrained conceptual graphic traces, not an interface. On the RIGHT place a dark graphite desk with an unbranded small calculator, white notebook, five translucent seafoam paper leaves stepping from near to far, and one slim papaya line gently curving upward across the leaves. This is conceptual, without numerical values, axes or investment claims. On the LEFT, quiet dark negative space carries a large elegant, bold clean sans-serif headline EXACTLY: "Five Formulas for Understanding Money". Balance across three lines, seafoam and white with one papaya accent, clearly readable as a thumbnail. Add only faint small background keywords "TIME", "RETURNS", "INFLATION". Keep all headline letters and punctuation within generous 8% safe margins. No people, hands, piles of money, coins, logos, robots, generic glowing blobs, fake financial dashboards, watermark or extra copy. Carefully lit material texture and soft daylight; a crafted magazine cover rather than a financial-product ad.

### In-body image prompt

Create one original landscape 16:9 editorial photograph for the middle of a financial-literacy article. NO readable text, letters, numbers, currencies, logos, chart axes or data. The idea is the difference between an account balance and the real goods it can buy. A realistic, quiet still life on a matte graphite #17242a table: an unbranded seafoam-key calculator and an open blank white notebook on the left; a small real wire grocery basket containing a plain bottle, bread, apples and one unbranded carton on the right. Between them lies one translucent seafoam sheet with a restrained papaya-orange curved line, a conceptual connection rather than measured performance. Seafoam #a9ded0 and papaya #ff9e76 accents with daylight and rich natural shadows. The basket should feel tangible and ordinary, not luxury or exaggerated scarcity. No people or hands, no holograms, no floating objects, no investment promises. Clear photographic hierarchy and tactile detail, avoiding a generic finance stock photo. This image must work identically beside Persian and English captions.
