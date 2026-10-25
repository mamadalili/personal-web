import test from 'node:test';
import assert from 'node:assert/strict';
import { safeHref, internalHref, chartValues, estimateOrders, publishedPosts } from '../blog-core.mjs';

test('article links cannot execute scripts or embed documents', () => {
  for (const href of ['javascript:alert(1)', 'data:text/html,test', 'vbscript:msgbox(1)', 'file:///private', '//unknown.test']) {
    assert.equal(safeHref(href, 'fa', [], 'https://site.test/personal-web/blog.html'), null);
  }
});

test('internal links keep language, CV tab and the hosting subdirectory', () => {
  assert.equal(internalHref('cv:projects', 'fa', [], 'https://site.test/personal-web/blog.html'), 'https://site.test/personal-web/profile.html?tab=projects&lang=fa');
  assert.equal(safeHref('#calculator', 'en', [], 'https://site.test/personal-web/article.html?post=one&lang=en'), '#calculator');
  assert.equal(safeHref('https://example.org/source', 'fa', []), 'https://example.org/source');
});

test('internal article links never point to unknown, draft or template posts', () => {
  const posts = [{slug:'live',status:'published'}, {slug:'draft',status:'draft'}, {slug:'demo',status:'published',template:true}];
  assert.equal(internalHref('post:missing', 'en', posts), null);
  assert.equal(internalHref('post:draft', 'en', posts), null);
  assert.equal(internalHref('post:demo', 'en', posts), null);
  assert.equal(internalHref('post:live', 'en', posts, 'https://site.test/blog.html'), 'https://site.test/article.html?post=live&lang=en');
});

test('changing chart metrics calculates ratios and preserves missing values', () => {
  const series = {values:{visits:[1000,0,800],orders:[20,0,24]}};
  assert.deepEqual(chartValues(series,{key:'orders'}),[20,0,24]);
  assert.deepEqual(chartValues(series,{numerator:'orders',denominator:'visits',multiplier:100}),[2,null,3]);
  assert.deepEqual(chartValues({values:{orders:[10,NaN,Infinity]}},{key:'orders'}),[10,null,null]);
});

test('simulator uses the entered percentage and rejects invalid inputs', () => {
  assert.equal(estimateOrders(10000,2),200);
  assert.equal(estimateOrders(10000,3.5),350);
  assert.equal(estimateOrders(0,2),0);
  assert.equal(estimateOrders(1000,0),0);
  for (const [visits,rate] of [[-1,2],[1000,-2],[1000,101],[Infinity,2],['',2],[1000,'no']]) assert.equal(estimateOrders(visits,rate),null);
});

test('blog listings omit drafts and template previews and sort published dates', () => {
  const posts = [{slug:'older',status:'published',date:'2025-01-01'}, {slug:'draft',status:'draft'}, {slug:'demo',status:'published',template:true}, {slug:'newer',status:'published',date:'2026-01-01'}];
  assert.deepEqual(publishedPosts(posts).map(post=>post.slug),['newer','older']);
});
