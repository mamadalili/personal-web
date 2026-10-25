import { publishedPosts } from './blog-core.mjs';

const mainPages=['','solutions.html','skills.html','blog.html','profile.html','contact.html'];
const escapeXML=value=>String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[character]));

function siteBase(value){
  const base=new URL(value);
  if(!['http:','https:'].includes(base.protocol)||base.username||base.password||base.search||base.hash)throw new TypeError('Site base must be an HTTP(S) URL without credentials, query or fragment.');
  if(!base.pathname.endsWith('/'))base.pathname+='/';
  return base;
}
function routeId(value){
  if(typeof value!=='string'||!(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(value))throw new TypeError('Route IDs must contain lowercase ASCII words separated by hyphens.');
  return value;
}

export function buildSitemapEntries(siteUrl,{posts=[],solutions=[]}={}){
  const base=siteBase(siteUrl);
  const routes=mainPages.map(path=>({path}));
  for(const solution of solutions)routes.push({path:`${routeId(solution.id)}.html`});
  for(const post of publishedPosts(posts)){
    if(!post.fa?.title||!post.en?.title)throw new TypeError('Published sitemap articles need both language versions.');
    routes.push({path:'article.html',params:{post:routeId(post.slug)}});
  }
  const entries=[],seen=new Set();
  for(const route of routes){
    const alternates={};
    for(const language of ['fa','en']){
      const url=new URL(route.path,base);
      for(const [key,value] of Object.entries(route.params||{}))url.searchParams.set(key,value);
      url.searchParams.set('lang',language);
      alternates[language]=url.href;
    }
    alternates['x-default']=alternates.fa;
    for(const language of ['fa','en']){
      const loc=alternates[language];
      if(seen.has(loc))throw new TypeError('Duplicate indexable route in sitemap content.');
      seen.add(loc);entries.push({loc,alternates});
    }
  }
  return entries;
}
export function renderSitemap(entries){
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.map(entry=>`  <url>\n    <loc>${escapeXML(entry.loc)}</loc>\n${Object.entries(entry.alternates).map(([language,href])=>`    <xhtml:link rel="alternate" hreflang="${escapeXML(language)}" href="${escapeXML(href)}"/>`).join('\n')}\n  </url>`).join('\n')}\n</urlset>\n`;
}
export function renderRobots(siteUrl){
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml',siteBase(siteUrl)).href}\n`;
}
