import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {posts} from '../blog-data.mjs';
import {buildReadingPages} from '../scripts/reading-pages.mjs';
import {escapeHTML} from '../blog-core.mjs';
import {loadArticleData} from '../blog-article-data.mjs';

test('every public article and both archives can be read from the first HTML response', () => {
  const files=buildReadingPages(posts), live=posts.filter(item=>item.status==='published');
  assert.equal(files.size,live.length*2+2);
  for(const [name,expected] of files) {
    assert.equal(readFileSync(new URL('../'+name,import.meta.url),'utf8').replace(/\r\n/g,'\n'),expected,name);
  }
  for(const lang of ['fa','en']){
    const archive=files.get(lang==='fa'?'blog.html':'reading/en/archive.html');
    for(const item of live){
      assert.ok(archive.includes('post='+item.slug+'&amp;lang='+lang));
      const html=files.get('reading/'+lang+'/'+item.slug+'.html');
      assert.ok(html.includes('<h1>'+escapeHTML(item[lang].title)+'</h1>'));
      assert.ok(html.includes('myphoto-avatar-v1.webp'));
      for(const section of item.sections) assert.ok(html.includes('id="'+section.id+'"'));
      assert.ok(html.includes('data-reading-lang="'+lang+'"'));
    }
  }
});

test('article data recovers once from a gateway failure and never retries a missing file', async()=>{
  const source='assets/posts/example-1234567890abcdef.json';
  let calls=0;
  const data=await loadArticleData(source,{fetcher:async()=>++calls===1?{ok:false,status:502}:{ok:true,json:async()=>({slug:'example'})}});
  assert.equal(data.slug,'example');assert.equal(calls,2);
  calls=0;
  await assert.rejects(loadArticleData(source,{fetcher:async()=>{calls++;return {ok:false,status:404}}}),/404/);
  assert.equal(calls,1);
});
