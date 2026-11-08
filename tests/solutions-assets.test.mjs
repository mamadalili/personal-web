import test from 'node:test';
import assert from 'node:assert/strict';

test('Solutions renders its own artwork when an older HTML shell has no art script',async()=>{
 assert.equal(typeof globalThis.renderHomeCapabilityArt,'undefined');
 const {mountSolutions}=await import('../solutions.mjs');
 const oldDocument=globalThis.document,oldLocation=globalThis.location;
 globalThis.document={title:'',querySelector:()=>({content:''})};
 globalThis.location={href:'https://example.com/strategy.html?lang=fa'};
 try{
  const root={classList:{add(){}},innerHTML:''};
  mountSolutions(root,{language:'fa',solution:'strategy',url:id=>`${id}.html?lang=fa`,icon:()=>'',collaboration:()=>''});
  assert.equal((root.innerHTML.match(/class="home-folder-art"/g)||[]).length,4);
  assert.match(root.innerHTML,/aria-current="page"/);
  assert.equal((root.innerHTML.match(/class="home-folder-link"/g)||[]).length,4);
 }finally{
  if(oldDocument===undefined)delete globalThis.document;else globalThis.document=oldDocument;
  if(oldLocation===undefined)delete globalThis.location;else globalThis.location=oldLocation;
 }
});

test('an old shell receives the selector stylesheet once and waits for its load',async()=>{
 const {prepareSolutions}=await import('../solutions.mjs');
 let added=0,link;
 const events={};
 const doc={
  querySelectorAll:()=>link?[link]:[],
  createElement:()=>({addEventListener:(name,fn)=>{events[name]=fn;}}),
  head:{append:node=>{link=node;added++;}},
 };
 const first=prepareSolutions(doc),second=prepareSolutions(doc);
 assert.equal(added,1);
 assert.match(link.href,/solution-portals\.css/);
 let ready=false;first.then(()=>{ready=true;});
 await Promise.resolve();
 assert.equal(ready,false);
 events.load();
 await Promise.all([first,second]);
 assert.equal(ready,true);
});

test('a stylesheet that already failed is replaced instead of waiting for its past event',async()=>{
 const {prepareSolutions}=await import('../solutions.mjs');
 const href=new URL('../solution-portals.css?v=20261102-shared-cards',import.meta.url).href;
 let added=0,oldRemoved=false;
 const events={};
 const old={href,sheet:null,addEventListener(){},remove(){oldRemoved=true;}};
 const doc={querySelectorAll:()=>[old],createElement:()=>({addEventListener:(name,fn)=>{events[name]=fn;},remove(){}}),head:{append(){added++;}}};
 const ready=prepareSolutions(doc);
 assert.equal(added,1,'A fresh link can emit a new load/error event');
 events.load();
 await ready;
 assert.equal(oldRemoved,true);
});

test('a new stylesheet failure rejects and a later attempt makes a fresh request',async()=>{
 const {prepareSolutions}=await import('../solutions.mjs');
 let added=0,removed=0;
 const events={};
 const doc={querySelectorAll:()=>[],createElement:()=>({addEventListener:(name,fn)=>{events[name]=fn;},remove(){removed++;}}),head:{append(){added++;}}};
 const failed=prepareSolutions(doc);
 const rejected=assert.rejects(failed,/stylesheet could not be loaded/);
 events.error();
 await rejected;
 assert.equal(removed,1);
 const retry=prepareSolutions(doc);
 assert.equal(added,2);
 events.load();
 await retry;
});

test('Home folder links keep four native solutions and escaped labels with unique decorative IDs',async()=>{
 const {renderHomeFolderCards}=await import('../solutions.mjs');
 for(const language of ['fa','en']){
  const markup=renderHomeFolderCards({language,url:id=>id+'.html?lang='+language,portals:{strategy:{title:'<Strategy>',text:'A & B'}}});
  assert.equal((markup.match(/class="home-folder-link"/g)||[]).length,4);
  for(const id of ['strategy','execution','technology','ai-tools'])assert.ok(markup.includes(id+'.html?lang='+language));
  assert.ok(markup.includes('&lt;Strategy&gt;'));
  assert.ok(markup.includes('A &amp; B'));
  const ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length);
  for(const [,id]of markup.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(id));
  assert.ok(!markup.includes('capability-portal--'));
 }
});
