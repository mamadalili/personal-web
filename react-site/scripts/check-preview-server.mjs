import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {previewServer} from '../../scripts/serve-site.mjs';

test('built React routes can load their own scripts, shared art and native pages on the same origin', async t=>{
  const server=previewServer({react:true}).listen(0,'127.0.0.1');
  await once(server,'listening');
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const base='http://127.0.0.1:'+server.address().port;
  for(const lang of ['fa','en']){
    for(const route of ['','/contact','/solutions/strategy','/solutions/execution','/solutions/technology','/solutions/ai-tools']){
      const response=await fetch(base+'/'+lang+route);
      assert.equal(response.status,200,route);
      const html=await response.text();
      assert.ok(html.includes('dir="'+(lang==='fa'?'rtl':'ltr')+'"') && html.includes('<h1'),route);
      const bundle=html.match(/href="(\/assets\/[^"]+\.js)"/)?.[1];
      assert.ok(bundle,'missing JS bundle in '+route);
      assert.match((await fetch(base+bundle,{method:'HEAD'})).headers.get('content-type'),/javascript/);
    }
  }
  for(const path of ['/assets/brand/coastal-print.webp','/images/myphoto-avatar-v1.webp','/profile.html?lang=en','/article.html?post=ai-model-market&lang=fa']){
    assert.equal((await fetch(base+path)).status,200,path);
  }
  assert.match(await (await fetch(base+'/robots.txt')).text(),/Disallow: \//);
  assert.equal((await fetch(base+'/assets/does-not-exist.js')).status,404);
});
