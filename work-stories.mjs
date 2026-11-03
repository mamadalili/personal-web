import { escapeHTML as esc } from './blog-core.mjs';
import { posts } from './blog-data.mjs?v=20261031-original-visuals';
import { visibleWorkStories, workRoleNarratives } from './work-stories-data.mjs?v=20261103-cv-source';
import { selectWorkRole, workStoryHref } from './work-stories-model.mjs?v=20261031-work-stories-2';

const copy={
  fa:{eyebrow:'آورده‌های مسیر کار',title:'روایت‌های کاری من',intro:'همهٔ تجربه‌های شغلی CV در این صفحه آمده‌اند. متن فقط از همان منبع استفاده می‌کند و جاهای بدون داده با «نیازمند تکمیل» مشخص شده‌اند.',choose:'از کدام تجربه شروع کنیم؟',chooseHint:'عنوان شغلی را انتخاب کن و اطلاعات ثبت‌شده در CV را ببین.',scope:'موارد ثبت‌شده در CV',stories:'کارت‌های روایت',plannedIntro:'کارت‌ها فقط با اطلاعات موجود در CV پر شده‌اند؛ کارت اضافه عمداً خالی و قابل تکمیل باقی مانده است.',mixedIntro:'روایت منتشرشده و کارت‌های مبتنی بر CV در همین فهرست دیده می‌شوند.',plan:'برگرفته از CV',read:'خواندن روایت',allCV:'دیدن سوابق و پروژه‌ها',selected:'تجربهٔ انتخاب‌شده',context:'عنوان و زمینهٔ کار',situation:'مسئله یا موقعیت کاری',action:'کاری که من انجام دادم',result:'نتیجه یا آوردهٔ قابل‌اثبات',learning:'چیزی که در عمل یاد گرفتم',needsCompletion:'نیازمند تکمیل',sourceCV:'مستند در CV',story:'روایت'},
  en:{eyebrow:'WHAT WORK TAUGHT ME',title:'Stories from my work',intro:'Every role in the attached CV appears here. The page uses only source-backed material and marks unsupported fields as “Needs completion”.',choose:'Where would you like to start?',chooseHint:'Choose a role to see the information supported by the CV.',scope:'What the CV records',stories:'Story cards',plannedIntro:'Cards use only information present in the CV; extra cards intentionally remain empty and editable.',mixedIntro:'Published stories and CV-backed cards appear together here.',plan:'From the CV',read:'Read the story',allCV:'Explore my experience and projects',selected:'Selected experience',context:'Role and work context',situation:'Problem or work situation',action:'What I did',result:'Provable result or contribution',learning:'What I learned in practice',needsCompletion:'Needs completion',sourceCV:'Documented in CV',story:'Story'}
};
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
const paper='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM14 3v5h5M9 12h7m-7 4h5"/></svg>';

const roleLogo=role=>role.logo?`<img class="company-logo" src="${esc(role.logo.src)}" width="${role.logo.width}" height="${role.logo.height}" alt="" loading="lazy" decoding="async">`:esc(role.mark);

const storyTitle=(story,c,t,index)=>c.points[story.sourceIndex]||t.story+' '+(index+1)+' — '+t.needsCompletion;
const storyState=(story,c,t)=>c.points[story.sourceIndex]?t.sourceCV:t.needsCompletion;
const narrativeValue=(value,t)=>{
  if(Array.isArray(value)&&value.length)return '<ul>'+value.map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul>';
  if(value)return '<p>'+esc(value)+'</p>';
  return '<p class="work-narrative-missing">'+esc(t.needsCompletion)+'</p>';
};
function renderNarrative(role,c,narrative,t,formatYears){
  const context=c.role+' — '+c.company+' · '+formatYears(role.years)+' · '+c.sector;
  const sections=[[t.context,context],[t.situation,narrative?.situation],[t.action,c.points],[t.result,narrative?.result],[t.learning,narrative?.learning]];
  return '<section class="work-role-narrative" aria-labelledby="work-role-narrative-title"><h3 id="work-role-narrative-title">'+esc(t.context)+'</h3><div class="work-role-narrative-grid">'+sections.map(([label,value],index)=>'<article class="work-narrative-card work-narrative-card--'+(index+1)+'"><h4>'+esc(label)+'</h4>'+narrativeValue(value,t)+'</article>').join('')+'</div></section>';
}

