# Solo workbench figure brief

> Retired prototype: removed from the Solo article, template and visitor runtime after editorial review. This brief records the historical experiment; it is not a current authoring requirement.

## Question and mechanism

How does delegating preparation affect what one person can deliver within limited time?

A bench press holds two trays, a preparation platen and a workload dial. Each input sheet represents one requested order; each output sheet represents one that fits the selected time. The platen gap represents remaining human preparation. The wheel follows delegation and the dial follows workload. The reader controls weekly delivery hours, requested orders and preparation delegated to AI. Review and client communication stay in the model. This is an explanatory apparatus, not a physical printer simulation or a tool-performance measurement.

## Model

`soloCapacity({hours,orders,automation})` drives all results:

- Human minutes/order = `75 × (1 − automation / 100) + 25 + 20`.
- Capacity = `floor(hours × 60 / human minutes per order)`.
- Completed = `min(requested orders, capacity)`; pending = requested minus completed.
- Dial load = required minutes / available minutes, clipped visually at 150%; the exact percentage remains in text. Positive demand with zero time receives an explicit explanation.

These are original educational assumptions, not numbers from Solo or a productivity study. Sales, breaks, money, taxes and customer acceptance are outside the delivery-time model. Orders remain integers; no interaction creates demand.

## Parts list

43 fixed solids plus up to 32 sheets, for a maximum of 75:

| Assembly | Solids | Purpose |
| --- | ---: | --- |
| Bedplate and two-piece feet | 9 | Ground and support |
| Two trays with floors, sides and backs | 8 | Hold demand/output sheets |
| Feed ruler and nameplate | 2 | Alignment and instrument detail |
| Press bed | 1 | Support the frame |
| Four pillars with lower/upper collars | 12 | Carry the crosshead |
| Crosshead | 1 | Carry the spindle |
| Wheel seat, stem and knurled wheel | 3 | Show delegation |
| Platen and shaft | 2 | Show remaining preparation |
| Gauge foot, post, body, face and hub | 5 | Show workload |
| Input and output sheets | 0–32 | Show actual model counts |

Screws, seams, knurling, tick roots and printed-rule marks belong to those solids. The drawing has a localized description and an external legend. Decorative figure numbering is omitted to follow the site's rules.

## Rendering and verification

The selected Anatomy SVG core in `assets/anatomy` includes its MIT license. The original skill stays immutable. A bounded cache retains only the last geometry string for each named part.

`scripts/build-solo-figure.mjs` records the actual rounded slabs and cylinders with Anatomy's recorder, solves depth order and audits nine boundary states: 0/12/40 hours × 0/60/90% delegation at 16 requests. It rejects clearance, support, coverage and ordering failures. `figures/solo-order.mjs` stores the browser's generated order; `--check` detects stale output.

`blog-solo.mjs` draws SVG and numbers from the same current model during a 320 ms ease. Reduced motion settles immediately; offscreen/hidden figures stop. Aborting a language mount cancels frames, listeners and the observer. Native range keyboard controls share pointer-input handlers.

The implementation plan records passed fa/en, desktop/mobile, keyboard, dialog/focus, motion and 4× inspection. A separate live region announces settled results after a 200 ms quiet delay; visual updates stay continuous. The audit preserves browser ranks after collecting overlap context, and a deliberately reversed-order control verifies that incorrect ranks fail. Use the host's permitted browser tools, preserving the upstream checks' objectives without running its headless helpers.
