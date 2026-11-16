import {siteContent} from '../../content/site.mjs';
import {useEffect, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {renderSolutionLab} from '../../../../public/solution-lab.mjs';
import {connectFolderPanel} from '../../../../public/solution-folder-tabs.mjs';
import {pageURL} from '../../lib/routing';
import type {Language, Page, SolutionId} from '../../lib/routing';
import {AppLink} from '../../components/ui/AppLink';
import {CollaborationCTA} from '../../components/ui/CollaborationCTA';
import {MotionScene} from '../../components/ui/DecorativeArt';
import {HomeFolders} from '../../components/ui/HomeFolders';
import {Icon} from '../../components/ui/Icon';

function CTA({page, label, lang}: {page: Page; label: string; lang: Language}) {
  return <AppLink className="solution-cta" href={pageURL(page, lang)}>{label}<Icon name="arrow" className="cta-direction"/></AppLink>;
}

export function SolutionsPage({lang, id}: {lang: Language; id: SolutionId}) {
  const current = siteContent.solutions.find(item => item.id === id)!;
  const c = current[lang], t = siteContent.solutionsCopy[lang];
  const workspace = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {state} = useLocation();
  useEffect(() => {
    const root = workspace.current;
    if (!root) return;
    const disconnect = connectFolderPanel(root, (tab: HTMLAnchorElement) => {
      void navigate(tab.pathname + tab.search, {preventScrollReset:true,state:{fromFolder:true}});
    });
    if (state?.fromFolder) root.querySelector<HTMLAnchorElement>('[role="tab"][aria-selected="true"]')?.focus({preventScroll:true});
    return disconnect;
  }, [id, lang, navigate, state]);
  return <>
    <div className="solution-workspace" ref={workspace}><header className="solutions-selector">
      <HomeFolders lang={lang} current={id}/>
    </header>
    <section className="solution-sheet" id="solution-panel" aria-labelledby="solution-title">
      <div className="solution-sheet-head">
        <h1 id="solution-title">{c.headline[0]}<br/><em>{c.headline[1]}</em></h1>
        <img className="solution-print" src="/assets/brand/studio-hand-small.webp" width="680" height="453" alt=""/>
        {current.story && <AppLink className="solution-story-link" href={pageURL('article', lang, {post: current.story.post})}>{current.story[lang]}</AppLink>}
      </div>
      <div dangerouslySetInnerHTML={{__html:renderSolutionLab(id,lang)}}/>
    </section></div>
    <details className="solution-notes"><summary>{lang==='fa'?'جزئیات، خروجی‌ها و مراحل کار':'Details, deliverables and process'}</summary>
      <div className="solution-notes-intro"><p>{c.intro}</p><CTA page="contact" label={t.conversation} lang={lang}/></div>
      <aside className="solution-lens" aria-labelledby="solution-lens-title"><MotionScene lang={lang} solution={id}/>
        <div className="solution-lens-copy"><span className="small-label">{t.lens}</span>
          <h2 id="solution-lens-title">{c.lensTitle}</h2><p>{c.lensText}</p><ul className="solution-tags">{c.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </aside>
    <section className="solution-fit" aria-labelledby="fit-heading"><h2 id="fit-heading">{t.fit}</h2><ul>{c.fit.map(text => <li key={text}>{text}</li>)}</ul></section>
    <section className="solution-output-section" aria-labelledby="outputs-heading">
      <div className="home-section-heading"><h2 id="outputs-heading">{t.outputs}</h2></div>
      <div className="solution-outputs">{c.outputs.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>
    <section className="solution-process" aria-labelledby="process-heading"><h2 id="process-heading">{t.process}</h2>
      <div>{c.process.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>
    </details>
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
      <div className="solutions-grid">{siteContent.solutions.filter(item => item.id !== id).map(item =>
        <article key={item.id} className="solution-card"><span className="solution-icon"><Icon name={item.icon}/></span>
          <h3><AppLink href={pageURL(item.id as SolutionId, lang)}>{item[lang].label}</AppLink></h3><p>{item[lang].summary}</p>
          <ul className="solution-tags">{item[lang].tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          <CTA page={item.id as SolutionId} label={t.explore} lang={lang}/>
        </article>)}</div>
    </section>
    <CollaborationCTA lang={lang}/>
  </>;
}