export function mountWorkStories(root,{language='fa',roles,formatYears=value=>value,renderWebsite=()=>'',activateStory=true}){
  const lang=language==='en'?'en':'fa',t=copy[lang],controller=new AbortController(),signal=controller.signal;
  let selected=selectWorkRole(roles,new URLSearchParams(location.search).get('role'));
  if(!selected)return ()=>controller.abort();
  const roleURL=id=>{const url=new URL('work-stories.html',location.href);url.searchParams.set('lang',lang);url.searchParams.set('role',id);return url.href;};
  const cvURL=()=>{const url=new URL('profile.html',location.href);url.searchParams.set('lang',lang);url.searchParams.set('tab','experience');return url.href;};
  root.classList.add('work-stories-page');
  root.innerHTML=`<header class="work-stories-hero"><div><span class="eyebrow">${t.eyebrow}</span><h1>${t.title}</h1><p>${t.intro}</p></div><a class="work-stories-back" href="${esc(cvURL())}">${t.allCV}${arrow}</a></header>
    <div class="work-stories-layout"><aside class="work-roles"><h2>${t.choose}</h2><p>${t.chooseHint}</p><nav class="work-role-list" aria-label="${t.choose}">${roles.map(role=>`<a href="${esc(roleURL(role.id))}" class="work-role" data-work-role="${esc(role.id)}"><span class="work-role-mark${role.logo?' has-company-logo':''}" aria-hidden="true">${roleLogo(role)}</span><span class="work-role-copy"><strong>${esc(role[lang].company)}</strong><span>${esc(role[lang].role)}</span><small>${esc(formatYears(role.years))}</small></span></a>`).join('')}</nav></aside><section class="work-stories-detail" aria-labelledby="work-role-title"></section></div><p class="visually-hidden" role="status" data-work-announcement></p>`;
  function revealSelectedLink(){
    const list=root.querySelector('.work-role-list'),link=list.querySelector('[aria-current]');
    if(!link)return;
    const outer=list.getBoundingClientRect(),inner=link.getBoundingClientRect();
    const left=inner.left<outer.left?inner.left-outer.left:inner.right>outer.right?inner.right-outer.right:0;
    const top=inner.top<outer.top?inner.top-outer.top:inner.bottom>outer.bottom?inner.bottom-outer.bottom:0;
    list.scrollBy({left,top,behavior:'auto'});
  }
  function renderSelected(announce=false,activateTopic=false){
    const role=selected,c=role[lang],topics=visibleWorkStories(role.id),narrative=workRoleNarratives[role.id]?.[lang]||{};
    const linked=topics.map(story=>({story,url:workStoryHref(story,lang,posts,location.href)}));
    root.querySelectorAll('[data-work-role]').forEach(link=>{if(link.dataset.workRole===role.id)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
    root.querySelector('.work-stories-detail').innerHTML=`<header class="work-role-header"><div class="work-role-meta"><span class="employer-detail-brand">${role.logo?`<span class="employer-detail-logo">${roleLogo(role)}</span>`:''}<span>${esc(c.company)}</span></span><time>${esc(formatYears(role.years))}</time></div><h2 id="work-role-title">${esc(c.role)}</h2><p class="work-sector">${esc(c.sector)}</p>${renderWebsite(role)}</header>
      ${renderNarrative(role,c,narrative,t,formatYears)}
      <section class="work-story-collection" aria-labelledby="work-story-heading"><div class="work-story-heading"><h3 id="work-story-heading">${t.stories}</h3></div><p class="work-story-intro">${linked.some(row=>row.url)?t.mixedIntro:t.plannedIntro}</p><div class="work-story-list" tabindex="0" role="region" aria-label="${t.stories}">${linked.map(({story,url},index)=>url?`<a id="${esc(story.id)}" class="work-story work-story--published" href="${esc(url)}"><span class="work-story-icon">${paper}</span><div><h4>${esc(storyTitle(story,c,t,index))}</h4><span class="work-story-state">${t.read}</span></div><span class="work-story-arrow">${arrow}</span></a>`:`<article id="${esc(story.id)}" class="work-story work-story--planned${c.points[story.sourceIndex]?'':' work-story--missing'}" tabindex="-1"><span class="work-story-icon">${paper}</span><div><span class="work-story-state">${esc(storyState(story,c,t))}</span><h4>${esc(storyTitle(story,c,t,index))}</h4></div></article>`).join('')}</div></section>
      <section class="work-role-background"><h3 class="work-scope-title">${t.scope}</h3><div class="work-role-summary">${c.points.map(point=>`<p>${esc(point)}</p>`).join('')}</div></section>`;
    revealSelectedLink();
    const requested=new URLSearchParams(location.search).get('story')||location.hash.slice(1);
    const story=topics.find(item=>item.id===requested);
    if(activateTopic&&story){
      const card=document.getElementById(story.id);
      card?.scrollIntoView({block:'nearest',inline:'center',behavior:'instant'});
      card?.focus({preventScroll:true});
    }
    if(announce)root.querySelector('[data-work-announcement]').textContent=`${t.selected}: ${c.company} — ${c.role}`;
  }
  function select(id,{write=false,focusPanel=false,activateTopic=false}={}){
    const next=selectWorkRole(roles,id),changed=next.id!==selected.id;
    selected=next;renderSelected(write&&changed,activateTopic);
    if(write&&changed)history.pushState(null,'',roleURL(selected.id));
    if(focusPanel&&matchMedia('(max-width:760px)').matches)root.querySelector('.work-stories-detail').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
  }
  root.addEventListener('click',event=>{
    const link=event.target.closest('[data-work-role]');
    if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
    event.preventDefault();if(link.dataset.workRole!==selected.id)select(link.dataset.workRole,{write:true,focusPanel:true});
  },{signal});
  root.addEventListener('keydown',event=>{
    const link=event.target.closest('[data-work-role]');if(!link)return;
    const links=[...root.querySelectorAll('[data-work-role]')];let index=links.indexOf(link);
    if(event.key==='Home')index=0;else if(event.key==='End')index=links.length-1;
    else if(['ArrowDown','ArrowUp'].includes(event.key))index+=event.key==='ArrowDown'?1:-1;
    else if(['ArrowRight','ArrowLeft'].includes(event.key))index+=(event.key==='ArrowRight'?1:-1)*(lang==='fa'?-1:1);else return;
    event.preventDefault();const next=links[(index+links.length)%links.length];select(next.dataset.workRole,{write:true});next.focus();
  },{signal});
  window.addEventListener('popstate',()=>{
    const query=new URLSearchParams(location.search);
    if(['fa','en'].includes(query.get('lang'))&&query.get('lang')!==lang){location.reload();return;}
    select(query.get('role'),{activateTopic:true});
  },{signal});
  renderSelected(false,activateStory);
  return ()=>controller.abort();
}
