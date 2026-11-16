// Public deployment base for generated crawl metadata.
export const siteUrl = 'https://mrdalili.ir/';

const localizedEntries = new Set([
  'profile.html', 'blog.html', 'work-stories.html', 'contact.html',
  'strategy.html', 'execution.html', 'technology.html', 'ai-tools.html',
]);

export function localizedEntryFile(file, language) {
  if (!localizedEntries.has(file)) return file;
  const stem = file === 'profile.html' ? 'cv' : file.slice(0, -5);
  return stem + '.' + language + '.html';
}
