import {career, projects, copy, siteCopy, skillsCopy, pageFiles, pageSearchTitles, contactChannels, homePortalCopy} from '../content/index.mjs';
import {icon,skillIcon} from './icons.mjs';
import {createPortfolioView} from './view.mjs';
import {navigationItems} from './navigation.mjs';
import {watchSectionEntrances} from './section-entrances.mjs';
import {escapeHTML} from '../../public/blog-core.mjs';
import {homeHref, localizedEntryFile} from '../../public/site-config.mjs';

const tabIds=['experience','projects','about','contact'];
const params=new URLSearchParams(location.search);

const requestedPage=document.body.dataset.page||'cv';
// Keep previously shared profile links working after introducing the homepage.
const page=requestedPage==='home'&&(params.has('tab')||params.has('role'))?'cv':requestedPage;
const navPage=page==='article'?'blog':page==='skills'?'solutions':page==='work-stories'?'cv':page;
let blogMountVersion=0;
let solutionsMountVersion=0;
let disposeSolutions=()=>{};
let workStoriesMountVersion=0;
let careerStoriesMountVersion=0;
let careerCollapsed=false;
const careerMobileLayout = page === 'cv' ? matchMedia('(max-width: 760px)') : null;
let disposeWorkStories=()=>{};

let savedLanguage;try{savedLanguage=localStorage.getItem('portfolio-language');}catch{}
function rememberServerLanguage(value){
 try{
  if(!document.cookie.split(';').some(part=>part.trim()==='portfolio_language='+value)){
   document.cookie='portfolio_language='+value+'; Path=/; Max-Age=31536000; SameSite=Lax';
  }
 }catch{}
}
if(['fa','en'].includes(savedLanguage)) rememberServerLanguage(savedLanguage);
const fileLanguage=location.pathname.match(/\.(fa|en)\.html$/)?.[1];
const queryLanguage=['fa','en'].includes(params.get('lang'))?params.get('lang'):null;
const cvFileLanguage=location.pathname.match(/\/cv\.(en|fa)\.html$/)?.[1];
let lang=cvFileLanguage||queryLanguage||fileLanguage||(['fa','en'].includes(savedLanguage)?savedLanguage:document.documentElement.lang==='en'?'en':'fa');
let activeTab=tabIds.includes(params.get('tab'))?params.get('tab'):location.pathname.endsWith('/contact.html')?'contact':'experience';
let activeCareer=career.some(x=>x.id===params.get('role'))?params.get('role'):'boomerang';
const $=id=>document.getElementById(id);

