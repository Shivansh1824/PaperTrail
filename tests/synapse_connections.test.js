import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const receiptsPath = path.resolve(__dirname, '../src/data/life_receipts.json');
const receipts = JSON.parse(fs.readFileSync(receiptsPath, 'utf-8'));

describe('PaperTrail Ripple Canvas & Synapse Discovery Engine', () => {
  const featuredAnchors = [
    { id: 'rec-101', label: '2:14 AM Insomnia Loop' },
    { id: 'rec-201', label: 'Monsoon Train Commute' },
    { id: 'rec-301', label: 'Ganesh Pujan Festival' },
    { id: 'rec-401', label: 'Netflix & Escapism' }
  ];

  test('all curated anchor presets should exist in receipts database', () => {
    featuredAnchors.forEach(preset => {
      const anchor = receipts.find(r => r.id === preset.id);
      assert.ok(anchor, `Anchor preset ${preset.id} (${preset.label}) not found in receipts`);
      assert.ok(Array.isArray(anchor.connectedReceiptIds), `Anchor ${preset.id} missing connectedReceiptIds`);
      assert.ok(anchor.connectedReceiptIds.length > 0, `Anchor ${preset.id} should have connected receipts`);
    });
  });

  test('all connected receipts referenced by anchors should resolve to valid records', () => {
    const receiptMap = new Map(receipts.map(r => [r.id, r]));

    featuredAnchors.forEach(preset => {
      const anchor = receiptMap.get(preset.id);
      anchor.connectedReceiptIds.forEach(connId => {
        const connectedReceipt = receiptMap.get(connId);
        assert.ok(connectedReceipt, `Anchor ${preset.id} links to invalid receipt ${connId}`);
        assert.notStrictEqual(connId, preset.id, `Anchor ${preset.id} should not link to itself`);
      });
    });
  });

  test('synapses should reflect multi-modal diversity (connecting different activity types)', () => {
    featuredAnchors.forEach(preset => {
      const anchor = receipts.find(r => r.id === preset.id);
      const connected = anchor.connectedReceiptIds.map(id => receipts.find(r => r.id === id));
      const types = new Set([anchor.type, ...connected.map(c => c.type)]);
      assert.ok(types.size >= 2, `Anchor ${preset.id} should connect at least 2 distinct activity types, got ${types.size}`);
    });
  });
});
