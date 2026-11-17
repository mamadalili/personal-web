import { escapeHTML as esc } from './blog-core.mjs';

export function coverFor(post, language) {
  if (!['fa', 'en'].includes(language)) return null;
  const cover = post?.cover?.[language];
  if (!cover || !/^assets\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*\.webp$/.test(cover.src) ||
      typeof cover.alt !== 'string' || !cover.alt.trim() ||
      ![cover.width, cover.height].every(value => Number.isInteger(value) && value > 0 && value <= 8192)) return null;
  return { src: cover.src, alt: cover.alt, width: cover.width, height: cover.height };
}

export function renderPostCover(post, language, { className = 'post-cover-image', eager = false, decorative = true, preview = false, sizes = '' } = {}) {
  const cover = coverFor(post, language);
  if (!cover) return '';
  const small = cover.src.replace('assets/blog/', 'assets/blog/previews/');
  const src = preview ? small : cover.src;
  const responsive = sizes && cover.width > 768
    ? ` srcset="${small} 768w, ${cover.src} ${cover.width}w" sizes="${esc(sizes)}"` : '';
  return `<img class="${esc(className)}" src="${esc(src)}"${responsive} alt="${decorative ? '' : esc(cover.alt)}" width="${cover.width}" height="${cover.height}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>`;
}
