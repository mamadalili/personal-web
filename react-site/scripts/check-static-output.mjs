import {publicRoot} from '../../scripts/public-preview.mjs';
import {siteContent} from '../src/content/site.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join,dirname,resolve,relative} from 'node:path';
import {parse} from 'acorn';

const root=fileURLToPath(new URL('../',import.meta.url));
const output=join(root,'build/client');
for(const lang of ['fa','en']){
 test(`${lang} Contact has actual native HTML and working destinations before JavaScript`,()=>{
  const html=readFileSync(join(output,lang,'contact/index.html'),'utf8');
  const data=siteContent;
  assert.match(html,new RegExp(`<html[^>]+lang="${lang}"[^>]+dir="${lang==='fa'?'rtl':'ltr'}"`));
  assert.ok(html.includes(data.contact[lang].intro));
  assert.ok(html.includes(data.identity[lang].name));
  for(const channel of data.channels)assert.ok(html.includes(`href="${channel.href}"`),channel.id);
  assert.equal((html.match(/data-contact="/g)||[]).length,5);
  assert.equal((html.match(/class="employer-logo-card"/g)||[]).length,7);
  assert.ok(html.includes(`href="/${lang==='fa'?'en':'fa'}/contact"`));
  assert.ok(html.includes('aria-current="page"'));
  assert.ok(html.includes('name="robots" content="noindex, nofollow"'));
  assert.ok(!html.includes('<script src="/portfolio.js'));
  assert.ok(!html.includes('/legacy/'));
 });
}
test('the React build contains its routes, not a second copy of the production tree',()=>{
 for(const name of ['legacy','images','reading','posts','portfolio.js','.git','docs','.agents'])assert.equal(existsSync(join(output,name)),false,name);
 assert.match(readFileSync(join(output,'robots.txt'),'utf8'),/Disallow: \//);
});

test('every literal relative module import in the shared public tree resolves',()=>{
 const legacy=publicRoot;
 const visited=new Set();
 const missing=new Set();
 function visit(file){
  if(visited.has(file))return;
  visited.add(file);
  const tree=parse(readFileSync(file,'utf8'),{ecmaVersion:'latest',sourceType:'module'});
  function walk(node){
   if(!node||typeof node!=='object')return;
   const source=node.type==='ImportExpression'?node.source:
    ['ImportDeclaration','ExportNamedDeclaration','ExportAllDeclaration'].includes(node.type)?node.source:null;
   if(source?.type==='Literal'&&typeof source.value==='string'&&source.value.startsWith('.')){
    const dependency=resolve(dirname(file),source.value.split(/[?#]/)[0]);
    if(!existsSync(dependency))missing.add(relative(legacy,dependency));
    else if(/\.[cm]?js$/.test(dependency))visit(dependency);
   }
   for(const value of Object.values(node)){
    if(Array.isArray(value))value.forEach(walk);
    else if(value&&typeof value==='object')walk(value);
   }
  }
  walk(tree);
 }
 for(const file of readdirSync(legacy))if(/\.[cm]?js$/.test(file))visit(join(legacy,file));
 assert.deepEqual([...missing].sort(),[]);
 assert.ok(visited.size>20,'The public article module graph was traversed');
});
