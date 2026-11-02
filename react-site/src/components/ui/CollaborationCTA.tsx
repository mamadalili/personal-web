import {legacy} from '../../content/legacy';
import {pageURL} from '../../lib/routing';
import type {Language} from '../../lib/routing';
import {AppLink} from './AppLink';
import {Icon} from './Icon';

export function CollaborationCTA({lang}: {lang: Language}) {
  const c = legacy.collaboration[lang];
  const experience = pageURL('cv', lang, {tab: 'experience'});
  return <section className="collaboration-cta" aria-labelledby="collaboration-title">
    <div className="collaboration-copy">
      <div className="collaboration-eyebrow">{c.eyebrow}</div>
      <h2 id="collaboration-title"><span>{c.title}</span> <em>{c.accent}</em></h2>
      <p>{c.body}</p>
      <div className="collaboration-prepare"><span>{c.prepare}</span>
        <ul>{c.prompts.map(prompt => <li key={prompt}>{prompt}</li>)}</ul>
      </div>
      <p className="collaboration-background">{c.background} <AppLink href={experience}>{c.backgroundLink}</AppLink></p>
    </div>
    <div className="collaboration-actions">
      <p className="collaboration-action-label">{c.actionLabel}</p>
      <AppLink className="collaboration-primary" href={pageURL('contact', lang)}>
        <span>{c.action}</span><span className="collaboration-arrow"><Icon name="arrow"/></span>
      </AppLink>
      <p className="collaboration-action-note">{c.note}</p>
      <AppLink className="collaboration-secondary" href={experience}><span>{c.experience}</span><Icon name="arrow"/></AppLink>
    </div>
  </section>;
}
