import {publishedPosts} from './blog-core.mjs';
import {coverFor} from './blog-covers.mjs';

export function postSummaries(items) {
  return publishedPosts(items).filter(post => post.fa && post.en).map(post => ({
    slug: post.slug, date: post.date, status: 'published',
    cover: {fa: coverFor(post, 'fa'), en: coverFor(post, 'en')},
    ...Object.fromEntries(['fa', 'en'].map(lang => [lang,
      Object.fromEntries(['title', 'excerpt', 'category', 'readTime'].map(key => [key, post[lang][key] || '']))
    ])),
  }));
}
