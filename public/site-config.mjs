// Public deployment base for generated crawl metadata.
export const siteUrl = 'https://mrdalili.ir/';

const localizedEntries = new Set([
  'profile.html', 'blog.html', 'work-stories.html', 'contact.html',
  'strategy.html', 'execution.html', 'technology.html', 'ai-tools.html',
]);

export function localizedEntryFile(file, language) {
  return localizedEntries.has(file) ? file.replace(/\.html$/, '.' + language + '.html') : file;
}
