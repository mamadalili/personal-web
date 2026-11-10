import {createElement} from 'react';
import {Link, useLocation} from 'react-router';
import {legacy} from '../../content/legacy';
import {pageURL, assetURL} from '../../lib/routing';
import type {Language, NavPage, SolutionId} from '../../lib/routing';
import {BrandMark, ProfessionalTitle} from '../ui/BrandSignature';
import {AppLink} from '../ui/AppLink';

export function SiteHeader({lang, page, solution}: {lang: Language; page: NavPage; solution?: SolutionId}) {
  const identity = legacy.identity[lang], navigation = legacy.navigation[lang];
  const {hash} = useLocation();
  const otherLang = lang === 'fa' ? 'en' : 'fa';
  const label = navigation.labels[['home', 'solutions', 'blog', 'cv', 'contact'].indexOf(page)];
  return <header className="site-header">
    <AppLink className="brand" href={pageURL('home', lang)} aria-label={`${navigation.labels[0]} — ${identity.name}`}>
      <span className="brand-mark">{page === 'home'
        ? <img className="header-portrait" src={assetURL('images/myphoto-avatar-v1.webp')} width="59" height="59" alt="" fetchPriority="high"/>
        : <BrandMark/>}</span>
      <span className="brand-identity"><span id="brand-name">{identity.name}</span><ProfessionalTitle lang={lang} header/></span>
    </AppLink>
    <div className="header-end">
      <span id="header-label" hidden={page === 'home'}>{page === 'home' ? '' : label}</span>
      {createElement('day-night-switch')}
      <Link id="language" className="language-link" to={pageURL(solution ?? page, otherLang) + hash}
        lang={otherLang} dir={otherLang === 'fa' ? 'rtl' : 'ltr'}
        aria-label={lang === 'fa' ? 'Switch to English' : 'تغییر زبان به فارسی'}>
        <svg className="language-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 8 6 6m-7 0 6-6 2-3H2m5-3h1m5 18 4-10 4 10m-6.5-3h5"/>
        </svg><span className="language-label">{lang === 'fa' ? 'English' : 'فارسی'}</span>
      </Link>
    </div>
  </header>;
}
