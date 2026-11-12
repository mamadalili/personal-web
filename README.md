<div align="center">

# MohamadReza Portfolio

**A bilingual personal portfolio for Mohamad Reza Dalili.**

A personal homepage, blog, interactive professional CV and contact page, focused on e-commerce, online sales and digital marketing.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E)

خانه، بلاگ، رزومهٔ تعاملی و تماس؛ فارسی و انگلیسی با منوی شیشه‌ای شناور

</div>

## Key features

- **Production performance:** Home and the archive load a generated bilingual summary index, while article pages fetch only the selected article's complete data. Card-only WebP previews, small portrait exports and WOFF2 reduce transfer size without replacing the original artwork or article content. See [the generation and release workflow](docs/performance.md).

- **Native Persian and English:** complete translations, a language switch and mirrored RTL/LTR layouts. No browser translation is required.
- **Personal homepage:** a welcome introduction and “Find your way around” heading lead to a prominent Solutions hero. On desktop, the first view stays pinned as the lower Blog/CV/Contact cards scroll over it; those cards start below the first viewport. Blog is the large lower card, with equally sized small CV/Contact cards. Narrow screens use normal document flow. A portrait and name remain in the header; cards are unnumbered.
- **Solutions / راهکارها:** complete bilingual pages for Strategy, Execution, Technology and AI Tools, with suitable problems, proposed outputs, the working process, related experience and ways to begin a conversation. Four animated art capsules on Home link directly to these pages in one desktop row and two mobile columns. The canonical entry is Strategy; the retired Skills page redirects to CV.
- **Visual style:** primary accent `#1c0998` (RGB 28, 9, 152), with bold black call-to-action labels on light surfaces. Design rules are recorded in `AGENTS.md`.
- **Design quality:** the author's direction is collected in `DESIGN.md`. The six pinned [anti-slop skills](https://github.com/miqdadbadjuber/anti-slop) support visual, writing, accessibility and responsive reviews while preserving that direction. They are authoring resources, with no browser runtime dependency. Verify their integrity with `node scripts/check-design-skills.mjs`.
- **Professional CV:** a sticky profile card on the right in Persian and on the left in English; a stacked layout on small screens.
- **Interactive experience:** eight roles with individual responsibilities, dates and focus areas.
- **Selected projects:** expandable project details, plus About and Contact tabs.
- **Liquid-glass navigation:** fixed at the top centre on desktop and mobile, with Home, Solutions, Blog, CV and Contact links, rounded translucent layers, backdrop blur and an active-page indicator. Header and anchor spacing clear the bar. The historical element ID is `footer`.
- **Interactive blog:** native bilingual articles with an active outline, reading progress, comparison tabs, glossary dialogs, application explorers, proportional treemaps, linear/log charts, data tables, tested learning calculators and interpretation quizzes. Visible source cards distinguish disclosures, estimates and assumptions. The labelled template example stays separate from published articles.
- **First article:** “Inside the AI Model Market” is an independently written, attributed interpretation of the reference research, with dated primary disclosures and adjustable educational scenarios. Open `article.html?post=ai-model-market&lang=fa` or switch to `lang=en`.
- **Second article:** “One person, many roles: building a business with AI” offers six starting points, twelve original offer experiments, searchable detail cards, engagement comparisons and a comprehension check. Open `article.html?post=solo-business&lang=fa` or use `lang=en` for native English.
- **Third article:** “AI: More Work. Where’s the Return?” separates task speed, work intensity and business outcomes, with an evidence explorer, dated historical chart and follow-up, operational choices and an interpretation quiz. Open `article.html?post=ai-payoff-workload&lang=fa` or use `lang=en`.
- **Localized cover banners:** all three articles have original image covers with Persian and English headlines. Six optimized WebP files are selected by the native language switch and appear on articles, the Blog list and compact Home previews. [Prompts and provenance](docs/blog-covers.md) document the artwork.
- **Homepage blog carousel:** a full-width blog stage shows up to six real posts per desktop view (three columns, two rows), four on tablets and two stacked on phones. CV and Contact follow in a later scroll stage. Buttons, keyboard arrows, horizontal swipe/scroll and vertical wheel gestures browse additional groups. Boundary wheel gestures return to normal page scrolling; a single group has disabled arrows. The compact glass bar stays at the top centre on desktop/tablet and bottom centre on phones, with 44px or larger touch targets.
- **Article conversion prompt:** a ready-to-use Persian prompt turns supplied writing into appropriate interactions while preserving claims and sources.
- **Content-led interactions:** choose each interaction to explain the article’s subject. The pinned Anatomy skill is available when useful; no figure or physical metaphor is required.
- **Motion:** Home and Solutions use a shared native SVG/CSS scene with four capability nodes, moving lime routes and the monogram. Home also uses four distinct local SVG materials with controlled light, staggered entry and hover/focus feedback. Motion pauses in hidden tabs and respects reduced-motion preferences.
- **Collaboration invitation:** The four Solutions pages share a bilingual closing section with a clear contact action, practical prompts for starting a conversation and a secondary CV link. The supporting work-experience link opens the CV experience tab.
- **Sitemap:** `sitemap.xml` covers the canonical pages and published articles in both languages, excluding retired Skills and duplicate Solutions URLs, with reciprocal language alternatives. `robots.txt` points to the configured sitemap.
- **Contact page:** call, WhatsApp, Telegram, email and GitHub, plus a link back to the professional CV.
- **Local assets:** a WebP portrait and a self-hosted Vazirmatn font.
- **No build step:** plain HTML, CSS and JavaScript; no package installation or runtime framework required.
- **Keyboard support:** tab semantics, arrow-key navigation, Home/End, visible focus and reduced-motion support.

