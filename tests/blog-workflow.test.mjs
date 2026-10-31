import test from 'node:test';
import assert from 'node:assert/strict';
import { validateWorkflowBlock, workflowProjection } from '../blog-workflow-model.mjs';
import { renderArticleImage } from '../blog-inline-image.mjs';
import { post } from '../posts/ai-marketing-workflow.mjs';

const block = {
  type:'workflow',
  fa:{title:'مسیر کار',hint:'یک کار را انتخاب کن',source:'طرح پیشنهادی نویسنده'},
  en:{title:'Workflow',hint:'Select a job',source:'Author-proposed workflow'},
  stages:[{id:'research',fa:'تحقیق',en:'Research'},{id:'production',fa:'تولید',en:'Production'}],
  jobs:[
    {id:'listen',stage:'research',dependsOn:[],cadence:'weekly',gate:'human',fa:{title:'شنیدن',input:'نظر مشتری',output:'یادداشت',check:'منبع را بازبینی کن',cadence:'هفتگی'},en:{title:'Listen',input:'Review',output:'Note',check:'Verify source',cadence:'Weekly'}},
    {id:'draft',stage:'production',dependsOn:['listen'],cadence:'per-item',gate:'human',fa:{title:'پیش‌نویس',input:'یادداشت',output:'متن',check:'ادعا را بررسی کن',cadence:'برای هر مطلب'},en:{title:'Draft',input:'Note',output:'Copy',check:'Check claims',cadence:'Per item'}}
  ]
};

test('workflow projection keeps authored dependencies and stage filters',()=>{
  assert.equal(validateWorkflowBlock(block),true);
  assert.deepEqual(workflowProjection(block,'all','listen'),{visible:['listen','draft'],selected:'listen',before:[],after:['draft']});
  assert.deepEqual(workflowProjection(block,'production','draft'),{visible:['draft'],selected:'draft',before:['listen'],after:[]});
});

test('workflow rejects invented dependency targets and duplicate identities',()=>{
  assert.equal(validateWorkflowBlock({...block,jobs:[block.jobs[0],{...block.jobs[1],dependsOn:['absent']}]}),false);
  assert.equal(validateWorkflowBlock({...block,jobs:[block.jobs[0],{...block.jobs[1],id:'listen'}]}),false);
});

test('inline images require local WebP, dimensions and native alt/caption',()=>{
  const figure={type:'image',src:'assets/blog/marketing-research.webp',width:1600,height:1000,fa:{alt:'پژوهش',caption:'از داده تا پیام'},en:{alt:'Research',caption:'From evidence to message'}};
  const html=renderArticleImage(figure,'fa');
  assert.match(html,/loading="lazy"/);
  assert.match(html,/از داده تا پیام/);
  assert.equal(renderArticleImage({...figure,src:'https://bad.example/a.webp'},'fa'),'');
  assert.equal(renderArticleImage({...figure,src:'assets/blog/..%2Fa.webp'},'fa'),'');
  assert.equal(renderArticleImage({...figure,en:{alt:'',caption:'x'}},'en'),'');
});

test('published marketing article gives sourced, bilingual depth and in-body visuals',()=>{
  assert.equal(post.status,'published');
  assert.equal(post.fa.title,'تیم بازاریابی AI؛ فول خودکار در خدمت ما');
  assert.equal(post.en.title,'AI Marketing Team: Fully Automated, Working for Us');
  assert.equal(post.sources[0].url,'https://x.com/everestchris6/status/2115850129693688001');
  const blocks=post.sections.flatMap(section=>section.blocks);
  const map=blocks.find(block=>block.type==='workflow');
  assert.equal(validateWorkflowBlock(map),true);
  assert.equal(map.jobs.length,8);
  assert.equal(blocks.filter(block=>block.type==='image').length,2);
  assert.equal(blocks.filter(block=>block.type==='chart').length,0);
  for(const lang of ['fa','en']){
    const prose=blocks.flatMap(block=>[typeof block[lang]==='string'?block[lang]:block[lang]?.text||'',...(block.items||[]).map(item=>item[lang]?.text||'')]).join(' ');
    assert.ok(prose.trim().split(/\s+/).length>=1100,`${lang} article needs substantial original explanation`);
    for(const image of blocks.filter(block=>block.type==='image'))assert.match(renderArticleImage(image,lang),/figcaption/);
  }
});
