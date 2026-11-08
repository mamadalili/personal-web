import type {ReactNode} from 'react';
import {Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation} from 'react-router';
import {legacy} from './content/legacy';
import {canonicalURL, languageFromPath, routeFromPath} from './lib/routing';
import {SiteHeader} from './components/layout/SiteHeader';
import {GlassNav} from './components/layout/GlassNav';
import {HomeAtmosphere} from './components/ui/HomeAtmosphere';
import {usePageMotion} from './hooks/usePageMotion';
import './styles/migration.css';

export function Layout({children}: {children: ReactNode}) {
  const {pathname} = useLocation(), lang = languageFromPath(pathname);
  const {page, solution} = routeFromPath(pathname);
  const identity = legacy.identity[lang], s = legacy.home[lang];
  const detail = legacy.solutions.find(item => item.id === solution)?.[lang];
  const label = page === 'home' ? s.nav[0] : page === 'solutions' ? s.nav[1] : s.nav[4];
  const title = `${detail ? detail.label + ' — ' : ''}${label} — ${identity.name}`;
  const description = page === 'home'
    ? s.homeIntro.replace('{role}', identity.role).replace('{home}', lang === 'fa' ? 'خانه دیجیتال' : 'digital home')
    : detail?.intro ?? legacy.contact[lang].intro;
  const styles = ['portfolio.css', 'site-theme.css', ...(page === 'home' ? ['home-blog.css', 'home-hero.css', 'solution-portals.css']
    : page === 'solutions' ? ['solutions.css', 'solution-portals.css'] : ['contact.css', 'company-logos.css'])];
  return <html lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
      <meta name="theme-color" content="#1c0998"/>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="robots" content="noindex, nofollow"/>
      <link rel="canonical" href={canonicalURL(solution ?? page, lang)}/>
      <link rel="icon" href="/legacy/assets/brand/monogram.svg" type="image/svg+xml"/>
      {styles.map(file => <link key={file} rel="stylesheet" href={`/legacy/${file}`}/>)}
      <Meta/><Links/>
    </head>
    <body data-page={page} data-current-page={page} data-solution={solution}>
      <a href="#main" className="skip">{lang === 'fa' ? 'رفتن به محتوای اصلی' : 'Skip to content'}</a>
      <HomeAtmosphere/>
      <SiteHeader lang={lang} page={page} solution={solution}/>
      <main id="main" className={`page-layout${page === 'solutions' ? ' solutions-page' : ''}`} tabIndex={-1}>{children}</main>
      <GlassNav lang={lang} active={page}/>
      <ScrollRestoration/><Scripts/>
    </body>
  </html>;
}
export default function App() {
  usePageMotion();
  return <Outlet/>;
}
