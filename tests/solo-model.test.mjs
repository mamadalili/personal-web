import test from 'node:test';
import assert from 'node:assert/strict';
import { soloCapacity, filterOpportunities } from '../figures/solo-model.mjs';

test('capacity counts preparation, review and client time before accepting orders', () => {
  const manual = soloCapacity({ hours: 12, orders: 12, automation: 0 });
  assert.equal(manual.perOrderMinutes, 120);
  assert.equal(manual.capacity, 6);
  assert.equal(manual.completed, 6);
  assert.equal(manual.pending, 6);
  assert.equal(manual.loadPercent, 200);
  const assisted = soloCapacity({ hours: 12, orders: 12, automation: 60 });
  assert.equal(assisted.preparationMinutes, 30);
  assert.equal(assisted.perOrderMinutes, 75);
  assert.equal(assisted.capacity, 9);
  assert.equal(assisted.completed, 9);
  assert.equal(assisted.pending, 3);
  assert.equal(assisted.requiredMinutes, 900);
  assert.equal(assisted.loadPercent, 125);
});

test('automation preserves human review and communication and cannot create demand', () => {
  const result = soloCapacity({ hours: 40, orders: 2, automation: 90 });
  assert.equal(result.reviewMinutes, 25);
  assert.equal(result.communicationMinutes, 20);
  assert.equal(result.perOrderMinutes, 52.5);
  assert.equal(result.completed, 2);
  assert.equal(result.pending, 0);
  for (const hours of [0, 1, 12, 40]) for (const orders of [0, 1, 12, 16]) {
    let previous = 0;
    for (const automation of [0, 30, 60, 90]) {
      const value = soloCapacity({ hours, orders, automation });
      assert.equal(value.completed + value.pending, orders);
      assert.ok(value.completed >= previous && value.completed <= orders);
      assert.ok(value.completed * value.perOrderMinutes <= hours * 60);
      assert.ok(value.unusedMinutes >= 0);
      previous = value.completed;
    }
  }
});

test('zero time and zero orders do not yield infinite workload or fabricated output', () => {
  const empty = soloCapacity({ hours: 0, orders: 0, automation: 60 });
  assert.equal(empty.completed, 0);
  assert.equal(empty.loadPercent, 0);
  const noTime = soloCapacity({ hours: 0, orders: 3, automation: 90 });
  assert.equal(noTime.completed, 0);
  assert.equal(noTime.pending, 3);
  assert.equal(noTime.loadPercent, null);
});

test('invalid capacity input is rejected rather than silently clamped', () => {
  const valid = { hours: 12, orders: 12, automation: 60 };
  for (const value of [NaN, Infinity, -1, '12', null, undefined]) {
    for (const key of ['hours', 'orders', 'automation']) assert.equal(soloCapacity({ ...valid, [key]: value }), null);
  }
  for (const input of [{ hours: 41 }, { orders: 17 }, { orders: 1.5 }, { automation: 91 }]) {
    assert.equal(soloCapacity({ ...valid, ...input }), null);
  }
});

test('opportunity search respects group, both languages and Persian spelling variants', () => {
  const items = [
    { id: 'shop', group: 'commerce', fa: { title: 'پکیج فروشگاه', buyer: 'تیم کوچک', outcome: 'صفحهٔ محصول' }, en: { title: 'Store package', buyer: 'Small team', outcome: 'Product page' } },
    { id: 'learn', group: 'teaching', fa: { title: 'آموزش', buyer: 'مدرس', outcome: 'کارگاه' }, en: { title: 'Training', buyer: 'Teacher', outcome: 'Workshop' } }
  ];
  const snapshot = JSON.stringify(items);
  assert.deepEqual(filterOpportunities(items, { group: 'all', query: 'پكيج', lang: 'fa' }).map(item => item.id), ['shop']);
  assert.deepEqual(filterOpportunities(items, { group: 'commerce', query: 'TEAM', lang: 'en' }).map(item => item.id), ['shop']);
  assert.deepEqual(filterOpportunities(items, { group: 'teaching', query: 'store', lang: 'en' }), []);
  assert.deepEqual(filterOpportunities(items, { group: 'unknown', query: '', lang: 'fa' }), []);
  assert.equal(filterOpportunities(items, { query: '', lang: 'en' }).length, 2);
  assert.equal(JSON.stringify(items), snapshot);
});
