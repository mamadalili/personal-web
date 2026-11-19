// Public deployment base for generated crawl metadata.
export const siteUrl = 'https://mrdalili.ir/';

export function homeHref(language, base = siteUrl) {
  return new URL('./', base).pathname + '?lang=' + (language === 'en' ? 'en' : 'fa');
}

export function homeDocument(language) {
  return language === 'en' ? 'home.en.html' : 'index.html';
}

const localizedEntries = new Set([
  'profile.html', 'blog.html', 'work-stories.html', 'contact.html',
  'strategy.html', 'execution.html', 'technology.html', 'ai-tools.html',
]);

export function localizedEntryFile(file, language) {
  if (!localizedEntries.has(file)) return file;
  const stem = file === 'profile.html' ? 'cv' : file.slice(0, -5);
  return stem + '.' + language + '.html';
}
