import { writeFileSync, readFileSync } from 'node:fs';
import * as A from '../.agents/skills/anatomy/kit/audit.mjs';
import { workbenchScene, projection } from '../figures/solo-workbench.mjs';
import { auditFixedOrder } from './anatomy-order.mjs';

function record(input) {
  const { parts } = workbenchScene(input), recorder = A.recorder(projection);
  for (const part of parts) {
    const meta = { name: part.name };
    const shape = part.kind === 'slab' ? A.slab(part.plan, part.z, part.h, meta, 8) : A.cylinder(part.x, part.y, part.r, part.z, part.h, meta);
    recorder.put({ name: part.name, piece: part.name, at: part.at, svg: part.svg, shapes: [recorder.solid(shape)] });
  }
  return recorder;
}

const reference = record({ hours: 40, orders: 16, automation: 60 });
A.settle(reference, projection);
const order = reference.items.sort((a, b) => a.key - b.key).map(item => item.name);
for (const automation of [0, 60, 90]) for (const hours of [0, 12, 40]) {
  const recorder = record({ hours, orders: 16, automation });
  const result = auditFixedOrder(recorder, projection, order);
  if (A.failures(result)) {
    console.error(`Workbench failed for ${hours} hours / ${automation}% delegation.`);
    console.error(A.report(result));
    process.exit(1);
  }
}
const content = `// Generated from Anatomy geometry constraints. Run node scripts/build-solo-figure.mjs.\nexport const workbenchOrder = ${JSON.stringify(order, null, 2)};\n`;
const target = new URL('../figures/solo-order.mjs', import.meta.url);
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8').replace(/\r\n/g, '\n') !== content) throw new Error('Workbench order is out of date.');
} else writeFileSync(target, content, 'utf8');
console.log(`Workbench geometry audit passed: ${order.length} solids, 9 boundary states, zero failures.`);
