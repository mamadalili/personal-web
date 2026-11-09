import test from 'node:test';
import assert from 'node:assert/strict';
import {renderHomeAtmosphere,mountHomeAtmosphere} from '../home-atmosphere.mjs';

test('Shared site motion needs no controls and pauses in hidden tabs or when not visible',()=>{
 const previousDocument=globalThis.document,previousObserver=globalThis.IntersectionObserver;
 try{
  const doc=new EventTarget();doc.hidden=false;globalThis.document=doc;
  let update,disconnected=false,watched;
  globalThis.IntersectionObserver=class{
   constructor(callback){update=callback;} observe(node){watched=node;} disconnect(){disconnected=true;}
  };
  const classes=new Set(),root={innerHTML:'',classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name),add:name=>classes.add(name)}};
  const dispose=mountHomeAtmosphere(root);
  assert.equal(watched,root);assert.ok(classes.has('is-paused'));
  update([{isIntersecting:true}]);assert.ok(!classes.has('is-paused'));
  assert.ok(!root.innerHTML.includes('<button'));
  doc.hidden=true;doc.dispatchEvent(new Event('visibilitychange'));assert.ok(classes.has('is-paused'));
  doc.hidden=false;doc.dispatchEvent(new Event('visibilitychange'));assert.ok(!classes.has('is-paused'));
  update([{isIntersecting:false}]);assert.ok(classes.has('is-paused'));
  dispose();assert.ok(disconnected);
  doc.hidden=false;doc.dispatchEvent(new Event('visibilitychange'));assert.ok(classes.has('is-paused'));
 }finally{
  if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;
  if(previousObserver===undefined)delete globalThis.IntersectionObserver;else globalThis.IntersectionObserver=previousObserver;
 }
});

test('The shared landscape is a single decorative surface',()=>{
 assert.equal(renderHomeAtmosphere(), '<span class="home-atmosphere-surface"></span>');
});
