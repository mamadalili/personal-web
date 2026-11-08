const sparks=Array.from({length:12},(_,i)=>({x:5+(i*31)%90,y:9+(i*19)%76,delay:-(i*1.7),duration:7+(i%4)*2}));
export function renderHomeAtmosphere(){
 return '<span class="home-atmosphere-surface"></span><span class="home-atmosphere-beam home-atmosphere-beam--one"></span><span class="home-atmosphere-beam home-atmosphere-beam--two"></span><svg class="home-atmosphere-paths" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none"><path class="home-atmosphere-orbit" d="M-60 470C150 65 980 70 1270 420"/><path class="home-atmosphere-orbit home-atmosphere-orbit--second" d="M-60 170C240 610 930 610 1260 190"/><path class="home-atmosphere-trace" d="M-60 470C150 65 980 70 1270 420"/></svg>'+sparks.map((s,i)=>'<span class="home-atmosphere-spark'+(i%3===0?' home-atmosphere-spark--glint':'')+'" style="left:'+s.x+'%;top:'+s.y+'%;--spark-delay:'+s.delay+'s;--spark-duration:'+s.duration+'s"></span>').join('');
}

/** Decorative motion has no effect on navigation, page scrolling or content. */
export function mountHomeAtmosphere(root,{button,language='fa'}){
 if(!root||!button)return()=>{};
 if(!root.innerHTML)root.innerHTML=renderHomeAtmosphere();
 const controller=new AbortController();
 const resize=()=>{
  const width=document.documentElement?.clientWidth;
  if(width)root.style.setProperty('--home-viewport-width',width+'px');
 };
 resize();
 if(typeof window!=='undefined')window.addEventListener('resize',resize,{signal:controller.signal});

 let visible=false,paused=false;
 const labels=language==='fa'?['توقف حرکت پس‌زمینه','پخش حرکت پس‌زمینه']:['Pause background motion','Play background motion'];
 const sync=()=>{
  root.classList.toggle('is-paused',paused||!visible||document.hidden);
  button.setAttribute('aria-pressed',String(paused));
  button.setAttribute('aria-label',labels[paused?1:0]);
  button.title=labels[paused?1:0];
 };
 button.addEventListener('click',()=>{paused=!paused;sync();},{signal:controller.signal});
 document.addEventListener('visibilitychange',sync,{signal:controller.signal});
 const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);sync();});
 if(observer)observer.observe(root.closest('.home-art-hero')||root);
 else button.hidden=true;
 sync();
 return()=>{observer?.disconnect();controller.abort();root.classList.add('is-paused');};
}
