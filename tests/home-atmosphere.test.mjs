import test from 'node:test';
import assert from 'node:assert/strict';
import {renderHomeAtmosphere,mountHomeAtmosphere} from '../home-atmosphere.mjs';

test('Home decorative motion pauses for user choice, offscreen and hidden tabs and disposes listeners',()=>{
 const previousDocument=globalThis.document,previousObserver=globalThis.IntersectionObserver;
 try{
  for(const language of ['fa','en']){
   const doc=new EventTarget();doc.hidden=false;globalThis.document=doc;
   let update,disconnected=false,watched;
   globalThis.IntersectionObserver=class{
    constructor(callback){update=callback;}
    observe(node){watched=node;}
    disconnect(){disconnected=true;}
   };
   const classes=new Set(),hero={},root={innerHTML:'',classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name),add:name=>classes.add(name)},closest:()=>hero};
   const attrs={},button=new EventTarget();button.setAttribute=(name,value)=>{attrs[name]=value;};
   const dispose=mountHomeAtmosphere(root,{button,language});
   assert.equal(watched,hero);assert.ok(classes.has('is-paused'));
   assert.equal((root.innerHTML.match(/class="home-atmosphere-spark(?: |")/g)||[]).length,12);
   update([{isIntersecting:true}]);assert.ok(!classes.has('is-paused'));
   button.dispatchEvent(new Event('click'));assert.equal(attrs['aria-pressed'],'true');assert.ok(classes.has('is-paused'));
   assert.equal(attrs['aria-label'],language==='fa'?'پخش حرکت پس‌زمینه':'Play background motion');
   button.dispatchEvent(new Event('click'));assert.ok(!classes.has('is-paused'));
   doc.hidden=true;doc.dispatchEvent(new Event('visibilitychange'));assert.ok(classes.has('is-paused'));
   doc.hidden=false;doc.dispatchEvent(new Event('visibilitychange'));assert.ok(!classes.has('is-paused'));
   update([{isIntersecting:false}]);assert.ok(classes.has('is-paused'));
   dispose();assert.ok(disconnected);
   button.dispatchEvent(new Event('click'));assert.equal(attrs['aria-pressed'],'false');
  }
 }finally{
  if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;
  if(previousObserver===undefined)delete globalThis.IntersectionObserver;else globalThis.IntersectionObserver=previousObserver;
 }
});

test('Home background markup is decorative and has bounded independent particle positions',()=>{
 const markup=renderHomeAtmosphere();
 assert.ok(!/<script|foreignObject|href=|onload|onclick/i.test(markup));
 assert.equal((markup.match(/--spark-duration:/g)||[]).length,12);
 for(const [,position]of markup.matchAll(/(?:left|top):(\d+)%/g))assert.ok(+position>=0&&+position<=100);
});
