import {homePostPages} from '../../home-blog.mjs';
import {coverFor} from '../../blog-covers.mjs';

export function homeSummaries(items) {
  return homePostPages(items).flat().map(post => ({
    slug: post.slug, date: post.date, cover: {fa: coverFor(post, 'fa'), en: coverFor(post, 'en')},
    ...Object.fromEntries(['fa', 'en'].map(lang => [lang,
      Object.fromEntries(['title', 'excerpt', 'category', 'readTime'].map(key => [key, post[lang][key] || '']))
    ])),
  }));
}
