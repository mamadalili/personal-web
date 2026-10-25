# Personal Web

Bilingual Persian / English portfolio for Mohamad Reza Dalili.

## Run on another computer

Clone this repository, open its folder, then run:

```sh
python -m http.server 8080
```

Open http://localhost:8080 . No package installation or build is required.
You can also open the existing Codespace from another computer.

## Edit the website

- `portfolio.js`: Persian and English text, work experience, projects, and tab behavior.
- `portfolio.css`: responsive layout, mirrored RTL/LTR columns, and the fixed glass footer.
- `images/myphoto.webp`: profile photo.
- `index.html`: homepage shell. `profile.html` and `landing.html` share the same portfolio; `contact.html` opens the contact tab.
- `fonts/`: locally hosted Vazirmatn font and its open font license.

Language and selected tabs can be linked with `?lang=fa` or `?lang=en`, plus `tab` and `role` parameters. Language preference is remembered in the browser.

Work-history years use the Solar Hijri calendar in both languages.