function updateURL(){
 const url=new URL(location.href);
 if(page==='home')url.pathname=new URL(homeHref(lang),url).pathname;
 url.searchParams.set('lang',lang);
 if(page==='cv'){
  url.searchParams.set('tab',activeTab);
  url.searchParams.set('role',activeCareer);
 }else{
  url.searchParams.delete('tab');
  if(page!=='work-stories')url.searchParams.delete('role');
 }
 history.replaceState(null,'',url);
}
function heading(title,sub,extra=''){return `<div class="section-heading"><div><h3>${title}</h3><p>${sub}</p></div>${extra?`<span>${extra}</span>`:''}</div>`;}
let view;
function render(){
  view=createPortfolioView(lang);
  ensureAmbient();
  const hasEntry=$('main').dataset.entryLang===lang;
  const hasStaticSolution=hasEntry && page==='solutions';
  const t=copy[lang],s=siteCopy[lang],pageLabel=page==='work-stories'?(lang==='fa'?'روایت‌های کاری':'Work stories'):page==='skills'?skillsCopy[lang].label:s.nav[Object.keys(pageFiles).indexOf(navPage)];document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';const hasReadingEntry=$('main').dataset.readingLang===lang && (page==='blog'||page==='article');
  if (!hasStaticSolution && !hasReadingEntry) document.title=pageSearchTitles[lang]?.[page] || `${pageLabel} — ${t.name}`;
  if (!(hasEntry && page==='work-stories') && !hasStaticSolution && !hasReadingEntry) document.querySelector('meta[name="description"]').content=page==='work-stories'?(lang==='fa'?'روایت‌های کاری محمدرضا دلیلی؛ از کامپیوتر تا بازاریابی و فروش آنلاین.':'Work stories by Mohamad Reza Dalili, from computers to marketing and online sales.'):page==='skills'?skillsCopy[lang].intro:page==='home'?view.homeDescription():page==='blog'?s.blogIntro:page==='contact'?s.contactIntro:t.intro;
  document.body.dataset.currentPage=page;
  $('brand-name').textContent=t.name;$('brand-role').innerHTML=view.titleMarkup();$('header-label').textContent=page==='home'?'':pageLabel;$('header-label').hidden=page==='home';
  const brand=document.querySelector('.brand');brand.href=view.pageURL('home');brand.setAttribute('aria-label',`${s.nav[0]} — ${t.name}`);
  const mark=document.querySelector('.brand-mark');mark.innerHTML=page==='home'?`<img class="header-portrait" src="images/myphoto-avatar-v1.webp" width="59" height="59" alt="" fetchpriority="high">`:view.brandMark();
  $('language').innerHTML=view.languageButtonMarkup();$('language').dir=lang==='fa'?'ltr':'rtl';
  $('language').lang=lang==='fa'?'en':'fa';$('language').setAttribute('aria-label',lang==='fa'?'Switch to English':'تغییر زبان به فارسی');
  if ($('footer').querySelector('nav')?.getAttribute('aria-label') !== s.navLabel) {
    const links=navigationItems(lang,navPage,view.pageURL);
    $('footer').innerHTML=`<nav aria-label="${s.navLabel}">${links.map(({id,href,label,current})=>`<a href="${href}" ${current?'aria-current="page"':''}>${icon(id)}<span>${label}</span></a>`).join('')}</nav>`;
  }
  if (!hasStaticSolution && !(hasEntry && page==='work-stories') && !$('main').dataset.readingLang) $('main').className=page==='cv'?'layout':'page-layout';
  if(page==='cv'){
    $('main').innerHTML='<aside id="profile" class="profile-card"></aside><section class="workspace"><div id="intro" class="intro"></div><div class="work-card"><div id="main-tabs" class="main-tabs" role="tablist"></div><div id="content"></div></div></section>';
    renderCV();
  }else if(page==='home')renderHome();
  else if(page==='solutions')renderSolutions(hasStaticSolution);
  else if(page==='skills')renderSkills();
  else if(page==='blog')renderBlog();
  else if(page==='article')renderBlog('article');
  else if(page==='work-stories')renderWorkStories();
  else if(!hasEntry)renderContactPage();
  updateURL();
}

function renderCV(){
  const t=copy[lang];
  $('profile').setAttribute('aria-label',t.name);
  $('profile').innerHTML=view.cvProfileMarkup();
  $('intro').innerHTML=view.cvIntroMarkup();
  $('main-tabs').setAttribute('aria-label',t.tabLabel);
  $('main-tabs').innerHTML=tabIds.map((id,i)=>`<button type="button" role="tab" id="tab-${id}" aria-controls="panel-${id}" aria-selected="${id===activeTab}" tabindex="${id===activeTab?0:-1}" data-tab="${id}">${t.tabs[i]}${i<2?`<span class="tab-count" aria-hidden="true">${new Intl.NumberFormat(lang).format(i===0?8:projects.length)}</span>`:''}</button>`).join('');
  $('content').innerHTML=tabIds.map(id=>`<section role="tabpanel" id="panel-${id}" aria-labelledby="tab-${id}" tabindex="0" ${id===activeTab?'':'hidden'}></section>`).join('');
  renderContent();
}

function ensureAmbient(){
 import('./home-atmosphere.mjs?v=20261109-studio-coast').then(({ensureSiteAtmosphere})=>ensureSiteAtmosphere()).catch(()=>{});
}

let disposeHomeBlog=()=>{};

