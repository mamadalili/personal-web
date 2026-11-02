import {Link} from 'react-router';
import {legacy} from '../../content/legacy';
import {pageURL,contactURL} from '../../lib/routing';
import type {Language} from '../../lib/routing';
import {BrandMark,ProfessionalTitle} from '../ui/BrandSignature';

export function SiteHeader({lang}:{lang:Language}) {
  const identity=legacy.identity[lang],navigation=legacy.navigation[lang];
  return <header className="site-header"><a className="brand" href={pageURL('home',lang)} aria-label={`${navigation.labels[0]} — ${identity.name}`}><span className="brand-mark"><BrandMark/></span><span className="brand-identity"><span id="brand-name">{identity.name}</span><ProfessionalTitle lang={lang} header/></span></a><div className="header-end"><span id="header-label">{navigation.labels[4]}</span><Link id="language" className="language-link" to={contactURL(lang==='fa'?'en':'fa')} lang={lang==='fa'?'en':'fa'} dir={lang==='fa'?'ltr':'rtl'} aria-label={lang==='fa'?'Switch to English':'تغییر زبان به فارسی'}><svg className="language-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 8 6 6m-7 0 6-6 2-3H2m5-3h1m5 18 4-10 4 10m-6.5-3h5"/></svg><span className="language-label">{lang==='fa'?'English':'فارسی'}</span></Link></div></header>;
}
