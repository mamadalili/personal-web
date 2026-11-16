import {useEffect} from 'react';
import {watchSectionEntrances} from '../../../src/portfolio/section-entrances.mjs';

export function usePageMotion() {
  useEffect(()=>{
    const update=()=>document.documentElement.classList.toggle('motion-paused',document.hidden);
    update();
    const stopEntrances = watchSectionEntrances(document.getElementById('main'));
    document.addEventListener('visibilitychange',update);
    return ()=>{
      stopEntrances();
      document.removeEventListener('visibilitychange',update);
      document.documentElement.classList.remove('motion-paused');
    };
  },[]);
}
