import {useEffect} from 'react';

export function usePageMotion() {
  useEffect(()=>{
    const update=()=>document.documentElement.classList.toggle('motion-paused',document.hidden);
    update();
    document.addEventListener('visibilitychange',update);
    return ()=>{document.removeEventListener('visibilitychange',update);document.documentElement.classList.remove('motion-paused');};
  },[]);
}
