import {legacy} from '../../content/legacy';
import {pageURL} from '../../lib/routing';
import type {Language, Page, SolutionId} from '../../lib/routing';
import {AppLink} from '../../components/ui/AppLink';
import {CollaborationCTA} from '../../components/ui/CollaborationCTA';
import {CapabilityArt, MotionScene} from '../../components/ui/DecorativeArt';
import {Icon} from '../../components/ui/Icon';

function CTA({page, label, lang}: {page: Page; label: string; lang: Language}) {
  return <AppLink className="solution-cta" href={pageURL(page, lang)}>{label}<Icon name="arrow" className="cta-direction"/></AppLink>;
}

export function SolutionsPage({lang, id}: {lang: Language; id: SolutionId}) {
  const current = legacy.solutions.find(item => item.id === id)!;
  const c = current[lang], t = legacy.solutionsCopy[lang];
  return <>
    <header className="solutions-selector"><span className="eyebrow">{t.label}</span>
      <nav className="solutions-subnav solution-portals" aria-label={t.label}>{legacy.solutions.map(item => {
        const kind = item.id as SolutionId, portal = legacy.portals[lang][kind];
        return <AppLink key={kind} className={`capability-portal capability-portal--${kind}`} href={pageURL(kind, lang)} aria-current={kind === id ? 'page' : undefined}>
          <CapabilityArt kind={kind}/>
          {kind === id && <span className="capability-current">{lang === 'fa' ? 'در این صفحه' : 'Current page'}</span>}
          <span className="capability-copy"><span className="capability-icon" aria-hidden="true"><Icon name={item.icon}/></span>
            <span className="capability-title">{portal.title}</span><span className="capability-description">{portal.text}</span>
          </span><span className="capability-open" aria-hidden="true"><Icon name="arrow" className="cta-direction"/></span>
        </AppLink>;
      })}</nav>
    </header>
    <nav className="solution-breadcrumb" aria-label={lang === 'fa' ? 'مسیر صفحه' : 'Breadcrumb'}>
      <span>{t.label}</span><span aria-hidden="true">/</span><span aria-current="page">{c.label}</span>
    </nav>
    <section className="solution-detail-hero">
      <div className="page-hero"><div className="eyebrow">{c.label}</div><h1>{c.headline[0]}<br/><em>{c.headline[1]}</em></h1>
        <p>{c.intro}</p><CTA page="contact" label={t.conversation} lang={lang}/>
      </div>
      <aside className="solution-lens"><MotionScene lang={lang} solution={id}/><span className="small-label">{t.lens}</span>
        <h2>{c.lensTitle}</h2><p>{c.lensText}</p><ul className="solution-tags">{c.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      </aside>
    </section>
    <section className="solution-fit" aria-labelledby="fit-heading"><h2 id="fit-heading">{t.fit}</h2><ul>{c.fit.map(text => <li key={text}>{text}</li>)}</ul></section>
    <section className="solution-output-section" aria-labelledby="outputs-heading">
      <div className="home-section-heading"><h2 id="outputs-heading">{t.outputs}</h2></div>
      <div className="solution-outputs">{c.outputs.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>
    <section className="solution-process" aria-labelledby="process-heading"><h2 id="process-heading">{t.process}</h2>
      <div>{c.process.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>
    {current.evidence.length > 0 && <section className="solution-evidence" aria-labelledby="evidence-heading">
      <h2 id="evidence-heading">{t.evidence}</h2><div>{current.evidence.map(item => {
        const params: Record<string, string> = {};
        for (const [key, value] of Object.entries(item.params)) if (typeof value === 'string') params[key] = value;
        return <AppLink key={item.target + JSON.stringify(params)} href={pageURL(item.target as Page, lang, params)}>
          {item[lang]}<Icon name="arrow" className="cta-direction"/>
        </AppLink>;
      })}</div>
    </section>}
    <section className="solution-faq" aria-labelledby="questions-heading"><h2 id="questions-heading">{t.questions}</h2>
      {c.faq.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}
    </section>
    <section className="solution-related" aria-labelledby="related-heading">
      <div className="home-section-heading"><h2 id="related-heading">{t.others}</h2></div>
      <div className="solutions-grid">{legacy.solutions.filter(item => item.id !== id).map(item =>
        <article key={item.id} className="solution-card"><span className="solution-icon"><Icon name={item.icon}/></span>
          <h3><AppLink href={pageURL(item.id as SolutionId, lang)}>{item[lang].label}</AppLink></h3><p>{item[lang].summary}</p>
          <ul className="solution-tags">{item[lang].tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          <CTA page={item.id as SolutionId} label={t.explore} lang={lang}/>
        </article>)}</div>
    </section>
    <CollaborationCTA lang={lang}/>
  </>;
}
