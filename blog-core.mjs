// Pure content/link/calculation helpers, shared by the renderer and Node tests.
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

export function publishedPosts(posts) {
  return posts.filter(post => post.status === 'published' && !post.template).slice().sort((a,b) => (b.date || '').localeCompare(a.date || ''));
}

export function internalHref(target, language, posts = [], base = 'https://example.invalid/') {
  const pages = {home:'index.html',blog:'blog.html',cv:'profile.html','cv:projects':'profile.html?tab=projects',contact:'contact.html',template:'blog-template.html'};
  let path = Object.hasOwn(pages,target) ? pages[target] : null;
  if (target.startsWith('post:')) {
    const slug = target.slice(5);
    if (publishedPosts(posts).some(post => post.slug === slug)) path = `article.html?post=${encodeURIComponent(slug)}`;
  }
  if (!path) return null;
  const url = new URL(path,base);
  url.searchParams.set('lang',language === 'en' ? 'en' : 'fa');
  return url.href;
}

export function safeHref(href, language = 'fa', posts = [], base = 'https://example.invalid/') {
  const value = String(href ?? '').trim();
  if (value.startsWith('@')) return internalHref(value.slice(1),language,posts,base);
  if (/^#[a-zA-Z][\w-]*$/.test(value)) return value;
  if (!/^https?:\/\//i.test(value)) return null;
  try {
    const url = new URL(value);
    return ['https:','http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function chartValues(series, metric) {
  const values = series.values || {};
  if (metric.denominator) {
    return (values[metric.denominator] || []).map((denominator,index) => {
      const numerator = values[metric.numerator]?.[index];
      return Number.isFinite(denominator) && denominator > 0 && Number.isFinite(numerator) ? numerator / denominator * (metric.multiplier ?? 1) : null;
    });
  }
  return (values[metric.key] || []).map(value => Number.isFinite(value) ? value : null);
}

export function estimateOrders(visits, rate) {
  if (String(visits).trim() === '' || String(rate).trim() === '') return null;
  const traffic = Number(visits), percentage = Number(rate);
  if (!Number.isFinite(traffic) || !Number.isFinite(percentage) || traffic < 0 || traffic > 1000000 || percentage < 0 || percentage > 100) return null;
  return Math.round(traffic * percentage / 100);
}
