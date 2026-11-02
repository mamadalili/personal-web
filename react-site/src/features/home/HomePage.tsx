import type {FocusEvent} from 'react';
import {legacy} from '../../content/legacy';
import {pageURL} from '../../lib/routing';
import type {Language, Page, SolutionId} from '../../lib/routing';
import {AppLink} from '../../components/ui/AppLink';
import {BrandMark, ProfessionalTitle} from '../../components/ui/BrandSignature';
import {CapabilityArt, MotionScene} from '../../components/ui/DecorativeArt';
import {Icon} from '../../components/ui/Icon';
import {HomeCarousel} from './HomeCarousel';

function CardCTA({page, lang, label}: {page: Page; lang: Language; label: string}) {
  return <AppLink className="card-cta" href={pageURL(page, lang)}><span>{label}</span><span className="card-arrow"><Icon name="arrow"/></span></AppLink>;
}

export function HomePage({lang}: {lang: Language}) {
  const s = legacy.home[lang], k = legacy.skills[lang];
  const [first, second] = s.homeTitle.replace('</em>', '').split('<br><em>');
  const revealSkills = (event: FocusEvent<HTMLElement>) => {
    if (!matchMedia('(min-width:1000px)').matches) return;
    const story = event.currentTarget.closest('.home-scroll-story');
    const stage = story?.querySelector('.home-first-view'), hero = story?.querySelector('.skills-hero-card');
    const tiles = story?.querySelector('.skills-capability-grid'), deck = story?.querySelector('.home-card-deck');
    if (stage && hero && tiles && deck && deck.getBoundingClientRect().top < Math.max(hero.getBoundingClientRect().bottom, tiles.getBoundingClientRect().bottom)) {
      window.scrollTo(0, Math.max(0, story!.getBoundingClientRect().top + scrollY - 112));
    }
  };
  return <>
    <div className="home-scroll-story">
      <section className="home-first-view home-art-hero" aria-labelledby="home-title">
        <div className="page-hero home-hero"><div className="home-welcome">
          <h1 id="home-title">{first}<br/><em>{second}</em></h1>
          <p>{s.homeIntro.split(/(\{role\}|\{home\})/).map((part, i) => part === '{role}'
            ? <AppLink key={i} className="home-intro-role" href={pageURL('home', lang)}>
              <ProfessionalTitle lang={lang} label={lang === 'fa' ? 'مارکتر و اپراتور هوش مصنوعی،' : undefined}/>
            </AppLink> : part === '{home}' ? <strong key={i}>{lang === 'fa' ? 'خانه دیجیتال' : 'digital home'}</strong> : part)}</p>
        </div><MotionScene lang={lang}/></div>
        <article className="home-card skills-home-card skills-hero-card" aria-labelledby="skills-hero-title" onFocus={revealSkills}>
          <div className="skills-card-copy"><h2 id="skills-hero-title">{k.cardTitle}</h2><p>{k.cardBody}</p>
            <div className="home-hero-actions"><CardCTA page="solutions" lang={lang} label={k.cardAction}/><CardCTA page="contact" lang={lang} label={s.contactAction}/></div>
          </div>
          <div className="skills-card-side"><div className="skills-capability-grid">
            {k.pillars.map(pillar => {
              const id = pillar.page as SolutionId, portal = legacy.portals[lang][id];
              return <AppLink key={id} className={`capability-tile capability-portal--${id}`} href={pageURL(id, lang)}>
                <CapabilityArt kind={id}/>
                <div className="capability-copy"><span className="capability-icon"><Icon name={pillar.icon}/></span>
                  <h3>{portal.title}</h3><p>{portal.text}</p>
                </div><span className="capability-open" aria-hidden="true"><Icon name="arrow"/></span>
              </AppLink>;
            })}
          </div></div>
        </article>
      </section>
      <section className="home-card-deck" aria-label={lang === 'fa' ? 'بلاگ، پروفایل کاری و تماس' : 'Blog, professional profile and contact'}>
        <div className="home-grid">
          <article id="home-blog" className="home-card blog-card home-blog-section" aria-labelledby="home-blog-title">
            <header className="home-blog-header"><h2 id="home-blog-title" className="visually-hidden">{s.blogLabel}</h2><p>{s.blogBody}</p>
              <AppLink className="home-blog-all" href={pageURL('blog', lang)}>{lang === 'fa' ? 'همهٔ نوشته‌ها' : 'All posts'}<Icon name="arrow"/></AppLink>
            </header><HomeCarousel key={lang} lang={lang}/>
          </article>
          <section className="home-quick-links" aria-label={lang === 'fa' ? 'مسیر کاری و ارتباط' : 'Work & conversation'}>
            <article className="home-card cv-card">
              <div className="card-top"><span className="card-icon"><Icon name="cv"/></span><span className="card-label">CV / {s.cvLabel}</span></div>
              <h2>{s.cvTitle}</h2><p>{s.cvBody} <AppLink className="home-story-link" href={pageURL('work-stories', lang)}>{lang === 'fa' ? 'روایت‌های کاری من' : 'Stories from my work'}</AppLink></p>
              <CardCTA page="cv" lang={lang} label={s.cvAction}/>
            </article>
            <article className="home-card contact-home-card">
              <div className="card-top"><span className="card-icon"><Icon name="contact"/></span><span className="card-label">{s.contactLabel}</span></div>
              <h2>{s.contactTitle}</h2><p>{s.contactBody}</p><CardCTA page="contact" lang={lang} label={s.contactAction}/>
            </article>
          </section>
        </div>
      </section>
    </div>
    <div className="page-signoff"><BrandMark/><p>© {legacy.year} {s.copyright}</p></div>
  </>;
}
