import {escapeHTML as esc, safeHref} from './blog-core.mjs';
import {renderPostCover} from './blog-covers.mjs';
import {renderArticleImage} from './blog-inline-image.mjs';

const copy = {
  fa:{blog:'بلاگ',eyebrow:'یادداشت‌های من',heading:'ایده‌ها، تجربه‌ها و چیزهایی که یاد می‌گیرم.',intro:'دربارهٔ بازاریابی، تجارت الکترونیک و فناوری؛ با فرصتی برای کشف و تجربه.',empty:'هنوز مقاله‌ای منتشر نشده.',emptyBody:'تا اولین یادداشت، می‌توانید یک نمونهٔ تعاملی را امتحان کنید.',preview:'دیدن نمونهٔ تعاملی',template:'پیش‌نمایش قالب — مقالهٔ منتشرشده نیست؛ همهٔ اعداد آزمایشی‌اند.',toc:'در این مقاله',takeaways:'در این تجربه',back:'همهٔ نوشته‌ها',close:'بستن',metric:'شاخص',bars:'ستونی',lines:'خطی',view:'نوع نمودار',series:'سناریوهای نمایان',method:'روش محاسبه',table:'دیدن جدول داده‌ها',period:'بازه',pointHint:'روی عدد هر بازه بزن تا جزئیاتش رو ببینی.',visits:'تعداد بازدید',rate:'نرخ تبدیل (%)',estimate:'سفارش تقریبی',reset:'بازنشانی',invalid:'بازدید باید بین ۰ تا ۱٬۰۰۰٬۰۰۰ و نرخ تبدیل بین ۰ تا ۱۰۰ باشد.',formula:'بازدید × نرخ تبدیل ÷ ۱۰۰',related:'ادامهٔ مسیر',search:'جست‌وجوی نوشته‌ها',noResults:'نوشته‌ای با این عبارت پیدا نشد.',notFound:'این مقاله پیدا نشد.',notFoundBody:'برگرد به فهرست بلاگ و نوشته‌ای رو که دنبالش بودی پیدا کن.',atLeastOne:'حداقل یک سناریو باید نمایان بماند.',updated:'نمودار به‌روز شد',points:'جزئیات بازه‌ها',chartData:'دادهٔ نمودار',loading:'در حال آماده‌سازی مقاله…'},
  en:{blog:'Blog',eyebrow:'MY NOTES',heading:'Ideas, experiences & things I’m learning.',intro:'On marketing, e-commerce and technology, with room to explore and experiment.',empty:'No articles published yet.',emptyBody:'Until the first post, try an interactive example.',preview:'Explore the interactive example',template:'Template preview — not a published article. All numbers are illustrative.',toc:'IN THIS ARTICLE',takeaways:'IN THIS EXPERIENCE',back:'All posts',close:'Close',metric:'Metric',bars:'Bars',lines:'Lines',view:'Chart view',series:'Visible scenarios',method:'Calculation method',table:'View the data table',period:'Period',pointHint:'Select a period’s values to see the details.',visits:'Visits',rate:'Conversion rate (%)',estimate:'Estimated orders',reset:'Reset',invalid:'Visits must be between 0 and 1,000,000; conversion rate between 0 and 100.',formula:'Visits × conversion rate ÷ 100',related:'KEEP EXPLORING',search:'Search posts',noResults:'No posts match this search.',notFound:'This article was not found.',notFoundBody:'Go back to the blog to find the article you were looking for.',atLeastOne:'Keep at least one scenario visible.',updated:'Chart updated',points:'Period details',chartData:'Chart data',loading:'Preparing the article…'}
};
export function articleLabels(lang) {
  return {...copy[lang],...(lang==='fa'?{dots:'نقطه‌ای',linear:'خطی',log:'لگاریتمی',scale:'مقیاس محور',sources:'منابع و روش',reviewed:'بازبینی منابع',reading:'پیشرفت خواندن',logNote:'مقیاس لگاریتمی؛ صفر و مقدار منفی نمایش داده نمی‌شوند.'}:{dots:'Dots',linear:'Linear',log:'Logarithmic',scale:'Axis scale',sources:'Sources & methodology',reviewed:'Sources reviewed',reading:'Reading progress',logNote:'Log scale; zero and negative values are not plotted.'})};
}

export function articleRichText({article,lang,posts,base,interactive = false}) {
  const emphasis = text => esc(text).replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  return value => {
    const text = String(value ?? ''), pattern = /\[\[([a-z0-9-]+)\|([^\]]+)\]\]|\[([^\]]+)\]\(([^)]+)\)/g;
    let result = '', previous = 0;
    for (const match of text.matchAll(pattern)) {
      result += emphasis(text.slice(previous,match.index));
      if (match[1]) {
        const term=article.glossary?.[match[1]]?.[lang];
        result+=term ? (interactive ? `<button class="blog-term" type="button" data-term="${esc(match[1])}" aria-haspopup="dialog">${esc(match[2])}</button>`
          : `<abbr data-reading-term="${esc(match[1])}" title="${esc(term.text)}">${esc(match[2])}</abbr>`) : esc(match[2]);
      }
      else {
        const url = safeHref(match[4],lang,posts,base);
        result += url ? `<a href="${esc(url)}">${esc(match[3])}</a>` : esc(match[3]);
      }
      previous = match.index + match[0].length;
    }
    return result + emphasis(text.slice(previous));
  };
}