## Project structure

```text
personal-web/
├── .agents/skills/anatomy/ # Complete upstream skill, kit, references and examples (MIT)
├── .agents/skills/interactive-blog-anatomy/ # Content-led article authoring workflow
├── index.html           # Homepage with page cards
├── home-blog.mjs        # Published-post carousel and wheel/keyboard paging
├── home-blog.css        # Wide blog deck and compact post/quick-link cards
├── profile.html         # Professional CV and interactive experience
├── landing.html         # Alternative homepage entry point
├── blog.html            # Published articles and search
├── article.html         # Article selected by ?post=slug
├── blog-template.html   # Labelled interactive example
├── blog-data.mjs        # Article registry and separate demo content
├── blog.mjs             # Reusable interactive article renderer
├── blog-widgets.mjs     # Research widgets and source cards
├── blog-core.mjs        # Link, publication and calculation helpers
├── posts/               # Bilingual article modules
├── blog.css             # Blog layout and widget styles
├── prompts/interactive-blog.fa.md # Text-to-interactive-article prompt
├── docs/interactive-blog.md      # Content schema and authoring guide
├── docs/anatomy-source.json      # Pinned upstream revision and file hashes
├── tests/blog-core.test.mjs      # Node tests for links and calculations
├── contact.html         # Dedicated contact page
├── skills.html          # Retired route; redirects to CV experience
├── solutions.html       # Compatibility redirect to the selectable Solutions entry
├── strategy.html        # Strategy solution
├── execution.html       # Execution solution
├── technology.html      # Technology solution
├── ai-tools.html        # AI Tools solution
├── solutions-data.mjs   # Native bilingual Solutions content
├── solutions.mjs        # Shared hub/detail renderer
├── solutions.css        # Solutions layouts
├── site-config.mjs      # Public deployment base for crawl metadata
├── sitemap-core.mjs     # Pure sitemap URL and XML helpers
├── scripts/generate-sitemap.mjs # Generate/check crawl metadata
├── scripts/check-blog-skills.mjs # Offline Anatomy integrity check
├── scripts/test-site.mjs        # Run only this site's Node tests
├── sitemap.xml          # Published fa/en page URLs and alternatives
├── robots.txt           # Crawler discovery pointer
├── AGENTS.md            # Persistent design and content rules
├── portfolio.css        # Current layout, responsive styles and glass footer
├── portfolio.js         # Both languages, career/project data and interactions
├── images/
│   ├── myphoto.webp     # Portrait used by the current website
│   └── myphoto.jpg      # Original portrait, retained
├── fonts/
│   ├── Vazirmatn.ttf    # Locally hosted variable font
│   └── OFL.txt          # Font license
└── README.md
```

Earlier files such as `style.css`, `profile.css` and `script.js` remain in the repository for reference. The current pages load `portfolio.css` and `portfolio.js`; edit those files for the current design.

## Run locally

You need Git, Python 3 and a modern browser for the commands below.

```sh
git clone https://github.com/mamadalili/personal-web.git
cd personal-web
python -m http.server 8080
```

