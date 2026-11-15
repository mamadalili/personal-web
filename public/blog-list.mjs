import {attachArchiveFilters} from './archive-controls.mjs';

let controller, disposeFallback;
export function unmountBlog() {
  controller?.abort();
  disposeFallback?.();
  disposeFallback = undefined;
}

export async function mountBlog(root, {language = 'fa'} = {}) {
  unmountBlog();
  controller = new AbortController();
  const {signal} = controller;
  if (root.dataset.readingLang === language && root.querySelector('[data-library-controls]')) {
    attachArchiveFilters(root, signal);
    return;
  }
  // Older cached pages and client-only entries need the archive renderer.
  const legacy = await import(new URL('./runtime-blog.mjs', import.meta.url).href);
  if (signal.aborted) return;
  disposeFallback = legacy.unmountBlog;
  await legacy.mountBlog(root, {language, mode: 'index'});
}
