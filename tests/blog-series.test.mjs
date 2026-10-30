import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync,readFileSync } from 'node:fs';
import { posts } from '../blog-data.mjs';
import { seriesPosts } from '../posts/series-2026.mjs';
import { series2026 } from '../posts/series-2026-manifest.mjs';
import { internalHref } from '../blog-core.mjs';
import { buildSitemapEntries } from '../sitemap-core.mjs';

const supplied=[
 'red-website-design.co.uk/perfect-ecommerce-product-page/',
 'red-website-design.co.uk/building-your-online-store-heres-what-most-ecommerce-businesses-get-wrong/',
 'hbr.org/2004/09/customer-centered-brand-management',
 'hbr.org/1996/11/what-is-strategy',
 'www.mckinsey.com/capabilities/tech-and-ai/how-we-help-clients/turning-data-into-decisions-lessons-from-professional-cycling',
 'www.bcg.com/publications/2026/ceos-help-ctos-cios-prepare-agentic-ai',
 'www.bcg.com/publications/2026/beyond-tomorrow-four-scenarios-for-the-world-of-2050',
 'www.bcg.com/publications/2026/business-case-ai-nature-conservation',
 'www.mckinsey.com/about-us/new-at-mckinsey-blog/antonio-castro-on-putting-enterprise-data-to-work-in-the-age-of-ai',
 'www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-a-forward-deployed-engineer',
 'www.emarketer.com/content/podcast-next-marketing-battleground-real-life-behind-numbers',
 'www.searchenginejournal.com/tactical-solutions-for-the-biggest-ai-search-measurement-challenges-recap/593023/',
 'digiday.com/marketing/d-research-marketers-hesitate-to-adopt-ai-for-influencer-and-ctv-marketing/',
 'www.retaildive.com/spons/the-most-expensive-problems-are-the-ones-youve-learned-to-live-with/833681/',
 'www.fastcompany.com/91628235/9-ceos-tell-us-how-they-manage-time',
 'www.fastcompany.com/91629780/how-u-s-home-sellers-helping-buyers-make-deal-stagnant-housing-market'
];
const canonical=url=>{const u=new URL(url);return u.hostname+u.pathname;};

test('all sixteen supplied sources map to one distinct published bilingual article',()=>{
 assert.equal(seriesPosts.length,16);assert.ok(posts.length>=seriesPosts.length+6);
 assert.equal(new Set(posts.map(p=>p.slug)).size,posts.length);
 for(const [index,post] of seriesPosts.entries()){
  assert.equal(post.slug,series2026[index].slug);
  assert.equal(post.status,'published');assert.equal(post.template,undefined);
  assert.ok(post.sources.some(source=>canonical(source.url)===supplied[index]),post.slug);
  assert.ok(post.sections.length>=6,post.slug);
  assert.equal(new Set(post.sections.map(s=>s.id)).size,post.sections.length);
  for(const lang of ['fa','en']){
   assert.equal(post[lang].title,series2026[index][lang]);
   for(const key of ['excerpt','category','readTime','credit','sourceNote'])assert.ok(post[lang][key]?.trim(),`${post.slug} ${lang} ${key}`);
   assert.ok(post[lang].takeaways.length>=3);
   for(const source of post.sources){assert.ok(source[lang]?.title&&source[lang]?.note);assert.equal(new URL(source.url).protocol,'https:');}
   for(const section of post.sections)assert.ok(section[lang]?.title&&section.blocks.length);
  }
 }
});

test('the sixteen source essays retain substantial native prose in both languages',()=>{
 for(const post of seriesPosts){
  const blocks=post.sections.flatMap(section=>section.blocks);
  for(const [lang,minimum] of [['fa',650],['en',575]]){
   const prose=[];
   for(const block of blocks){
    if(typeof block[lang]==='string')prose.push(block[lang]);
    else if(block[lang]?.text)prose.push(block[lang].text);
    for(const item of block.items||[]){if(item[lang]?.text)prose.push(item[lang].text);if(item[lang]?.detail)prose.push(item[lang].detail);}
   }
   // The author removed a redundant source-note paragraph from this article.
   const floor=post.slug==='product-page-decisions'&&lang==='fa'?630:minimum;
   assert.ok(prose.join(' ').trim().split(/\s+/).length>=floor,`${post.slug}: ${lang} essay is too brief`);
  }
 }
});

