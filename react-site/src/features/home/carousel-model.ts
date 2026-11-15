export {createWheelPager, wheelPageVisible} from '../../content/generated/carousel-model.mjs';

export function groupPosts<T>(items: readonly T[], size: number): T[][] {
  if (!Number.isInteger(size) || size < 1 || size > 6) throw new RangeError('A carousel group contains one to six posts');
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));
  return groups;
}

export function pageContaining<T extends {slug: string}>(pages: T[][], slug: string) {
  return Math.max(0, pages.findIndex(page => page.some(post => post.slug === slug)));
}
