import test from 'node:test';
import assert from 'node:assert/strict';
import {post} from '../posts/specialized-generalist.mjs';
import {routeBlock} from '../posts/skill-route-data.mjs';
import {skillRoute,skillRouteSheet,validateSkillRoute} from '../blog-skill-route-model.mjs';
import {createSkillRoutes} from '../blog-skill-route.mjs';

test('the nine educational routes keep the selected foundation, bottleneck and deliverable connected',()=>{
 assert.equal(validateSkillRoute(routeBlock),true);
 const original=JSON.stringify(routeBlock),keys=new Set();
 for(const core of routeBlock.cores)for(const barrier of routeBlock.barriers){
  const route=skillRoute(routeBlock,core.id,barrier.id);
  assert.equal(route.core,core);assert.equal(route.barrier,barrier);
  keys.add(`${route.core.id}:${route.barrier.id}`);
  for(const lang of ['fa','en']){
   const sheet=skillRouteSheet(routeBlock,core.id,barrier.id,lang,'My actual problem');
   for(const text of [core[lang].output,core[lang].proof,barrier[lang].action,barrier[lang].check,'My actual problem'])assert.ok(sheet.includes(text));
  }
 }
 assert.equal(keys.size,9);assert.equal(JSON.stringify(routeBlock),original);
 assert.equal(skillRoute(routeBlock,'unknown','__proto__').core.id,routeBlock.cores[0].id);
});

test('incomplete translations, duplicate identities and malformed records cannot create a route',()=>{
 const broken=structuredClone(routeBlock);delete broken.cores[1].en.proof;
 const duplicate=structuredClone(routeBlock);duplicate.barriers[1].id=duplicate.barriers[0].id;
 for(const block of [null,{},broken,duplicate,{...routeBlock,cores:[null,null]}]){
  assert.equal(validateSkillRoute(block),false);assert.equal(skillRoute(block,'market','audience'),null);
 }
});

test('the renderer escapes authored text and keeps note input separate from updated results',()=>{
 const block=structuredClone(routeBlock);block.cores[0].fa.label='<img src=x onerror=alert(1)>';
 const widget=createSkillRoutes({lang:'fa',signal:new AbortController().signal});
 const html=widget.render(block,'example');
 assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img src=x'));
 assert.ok(html.includes('aria-live="polite"'));assert.ok(html.includes('maxlength="1200"'));
 const longNote='x'.repeat(1600),sheet=skillRouteSheet(block,'market','audience','en',longNote);
 assert.ok(sheet.includes('x'.repeat(1200)));assert.ok(!sheet.includes('x'.repeat(1201)));
});

test('the new article has native depth, the closing banner pair, source limits and relevant interactions',()=>{
 assert.equal(post.bannerPair.position,2);assert.equal(post.bannerPair.id,'blueprint-saffron-pair');
 assert.equal(post.sections.length,8);
 const blocks=post.sections.flatMap(section=>section.blocks);
 assert.equal(blocks.filter(block=>block.type==='skill-route').length,1);
 assert.equal(blocks.filter(block=>block.type==='image').length,1);
 assert.ok(!blocks.some(block=>['chart','simulator','data-motion'].includes(block.type)));
 for(const lang of ['fa','en']){
  const prose=blocks.filter(block=>block.type==='paragraph').map(block=>block[lang]).join(' ');
  assert.ok(prose.split(/\s+/).length>900,lang);
  assert.ok(post[lang].sourceNote.length>100);assert.ok(post[lang].readTime);
 }
});