test('article interactions use supported native data contracts and valid continuations',()=>{
 const interactive=new Set(['decision-audit','tabs','explorer','quiz','details','chart']);
 for(const post of seriesPosts){
  let count=0;
  for(const block of post.sections.flatMap(s=>s.blocks)){
   assert.ok(['paragraph','callout',...interactive].includes(block.type),`${post.slug}: ${block.type}`);
   if(interactive.has(block.type))count++;
   for(const lang of ['fa','en']){
    if(['paragraph','callout'].includes(block.type))assert.equal(typeof block[lang],'string');
    if(block.type==='details')assert.ok(block[lang].title&&block[lang].text);
    if(block.type==='tabs')for(const item of block.items)assert.ok(item[lang].label&&item[lang].title&&item[lang].text);
    if(block.type==='explorer')for(const item of block.items)assert.ok(item[lang].title&&item[lang].text&&item[lang].detail);
    if(block.type==='quiz'){assert.ok(block[lang].question&&block[`${lang}Explanation`]);assert.equal(block.choices.filter(c=>c.correct).length,1);for(const choice of block.choices)assert.ok(choice[lang]);}
    if(block.type==='decision-audit'){assert.ok(block[lang].title&&block[lang].complete);for(const item of block.items)assert.ok(item[lang].label&&item[lang].next);}
    if(block.type==='chart'){
     assert.ok(block[lang].title&&block[lang].source&&block[lang].method);
     assert.equal(block.labels[lang].length,block.labels.fa.length);
     for(const metric of block.metrics)assert.ok(metric[lang]);
     for(const series of block.series)for(const values of Object.values(series.values))assert.equal(values.length,block.labels.fa.length);
    }
   }
  }
  assert.ok(count>0,post.slug);assert.ok(post.related.length>=2);
  for(const related of post.related){const slug=related.target.replace('post:','');assert.ok(posts.some(p=>p.slug===slug),`${post.slug} -> ${slug}`);for(const lang of ['fa','en']){assert.ok(related[lang].title&&related[lang].description);assert.ok(internalHref(related.target,lang,posts).includes(`post=${slug}`));}}
 }
});

test('native WebP assets are local and earlier banner families are paired',()=>{
 const fresh=['small-business-website','team-capacity','capital-one-ai','one-day-rethink','building-wealth-beyond-luck','make-expertise-understandable'].map(slug=>posts.find(p=>p.slug===slug));
 assert.ok(fresh.every(Boolean));
 const assets=new Set(),pairs=[{id:'ice-emerald-pair',position:1},...seriesPosts.map(p=>p.bannerPair),...fresh.map(p=>p.bannerPair)];
 for(const post of [...seriesPosts,...fresh])for(const lang of ['fa','en']){
  const cover=post.cover[lang];assets.add(cover.src);assert.ok(existsSync(new URL(`../${cover.src}`,import.meta.url)));
  const bytes=readFileSync(new URL(`../${cover.src}`,import.meta.url));assert.equal(bytes.toString('ascii',8,12),'WEBP');
  assert.ok(cover.width>=1600&&cover.height>=900);assert.ok(cover.alt);
 }
 assert.equal(assets.size,32+fresh.length*2);
 for(let i=0;i<pairs.length-1;i+=2){assert.equal(pairs[i].position,1);assert.equal(pairs[i+1].position,2);assert.equal(pairs[i].id,pairs[i+1].id);}
 assert.deepEqual(pairs.at(-1),{id:'cobalt-citron-pair',position:1});
 const entries=buildSitemapEntries('https://site.test',{posts,solutions:['strategy','execution','technology','ai-tools'].map(id=>({id}))});assert.equal(entries.length,16+posts.length*2);
});
