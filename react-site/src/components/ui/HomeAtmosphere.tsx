import {useEffect, useRef} from 'react';
import {renderHomeAtmosphere, mountHomeAtmosphere} from '../../../../home-atmosphere.mjs';

export function HomeAtmosphere() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => mountHomeAtmosphere(root.current), []);
  return <div ref={root} className="site-atmosphere is-paused" aria-hidden="true" dangerouslySetInnerHTML={{__html: renderHomeAtmosphere()}}/>;
}
