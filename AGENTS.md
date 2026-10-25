# Portfolio design and content rules

- Keep native Persian and English content and mirrored RTL/LTR layouts.
- Homepage cards are **unnumbered**. Do not add decorative ordinal labels or zero-pad display integers. Preserve meaningful source data, decimal fractions and machine-readable date formats.
- On Home, keep the welcome introduction, then the “از اینجا شروع کنید” / “Find your way around” heading, then a prominent Skills hero with a visible call to action and a dedicated page. On desktop (1000px and above), Blog/CV/Contact start below the first viewport and scroll over the pinned first view. On narrower screens, use ordinary document flow. Blog is the large lower card; CV and Contact are equally sized small cards.
- The primary accent is `#1c0998` (RGB 28, 9, 152). Keep call-to-action labels black, with light surfaces.
- Call-to-action text is bold (`700`) and black (`#000`). Use light button surfaces for readable contrast. Navigation and chart controls are distinct from calls to action.
- Keep the rounded liquid-glass navigation **fixed at the top centre**, with Home, Blog, CV and Contact. The historical element ID is `footer`; its visible placement is at the top on desktop and mobile. Keep header/anchor spacing clear of it. Do not add a fifth item by default.
- The Skills hero has four substantial, linked capability tiles in a balanced 2×2 grid with a 5px gap and a visible breakout beyond the hero edge. They cover growth leadership, connected marketing/sales, full-stack product delivery and AI-enabled execution. Keep the presentation grounded in the supplied experience and explicit author statements.
- Ground professional claims in the existing résumé, work history and supplied evidence. Do not invent credentials, client results, numbers or publications.
- Keep personal device paths, account/login details, credentials and private environment instructions out of public documentation and source.
- For interactive articles, read `docs/interactive-blog.md` and use `prompts/interactive-blog.fa.md`.
