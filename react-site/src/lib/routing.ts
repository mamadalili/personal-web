export type Language = 'fa' | 'en';
export type NavPage = 'home' | 'solutions' | 'blog' | 'cv' | 'contact';
export const solutionIds = ['strategy', 'execution', 'technology', 'ai-tools'] as const;
export type SolutionId = typeof solutionIds[number];
export type Page = NavPage | SolutionId | 'article' | 'work-stories';

const legacyFiles = {home:'index.html',solutions:'strategy.html',blog:'blog.html',cv:'profile.html',contact:'contact.html',strategy:'strategy.html',execution:'execution.html',technology:'technology.html','ai-tools':'ai-tools.html',article:'article.html','work-stories':'work-stories.html'};
export function languageFromPath(pathname:string):Language {
  return pathname.split('/')[1]==='en'?'en':'fa';
}
export function contactURL(lang:Language) { return `/${lang}/contact`; }
export function routeFromPath(pathname: string): {page: NavPage; solution?: SolutionId} {
  const [, , section, id] = pathname.split('/');
  if (section === 'contact') return {page: 'contact'};
  if (section === 'solutions') return {page: 'solutions', solution: id as SolutionId};
  return {page: 'home'};
}
export function pageURL(page:Page,lang:Language,params:Record<string,string>={}) {
  if (page === 'home') return `/${lang}`;
  if (page === 'contact') return contactURL(lang);
  if (page === 'solutions') return `/${lang}/solutions/strategy`;
  if (solutionIds.includes(page as SolutionId)) return `/${lang}/solutions/${page}`;
  return `/legacy/${legacyFiles[page]}?${new URLSearchParams({lang,...params})}`;
}
export function canonicalURL(page:Page,lang:Language) {
  return `https://mrdalili.ir/${legacyFiles[page]}?lang=${lang}`;
}
export function assetURL(path:string) { return `/legacy/${path}`; }
