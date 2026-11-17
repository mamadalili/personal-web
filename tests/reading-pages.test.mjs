import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {posts} from '../public/blog-data.mjs';
import {buildReadingPages} from '../scripts/reading-pages.mjs';
import {escapeHTML} from '../public/blog-core.mjs';
import {loadArticleData, matchesArticleDataSource} from '../public/blog-article-data.mjs';
import {posts as summaries} from '../public/blog-summaries.mjs';

test('every public article and both archives can be read from the first HTML response', () => {
  const files=buildReadingPages(posts), live=posts.filter(item=>item.status==='published');
  assert.equal(files.size,live.length*2+5);
  for(const [name,expected] of files) {
    assert.equal(readFileSync(new URL('../public/'+name,import.meta.url),'utf8').replace(/\r\n/g,'\n'),expected,name);
  }
  for(const lang of ['fa','en']){
    const archive=files.get('reading/'+lang+'/archive.html');
    if (lang==='fa') assert.equal(files.get('blog.html'),archive);
    assert.ok(archive.includes('<html lang="'+lang+'" dir="'+(lang==='fa'?'rtl':'ltr')+'"'));
    assert.match(archive, /<header class="journal-masthead">\s*<h1>[^<]+<\/h1><p>[^<]+<\/p>/);
    assert.match(archive, /srcset="\/assets\/blog\/previews\/[^ ]+ 768w, \/assets\/blog\/[^ ]+ \d+w"/);
    const visibleStories = [...archive.matchAll(/<a\b([^>]*?)href="\/reading\/(?:fa|en)\/([\w-]+)\.html"([^>]*)>/g)]
      .filter(([,before,,after]) => !/\bhidden\b/.test(before + after)).map(match => match[2]);
    assert.deepEqual(visibleStories.sort(),live.map(post => post.slug).sort());
    const path = ['make-expertise-understandable','ai-content-system','ai-video-production'];
    const collection = archive.match(/<section[^>]+id="ai-content"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(collection);
    assert.deepEqual([...collection.matchAll(/href="\/reading\/(?:fa|en)\/([\w-]+)\.html"/g)].map(m=>m[1]),path);
    for (const [index, slug] of path.entries()) {
      const article = files.get(`reading/${lang}/${slug}.html`);
      const guide = article.match(/<nav class="article-reading-guide"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
      assert.ok(guide && guide.includes(`href="/blog.html?lang=${lang}#ai-content"`));
      const next = path[index + 1];
      if (next) {
        assert.ok(guide.includes(`rel="next" href="/article.html?post=${next}&amp;lang=${lang}"`));
        assert.ok(guide.includes(escapeHTML(live.find(post=>post.slug===next)[lang].title)));
      } else assert.ok(!guide.includes('rel="next"'));
    }
    assert.equal((archive.match(/data-alternate-text=/g) || []).length,live.length);
    for(const item of live){
      assert.ok(archive.includes('href="/reading/'+lang+'/'+item.slug+'.html"'));
      const html=files.get('reading/'+lang+'/'+item.slug+'.html');
      assert.ok(html.includes('<h1>'+escapeHTML(item[lang].title)+'</h1>'));
      assert.ok(html.includes('myphoto-avatar-v1.webp'));
      for (const section of item.sections) {
        const heading = '<h2>' + escapeHTML(section[lang].title) + '</h2>';
        assert.ok(html.includes('<section id="' + section.id + '" class="article-section">' + heading),
          lang + '/' + item.slug + '#' + section.id);
      }
      assert.ok(html.includes('data-reading-lang="'+lang+'"'));
    }
  }
});

test('both reading routes can hydrate the matching release without replacing the article', ()=>{
  for(const {slug,dataSrc} of summaries) {
    for(const lang of ['fa','en']) {
      const html=readFileSync(new URL('../public/reading/'+lang+'/'+slug+'.html',import.meta.url),'utf8');
      const rendered=html.match(/data-reading-src="([^"]+)"/)?.[1];
      assert.ok(matchesArticleDataSource(rendered,dataSrc),lang+'/'+slug);
    }
  }
  const current=summaries[0].dataSrc;
  assert.ok(matchesArticleDataSource(current,current));
  assert.equal(matchesArticleDataSource('/'+current+'.old',current),false);
  assert.equal(matchesArticleDataSource(undefined,undefined),false);
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
