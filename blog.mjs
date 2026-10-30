import { mountBlogIndex } from './blog-index.mjs';
import { renderPostCover } from './blog-covers.mjs';
import { posts, articleTemplate } from './blog-data.mjs';
import { escapeHTML as esc, safeHref, internalHref, chartValues, estimateOrders, publishedPosts, chartDomain, chartPosition, roundBound } from './blog-core.mjs';
import { createResearchWidgets } from './blog-widgets.mjs';
import { createSoloWidgets } from './blog-solo.mjs';
import { mountMarketArticle } from './blog-market.mjs';
import { createDecisionAudits } from './blog-decision-audit.mjs';
import { createWorkflowWidgets } from './blog-workflow.mjs';
import { renderArticleImage } from './blog-inline-image.mjs';

const copy = {
  fa:{blog:'بلاگ',eyebrow:'یادداشت‌های من',heading:'ایده‌ها، تجربه‌ها و چیزهایی که یاد می‌گیرم.',intro:'دربارهٔ بازاریابی، تجارت الکترونیک و فناوری؛ با فرصتی برای کشف و تجربه.',empty:'هنوز مقاله‌ای منتشر نشده.',emptyBody:'تا اولین یادداشت، می‌توانید یک نمونهٔ تعاملی را امتحان کنید.',preview:'دیدن نمونهٔ تعاملی',template:'پیش‌نمایش قالب — مقالهٔ منتشرشده نیست؛ همهٔ اعداد آزمایشی‌اند.',toc:'در این مقاله',takeaways:'در این تجربه',back:'همهٔ نوشته‌ها',close:'بستن',metric:'شاخص',bars:'ستونی',lines:'خطی',view:'نوع نمودار',series:'سناریوهای نمایان',method:'روش محاسبه',table:'دیدن جدول داده‌ها',period:'بازه',pointHint:'برای دیدن جزئیات، روی مقدار هر بازه کلیک کنید.',visits:'تعداد بازدید',rate:'نرخ تبدیل (%)',estimate:'سفارش تقریبی',reset:'بازنشانی',invalid:'بازدید باید بین ۰ تا ۱٬۰۰۰٬۰۰۰ و نرخ تبدیل بین ۰ تا ۱۰۰ باشد.',formula:'بازدید × نرخ تبدیل ÷ ۱۰۰',related:'ادامهٔ مسیر',search:'جست‌وجوی نوشته‌ها',noResults:'نوشته‌ای با این عبارت پیدا نشد.',notFound:'این مقاله پیدا نشد.',notFoundBody:'از فهرست بلاگ، یک مقالهٔ منتشرشده را انتخاب کنید.',atLeastOne:'حداقل یک سناریو باید نمایان بماند.',updated:'نمودار به‌روز شد',points:'جزئیات بازه‌ها',chartData:'دادهٔ نمودار',loading:'در حال آماده‌سازی مقاله…'},
  en:{blog:'Blog',eyebrow:'MY NOTES',heading:'Ideas, experiences & things I’m learning.',intro:'On marketing, e-commerce and technology, with room to explore and experiment.',empty:'No articles published yet.',emptyBody:'Until the first post, try an interactive example.',preview:'Explore the interactive example',template:'Template preview — not a published article. All numbers are illustrative.',toc:'IN THIS ARTICLE',takeaways:'IN THIS EXPERIENCE',back:'All posts',close:'Close',metric:'Metric',bars:'Bars',lines:'Lines',view:'Chart view',series:'Visible scenarios',method:'Calculation method',table:'View the data table',period:'Period',pointHint:'Select a period’s values to see the details.',visits:'Visits',rate:'Conversion rate (%)',estimate:'Estimated orders',reset:'Reset',invalid:'Visits must be between 0 and 1,000,000; conversion rate between 0 and 100.',formula:'Visits × conversion rate ÷ 100',related:'KEEP EXPLORING',search:'Search posts',noResults:'No posts match this search.',notFound:'This article was not found.',notFoundBody:'Choose a published article from the blog.',atLeastOne:'Keep at least one scenario visible.',updated:'Chart updated',points:'Period details',chartData:'Chart data',loading:'Preparing the article…'}
};
let dispose = () => {};

