import test from 'node:test';
import assert from 'node:assert/strict';
import {contextLab,brainCheck} from '../posts/company-brain-data.mjs';
import {post} from '../posts/company-brain.mjs';
import {validContextLab,contextAnswer,validBrainCheck,brainReadiness} from '../blog-company-brain-model.mjs';
import {createCompanyBrains} from '../blog-company-brain.mjs';

test('an approved revision replaces an expired policy; a newer chat cannot silently override it',()=>{
 assert.ok(validContextLab(contextLab));
 const source=JSON.stringify(contextLab);
 assert.equal(contextAnswer(contextLab,'support','before').answer.id,'old-policy');
 assert.equal(contextAnswer(contextLab,'support','revised').answer.id,'current-policy');
 const latest=contextAnswer(contextLab,'support','new-chat');
 assert.equal(latest.answer.id,'current-policy');
 assert.ok(latest.documents.some(row=>row.id==='recent-chat'&&row.state==='unreviewed'));
 assert.equal(latest.documents.find(row=>row.id==='old-policy').current,false);
 assert.equal(JSON.stringify(contextLab),source);
});

test('the educational role filter excludes inaccessible records before answer selection',()=>{
 const guest=contextAnswer(contextLab,'guest','new-chat');
 assert.equal(guest.status,'insufficient');assert.equal(guest.answer,null);
 assert.deepEqual(guest.documents.map(row=>row.id),['public-help']);
 assert.ok(!contextAnswer(contextLab,'support','new-chat').documents.some(row=>row.id==='finance-note'));
 const finance=contextAnswer(contextLab,'finance','new-chat');
 assert.ok(finance.documents.some(row=>row.id==='finance-note'));assert.equal(finance.answer.id,'current-policy');
 assert.equal(contextAnswer(contextLab,'__proto__','unknown').role.id,'guest');
});

test('conflicting valid claims and missing permission do not produce a confident policy answer',()=>{
 const block=structuredClone(contextLab);block.documents.find(row=>row.id==='old-policy').validUntil=null;
 assert.equal(contextAnswer(block,'support','new-chat').status,'conflict');
 assert.equal(contextAnswer(block,'support','new-chat').answer,null);
 const revoked=structuredClone(contextLab);revoked.documents.find(row=>row.id==='current-policy').roles=['finance'];
 assert.equal(contextAnswer(revoked,'support','new-chat').status,'insufficient');
});

test('a published policy with a future effective date is visible but cannot apply early',()=>{
 const block=structuredClone(contextLab),policy=block.documents.find(row=>row.id==='current-policy');
 policy.published='2026-10-10';assert.ok(validContextLab(block));
 const before=contextAnswer(block,'support','before');assert.equal(before.answer.id,'old-policy');
 assert.equal(before.documents.find(row=>row.id===policy.id).validity,'future');
});

test('the author’s test means all foundations AND at least one extra, not any four out of five',()=>{
 assert.ok(validBrainCheck(brainCheck));
 for(let mask=0;mask<32;mask++){
  const checked=brainCheck.criteria.filter((_,i)=>mask&(1<<i)).map(row=>row.id);
  const expected=['ingest','access','agents'].every(id=>checked.includes(id))&&['ownership','history'].some(id=>checked.includes(id));
  assert.equal(brainReadiness(brainCheck,checked).passes,expected,checked.join(','));
 }
 assert.equal(brainReadiness(brainCheck,['unknown','ingest','access','agents']).passes,false);
});

test('bad identities, missing translations and impossible dates fail without rendering a misleading answer',()=>{
 const duplicate=structuredClone(contextLab);duplicate.documents[1].id=duplicate.documents[0].id;
 const broken=structuredClone(contextLab);delete broken.documents[0].en.owner;
 const date=structuredClone(contextLab);date.documents[0].published='2026-02-31';
 for(const block of [null,{},duplicate,broken,date,{...contextLab,roles:[null]}]){
  assert.equal(validContextLab(block),false);assert.equal(contextAnswer(block,'support','before'),null);
 }
 const check=structuredClone(brainCheck);delete check.criteria[0].en.label;
 assert.equal(brainReadiness(check,[]),null);
});

test('native widgets escape authored labels, use scoped source links and expose accessible results',()=>{
 const block=structuredClone(contextLab);block.fa.title='<img src=x onerror=alert(1)>';
 const widget=createCompanyBrains({lang:'fa',signal:new AbortController().signal});
 const html=widget.render(block,'demo-a'),other=widget.render(contextLab,'demo-b');
 assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img src=x'));
 assert.ok(html.includes('href="#demo-a-doc-current-policy"'));
 assert.ok(other.includes('href="#demo-b-doc-current-policy"'));
 assert.ok(!html.includes('id="demo-a-doc-finance-note"'));
 assert.ok(html.includes('aria-live="polite"'));
 const check=widget.render(brainCheck,'check');assert.equal((check.match(/type="checkbox"/g)||[]).length,5);
});

test('the article combines all three sources with native explanatory prose and fictional evidence',()=>{
 for(const id of ['2117223917701972007','2077822555159945507','2077835543464054890'])assert.ok(post.sources.some(row=>row.url.includes(id)));
 assert.equal(post.sections.length,9);
 const blocks=post.sections.flatMap(section=>section.blocks);
 assert.equal(blocks.filter(block=>block.type==='context-lab').length,1);
 assert.equal(blocks.filter(block=>block.type==='brain-check').length,1);
 assert.ok(!blocks.some(block=>['chart','simulator','data-motion'].includes(block.type)));
 for(const lang of ['fa','en'])assert.ok(blocks.filter(block=>block.type==='paragraph').map(block=>block[lang]).join(' ').split(/\s+/).length>1000);
});
