import {siteContent} from '../../content/site.mjs';
import {pageURL} from '../../lib/routing';
import type {Language, SolutionId} from '../../lib/routing';
import {AppLink} from './AppLink';
import {CapabilityArt} from './DecorativeArt';
import {Icon} from './Icon';

export function CapabilityCards({lang, current, className = ''}: {lang: Language; current?: SolutionId; className?: string}) {
  return <nav className={`solutions-subnav solution-portals ${className}`.trim()} aria-label={siteContent.solutionsCopy[lang].label}>
    {siteContent.solutions.map(item => {
      const id = item.id as SolutionId, portal = siteContent.portals[lang][id];
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