export function renderArticleFrame({article,lang,href,renderBlock,date,sourceCard,openOutline = false}) {
  const a = article[lang], t = articleLabels(lang);
  const number = () => new Intl.NumberFormat(lang, {style:'percent'}).format(0);
  const related = (article.related || []).map(item=>({item,url:href(item.target)})).filter(entry=>entry.url && entry.item[lang]);
  return `${article.template?`<div class="article-template-notice">${t.template}</div>`:''}
    <header class="article-header"><a class="article-back" href="${href('blog')}">← ${t.back}</a><div class="eyebrow">${esc(a.category)}</div><h1>${esc(a.title)}</h1>${a.subtitle ? `<p class="article-deck">${esc(a.subtitle)}</p>` : ''}<p>${esc(a.excerpt)}</p>
      <div class="article-byline"><img src="images/myphoto-avatar-v1.webp" width="32" height="32" alt=""><span>${lang==='fa'?'محمدرضا دلیلی':'Mohamad Reza Dalili'}</span><span aria-hidden="true">·</span><span>${esc(a.readTime || '')}</span>${article.date?`<time datetime="${esc(article.date)}">${esc(date(article.date))}</time>`:''}</div>
      ${a.credit?`<p class="article-credit">${esc(a.credit)} <a href="#sources">${t.sources} ↗</a></p>`:''}${article.reviewed?`<p class="article-reviewed">${t.reviewed}: <time datetime="${esc(article.reviewed)}">${esc(date(article.reviewed))}</time></p>`:''}
      ${renderPostCover(article,lang,{className:'article-cover-image',eager:true,decorative:false})}
    </header>
    <div class="article-layout"><aside class="article-sidebar"><details class="article-outline" ${openOutline?'open':''}><summary><span>${t.toc}</span><output data-reading-label>${number(0,'percent')}</output></summary><progress value="0" max="100" aria-label="${t.reading}"></progress><nav class="article-toc" aria-label="${t.toc}">${article.sections.map(section=>`<a href="#${esc(section.id)}">${esc(section[lang].title)}</a>`).join('')}${article.sources?.length?`<a href="#sources">${t.sources}</a>`:''}</nav></details>${a.takeaways?.length?`<div class="article-takeaways"><h2>${t.takeaways}</h2><ul>${a.takeaways.map(text=>`<li>${esc(text)}</li>`).join('')}</ul></div>`:''}</aside>
      <article class="article-body">${article.sections.map(section=>`<section id="${esc(section.id)}" class="article-section"><h2>${esc(section[lang].title)}</h2>${section.blocks.map(renderBlock).join('')}</section>`).join('')}
      ${article.sources?.length?`<section id="sources" class="article-section article-sources"><h2>${t.sources}</h2><p>${esc(a.sourceNote || (lang==='fa'?'تاریخ، نوع داده و یادداشت هر منبع را همراه ادعایی که پشتیبانی می‌کند بخوانید.':'Read each source’s date, evidence type and note alongside the claim it supports.'))}</p><div class="source-ledger">${article.sources.map(source=>`<div class="source-card" id="source-${esc(source.id)}">${sourceCard(source)}</div>`).join('')}</div></section>`:''}
      ${related.length?`<section class="article-related"><h2>${t.related}</h2><div>${related.map(({item,url})=>`<a href="${esc(url)}"><h3>${esc(item[lang].title)}</h3><p>${esc(item[lang].description)}</p><span aria-hidden="true">↗</span></a>`).join('')}</div></section>`:''}</article>
    </div>
    <dialog class="article-dialog" aria-labelledby="article-dialog-title"><div class="dialog-top"><span class="small-label">${t.blog}</span><button type="button" data-dialog-close autofocus>${t.close} <span aria-hidden="true">×</span></button></div><h2 id="article-dialog-title"></h2><div class="dialog-content"></div></dialog>`;
}

export function readingBlock(block,lang,rich) {
  if(block.type==='image')return renderArticleImage(block,lang);
  if (block.type === 'table') {
    const {caption, columns, rows} = block[lang];
    const headers = columns.map(label => `<th scope="col" role="columnheader">${esc(label)}</th>`).join('');
    const body = rows.map(([heading, ...cells]) => {
      const values = cells.map((value, index) => `<td role="cell"><span class="article-table-label" aria-hidden="true">${esc(columns[index+1])}</span>${rich(value)}</td>`).join('');
      return `<tr role="row"><th scope="row" role="rowheader">${rich(heading)}</th>${values}</tr>`;
    }).join('');
    return `<table class="article-table" role="table"><caption>${esc(caption)}</caption><thead role="rowgroup"><tr role="row">${headers}</tr></thead><tbody role="rowgroup">${body}</tbody></table>`;
  }
  if (block.type === 'quote') return `<blockquote class="article-pullquote">${rich(block[lang])}</blockquote>`;
  if (block.type==='paragraph') return `<p>${rich(block[lang])}</p>`;
  if (block.type==='callout') return `<aside class="article-callout">${rich(block[lang])}</aside>`;
  if (block.type==='details') return `<details class="article-disclosure"><summary>${esc(block[lang].title)}</summary><p>${rich(block[lang].text)}</p></details>`;
  return null;
}

export function readingWidget(block,lang,rich){
  const local=block[lang];
  if(!local||typeof local!=='object') return '';
  const title=local.title||local.question, note=local.hint||local.note;
  return title ? `<aside class="reading-widget"><h3>${esc(title)}</h3>${note?`<p>${rich(note)}</p>`:''}</aside>` : '';
}
