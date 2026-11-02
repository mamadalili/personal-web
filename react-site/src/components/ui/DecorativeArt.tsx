import {legacy} from '../../content/legacy';
import type {Language, SolutionId} from '../../lib/routing';

// Generated only from the existing local SVG renderers.
export function CapabilityArt({kind}: {kind: SolutionId}) {
  return <div className="trusted-art" aria-hidden="true"
    dangerouslySetInnerHTML={{__html: legacy.art.capsules[kind]}}/>;
}

export function MotionScene({lang, solution}: {lang: Language; solution?: SolutionId}) {
  const scene = legacy.art.scenes[lang];
  return <div className="trusted-art" aria-hidden="true"
    dangerouslySetInnerHTML={{__html: solution ? scene.solutions[solution] : scene.home}}/>;
}
