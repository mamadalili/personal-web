import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {once} from 'node:events';
import {posts} from '../public/blog-data.mjs';
import {publishedPosts} from '../public/blog-core.mjs';
import {siteUrl} from '../public/site-config.mjs';
import {previewServer} from '../scripts/serve-site.mjs';

const read=name=>readFileSync(new URL('../public/'+name,import.meta.url),'utf8');
const decode=value=>value.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const attr=(tag,name)=>decode(tag.match(new RegExp('\\b'+name+'="([^"]*)"'))?.[1]||'');
const title=html=>decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]||'');
const live=publishedPosts(posts);
const sitemapLocations=[...read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>decode(match[1]));
const canonicals=lang=>sitemapLocations.filter(loc=>{
  const url=new URL(loc);
  return url.pathname.endsWith('/article.html')&&url.searchParams.get('lang')===lang;
});

function archiveLinks(lang){
  const main=read('blog.'+lang+'.html').match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main,'Built archive must contain its initial article list');
  return [...main.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .filter(([,tag])=>/journal-(?:pick|row)\b|id="story-|aria-labelledby="journal-lead-title"/.test(tag))
    .map(([,tag,content])=>({href:attr(tag,'href'),cover:attr(content.match(/<img\b[^>]*>/)?.[0]||'','src')}));
}

for(const lang of ['fa','en']){
  test(`built ${lang} archive links every card directly to its own sitemap canonical`,()=>{
    const expected=canonicals(lang),links=archiveLinks(lang);
    assert.equal(expected.length,live.length);
    assert.ok(links.length>=live.length);
    const bySlug=new Map(expected.map(loc=>[new URL(loc).searchParams.get('post'),loc]));
    const byCover=new Map(live.map(post=>[new URL(post.cover[lang].src,siteUrl).pathname,post]));
    for(const link of links){
      const cover=new URL(link.cover,siteUrl).pathname.replace('/previews/','/');
      const post=byCover.get(cover);
      assert.ok(post,'Every article card must correspond to a published cover: '+link.cover);
      assert.equal(new URL(link.href,siteUrl).href,bySlug.get(post.slug),`${lang}/${post.slug}`);
    }
    assert.deepEqual([...new Set(links.map(link=>new URL(link.href,siteUrl).href))].sort(),expected.slice().sort());
  });
}

const persianTitles={
  '/?lang=fa':'محمدرضا دلیلی | بازاریابی دیجیتال و فروش آنلاین',
  '/cv.fa.html?lang=fa':'رزومه محمدرضا دلیلی | تجربه‌های بازاریابی و فروش آنلاین',
  'can-sales-network':'خریدار هود در فروشگاه چه می‌پرسد؟ تجربهٔ لوازم خانگی کن',
  'datis-fieldwork':'از سؤال قیمت تا مشاهدهٔ میدانی پشت پیشخوان در داتیس',
  'binici-demand':'موجودی چطور برداشت ما از تقاضا را عوض می‌کند؟ تجربهٔ بی‌نی‌سی',
  'boomerang-ai-operations':'کنترل مشخصات محصول در متن‌های تولیدشده با AI در بومرنگ',
  'turbin-ai':'دسته‌بندی پیام‌های مشتری پیش از پاسخ با AI در آنلاین تحریر',
};
const titleCases=Object.entries(persianTitles).map(([key,value])=>({
  path:key.startsWith('/')?key:'/article.html?post='+key+'&lang=fa',
  expected:value+(key.startsWith('/')?'':' — محمدرضا دلیلی'),
}));

test('real preview routes serve every archive article directly, retaining canonical and article identity',async t=>{
  const server=previewServer().listen(0,'127.0.0.1');
  await once(server,'listening');
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const origin='http://127.0.0.1:'+server.address().port;
  for(const lang of ['fa','en']){
    const destinations=[...new Set(archiveLinks(lang).map(link=>new URL(link.href,siteUrl).href))];
    for(const destination of destinations){
      const url=new URL(destination),slug=url.searchParams.get('post');
      assert.ok(slug,'Archive destination must already be the canonical article URL');
      const local=origin+url.pathname+url.search;
      const response=await fetch(local,{redirect:'manual'}),html=await response.text();
      assert.equal(response.status,200,local);
      assert.equal(response.headers.get('location'),null,local);
      assert.equal(response.url,local);
      assert.equal(attr(html.match(/<link rel="canonical"[^>]*>/)?.[0]||'','href'),destination);
      assert.equal(attr(html.match(/<main\b[^>]*>/)?.[0]||'','data-reading-post'),slug);
      assert.equal(attr(html.match(/<html\b[^>]*>/)?.[0]||'','lang'),lang);
    }
  }
  const response=await fetch(origin+'/reading/fa/search-to-sale.html',{redirect:'manual'});
  const html=await response.text();
  assert.equal(response.status,200);
  assert.equal(attr(html.match(/<main\b[^>]*>/)?.[0]||'','data-reading-post'),'search-to-sale');
  assert.equal(attr(html.match(/<link rel="canonical"[^>]*>/)?.[0]||'','href'),siteUrl+'article.html?post=search-to-sale&lang=fa');
});

test('initial HTML has the seven exact Persian search titles and preserves English controls',async t=>{
  const server=previewServer().listen(0,'127.0.0.1');
  await once(server,'listening');
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const origin='http://127.0.0.1:'+server.address().port;
  const controls=[
    {path:'/?lang=en',expected:'Home — Mohamad Reza Dalili'},
    {path:'/cv.en.html?lang=en',expected:'CV — Mohamad Reza Dalili'},
    {path:'/article.html?post=can-sales-network&lang=en',expected:'Points of sale — Mohamad Reza Dalili'},
  ];
  for(const {path,expected} of [...titleCases,...controls])await t.test(path,async()=>{
    const response=await fetch(origin+path,{redirect:'manual'}),html=await response.text();
    assert.equal(response.status,200,path);
    assert.equal(title(html),expected);
    const slug=new URL(path,origin).searchParams.get('post');
    if(slug){
      const lang=new URL(path,origin).searchParams.get('lang'),display=live.find(post=>post.slug===slug)[lang].title;
      assert.equal(decode(html.match(/<h1>(.*?)<\/h1>/)?.[1]||''),display,'SEO metadata must not replace the H1');
    }
  });
});
