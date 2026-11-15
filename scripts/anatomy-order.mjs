import * as A from '../.agents/skills/anatomy/kit/audit.mjs';

export function auditFixedOrder(recorder, projection, order) {
  // Build the true overlap context first. audit() would otherwise solve new keys.
  A.settle(recorder, projection);
  const ranks = new Map(order.map((name, index) => [name, index]));
  for (const item of recorder.items) {
    if (!ranks.has(item.name)) throw new Error(`Browser order omits ${item.name}`);
    item.key = ranks.get(item.name);
  }
  // settled.items contains these same item references, now with browser keys.
  return A.audit(recorder, projection);
}
