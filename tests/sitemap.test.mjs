import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSitemapEntries, renderSitemap, renderRobots } from '../sitemap-core.mjs';

const published={slug:'first-article',status:'published',fa:{title:'مقاله'},en:{title:'Article'}};
const solutions=['strategy','execution','technology','ai-tools'].map(id=>({id}));

test('sitemap covers the six main sections, solution details and published articles in both languages',()=>{
  const entries=buildSitemapEntries('https://site.test',{posts:[published],solutions});
  assert.equal(entries.length,22);
  assert.equal(new Set(entries.map(entry=>entry.loc)).size,22);
  for(const path of ['/','/solutions.html','/skills.html','/blog.html','/profile.html','/contact.html','/strategy.html','/execution.html','/technology.html','/ai-tools.html']){
    for(const language of ['fa','en'])assert.ok(entries.some(entry=>new URL(entry.loc).pathname===path&&new URL(entry.loc).searchParams.get('lang')===language));
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
  assert.equal(entries.length,14);
  for(const excluded of ['draft','sample','landing.html','index.html','blog-template.html','tab=','role=','#'])assert.ok(!all.includes(excluded),excluded);
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