function renderHome(){
 disposeHomeBlog();disposeHomeBlog=()=>{};
 const main=$('main'),homeLanguage=lang,year=new Date().getFullYear(),same=main.dataset.entryLang===lang;
 if(!same||!main.querySelector('[data-home-blog]')){
  const folders=same && main.querySelector('[data-capability-cards]')?.innerHTML;
  main.innerHTML=view.homeBodyMarkup(folders||view.loadingMarkup(lang==='fa'?'در حال آماده‌سازی راهکارها…':'Loading solutions…'),view.loadingMarkup(lang==='fa'?'در حال بارگذاری نوشته‌ها…':'Loading posts…'),year);
 }
 main.dataset.entryLang=lang;
 main.querySelector('[data-home-year]').textContent=year;
 const cardsRoot=main.querySelector('[data-capability-cards]');
 if(!cardsRoot.querySelector('a')) import('./solutions.mjs?v=20261109-studio-coast').then(({renderHomeFolderCards})=>{
  if(!cardsRoot.isConnected||lang!==homeLanguage)return;
  cardsRoot.innerHTML=renderHomeFolderCards({language:homeLanguage,url:view.pageURL,icon:skillIcon,portals:homePortalCopy[homeLanguage]});
 }).catch(()=>{if(cardsRoot.isConnected&&lang===homeLanguage)cardsRoot.innerHTML=`<a class="solution-cards-fallback" href="${view.pageURL('solutions')}">${lang==='fa'?'دیدن راهکارها':'View solutions'}</a>`;});
 const blogRoot=$('main').querySelector('[data-home-blog]');
 import('./home-blog.mjs?v=20261115-first-posts').then(({mountHomeBlog})=>{if(blogRoot.isConnected&&lang===homeLanguage)disposeHomeBlog=mountHomeBlog(blogRoot,{language:homeLanguage});}).catch(()=>{if(blogRoot.isConnected&&lang===homeLanguage&&!blogRoot.querySelector('.home-post-card'))blogRoot.innerHTML=`<p class="home-blog-empty">${lang==='fa'?'نوشته‌ها را در برگه بلاگ ببینید.':'Explore the articles on the Blog page.'}</p>`;});
 // Restore visibility when keyboard navigation returns to the pinned skills link.
 const revealSkills=()=>{
  const stage=$('main').querySelector('.home-first-view'),hero=$('main').querySelector('.skills-hero-card'),tiles=$('main').querySelector('.skills-capability-grid'),deck=$('main').querySelector('.home-card-deck');
  if(matchMedia('(min-width:1000px)').matches&&deck.getBoundingClientRect().top<Math.max(hero.getBoundingClientRect().bottom,tiles.getBoundingClientRect().bottom)){window.scrollTo(0,Math.max(0,stage.parentElement.getBoundingClientRect().top+scrollY-112));}
 };
 $('main').querySelector('.skills-hero-card').addEventListener('focusin',revealSkills);
}

