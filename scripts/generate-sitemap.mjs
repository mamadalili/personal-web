import { readFileSync,writeFileSync,existsSync } from 'node:fs';
import { siteUrl } from '../site-config.mjs';
import { posts } from '../blog-data.mjs';
import { solutions } from '../solutions-data.mjs';
import { buildSitemapEntries,renderSitemap,renderRobots } from '../sitemap-core.mjs';

const root=new URL('../',import.meta.url),entries=buildSitemapEntries(siteUrl,{posts,solutions});
const base=new URL(siteUrl);if(!base.pathname.endsWith('/'))base.pathname+='/';
for(const entry of entries){
  const relative=new URL(entry.loc).pathname.slice(base.pathname.length)||'index.html';
  if(!existsSync(new URL(relative,root)))throw new Error(`Missing indexable page: ${relative}`);
}
const output={'sitemap.xml':renderSitemap(entries),'robots.txt':renderRobots(siteUrl)};
if(process.argv.includes('--check')){
  for(const [name,content] of Object.entries(output)){
    const file=new URL(name,root);
    if(!existsSync(file)||readFileSync(file,'utf8').replace(/\r\n/g,'\n')!==content)throw new Error(`${name} is out of date. Run node scripts/generate-sitemap.mjs.`);
  }
  console.log(`Sitemap verified: ${entries.length} localized URLs.`);
}else{
  for(const [name,content] of Object.entries(output))writeFileSync(new URL(name,root),content,'utf8');
  console.log(`Sitemap generated: ${entries.length} localized URLs for ${base.href}`);
}
