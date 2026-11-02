import test from 'node:test';
import assert from 'node:assert/strict';
import { workStoryTopics } from '../work-stories-data.mjs';
import { selectWorkRole, workStoryHref } from '../work-stories-model.mjs';
import { posts } from '../blog-data.mjs';
import {readFileSync} from 'node:fs';

const completeArticle={slug:'a-real-story',status:'published',fa:{title:'روایت',excerpt:'خلاصهٔ روایت'},en:{title:'Story',excerpt:'Story summary'},sections:[{id:'experience',fa:{title:'تجربه'},en:{title:'Experience'},blocks:[{type:'paragraph',fa:'متن تجربهٔ واقعی',en:'The actual experience.'}]}]};

test('every existing job has five independent bilingual story plans, including both Safir roles and Asiatech',()=>{
  const jobs=['boomerang','turbin','can','datis','binici','safir-lead','safir-field','asiatech'];
  assert.deepEqual(Object.keys(workStoryTopics),jobs);
  const ids=[];
  for(const job of jobs){
    assert.equal(workStoryTopics[job].length,5);
    for(const story of workStoryTopics[job]){
      ids.push(story.id);
      for(const language of ['fa','en'])assert.ok(story[language].title.trim());
      assert.equal(story.post,null);
    }
  }
  assert.equal(new Set(ids).size,40);
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

test('visible story counts follow the author’s 5/4/4/3 selection without deleting original plans',async()=>{
  const {visibleWorkStories}=await import('../work-stories-data.mjs');
  const expected={boomerang:5,turbin:4,can:4,datis:3,binici:3,'safir-lead':3,'safir-field':3,asiatech:3};
  let total=0;
  for(const [id,count] of Object.entries(expected)){
    const visible=visibleWorkStories(id);
    assert.equal(visible.length,count,id);
    assert.deepEqual(visible,workStoryTopics[id].slice(0,count));
    assert.equal(workStoryTopics[id].length,5);
    total+=visible.length;
  }
  assert.equal(total,28);
  for(const id of ['missing','__proto__','constructor',null])assert.deepEqual(visibleWorkStories(id),[]);
});

test('CV cards use native titles and link to the actual role and outline without promising publication',async()=>{
  const {renderCareerStoryCards}=await import('../work-story-cards.mjs');
  for(const lang of ['fa','en']){
    const html=renderCareerStoryCards('turbin',lang,'https://site.test/portfolio/profile.html');
    assert.equal((html.match(/class="story-preview-card"/g)||[]).length,4);
    for(const story of workStoryTopics.turbin.slice(0,4)){
      assert.ok(html.includes(story[lang].title));
      assert.ok(html.includes('role=turbin'));
      assert.ok(html.includes(`story=${story.id}#${story.id}`));
    }
    assert.ok(html.includes(lang==='fa'?'طرح روایت':'Story outline'));
    assert.ok(!html.includes('article.html'));
    assert.ok(!html.includes('after-sales'));
  }
  assert.equal(renderCareerStoryCards('__proto__','fa','https://site.test/'),'');
});

test('a mapped story uses a neutral CV label instead of remaining an unpublished outline',async()=>{
  const {renderCareerStoryCards}=await import('../work-story-cards.mjs');
  const stories=workStoryTopics.turbin.slice(0,4).map((story,index)=>index===0?{...story,post:completeArticle.slug}:story);
  for(const lang of ['fa','en']){
    const html=renderCareerStoryCards('turbin',lang,'https://site.test/profile.html',stories);
    assert.ok(html.includes(lang==='fa'?'>روایت کاری<':'>Work story<'));
    assert.ok(!html.includes('article.html'));
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
