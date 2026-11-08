import {useEffect, useRef} from 'react';
import type {Language} from '../../lib/routing';
import {renderHomeAtmosphere, mountHomeAtmosphere} from '../../../../home-atmosphere.mjs';

export function HomeAtmosphere({lang}: {lang: Language}) {
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => mountHomeAtmosphere(root.current, {button: button.current, language: lang}), [lang]);
  return <>
    <div ref={root} className="home-atmosphere is-paused" aria-hidden="true" dangerouslySetInnerHTML={{__html: renderHomeAtmosphere()}}/>
    <button ref={button} className="home-atmosphere-control" type="button" aria-pressed="false" aria-label={lang === 'fa' ? 'توقف حرکت پس‌زمینه' : 'Pause background motion'}>
      <span aria-hidden="true"/>
    </button>
  </>;
}
