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
    const paths = {
      'data-marketing': ['datis-question','measuring-ai-search','binici-dashboard'],
      'ai-content': ['make-expertise-understandable','ai-content-system','ai-video-production'],
      'journal-collection': ['search-to-sale','product-page-decisions','boomerang-channels'],
    };
    for (const [id, path] of Object.entries(paths)) {
      const section = archive.slice(archive.indexOf(`id="${id}"`)).split('</section>')[0];
      assert.ok(section.startsWith(`id="${id}"`));
      assert.deepEqual([...section.matchAll(/<li><a[^>]* href="([^"]+)"/g)].map(m=>m[1]),path.map(slug=>`/reading/${lang}/${slug}.html`));
      for (const [index, slug] of path.entries()) {
        const article = files.get(`reading/${lang}/${slug}.html`);
        const footer = article.match(/<nav class="article-reading-guide" data-reading-guide="([^"]+)"[^>]*>([\s\S]*?)<\/nav>\s*<\/article>/);
        assert.equal(footer?.[1],id,`${lang}/${slug} should end in its collection guide`);
        assert.ok(footer[2].includes(`href="/blog.html?lang=${lang}#${id}"`));
        const next = path[index + 1];
        if (next) {
          assert.ok(footer[2].includes(`rel="next" href="/article.html?post=${next}&amp;lang=${lang}"`));
          assert.ok(footer[2].includes(escapeHTML(live.find(post=>post.slug===next)[lang].title)));
        } else {
          assert.equal((footer[2].match(/<a\s/g)||[]).length,1);
          assert.ok(!footer[2].includes('rel="next"'));
          assert.ok(footer[2].includes(lang==='fa'?'برگشت به':'Back to'));
        }
      }
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
