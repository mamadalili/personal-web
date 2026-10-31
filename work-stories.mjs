import { escapeHTML as esc } from './blog-core.mjs';
import { posts } from './blog-data.mjs?v=20261031-original-visuals';
import { workStoryTopics } from './work-stories-data.mjs';
import { selectWorkRole, workStoryHref } from './work-stories-model.mjs?v=20261031-work-stories-2';

const copy={
  fa:{eyebrow:'آورده‌های مسیر کار',title:'روایت‌های کاری من',intro:'از کامپیوتر تا بازاریابی و فروش آنلاین، تجربه‌ها و چیزهایی که در عمل یاد گرفتم.',choose:'از کدام تجربه شروع کنیم؟',chooseHint:'عنوان شغلی را انتخاب کن و نوشته‌های مربوط به همان دوره را ببین.',scope:'کار من در این نقش',stories:'نوشته‌های این تجربه',plannedIntro:'برای هر نقش، پنج روایت در نظر گرفته‌ام. عنوان‌های زیر طرح اولیه‌اند؛ هر نوشته با مثال‌ها و تجربه‌های همان دوره کامل می‌شود.',mixedIntro:'روایت‌های منتشرشده را بخوان؛ موضوع‌های بعدی هم در همین فهرست می‌آیند.',plan:'طرح نوشته',read:'خواندن روایت',allCV:'دیدن سوابق و پروژه‌ها',selected:'تجربهٔ انتخاب‌شده',upNext:'روایت بعدی از کجا شروع شود؟',upNextText:'مسئله چه بود، من چه کاری پیش بردم و چه چیزی از آن یاد گرفتم؟ هر نوشته، روایت مستقلی از یک تجربه است.'},
  en:{eyebrow:'WHAT WORK TAUGHT ME',title:'Stories from my work',intro:'From computers to marketing and online sales: experiences and what I learned in practice.',choose:'Where would you like to start?',chooseHint:'Choose a role to explore the stories from that part of my career.',scope:'My work in this role',stories:'Stories from this experience',plannedIntro:'I have set aside five stories for each role. These are initial topics; each will grow around examples and experiences from that period.',mixedIntro:'Read the published stories, with upcoming topics alongside them.',plan:'Story outline',read:'Read the story',allCV:'Explore my experience and projects',selected:'Selected experience',upNext:'Where does the next story begin?',upNextText:'What was the problem, what did I do, and what did I learn? Each piece tells a separate story from the work.'}
};
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
const paper='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM14 3v5h5M9 12h7m-7 4h5"/></svg>';

const roleLogo=role=>role.logo?`<img class="company-logo" src="${esc(role.logo.src)}" width="${role.logo.width}" height="${role.logo.height}" alt="" loading="lazy" decoding="async">`:esc(role.mark);

export function mountWorkStories(root,{language='fa',roles,formatYears=value=>value}){
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
  function renderSelected(announce=false){
    const role=selected,c=role[lang],topics=workStoryTopics[role.id]||[];
    const linked=topics.map(story=>({story,url:workStoryHref(story,lang,posts,location.href)}));
    root.querySelectorAll('[data-work-role]').forEach(link=>{if(link.dataset.workRole===role.id)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
    root.querySelector('.work-stories-detail').innerHTML=`<header class="work-role-header"><div class="work-role-meta"><span class="employer-detail-brand">${role.logo?`<span class="employer-detail-logo">${roleLogo(role)}</span>`:''}<span>${esc(c.company)}</span></span><time>${esc(formatYears(role.years))}</time></div><h2 id="work-role-title">${esc(c.role)}</h2><p class="work-sector">${esc(c.sector)}</p><div class="work-role-rule"></div><h3 class="work-scope-title">${t.scope}</h3><div class="work-role-summary">${c.points.map(point=>`<p>${esc(point)}</p>`).join('')}</div></header>
      <section class="work-story-collection" aria-labelledby="work-story-heading"><div class="work-story-heading"><span class="work-story-dot" aria-hidden="true"></span><h3 id="work-story-heading">${t.stories}</h3></div><p class="work-story-intro">${linked.some(row=>row.url)?t.mixedIntro:t.plannedIntro}</p><div class="work-story-list">${linked.map(({story,url})=>url?`<a class="work-story work-story--published" href="${esc(url)}"><span class="work-story-icon">${paper}</span><div><h4>${esc(story[lang].title)}</h4><span class="work-story-state">${t.read}</span></div><span class="work-story-arrow">${arrow}</span></a>`:`<article class="work-story work-story--planned"><span class="work-story-icon">${paper}</span><div><span class="work-story-state">${t.plan}</span><h4>${esc(story[lang].title)}</h4></div></article>`).join('')}</div></section>
      <aside class="work-story-note"><h3>${t.upNext}</h3><p>${t.upNextText}</p></aside>`;
    revealSelectedLink();
    if(announce)root.querySelector('[data-work-announcement]').textContent=`${t.selected}: ${c.company} — ${c.role}`;
  }
  function select(id,{write=false,focusPanel=false}={}){
    const next=selectWorkRole(roles,id),changed=next.id!==selected.id;
    selected=next;renderSelected(write&&changed);
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
    select(query.get('role'));
  },{signal});
  renderSelected();
  return ()=>controller.abort();
}
