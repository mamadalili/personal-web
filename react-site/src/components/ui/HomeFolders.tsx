import {siteContent} from '../../content/site.mjs';
import {pageURL} from '../../lib/routing';
import type {Language, SolutionId} from '../../lib/routing';
import {AppLink} from './AppLink';

export function HomeFolders({lang, current}: {lang: Language; current?: SolutionId}) {
  return <nav className="skills-capability-grid home-folder-grid" aria-label={siteContent.solutionsCopy[lang].label}>
    {siteContent.solutions.map(item => {
      const id = item.id as SolutionId, portal = siteContent.portals[lang][id];
      return <AppLink key={id} className="home-folder-link" href={pageURL(id, lang)} aria-current={id === current ? 'page' : undefined}>
        <span className="trusted-art" aria-hidden="true" dangerouslySetInnerHTML={{__html: siteContent.art.folders[id]}}/>
        <span className="home-folder-title">{portal.title}</span>
        <span className="home-folder-description">{portal.text}</span>
      </AppLink>;
    })}
  </nav>;
}
