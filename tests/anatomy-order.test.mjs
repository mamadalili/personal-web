import test from 'node:test';
import assert from 'node:assert/strict';
import * as A from '../.agents/skills/anatomy/kit/audit.mjs';
import * as k from '../assets/anatomy/iso-kit.mjs';
import { auditFixedOrder } from '../scripts/anatomy-order.mjs';

function stackedScene() {
  const P = { origin: [50, 70], scale: 1, azimuth: 45, elevation: 30 };
  const recorder = A.recorder(P);
  for (const [name, plan, z, h] of [
    ['stand.base', { x: 0, y: 0, w: 24, d: 24, r: 1 }, 0, 2],
    ['top', { x: 5, y: 5, w: 14, d: 14, r: 1 }, 2, 4]
  ]) {
    recorder.put({ name, piece: name, at: [plan.x + plan.w / 2, plan.y + plan.d / 2, z + h / 2],
      svg: k.solidSvg(k.slabOf(plan, z, h, P)), shapes: [recorder.solid(A.slab(plan, z, h, { name }))] });
  }
  return { recorder, P };
}

test('fixed-order audit rejects a reversed painter order rather than silently repairing it', () => {
  const wrong = stackedScene();
  const result = auditFixedOrder(wrong.recorder, wrong.P, ['top', 'stand.base']);
  assert.ok(result.depth.problems.length > 0, 'The deliberately reversed browser order must fail.');
  assert.equal(wrong.recorder.items.find(item => item.name === 'top').key, 0);
  const right = stackedScene();
  assert.equal(A.failures(auditFixedOrder(right.recorder, right.P, ['stand.base', 'top'])), 0);
});
