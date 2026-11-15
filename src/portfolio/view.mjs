import {career, copy, siteCopy, skillsCopy, pageFiles, extraPageFiles, collaborationCopy, contactChannels, contactCopy} from '../content/index.mjs';
import {icon} from './icons.mjs';
import {escapeHTML} from '../../public/blog-core.mjs';

export function createPortfolioView(lang){
 let motionSceneSerial=0;
function brandMark(animated=false){return `<span class="brand-logo${animated?' brand-logo--motion':''}" aria-hidden="true"><img src="assets/brand/monogram.svg" width="64" height="64" alt=""></span>`;}

function titleMarkup(label=copy[lang].role){const text=escapeHTML(label);return `<span>${text}</span><span class="title-shine" aria-hidden="true">${text}</span>`;}

function professionalTitle(extra='',label=copy[lang].role){return `<span class="professional-title ${extra}">${titleMarkup(label)}</span>`;}

function languageButtonMarkup(){return `<svg class="language-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 8 6 6m-7 0 6-6 2-3H2m5-3h1m5 18 4-10 4 10m-6.5-3h5"/></svg><span class="language-label">${lang==='fa'?'English':'فارسی'}</span>`;}

function loadingMarkup(text,extra=''){return `<div class="site-loader ${extra}" role="status">${brandMark(true)}<span class="visually-hidden">${text}</span></div>`;}

function readingSkeleton(text) {
 return `<div class="reading-skeleton" role="status"><span class="visually-hidden">${text}</span><div class="reading-skeleton-ink" aria-hidden="true">${brandMark()}<i></i><i></i><i></i><b></b></div></div>`;
}

const chips=items=>`<div class="chips">${items.map(s=>`<span class="chip">${escapeHTML(s)}</span>`).join('')}</div>`;

const years=value=>lang==='fa'?value.replace(/\d/g,n=>'۰۱۲۳۴۵۶۷۸۹'[n]):`${value} SH`;

function pageURL(id){const file=pageFiles[id]||extraPageFiles[id];return file?`${file}?lang=${lang}`:null;}

function cvProfileMarkup(){
  const t = copy[lang];
  const email = contactChannels.find(channel => channel.id === 'email');
  const github = contactChannels.find(channel => channel.id === 'github');
  return `<header class="cv-profile-head">
    <img class="cv-portrait" src="images/myphoto-profile-v1.webp" width="130" height="130" alt="" fetchpriority="high">
    <div class="cv-identity">
      <h1>${escapeHTML(t.name)}</h1>
      ${professionalTitle('role')}
      <span class="location">${escapeHTML(t.location)}</span>
    </div>
  </header>
  <section class="profile-section cv-about" aria-labelledby="cv-about-title">
    <h2 id="cv-about-title">${escapeHTML(t.aboutMe)}</h2>
    <p class="cv-bio-lead">${escapeHTML(t.bioLead)}</p>
    <p class="bio">${escapeHTML(t.bio)}</p>
  </section>
  <section class="profile-section cv-focus" aria-labelledby="cv-focus-title">
    <h2 id="cv-focus-title">${escapeHTML(t.focus)}</h2>
    <ul class="cv-skills" role="list">${t.skills.map(skill => `<li><bdi>${escapeHTML(skill)}</bdi></li>`).join('')}</ul>
  </section>
  <div class="cv-actions">
    <a class="cv-download" href="assets/cv/mohammadreza-dalili-fa.pdf" download="Mohammadreza-Dalili-CV-FA.pdf">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4"/></svg>
      <span>${lang === 'fa' ? 'دانلود رزومه (PDF)' : 'Download CV (Persian PDF)'}</span>
    </a>
    <div class="cv-reach">
      <a href="${email.href}">${escapeHTML(t.emailMe)}</a>
      <a href="${github.href}" target="_blank" rel="noopener noreferrer">${escapeHTML(github[lang])}</a>
    </div>
  </div>`;
}

function cvIntroMarkup(){
  const t = copy[lang];
  const rows = t.stats.map(({label, prefix, number, unit}) => {
    const value = [
      prefix && `<span class="metric-qualifier">${escapeHTML(prefix)}</span>`,
      `<bdi dir="ltr">${escapeHTML(number)}</bdi>`,
      unit && escapeHTML(unit)
    ].filter(Boolean).join(' ');
    return `<div class="career-metric"><dt>${escapeHTML(label)}</dt><dd>${value}</dd></div>`;
  });
  return `<div class="eyebrow">${t.eyebrow}</div><h2>${t.headline}</h2><p>${t.intro}</p><dl class="career-metrics">${rows.join('')}</dl>`;
}

function renderMotionScene(placement='home',active=''){
 const id=`motion-scene-${++motionSceneSerial}`;
 const nodes=[
  {id:'strategy',x:20,y:24,fa:'استراتژی',en:'Strategy',path:'<path d="M3 18h18M5 14l5-5 4 3 6-8M16 4h4v4"/>'},
  {id:'execution',x:236,y:24,fa:'اجرا',en:'Execution',path:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="m8 12 3 3 5-6"/>'},
  {id:'technology',x:20,y:166,fa:'فناوری',en:'Technology',path:'<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m9 10-3 2 3 2m6-4 3 2-3 2"/>'},
  {id:'ai-tools',x:236,y:166,fa:'ابزارهای AI',en:'AI tools',path:'<circle cx="5" cy="12" r="3"/><circle cx="18" cy="5" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8 10 7-4M8 14l7 4"/>'}
 ];
 const routes=['M144 57C180 57 160 98 180 108','M236 57C200 57 220 98 200 108','M144 199C180 199 160 164 180 152','M236 199C200 199 220 164 200 152'];
 return `<div class="motion-scene motion-scene--${placement}" aria-hidden="true"><svg viewBox="0 0 380 260" focusable="false" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}-glass" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".98"/><stop offset="1" stop-color="#eef0ff" stop-opacity=".88"/></linearGradient><radialGradient id="${id}-halo"><stop stop-color="#ccff00" stop-opacity=".32"/><stop offset="1" stop-color="#ccff00" stop-opacity="0"/></radialGradient></defs><ellipse class="scene-halo" cx="190" cy="130" rx="145" ry="112" fill="url(#${id}-halo)"/><g class="scene-orbit"><ellipse cx="190" cy="130" rx="100" ry="76" fill="none" stroke="#1c09981c" stroke-width="1"/><circle cx="90" cy="130" r="4" fill="#ccff00"/><circle cx="290" cy="130" r="2.5" fill="#1c0998"/></g>${routes.map((d,index)=>`<path d="${d}" fill="none" stroke="#d5d9eb" stroke-width="2"/><path class="scene-flow" style="--flow-delay:-${index*1.7}s" d="${d}" fill="none" stroke="#ccff00" stroke-width="2.5" stroke-dasharray="7 15"/>`).join('')}<g class="scene-core"><rect x="151" y="91" width="78" height="78" rx="25" fill="#fff" stroke="#dce3c4"/><image href="assets/brand/monogram.svg" x="159" y="99" width="62" height="62"/></g>${nodes.map((node,index)=>`<g transform="translate(${node.x} ${node.y})"><g class="scene-node${active===node.id?' is-selected':''}" style="--float-delay:-${index*1.4}s"><rect class="scene-node-surface" width="124" height="66" rx="18" fill="url(#${id}-glass)" stroke="${active===node.id?'#ccff00':'#d9dfec'}" stroke-width="${active===node.id?2:1}"/><svg x="51" y="10" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c0998" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${node.path}</svg><text x="62" y="50" text-anchor="middle" fill="#172144" font-size="13" font-weight="750">${escapeHTML(node[lang])}</text><path class="scene-node-glint" d="M16 1h30" stroke="#ccff00" stroke-width="2.5" stroke-linecap="round"/></g></g>`).join('')}<g class="scene-sparkles" fill="none" stroke="#ccff00" stroke-width="1.5" stroke-linecap="round"><path d="M187 15v10m-5-5h10M187 235v10m-5-5h10M7 125v10m-5-5h10M373 125v10m-5-5h10"/></g></svg></div>`;
}

function homeCardCTA(target,label){return `<a class="card-cta" href="${pageURL(target)}"><span>${label}</span><span class="card-arrow">${icon('arrow')}</span></a>`;}

function homeDescription(){
 return siteCopy[lang].homeIntro.replace('{role}',lang==='fa'?'مارکتر و اپراتور هوش مصنوعی،':copy[lang].role).replace('{home}',lang==='fa'?'خانه دیجیتال':'digital home');
}

function homeIntroMarkup(){
 const t=copy[lang],s=siteCopy[lang];
 return escapeHTML(s.homeIntro).replace('{role}',`<a class="home-intro-role" href="${pageURL('home')}">${professionalTitle('',lang==='fa'?'مارکتر و اپراتور هوش مصنوعی،':t.role)}</a>`).replace('{home}',`<strong>${lang==='fa'?'خانه دیجیتال':'digital home'}</strong>`);
}

function homeOpeningMarkup(folders){
 const s=siteCopy[lang],k=skillsCopy[lang];
 return `<section class="home-first-view home-art-hero" aria-labelledby="home-title"><div class="page-hero home-hero"><div class="home-welcome"><h1 id="home-title">${s.homeTitle}</h1><p>${homeIntroMarkup()}</p></div><div class="site-atmosphere is-paused" aria-hidden="true"></div></div>
 <article class="home-card skills-home-card skills-hero-card" aria-labelledby="skills-hero-title"><div class="skills-card-copy"><h2 id="skills-hero-title">${k.cardTitle}</h2><p>${k.cardBody}</p><div class="home-hero-actions">${homeCardCTA('solutions',k.cardAction)}${homeCardCTA('contact',s.contactAction)}</div></div><div class="skills-card-side"><nav class="skills-capability-grid home-folder-grid" aria-label="${lang==='fa'?'راهکارها':'Solutions'}" data-capability-cards>${folders}</nav></div></article>
 </section>`;
}

function homeBodyMarkup(folders,posts,year=''){
 const s=siteCopy[lang];
 const moreLabel=lang==='fa'?'بلاگ، پروفایل کاری و تماس':'Blog, professional profile and contact';
 return `<div class="home-scroll-story">${homeOpeningMarkup(folders)}<section class="home-card-deck" aria-label="${moreLabel}"><div class="home-grid">
 <article id="home-blog" class="home-card blog-card home-blog-section" aria-labelledby="home-blog-title"><header class="home-blog-header"><h2 id="home-blog-title" class="visually-hidden">${s.blogLabel}</h2><p>${s.blogBody}</p><a class="home-blog-all" href="${pageURL('blog')}">${lang==='fa'?'همهٔ نوشته‌ها':'All posts'}${icon('arrow')}</a></header><div class="home-blog-mount" data-home-blog>${posts}</div></article>
 <section class="home-quick-links" aria-label="${lang==='fa'?'مسیر کاری و ارتباط':'Work & conversation'}"><article class="home-card cv-card"><div class="card-top"><span class="card-icon">${icon('cv')}</span><span class="card-label">CV / ${s.cvLabel}</span></div><h2>${s.cvTitle}</h2><p>${s.cvBody} <a class="home-story-link" href="${pageURL('work-stories')}">${lang==='fa'?'روایت‌های کاری من':'Stories from my work'}</a></p>${homeCardCTA('cv',s.cvAction)}</article>
 <article class="home-card contact-home-card"><div class="card-top"><span class="card-icon">${icon('contact')}</span><span class="card-label">${s.contactLabel}</span></div><h2>${s.contactTitle}</h2><p>${s.contactBody}</p>${homeCardCTA('contact',s.contactAction)}</article></section>
 </div></section></div><div class="page-signoff">${brandMark()}<p>© <span data-home-year>${year}</span> ${s.copyright}</p></div>`;
}

function renderCollaborationCTA({showExperience=false}={}){
 const c=collaborationCopy[lang];
 return `<section class="collaboration-cta" aria-labelledby="collaboration-title"><div class="collaboration-copy"><div class="collaboration-eyebrow">${escapeHTML(c.eyebrow)}</div><h2 id="collaboration-title"><span>${escapeHTML(c.title)}</span> <em>${escapeHTML(c.accent)}</em></h2><p>${escapeHTML(c.body)}</p><div class="collaboration-prepare"><span>${escapeHTML(c.prepare)}</span><ul>${c.prompts.map(prompt=>`<li>${escapeHTML(prompt)}</li>`).join('')}</ul></div>${showExperience?`<p class="collaboration-background">${escapeHTML(c.background)} <a href="${pageURL('cv')}&tab=experience">${escapeHTML(c.backgroundLink)}</a></p>`:''}</div><div class="collaboration-actions"><p class="collaboration-action-label">${escapeHTML(c.actionLabel)}</p><a class="collaboration-primary" href="${pageURL('contact')}"><span>${escapeHTML(c.action)}</span><span class="collaboration-arrow">${icon('arrow')}</span></a><p class="collaboration-action-note">${escapeHTML(c.note)}</p><a class="collaboration-secondary" href="${pageURL('cv')}&tab=experience"><span>${escapeHTML(c.experience)}</span>${icon('arrow')}</a></div></section>`;
}

function contactLinks(){
 return `<div class="contact-methods">${contactChannels.map(channel=>`<a class="contact-card contact-method" data-contact="${channel.id}" href="${channel.href}" ${channel.href.startsWith('https:')?'target="_blank" rel="noopener noreferrer"':''}><span class="contact-method-icon">${icon(channel.icon)}</span><span class="contact-method-copy"><strong>${channel[lang]}</strong><span dir="ltr">${channel.value}</span></span><span class="contact-method-arrow">${icon('arrow')}</span></a>`).join('')}</div>`;
}

function companyLogo(role){return role.logo?`<img class="company-logo" src="${escapeHTML(role.logo.src)}" width="${role.logo.width}" height="${role.logo.height}" alt="" loading="lazy" decoding="async">`:escapeHTML(role.mark);}

function companyWebsite(role){
 if(!role.website)return '';
 const label=lang==='fa'?'وب‌سایت سازمان':'Organisation website',name=role[lang].company;
 const sites=Array.isArray(role.website)?role.website:[role.website];
 const links=sites.map(site=>{
  let url;try{url=new URL(site);}catch{return '';}
  if(url.protocol!=='https:'||url.username||url.password)return '';
  return `<a class="employer-website" href="${escapeHTML(url.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(`${label}: ${name} — ${url.hostname} (${lang==='fa'?'تب تازه':'new tab'})`)}"><span>${label}</span><bdi>${escapeHTML(url.hostname)}</bdi></a>`;
 }).join('');
 return links?`<div class="employer-websites">${links}</div>`:'';
}

function renderEmployerRail(){
 const seen=new Set(),employers=career.filter(role=>role.logo&&!seen.has(role.logo.src)&&seen.add(role.logo.src));
 return `<section class="employer-rail" aria-labelledby="employer-rail-title"><header><h2 id="employer-rail-title">${lang==='fa'?'بخشی از مسیر کاری من':'Places I have worked'}</h2><a href="${pageURL('cv')}&tab=experience">${lang==='fa'?'دیدن سوابق کاری':'Explore my work experience'}${icon('arrow')}</a></header><div class="employer-logo-grid">${employers.map(role=>`<a class="employer-logo-card" href="${pageURL('cv')}&tab=experience&role=${role.id}"><span>${companyLogo(role)}</span><strong>${escapeHTML(role[lang].company)}</strong></a>`).join('')}</div></section>`;
}

function contactPageMarkup(){
 const t=copy[lang],s=siteCopy[lang];
 const c=contactCopy[lang];
 return `<section class="contact-editorial" aria-labelledby="contact-title"><div class="contact-light-trace" aria-hidden="true"></div><div class="contact-editorial-copy"><h1 id="contact-title">${escapeHTML(s.contactIntro)}</h1><div class="contact-editorial-actions"><a href="${contactChannels.find(channel=>channel.id==='email').href}"><span>${c.email}</span>${icon('arrow')}</a><a href="${pageURL('cv')}"><span>${s.cvLink}</span>${icon('arrow')}</a></div><div class="contact-signature"><strong>${escapeHTML(t.name)}</strong>${professionalTitle()}</div></div><figure class="contact-portrait-stage"><div class="contact-monogram" aria-hidden="true"><img src="assets/brand/monogram.svg" alt="" width="210" height="210"></div><img class="contact-author-photo" src="images/contact-portrait.webp" width="1142" height="1377" alt="${escapeHTML(t.name)}" fetchpriority="high"></figure><a class="contact-glass" href="#contact-channels"><span class="contact-glass-copy"><small>${c.label}</small><strong>${c.title}</strong><p>${c.note}</p></span><span class="contact-glass-arrow" aria-hidden="true">${icon('arrow')}</span></a></section><section class="contact-channels-section" id="contact-channels" aria-labelledby="contact-channels-title"><div class="contact-channels-header"><h2 id="contact-channels-title">${c.channels}</h2>${brandMark(true)}</div>${contactLinks()}</section>${renderEmployerRail()}`;
}
 return {
  brandMark, titleMarkup, professionalTitle, languageButtonMarkup, loadingMarkup, readingSkeleton, chips, years, pageURL, cvProfileMarkup, cvIntroMarkup, renderMotionScene, homeCardCTA, homeDescription, homeIntroMarkup, homeOpeningMarkup, homeBodyMarkup, renderCollaborationCTA, contactLinks, companyLogo, companyWebsite, renderEmployerRail, contactPageMarkup
 };
}
