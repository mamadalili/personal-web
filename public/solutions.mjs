import { solutions, solutionsCopy } from './solutions-data.mjs';
import { escapeHTML as esc } from './blog-core.mjs';
import {renderHomeCapabilityArt,renderHomeFolderArt} from './home-hero-art.mjs';
import {renderSolutionLab} from './solution-lab.mjs';
import {connectFolderPanel} from './solution-folder-tabs.mjs';

const pendingStyles=new WeakMap();
export function prepareSolutions(doc=document){
 const href=new URL('./solution-portals.css?v=20261102-shared-cards',import.meta.url).href;
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

export function renderCapabilityCards({language='fa',current='',url,icon,portals={},art=renderHomeCapabilityArt}){
 const lang=language==='en'?'en':'fa';
 const arrow='<svg class="cta-direction" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
 return solutions.map(item=>{
  const portal=portals[item.id],selected=item.id===current;
  return `<a class="capability-portal capability-portal--${item.id}" href="${esc(url(item.id))}" ${selected?'aria-current="page"':''}>${art(item.id)}${selected?`<span class="capability-current">${lang==='fa'?'در این صفحه':'Current page'}</span>`:''}<span class="capability-copy"><span class="capability-icon" aria-hidden="true">${icon(item.icon)}</span><span class="capability-title">${esc(portal?.title||item[lang].label)}</span><span class="capability-description">${esc(portal?.text||item[lang].summary)}</span></span><span class="capability-open" aria-hidden="true">${arrow}</span></a>`;
 }).join('');
}

export function renderHomeFolderCards({language='fa',current='',url,portals={}}){
 const lang=language==='en'?'en':'fa';
 return solutions.map(item=>{
  const portal=portals[item.id]||{title:item[lang].label,text:item[lang].summary};
  return `<a class="home-folder-link" href="${esc(url(item.id))}" ${item.id===current?'aria-current="page"':''}>${renderHomeFolderArt(item.id)}<span class="home-folder-title">${esc(portal.title)}</span><span class="home-folder-description">${esc(portal.text)}</span></a>`;
 }).join('');
}

export function renderSolutionPage({language='fa',solution='',url,icon,portals={},motion=()=>'',collaboration,baseURL}) {
  const lang=language==='en'?'en':'fa',t=solutionsCopy[lang];
  const current=solution?solutions.find(item=>item.id===solution):solutions[0];
  const href=(target,params={})=>{
    const destination=url(target);
    if(!destination)return null;
    if(!Object.keys(params).length)return destination;
    const link=new URL(destination,baseURL);
    for(const [key,value] of Object.entries(params))link.searchParams.set(key,value);
    return destination.split(/[?#]/,1)[0]+link.search+link.hash;
  };
  const arrow='<svg class="cta-direction" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
  const heading=parts=>`${esc(parts[0])}<br><em>${esc(parts[1])}</em>`;
  const cta=(target,label,secondary=false)=>`<a class="solution-cta${secondary?' solution-cta-secondary':''}" href="${esc(href(target))}">${esc(label)}${arrow}</a>`;
  const cards=items=>items.map(item=>`<article class="solution-card"><span class="solution-icon">${icon(item.icon)}</span><h3><a href="${esc(href(item.id))}">${esc(item[lang].label)}</a></h3><p>${esc(item[lang].summary)}</p><ul class="solution-tags">${item[lang].tags.map(tag=>`<li>${esc(tag)}</li>`).join('')}</ul>${cta(item.id,t.explore)}</article>`).join('');
  const closing=()=>collaboration();

  if(solution&&!current){
    const html=`<section class="page-hero"><div class="eyebrow">${esc(t.label)}</div><h1>${esc(t.notFound)}</h1><p>${esc(t.notFoundText)}</p>${cta('solutions',t.back)}</section>`;
    return {html,title:t.notFound,description:t.notFoundText};
  }
  const content=current?.[lang]||t;
  const title=`${current?`${content.label} — `:''}${t.label} — ${lang==='fa'?'محمدرضا دلیلی':'Mohamad Reza Dalili'}`;


  const html=`<div class="solution-workspace"><header class="solutions-selector"><nav class="home-folder-grid" aria-label="${esc(t.label)}">${renderHomeFolderCards({language:lang,current:current.id,url:href,portals})}</nav></header>
    <section class="solution-sheet" id="solution-panel" aria-labelledby="solution-title">
      <div class="solution-sheet-head">
        <h1 id="solution-title">${heading(content.headline)}</h1>
        <img class="solution-print" src="assets/brand/studio-hand-small.webp" width="680" height="453" alt="">
        ${current.story ? `<a class="solution-story-link" href="${esc(href('article',{post:current.story.post}))}">${esc(current.story[lang])}</a>` : ''}
      </div>
      ${renderSolutionLab(current.id,lang)}
    </section></div>
    <details class="solution-notes"><summary>${lang==='fa'?'جزئیات، خروجی‌ها و مراحل کار':'Details, deliverables and process'}</summary>
      <div class="solution-notes-intro"><p>${esc(content.intro)}</p>${cta('contact',t.conversation)}</div>
      <aside class="solution-lens" aria-labelledby="solution-lens-title">
        ${motion(current.id)}
        <div class="solution-lens-copy"><span class="small-label">${esc(t.lens)}</span><h2 id="solution-lens-title">${esc(content.lensTitle)}</h2><p>${esc(content.lensText)}</p><ul class="solution-tags">${content.tags.map(tag=>`<li>${esc(tag)}</li>`).join('')}</ul></div>
      </aside>
    <section class="solution-fit" aria-labelledby="fit-heading"><h2 id="fit-heading">${esc(t.fit)}</h2><ul>${content.fit.map(text=>`<li>${esc(text)}</li>`).join('')}</ul></section>
    <section class="solution-output-section" aria-labelledby="outputs-heading"><div class="home-section-heading"><h2 id="outputs-heading">${esc(t.outputs)}</h2></div><div class="solution-outputs">${content.outputs.map(item=>`<article><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div></section>
    <section class="solution-process" aria-labelledby="process-heading"><h2 id="process-heading">${esc(t.process)}</h2><div>${content.process.map(item=>`<article><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div></section>
    </details>${current.evidence.length?`<section class="solution-evidence" aria-labelledby="evidence-heading"><h2 id="evidence-heading">${esc(t.evidence)}</h2><div>${current.evidence.map(item=>`<a href="${esc(href(item.target,item.params))}">${esc(item[lang])}${arrow}</a>`).join('')}</div></section>`:''}
    <section class="solution-faq" aria-labelledby="questions-heading"><h2 id="questions-heading">${esc(t.questions)}</h2>${content.faq.map(item=>`<details><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`).join('')}</section>
    <section class="solution-related" aria-labelledby="related-heading"><div class="home-section-heading"><h2 id="related-heading">${esc(t.others)}</h2></div><div class="solutions-grid">${cards(solutions.filter(item=>item.id!==current.id))}</div></section>${closing()}`;
  return {html:html.trim().replaceAll(/^[^\S\n]+$/gm,''),title,description:content.intro};
}

export function mountSolutions(root,options) {
  const page=renderSolutionPage({...options,baseURL:location.href});
  document.title=page.title;
  document.querySelector('meta[name="description"]').content=page.description;
  root.classList.add('solutions-page');
  root.innerHTML=page.html;
}

// Keep each folder's real URL, including when opened directly or in a new tab.
export function activateSolutions(root,options) {
  const routes=new Map(solutions.map(({id})=>[new URL(options.url(id),location.href).pathname,id]));
  const canonical=root.ownerDocument.querySelector('link[rel="canonical"]');
  let disconnect=()=>{};
  function show(id,focus) {
    if(!id)return;
    disconnect();
    mountSolutions(root,{...options,solution:id});
    root.ownerDocument.body.dataset.solution=id;
    if(canonical)canonical.href=new URL(options.url(id),canonical.href).href;
    connect();
    if(focus)root.querySelector('.home-folder-link[aria-current="page"]')?.focus({preventScroll:true});
  }
  function connect() {
    disconnect=connectFolderPanel(root,tab=>{
      const next=new URL(tab.href);
      const id=routes.get(next.pathname);
      if(!id){location.assign(tab.href);return;}
      history.pushState(null,'',next);
      show(id,true);
    });
  }
  function restore() {
    const id=routes.get(location.pathname) || options.solution;
    if(id!==root.ownerDocument.body.dataset.solution)show(id,root.querySelector('.home-folder-grid')?.contains(root.ownerDocument.activeElement));
  }
  connect();
  window.addEventListener('popstate',restore);
  return ()=>{disconnect();window.removeEventListener('popstate',restore);};
}
