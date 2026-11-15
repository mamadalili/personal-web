import {siteContent} from '../../content/site.mjs';
import type {Language, SolutionId} from '../../lib/routing';

// Generated only from the existing local SVG renderers.
export function CapabilityArt({kind}: {kind: SolutionId}) {
  return <div className="trusted-art" aria-hidden="true"
    dangerouslySetInnerHTML={{__html: siteContent.art.capsules[kind]}}/>;
}

export function MotionScene({lang, solution}: {lang: Language; solution?: SolutionId}) {
  const scene = siteContent.art.scenes[lang];
  return <div className="trusted-art" aria-hidden="true"
    dangerouslySetInnerHTML={{__html: solution ? scene.solutions[solution] : scene.home}}/>;
}
