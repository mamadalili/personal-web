import {publishedPosts} from './blog-core.mjs';
import {coverFor} from './blog-covers.mjs';

const summary = (text, includeSubtitle) => ({
  title:text.title||'', ...(includeSubtitle && text.subtitle ? {subtitle:text.subtitle} : {}),
  excerpt:text.excerpt||'', category:text.category||'', readTime:text.readTime||'',
});

export function postSummaries(items, {includeSubtitle = false} = {}) {
  return publishedPosts(items).filter(post => post.fa && post.en).map(post => ({
    slug: post.slug, date: post.date, status: 'published',
    cover: {fa: coverFor(post, 'fa'), en: coverFor(post, 'en')},
    fa:summary(post.fa,includeSubtitle),en:summary(post.en,includeSubtitle),
  }));
}
