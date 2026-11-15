import {posts} from './blog-summaries.mjs';
import {homePostPages, cardMarkup, copy} from './home-blog-view.mjs';
export {homePostPages, homeFirstPosts} from './home-blog-view.mjs';
import {createWheelPager, wheelPageVisible} from './home-carousel-input.mjs';
export {createWheelPager, wheelPageVisible};

let carouselSerial = 0;
const arrow = direction => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" focusable="false"><path d="${direction === 'previous' ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'}"/></svg>`;

export function mountHomeBlog(root, { language = 'fa', items = posts } = {}) {
  const controller=new AbortController(),wide=matchMedia('(min-width:1000px)'),medium=matchMedia('(min-width:761px)');
  let dispose=()=>{};
  const redraw=()=>{
    const active=document.activeElement,inside=root.contains(active),visible=root.querySelector('.home-blog-page[aria-hidden=false] .home-post-card');
    const focusedCard=inside?active.closest?.('.home-post-card'):null;
    const restoreHref=(focusedCard||visible)?.href;
    const focusKind=!inside?null:focusedCard?'card':active.hasAttribute('data-home-step')?'step:'+active.dataset.homeStep:'track';
    dispose();
    dispose=mountHomeCarousel(root,{language,items,pageSize:wide.matches?6:medium.matches?4:1,restoreHref,focusKind});
  };
  [wide,medium].forEach(media=>media.addEventListener('change',redraw,{signal:controller.signal}));
  redraw();
  return ()=>{controller.abort();dispose();};
}

function mountHomeCarousel(root,{language,items,pageSize,restoreHref,focusKind}){
  const lang = language === 'en' ? 'en' : 'fa', t = copy[lang], pages = homePostPages(items,pageSize);
  const controller = new AbortController(), signal = controller.signal;
  if (!pages.length) { root.innerHTML = `<p class="home-blog-empty">${t.empty}</p>`; return () => controller.abort(); }
  const number = value => new Intl.NumberFormat(lang).format(value);
  const swipeOnly = pageSize === 1;
  const pageLabel = (index, total) => (swipeOnly ? t.item : t.page)(number(index), number(total));
  const trackId = `home-blog-track-${++carouselSerial}`;
  const dates=new Intl.DateTimeFormat(lang,{dateStyle:'medium',timeZone:'UTC'});
  root.classList.add('home-blog-mount');
  root.innerHTML = `<div class="home-blog-track" id="${trackId}" tabindex="0" role="region" aria-label="${t.region}" aria-roledescription="${t.carousel}"${swipeOnly ? ` aria-describedby="${trackId}-hint"` : ''}>${pages.map((page, index) => `<div class="home-blog-page" role="group" aria-label="${pageLabel(index + 1, pages.length)}">${page.map(post=>cardMarkup(post,lang,dates)).join('')}</div>`).join('')}</div>${swipeOnly ? `<p id="${trackId}-hint" class="home-blog-status">${t.swipeHint}</p>` : `<div class="home-blog-controls"><span class="home-blog-hint">${pages.length > 1 ? t.hint : t.latest}</span><span class="home-blog-position" aria-hidden="true"><i style="inline-size:${100 / pages.length}%"></i></span><div class="home-blog-buttons"><button type="button" data-home-step="-1" aria-controls="${trackId}" aria-label="${t.previous}">${arrow('previous')}</button><button type="button" data-home-step="1" aria-controls="${trackId}" aria-label="${t.next}">${arrow('next')}</button></div></div>`}<p class="home-blog-status" role="status" aria-live="polite" aria-atomic="true"></p>`;
  const track = root.querySelector('.home-blog-track'), panels = [...track.children];
  const previous = root.querySelector('[data-home-step="-1"]'), next = root.querySelector('[data-home-step="1"]');
  const progress = root.querySelector('.home-blog-position i');
  const surfaces = panels.map(panel => swipeOnly ? panel.querySelector('.home-post-card') : panel);
  let wheel = createWheelPager();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, scrollTimer = 0, width = track.clientWidth;
  function sizeActivePage(){
    if(swipeOnly){root.style.removeProperty('--home-track-height');return;}
    const height=panels[index]?.scrollHeight;
    if(height>0)root.style.setProperty('--home-track-height',height+'px');
  }
  function select(page, announce = false) {
    const changed = page !== index;
    const focused = document.activeElement;
    index = page;
    panels.forEach((panel, position) => {
      if (position !== index && panel.contains(focused)) track.focus({ preventScroll: true });
      panel.inert = position !== index;
      panel.setAttribute('aria-hidden', String(position !== index));
    });
    if(previous)previous.disabled = index === 0;
    if(next)next.disabled = index === pages.length - 1;
    sizeActivePage();
    if(progress)progress.style.transform = `translateX(${index * 100 * (lang === 'fa' ? -1 : 1)}%)`;
    if (changed && announce) root.querySelector('[role="status"]').textContent = pageLabel(index + 1, pages.length);
  }
  function goTo(page, smooth = true) {
    const target = Math.max(0, Math.min(pages.length - 1, page));
    select(target, smooth);
    const outer = track.getBoundingClientRect(), inner = surfaces[target].getBoundingClientRect();
    const left = lang === 'fa' ? inner.right - outer.right : inner.left - outer.left;
    // An endpoint-only scroll may cross snap-stop:always panels (Home/End
    // and breakpoint restoration); scrollBy can stop at an intervening page.
    track.scrollTo({ left: track.scrollLeft + left, behavior: smooth && !motion.matches ? 'smooth' : 'instant' });
  }
  select(0);
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-home-step]');
    if (button && !button.disabled) goTo(index + Number(button.dataset.homeStep));
  }, { signal });
  track.addEventListener('keydown', event => {
    if (event.target !== track || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    let target;
    if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = pages.length - 1;
    else if (event.key === 'ArrowRight') target = index + (lang === 'fa' ? -1 : 1);
    else if (event.key === 'ArrowLeft') target = index + (lang === 'fa' ? 1 : -1);
    else return;
    event.preventDefault(); goTo(target);
  }, { signal });
  if (pages.length > 1 && !swipeOnly) track.addEventListener('wheel', event => {
    const bounds=track.getBoundingClientRect();
    const phone=innerWidth<=760,navigation=document.getElementById('footer')?.getBoundingClientRect();
    const topInset=phone?16:Math.max(110,(navigation?.bottom||0)+16);
    const bottomInset=phone&&navigation?Math.max(16,innerHeight-navigation.top+16):16;
    if(!wheelPageVisible({top:bounds.top,bottom:bounds.bottom,viewportHeight:innerHeight,topInset,bottomInset})){
      wheel=createWheelPager();return;
    }
    const decision = wheel({ page: index, pageCount: pages.length, deltaX: event.deltaX, deltaY: event.deltaY,
      deltaMode: event.deltaMode, viewportHeight: track.clientHeight, time: performance.now(),
      ctrlKey: event.ctrlKey, metaKey: event.metaKey, shiftKey: event.shiftKey, altKey: event.altKey });
    if (decision.consume) event.preventDefault();
    if (decision.page !== null) goTo(decision.page);
  }, { passive: false, signal });
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (signal.aborted || !root.isConnected) return;
      const outer = track.getBoundingClientRect();
      const offsets = surfaces.map(panel => { const inner = panel.getBoundingClientRect(); return Math.abs(lang === 'fa' ? inner.right - outer.right : inner.left - outer.left); });
      select(offsets.indexOf(Math.min(...offsets)), true);
    }, 160);
  }, { passive: true, signal });
  const observer = new ResizeObserver(() => {
    if (signal.aborted || !root.isConnected) return;
    if(width!==track.clientWidth){width=track.clientWidth;goTo(index,false);}
    else sizeActivePage();
  });
  observer.observe(track);
  surfaces.forEach(panel=>observer.observe(panel));
  if(restoreHref){
    const target=[...root.querySelectorAll('.home-post-card')].find(link=>link.href===restoreHref);
    const page=target?panels.indexOf(target.closest('.home-blog-page')):-1;
    if(page>=0){goTo(page,false);}
    if(focusKind==='card'&&target)target.focus({preventScroll:true});
    else if(focusKind){
      const control=focusKind==='step:-1'?previous:focusKind==='step:1'?next:null;
      (control&&!control.disabled?control:track).focus({preventScroll:true});
    }
  }
  return () => { controller.abort(); observer.disconnect(); clearTimeout(scrollTimer); };
}
