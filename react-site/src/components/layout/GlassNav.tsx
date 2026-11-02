import {legacy} from '../../content/legacy';
import {pageURL} from '../../lib/routing';
import type {Language,Page} from '../../lib/routing';
import {Icon} from '../ui/Icon';

const pages:Page[]=['home','solutions','blog','cv','contact'];
export function GlassNav({lang}:{lang:Language}) {
  return <footer id="footer" className="footer"><nav aria-label={legacy.navigation[lang].label}>{pages.map((page,index)=><a key={page} href={pageURL(page,lang)} aria-current={page==='contact'?'page':undefined}><Icon name={page}/><span>{legacy.navigation[lang].labels[index]}</span></a>)}</nav></footer>;
}
