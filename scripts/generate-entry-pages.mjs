import {readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {renderWorkStoriesMarkup, workStoriesCopy} from '../work-stories.mjs';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import {renderHomeFolderCards, renderSolutionPage} from '../solutions.mjs';
import {solutions} from '../solutions-data.mjs';
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
  'homeOpeningMarkup', 'cvProfileMarkup', 'cvIntroMarkup', 'contactChannels', 'contactLinks',
  'employerWebsites', 'career', 'years', 'companyWebsite', 'companyLogo', 'renderEmployerRail', 'contactPageMarkup', 'skillIconPaths', 'skillIcon',
  'renderMotionScene', 'collaborationCopy', 'renderCollaborationCTA',
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

function renderEntry(stem, page, lang, template, storyPosts) {
  const home = page === 'home';
  const file = stem + '.html';
  const solution = page === 'solutions' ? stem : null;
  const other = lang === 'fa' ? 'en' : 'fa';
  const isFa = lang === 'fa';
  const parts = runInNewContext(declarations.join('\n') + `
    const person = copy[lang], site = siteCopy[lang];
    const folders = () => renderHomeFolderCards({language: lang, url: pageURL, portals: homePortalCopy[lang]});
    let main, description, title;
    let motionSceneSerial=0;
    const navPage=page==='work-stories'?'cv':page;
    const label=page==='work-stories'?(lang==='fa'?'روایت‌های کاری':'Work stories'):site.nav[Object.keys(pageFiles).indexOf(navPage)];
    if (solution) {
      const result=renderSolutionPage({language:lang,solution,baseURL:siteUrl,url:pageURL,icon:skillIcon,
        portals:homePortalCopy[lang],motion:id=>renderMotionScene('solution',id),
        collaboration:()=>renderCollaborationCTA({showExperience:true})});
      ({html:main,description,title}=result);
    } else if (page==='work-stories') {
      main=renderWorkStoriesMarkup({language:lang,roles:career,formatYears:years,renderWebsite:companyWebsite,storyPosts});
      description=workStoriesCopy[lang].intro;
    } else if (page==='contact') {
      main=contactPageMarkup();
      description=site.contactIntro;
    } else if (home) {
      main='<div class="home-scroll-story">'+homeOpeningMarkup(folders())+'</div>';
      description=homeDescription();
    } else {
      main='<aside id="profile" class="profile-card" aria-label="'+escapeHTML(person.name)+'">'+cvProfileMarkup()+'</aside>'
        +'<section class="workspace"><div id="intro" class="intro">'+cvIntroMarkup()+'</div></section>';
      description=person.intro;
    }
    ({
      main, description, title:title || label+' — '+person.name,
      name: person.name, role: titleMarkup(), languageButton: languageButtonMarkup(),
      label, homeLabel: site.nav[0], navLabel: site.navLabel,
      headerImage: home ? '<img class="header-portrait" src="images/myphoto-avatar-v1.webp" width="59" height="59" alt="" fetchpriority="high">' : brandMark(),
      navigation: Object.keys(pageFiles).map((id, i) => '<a href="' + pageURL(id) + '"' + (id === navPage ? ' aria-current="page"' : '') + '>' + icon(id) + '<span>' + escapeHTML(site.nav[i]) + '</span></a>').join('')
    })
  `, {lang, home, page, solution, siteUrl, storyPosts, workStoriesCopy, renderWorkStoriesMarkup, renderSolutionPage, renderHomeFolderCards, URL, URLSearchParams}, {timeout: 1000});

  const canonical = new URL(home ? './' : file, siteUrl);
  canonical.searchParams.set('lang', lang);
  const entryVersion = {home:'20261112-entry', cv:'20261114-cv-journey', 'work-stories':'20261112-work-entries'}[page] ?? '20261112-entry-solutions';
  const head = template.slice(0, template.indexOf('</head>'))
    .replace(/<html\b[^>]*>/, `<html lang="${lang}" dir="${isFa ? 'rtl' : 'ltr'}" data-theme="light">`)
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHTML(parts.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, () => `<meta name="description" content="${escapeHTML(parts.description)}">`)
    .replace(/portfolio\.js\?v=[^"]+/, 'portfolio.js?v=' + entryVersion)
    .replace(/^  <link rel="canonical".*\n/gm, '');
  const coast = template.match(/<picture class="page-coast"[\s\S]*?<\/picture>/)[0];
  return `${head}  <link rel="canonical" href="${canonical.href}">
</head>
<body data-page="${page}"${solution ? ` data-solution="${solution}"` : ''} data-current-page="${page}">
  <a href="#main" class="skip">${isFa ? 'رفتن به محتوای اصلی' : 'Skip to content'}</a>
  <header class="site-header"><a class="brand" href="index.html?lang=${lang}" aria-label="${escapeHTML(parts.homeLabel)} — ${escapeHTML(parts.name)}"><span class="brand-mark">${parts.headerImage}</span><span class="brand-identity"><span id="brand-name">${escapeHTML(parts.name)}</span><span class="professional-title header-role" id="brand-role">${parts.role}</span></span></a><div class="header-end"><span id="header-label"${home ? ' hidden' : ''}>${home ? '' : escapeHTML(parts.label)}</span><day-night-switch></day-night-switch><button id="language" type="button" lang="${other}" dir="${isFa ? 'ltr' : 'rtl'}" aria-label="${isFa ? 'Switch to English' : 'تغییر زبان به فارسی'}">${parts.languageButton}</button></div></header>
  <main id="main" tabindex="-1" class="${solution ? 'page-layout solutions-page' : page === 'cv' ? 'layout' : page === 'work-stories' ? 'page-layout work-stories-page' : 'page-layout'}" data-entry-lang="${lang}">${parts.main}</main>
  ${coast}
  <footer id="footer" class="footer"><nav aria-label="${escapeHTML(parts.navLabel)}">${parts.navigation}</nav></footer>
  <noscript><style>#language,day-night-switch{display:none}</style><p class="noscript"><a href="${file}?lang=${other}" lang="${other}">${isFa ? 'English' : 'فارسی'}</a></p></noscript>
</body>
</html>
`;
}

const pages = [['index', 'home'], ['profile', 'cv'], ['contact', 'contact'], ['work-stories', 'work-stories'],
  ...solutions.map(({id}) => [id, 'solutions'])];
function buildEntries(selection, storyPosts) {
  const entries = new Map();
  for (const [file, page] of selection) {
    const template = read(file + '.html');
    for (const lang of ['fa', 'en']) {
      const targets = [file + (lang === 'en' ? '.en' : '') + '.html'];
      if (lang === 'fa' && ['solutions','contact','work-stories'].includes(page)) targets.push(file+'.fa.html');
      const html = renderEntry(file, page, lang, template, storyPosts);
      for (const target of targets) {
        entries.set(target, html);
      }
    }
  }
  return entries;
}

export function buildWorkStoryEntries(storyPosts) {
  return buildEntries([['work-stories','work-stories']], storyPosts);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  for (const [target, html] of buildEntries(pages)) {
    if (process.argv.includes('--check')) {
      if (read(target) !== html) throw new Error('Stale initial HTML: ' + target);
    } else {
      writeFileSync(new URL(target, root), html);
    }
    console.log(target);
  }
}
