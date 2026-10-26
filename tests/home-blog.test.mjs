import test from 'node:test';
import assert from 'node:assert/strict';
import { homePostPages, createWheelPager } from '../home-blog.mjs';

const post = (slug, date, extra = {}) => ({ slug, date, status: 'published', fa: { title: slug }, en: { title: slug }, ...extra });

test('homepage starts with the latest two real bilingual articles and never duplicates the final page', () => {
  const input = [post('old', '2026-10-20'), post('new', '2026-10-24'), post('middle', '2026-10-22'),
    post('draft', '2026-10-26', { status: 'draft' }), post('demo', '2026-10-26', { template: true })];
  const original = input.map(item => item.slug);
  assert.deepEqual(homePostPages(input).map(page => page.map(item => item.slug)), [['new', 'middle'], ['old']]);
  assert.deepEqual(input.map(item => item.slug), original);
  assert.deepEqual(homePostPages([]), []);
  assert.equal(homePostPages(input.slice(0, 2)).length, 1);
  assert.deepEqual(homePostPages([post('untranslated', '2026-10-26', { en: null })]), []);
});

test('vertical wheel accumulates a deliberate gesture and suppresses repeated momentum paging', () => {
  const wheel = createWheelPager();
  const event = (deltaY, time, page = 0) => wheel({ page, pageCount: 3, deltaX: 0, deltaY, deltaMode: 0, time });
  assert.deepEqual(event(25, 0), { consume: true, page: null });
  assert.deepEqual(event(30, 20), { consume: true, page: null });
  assert.deepEqual(event(25, 40), { consume: true, page: 1 });
  assert.deepEqual(event(100, 80, 1), { consume: true, page: null });
  assert.deepEqual(event(100, 600, 1), { consume: true, page: 2 });
});

test('a single page and outward scrolling at either edge never trap normal page scrolling', () => {
  const wheel = createWheelPager();
  const base = { deltaX: 0, deltaMode: 0, time: 0 };
  assert.deepEqual(wheel({ ...base, page: 0, pageCount: 1, deltaY: 100 }), { consume: false, page: null });
  assert.deepEqual(wheel({ ...base, page: 0, pageCount: 3, deltaY: -100 }), { consume: false, page: null });
  assert.deepEqual(wheel({ ...base, page: 2, pageCount: 3, deltaY: 100 }), { consume: false, page: null });
});

test('horizontal trackpad input and modified wheel zoom remain native', () => {
  const wheel = createWheelPager();
  const base = { page: 0, pageCount: 3, deltaMode: 0, time: 0 };
  assert.deepEqual(wheel({ ...base, deltaX: 100, deltaY: 20 }), { consume: false, page: null });
  for (const modifier of ['ctrlKey', 'metaKey', 'shiftKey', 'altKey']) {
    assert.deepEqual(wheel({ ...base, deltaX: 0, deltaY: 100, [modifier]: true }), { consume: false, page: null });
  }
});

test('line and page wheel units work and a reversal does not inherit the previous direction', () => {
  const wheel = createWheelPager();
  const base = { page: 1, pageCount: 4, deltaX: 0 };
  assert.deepEqual(wheel({ ...base, deltaY: 4, deltaMode: 1, time: 0 }), { consume: true, page: null });
  assert.deepEqual(wheel({ ...base, deltaY: -4, deltaMode: 1, time: 20 }), { consume: true, page: null });
  assert.deepEqual(wheel({ ...base, deltaY: -1, deltaMode: 1, time: 40 }), { consume: true, page: 0 });
  assert.deepEqual(wheel({ ...base, deltaY: 1, deltaMode: 2, viewportHeight: 300, time: 600 }), { consume: true, page: 2 });
});
