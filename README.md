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

- **Native Persian and English:** complete translations, a language switch and mirrored RTL/LTR layouts. No browser translation is required.
- **Personal homepage:** a welcome introduction and “Find your way around” heading lead to a prominent Solutions hero. On desktop, the first view stays pinned as the lower Blog/CV/Contact cards scroll over it; those cards start below the first viewport. Blog is the large lower card, with equally sized small CV/Contact cards. Narrow screens use normal document flow. A portrait and name remain in the header; cards are unnumbered.
- **Solutions / راهکارها:** a category hub with complete bilingual pages for Strategy, Execution, Technology and AI Tools. Each explains suitable problems, proposed outputs, the working process, related experience and ways to begin a conversation. Four homepage capability tiles link directly to these pages in the existing balanced 2×2 breakout layout; the Skills page remains available as supporting background.
- **Visual style:** primary accent `#1c0998` (RGB 28, 9, 152), with bold black call-to-action labels on light surfaces. Design rules are recorded in `AGENTS.md`.
- **Professional CV:** a sticky profile card on the right in Persian and on the left in English; a stacked layout on small screens.
- **Interactive experience:** eight roles with individual responsibilities, dates and focus areas.
- **Selected projects:** expandable project details, plus About and Contact tabs.
- **Liquid-glass navigation:** fixed at the top centre on desktop and mobile, with Home, Solutions, Blog, CV and Contact links, rounded translucent layers, backdrop blur and an active-page indicator. Header and anchor spacing clear the bar. The historical element ID is `footer`.
- **Interactive blog:** native bilingual articles with an active outline, reading progress, comparison tabs, glossary dialogs, application explorers, proportional treemaps, linear/log charts, data tables, tested learning calculators and interpretation quizzes. Visible source cards distinguish disclosures, estimates and assumptions. The labelled template example stays separate from published articles.
- **First article:** “Inside the AI Model Market” is an independently written, attributed interpretation of the reference research, with dated primary disclosures and adjustable educational scenarios. Open `article.html?post=ai-model-market&lang=fa` or switch to `lang=en`.
- **Article conversion prompt:** a ready-to-use Persian prompt turns supplied writing into appropriate interactions while preserving claims and sources.
- **Contact page:** direct email and GitHub links, plus a link back to the professional CV.
- **Local assets:** a WebP portrait and a self-hosted Vazirmatn font.
- **No build step:** plain HTML, CSS and JavaScript; no package installation or runtime framework required.
- **Keyboard support:** tab semantics, arrow-key navigation, Home/End, visible focus and reduced-motion support.

## Project structure

