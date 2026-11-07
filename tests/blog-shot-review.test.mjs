import test from 'node:test';
import assert from 'node:assert/strict';
import {shotChecks,shotReview,shotReviewSheet} from '../blog-shot-review-model.mjs';
import {post} from '../posts/ai-video-production.mjs';
import {createShotReviews} from '../blog-shot-review.mjs';

test('all sixteen review states retain the intended object and report exactly the unresolved details',()=>{
  for(let mask=0;mask<16;mask++){
    const selected=shotChecks.filter((key,index)=>mask&(1<<index)),state=shotReview(selected);
    assert.equal(state.first.present,selected.includes('present'));
    assert.equal(state.last.present,true);
    assert.equal(state.last.width===state.first.width,selected.includes('size'));
    assert.equal(state.last.ribbon===state.first.ribbon,selected.includes('ribbon'));
    assert.equal(state.last.x>state.first.x,selected.includes('direction'));
    assert.deepEqual(state.unresolved,shotChecks.filter(key=>!selected.includes(key)));
    assert.equal(state.aligned,mask===15);
    for(const frame of [state.first,state.last]){
      assert.ok(frame.x-frame.width/2>=0);
      assert.ok(frame.x+frame.width/2<=100);
    }
  }
});

test('unknown fixes cannot satisfy a review and the input is not mutated',()=>{
  const fixes=['present','present','unrecognised'];const before=[...fixes];
  assert.deepEqual(shotReview(fixes).unresolved,['size','ribbon','direction']);
  assert.deepEqual(fixes,before);
  assert.equal(shotReview(null).aligned,false);
});

test('both worksheet languages retain review limits and distinguish corrected details',()=>{
  const fa=shotReviewSheet(['present'],'fa'),en=shotReviewSheet(shotChecks,'en');
  assert.match(fa,/تحلیل فایل واقعی نیست/);assert.match(fa,/هنوز ناهماهنگ/);
  assert.match(en,/no real file was analysed/);assert.match(en,/do not guarantee video quality/);
  assert.doesNotMatch(en,/still inconsistent/);
});

test('schematic frames have native readable alternatives including size and screen position',()=>{
  const block=post.sections.flatMap(section=>section.blocks).find(item=>item.type==='shot-review');
  for(const lang of ['fa','en']){
    const widget=createShotReviews({lang,signal:new AbortController().signal}).render(block,'sample');
    assert.match(widget,/aria-live="polite"/);
    assert.match(widget,lang==='fa'?/بزرگ‌تر از مرجع/:/larger than reference/);
    assert.match(widget,lang==='fa'?/سمت چپ تصویر/:/screen-left/);
    assert.match(widget,lang==='fa'?/این ابزار عکس یا ویدیو را تحلیل نمی‌کند/:/does not analyse images or video/);
  }
});

test('the video article retains native copy, source limits and the paired artwork',()=>{
  assert.equal(post.status,'published');assert.equal(post.bannerPair.position,2);
  assert.equal(post.bannerPair.id,'ink-vermilion-teal-pair');
  assert.equal(post.sections.filter(s=>s.blocks.some(b=>b.type==='shot-review')).length,1);
  assert.ok(post.sources.some(source=>source.id==='eian-video'&&source.date==='2026-11-05'));
  assert.ok(post.sections.some(s=>s.blocks.some(b=>b.type==='image')));
  for(const lang of ['fa','en']){
    assert.ok(post[lang].readTime);assert.ok(post.cover[lang].alt);
    for(const section of post.sections){
      assert.ok(section[lang].title);
      for(const block of section.blocks){
        if(block.type==='paragraph')assert.ok(block[lang].length>30);
        if(block.type==='tabs')assert.ok(block.items.every(row=>row[lang].label&&row[lang].text));
        if(block.type==='decision-audit')assert.ok(block.items.every(row=>row[lang].label&&row[lang].next));
      }
    }
  }
});
