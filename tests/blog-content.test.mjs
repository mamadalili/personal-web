import test from 'node:test';
import assert from 'node:assert/strict';
import {composeContentPrompt,createContentStarter} from '../blog-content-model.mjs';

const fa={lang:'fa',tool:'chatgpt',goal:'trust',audience:'صاحبان فروشگاه‌های کوچک',note:'خریدار دربارهٔ اندازهٔ محصول پرسید؛ اندازهٔ دقیق هنوز در یادداشت من نیست.'};

test('content instructions distinguish uploaded Project sources from a Claude Code folder',()=>{
 const project=composeContentPrompt(fa),local=composeContentPrompt({...fa,tool:'claude'});
 assert.match(project,/ChatGPT Project/);assert.match(project,/بارگذاری/);
 assert.doesNotMatch(project,/ابتدا CLAUDE\.md را بخوان/);
 assert.match(local,/ابتدا CLAUDE\.md را بخوان/);
 assert.match(local,/فایل موجود/);
});

test('a change of objective changes the requested reader action rather than only its label',()=>{
 const trust=composeContentPrompt(fa),enquiry=composeContentPrompt({...fa,goal:'enquiry'}),learn=composeContentPrompt({...fa,goal:'learn'});
 assert.match(trust,/پرسش مخاطب/);assert.match(enquiry,/گفت‌وگو/);assert.match(learn,/آزمون/);
 assert.notEqual(trust,enquiry);assert.notEqual(trust,learn);
});

test('the composer preserves native user material as plain text and adds no invented evidence',()=>{
 const note='«اندازه؟»\n<script>alert(1)</script> & سؤال مشتری';
 const prompt=composeContentPrompt({...fa,note});
 assert.ok(prompt.includes(note));
 assert.match(prompt,/ادعای بی‌منبع/);
 assert.match(prompt,/منتشر نکن/);
 assert.doesNotMatch(prompt,/۲ برابر|100%|تضمین/);
});

test('both native routes produce usable English instructions without Persian labels',()=>{
 const prompt=composeContentPrompt({lang:'en',tool:'claude',goal:'enquiry',audience:'Small business owners',note:'A buyer asked which size fits. The measurements have not been provided.'});
 assert.match(prompt,/CLAUDE\.md/);assert.match(prompt,/conversation/);assert.match(prompt,/Do not publish/);
 assert.doesNotMatch(prompt,/[\u0600-\u06ff]/);
});

test('empty, oversized or unsupported inputs cannot become a ready-to-use prompt',()=>{
 for(const update of [{audience:''},{note:' '},{note:12},{note:'x'.repeat(1201)},{audience:'x'.repeat(141)},{tool:'other'},{goal:'viral'},{lang:'ar'}]){
  assert.equal(composeContentPrompt({...fa,...update}),null);
  assert.equal(createContentStarter({...fa,...update}),null);
 }
 assert.equal(composeContentPrompt(null),null);
});

test('the starter export carries the selected context plus an editable evidence and correction record',()=>{
 const starter=createContentStarter(fa);
 assert.ok(starter.includes(fa.audience));assert.ok(starter.includes(fa.note));
 for(const name of ['brief.md','evidence.md','voice.md','drafts.md','review.md','results.csv'])assert.ok(starter.includes(name));
 assert.match(starter,/نامعلوم/);assert.match(starter,/محدوده/);
 assert.doesNotMatch(starter,/undefined|TWITTERAPI|API_KEY/);
});

test('Markdown exports keep supplied code fences and HTML inside a longer literal fence',()=>{
 const note='```\n</textarea><script>bad()</script>\nاین یادداشت فقط متن است.';
 const starter=createContentStarter({...fa,note});
 const fence=starter.match(/\n(`+)text\n/)[1];
 assert.ok(fence.length>3);assert.ok(starter.includes(note));
 assert.equal(starter.split(`\n${fence}\n`).length,2);
});