On systems where Python 3 is named `python3`, use `python3 -m http.server 8080` instead. Open [localhost:8080](http://localhost:8080). Any equivalent static HTTP server also works.

## Pages and navigation

The glass navigation (top centre on desktop/tablet, bottom centre on phones) links to Home, Solutions, Blog, CV and Contact, in that order. Each link keeps the selected language. Solutions stays active on its four detail pages. The homepage hero opens the hub, with four capability tiles linking directly to the detail pages.

| Page | File | Content |
| --- | --- | --- |
| Home | `index.html` | Introduction, portrait and cards for CV, Blog and Contact |
| Solutions | `strategy.html` | Shared four-branch selector; Strategy is the default entry |
| Strategy / Execution / Technology / AI Tools | `strategy.html`, `execution.html`, `technology.html`, `ai-tools.html` | Dedicated solution pages with scope, outputs, approach and related experience |
| Blog | `blog.html` | Published posts and search; preview link while empty |
| CV | `profile.html` | Original professional profile, experience, projects, About and Contact tabs |
| Contact | `contact.html` | Call, WhatsApp, Telegram, email, GitHub and professional CV |
| Legacy Skills URL | `skills.html` | Noindex compatibility redirect to the CV experience tab |

`landing.html` is an alternative entry point for Home. Previously shared homepage URLs containing `tab` or `role` continue to open the CV.

| Example | Result |
| --- | --- |
| `/?lang=fa` | Persian homepage, right-to-left layout |
| `/?lang=en` | English homepage, left-to-right layout |
| `/profile.html?lang=fa&tab=projects` | Persian CV projects |
| `/profile.html?lang=en&tab=experience&role=turbin` | English Turbin Tahrir experience |
| `/strategy.html?lang=fa` | Persian Solutions entry with the four-branch selector |
| `/ai-tools.html?lang=en` | AI Tools solution in English |
| `/blog.html?lang=fa` | Persian blog |
| `/blog-template.html?lang=fa` | Interactive template preview |
| `/article.html?post=slug&lang=en` | Published article in English |

Supported main tabs are `experience`, `projects`, `about` and `contact`. Work-history dates remain in the **Solar Hijri calendar**, including in English, where `SH` is shown.

## Turn writing into an interactive article

Use [the ready-to-copy Persian prompt](prompts/interactive-blog.fa.md), paste the article and sources, and follow [the companion workflow](.agents/skills/interactive-blog-anatomy/SKILL.md). Choose interactions for the reader’s question: filters, details, comparisons, charts or calculators as appropriate. Anatomy is optional and should be omitted when a physical mechanism does not help explain the subject. [The authoring guide](docs/interactive-blog.md) covers native fa/en, accessibility and the block schema.

The complete Anatomy source is pinned to [revision 1482e8469b0a9e0d8cc18ea2740a01423d29ae80](https://github.com/wheresryan22/anatomy/tree/1482e8469b0a9e0d8cc18ea2740a01423d29ae80), with its MIT license and file hashes in `docs/anatomy-source.json`. The project skills travel under `.agents/skills`, so cloning preserves the optional resource and content-led workflow. Current articles do not load the Anatomy runtime. If a future article benefits from a figure, use the framework-free kit and integrate only the required assets with the existing renderer.

Real posts are imported from `posts/` into the `posts` registry in `blog-data.mjs`, with both language versions and `status:'published'`. They appear automatically in the blog list and open at `article.html?post=slug`. The demo is separate, labelled as illustrative, and does not count as a published post. A `draft` source entry is not private in a public repository.

Keep real sources, units, formulas and claims intact. Do not reuse the demo numbers as actual business results. The built-in simulator specifically calculates estimated orders from visits and conversion rate; other formulas need their own implementation and checks.

## Customization

### Sitemap and public base URL

The public deployment base is `https://mrdalili.ir/`. Update `site-config.mjs` if the domain changes, then run:

```sh
node scripts/generate-sitemap.mjs
node scripts/generate-sitemap.mjs --check
```

The generator reads the six main routes, `solutions-data.mjs` and published entries from `blog-data.mjs`. It currently produces 24 URLs: Home, Solutions, Skills, Blog, CV, Contact, the four solution pages and the two published articles, each in Persian and English. Templates, drafts, the duplicate landing/index aliases and CV tab/role views are excluded. The root URL represents Home. No modification dates are fabricated.

Each URL has matching `fa`, `en` and Persian-fallback `x-default` alternatives, using [Google's multilingual sitemap format](https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap). URLs are absolute and XML-escaped according to the [Sitemap protocol](https://www.sitemaps.org/protocol.html). `robots.txt` contains the discovery pointer. File generation does not publish the site or submit it to Search Console.

### Content and translations

Edit `solutions-data.mjs` for the Solutions hub and the four detail pages. All visitor-facing fields have native `fa` and `en` versions. Keep evidence links tied to actual work history, and describe proposed collaboration without invented outcomes or guarantees.

Edit `portfolio.js`:

- `career`: role IDs, companies, dates, responsibilities and tags in both languages.
- `projects`: project titles, descriptions, tags and optional repository links.
- `copy.fa` and `copy.en`: CV labels, biography, education and contact copy.
- `siteCopy.fa` and `siteCopy.en`: homepage, page cards, blog, contact page and footer-navigation translations.
- `skillsCopy.fa` and `skillsCopy.en`: Skills card, detailed capabilities, related work-history entries and calls to action.
- `pageFiles`: the four footer destinations. `pageURL()` also resolves the dedicated Skills page, keeping routes compatible with static hosting in a subdirectory.

Keep both languages in sync. Preserve stable role IDs so existing links continue to work. Career-wide achievements should not be assigned to a particular employer unless supported by the supplied résumé or project evidence. Update the visible tab counts if the number of entries changes.

### Colors, layout and typography

Edit CSS custom properties and component styles in `portfolio.css`. Keep homepage cards unnumbered, with no decorative leading zeroes, and calls to action bold and black as described in `AGENTS.md`:


| Token | Current value | Use |
| --- | --- | --- |
| `--purple` | `#1c0998` | Accent and active controls |
| `--ink` | `#292634` | Main text |
| `--bg` | `#f6f6f9` | Page background |
| `--pale` | `#efedff` | Selected experience |

Vazirmatn is served locally, with system-font fallbacks. The main responsive breakpoints are `760px` for the stacked layout and `1000px` for compact desktop columns; extra spacing applies at `1400px` and above.

Preserve the fixed top-centred glass navigation (`#footer`), the narrow-screen header spacing and anchor offsets that keep it clear of content. Use logical CSS properties so Persian and English layouts continue to mirror correctly.

### Profile photo

Replace `images/myphoto.webp` with the desired WebP image. The original JPG is retained as a source asset. The portrait crops are controlled by `.portrait`, `.header-portrait` and `.contact-profile img` in `portfolio.css`.

## Bilingual page introductions

After editing Home, CV, Contact, the four Solutions or their shared folder artwork, run `npm ci --prefix react-site` once and `node scripts/generate-entry-pages.mjs` from the repository root. Use `node scripts/generate-entry-pages.mjs --check` to check the committed HTML against the render functions. Publish both language versions of each page with the matching `portfolio.js` and `solutions.mjs`. The “Portfolio entry pages” block in the root `.htaccess` selects the response for the existing URLs. The four Solutions and Contact have stable `.fa.html` and `.en.html` files. Their historical `.html` URLs redirect to the selected language. Publish both localized files before enabling the routes. On managed hosting, merge this block into the active configuration.

## Checks after editing

```sh
node scripts/check-blog-skills.mjs
node scripts/test-site.mjs
node --check portfolio.js
node --check blog.mjs
node --check blog-core.mjs
node --check blog-data.mjs
git diff --check
```

Use the scoped runner instead of bare `node --test`, which can also discover the vendored skill's independent tests. The integrity check is offline and compares all upstream files with the pinned manifest.

In the browser, check Home, Blog, CV, Contact and Skills in both languages. On desktop, confirm the Skills hero is visible before scrolling and the lower cards start below the fold and overlap the pinned first view during scroll. Check normal stacked flow on mobile, homepage cards, active footer links, work-experience tabs, project expansion, keyboard navigation, email links, portrait loading, and narrow/mobile layouts. Confirm that the fixed top navigation does not hide headers or anchor targets and the floating capability tiles fit within the viewport. Also check article dialogs, comparison tabs, chart controls/data tables, simulator/reset/invalid inputs, and contextual links. The dependency-free Node test suite covers safe/internal links, publication filtering, chart calculations and the simulator formula.

## Privacy and external links

- The language selector saves the preference in `localStorage` and a first-party `portfolio_language` cookie. The prerendered entry pages use the cookie for requests without an explicit language.
- The selected language appears in every page URL; the main tab and role also appear on CV links for shareable navigation.
- There is no analytics script, tracking cookie or contact-form backend in the current website.
- Email links open the visitor's email application. External links navigate to their named services.
- The site serves its photo and font locally. Badge images in this GitHub README are loaded from Shields.io.

## Credits and project history

This version improves the earlier [personal-web-draft](https://github.com/mamadalili/personal-web-draft) portfolio. Its README structure and project introduction informed this documentation, updated to match the current implementation.

The profile-and-tabs layout takes inspiration from [Agile CRM — Customer Profile](https://dribbble.com/shots/3029510-Agile-CRM-Customer-Profile), adapted for a personal portfolio. The [Vazirmatn font](https://github.com/rastikerdar/vazirmatn) is distributed under the license included in `fonts/OFL.txt`.

[Anatomy](https://skills.wheresryan.sh/anatomy), by Ryan, is included as an authoring skill under the [MIT license](.agents/skills/anatomy/LICENSE). Its source is preserved separately from this site's workflow and article content.

## Contact

- **Email:** [mohammadreza.dalili@live.com](mailto:mohammadreza.dalili@live.com)
- **GitHub:** [mamadalili](https://github.com/mamadalili)
- **LinkedIn:** [mohamadreza-dalili](https://www.linkedin.com/in/mohamadreza-dalili/)
- **Personal domain:** [mrdalili.com](https://mrdalili.com)

The personal-domain link is retained from the earlier project; this README does not imply that the current branch has been deployed there.
