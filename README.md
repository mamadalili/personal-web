<div align="center">

# MohamadReza Portfolio

**A bilingual personal portfolio for Mohamad Reza Dalili.**

E-commerce, online sales and digital marketing experience, presented through a personal profile and interactive work tabs.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E)

فارسی و انگلیسی، پروفایل ثابت، تجربه‌های کاری تعاملی و فوتر شیشه‌ای

</div>

## Key features

- **Native Persian and English:** complete translations, a language switch and mirrored RTL/LTR layouts. No browser translation is required.
- **Personal profile:** a sticky profile card on the right in Persian and on the left in English; a stacked layout on small screens.
- **Interactive experience:** eight roles with individual responsibilities, dates and focus areas.
- **Selected projects:** expandable project details, plus About and Contact tabs.
- **Glass footer:** the original blue glass-inspired footer remains fixed at the bottom, with blur, transparency and space beneath the content.
- **Local assets:** a WebP portrait and a self-hosted Vazirmatn font.
- **No build step:** plain HTML, CSS and JavaScript; no package installation or runtime framework required.
- **Keyboard support:** tab semantics, arrow-key navigation, Home/End, visible focus and reduced-motion support.

## Project structure

```text
personal-web/
├── index.html           # Homepage shell
├── profile.html         # Profile entry point
├── landing.html         # Alternative homepage entry point
├── contact.html         # Opens the Contact tab by default
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

## Continue in the same Codespace

1. On the other computer, sign in to GitHub with the account that owns the existing Codespace.
2. Open [Your Codespaces](https://github.com/codespaces) and select the existing environment for `mamadalili/personal-web`.
3. Wait for it to resume and open the project folder `/workspaces/personal-web`.
4. Open **Terminal → New Terminal**. To work with the Codex CLI already installed in the current environment, run:

   ```sh
   cd /workspaces/personal-web
   codex
   ```

5. Ask Codex to read this README and inspect `portfolio.js` and `portfolio.css`, then describe the change you want.

The same Codespace contains the same workspace files when accessed from another computer. Opening it does not automatically transfer a separate desktop chat into the CLI. Use the repository documentation to establish context in a new chat; `codex resume` can reopen saved CLI chats when available in that environment.

If Codex requests authentication and you want to sign in with ChatGPT from the remote terminal, use `codex login --device-auth` and follow its link and one-time code. Device-code login must be allowed by your account or workspace. See [official authentication guidance](https://learn.chatgpt.com/docs/auth).

For a browser preview in Codespaces, use a free port, for example:

```sh
cd /workspaces/personal-web
python3 -m http.server 8081
```

Open the **Ports** panel and choose **Open in Browser** for port `8081`. Keep the port private. A localhost address from another computer is not a portable Codespace preview URL.

### راهنمای کوتاه فارسی

در سیستم دوم با همان حساب گیت‌هاب وارد شوید و از صفحهٔ Codespaces، محیط موجود پروژه را باز کنید. در ترمینال پوشهٔ `/workspaces/personal-web` دستور `codex` را اجرا کنید. فایل‌ها همان فایل‌های این پروژه هستند؛ برای معرفی وضعیت کار به گفت‌وگوی جدید، از کدکس بخواهید ابتدا README را بخواند. برای مشاهدهٔ سایت، سرور محلی را اجرا و پورت آن را از بخش Ports در مرورگر باز کنید.

## Pages and navigation

All four HTML entry points use the same portfolio interface. `contact.html` initially selects Contact; the others initially select Experience. Explicit query parameters override these defaults.

| Example | Result |
| --- | --- |
| `/?lang=fa` | Persian, right-to-left layout |
| `/?lang=en` | English, left-to-right layout |
| `/?lang=fa&tab=projects` | Persian projects |
| `/?lang=en&tab=experience&role=turbin` | English Turbin Tahrir experience |

Supported main tabs are `experience`, `projects`, `about` and `contact`. Work-history dates remain in the **Solar Hijri calendar**, including in English, where `SH` is shown.

## Customization

### Content and translations

Edit `portfolio.js`:

- `career`: role IDs, companies, dates, responsibilities and tags in both languages.
- `projects`: project titles, descriptions, tags and optional repository links.
- `copy.fa` and `copy.en`: interface labels, biography, education and contact copy.

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

Replace `images/myphoto.webp` with the desired WebP image. The original JPG is retained as a source asset. The portrait crop is controlled by `.portrait` in `portfolio.css`.

## Checks after editing

```sh
node --check portfolio.js
git diff --check
```

In the browser, check both languages, work-experience tabs, project expansion, keyboard navigation, email links, portrait loading, and narrow/mobile layouts. Confirm that the sticky profile and fixed footer do not hide the final content. These are manual checks; there is no automated test suite configured.

## Privacy and external links

- The website remembers the language in browser `localStorage` under `portfolio-language`.
- The selected language, main tab and role appear in the URL for shareable navigation.
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
