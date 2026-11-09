export function renderHomeAtmosphere(){
 return '<span class="home-atmosphere-surface"></span>';
}

const mounted=new WeakMap();
export function mountHomeAtmosphere(root){
 if(!root)return()=>{};
 if(!root.innerHTML)root.innerHTML=renderHomeAtmosphere();
 const controller=new AbortController();
 let visible=typeof IntersectionObserver==='undefined';
 const sync=()=>{
  root.classList.toggle('is-paused',!visible||document.hidden);
 };
 document.addEventListener('visibilitychange',sync,{signal:controller.signal});
 const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);sync();});
 observer?.observe(root);
 sync();
 return()=>{observer?.disconnect();controller.abort();root.classList.add('is-paused');};
}
export function ensureSiteAtmosphere(doc = document) {
  let state = mounted.get(doc);
  if (!state) {
    const syncVisibility = () => doc.documentElement.classList.toggle('motion-paused', doc.hidden);
    doc.addEventListener('visibilitychange', syncVisibility);
    syncVisibility();
    state = {root: null, dispose: null};
    mounted.set(doc, state);
  }
  const root = doc.querySelector('.site-atmosphere');
  if (root === state.root) return;
  state.dispose?.();
  state.root = root;
  state.dispose = root ? mountHomeAtmosphere(root) : null;
}
