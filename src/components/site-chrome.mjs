import {createElement as h} from 'react';
import {pageFiles, siteCopy} from '../content/index.mjs';
import {iconPaths} from '../portfolio/icons.mjs';
import {navigationItems} from '../portfolio/navigation.mjs';

/** @param {{lang: 'en'|'fa', active: string, hrefFor: (id: keyof typeof pageFiles) => string, link?: import('react').ElementType}} props */
export function GlassNavigation({lang,active,hrefFor,link='a'}) {
  return h('footer',{id:'footer',className:'footer'},
    h('nav',{'aria-label':siteCopy[lang].navLabel},navigationItems(lang,active,hrefFor).map(({id,href,label,current})=>
      h(link,{key:id,href,'aria-current':current?'page':undefined},
        h('svg',{viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.6',strokeLinecap:'round',
          strokeLinejoin:'round','aria-hidden':'true',dangerouslySetInnerHTML:{__html:iconPaths[id]}}),h('span',null,label)))));
}

export function CoastPrint({base=''}={}) {
  return h('picture',{className:'page-coast','aria-hidden':'true'},
    h('source',{media:'(max-width: 680px)',srcSet:base+'assets/brand/coastal-print-mobile.webp'}),
    h('img',{src:base+'assets/brand/coastal-print.webp',width:2172,height:724,alt:'',loading:'lazy',decoding:'async'}));
}
