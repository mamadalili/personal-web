import test from 'node:test';
import assert from 'node:assert/strict';
import { workStoryTopics, workRoleNarratives, visibleWorkStories } from '../work-stories-data.mjs';
import { selectWorkRole, workStoryHref } from '../work-stories-model.mjs';
import { posts } from '../blog-data.mjs';
import {readFileSync} from 'node:fs';

const completeArticle={slug:'a-real-story',status:'published',fa:{title:'روایت',excerpt:'خلاصهٔ روایت'},en:{title:'Story',excerpt:'Story summary'},sections:[{id:'experience',fa:{title:'تجربه'},en:{title:'Experience'},blocks:[{type:'paragraph',fa:'متن تجربهٔ واقعی',en:'The actual experience.'}]}]};
const roleFixture={id:'turbin',fa:{company:'آنلاین تحریر',role:'سرپرست دیجیتال مارکتینگ',points:['راه‌اندازی و مدیریت فروش آنلاین (E-Commerce).','هدایت تیم پنج‌نفرهٔ دیجیتال، محتوا و پشتیبانی فروش آنلاین.']},en:{company:'Online Tahrir',role:'Digital Marketing Supervisor',points:['Launching and managing online sales (e-commerce).','Leading a five-person digital, content and online-sales support team.']}};

test('every CV role retains five stable editable story slots without invented editorial titles',()=>{
  const jobs=['boomerang','turbin','can','datis','binici','safir-lead','safir-field','asiatech'];
  assert.deepEqual(Object.keys(workStoryTopics),jobs);
  const ids=[];
  for(const job of jobs){
    assert.equal(workStoryTopics[job].length,5);
    for(const [index,story] of workStoryTopics[job].entries()){
      ids.push(story.id);
      assert.deepEqual(Object.keys(story).sort(),['id','post','sourceIndex']);
      assert.equal(story.sourceIndex,index);
      assert.equal(story.post,null);
    }
    for(const lang of ['fa','en']){
      assert.equal(workRoleNarratives[job][lang].situation,null);
      assert.equal(workRoleNarratives[job][lang].result,null);
      assert.equal(workRoleNarratives[job][lang].learning,null);
    }
  }
  assert.equal(new Set(ids).size,40);
});

test('visible story counts follow the requested 5/4/4/3 selection',()=>{
  const expected={boomerang:5,turbin:4,can:4,datis:3,binici:3,'safir-lead':3,'safir-field':3,asiatech:3};
  let total=0;
  for(const [id,count] of Object.entries(expected)){assert.equal(visibleWorkStories(id).length,count,id);total+=count;}
  assert.equal(total,28);
  for(const id of ['missing','__proto__','constructor',null])assert.deepEqual(visibleWorkStories(id),[]);
});

test('unknown role query values fall back to a real role rather than an empty page',()=>{
  const roles=[{id:'boomerang'},{id:'safir-field'},{id:'asiatech'}];
  assert.equal(selectWorkRole(roles,'safir-field'),roles[1]);
  for(const value of [null,'missing','__proto__','<script>'])assert.equal(selectWorkRole(roles,value),roles[0]);
  assert.equal(selectWorkRole([],null),null);
});

test('only a published story with both native versions receives an article link',()=>{
  const article=completeArticle,story={post:article.slug};
  assert.equal(workStoryHref({post:null},'fa',[article],'https://site.test/portfolio/'),null);
  assert.equal(workStoryHref(story,'fa',[{...article,status:'draft'}],'https://site.test/'),null);
  assert.equal(workStoryHref(story,'fa',[{...article,template:true}],'https://site.test/'),null);
  assert.equal(workStoryHref(story,'fa',[{...article,en:null}],'https://site.test/'),null);
  assert.equal(workStoryHref({post:'missing'},'fa',[article],'https://site.test/'),null);
  assert.equal(workStoryHref(story,'en',[article],'https://site.test/portfolio/'),'https://site.test/portfolio/article.html?post=a-real-story&lang=en');
});

test('publication guard supports existing complete article formats',()=>{
  for(const post of posts.filter(post=>post.status==='published'&&!post.template))for(const lang of ['fa','en'])assert.ok(workStoryHref({post:post.slug},lang,posts,'https://site.test/'),post.slug+' '+lang);
});

test('CV preview cards use shared career points and mark unsupported slots as needs completion',async()=>{
  const {renderCareerStoryCards}=await import('../work-story-cards.mjs');
  for(const lang of ['fa','en']){
    const html=renderCareerStoryCards(roleFixture,lang,'https://site.test/portfolio/profile.html');
    assert.equal((html.match(/class="story-preview-card/g)||[]).length,4);
    for(const point of roleFixture[lang].points)assert.ok(html.includes(point));
    assert.ok(html.includes(lang==='fa'?'نیازمند تکمیل':'Needs completion'));
    assert.ok(html.includes('story-preview-card--missing'));
    assert.ok(html.includes('role=turbin'));
    assert.ok(!html.includes('راه‌اندازی فروش آنلاین با یک تیم کوچک'));
    assert.ok(!html.includes('Launching online sales with a small team'));
  }
  assert.equal(renderCareerStoryCards(null,'fa','https://site.test/'),'');
});

test('current CV copy uses source-backed tenure and exact professional title',()=>{
  const portfolio=readFileSync(new URL('../portfolio.js',import.meta.url),'utf8');
  assert.ok(portfolio.includes("['۱۵+','سال سابقهٔ حرفه‌ای']"));
  assert.ok(portfolio.includes("['15+','years of professional experience']"));
  assert.ok(portfolio.includes("role:'مارکتر و اپراتور هوش مصنوعی'"));
  assert.ok(!portfolio.includes('۱۸+'));
  assert.ok(!portfolio.includes('More than 18 years'));
  assert.ok(!portfolio.includes('مدیریت تیم و اپراتوری هوش مصنوعی'));
});

test('story consumers use the source-backed release module',()=>{
  for(const file of ['../work-stories.mjs','../work-story-cards.mjs']){
    const text=readFileSync(new URL(file,import.meta.url),'utf8');
    assert.ok(text.includes("work-stories-data.mjs?v=20261103-cv-source"),file);
  }
});
