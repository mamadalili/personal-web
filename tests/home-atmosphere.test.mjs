import test from 'node:test';
import assert from 'node:assert/strict';
import {renderHomeAtmosphere,mountHomeAtmosphere} from '../home-atmosphere.mjs';

test('Home decorative motion pauses for user choice, offscreen and hidden tabs and disposes listeners',()=>{
 const previousDocument=globalThis.document,previousObserver=globalThis.IntersectionObserver,previousWindow=globalThis.window;
 try{
  for(const language of ['fa','en']){
   const doc=new EventTarget();doc.hidden=false;doc.documentElement={clientWidth:390};globalThis.document=doc;globalThis.window=new EventTarget();
   let update,disconnected=false,watched;
   globalThis.IntersectionObserver=class{
    constructor(callback){update=callback;}
    observe(node){watched=node;}
    disconnect(){disconnected=true;}
   };
   const sizes={},classes=new Set(),hero={},root={style:{setProperty:(name,value)=>{sizes[name]=value;}},innerHTML:'',classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name),add:name=>classes.add(name)},closest:()=>hero};
   const attrs={},button=new EventTarget();button.setAttribute=(name,value)=>{attrs[name]=value;};
   const dispose=mountHomeAtmosphere(root,{button,language});
   assert.equal(sizes['--home-viewport-width'],'390px');
   for(const width of [320,1440,2560]){doc.documentElement.clientWidth=width;globalThis.window.dispatchEvent(new Event('resize'));assert.equal(sizes['--home-viewport-width'],width+'px');}
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
   doc.documentElement.clientWidth=900;globalThis.window.dispatchEvent(new Event('resize'));assert.equal(sizes['--home-viewport-width'],'2560px');
   button.dispatchEvent(new Event('click'));assert.equal(attrs['aria-pressed'],'false');
  }
 }finally{
  if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;
  if(previousObserver===undefined)delete globalThis.IntersectionObserver;else globalThis.IntersectionObserver=previousObserver;
  if(previousWindow===undefined)delete globalThis.window;else globalThis.window=previousWindow;
 }
});

test('Home background markup is decorative and has bounded independent particle positions',()=>{
 const markup=renderHomeAtmosphere();
 assert.ok(!/<script|foreignObject|href=|onload|onclick/i.test(markup));
 assert.equal((markup.match(/--spark-duration:/g)||[]).length,12);
 for(const [,position]of markup.matchAll(/(?:left|top):(\d+)%/g))assert.ok(+position>=0&&+position<=100);
});
