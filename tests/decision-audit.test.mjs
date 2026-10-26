import test from 'node:test';
import assert from 'node:assert/strict';
import { pendingEvidence } from '../blog-decision-audit.mjs';

test('evidence audit keeps authored priority, ignores unknown checks and allows reversal',()=>{
 const items=[{id:'fit'},{id:'delivery'},{id:'phone'}];
 assert.deepEqual(pendingEvidence(items,[]),items);
 assert.deepEqual(pendingEvidence(items,['phone','bogus']),items.slice(0,2));
 assert.deepEqual(pendingEvidence(items,['fit','delivery','phone']),[]);
 assert.deepEqual(pendingEvidence(items,['fit','phone']),[items[1]]);
 assert.deepEqual(pendingEvidence(items,null),items);
});