```text
personal-web/
├── index.html           # Homepage with page cards
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
├── tests/blog-core.test.mjs      # Node tests for links and calculations
├── contact.html         # Dedicated contact page
├── skills.html          # Supporting skills and work experience
├── solutions.html       # Solutions category hub
├── strategy.html        # Strategy solution
├── execution.html       # Execution solution
├── technology.html      # Technology solution
├── ai-tools.html        # AI Tools solution
├── solutions-data.mjs   # Native bilingual Solutions content
├── solutions.mjs        # Shared hub/detail renderer
├── solutions.css        # Solutions layouts
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

The glass navigation at the top centre links to Home, Solutions, Blog, CV and Contact, in that order. Each link keeps the selected language. Solutions stays active on its four detail pages and the supporting Skills page. The homepage hero opens the hub, with four capability tiles linking directly to the detail pages.

| Page | File | Content |
| --- | --- | --- |
| Home | `index.html` | Introduction, portrait and cards for CV, Blog and Contact |
| Solutions | `solutions.html` | Hub for Strategy, Execution, Technology and AI Tools |
| Strategy / Execution / Technology / AI Tools | `strategy.html`, `execution.html`, `technology.html`, `ai-tools.html` | Dedicated solution pages with scope, outputs, approach and related experience |
| Blog | `blog.html` | Published posts and search; preview link while empty |
| CV | `profile.html` | Original professional profile, experience, projects, About and Contact tabs |
| Contact | `contact.html` | Email, GitHub and professional-profile links |
| Skills | `skills.html` | Capability areas and links to relevant work experience |

`landing.html` is an alternative entry point for Home. Previously shared homepage URLs containing `tab` or `role` continue to open the CV.

| Example | Result |
| --- | --- |
| `/?lang=fa` | Persian homepage, right-to-left layout |
| `/?lang=en` | English homepage, left-to-right layout |
| `/profile.html?lang=fa&tab=projects` | Persian CV projects |
| `/profile.html?lang=en&tab=experience&role=turbin` | English Turbin Tahrir experience |
| `/solutions.html?lang=fa` | Persian Solutions hub |
| `/ai-tools.html?lang=en` | AI Tools solution in English |
| `/blog.html?lang=fa` | Persian blog |
| `/blog-template.html?lang=fa` | Interactive template preview |
| `/article.html?post=slug&lang=en` | Published article in English |

Supported main tabs are `experience`, `projects`, `about` and `contact`. Work-history dates remain in the **Solar Hijri calendar**, including in English, where `SH` is shown.

## Turn writing into an interactive article

Use [the ready-to-copy Persian prompt](prompts/interactive-blog.fa.md), paste the article text and any sources/data, and let the coding agent apply the existing components. [The authoring guide](docs/interactive-blog.md) describes the schema and supported blocks. Choose interactions that explain the article; not every post needs a chart or calculator.

Real posts are imported from `posts/` into the `posts` registry in `blog-data.mjs`, with both language versions and `status:'published'`. They appear automatically in the blog list and open at `article.html?post=slug`. The demo is separate, labelled as illustrative, and does not count as a published post. A `draft` source entry is not private in a public repository.

Keep real sources, units, formulas and claims intact. Do not reuse the demo numbers as actual business results. The built-in simulator specifically calculates estimated orders from visits and conversion rate; other formulas need their own implementation and checks.

## Customization

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

## Checks after editing

```sh
node --test
node --check portfolio.js
node --check blog.mjs
node --check blog-core.mjs
node --check blog-data.mjs
git diff --check
```

In the browser, check Home, Blog, CV, Contact and Skills in both languages. On desktop, confirm the Skills hero is visible before scrolling and the lower cards start below the fold and overlap the pinned first view during scroll. Check normal stacked flow on mobile, homepage cards, active footer links, work-experience tabs, project expansion, keyboard navigation, email links, portrait loading, and narrow/mobile layouts. Confirm that the fixed top navigation does not hide headers or anchor targets and the floating capability tiles fit within the viewport. Also check article dialogs, comparison tabs, chart controls/data tables, simulator/reset/invalid inputs, and contextual links. The dependency-free Node test suite covers safe/internal links, publication filtering, chart calculations and the simulator formula.

## Privacy and external links

- The website remembers the language in browser `localStorage` under `portfolio-language`.
- The selected language appears in every page URL; the main tab and role also appear on CV links for shareable navigation.
- There is no analytics script, tracking cookie or contact-form backend in the current website.
- Email links open the visitor's email application. External links navigate to their named services.
- The site serves its photo and font locally. Badge images in this GitHub README are loaded from Shields.io.

## Credits and project history

This version improves the earlier [personal-web-draft](https://github.com/mamadalili/personal-web-draft) portfolio. Its README structure and project introduction informed this documentation, updated to match the current implementation.

The profile-and-tabs layout takes inspiration from [Agile CRM — Customer Profile](https://dribbble.com/shots/3029510-Agile-CRM-Customer-Profile), adapted for a personal portfolio. The [Vazirmatn font](https://github.com/rastikerdar/vazirmatn) is distributed under the license included in `fonts/OFL.txt`.

## Contact

- **Email:** [mohammadreza.dalili@live.com](mailto:mohammadreza.dalili@live.com)
- **GitHub:** [mamadalili](https://github.com/mamadalili)
- **LinkedIn:** [mohamadreza-dalili](https://www.linkedin.com/in/mohamadreza-dalili/)
- **Personal domain:** [mrdalili.com](https://mrdalili.com)

The personal-domain link is retained from the earlier project; this README does not imply that the current branch has been deployed there.
