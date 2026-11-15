import {legacy} from '../../content/legacy';
import {pageURL} from '../../lib/routing';
import type {Language, SolutionId} from '../../lib/routing';
import {AppLink} from './AppLink';
import {CapabilityArt} from './DecorativeArt';
import {Icon} from './Icon';

export function CapabilityCards({lang, current, className = ''}: {lang: Language; current?: SolutionId; className?: string}) {
  return <nav className={`solutions-subnav solution-portals ${className}`.trim()} aria-label={legacy.solutionsCopy[lang].label}>
    {legacy.solutions.map(item => {
      const id = item.id as SolutionId, portal = legacy.portals[lang][id];
      return <AppLink key={id} className={`capability-portal capability-portal--${id}`} href={pageURL(id, lang)} aria-current={id === current ? 'page' : undefined}>
        <CapabilityArt kind={id}/>
        {id === current && <span className="capability-current">{lang === 'fa' ? 'در این صفحه' : 'Current page'}</span>}
        <span className="capability-copy"><span className="capability-icon" aria-hidden="true"><Icon name={item.icon}/></span>
          <span className="capability-title">{portal.title}</span><span className="capability-description">{portal.text}</span>
        </span><span className="capability-open" aria-hidden="true"><Icon name="arrow" className="cta-direction"/></span>
      </AppLink>;
    })}
  </nav>;
}
