import {GlassNavigation} from '../../../../src/components/site-chrome.mjs';
import {pageURL, type Language, type NavPage} from '../../lib/routing';
import {AppLink} from '../ui/AppLink';

export function GlassNav({lang, active}: {lang: Language; active: NavPage}) {
  return <GlassNavigation lang={lang} active={active} hrefFor={(id: NavPage) => pageURL(id,lang)} link={AppLink}/>;
}
