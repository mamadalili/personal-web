const revisions = new Map([
  ['boomerang-online-sales', 'v2'],
  ['boomerang-four-languages', 'v2'],
  ['boomerang-content', 'v2'],
  ['boomerang-channels', 'v2'],
  ['boomerang-logistics', 'v2'],
  ['boomerang-ai-operations', 'v2'],
  ['turbin-marketplaces', 'v2'],
  ['turbin-launch', 'v2'],
  ['turbin-warehouse', 'v2'],
  ['turbin-ai', 'v2'],
  ['turbin-migration', 'v2'],
  ['can-exhibitions', 'v2'],
  ['can-sales-network', 'v2'],
  ['can-partnerships', 'v2'],
]);

export function workStoryCoverSrc(slug, language, preview = false) {
  const revision = revisions.get(slug);
  const filename = [slug, language, revision].filter(Boolean).join('-');
  return (preview ? 'assets/blog/previews/' : 'assets/blog/') + filename + '.webp';
}
