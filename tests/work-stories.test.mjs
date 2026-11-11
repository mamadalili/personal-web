import test from 'node:test';
import assert from 'node:assert/strict';
import { workStoryTopics } from '../work-stories-data.mjs';
import { selectWorkRole, workStoryHref } from '../work-stories-model.mjs';
import { posts } from '../blog-data.mjs';
import {readFileSync} from 'node:fs';

const completeArticle={slug:'a-real-story',status:'published',fa:{title:'روایت',excerpt:'خلاصهٔ روایت'},en:{title:'Story',excerpt:'Story summary'},sections:[{id:'experience',fa:{title:'تجربه'},en:{title:'Experience'},blocks:[{type:'paragraph',fa:'متن تجربهٔ واقعی',en:'The actual experience.'}]}]};

const counts = {boomerang:6,turbin:5,can:3,datis:3,binici:2,'safir-lead':3,'safir-field':3,asiatech:3};
const companies = {boomerang:'بومرنگ',turbin:'آنلاین تحریر',can:'لوازم خانگی کن',datis:'پویش رایان داتیس',binici:'بی‌نی‌سی'};

test('the nineteen published topics have distinct bilingual articles, employer subtitles and exercises',()=>{
  assert.deepEqual(Object.keys(workStoryTopics),Object.keys(counts));
  const slugs=new Set();
  for(const [role,topics] of Object.entries(workStoryTopics)) for(const story of topics){
    if (!story.post) continue;
    const article=posts.find(item=>item.slug===story.post);
    assert.equal(article.fa.subtitle,'در '+companies[role]);
    assert.ok(article.en.subtitle.startsWith('At '));
    for(const lang of ['fa','en']){
      assert.equal(article[lang].title,story[lang].title);
      assert.equal(article[lang].category,lang==='fa'?'روایت‌های کاری':'Work stories');
      assert.ok(workStoryHref(story,lang,posts));
      const quiz=article.sections.flatMap(s=>s.blocks).find(b=>b.type==='quiz');
      assert.ok(quiz.options.length>=2 && quiz.options.every(o=>o[lang].feedback));
    }
    assert.ok(!slugs.has(story.post));
    slugs.add(story.post);
  }
  assert.equal(slugs.size,19);
});

test('unknown role query values fall back to a real role rather than an empty page',()=>{
  const roles=[{id:'boomerang'},{id:'safir-field'},{id:'asiatech'}];
  assert.equal(selectWorkRole(roles,'safir-field'),roles[1]);
  for(const value of [null,'missing','__proto__','<script>'])assert.equal(selectWorkRole(roles,value),roles[0]);
  assert.equal(selectWorkRole([],null),null);
});

test('only a published story with both native versions receives an article link',()=>{
  const article=completeArticle;
  const story={post:article.slug};
  assert.equal(workStoryHref({post:null},'fa',[article],'https://site.test/portfolio/'),null);
  assert.equal(workStoryHref(story,'fa',[{...article,status:'draft'}],'https://site.test/'),null);
  assert.equal(workStoryHref(story,'fa',[{...article,template:true}],'https://site.test/'),null);
  assert.equal(workStoryHref(story,'fa',[{...article,en:null}],'https://site.test/'),null);
  assert.equal(workStoryHref({post:'missing'},'fa',[article],'https://site.test/'),null);
  assert.equal(workStoryHref(story,'en',[article],'https://site.test/portfolio/'),'https://site.test/portfolio/article.html?post=a-real-story&lang=en');
});

test('translated titles cannot expose an empty or partially translated article body',()=>{
  const story={post:completeArticle.slug},section=completeArticle.sections[0];
  const incomplete=[
    {...completeArticle,sections:[]},
    {...completeArticle,sections:[{...section,en:null}]},
    {...completeArticle,sections:[{...section,blocks:[]}]},
    {...completeArticle,sections:[{...section,blocks:[{type:'paragraph',fa:'متن',en:''}]}]},
    {...completeArticle,sections:[{...section,blocks:[{type:'tabs',items:[{fa:{label:'انتخاب',title:'عنوان',text:'متن'},en:{label:'Choice',title:'Title'}}]}]}]}
  ];
  for(const article of incomplete)for(const lang of ['fa','en'])assert.equal(workStoryHref(story,lang,[article],'https://site.test/'),null);
});

test('publication guard supports the existing complete article formats',()=>{
  for(const post of posts.filter(post=>post.status==='published'&&!post.template))for(const lang of ['fa','en'])assert.ok(workStoryHref({post:post.slug},lang,posts,'https://site.test/'),`${post.slug} ${lang}`);
});

test('each employer exposes the approved selection and unpublished roles retain their original plans',async()=>{
  const {visibleWorkStories}=await import('../work-stories-data.mjs');
  for(const [id,count] of Object.entries(counts)){
    const visible=visibleWorkStories(id);
    assert.equal(visible.length,count,id);
    assert.deepEqual(visible,workStoryTopics[id].slice(0,count));
    assert.equal(visible.every(row=>!!row.post),Object.hasOwn(companies,id));
    if (!Object.hasOwn(companies,id)) assert.equal(workStoryTopics[id].length,5);
  }
  for(const id of ['missing','__proto__','constructor',null]) assert.deepEqual(visibleWorkStories(id),[]);
});

test('CV cards link directly to complete articles and keep navigable outlines for unpublished stories',async()=>{
  const {renderCareerStoryCards}=await import('../work-story-cards.mjs');
  const {visibleWorkStories}=await import('../work-stories-data.mjs');
  for(const lang of ['fa','en']) for(const role of Object.keys(counts)){
    const html=renderCareerStoryCards(role,lang,'https://site.test/portfolio/profile.html');
    assert.equal((html.match(/class="story-preview-card"/g)||[]).length,counts[role]);
    for(const story of visibleWorkStories(role)){
      assert.ok(html.includes(story[lang].title));
      assert.ok(html.includes(story.post?'article.html?post='+story.post+'&amp;lang='+lang:'story='+story.id+'#'+story.id));
    }
  }
  assert.equal(renderCareerStoryCards('__proto__','fa','https://site.test/'),'');
});

test('unpublished mappings cannot expose a broken blog link or thumbnail in CV',async()=>{
  const {renderCareerStoryCards}=await import('../work-story-cards.mjs');
  const missing={...workStoryTopics.turbin[0],post:'not-published'};
  for(const lang of ['fa','en']){
    const html=renderCareerStoryCards('turbin',lang,'https://site.test/profile.html',[missing]);
    assert.ok(!html.includes('article.html') && !html.includes('<img'));
  }
});

test('new selector consumers and the historical CV entry use versioned release URLs',()=>{
  for(const file of ['../work-stories.mjs','../work-story-cards.mjs']){
    const text=readFileSync(new URL(file,import.meta.url),'utf8');
    assert.ok(/from ['"]\.\/work-stories-data\.mjs\?v=[^'"]+['"]/.test(text),file);
  }
  const entry=readFileSync(new URL('../index.html',import.meta.url),'utf8').match(/src="portfolio\.js\?v=(\d{8})-[^"]+"/);
  assert.ok(entry&&Number(entry[1])>=20261102);
});