function renderSkills(){location.replace(view.pageURL('cv')+'&tab=experience');}
let disposeBlog=()=>{};
const pageModuleBase=document.currentScript?.src||document.baseURI;
async function loadPageModule(file, retry=false) {
 const url = new URL('runtime-'+file, pageModuleBase);
 if (file==='blog-list.mjs') url.searchParams.set('v','20261117-journal');
 if (file==='work-stories.mjs') url.searchParams.set('v','20261112-work-entries');
 if (retry) url.searchParams.set('retry',String(Date.now()));
 try { return await import(url.href); }
 catch {
  await new Promise(resolve => setTimeout(resolve,500));
  url.searchParams.set('retry',String(Date.now()));
  return import(url.href);
 }
}
function renderBlog(mode='index',retry=false){
 disposeBlog();disposeBlog=()=>{};
 const root=$('main'), version=++blogMountVersion, language=lang;
 const slug=mode==='article'?new URLSearchParams(location.search).get('post'):null;
 const template=document.body.dataset.template==='true';
 const current=()=>version===blogMountVersion && language===lang;
 const ready=()=>root.dataset.readingLang===language && (root.dataset.readingPost||null)===slug;
 const staticURL=mode==='index'?localizedEntryFile('blog.html',language)
   : /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug||'')?`reading/${language}/${slug}.html`:null;
 const entry=mode==='index'?'blog-list.mjs':'blog.mjs';
 root.querySelector('[data-reading-retry]')?.remove();
 if(!ready()){
  delete root.dataset.readingLang;delete root.dataset.readingPost;delete root.dataset.readingSrc;
  const label=language==='fa'?'در حال بارگذاری مقاله…':'Loading the article…';
  if(mode==='article'){
   const status=root.querySelector('.reading-skeleton .visually-hidden');
   if(status)status.textContent=label;else root.innerHTML=view.readingSkeleton(label);
  } else root.innerHTML=view.loadingMarkup(language==='fa'?'در حال بارگذاری نوشته‌ها…':'Loading posts…','blog-loading');
 }
 let interactive=false;
 async function getReadingCopy(){
  if(ready()||template||!staticURL)return;
  try {
   const response=await fetch(staticURL);
   if(!response.ok)return;
   const html=new DOMParser().parseFromString(await response.text(),'text/html');
   const copy=html.querySelector('#main');
   if(!current()||interactive||copy?.dataset.readingLang!==language||(copy.dataset.readingPost||null)!==slug)return;
   root.className=copy.className;
   root.dataset.readingLang=language;root.dataset.readingPost=slug||'';
   if(copy.dataset.readingSrc)root.dataset.readingSrc=copy.dataset.readingSrc;
   root.replaceChildren(...copy.childNodes);
   document.title=html.title;
  } catch { /* The interactive reader can still load independently. */ }
 }
 const reading=getReadingCopy();
 loadPageModule(entry,retry).then(async({mountBlog,unmountBlog})=>{
  if(!current())return;
  disposeBlog=unmountBlog||(()=>{});
  await mountBlog(root,{language,mode,template});
  if(current()){interactive=true;root.dataset.readingLang=language;root.dataset.readingPost=slug||'';}
 }).catch(async error=>{
  await reading;
  if(!current())return;
  if(!ready())root.replaceChildren();
  const note=document.createElement('p');
  note.dataset.readingRetry='';note.className='reading-recovery';note.setAttribute('role','status');
  note.textContent=language==='fa'?'بارگیری بخش تعاملی کامل نشد. ':'The interactive features could not load. ';
  const button=document.createElement('button');button.type='button';
  button.textContent=language==='fa'?'تلاش دوباره':'Try again';
  button.addEventListener('click',()=>renderBlog(mode,true),{once:true});note.append(button);
  (root.querySelector(mode==='index'?'.library-tools':'.article-header')||root).append(note);
  console.warn('Blog enhancement unavailable',error);
 });
}
function renderSolutions(hasEntry=false){
 if(!document.body.dataset.solution){location.replace(view.pageURL('strategy')+location.hash);return;}
 const version=++solutionsMountVersion,language=lang,root=$('main');
 disposeSolutions();
 if(!hasEntry)root.innerHTML=view.loadingMarkup(lang==='fa'?'در حال آماده‌سازی راهکارها…':'Preparing the solutions…','solutions-loading');
 import('./solutions.mjs?v=20261116-folder-panels').then(({mountSolutions,activateSolutions})=>{
  if(version!==solutionsMountVersion||language!==lang)return;
  const options={language,solution:document.body.dataset.solution,url:view.pageURL,icon:skillIcon,portals:homePortalCopy[language],motion:active=>view.renderMotionScene('solution',active),collaboration:()=>view.renderCollaborationCTA({showExperience:true})};
  if(!hasEntry || !root.querySelector('.solution-workspace')) mountSolutions(root,options);
  disposeSolutions=activateSolutions(root,options);
  ensureAmbient();
  if(location.hash==='#collaboration-title')$('collaboration-title')?.scrollIntoView({block:'start'});
 }).catch(error=>{
  if(version!==solutionsMountVersion)return;
  if(!hasEntry)root.innerHTML=`<p class="solutions-loading">${lang==='fa'?'نمایش راهکارها با مشکل روبه‌رو شد. صفحه را دوباره بارگذاری کنید.':'The solutions could not be loaded. Please reload the page.'}</p>`;
  console.error('Solutions could not be loaded',error);
 });
}
const workStoryCopy=document.getElementById('work-story-copy')?.cloneNode(true);
function renderWorkStories(retry=false){
 disposeWorkStories();disposeWorkStories=()=>{};
 const version=++workStoriesMountVersion,language=lang;
 const root=$('main');
 if(!root.querySelector('#work-story-copy') && workStoryCopy)root.replaceChildren(workStoryCopy.cloneNode(true));
 root.querySelector('[data-story-status]')?.remove();
 const requested=new URLSearchParams(location.search).get('role');
 if(requested)for(const details of root.querySelectorAll('[data-role-copy]'))details.open=details.dataset.roleCopy===requested;
 loadPageModule('work-stories.mjs',retry).then(({mountWorkStories})=>{
  if(version!==workStoriesMountVersion||language!==lang)return;
  disposeWorkStories=mountWorkStories($('main'),{language,roles:career,formatYears:view.years,renderWebsite:view.companyWebsite,activateStory:document.activeElement?.id!=='language'});
 }).catch(()=>{
  if(version!==workStoriesMountVersion||language!==lang)return;
  root.insertAdjacentHTML('afterbegin',`<p role="status" class="reading-recovery" data-story-status>${lang==='fa'?'برای دیدن نمای تعاملی روایت‌ها دوباره تلاش کن.':'Try again to open the interactive stories.'} <button type="button" data-story-retry>${lang==='fa'?'تلاش دوباره':'Try again'}</button></p>`);
  root.querySelector('[data-story-retry]').addEventListener('click',()=>renderWorkStories(true),{once:true});
 });
}

