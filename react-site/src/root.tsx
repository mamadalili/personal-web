import type {ReactNode} from 'react';
import {Links,Meta,Outlet,Scripts,ScrollRestoration,useLocation} from 'react-router';
import {legacy} from './content/legacy';
import {languageFromPath} from './lib/routing';
import {SiteHeader} from './components/layout/SiteHeader';
import {GlassNav} from './components/layout/GlassNav';
import {AmbientField} from './components/layout/AmbientField';
import {usePageMotion} from './hooks/usePageMotion';
import './styles/migration.css';

export function Layout({children}:{children:ReactNode}) {
  const {pathname}=useLocation(),lang=languageFromPath(pathname);
  const identity=legacy.identity[lang];
  return <html lang={lang} dir={lang==='fa'?'rtl':'ltr'}><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/><meta name="theme-color" content="#1c0998"/><title>{`${legacy.navigation[lang].labels[4]} — ${identity.name}`}</title><meta name="description" content={legacy.contact[lang].intro}/><meta name="robots" content="noindex, nofollow"/><link rel="canonical" href={`https://mrdalili.ir/contact.html?lang=${lang}`}/><link rel="icon" href="/legacy/assets/brand/monogram.svg" type="image/svg+xml"/><link rel="stylesheet" href="/legacy/portfolio.css"/><link rel="stylesheet" href="/legacy/contact.css"/><link rel="stylesheet" href="/legacy/company-logos.css"/><Meta/><Links/></head><body data-page="contact" data-current-page="contact"><a href="#main" className="skip">{lang==='fa'?'رفتن به محتوای اصلی':'Skip to content'}</a><AmbientField/><SiteHeader lang={lang}/><main id="main" className="page-layout" tabIndex={-1}>{children}</main><GlassNav lang={lang}/><ScrollRestoration/><Scripts/></body></html>;
}
export default function App() {
  usePageMotion();
  return <Outlet/>;
}
