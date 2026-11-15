import {CoastPrint} from '../../src/components/site-chrome.mjs';
import type {ReactNode} from 'react';
import {Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation} from 'react-router';
import {siteContent} from './content/site.mjs';
import {canonicalURL, languageFromPath, routeFromPath} from './lib/routing';
import {SiteHeader} from './components/layout/SiteHeader';
import {GlassNav} from './components/layout/GlassNav';
import {usePageMotion} from './hooks/usePageMotion';
import './styles/migration.css';

export function Layout({children}: {children: ReactNode}) {
  const {pathname} = useLocation(), lang = languageFromPath(pathname);
  const {page, solution} = routeFromPath(pathname);
  const identity = siteContent.identity[lang], s = siteContent.home[lang];
  const detail = siteContent.solutions.find(item => item.id === solution)?.[lang];
  const label = page === 'home' ? s.nav[0] : page === 'solutions' ? s.nav[1] : s.nav[4];
  const title = `${detail ? detail.label + ' — ' : ''}${label} — ${identity.name}`;
  const description = page === 'home'
    ? s.homeIntro.replace('{role}', identity.role).replace('{home}', lang === 'fa' ? 'خانه دیجیتال' : 'digital home')
    : detail?.intro ?? siteContent.contact[lang].intro;
  const styles = ['portfolio.css', 'site-theme.css', ...(page === 'home' ? ['home-blog.css', 'home-hero.css', 'solution-portals.css']
    : page === 'solutions' ? ['solutions.css', 'solution-portals.css'] : ['contact.css', 'company-logos.css'])];
  return <html lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'} data-theme="light" suppressHydrationWarning>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
      <meta name="color-scheme" content="only light" suppressHydrationWarning/>
      <meta name="theme-color" content="#1c0998" suppressHydrationWarning/>
      <script src="/day-night.js?v=20261110-session"/>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="robots" content="noindex, nofollow"/>
      <link rel="canonical" href={canonicalURL(solution ?? page, lang)}/>
      <link rel="icon" href="/assets/brand/monogram.svg" type="image/svg+xml"/>
      {styles.map(file => <link key={file} rel="stylesheet" href={`/${file}`}/>)}
      <Meta/><Links/>
      <link rel="stylesheet" href="/color-mode.css?v=20261110-manual"/>
    </head>
    <body data-page={page} data-current-page={page} data-solution={solution}>
      <a href="#main" className="skip">{lang === 'fa' ? 'رفتن به محتوای اصلی' : 'Skip to content'}</a>
      <SiteHeader lang={lang} page={page} solution={solution}/>
      <main id="main" className={`page-layout${page === 'solutions' ? ' solutions-page' : ''}`} tabIndex={-1}>{children}</main>
      <CoastPrint base="/"/>
      <GlassNav lang={lang} active={page}/>
      <ScrollRestoration/><Scripts/>
    </body>
  </html>;
}
export default function App() {
  usePageMotion();
  return <Outlet/>;
}
