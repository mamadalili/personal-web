const sparks=Array.from({length:12},(_,i)=>({x:5+(i*31)%90,y:9+(i*19)%76,delay:-(i*1.7),duration:7+(i%4)*2}));
export function renderHomeAtmosphere(){
 return '<span class="home-atmosphere-surface"></span><span class="home-atmosphere-beam home-atmosphere-beam--one"></span><span class="home-atmosphere-beam home-atmosphere-beam--two"></span><svg class="home-atmosphere-paths" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none"><path class="home-atmosphere-orbit" d="M-60 470C150 65 980 70 1270 420"/><path class="home-atmosphere-orbit home-atmosphere-orbit--second" d="M-60 170C240 610 930 610 1260 190"/><path class="home-atmosphere-trace" d="M-60 470C150 65 980 70 1270 420"/></svg>'+sparks.map((s,i)=>'<span class="home-atmosphere-spark'+(i%3===0?' home-atmosphere-spark--glint':'')+'" style="left:'+s.x+'%;top:'+s.y+'%;--spark-delay:'+s.delay+'s;--spark-duration:'+s.duration+'s"></span>').join('');
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
 const href=new URL('./site-theme.css?v=20261108-vector',import.meta.url).href;
 if(![...doc.querySelectorAll('link[rel="stylesheet"]')].some(link=>link.href===href||link.href.split('?')[0]===href.split('?')[0])){
  const link=doc.createElement('link');link.rel='stylesheet';link.href=href;doc.head.append(link);
 }
 let root=doc.querySelector('.site-atmosphere');
 if(!root){root=doc.createElement('div');root.className='site-atmosphere is-paused';root.setAttribute('aria-hidden','true');doc.body.prepend(root);}
 mounted.set(doc,mountHomeAtmosphere(root));
}
