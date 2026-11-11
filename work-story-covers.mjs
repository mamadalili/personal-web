const revisions = new Map([
  ['boomerang-online-sales', 'v2'],
  ['boomerang-four-languages', 'v2'],
  ['boomerang-content', 'v2'],
]);

export function workStoryCoverSrc(slug, language, preview = false) {
  const revision = revisions.get(slug);
  const filename = [slug, language, revision].filter(Boolean).join('-');
  return (preview ? 'assets/blog/previews/' : 'assets/blog/') + filename + '.webp';
}
