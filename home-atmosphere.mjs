export function renderHomeAtmosphere(){
 return '<span class="home-atmosphere-surface"></span>';
}

const mounted=new WeakMap();
export function mountHomeAtmosphere(root){
 if(!root)return()=>{};
 if(!root.innerHTML)root.innerHTML=renderHomeAtmosphere();
 const controller=new AbortController();
 let visible=false;
 const sync=()=>{
  root.classList.toggle('is-paused',!visible||document.hidden);
  document.documentElement?.classList?.toggle('motion-paused',document.hidden);
 };
 document.addEventListener('visibilitychange',sync,{signal:controller.signal});
 const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);sync();});
 observer?.observe(root);
 sync();
 return()=>{observer?.disconnect();controller.abort();root.classList.add('is-paused');};
}
export function ensureSiteAtmosphere(doc=document){
 if(mounted.has(doc))return;
 const href=new URL('./site-theme.css?v=20261109-first-light',import.meta.url).href;
 if(![...doc.querySelectorAll('link[rel="stylesheet"]')].some(link=>link.href===href||link.href.split('?')[0]===href.split('?')[0])){
  const link=doc.createElement('link');link.rel='stylesheet';link.href=href;doc.head.append(link);
 }
 let root=doc.querySelector('.site-atmosphere');
 if(!root){root=doc.createElement('div');root.className='site-atmosphere is-paused';root.setAttribute('aria-hidden','true');doc.body.prepend(root);}
 mounted.set(doc,mountHomeAtmosphere(root));
}