function renderContactPage(){
 $('main').innerHTML=view.contactPageMarkup();
}
function cvCompanyButton(role, mobile) {
  const entry = role[lang];
  const selected = activeCareer === role.id;
  const state = mobile ? `aria-expanded="${selected && !careerCollapsed}"`
    : `role="tab" aria-selected="${selected}" tabindex="${selected ? 0 : -1}"`;
  return `<button type="button" class="company" id="role-${role.id}" data-career="${role.id}" aria-controls="detail-${role.id}" ${state}>
    <span class="company-mark${role.logo ? ' has-company-logo' : ''}" aria-hidden="true">${view.companyLogo(role)}</span>
    <span class="company-copy"><strong>${escapeHTML(entry.company)}</strong>${mobile ? `<span class="company-position">${escapeHTML(entry.role)}</span>` : ''}<small>${view.years(role.years)}</small></span>
  </button>`;
}

function cvCareerDetail(role, mobile) {
  const t = copy[lang], entry = role[lang];
  const open = role.id === activeCareer && !(mobile && careerCollapsed);
  const identity = mobile ? '' : `<div class="detail-kicker employer-detail-brand">${role.logo ? `<span class="employer-detail-logo">${view.companyLogo(role)}</span>` : ''}<span>${escapeHTML(entry.company)}</span></div><h3>${escapeHTML(entry.role)}</h3>`;
  return `<article class="experience-detail" id="detail-${role.id}" role="${mobile ? 'region' : 'tabpanel'}" aria-labelledby="role-${role.id}"${mobile ? '' : ' tabindex="0"'}${open ? '' : ' hidden'}>
    ${identity}<div class="meta">${mobile ? '' : `<span>${view.years(role.years)}</span>`}<span>${escapeHTML(entry.sector)}</span></div>${view.companyWebsite(role)}
    <a class="career-story-link" href="${view.pageURL('work-stories')}&role=${role.id}"><span class="career-story-mark" aria-hidden="true">${icon('blog')}</span><span class="career-story-copy"><strong>${lang==='fa'?'روایت‌های این تجربه':'Stories from this role'}</strong><span>${lang==='fa'?`کارها و چیزهایی که در ${entry.company} یاد گرفتم`:`Work and lessons from ${entry.company}`}</span></span><span class="career-story-arrow" aria-hidden="true">${icon('arrow')}</span></a>
    <div class="detail-rule"></div><h4>${t.scope}</h4><ul class="responsibilities">${entry.points.map(point => `<li>${escapeHTML(point)}</li>`).join('')}</ul><div class="detail-tags">${view.chips(entry.tags)}</div>
  </article>`;
}

