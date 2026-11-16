import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSitemapEntries, renderSitemap, renderRobots } from '../public/sitemap-core.mjs';

const published={slug:'first-article',status:'published',fa:{title:'مقاله'},en:{title:'Article'}};
const solutions=['strategy','execution','technology','ai-tools'].map(id=>({id}));

test('sitemap covers canonical sections and excludes the retired skills page',()=>{
  const entries=buildSitemapEntries('https://site.test',{posts:[published],solutions});
  assert.equal(entries.length,20);
  assert.equal(new Set(entries.map(entry=>entry.loc)).size,20);
  for(const path of ['/','/blog.html','/profile.html','/work-stories.html','/contact.html','/strategy.html','/execution.html','/technology.html','/ai-tools.html']){
    for(const language of ['fa','en']){
      const expected=path.replace(/\.html$/,'.'+language+'.html');
      assert.ok(entries.some(entry=>new URL(entry.loc).pathname===expected&&new URL(entry.loc).searchParams.get('lang')===language),expected);
    }
  }
});
test('every language URL lists matching reciprocal fa, en and fallback alternatives',()=>{
  const entries=buildSitemapEntries('https://site.test',{posts:[published],solutions});
  for(const entry of entries){
    assert.equal(entry.alternates['x-default'],entry.alternates.fa);
    assert.equal(new URL(entry.alternates.fa).searchParams.get('lang'),'fa');
    assert.equal(new URL(entry.alternates.en).searchParams.get('lang'),'en');
    assert.ok(Object.values(entry.alternates).includes(entry.loc));
    for(const language of ['fa','en'])assert.deepEqual(entries.find(other=>other.loc===entry.alternates[language]).alternates,entry.alternates);
  }
});
test('drafts, templates and duplicate UI views stay out of the sitemap',()=>{
  const entries=buildSitemapEntries('https://site.test',{posts:[published,{...published,slug:'draft',status:'draft'},{...published,slug:'sample',template:true}]});
  const all=entries.map(entry=>entry.loc).join('\n');
  assert.equal(entries.length,12);
  for(const excluded of ['solutions.html','skills.html','draft','sample','landing.html','index.html','blog-template.html','tab=','role=','#'])assert.ok(!all.includes(excluded),excluded);
});
test('article URLs are encoded once and XML-escaped, with no invented modification dates',()=>{
  const xml=renderSitemap(buildSitemapEntries('https://site.test',{posts:[published]}));
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
  assert.ok(xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'));
  assert.ok(xml.includes('article.html?post=first-article&amp;lang=fa'));
  assert.ok(!xml.includes('&amp;amp;'));
  assert.ok(!xml.includes('<lastmod>'));
});
test('a deployment prefix is retained for every page and the robots sitemap pointer',()=>{
  const entries=buildSitemapEntries('https://site.test/portfolio',{posts:[published],solutions});
  assert.ok(entries.every(entry=>entry.loc.startsWith('https://site.test/portfolio/')));
  assert.ok(entries.some(entry=>entry.loc==='https://site.test/portfolio/?lang=en'));
  assert.equal(renderRobots('https://site.test/portfolio'),'User-agent: *\nAllow: /\n\nSitemap: https://site.test/portfolio/sitemap.xml\n');
});
test('invalid site bases fail instead of producing unusable or credential-bearing crawl URLs',()=>{
  for(const base of ['relative/path','javascript:alert(1)','file:///site','https://user:secret@site.test/','https://site.test/?preview=1','https://site.test/#preview'])assert.throws(()=>buildSitemapEntries(base));
});
test('an incomplete published translation, duplicate slug or unsafe route fails before generation',()=>{
  assert.throws(()=>buildSitemapEntries('https://site.test',{posts:[{...published,en:null}]}));
  assert.throws(()=>buildSitemapEntries('https://site.test',{posts:[published,published]}));
  assert.throws(()=>buildSitemapEntries('https://site.test',{solutions:[{id:'../outside'}]}));
});

test('localized entry links open their canonical HTML directly under either cookie', async t => {
  const {previewServer}=await import('../scripts/serve-site.mjs');
  const {once}=await import('node:events');
  const server=previewServer().listen(0,'127.0.0.1');
  await once(server,'listening');
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const origin='http://127.0.0.1:'+server.address().port;
  const entries=buildSitemapEntries('https://mrdalili.ir/',{solutions});
  for(const {loc,alternates} of entries){
    const canonical=new URL(loc);
    for(const cookie of ['en','fa']){
      const response=await fetch(origin+canonical.pathname+canonical.search,{headers:{Cookie:'portfolio_language='+cookie},redirect:'manual'});
      assert.equal(response.status,200,loc);
      const html=await response.text();
      assert.ok(html.includes('<link rel="canonical" href="'+loc+'">'),loc);
      assert.ok(html.includes('<html lang="'+(loc===alternates.fa?'fa':'en')+'"'),loc);
    }
  }
});
