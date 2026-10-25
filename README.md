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
- **Personal homepage:** a portrait and name in the header, plus cards linking to CV, Blog and Contact.
- **Professional CV:** a sticky profile card on the right in Persian and on the left in English; a stacked layout on small screens.
- **Interactive experience:** eight roles with individual responsibilities, dates and focus areas.
- **Selected projects:** expandable project details, plus About and Contact tabs.
- **Liquid-glass navigation:** a floating, rounded footer with Home, Blog, CV and Contact links, translucent layers, backdrop blur and an active-page indicator. Content has bottom space to clear it.
- **Blog:** a dedicated bilingual page with an honest empty state until posts are published.
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
├── blog.html            # Blog entry point (no posts published yet)
├── contact.html         # Dedicated contact page
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

The floating footer links to four pages. Each link keeps the selected language, and the active page is marked in the navigation.

| Page | File | Content |
| --- | --- | --- |
| Home | `index.html` | Introduction, portrait and cards for CV, Blog and Contact |
| Blog | `blog.html` | Bilingual empty state until articles are published |
| CV | `profile.html` | Original professional profile, experience, projects, About and Contact tabs |
| Contact | `contact.html` | Email, GitHub and professional-profile links |

`landing.html` is an alternative entry point for Home. Previously shared homepage URLs containing `tab` or `role` continue to open the CV.

| Example | Result |
| --- | --- |
| `/?lang=fa` | Persian homepage, right-to-left layout |
| `/?lang=en` | English homepage, left-to-right layout |
| `/profile.html?lang=fa&tab=projects` | Persian CV projects |
| `/profile.html?lang=en&tab=experience&role=turbin` | English Turbin Tahrir experience |
| `/blog.html?lang=fa` | Persian blog |

Supported main tabs are `experience`, `projects`, `about` and `contact`. Work-history dates remain in the **Solar Hijri calendar**, including in English, where `SH` is shown.

## Customization

### Content and translations

Edit `portfolio.js`:

- `career`: role IDs, companies, dates, responsibilities and tags in both languages.
- `projects`: project titles, descriptions, tags and optional repository links.
- `copy.fa` and `copy.en`: CV labels, biography, education and contact copy.
- `siteCopy.fa` and `siteCopy.en`: homepage, page cards, blog, contact page and footer-navigation translations.
- `pageFiles`: relative page destinations, compatible with static hosting in a subdirectory.

Keep both languages in sync. Preserve stable role IDs so existing links continue to work. Career-wide achievements should not be assigned to a particular employer unless supported by the supplied résumé or project evidence. Update the visible tab counts if the number of entries changes.

### Colors, layout and typography

Edit CSS custom properties and component styles in `portfolio.css`:

| Token | Current value | Use |
| --- | --- | --- |
| `--purple` | `#7657d8` | Accent and active controls |
| `--ink` | `#292634` | Main text |
| `--bg` | `#f6f6f9` | Page background |
| `--pale` | `#f4f0ff` | Selected experience |

Vazirmatn is served locally, with system-font fallbacks. The main responsive breakpoints are `760px` for the stacked layout and `1000px` for compact desktop columns; extra spacing applies at `1400px` and above.

Preserve the fixed glass footer (`#footer`) and the bottom padding that prevents it from covering the end of the page. Use logical CSS properties so Persian and English layouts continue to mirror correctly.

### Profile photo

Replace `images/myphoto.webp` with the desired WebP image. The original JPG is retained as a source asset. The portrait crops are controlled by `.portrait`, `.header-portrait` and `.contact-profile img` in `portfolio.css`.

## Checks after editing

```sh
node --check portfolio.js
git diff --check
```

In the browser, check all four pages in both languages, homepage cards, active footer links, work-experience tabs, project expansion, keyboard navigation, email links, portrait loading, and narrow/mobile layouts. Confirm that the sticky profile and fixed footer do not hide the final content. These are manual checks; there is no automated test suite configured.

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
