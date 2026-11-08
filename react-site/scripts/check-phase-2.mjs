import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const output=join(root,'build/client');
const htmlAt=path=>readFileSync(join(output,path,'index.html'),'utf8');
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;'}[c]));
const data=()=>JSON.parse(readFileSync(join(root,'src/content/generated/legacy.json'),'utf8'));

for(const lang of ['fa','en']){
 test(`${lang} Home ships approved copy, four real solutions and all published article summaries in HTML`,()=>{
  const html=htmlAt(lang),d=data();
  assert.match(html,new RegExp(`<html[^>]+lang="${lang}"[^>]+dir="${lang==='fa'?'rtl':'ltr'}"`));
  for(const text of d.home[lang].homeTitle.split(/<[^>]+>/).filter(Boolean))assert.ok(html.includes(escape(text)));
  assert.ok(html.includes(escape(d.skills[lang].cardTitle)));
  assert.ok(html.includes('class="header-portrait"'));
  assert.equal((html.match(/class="home-folder-link"/g)||[]).length,4);
  assert.equal((html.match(/class="home-folder-art"/g)||[]).length,4);
  assert.ok(html.includes('/legacy/solution-portals.css'));
  for(const id of ['strategy','execution','technology','ai-tools'])assert.ok(html.includes(`href="/${lang}/solutions/${id}"`),id);
  assert.ok(d.posts.length>=29);
  assert.equal((html.match(/class="home-post-card /g)||[]).length,d.posts.length);
  for(const post of d.posts){
   assert.ok(html.includes(escape(post[lang].title)),post.slug);
   assert.ok(html.includes(escape(post[lang].excerpt)),post.slug);
   assert.ok(html.includes(post.cover[lang].src.replace('assets/blog/','assets/blog/previews/')),post.slug);
  }
  assert.ok(!html.includes('در حال آماده‌سازی'));
  assert.ok(!html.includes('/legacy/home-blog.mjs'));
  assert.ok(html.includes(`href="/${lang}/contact"`));
  assert.ok(html.includes(`href="/${lang==='fa'?'en':'fa'}"`));
 });
 for(const id of ['strategy','execution','technology','ai-tools']){
  test(`${lang} ${id} has complete native detail, selected selector, FAQ and shared CTA before JavaScript`,()=>{
   const html=htmlAt(`${lang}/solutions/${id}`),d=data();
   const content=d.solutions.find(item=>item.id===id)[lang];
   assert.ok(html.includes(escape(content.intro)));
   for(const text of [...content.headline,...content.fit,...content.outputs.flatMap(x=>[x.title,x.text]),...content.process.flatMap(x=>[x.title,x.text]),...content.faq.flatMap(x=>[x.q,x.a])])assert.ok(html.includes(escape(text)),text);
   assert.equal((html.match(/<details>/g)||[]).length,content.faq.length);
   const selected=[...html.matchAll(/<a\b[^>]*>/g)].some(([tag])=>tag.includes(`href="/${lang}/solutions/${id}"`)&&tag.includes('aria-current="page"'));
   assert.ok(selected,'The current solution is selected regardless of HTML attribute order');
   assert.equal((html.match(/class="home-folder-link/g)||[]).length,4);
   assert.equal((html.match(/class="home-folder-art"/g)||[]).length,4);
   assert.ok(html.includes('/legacy/solution-portals.css'));
   assert.equal([...html.matchAll(/<a\b[^>]*class="home-folder-link"[^>]*>/g)].filter(m=>m[0].includes('aria-current="page"')).length,1);
   assert.ok(html.includes(`href="/${lang}/contact"`));
   assert.ok(html.includes(escape(d.collaboration[lang].body)));
   assert.ok(html.includes(`/legacy/profile.html?lang=${lang}&amp;tab=experience`));
   assert.ok(html.includes(`href="/${lang==='fa'?'en':'fa'}/solutions/${id}"`));
   assert.ok(!html.includes('<script src="/legacy/portfolio.js'));
   if(id==='ai-tools')assert.ok(html.includes('post=ai-model-market'));
  });
 }
}

test('Home folders retain the same four native destinations and descriptions as Solutions',()=>{
 for(const lang of ['fa','en']){
  const home=htmlAt(lang),d=data(),solutions=htmlAt(lang+'/solutions/strategy');
  assert.equal((home.match(/class="home-folder-link"/g)||[]).length,4);
  const cards=markup=>[...markup.matchAll(/<a\b[^>]*class="home-folder-link"[^>]*>[\s\S]*?<\/a>/g)].map(m=>m[0].replace(/ aria-current="page"/g,''));
  assert.deepEqual(cards(home),cards(solutions));

  for(const id of ['strategy','execution','technology','ai-tools']){
   for(const text of [d.portals[lang][id].title,d.portals[lang][id].text]){
    assert.ok(home.includes(escape(text)));assert.ok(solutions.includes(escape(text)));
   }
   assert.ok(home.includes('href="/'+lang+'/solutions/'+id+'"'));
  }
 }
});

test('every local destination and asset in the migrated static documents exists',()=>{
 const paths=['','fa','en',...['fa','en'].flatMap(lang=>['contact',...['strategy','execution','technology','ai-tools'].map(id=>`solutions/${id}`)].map(page=>`${lang}/${page}`))];
 for(const path of paths){
  for(const [,url] of htmlAt(path).matchAll(/(?:href|src)="(\/[^"#?]+)[^"]*"/g))assert.ok(existsSync(join(output,url)),`${path}: ${url}`);
 }
});

test('Home summaries omit article bodies and trusted generated art keeps valid local references',()=>{
 const d=data();
 for(const post of d.posts){
  assert.deepEqual(Object.keys(post).sort(),['cover','date','en','fa','slug']);
  assert.deepEqual(Object.keys(post.fa).sort(),['category','excerpt','readTime','title']);
 }
 for(const lang of ['fa','en']){
  const art=[d.art.scenes[lang].home,...Object.values(d.art.scenes[lang].solutions),...Object.values(d.art.capsules),...Object.values(d.art.folders)];
  for(const markup of art){
   assert.ok(!/<script|<foreignObject|\bon\w+=/i.test(markup));
   const ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
   assert.equal(new Set(ids).size,ids.length);
   for(const [,reference] of markup.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(reference),reference);
   for(const [,href] of markup.matchAll(/\bhref="([^"]+)"/g))assert.ok(href.startsWith('/legacy/assets/'),href);
  }
 }
});

test('carousel grouping and anchor restoration keep chronological articles once at every breakpoint',async()=>{
 const {groupPosts,pageContaining}=await import('../src/features/home/carousel-model.ts');
 const items=Array.from({length:29},(_,i)=>({slug:`post-${i}`}));
 for(const size of [6,4,2,1]){
  const groups=groupPosts(items,size);
  assert.deepEqual(groups.flat(),items);
  assert.ok(groups.every(group=>group.length<=size&&group.length>0));
  assert.equal(pageContaining(groups,'post-24'),Math.floor(24/size));
  assert.equal(pageContaining(groups,'missing'),0);
 }
 assert.deepEqual(groupPosts([],6),[]);
 assert.throws(()=>groupPosts(items,0),RangeError);
});

test('the reused wheel model preserves tall-grid scrolling, momentum lock and edge release',async()=>{
 const {createWheelPager,wheelPageVisible}=await import('../src/features/home/carousel-model.ts');
 assert.equal(wheelPageVisible({top:120,bottom:900,viewportHeight:720}),false);
 assert.equal(wheelPageVisible({top:120,bottom:650,viewportHeight:720}),true);
 const wheel=createWheelPager();
 const event={page:0,pageCount:5,deltaY:80,time:1000};
 assert.deepEqual(wheel(event),{consume:true,page:1});
 assert.deepEqual(wheel({...event,page:1,time:1100}),{consume:true,page:null});
 assert.deepEqual(wheel({...event,page:4,time:2000}),{consume:false,page:null});
 assert.deepEqual(wheel({...event,ctrlKey:true,time:2500}),{consume:false,page:null});
 assert.deepEqual(wheel({...event,deltaX:100,time:3000}),{consume:false,page:null});
});

test('Home preparation skips incomplete published translations and empty slugs without breaking other pages',async()=>{
 const {homeSummaries}=await import('./home-content.mjs');
 const {posts}=await import('../../blog-data.mjs');
 const post=posts.find(item=>item.status==='published'&&item.fa&&item.en);
 const result=homeSummaries([post,{...post,slug:'no-english',en:null},{...post,slug:'no-persian',fa:null},{...post,slug:''}]);
 assert.equal(result.length,1);
 assert.equal(result[0].slug,post.slug);
 assert.deepEqual(homeSummaries([]),[]);
});

test('static carousel controls do not advertise buttons that require unavailable JavaScript',()=>{
 for(const lang of ['fa','en'])assert.ok(!/<button[^>]*data-home-step=/.test(htmlAt(lang)));
});

test('Home keeps text-only articles usable and rejects unsafe or incomplete cover metadata',async()=>{
 const {homeSummaries}=await import('./home-content.mjs');
 const {posts}=await import('../../blog-data.mjs');
 const post=posts.find(item=>item.status==='published'&&item.fa&&item.en);
 const [missing]=homeSummaries([{...post,cover:null}]);
 assert.equal(missing.cover?.fa,null);
 const [unsafe]=homeSummaries([{...post,cover:{...post.cover,fa:{...post.cover.fa,src:'C:/private/photo.webp'}}}]);
 assert.equal(unsafe.cover.fa,null);
 assert.equal(unsafe.cover.en.src,post.cover.en.src);
});
