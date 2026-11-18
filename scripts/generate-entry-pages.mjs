import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {GlassNavigation, CoastPrint} from '../src/components/site-chrome.mjs';
import {readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {renderWorkStoriesMarkup, workStoriesCopy} from '../public/work-stories-view.mjs';
import {copy, siteCopy, homePortalCopy, career, pageFiles, pageSearchTitles} from '../src/content/index.mjs';
import {skillIcon} from '../src/portfolio/icons.mjs';
import {createPortfolioView} from '../src/portfolio/view.mjs';
import {renderHomeFolderCards, renderSolutionPage} from '../public/solutions.mjs';
import {solutions} from '../public/solutions-data.mjs';
import {escapeHTML} from '../public/blog-core.mjs';
import {localizedEntryFile, siteUrl} from '../public/site-config.mjs';
import {entryResources} from '../src/templates/entry-resources.mjs';
import {homeFirstPosts} from '../public/home-blog-view.mjs';
import {publishedStories} from './published-stories.mjs';
import {postSummaries} from '../public/blog-summary-model.mjs';

const root = new URL('../public/', import.meta.url);
const read = name => readFileSync(new URL(name, root), 'utf8').replaceAll('\r\n', '\n');
const retryScript=readFileSync(new URL('../src/templates/retry-assets.js',import.meta.url),'utf8').trimEnd().replaceAll('\r\n','\n');

function renderEntry(stem, page, lang, storyPosts, homePosts) {
  const home = page === 'home';
  const file = stem + '.html';
  const solution = page === 'solutions' ? stem : null;
  const other = lang === 'fa' ? 'en' : 'fa';
  const isFa = lang === 'fa';
  const {brandMark, titleMarkup, languageButtonMarkup, years, pageURL, cvProfileMarkup, cvIntroMarkup, renderMotionScene, homeDescription, homeBodyMarkup, renderCollaborationCTA, companyWebsite, contactPageMarkup}=createPortfolioView(lang);
  const person = copy[lang], site = siteCopy[lang];
  const folders = () => renderHomeFolderCards({language: lang, url: pageURL, portals: homePortalCopy[lang]});
  let main, description, title;
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
    main=homeBodyMarkup(folders(),homeFirstPosts(lang,homePosts));
    description=homeDescription();
  } else {
    main='<aside id="profile" class="profile-card" aria-label="'+escapeHTML(person.name)+'">'+cvProfileMarkup()+'</aside>'
      +'<section class="workspace"><div id="intro" class="intro">'+cvIntroMarkup()+'</div></section>';
    description=person.intro;
  }
  const parts = {
    main, description, title:pageSearchTitles[lang]?.[page] || title || label+' — '+person.name,
    name: person.name, role: titleMarkup(), languageButton: languageButtonMarkup(),
    label, homeLabel: site.nav[0], navLabel: site.navLabel,
    headerImage: home ? '<img class="header-portrait" src="images/myphoto-avatar-v1.webp" width="59" height="59" alt="" fetchpriority="high">' : brandMark(),
  };

  const canonical = new URL(home ? './' : localizedEntryFile(file,lang), siteUrl);
  canonical.searchParams.set('lang', lang);
  const resources=entryResources[page].map(file=>file.includes('.js?')
    ? `  <script src="${file}" defer></script>`
    : `  <link rel="stylesheet" href="${file}">`).join('\n');
  const head=`<!doctype html>
<html lang="${lang}" dir="${isFa?'rtl':'ltr'}" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
${page==='work-stories'?'  <script>\n'+retryScript+'\n  </script>\n':''}  <meta name="theme-color" content="#1c0998">
  <meta name="color-scheme" content="only light">
  <script src="day-night.js?v=20261110-session"></script>
  <meta name="description" content="${escapeHTML(parts.description)}">
  <title>${escapeHTML(parts.title)}</title>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="preload" href="fonts/Vazirmatn.woff2" as="font" type="font/woff2" crossorigin>
${resources}
`;
  const coast=renderToStaticMarkup(h(CoastPrint));
  const footer=renderToStaticMarkup(h(GlassNavigation,{lang,active:navPage,hrefFor:pageURL}));
  return `${head}  <link rel="canonical" href="${canonical.href}">
</head>
<body data-page="${page}"${solution ? ` data-solution="${solution}"` : ''} data-current-page="${page}">
  <a href="#main" class="skip">${isFa ? 'رفتن به محتوای اصلی' : 'Skip to content'}</a>
  <header class="site-header"><a class="brand" href="index.html?lang=${lang}" aria-label="${escapeHTML(parts.homeLabel)} — ${escapeHTML(parts.name)}"><span class="brand-mark">${parts.headerImage}</span><span class="brand-identity"><span id="brand-name">${escapeHTML(parts.name)}</span><span class="professional-title header-role" id="brand-role">${parts.role}</span></span></a><div class="header-end"><span id="header-label"${home ? ' hidden' : ''}>${home ? '' : escapeHTML(parts.label)}</span><day-night-switch></day-night-switch><button id="language" type="button" lang="${other}" dir="${isFa ? 'ltr' : 'rtl'}" aria-label="${isFa ? 'Switch to English' : 'تغییر زبان به فارسی'}">${parts.languageButton}</button></div></header>
  <main id="main" tabindex="-1" class="${solution ? 'page-layout solutions-page' : page === 'cv' ? 'layout' : page === 'work-stories' ? 'page-layout work-stories-page' : 'page-layout'}" data-entry-lang="${lang}">${parts.main}</main>
  ${coast}
  ${footer}
  <noscript><style>#language,day-night-switch{display:none}</style><p class="noscript"><a href="${localizedEntryFile(file,other)}?lang=${other}" lang="${other}">${isFa ? 'English' : 'فارسی'}</a></p></noscript>
</body>
</html>
`;
}

const pages = [['index', 'home'], ['profile', 'cv'], ['contact', 'contact'], ['work-stories', 'work-stories'],
  ...solutions.map(({id}) => [id, 'solutions'])];
function buildEntries(selection, storyPosts, homePosts) {
  const entries = new Map();
  for (const [file, page] of selection) {
    for (const lang of ['fa', 'en']) {
      const targets = new Set([file + (lang === 'en' ? '.en' : '') + '.html']);
      if (page !== 'home') targets.add(localizedEntryFile(file+'.html',lang));
      if (page === 'cv' && lang === 'fa') targets.add('profile.fa.html');
      const html = renderEntry(file, page, lang, storyPosts, homePosts);
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

export function buildHomeEntries(posts) {
  return buildEntries([['index','home']], undefined, posts);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const remaining=process.argv.includes('--remaining');
  const selection=remaining?pages.filter(([,id])=>id!=='home'&&id!=='work-stories'):pages;
  const items=remaining?[]:(await import('../public/blog-data.mjs')).posts;
  for (const [target, html] of buildEntries(selection,publishedStories(items),postSummaries(items))) {
    if (process.argv.includes('--check')) {
      if (read(target) !== html) throw new Error('Stale initial HTML: ' + target);
    } else {
      writeFileSync(new URL(target, root), html);
    }
    console.log(target);
  }
}
