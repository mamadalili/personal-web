import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {previewServer} from '../scripts/serve-site.mjs';

test('the preview serves the same localized entries, bookmarks and public article paths as the host', async t => {
  const server=previewServer().listen(0,'127.0.0.1');
  await once(server,'listening');
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const origin='http://127.0.0.1:'+server.address().port;
  for(const [path,lang,marker] of [
    ['/?lang=en','en','data-page="home"'],
    ['/?tab=projects&lang=en','en','data-page="cv"'],
    ['/profile.html?lang=fa','fa','data-page="cv"'],
    ['/solutions.html?lang=en','en','data-solution="strategy"'],
    ['/contact.html?lang=fa','fa','data-page="contact"'],
    ['/work-stories.html?lang=en','en','data-work-panel="boomerang"'],
    ['/blog.html?lang=en','en','data-reading-lang="en"'],
    ['/article.html?post=ai-model-market&lang=fa','fa','data-reading-post="ai-model-market"']
  ]){
    const response=await fetch(origin+path), html=await response.text();
    assert.equal(response.status,200,path);
    assert.ok(html.includes('lang="'+lang+'" dir="'+(lang==='fa'?'rtl':'ltr')+'"'),path);
    assert.ok(html.includes(marker),path+': '+marker);
  }
  const redirect=await fetch(origin+'/blog.html',{headers:{Cookie:'portfolio_language=en'},redirect:'manual'});
  assert.equal(redirect.headers.get('location'),'/reading/en/archive.html');
  const module=await fetch(origin+'/home-hero-art.mjs',{method:'HEAD'});
  assert.equal(module.status,200); assert.match(module.headers.get('content-type'),/javascript/);
  assert.equal(await module.text(),'');
  for(const path of ['/.git/config','/src/portfolio/browser.mjs','/scripts/serve-site.mjs','/missing-article.html']){
    assert.equal((await fetch(origin+path)).status,404,path);
  }
});
