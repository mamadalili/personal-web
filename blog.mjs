import {articleLabels, articleRichText, readingBlock, readingWidget, renderArticleFrame} from './blog-reading.mjs';
import {addonKind, enhanceArticle} from './blog-enhancements.mjs';
import { posts, templateSrc } from './blog-summaries.mjs';
import { loadArticleData } from './blog-article-data.mjs';
import { escapeHTML as esc, internalHref, chartValues, estimateOrders, publishedPosts, chartDomain, chartPosition, roundBound } from './blog-core.mjs';
import { createResearchWidgets } from './blog-widgets.mjs';
import { withDataMotion } from './blog-data-motion-model.mjs?v=20261102-unit-objects';

let dispose = () => {};
export function unmountBlog() { dispose(); dispose = () => {}; }

export async function mountBlog(root, { language = 'fa', mode = 'index', template = false } = {}) {
  dispose();
  const controller = new AbortController(), signal = controller.signal;
  dispose = () => controller.abort();
  const lang = language === 'en' ? 'en' : 'fa', t = articleLabels(lang);
  const href = target => internalHref(target,lang,posts,location.href);
  const number = (value,format='number') => value === null || !Number.isFinite(value) ? '—' : new Intl.NumberFormat(lang,{maximumFractionDigits:format==='number'?0:1}).format(value) + (format==='percent'?(lang==='fa'?'٪':'%'):format==='multiple'?'×':'');
  const livePosts = publishedPosts(posts);

  if (mode === 'index') {
    const {mountBlogIndex} = await import('./blog-index.mjs?v=20261101-compact-archive');
    if (!signal.aborted && root.isConnected) mountBlogIndex(root,{lang,items:posts,href,signal});
    return;
  }

  const slug = new URLSearchParams(location.search).get('post');
  const summary = livePosts.find(post => post.slug === slug);
  let originalArticle;
  try {
    originalArticle = template || summary ? await loadArticleData(template ? templateSrc : summary.dataSrc, {signal}) : null;
  } catch (error) {
    if (signal.aborted) return;
    throw error;
  }
  if (signal.aborted || !root.isConnected) return;
  if (!template && originalArticle && originalArticle.slug !== slug) throw new Error('Article data does not match its route');
  const article = originalArticle ? withDataMotion(originalArticle) : originalArticle;
  if (!article || !article[lang]) {
    root.innerHTML = `<section class="page-hero"><div class="eyebrow">${t.blog}</div><h1>${t.notFound}</h1><p>${t.notFoundBody}</p><a class="blog-button" href="${href('blog')}">${t.back}</a></section>`;
    return;
  }
  const a = article[lang];
  document.title = `${a.title} — ${t.blog} — ${lang==='fa'?'محمدرضا دلیلی':'Mohamad Reza Dalili'}`;
  document.querySelector('meta[name="description"]').content = a.excerpt;
  const blocks = new Map(), states = new Map();
  let blockNumber = 0, lastTrigger;
  const rich = articleRichText({article,lang,posts,base:location.href,interactive:true});
  const research=createResearchWidgets({lang,article,number,rich,openDialog:(...args)=>openDialog(...args),signal});
  const pointValue=(block,metric,value,index)=>{const qualifier=block.observations?.[index]?.qualifiers?.[metric.id]||'';return `${esc(qualifier)}${number(roundBound(value,qualifier,metric.format==='number'?0:1),metric.format)}`;};
  function renderBlock(block) {
    const id = `interactive-${++blockNumber}`;
    blocks.set(id,block);
    const addon = addonKind(block.type);
    if (addon) return `<div data-article-addon="${addon}" data-block-id="${id}">${readingWidget(block,lang,rich)}</div>`;
    const content = readingBlock(block,lang,rich);
    if (content !== null) return content;
    if (block.type === 'quiz' && Array.isArray(block.options)) {
      const options = block.options.map((option, index) => `
        <label><input type="radio" name="${id}" data-quiz-choice="${id}" value="${index}">
          <span>${esc(option[lang].label)}</span></label>`).join('');
      return `<fieldset class="article-quiz"><legend>${esc(block[lang])}</legend>
        ${options}<p class="quiz-feedback" role="status"></p></fieldset>`;
    }
    if (block.type==='tabs') return `<div class="article-comparison" data-comparison="${id}"><div role="tablist" aria-label="${esc(block.items.map(item=>item[lang].label).join(' / '))}">${block.items.map((item,index)=>`<button type="button" role="tab" id="${id}-tab-${index}" data-blog-tab aria-controls="${id}-panel-${index}" aria-selected="${index===0}" tabindex="${index===0?0:-1}">${esc(item[lang].label)}</button>`).join('')}</div>${block.items.map((item,index)=>`<div role="tabpanel" id="${id}-panel-${index}" aria-labelledby="${id}-tab-${index}" ${index?'hidden':''}><h3>${esc(item[lang].title).replace(/\*([^*\r\n]+)\*/g,'<em>$1</em>')}</h3><p>${rich(item[lang].text)}</p></div>`).join('')}</div>`;
    if (block.type==='chart') {
      const metric = block.metrics.find(item=>item.id==='orders') || block.metrics[0];
      const views=block.views||['bars','lines'],scale=block.allowLog&&block.defaultScale==='log'?'log':'linear';
      const metricControl=block.metrics.length>1?`<label>${t.metric}<select data-chart-metric="${id}" aria-label="${t.metric}">${block.metrics.map(item=>`<option value="${esc(item.id)}" ${item.id===metric.id?'selected':''}>${esc(item[lang])}</option>`).join('')}</select></label>`:`<div class="chart-metric-label"><span>${t.metric}</span><strong>${esc(metric[lang])}</strong></div>`;
      states.set(id,{metric:metric.id,view:views[0],scale,visible:new Set(block.series.map(series=>series.id))});
      return `<figure class="interactive-chart" data-chart="${id}"><figcaption><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].source)}</p></figcaption><div class="chart-controls">${metricControl}${views.length>1?`<div class="chart-view" role="group" aria-label="${t.view}">${views.map((view,index)=>`<button type="button" data-chart-view="${esc(view)}" data-for="${id}" aria-pressed="${index===0}">${esc(t[view])}</button>`).join('')}</div>`:''}${block.allowLog?`<div class="chart-view" role="group" aria-label="${t.scale}">${['linear','log'].map(value=>`<button type="button" data-chart-scale="${value}" data-for="${id}" aria-pressed="${value===scale}">${t[value]}</button>`).join('')}</div>`:''}</div>${block.series.length>1?`<div class="chart-legend" role="group" aria-label="${t.series}">${block.series.map((series,index)=>`<button type="button" data-chart-series="${esc(series.id)}" data-for="${id}" aria-pressed="true"><span class="series-swatch series-${index%2}" aria-hidden="true"></span>${esc(series[lang])}</button>`).join('')}</div>`:''}<p class="chart-scale-note"></p><div class="chart-plot"></div><p class="chart-status" role="status"></p><p class="chart-hint">${t.pointHint}</p><div class="chart-points" aria-label="${t.points}"></div>${block.observations?`<ul class="chart-observations">${block.observations.map((observation,index)=>`<li><strong>${esc(block.labels[lang][index])}</strong> <time datetime="${esc(observation.date)}">${esc(research.date(observation.date))}</time><p>${esc(observation[lang])}</p><button type="button" class="blog-text-button" data-research-source="${esc(observation.source)}" aria-haspopup="dialog">${t.sources} ↗</button></li>`).join('')}</ul>`:''}<div class="chart-foot"><button class="blog-text-button" type="button" data-chart-method="${id}" aria-haspopup="dialog">${t.method}</button><details class="chart-table"><summary>${t.table}</summary><div class="chart-table-scroll"></div></details></div></figure>`;
    }
    if (block.type==='simulator') return `<section class="article-simulator" data-simulator="${id}"><div class="simulator-intro"><span class="small-label">${lang==='fa'?'ورودی‌ها را تغییر دهید':'CHANGE THE INPUTS'}</span><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].note)}</p></div><div class="simulator-inputs"><label>${t.visits}<input type="number" min="0" max="1000000" step="100" inputmode="numeric" data-visits aria-label="${t.visits}" value="${esc(block.visits)}"></label><label>${t.rate}<span class="range-value" data-rate-label>${number(block.rate,'percent')}</span><input type="range" min="0" max="10" step="0.1" value="${esc(block.rate)}" data-rate aria-label="${t.rate}"></label></div><div class="simulator-result" role="status" aria-live="polite"><span>${t.estimate}</span><strong data-orders>${number(estimateOrders(block.visits,block.rate))}</strong><small>${t.formula}</small></div><p class="simulator-validation" role="alert"></p><button type="button" class="blog-text-button" data-simulator-reset="${id}">${t.reset}</button></section>`;
    return research.render(block,id);
  }

  root.classList.remove('market-story','blog-index');
  root.classList.add('article-page');
  root.classList.toggle('editorial-story', Boolean(a.subtitle));
  const openOutline=matchMedia('(min-width:761px)').matches;
  const prerendered=summary && root.dataset?.readingSrc===summary.dataSrc && root.dataset.readingLang===lang && root.querySelector('.article-body');
  if (prerendered) {
    for (const section of article.sections) {
      const slots=[...root.querySelectorAll(`#${CSS.escape(section.id)} > [data-reading-slot]`)];
      for (const block of section.blocks) {
        const markup=renderBlock(block);
        if (['paragraph','image','details','callout','quote'].includes(block.type)) continue;
        const slot=slots.shift();
        if (slot) { slot.insertAdjacentHTML('beforebegin',markup); slot.remove(); }
      }
    }
    for (const abbr of root.querySelectorAll('[data-reading-term]')) {
      const button=document.createElement('button');
      button.className='blog-term';button.type='button';button.dataset.term=abbr.dataset.readingTerm;
      button.setAttribute('aria-haspopup','dialog');button.textContent=abbr.textContent;abbr.replaceWith(button);
    }
    root.querySelector('.article-outline').open=openOutline;
    delete root.dataset.readingSrc;
  } else {
    root.innerHTML=renderArticleFrame({article,lang,href,renderBlock,date:research.date,sourceCard:research.sourceCard,openOutline});
  }
  const dialog = root.querySelector('dialog');
  const openDialog = (title,content,trigger) => {
    lastTrigger = trigger;
    root.querySelector('#article-dialog-title').textContent = title;
    dialog.querySelector('.dialog-content').innerHTML = content;
    dialog.showModal();
  };
  dialog.addEventListener('close',()=>{ if(lastTrigger?.isConnected) lastTrigger.focus(); },{signal});
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();},{signal});
  research.mount(root);
  enhanceArticle(root,{article,lang,number,rich,href,blocks,openDialog,sourceDetail:research.sourceDetail,signal});

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
    const quizId = event.target.dataset.quizChoice;
    if (quizId) {
      const option = blocks.get(quizId).options[Number(event.target.value)];
      event.target.closest('fieldset').querySelector('.quiz-feedback').textContent = option[lang].feedback;
      return;
    }
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
