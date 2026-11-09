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
 for(const file of ['alborz-first-light.webp','alborz-first-light-mobile.webp'])
  assert.ok(css.includes(file) && readFileSync(new URL('../assets/brand/'+file,import.meta.url)).length>0);
 assert.match(css,/prefers-reduced-motion: no-preference/);
});
