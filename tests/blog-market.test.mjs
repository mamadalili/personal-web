import test from 'node:test';
import assert from 'node:assert/strict';
import { logFraction, valuationMultiple, capitalPoints } from '../blog-market-model.mjs';
import { aiModelMarket } from '../posts/ai-model-market.mjs';
import { roundBound } from '../blog-core.mjs';
import { posts } from '../blog-data.mjs';

test('published related cards satisfy the shared native title and description contract', () => {
  for (const post of posts) for (const item of post.related || []) for (const lang of ['fa','en']) {
    assert.equal(typeof item[lang], 'object', `${post.slug}: ${lang} related copy`);
    assert.ok(typeof item[lang].title === 'string' && item[lang].title.trim());
    assert.ok(typeof item[lang].description === 'string' && item[lang].description.trim());
    assert.notEqual(item.target, `post:${post.slug}`);
  }
});

test('strict displayed bounds round outward, so they never promise more precision than the observation', () => {
  assert.equal(roundBound(965 / 65, '<', 1), 14.9);
  assert.equal(roundBound(21.395, '>', 1), 21.3);
  assert.ok(roundBound(965 / 65, '<', 1) >= 965 / 65);
});

test('market logarithmic placement preserves ratios and refuses missing or invalid data', () => {
  assert.equal(logFraction(1, 0.1, 1000), 0.25);
  assert.equal(logFraction(10, 0.1, 1000), 0.5);
  for (const value of [0, -1, null, undefined, Infinity, NaN]) assert.equal(logFraction(value, 0.1, 1000), null);
  assert.equal(logFraction(2, 10, 1), null);
  assert.equal(logFraction(2000, 0.1, 1000), 1);
});

test('valuation multiples preserve revenue floors as upper bounds, without treating unknowns as zero', () => {
  assert.deepEqual(valuationMultiple({ revenue: 40, valuation: 852 }), { value: 21.3, bound: '' });
  assert.deepEqual(valuationMultiple({ revenue: 2.5, revenueBound: '>', valuation: 25 }), { value: 10, bound: '<' });
  assert.deepEqual(valuationMultiple({ revenue: 0.9, revenueBound: '<', valuation: 48 }), { value: 48 / 0.9, bound: '>' });
  for (const revenue of [0, null, -1, NaN]) assert.equal(valuationMultiple({ revenue, valuation: 50 }), null);
  assert.equal(valuationMultiple({ revenue: 1, valuation: null }), null);
});

test('funding plot uses the observation paired with its round and rejects incomplete points', () => {
  const rows = [{ id: 'paired', round: { amount: 65, revenue: 47, valuation: 965 } }, { id: 'missing', round: { amount: null, revenue: 2 } }];
  const points = capitalPoints(rows);
  assert.equal(points.length, 1);
  assert.equal(points[0].revenue, 47);
  assert.equal(points[0].amount, 65);
  assert.ok(points[0].x >= 0 && points[0].x <= 1 && points[0].y >= 0 && points[0].y <= 1);
});

test('published market charts bind every observation to inspectable sources and retain unknowns', () => {
  const { atlas, sources } = aiModelMarket;
  const ids = new Set(sources.map(source => source.id));
  for (const row of [...atlas.labs, ...atlas.tools, ...atlas.training, ...atlas.geography]) {
    assert.ok(row.sources.length && row.sources.every(id => ids.has(id)), `${row.id}: source binding`);
  }
  assert.equal(atlas.categories.length, 8);
  assert.equal(atlas.categories.filter(row => row.value === null).length, 2);
  const advertising=atlas.categories.find(row=>row.id==='ads');
  assert.equal(advertising.parts.reduce((sum,row)=>sum+row.value,0),advertising.value);
  assert.ok(atlas.labs.some(row => row.valuation === null));
  assert.equal(aiModelMarket.sections.length, 8);
  assert.ok(atlas.training.every(row => row.cost > 0 && Number.isInteger(row.year)));
});
