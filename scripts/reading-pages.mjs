import {readFileSync} from 'node:fs';
import {escapeHTML as esc, internalHref, publishedPosts, chartValues} from '../blog-core.mjs';
import {libraryCopy, renderArchive} from '../blog-index.mjs';
import {articleRichText, readingBlock, readingWidget, renderArticleFrame} from '../blog-reading.mjs';
import {createResearchWidgets} from '../blog-widgets.mjs';
import {createHash} from 'node:crypto';
import {withDataMotion} from '../blog-data-motion-model.mjs';
import {siteUrl as siteOrigin} from '../site-config.mjs';

const shell = () => readFileSync(new URL('../article.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const nav = [
  ['index.html','خانه','Home'], ['strategy.html','راهکارها','Solutions'], ['blog.html','بلاگ','Blog'],
  ['profile.html','CV','CV'], ['contact.html','تماس','Contact']
];
const names = {fa:'محمدرضا دلیلی',en:'Mohamad Reza Dalili'};

function localizedDocument(template,{lang,slug,title,intro,main,classes,dataSrc}) {
  const archive = !slug, page = archive ? 'blog' : 'article';
  const url = archive ? 'blog.html?lang=' + lang : 'article.html?post=' + slug + '&lang=' + lang;
  const navMarkup = nav.map(([file,fa,en]) => `<a href="/${file}?lang=${lang}">${lang==='fa'?fa:en}</a>`).join(' ');
  let html = template.replace(/<html lang="fa" dir="rtl"/,`<html lang="${lang}" dir="${lang==='fa'?'rtl':'ltr'}"`)
    .replace(/<title>.*?<\/title>/,()=>`<title>${esc(title)} — ${names[lang]}</title>`)
    .replace(/<meta name="description" content="[^"]*">/,()=>`<meta name="description" content="${esc(intro)}">`)
    .replace('<meta name="theme-color"',()=>`<script>if (location.pathname.includes('/reading/')) {const u=new URL('../../${page}.html',location.href);u.search=location.search;u.searchParams.set('lang','${lang}');${slug?`u.searchParams.set('post','${slug}');`:''}u.hash=location.hash;history.replaceState(null,'',u)}</script>\n  <meta name="theme-color"`)
    .replace('</head>',()=>`  <link rel="canonical" href="${esc(new URL(url,siteOrigin).href)}">\n</head>`)
    .replace('<body data-page="article">',`<body data-page="${page}" data-current-page="${page}">`)
    .replace(/<main id="main"[\s\S]*?<\/main>/,()=>`<main id="main" tabindex="-1" class="page-layout ${classes}" data-reading-lang="${lang}" data-reading-post="${slug||''}"${dataSrc?` data-reading-src="${esc(dataSrc)}"`:''}>${main}</main>`)
    .replace(/<noscript>[\s\S]*?<\/noscript>/,()=>`<noscript><nav class="noscript" aria-label="${lang==='fa'?'صفحه‌ها':'Pages'}">${navMarkup} <a href="/${archive?'blog.html?lang=':'article.html?post='+slug+'&amp;lang='}${lang==='fa'?'en':'fa'}">${lang==='fa'?'English':'فارسی'}</a></nav></noscript>`);
  if (archive) html = html
    .replace('portfolio.js?v=20261110-recovery','portfolio.js?v=20261112-archive')
    .replace('رفتن به محتوای اصلی / Skip to content',lang==='fa'?'رفتن به محتوای اصلی':'Skip to content')
    .replace(/<span id="header-label">[^<]*<\/span>/, '<span id="header-label">'+(lang==='fa'?'بلاگ':'Blog')+'</span>')
    .replace('<noscript>', '<noscript><style>.library-filters,.library-search{display:none}</style>').replace(/^.*<link rel="stylesheet" href="blog-(?:solo|market|data-motion)\.css[^"]*">.*\n/gm,'');
  if (lang==='en') html=html.replace('>محمدرضا دلیلی</span>','>Mohamad Reza Dalili</span>')
    .replaceAll('مارکتر و اپراتور هوش‌مصنوعی','Marketer and AI Operator').replace('پورتفولیوی شخصی','Portfolio')
    .replace('lang="en" aria-label="Switch to English">English','lang="fa" aria-label="تغییر زبان به فارسی">فارسی');
  // The direct reading file and the historical public URL are at different depths.
  return html.replace(/\b(href|src|srcset)="(?![\/#]|[a-z][a-z0-9+.-]*:)([^"]+)"/gi,'$1="/$2"')
    .replace(/<a class="brand" href="\/index\.html"/,`<a class="brand" href="/index.html?lang=${lang}"`);
}

function staticBlock(block,lang,rich){
  const local=block[lang]||{};
  if(block.type==='tabs') return block.items.map(item=>`<details class="article-disclosure"><summary>${esc(item[lang].label)}</summary><h3>${esc(item[lang].title)}</h3><p>${rich(item[lang].text)}</p></details>`).join('');
  if(block.type==='quiz' && Array.isArray(block.options)) return `<details class="article-disclosure"><summary>${rich(local)}</summary>${block.options.map(option=>`<p><strong>${esc(option[lang].label)}</strong> ${rich(option[lang].feedback)}</p>`).join('')}</details>`;
  if(block.type==='chart') {
    const metric=block.metrics[0];
    return `<figure class="reading-chart"><figcaption>${esc(local.title)}</figcaption><p>${rich(local.source||'')}</p><details><summary>${lang==='fa'?'داده‌های نمودار':'Chart data'}</summary><div class="chart-table-scroll"><table><thead><tr><th>${esc(metric[lang])}</th>${block.labels[lang].map(label=>`<th>${esc(label)}</th>`).join('')}</tr></thead><tbody>${block.series.map(series=>`<tr><th>${esc(series[lang])}</th>${chartValues(series,metric).map(v=>`<td>${v==null?'—':esc(new Intl.NumberFormat(lang).format(v))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details></figure>`;
  }
  return readingWidget(block,lang,rich);
}

export function buildReadingPages(items){
  const template=shell(), files=new Map(), live=publishedPosts(items);
  for (const lang of ['fa','en']) {
    const href = target => {
      const url=internalHref(target,lang,live,siteOrigin);
      if(!url) return null;
      const local=new URL(url);
      return local.pathname+local.search+local.hash;
    };
    const archive=localizedDocument(template,{lang,title:lang==='fa'?'آرشیو بلاگ':'Blog archive',
      intro:libraryCopy[lang].intro,
      main:renderArchive({lang,items:live}),classes:'blog-index'});
    files.set(lang==='fa'?'blog.html':'reading/en/archive.html',archive);
    for(const source of live) {
      const post=withDataMotion(source), digest=createHash('sha256').update(JSON.stringify(source)+'\n').digest('hex').slice(0,16);
      const dataSrc='assets/posts/'+post.slug+'-'+digest+'.json';
      const rich=articleRichText({article:post,lang,posts:live,base:siteOrigin});
      const {date,sourceCard}=createResearchWidgets({article:post,lang,rich});
      const main=renderArticleFrame({article:post,lang,href,renderBlock:block=>{
        const basic=readingBlock(block,lang,rich);
        return basic ?? `<div data-reading-slot>${staticBlock(block,lang,rich)}</div>`;
      },date,sourceCard});
      files.set(`reading/${lang}/${post.slug}.html`,localizedDocument(template,{lang,slug:post.slug,dataSrc,title:post[lang].title,
        intro:post[lang].excerpt,main,classes:'article-page'+(post[lang].subtitle?' editorial-story':'')}));
    }
  }
  return files;
}