export function mountBlog(root, { language = 'fa', mode = 'index', template = false } = {}) {
  dispose();
  root.classList.remove('market-story','blog-index');
  const controller = new AbortController(), signal = controller.signal;
  dispose = () => controller.abort();
  const lang = language === 'en' ? 'en' : 'fa', t = {...copy[lang],...(lang==='fa'?{dots:'نقطه‌ای',linear:'خطی',log:'لگاریتمی',scale:'مقیاس محور',sources:'منابع و روش',reviewed:'بازبینی منابع',reading:'پیشرفت خواندن',logNote:'مقیاس لگاریتمی؛ صفر و مقدار منفی نمایش داده نمی‌شوند.'}:{dots:'Dots',linear:'Linear',log:'Logarithmic',scale:'Axis scale',sources:'Sources & methodology',reviewed:'Sources reviewed',reading:'Reading progress',logNote:'Log scale; zero and negative values are not plotted.'})};
  const href = target => internalHref(target,lang,posts,location.href);
  const number = (value,format='number') => value === null || !Number.isFinite(value) ? '—' : new Intl.NumberFormat(lang,{maximumFractionDigits:format==='number'?0:1}).format(value) + (format==='percent'?(lang==='fa'?'٪':'%'):format==='multiple'?'×':'');
  const livePosts = publishedPosts(posts);

  if(mode==='index'){mountBlogIndex(root,{lang,items:posts,href,signal});return;}

  const slug = new URLSearchParams(location.search).get('post');
  const article = template ? articleTemplate : livePosts.find(post => post.slug === slug);
  if (!article || !article[lang]) {
    root.innerHTML = `<section class="page-hero"><div class="eyebrow">${t.blog}</div><h1>${t.notFound}</h1><p>${t.notFoundBody}</p><a class="blog-button" href="${href('blog')}">${t.back}</a></section>`;
    return;
  }
  const a = article[lang];
  document.title = `${a.title} — ${t.blog} — ${lang==='fa'?'محمدرضا دلیلی':'Mohamad Reza Dalili'}`;
  document.querySelector('meta[name="description"]').content = a.excerpt;
  const blocks = new Map(), states = new Map();
  let blockNumber = 0, lastTrigger;
  const rich = value => {
    const text = String(value ?? ''), pattern = /\[\[([a-z0-9-]+)\|([^\]]+)\]\]|\[([^\]]+)\]\(([^)]+)\)/g;
    let result = '', previous = 0;
    for (const match of text.matchAll(pattern)) {
      result += esc(text.slice(previous,match.index));
      if (match[1]) result += article.glossary?.[match[1]]?.[lang] ? `<button class="blog-term" type="button" data-term="${esc(match[1])}" aria-haspopup="dialog">${esc(match[2])}</button>` : esc(match[2]);
      else {
        const url = safeHref(match[4],lang,posts,location.href);
        result += url ? `<a href="${esc(url)}">${esc(match[3])}</a>` : esc(match[3]);
      }
      previous = match.index + match[0].length;
    }
    return result + esc(text.slice(previous));
  };
  const research=createResearchWidgets({lang,article,number,rich,openDialog:(...args)=>openDialog(...args),signal});
  const solo=createSoloWidgets({lang,number,rich,href,openDialog:(...args)=>openDialog(...args),signal});
  const audits=createDecisionAudits({lang,signal});
  const workflow=createWorkflowWidgets({lang,signal});
  const pointValue=(block,metric,value,index)=>{const qualifier=block.observations?.[index]?.qualifiers?.[metric.id]||'';return `${esc(qualifier)}${number(roundBound(value,qualifier,metric.format==='number'?0:1),metric.format)}`;};
  function renderBlock(block) {
    const id = `interactive-${++blockNumber}`;
    blocks.set(id,block);
    if(block.type==='decision-audit')return audits.render(block,id);
    if(block.type==='workflow')return workflow.render(block,id);
    if(block.type==='image')return renderArticleImage(block,lang);
    if (block.type==='paragraph') return `<p>${rich(block[lang])}</p>`;
    if (block.type==='callout') return `<aside class="article-callout">${rich(block[lang])}</aside>`;
    if (block.type==='details') return `<details class="article-disclosure"><summary>${esc(block[lang].title)}</summary><p>${rich(block[lang].text)}</p></details>`;
    if (block.type==='tabs') return `<div class="article-comparison" data-comparison="${id}"><div role="tablist" aria-label="${esc(block.items.map(item=>item[lang].label).join(' / '))}">${block.items.map((item,index)=>`<button type="button" role="tab" id="${id}-tab-${index}" data-blog-tab aria-controls="${id}-panel-${index}" aria-selected="${index===0}" tabindex="${index===0?0:-1}">${esc(item[lang].label)}</button>`).join('')}</div>${block.items.map((item,index)=>`<div role="tabpanel" id="${id}-panel-${index}" aria-labelledby="${id}-tab-${index}" ${index?'hidden':''}><h3>${esc(item[lang].title)}</h3><p>${rich(item[lang].text)}</p></div>`).join('')}</div>`;
    if (block.type==='chart') {
      const metric = block.metrics.find(item=>item.id==='orders') || block.metrics[0];
      const views=block.views||['bars','lines'],scale=block.allowLog&&block.defaultScale==='log'?'log':'linear';
      const metricControl=block.metrics.length>1?`<label>${t.metric}<select data-chart-metric="${id}" aria-label="${t.metric}">${block.metrics.map(item=>`<option value="${esc(item.id)}" ${item.id===metric.id?'selected':''}>${esc(item[lang])}</option>`).join('')}</select></label>`:`<div class="chart-metric-label"><span>${t.metric}</span><strong>${esc(metric[lang])}</strong></div>`;
      states.set(id,{metric:metric.id,view:views[0],scale,visible:new Set(block.series.map(series=>series.id))});
      return `<figure class="interactive-chart" data-chart="${id}"><figcaption><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].source)}</p></figcaption><div class="chart-controls">${metricControl}${views.length>1?`<div class="chart-view" role="group" aria-label="${t.view}">${views.map((view,index)=>`<button type="button" data-chart-view="${esc(view)}" data-for="${id}" aria-pressed="${index===0}">${esc(t[view])}</button>`).join('')}</div>`:''}${block.allowLog?`<div class="chart-view" role="group" aria-label="${t.scale}">${['linear','log'].map(value=>`<button type="button" data-chart-scale="${value}" data-for="${id}" aria-pressed="${value===scale}">${t[value]}</button>`).join('')}</div>`:''}</div>${block.series.length>1?`<div class="chart-legend" role="group" aria-label="${t.series}">${block.series.map((series,index)=>`<button type="button" data-chart-series="${esc(series.id)}" data-for="${id}" aria-pressed="true"><span class="series-swatch series-${index%2}" aria-hidden="true"></span>${esc(series[lang])}</button>`).join('')}</div>`:''}<p class="chart-scale-note"></p><div class="chart-plot"></div><p class="chart-status" role="status"></p><p class="chart-hint">${t.pointHint}</p><div class="chart-points" aria-label="${t.points}"></div>${block.observations?`<ul class="chart-observations">${block.observations.map((observation,index)=>`<li><strong>${esc(block.labels[lang][index])}</strong> <time datetime="${esc(observation.date)}">${esc(research.date(observation.date))}</time><p>${esc(observation[lang])}</p><button type="button" class="blog-text-button" data-research-source="${esc(observation.source)}" aria-haspopup="dialog">${t.sources} ↗</button></li>`).join('')}</ul>`:''}<div class="chart-foot"><button class="blog-text-button" type="button" data-chart-method="${id}" aria-haspopup="dialog">${t.method}</button><details class="chart-table"><summary>${t.table}</summary><div class="chart-table-scroll"></div></details></div></figure>`;
    }
    if (block.type==='simulator') return `<section class="article-simulator" data-simulator="${id}"><div class="simulator-intro"><span class="small-label">${lang==='fa'?'ورودی‌ها را تغییر دهید':'CHANGE THE INPUTS'}</span><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].note)}</p></div><div class="simulator-inputs"><label>${t.visits}<input type="number" min="0" max="1000000" step="100" inputmode="numeric" data-visits aria-label="${t.visits}" value="${esc(block.visits)}"></label><label>${t.rate}<span class="range-value" data-rate-label>${number(block.rate,'percent')}</span><input type="range" min="0" max="10" step="0.1" value="${esc(block.rate)}" data-rate aria-label="${t.rate}"></label></div><div class="simulator-result" role="status" aria-live="polite"><span>${t.estimate}</span><strong data-orders>${number(estimateOrders(block.visits,block.rate))}</strong><small>${t.formula}</small></div><p class="simulator-validation" role="alert"></p><button type="button" class="blog-text-button" data-simulator-reset="${id}">${t.reset}</button></section>`;
    return solo.render(block,id) || research.render(block,id);
  }

  const related = (article.related || []).map(item=>({item,url:href(item.target)})).filter(entry=>entry.url && entry.item[lang]);
  root.classList.add('article-page');
  root.innerHTML = `${article.template?`<div class="article-template-notice">${t.template}</div>`:''}
    <header class="article-header"><a class="article-back" href="${href('blog')}">← ${t.back}</a><div class="eyebrow">${esc(a.category)}</div><h1>${esc(a.title)}</h1><p>${esc(a.excerpt)}</p>
      <div class="article-byline"><img src="images/myphoto.webp" width="32" height="32" alt=""><span>${lang==='fa'?'محمدرضا دلیلی':'Mohamad Reza Dalili'}</span><span aria-hidden="true">·</span><span>${esc(a.readTime || '')}</span>${article.date?`<time datetime="${esc(article.date)}">${esc(research.date(article.date))}</time>`:''}</div>
      ${a.credit?`<p class="article-credit">${esc(a.credit)} <a href="#sources">${t.sources} ↗</a></p>`:''}${article.reviewed?`<p class="article-reviewed">${t.reviewed}: <time datetime="${esc(article.reviewed)}">${esc(research.date(article.reviewed))}</time></p>`:''}
      ${renderPostCover(article,lang,{className:'article-cover-image',eager:true,decorative:false})}
    </header>
    <div class="article-layout"><aside class="article-sidebar"><details class="article-outline" ${matchMedia('(min-width:761px)').matches?'open':''}><summary><span>${t.toc}</span><output data-reading-label>${number(0,'percent')}</output></summary><progress value="0" max="100" aria-label="${t.reading}"></progress><nav class="article-toc" aria-label="${t.toc}">${article.sections.map(section=>`<a href="#${esc(section.id)}">${esc(section[lang].title)}</a>`).join('')}${article.sources?.length?`<a href="#sources">${t.sources}</a>`:''}</nav></details>${a.takeaways?.length?`<div class="article-takeaways"><h2>${t.takeaways}</h2><ul>${a.takeaways.map(text=>`<li>${esc(text)}</li>`).join('')}</ul></div>`:''}</aside>
      <article class="article-body">${article.sections.map(section=>`<section id="${esc(section.id)}" class="article-section"><h2>${esc(section[lang].title)}</h2>${section.blocks.map(renderBlock).join('')}</section>`).join('')}
      ${article.sources?.length?`<section id="sources" class="article-section article-sources"><h2>${t.sources}</h2><p>${esc(a.sourceNote || (lang==='fa'?'تاریخ، نوع داده و یادداشت هر منبع را همراه ادعایی که پشتیبانی می‌کند بخوانید.':'Read each source’s date, evidence type and note alongside the claim it supports.'))}</p><div class="source-ledger">${article.sources.map(source=>`<div class="source-card" id="source-${esc(source.id)}">${research.sourceCard(source)}</div>`).join('')}</div></section>`:''}
      ${related.length?`<section class="article-related"><h2>${t.related}</h2><div>${related.map(({item,url})=>`<a href="${esc(url)}"><h3>${esc(item[lang].title)}</h3><p>${esc(item[lang].description)}</p><span aria-hidden="true">↗</span></a>`).join('')}</div></section>`:''}</article>
    </div>
    <dialog class="article-dialog" aria-labelledby="article-dialog-title"><div class="dialog-top"><span class="small-label">${t.blog}</span><button type="button" data-dialog-close autofocus>${t.close} <span aria-hidden="true">×</span></button></div><h2 id="article-dialog-title"></h2><div class="dialog-content"></div></dialog>`;
  const dialog = root.querySelector('dialog');
  const openDialog = (title,content,trigger) => {
    lastTrigger = trigger;
    root.querySelector('#article-dialog-title').textContent = title;
    dialog.querySelector('.dialog-content').innerHTML = content;
    dialog.showModal();
  };
  dialog.addEventListener('close',()=>{ if(lastTrigger?.isConnected) lastTrigger.focus(); },{signal});
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();},{signal});
  if (article.presentation === 'market-atlas') {
    mountMarketArticle(root,{article,lang,sourceDetail:research.sourceDetail,openDialog,signal});
  }
  research.mount(root);
  solo.mount(root);
  audits.mount(root);
  workflow.mount(root);

  function updateChart(id, announce = false) {
    const block = blocks.get(id), state = states.get(id), figure = root.querySelector(`[data-chart="${id}"]`);
    const metric = block.metrics.find(item=>item.id===state.metric);
    const active = block.series.filter(series=>state.visible.has(series.id));
    const data = active.map(series=>({series,values:chartValues(series,metric),index:block.series.indexOf(series)}));
    const domain=chartDomain(data.flatMap(item=>item.values),state.scale);
    const y=value=>{const position=chartPosition(value,domain);return position===null?null:200-position*180;};
    const zero=state.scale==='log'?200:y(0),step=600/block.labels[lang].length;
    let marks = '';
    for (const item of data) {
      const color = item.index%2?'#4e9b85':'#1c0998';
      if (state.view==='bars') marks += item.values.map((value,index)=>y(value)===null?'':`<rect x="${index*step+step*.18+data.indexOf(item)*step*.64/data.length}" y="${Math.min(y(value),zero)}" width="${step*.64/data.length-3}" height="${Math.max(0.6,Math.abs(y(value)-zero))}" rx="3" fill="${color}"/>`).join('');
      else {
        let drawing = false, path = '';
        item.values.forEach((value,index)=>{if(y(value)===null){drawing=false;return;}path+=`${drawing?'L':'M'}${index*step+step/2},${y(value)} `;drawing=true;});
        marks += (state.view==='lines'?`<path d="${path}" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="${item.index%2?'6 4':'none'}" vector-effect="non-scaling-stroke"/>`:'') + item.values.map((value,index)=>y(value)===null?'':`<circle cx="${index*step+step/2}" cy="${y(value)}" r="${state.view==='dots'?6:4}" fill="${color}"/>`).join('');
      }
    }
    figure.querySelector('.chart-scale-note').textContent=state.scale==='log'?t.logNote:'';
    figure.querySelector('.chart-plot').innerHTML = `<div class="chart-axis" aria-hidden="true">${domain.ticks.map(value=>`<span style="top:${y(value)}px">${number(value,metric.format==='number'&&!Number.isInteger(value)?'decimal':metric.format)}</span>`).join('')}</div><div class="chart-drawing"><svg class="blog-chart-svg" viewBox="0 0 600 220" preserveAspectRatio="none" role="img" aria-label="${esc(`${block[lang].title} — ${metric[lang]} — ${t[state.scale]}`)}"><title>${esc(`${block[lang].title} — ${metric[lang]}`)}</title><desc>${esc(t.table)}</desc>${domain.ticks.map(value=>`<line x1="0" y1="${y(value)}" x2="600" y2="${y(value)}" stroke="#e5dff0"/>`).join('')}${marks}</svg><div class="chart-x-labels" style="--periods:${block.labels[lang].length}">${block.labels[lang].map(label=>`<span>${esc(label)}</span>`).join('')}</div></div>`;
    figure.querySelector('.chart-points').innerHTML = block.labels[lang].map((label,index)=>`<button type="button" data-chart-point="${id}" data-point="${index}" aria-haspopup="dialog" aria-label="${esc(`${label}: ${data.map(item=>`${item.series[lang]} ${pointValue(block,metric,item.values[index]??null,index)}`).join(' / ')}`)}"><span>${esc(label)}</span><strong>${data.map(item=>`<span class="value-series-${item.index%2}">${pointValue(block,metric,item.values[index]??null,index)}</span>`).join('<span class="point-divider" aria-hidden="true"> / </span>')}</strong></button>`).join('');
    figure.querySelector('.chart-table-scroll').innerHTML = `<table><caption>${esc(metric[lang])}</caption><thead><tr><th scope="col">${t.period}</th>${data.map(item=>`<th scope="col">${esc(item.series[lang])}</th>`).join('')}</tr></thead><tbody>${block.labels[lang].map((label,index)=>`<tr><th scope="row">${esc(label)}</th>${data.map(item=>`<td dir="ltr">${pointValue(block,metric,item.values[index]??null,index)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    if(announce)figure.querySelector('.chart-status').textContent=`${t.updated}: ${metric[lang]} · ${active.map(series=>series[lang]).join(' / ')}`;
  }
  for (const id of states.keys()) updateChart(id);
  function selectComparison(button) {
    const comparison = button.closest('[data-comparison]');
    for (const tab of comparison.querySelectorAll('[data-blog-tab]')) {
      const selected = tab===button;
      tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden=!selected;
    }
  }
  function updateSimulator(container) {
    const visits=container.querySelector('[data-visits]').value, rate=container.querySelector('[data-rate]').value;
    const result=estimateOrders(visits,rate);
    container.querySelector('[data-rate-label]').textContent=number(Number(rate),'percent');
    container.querySelector('[data-orders]').textContent=number(result);
    container.querySelector('.simulator-validation').textContent=result===null?t.invalid:'';
  }
  root.addEventListener('input',event=>{const simulator=event.target.closest('[data-simulator]');if(simulator)updateSimulator(simulator);},{signal});
  root.addEventListener('change',event=>{
    const id=event.target.dataset.chartMetric;
    if(id){states.get(id).metric=event.target.value;updateChart(id,true);}
  },{signal});
  root.addEventListener('keydown',event=>{
    const tab=event.target.closest('[data-blog-tab]');if(!tab)return;
    const tabs=[...tab.closest('[role=tablist]').querySelectorAll('[data-blog-tab]')];let index=tabs.indexOf(tab);
    if(event.key==='Home')index=0;else if(event.key==='End')index=tabs.length-1;
    else if(['ArrowRight','ArrowLeft'].includes(event.key))index+=(event.key==='ArrowRight'?1:-1)*(lang==='fa'?-1:1);else return;
    event.preventDefault();const next=tabs[(index+tabs.length)%tabs.length];selectComparison(next);next.focus();
  },{signal});
  root.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    const data=button.dataset;
    if(button.hasAttribute('data-dialog-close')){dialog.close();return;}
    if(data.term){const term=article.glossary[data.term][lang];openDialog(term.title,`<p>${rich(term.text)}</p>`,button);}
    if(button.hasAttribute('data-blog-tab'))selectComparison(button);
    if(data.chartView){states.get(data.for).view=data.chartView;for(const item of button.parentElement.querySelectorAll('button'))item.setAttribute('aria-pressed',String(item===button));updateChart(data.for,true);}
    if(data.chartScale){states.get(data.for).scale=data.chartScale;for(const item of button.parentElement.querySelectorAll('button'))item.setAttribute('aria-pressed',String(item===button));updateChart(data.for,true);}
    if(data.chartSeries){
      const state=states.get(data.for);
      if(state.visible.has(data.chartSeries)&&state.visible.size===1){button.closest('figure').querySelector('.chart-status').textContent=t.atLeastOne;return;}
      if(state.visible.has(data.chartSeries))state.visible.delete(data.chartSeries);else state.visible.add(data.chartSeries);
      button.setAttribute('aria-pressed',String(state.visible.has(data.chartSeries)));updateChart(data.for,true);
    }
    if(data.chartMethod){const block=blocks.get(data.chartMethod);openDialog(t.method,`<p>${esc(block[lang].method)}</p>`,button);}
    if(data.chartPoint){const block=blocks.get(data.chartPoint),state=states.get(data.chartPoint),metric=block.metrics.find(item=>item.id===state.metric),index=Number(data.point),observation=block.observations?.[index];openDialog(`${block.labels[lang][index]} — ${metric[lang]}`,`<dl class="point-detail">${block.series.filter(series=>state.visible.has(series.id)).map(series=>`<div><dt>${esc(series[lang])}</dt><dd dir="ltr">${pointValue(block,metric,chartValues(series,metric)[index]??null,index)}</dd></div>`).join('')}</dl><p class="note">${esc(block[lang].source)}</p>${observation?`<p><time datetime="${esc(observation.date)}">${esc(research.date(observation.date))}</time> — ${esc(observation[lang])}</p>${research.sourceDetail(observation.source)}`:''}`,button);}
    if(data.simulatorReset){const block=blocks.get(data.simulatorReset),container=button.closest('[data-simulator]');container.querySelector('[data-visits]').value=block.visits;container.querySelector('[data-rate]').value=block.rate;updateSimulator(container);}
  },{signal});
  let readingFrame=0;
  const updateReading=()=>{
    readingFrame=0;
    const body=root.querySelector('.article-body');
    if(signal.aborted||!body)return;
    const sections=[...root.querySelectorAll('.article-section')],rect=body.getBoundingClientRect();
    const start=rect.top+scrollY-150,end=rect.bottom+scrollY-innerHeight;
    const progress=Math.max(0,Math.min(100,Math.round((scrollY-start)/Math.max(1,end-start)*100)));
    root.querySelector('.article-outline progress').value=progress;
    root.querySelector('[data-reading-label]').textContent=number(progress,'percent');
    let current=sections[0]?.id,mostVisible=0;
    for(const section of sections){
      const bounds=section.getBoundingClientRect();
      const visible=Math.max(0,Math.min(bounds.bottom,innerHeight)-Math.max(bounds.top,130));
      if(!mostVisible&&bounds.bottom<=130)current=section.id;
      if(visible>mostVisible){mostVisible=visible;current=section.id;}
    }
    for(const link of root.querySelectorAll('.article-toc a')){if(link.hash===`#${current}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}
  };
  const queueReading=()=>{if(!readingFrame)readingFrame=requestAnimationFrame(updateReading);};
  window.addEventListener('scroll',queueReading,{passive:true,signal});
  window.addEventListener('resize',queueReading,{signal});
  const articleBody=root.querySelector('.article-body');
  const readingObserver=new ResizeObserver(()=>{if(signal.aborted||!articleBody.isConnected){readingObserver.disconnect();return;}queueReading();});
  readingObserver.observe(articleBody);
  signal.addEventListener('abort',()=>{cancelAnimationFrame(readingFrame);readingObserver.disconnect();},{once:true});
  updateReading();
  // The article is loaded after the HTML shell; resolve shared section links now.
  const anchor = [...root.querySelectorAll('.article-section')].find(section=>`#${section.id}`===location.hash);
  if(anchor)anchor.scrollIntoView({block:'start'});
}
