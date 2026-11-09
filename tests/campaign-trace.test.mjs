import assert from 'node:assert/strict';
import test from 'node:test';
import { campaignTraceRows } from '../blog-campaign-trace.mjs';
import { post } from '../posts/marketing-engineer.mjs';

const trace = post.sections.flatMap(section => section.blocks).find(block => block.type === 'campaign-trace');

test('connecting each source reveals only its own evidence and preserves unknown outcomes', () => {
  for (const form of [false, true]) {
    for (const sales of [false, true]) {
      const rows = campaignTraceRows(trace, form, sales);
      assert.deepEqual(rows.map(row => row.id), ['A', 'B', 'C', 'D', 'E']);
      assert.deepEqual(rows.map(row => row.source), form ? ['glaze', 'sample', 'glaze', 'unknown', 'sample'] : Array(5).fill('formOff'));
      assert.deepEqual(rows.map(row => row.outcome), sales ? ['fit', 'other', 'fit', 'fit', 'pending'] : Array(5).fill('salesOff'));
    }
  }
});
