import test from 'node:test';
import assert from 'node:assert/strict';
import { posts } from '../blog-data.mjs';
import { dataMotionFor, withDataMotion, validateMotion, valuePosition, comparisonChange, createMotionClock, createReplayTimer } from '../blog-data-motion-model.mjs';
import { renderDataMotion } from '../blog-data-motion.mjs';

test('motion is selective, bilingual, sourced and leaves original articles intact', () => {
  const before = JSON.stringify(posts);
  const chosen = posts.filter(post => dataMotionFor(post));
  assert.equal(chosen.length, 6);
  for (const post of chosen) {
    const motion = dataMotionFor(post);
    assert.equal(validateMotion(motion, post.sources), true, post.slug);
    const mounted = withDataMotion(post);
    assert.equal(mounted.sections.length, post.sections.length + 1);
    assert.equal(mounted.sections.filter(s => s.id === 'data-motion').length, 1);
    assert.equal(withDataMotion(mounted).sections.length, mounted.sections.length);
    for (const section of post.sections) assert.equal(mounted.sections.find(s => s.id === section.id), section);
    assert.equal(mounted.cover, post.cover);
  }
  assert.equal(JSON.stringify(posts), before);
  const untouched = posts.find(p => p.slug === 'one-day-rethink');
  assert.equal(withDataMotion(untouched), untouched);
});

test('reported numbers retain their actual units; logarithms do not fabricate a time series', () => {
  const get = slug => dataMotionFor(posts.find(p => p.slug === slug));
  assert.deepEqual(get('ai-payoff-workload').rows.map(r => r.value), [100, 119]);
  assert.deepEqual(get('normalized-friction').rows.map(r => r.value), [80, 15]);
  assert.deepEqual(get('capital-one-ai').rows.map(r => r.value), [300, 3]);
  assert.equal(comparisonChange(get('ai-payoff-workload')), 19);
  assert.equal(valuePosition(1e6, { scale: 'log', min: 1e3, max: 1e9 }), 0.5);
  assert.equal(valuePosition(0, { scale: 'log', min: 1e3, max: 1e9 }), null);
  const market = posts.find(p => p.slug === 'ai-model-market');
  assert.deepEqual(get('ai-model-market').rows.map(r => r.value), market.atlas.training.map(r => r.cost));
  assert.equal(get('ai-marketing-workflow').rows.every(r => r.value === undefined), true);
});

test('missing evidence, invalid measures and incomplete translation cannot create a figure', () => {
  const post = posts.find(p => p.slug === 'normalized-friction');
  const motion = dataMotionFor(post);
  assert.equal(dataMotionFor({ ...post, sources: [] }), null);
  assert.equal(validateMotion({ ...motion, rows: [{ ...motion.rows[0], value: NaN }, motion.rows[1]] }, post.sources), false);
  assert.equal(validateMotion({ ...motion, en: {} }, post.sources), false);
  assert.equal(validateMotion({ ...motion, rows: [motion.rows[0], { ...motion.rows[1], id: motion.rows[0].id }] }, post.sources), false);
  assert.equal(validateMotion({ ...motion, rows: [{ ...motion.rows[0], sourceIds: ['missing'] }, motion.rows[1]] }, post.sources), false);
});

test('one-shot clock pauses offscreen and hidden, freezes for reduced motion, and disposes', () => {
  let next = 0, value = -1;
  const frames = new Map();
  const clock = createMotionClock({ duration: 1000, onFrame: p => { value = p; }, requestFrame: fn => { frames.set(++next, fn); return next; }, cancelFrame: id => frames.delete(id) });
  const tick = time => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(time)); };
  clock.play(); tick(0); tick(200);
  assert.equal(value, 0.2);
  clock.setEnvironment({ visible: false });
  assert.equal(frames.size, 0);
  clock.setEnvironment({ visible: true }); tick(5000); tick(5200);
  assert.equal(value, 0.4);
  clock.setEnvironment({ hidden: true }); assert.equal(frames.size, 0);
  clock.setEnvironment({ hidden: false }); tick(9000); tick(9100);
  assert.equal(value, 0.5);
  clock.setEnvironment({ reduced: true });
  assert.equal(value, 1); assert.equal(frames.size, 0);
  clock.play(); assert.equal(frames.size, 0);
  clock.setEnvironment({ reduced: false }); clock.seek(0.25); clock.play(); tick(10000); tick(11000);
  assert.equal(value, 1); assert.equal(frames.size, 0);
  clock.seek(0); clock.play(); clock.dispose();
  assert.equal(frames.size, 0);
  clock.play(); assert.equal(frames.size, 0);
});

test('motion rendering escapes authored text and uses the requested native language', () => {
  const post = posts.find(p => p.slug === 'capital-one-ai'), model = dataMotionFor(post);
  const altered = { ...model, fa: { ...model.fa, intro: '<img src=x onerror=alert(1)>' } };
  const fa = renderDataMotion(altered, 'motion-test', 'fa', post.sources);
  assert.ok(fa.includes('&lt;img'));
  assert.ok(!fa.includes('<img src=x'));
  const en = renderDataMotion(model, 'motion-test', 'en', post.sources);
  assert.ok(en.includes('Minutes for one specific task'));
  assert.ok(!en.includes(model.fa.unit));
  assert.equal(renderDataMotion(model, 'motion-test', 'fa', []), '');
});

test('minute replay runs only while visible, respects opt-out and cleans up on disposal', () => {
  let now = 0, next = 0, replays = 0;
  const timers = new Map();
  const repeat = createReplayTimer({ onReplay: () => replays++, setTimer: (fn, delay) => { timers.set(++next, { fn, at: now + delay }); return next; }, clearTimer: id => timers.delete(id) });
  const advance = ms => { now += ms; for (const [id, timer] of [...timers]) if (timer.at <= now) { timers.delete(id); timer.fn(); } };
  assert.equal(timers.size, 0);
  repeat.setEnvironment({ visible: true });
  advance(59999); assert.equal(replays, 0);
  advance(1); assert.equal(replays, 1);
  repeat.restart(); advance(59000); assert.equal(replays, 1);
  repeat.setEnvironment({ hidden: true }); advance(120000); assert.equal(replays, 1); assert.equal(timers.size, 0);
  repeat.setEnvironment({ hidden: false }); advance(60000); assert.equal(replays, 2);
  repeat.setEnvironment({ visible: false }); assert.equal(timers.size, 0);
  repeat.setEnvironment({ visible: true, reduced: true }); advance(60000); assert.equal(replays, 2);
  repeat.setEnvironment({ reduced: false }); repeat.setEnabled(false); advance(60000); assert.equal(replays, 2);
  repeat.setEnabled(true); advance(60000); assert.equal(replays, 3);
  repeat.dispose(); advance(120000); repeat.setEnabled(true); assert.equal(replays, 3); assert.equal(timers.size, 0);
});