function renderCareerExperience() {
  const t = copy[lang];
  const mobile = careerMobileLayout.matches;
  const root = $('panel-experience'), previousFocus = document.activeElement;
  const focusedRole = root.contains(previousFocus) && previousFocus.closest('[data-career], .experience-detail');
  const version = ++careerStoriesMountVersion, language = lang;
  const layout = mobile
    ? `<div class="companies career-disclosures" role="group" aria-label="${t.careerLabel}">${career.map(role => `<div class="career-entry">${cvCompanyButton(role,true)}${cvCareerDetail(role,true)}</div>`).join('')}</div>`
    : `<div class="companies" role="tablist" aria-orientation="vertical" aria-label="${t.careerLabel}">${career.map(role => cvCompanyButton(role,false)).join('')}</div><div>${career.map(role => cvCareerDetail(role,false)).join('')}</div>`;
  root.innerHTML = heading(t.experience,t.experienceSub) + `<div class="experience-grid">${layout}</div>`;
  if (focusedRole) $('role-' + (focusedRole.dataset.career || activeCareer)).focus({preventScroll:true});
  import('./work-story-cards.mjs?v=20261111-work-journals').then(({renderCareerStoryCards}) => {
    if (version !== careerStoriesMountVersion || language !== lang || !root.isConnected) return;
    root.querySelectorAll('.career-story-link').forEach(link => {
      const role = new URL(link.href).searchParams.get('role');
      const markup = renderCareerStoryCards(role,language,location.href);
      if (markup) link.outerHTML = markup;
    });
  }).catch(()=>{});
}
function renderContent(){
 const t=copy[lang];
 renderCareerExperience();
 $('panel-projects').innerHTML=heading(t.projectHeading,t.projectSub)+`<div class="project-list">${projects.map((p,i)=>`<details class="project" ${i===0?'open':''}><summary><span class="project-icon" aria-hidden="true">${p.icon}</span><span><span class="project-title">${p[lang].title}</span><span class="project-subtitle" style="display:block">${p[lang].sub}</span></span></summary><div class="project-body"><p>${p[lang].body}</p>${view.chips(p[lang].tags)}${p.url?`<a class="text-link" href="${p.url}" target="_blank" rel="noopener noreferrer">${t.repo}</a>`:''}</div></details>`).join('')}</div>`;
 $('panel-about').innerHTML=heading(t.aboutHeading,t.aboutSub)+`<div class="about"><p>${t.longBio}</p><h4>${t.capabilities}</h4><div class="capability-grid">${t.capabilityItems.map(([a,b])=>`<div><strong>${a}</strong><p>${b}</p></div>`).join('')}</div><h4>${t.education}</h4>${t.degrees.map(([a,b,c])=>`<div class="education"><div><strong>${a}</strong><p>${b}</p></div><time>${c}</time></div>`).join('')}<h4>${t.results}</h4><p>${t.resultsText}</p><h4>${t.interests}</h4><p>${t.interestsText}</p></div>`;
 $('panel-contact').innerHTML=heading(t.contactHeading,t.contactSub)+`<div class="contact"><p>${t.contactText}</p>${view.contactLinks()}</div>`;
}
function selectTab(id){activeTab=id;for(const item of document.querySelectorAll('[data-tab]')){const active=item.dataset.tab===id;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;$(`panel-${item.dataset.tab}`).hidden=!active;}updateURL();}
function selectCareer(id) {
  const mobile = careerMobileLayout.matches;
  careerCollapsed = mobile && activeCareer === id && !careerCollapsed;
  activeCareer = id;
  const trigger = $('role-' + id);
  for (const button of $('panel-experience').querySelectorAll('[data-career]')) {
    const active = button === trigger && !careerCollapsed;
    if (mobile) button.setAttribute('aria-expanded', String(active));
    else {
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    }
    $(button.getAttribute('aria-controls')).hidden = !active;
  }
  updateURL();
  if (mobile && !careerCollapsed) {
    const panel = $('detail-' + id);
    const footerTop = $('footer').getBoundingClientRect().top;
    if (trigger.getBoundingClientRect().top < 0 || panel.getBoundingClientRect().top + 96 > footerTop) {
      trigger.scrollIntoView({block:'start', behavior:'instant'});
    }
  }
}
document.addEventListener('click',event=>{const tab=event.target.closest('[data-tab]');const company=event.target.closest('[data-career]');if(tab)selectTab(tab.dataset.tab);if(company)selectCareer(company.dataset.career);});
document.addEventListener('keydown',event=>{
 const el=event.target.closest('[data-tab],[data-career][role="tab"]');if(!el)return;
 const items=[...el.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];let index=items.indexOf(el);const vertical=el.hasAttribute('data-career');
 if(event.key==='Home')index=0;else if(event.key==='End')index=items.length-1;
 else if(vertical&&['ArrowDown','ArrowUp'].includes(event.key))index+=(event.key==='ArrowDown'?1:-1);
 else if(['ArrowRight','ArrowLeft'].includes(event.key))index+=(event.key==='ArrowRight'?1:-1)*(lang==='fa'?-1:1);
 else return;
 event.preventDefault();const next=items[(index+items.length)%items.length];if(vertical)selectCareer(next.dataset.career);else selectTab(next.dataset.tab);next.focus();
});
$('language').addEventListener('click',()=>{
 lang=lang==='fa'?'en':'fa';try{localStorage.setItem('portfolio-language',lang);}catch{}
 rememberServerLanguage(lang);
 if((page==='blog'||page==='article'||page==='home'||page==='cv'||page==='solutions'||page==='contact'||page==='work-stories') && document.body.dataset.template!=='true'){
  const url=new URL(location.href);url.searchParams.set('lang',lang);
  const entry=page==='solutions'&&document.body.dataset.solution?document.body.dataset.solution+'.html':page==='work-stories'?'work-stories.html':pageFiles[page];
  if(entry && localizedEntryFile(entry,lang)!==entry){
   url.pathname=new URL(localizedEntryFile(entry,lang),pageModuleBase).pathname;
  }
  location.assign(url);return;
 }
 render();$('language').focus();
});
careerMobileLayout?.addEventListener('change', () => {
  careerCollapsed = false;
  renderCareerExperience();
});
render();
watchSectionEntrances($('main'));
