import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
test('Every production page receives the shared landscape theme and the CV includes Tina fifth',()=>{
 for(const page of ['index','profile','blog','article','work-stories','contact','strategy','execution','technology','ai-tools']){
  assert.ok(readFileSync(new URL('../'+page+'.html',import.meta.url),'utf8').includes('site-theme.css'),page);
 }
 const js=readFileSync(new URL('../portfolio.js',import.meta.url),'utf8');
 assert.ok(!js.includes('data-home-motion'));
 const declaration=js.slice(js.indexOf('const projects ='),js.indexOf('const copy ='));
 const projects=vm.runInNewContext(declaration+';projects');
 assert.equal(projects.length,5);
 const tina=projects[4];
 assert.equal(tina.url,'https://github.com/mamadalili/tina-nail-atelier');
 for(const lang of ['fa','en'])assert.ok(tina[lang].title&&tina[lang].body);
 const css=readFileSync(new URL('../site-theme.css',import.meta.url),'utf8');
 for(const file of ['studio-ink.webp','studio-ink-small.webp','studio-hand.webp','studio-hand-small.webp'])
  assert.ok(css.includes(file) && readFileSync(new URL('../assets/brand/'+file,import.meta.url)).length>0);
 for(const page of ['index','landing','solutions','strategy','execution','technology','ai-tools','blog','article','blog-template','profile','contact','work-stories']){
  const html=readFileSync(new URL('../'+page+'.html',import.meta.url),'utf8');
  assert.match(html,/<\/main>\s*<picture class="page-coast" aria-hidden="true">/);
  for(const name of ['coastal-print.webp','coastal-print-mobile.webp'])
   assert.ok(html.includes('assets/brand/'+name) && readFileSync(new URL('../assets/brand/'+name,import.meta.url)).length>0);
 }
});
