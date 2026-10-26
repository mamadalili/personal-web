import { renderPostCover } from './blog-covers.mjs';
import { posts } from './blog-data.mjs';
import { escapeHTML as esc, internalHref, publishedPosts } from './blog-core.mjs';

export function homePostPages(items, pageSize=6) {
  if(!Number.isInteger(pageSize)||pageSize<1||pageSize>6)throw new RangeError('Home carousel pages contain one to six articles.');
  const live = publishedPosts(items).filter(post => typeof post.slug === 'string' && post.slug && post.fa?.title && post.en?.title);
  const pages = [];
  for (let index = 0; index < live.length; index += pageSize) pages.push(live.slice(index, index + pageSize));
  return pages;
}

export function createWheelPager() {
  let total = 0, lastTime = -Infinity, lockedUntil = 0;
  const native = () => { total = 0; return { consume: false, page: null }; };
  return ({ page, pageCount, deltaX = 0, deltaY = 0, deltaMode = 0, viewportHeight = 400, time,
    ctrlKey = false, metaKey = false, shiftKey = false, altKey = false }) => {
    if (![page, pageCount, deltaX, deltaY, time].every(Number.isFinite) || !Number.isInteger(page) || !Number.isInteger(pageCount) || page < 0 || page >= pageCount) return native();
    if (ctrlKey || metaKey || shiftKey || altKey || pageCount < 2 || Math.abs(deltaY) <= Math.abs(deltaX)) return native();
    const direction = Math.sign(deltaY);
    if (!direction || (direction < 0 && page === 0) || (direction > 0 && page === pageCount - 1)) return native();
    if (time < lockedUntil) return { consume: true, page: null };
    if (time - lastTime > 180 || Math.sign(total) !== direction) total = 0;
    const factor = deltaMode === 1 ? 16 : deltaMode === 2 ? Math.max(1, viewportHeight) : 1;
    total += deltaY * factor; lastTime = time;
    if (Math.abs(total) < 70) return { consume: true, page: null };
    total = 0; lockedUntil = time + 500;
    return { consume: true, page: page + direction };
  };
}

export function wheelPageVisible({top,bottom,viewportHeight,topInset=110,bottomInset=16}){
  return [top,bottom,viewportHeight,topInset,bottomInset].every(Number.isFinite)&&bottom>top&&top>=topInset&&bottom<=viewportHeight-bottomInset;
}

const copy = {
  fa: { region: 'آخرین نوشته‌های بلاگ', carousel: 'کاروسل', previous: 'نوشته‌های جدیدتر', next: 'نوشته‌های قدیمی‌تر',
    read: 'خواندن مقاله', hint: 'کشیدن، اسکرول افقی یا دکمه‌ها', latest: 'تازه‌ترین نوشته‌ها', empty: 'نوشته‌های منتشرشده از اینجا در دسترس خواهند بود.',
    page: (index, total) => `مجموعهٔ ${index} از ${total} نوشته‌ها` },
  en: { region: 'Latest blog posts', carousel: 'carousel', previous: 'Newer posts', next: 'Older posts',
    read: 'Read article', hint: 'Swipe, scroll sideways or use the arrows', latest: 'Latest posts', empty: 'Published articles will appear here.',
    page: (index, total) => `Post group ${index} of ${total}` }
};
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
    dispose=mountHomeCarousel(root,{language,items,pageSize:wide.matches?6:medium.matches?4:2,restoreHref,focusKind});
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
  const trackId = `home-blog-track-${++carouselSerial}`;
  const date = value => {
    if (!value) return '';
    const parsed = new Date(`${value}T12:00:00Z`);
    return Number.isNaN(parsed.getTime()) ? '' : `<time datetime="${esc(value)}">${new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }).format(parsed)}</time>`;
  };
  root.classList.add('home-blog-mount');
  root.innerHTML = `<div class="home-blog-track" id="${trackId}" tabindex="0" role="region" aria-label="${t.region}" aria-roledescription="${t.carousel}">${pages.map((page, index) => `<div class="home-blog-page" role="group" aria-label="${t.page(number(index + 1), number(pages.length))}">${page.map(post => {
    const a = post[lang], href = internalHref(`post:${post.slug}`, lang, items, location.href);
    return `<a class="home-post-card ${post.cover?'has-cover':''}" href="${esc(href)}">${renderPostCover(post,lang,{className:'home-post-cover'})}<div class="home-post-meta"><span>${esc(a.category || '')}</span>${date(post.date)}</div><h4>${esc(a.title)}</h4>${a.excerpt ? `<p>${esc(a.excerpt)}</p>` : ''}<span class="home-post-foot"><small>${esc(a.readTime || '')}</small><span class="home-post-read">${t.read}<span aria-hidden="true">${lang==='fa'?'←':'→'}</span></span></span></a>`;
  }).join('')}</div>`).join('')}</div><div class="home-blog-controls"><span class="home-blog-hint">${pages.length > 1 ? t.hint : t.latest}</span><span class="home-blog-position" aria-hidden="true"><i style="inline-size:${100 / pages.length}%"></i></span><div class="home-blog-buttons"><button type="button" data-home-step="-1" aria-controls="${trackId}" aria-label="${t.previous}">${arrow('previous')}</button><button type="button" data-home-step="1" aria-controls="${trackId}" aria-label="${t.next}">${arrow('next')}</button></div></div><p class="home-blog-status" role="status" aria-live="polite" aria-atomic="true"></p>`;
  const track = root.querySelector('.home-blog-track'), panels = [...track.children];
  const previous = root.querySelector('[data-home-step="-1"]'), next = root.querySelector('[data-home-step="1"]');
  let wheel = createWheelPager();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, scrollTimer = 0, width = track.clientWidth;
  function sizeActivePage(){
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
    previous.disabled = index === 0; next.disabled = index === pages.length - 1;
    sizeActivePage();
    root.querySelector('.home-blog-position i').style.transform = `translateX(${index * 100 * (lang === 'fa' ? -1 : 1)}%)`;
    if (changed && announce) root.querySelector('.home-blog-status').textContent = t.page(number(index + 1), number(pages.length));
  }
  function goTo(page, smooth = true) {
    const target = Math.max(0, Math.min(pages.length - 1, page));
    select(target, smooth);
    const outer = track.getBoundingClientRect(), inner = panels[target].getBoundingClientRect();
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
  if (pages.length > 1) track.addEventListener('wheel', event => {
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
      const offsets = panels.map(panel => { const inner = panel.getBoundingClientRect(); return Math.abs(lang === 'fa' ? inner.right - outer.right : inner.left - outer.left); });
      select(offsets.indexOf(Math.min(...offsets)), true);
    }, 160);
  }, { passive: true, signal });
  const observer = new ResizeObserver(() => {
    if (signal.aborted || !root.isConnected) return;
    if(width!==track.clientWidth){width=track.clientWidth;goTo(index,false);}
    else sizeActivePage();
  });
  observer.observe(track);
  panels.forEach(panel=>observer.observe(panel));
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
