import { posts } from './blog-data.mjs';
import { escapeHTML as esc, publishedPosts, internalHref } from './blog-core.mjs';

export function mountHomeBlog(root, { language = 'fa' } = {}) {
  const lang = language === 'en' ? 'en' : 'fa';
  const t = lang === 'fa'
    ? { label:'نوشته‌های تازه', previous:'مقالهٔ قبلی', next:'مقالهٔ بعدی', read:'خواندن و تجربه', empty:'هنوز نوشته‌ای منتشر نشده.' }
    : { label:'Latest stories', previous:'Previous article', next:'Next article', read:'Read & explore', empty:'No articles published yet.' };
  const live = publishedPosts(posts);
  root.removeAttribute('aria-busy');
  if (!live.length) { root.innerHTML = `<p>${t.empty}</p>`; return; }
  root.innerHTML = `<section class="home-stories" role="region" aria-roledescription="${lang === 'fa' ? 'کاروسل' : 'carousel'}" aria-label="${t.label}">
    <div class="home-stories-track" tabindex="0" aria-label="${t.label}">${live.map(post => {
      const c = post[lang];
      return `<a class="home-story" href="${esc(internalHref(`post:${post.slug}`,lang,posts,location.href))}"><div class="home-story-meta"><span>${esc(c.category)}</span><span class="home-story-symbol" aria-hidden="true">✦</span></div><h4>${esc(c.title)}</h4><p>${esc(c.excerpt)}</p><div class="home-story-bottom"><span>${esc(c.readTime || '')}</span><strong>${t.read} <span aria-hidden="true">↗</span></strong></div></a>`;
    }).join('')}</div>
    <div class="home-stories-controls" ${live.length < 2 ? 'hidden' : ''}><span class="home-stories-caption">${t.label}</span><div class="home-stories-dots">${live.map((post,i)=>`<button type="button" data-story="${i}" aria-label="${esc(post[lang].title)}" aria-pressed="${i === 0}"></button>`).join('')}</div><div class="home-stories-arrows"><button type="button" data-step="-1" aria-label="${t.previous}">${lang === 'fa' ? '→' : '←'}</button><button type="button" data-step="1" aria-label="${t.next}">${lang === 'fa' ? '←' : '→'}</button></div></div>
  </section>`;
  const track = root.querySelector('.home-stories-track');
  const cards = [...root.querySelectorAll('.home-story')];
  const dots = [...root.querySelectorAll('[data-story]')];
  const previous = root.querySelector('[data-step="-1"]');
  const next = root.querySelector('[data-step="1"]');
  let active = 0;
  const sync = () => {
    const edge = track.getBoundingClientRect();
    const distance = card => Math.abs(lang === 'fa' ? card.getBoundingClientRect().right - edge.right : card.getBoundingClientRect().left - edge.left);
    active = cards.reduce((best,card,i)=>distance(card) < distance(cards[best]) ? i : best,0);
    dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i === active)));
    previous.disabled = active === 0;
    next.disabled = active === cards.length - 1;
  };
  const go = index => {
    const card = cards[Math.max(0,Math.min(cards.length - 1,index))];
    const edge = track.getBoundingClientRect(), target = card.getBoundingClientRect();
    track.scrollBy({left:lang === 'fa' ? target.right - edge.right : target.left - edge.left,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  };
  root.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>go(active + Number(button.dataset.step))));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
  track.addEventListener('scroll',sync,{passive:true});
  track.addEventListener('keydown',event=>{
    if(event.target !== track || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    go(event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 : active + ((event.key === 'ArrowRight') === (lang === 'en') ? 1 : -1));
  });
  sync();
}
