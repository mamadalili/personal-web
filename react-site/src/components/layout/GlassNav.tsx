import {legacy} from '../../content/legacy';
import {pageURL} from '../../lib/routing';
import type {Language, NavPage} from '../../lib/routing';
import {AppLink} from '../ui/AppLink';
import {Icon} from '../ui/Icon';

const pages: NavPage[] = ['home', 'solutions', 'blog', 'cv', 'contact'];
export function GlassNav({lang, active}: {lang: Language; active: NavPage}) {
  return <footer id="footer" className="footer">
    <nav aria-label={legacy.navigation[lang].label}>{pages.map((page, index) =>
      <AppLink key={page} href={pageURL(page, lang)} aria-current={page === active ? 'page' : undefined}>
        <Icon name={page}/><span>{legacy.navigation[lang].labels[index]}</span>
      </AppLink>)}</nav>
  </footer>;
}
