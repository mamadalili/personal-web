import {renderPostCover} from './blog-covers.mjs';
import {escapeHTML as esc, publishedPosts} from './blog-core.mjs';

export function homePostPages(items, pageSize=6) {
  if(!Number.isInteger(pageSize)||pageSize<1||pageSize>6)throw new RangeError('Home carousel pages contain one to six articles.');
  const live = publishedPosts(items).filter(post => typeof post.slug === 'string' && post.slug && post.fa?.title && post.en?.title);
  const pages = [];
  for (let index = 0; index < live.length; index += pageSize) pages.push(live.slice(index, index + pageSize));
  return pages;
}

export const copy = {
  fa: { region: 'آخرین نوشته‌های بلاگ', carousel: 'کاروسل', previous: 'نوشته‌های جدیدتر', next: 'نوشته‌های قدیمی‌تر',
    read: 'خواندن مقاله', hint: 'کشیدن، اسکرول افقی یا دکمه‌ها', latest: 'تازه‌ترین نوشته‌ها', empty: 'نوشته‌های منتشرشده از اینجا در دسترس خواهند بود.',
    swipeHint: 'برای دیدن نوشته‌های دیگر، به چپ یا راست بکشید. با کیبورد از کلیدهای چپ و راست استفاده کنید.',
    item: (index, total) => `نوشتهٔ ${index} از ${total}`,
    page: (index, total) => `مجموعهٔ ${index} از ${total} نوشته‌ها` },
  en: { region: 'Latest blog posts', carousel: 'carousel', previous: 'Newer posts', next: 'Older posts',
    read: 'Read article', hint: 'Swipe, scroll sideways or use the arrows', latest: 'Latest posts', empty: 'Published articles will appear here.',
    swipeHint: 'Swipe left or right to browse posts. With a keyboard, use the left and right arrow keys.',
    item: (index, total) => `Post ${index} of ${total}`,
    page: (index, total) => `Post group ${index} of ${total}` }
};

export function cardMarkup(post, lang, dates) {
  const a=post[lang], href='article.html?post='+encodeURIComponent(post.slug)+'&lang='+lang;
  const day=post.date && new Date(post.date+'T12:00:00Z');
  const date=day && Number.isFinite(day.getTime()) ? `<time datetime="${esc(post.date)}">${dates.format(day)}</time>` : '';
  return `<a class="home-post-card ${post.cover?'has-cover':''}" href="${esc(href)}">${renderPostCover(post,lang,{className:'home-post-cover',preview:true})}<div class="home-post-meta"><span>${esc(a.category || '')}</span>${date}</div><h4>${esc(a.title)}</h4>${a.excerpt ? `<p>${esc(a.excerpt)}</p>` : ''}<span class="home-post-foot"><small>${esc(a.readTime || '')}</small><span class="home-post-read">${copy[lang].read}<span aria-hidden="true">${lang==='fa'?'←':'→'}</span></span></span></a>`;
}

export function homeFirstPosts(language, items) {
  const first=homePostPages(items)[0];
  if (!first) return `<p class="home-blog-empty">${copy[language].empty}</p>`;
  const dates=new Intl.DateTimeFormat(language,{dateStyle:'medium',timeZone:'UTC'});
  return `<div class="home-blog-track home-first-track"><div class="home-blog-page home-first-posts">${first.map(post=>cardMarkup(post,language,dates)).join('')}</div></div>`;
}
