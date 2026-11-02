import { solutions, solutionsCopy } from './solutions-data.mjs';
import { escapeHTML as esc } from './blog-core.mjs';
import './home-hero-art.js?v=20261102-solutions-assets';

const pendingStyles=new WeakMap();
export function prepareSolutions(doc=document){
 const href=new URL('./solution-portals.css?v=20261102-solution-portals',import.meta.url).href;
 const existing=[...doc.querySelectorAll('link[rel="stylesheet"]')].find(link=>link.href===href);
 if(existing?.sheet)return Promise.resolve();
 if(pendingStyles.has(doc))return pendingStyles.get(doc);
 // A previous link may have failed before we could observe its error event.
 const link=doc.createElement('link');
 link.rel='stylesheet';link.href=href;
 const ready=new Promise((resolve,reject)=>{
  link.addEventListener('load',()=>{existing?.remove();resolve();},{once:true});
  link.addEventListener('error',()=>{link.remove();pendingStyles.delete(doc);reject(new Error('Solutions stylesheet could not be loaded'));},{once:true});
 });
 pendingStyles.set(doc,ready);
 doc.head.append(link);
 return ready;
}

// Older cached entry pages do not declare the new selector assets.
if(typeof document!=='undefined')await prepareSolutions();

export function mountSolutions(root,{language='fa',solution='',url,icon,art=globalThis.renderHomeCapabilityArt,portals={},motion=()=>'',collaboration}) {
  const lang=language==='en'?'en':'fa',t=solutionsCopy[lang];
  const current=solution?solutions.find(item=>item.id===solution):solutions[0];
  const href=(target,params={})=>{
    const destination=url(target);
    if(!destination)return null;
    const link=new URL(destination,location.href);
    for(const [key,value] of Object.entries(params))link.searchParams.set(key,value);
    return link.href;
  };
  const arrow='<svg class="cta-direction" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
  const heading=parts=>`${esc(parts[0])}<br><em>${esc(parts[1])}</em>`;
  const cta=(target,label,secondary=false)=>`<a class="solution-cta${secondary?' solution-cta-secondary':''}" href="${esc(href(target))}">${esc(label)}${arrow}</a>`;
  const cards=items=>items.map(item=>`<article class="solution-card"><span class="solution-icon">${icon(item.icon)}</span><h3><a href="${esc(href(item.id))}">${esc(item[lang].label)}</a></h3><p>${esc(item[lang].summary)}</p><ul class="solution-tags">${item[lang].tags.map(tag=>`<li>${esc(tag)}</li>`).join('')}</ul>${cta(item.id,t.explore)}</article>`).join('');
  const closing=()=>collaboration();

  root.classList.add('solutions-page');
  if(solution&&!current){
    root.innerHTML=`<section class="page-hero"><div class="eyebrow">${esc(t.label)}</div><h1>${esc(t.notFound)}</h1><p>${esc(t.notFoundText)}</p>${cta('solutions',t.back)}</section>`;
    return;
  }
  const content=current?.[lang]||t;
  document.title=`${current?`${content.label} — `:''}${t.label} — ${lang==='fa'?'محمدرضا دلیلی':'Mohamad Reza Dalili'}`;
  document.querySelector('meta[name="description"]').content=content.intro;

  root.innerHTML=`<header class="solutions-selector"><span class="eyebrow">${esc(t.label)}</span><nav class="solutions-subnav solution-portals" aria-label="${esc(t.label)}">${solutions.map(item=>{const portal=portals[item.id],selected=item.id===current.id;return `<a class="capability-portal capability-portal--${item.id}" href="${esc(href(item.id))}" ${selected?'aria-current="page"':''}>${art(item.id)}${selected?`<span class="capability-current">${lang==='fa'?'در این صفحه':'Current page'}</span>`:''}<span class="capability-copy"><span class="capability-icon" aria-hidden="true">${icon(item.icon)}</span><span class="capability-title">${esc(portal?.title||item[lang].label)}</span><span class="capability-description">${esc(portal?.text||item[lang].summary)}</span></span><span class="capability-open" aria-hidden="true">${arrow}</span></a>`;}).join('')}</nav></header>
    <nav class="solution-breadcrumb" aria-label="${lang==='fa'?'مسیر صفحه':'Breadcrumb'}"><span>${esc(t.label)}</span><span aria-hidden="true">/</span><span aria-current="page">${esc(content.label)}</span></nav>
    <section class="solution-detail-hero"><div class="page-hero"><div class="eyebrow">${esc(content.label)}</div><h1>${heading(content.headline)}</h1><p>${esc(content.intro)}</p>${cta('contact',t.conversation)}</div><aside class="solution-lens">${motion(current.id)}<span class="small-label">${esc(t.lens)}</span><h2>${esc(content.lensTitle)}</h2><p>${esc(content.lensText)}</p><ul class="solution-tags">${content.tags.map(tag=>`<li>${esc(tag)}</li>`).join('')}</ul></aside></section>
    <section class="solution-fit" aria-labelledby="fit-heading"><h2 id="fit-heading">${esc(t.fit)}</h2><ul>${content.fit.map(text=>`<li>${esc(text)}</li>`).join('')}</ul></section>
    <section class="solution-output-section" aria-labelledby="outputs-heading"><div class="home-section-heading"><h2 id="outputs-heading">${esc(t.outputs)}</h2></div><div class="solution-outputs">${content.outputs.map(item=>`<article><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div></section>
    <section class="solution-process" aria-labelledby="process-heading"><h2 id="process-heading">${esc(t.process)}</h2><div>${content.process.map(item=>`<article><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div></section>
    ${current.evidence.length?`<section class="solution-evidence" aria-labelledby="evidence-heading"><h2 id="evidence-heading">${esc(t.evidence)}</h2><div>${current.evidence.map(item=>`<a href="${esc(href(item.target,item.params))}">${esc(item[lang])}${arrow}</a>`).join('')}</div></section>`:''}
    <section class="solution-faq" aria-labelledby="questions-heading"><h2 id="questions-heading">${esc(t.questions)}</h2>${content.faq.map(item=>`<details><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`).join('')}</section>
    <section class="solution-related" aria-labelledby="related-heading"><div class="home-section-heading"><h2 id="related-heading">${esc(t.others)}</h2></div><div class="solutions-grid">${cards(solutions.filter(item=>item.id!==current.id))}</div></section>${closing()}`;
}
