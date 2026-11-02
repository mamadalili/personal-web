export type Language = 'fa' | 'en';
export type Page = 'home' | 'solutions' | 'blog' | 'cv' | 'contact';

const legacyFiles = {home:'index.html',solutions:'strategy.html',blog:'blog.html',cv:'profile.html',contact:'contact.html'};
export function languageFromPath(pathname:string):Language {
  return pathname.split('/')[1]==='en'?'en':'fa';
}
export function contactURL(lang:Language) { return `/${lang}/contact`; }
export function pageURL(page:Page,lang:Language) {
  return page==='contact'?contactURL(lang):`/legacy/${legacyFiles[page]}?lang=${lang}`;
}
export function assetURL(path:string) { return `/legacy/${path}`; }
