import {mountBlogIndex} from './blog-index.mjs?v=20261102-light-lists';
import {posts} from './blog-summaries.mjs';
import {internalHref} from './blog-core.mjs';

let dispose = () => {};
export function unmountBlog() { dispose(); dispose = () => {}; }
export function mountBlog(root, {language = 'fa'} = {}) {
  dispose();
  const controller = new AbortController();
  dispose = () => controller.abort();
  const lang = language === 'en' ? 'en' : 'fa';
  root.classList.remove('market-story');
  mountBlogIndex(root, {lang, items: posts, href: target => internalHref(target, lang, posts, location.href), signal: controller.signal});
}
