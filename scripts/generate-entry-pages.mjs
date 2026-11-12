import {readFileSync, writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import {renderHomeFolderCards} from '../solutions.mjs';
import {escapeHTML} from '../blog-core.mjs';
import {siteUrl} from '../site-config.mjs';

const {parse} = createRequire(new URL('../react-site/package.json', import.meta.url))('acorn');
const root = new URL('../', import.meta.url);
const read = name => readFileSync(new URL(name, root), 'utf8').replaceAll('\r\n', '\n');
const source = read('portfolio.js');
const tree = parse(source, {ecmaVersion: 'latest', sourceType: 'script'});

// Use the same copy and render functions as the browser, without starting the interactive app.
const names = new Set([
  'copy', 'siteCopy', 'skillsCopy', 'homePortalCopy', 'iconPaths', 'icon', 'pageFiles',
  'extraPageFiles', 'pageURL', 'escapeHTML', 'chips', 'titleMarkup', 'professionalTitle',
  'brandMark', 'languageButtonMarkup', 'homeCardCTA', 'homeDescription', 'homeIntroMarkup',
  'homeOpeningMarkup', 'cvProfileMarkup', 'cvIntroMarkup',
]);
const declarations = [];
for (const statement of tree.body) {
  if (statement.type === 'VariableDeclaration') {
    for (const item of statement.declarations) {
      if (names.has(item.id.name)) declarations.push('const ' + source.slice(item.start, item.end) + ';');
    }
  } else if (statement.type === 'FunctionDeclaration' && names.has(statement.id.name)) {
    declarations.push(source.slice(statement.start, statement.end));
  }
}
if (declarations.length !== names.size) throw new Error('Missing portfolio entry renderer');

function renderEntry(page, lang, template) {
  const home = page === 'home';
  const file = home ? 'index.html' : 'profile.html';
  const other = lang === 'fa' ? 'en' : 'fa';
  const isFa = lang === 'fa';
  const parts = runInNewContext(declarations.join('\n') + `
    const person = copy[lang], site = siteCopy[lang];
    const folders = () => renderHomeFolderCards({language: lang, url: pageURL, portals: homePortalCopy[lang]});
    ({
      name: person.name, role: titleMarkup(), languageButton: languageButtonMarkup(),
      label: site.nav[home ? 0 : 3], homeLabel: site.nav[0], navLabel: site.navLabel,
      description: home ? homeDescription() : person.intro,
      headerImage: home ? '<img class="header-portrait" src="images/myphoto-avatar-v1.webp" width="59" height="59" alt="" fetchpriority="high">' : brandMark(),
      main: home ? '<div class="home-scroll-story">' + homeOpeningMarkup(folders()) + '</div>'
        : '<aside id="profile" class="profile-card" aria-label="' + escapeHTML(person.name) + '">' + cvProfileMarkup() + '</aside>'
        + '<section class="workspace"><div id="intro" class="intro">' + cvIntroMarkup() + '</div></section>',
      navigation: Object.keys(pageFiles).map((id, i) => '<a href="' + pageURL(id) + '"' + (id === page ? ' aria-current="page"' : '') + '>' + icon(id) + '<span>' + escapeHTML(site.nav[i]) + '</span></a>').join('')
    })
  `, {lang, home, page, renderHomeFolderCards}, {timeout: 1000});

  const canonical = new URL(home ? './' : file, siteUrl);
  canonical.searchParams.set('lang', lang);
  const head = template.slice(0, template.indexOf('</head>'))
    .replace(/<html\b[^>]*>/, `<html lang="${lang}" dir="${isFa ? 'rtl' : 'ltr'}" data-theme="light">`)
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHTML(parts.label)} — ${escapeHTML(parts.name)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, () => `<meta name="description" content="${escapeHTML(parts.description)}">`)
    .replace(/portfolio\.js\?v=[^"]+/, 'portfolio.js?v=20261112-entry')
    .replace(/^  <link rel="canonical".*\n/gm, '');
  const coast = template.match(/<picture class="page-coast"[\s\S]*?<\/picture>/)[0];
  return `${head}  <link rel="canonical" href="${canonical.href}">
</head>
<body data-page="${page}" data-current-page="${page}">
  <a href="#main" class="skip">${isFa ? 'رفتن به محتوای اصلی' : 'Skip to content'}</a>
  <header class="site-header"><a class="brand" href="index.html?lang=${lang}" aria-label="${escapeHTML(parts.homeLabel)} — ${escapeHTML(parts.name)}"><span class="brand-mark">${parts.headerImage}</span><span class="brand-identity"><span id="brand-name">${escapeHTML(parts.name)}</span><span class="professional-title header-role" id="brand-role">${parts.role}</span></span></a><div class="header-end"><span id="header-label"${home ? ' hidden' : ''}>${home ? '' : escapeHTML(parts.label)}</span><day-night-switch></day-night-switch><button id="language" type="button" lang="${other}" dir="${isFa ? 'ltr' : 'rtl'}" aria-label="${isFa ? 'Switch to English' : 'تغییر زبان به فارسی'}">${parts.languageButton}</button></div></header>
  <main id="main" tabindex="-1" class="${home ? 'page-layout' : 'layout'}" data-entry-lang="${lang}">${parts.main}</main>
  ${coast}
  <footer id="footer" class="footer"><nav aria-label="${escapeHTML(parts.navLabel)}">${parts.navigation}</nav></footer>
  <noscript><style>#language,day-night-switch{display:none}</style><p class="noscript"><a href="${file}?lang=${other}" lang="${other}">${isFa ? 'English' : 'فارسی'}</a></p></noscript>
</body>
</html>
`;
}

for (const [file, page] of [['index', 'home'], ['profile', 'cv']]) {
  const template = read(file + '.html');
  for (const lang of ['fa', 'en']) {
    const target = file + (lang === 'en' ? '.en' : '') + '.html';
    const html = renderEntry(page, lang, template);
    if (process.argv.includes('--check')) {
      if (read(target) !== html) throw new Error('Stale initial HTML: ' + target);
    } else {
      writeFileSync(new URL(target, root), html);
    }
    console.log(target);
  }
}
