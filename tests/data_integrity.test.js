import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const receiptsPath = path.resolve(__dirname, '../src/data/life_receipts.json');
const chaptersPath = path.resolve(__dirname, '../src/data/chapters.json');

const receipts = JSON.parse(fs.readFileSync(receiptsPath, 'utf-8'));
const chapters = JSON.parse(fs.readFileSync(chaptersPath, 'utf-8'));

describe('PaperTrail Data Integrity & Schema Validation', () => {
  test('should load valid receipts dataset with at least 100 receipts', () => {
    assert.ok(Array.isArray(receipts), 'Receipts must be an array');
    assert.ok(receipts.length >= 100, `Expected >= 100 receipts, got ${receipts.length}`);
  });

  test('should cover all 9 required challenge activity dimensions', () => {
    const requiredTypes = [
      'music', 'places', 'purchases', 'entertainment',
      'searches', 'notes', 'photos', 'messages', 'events'
    ];
    const presentTypes = new Set(receipts.map(r => r.type));

    for (const type of requiredTypes) {
      assert.ok(presentTypes.has(type), `Missing required activity dimension: ${type}`);
    }
  });

  test('every receipt should conform to strict data schema', () => {
    const validTimeOfDays = new Set(['morning', 'afternoon', 'evening', 'midnight']);

    receipts.forEach((r, idx) => {
      assert.ok(typeof r.id === 'string' && r.id.length > 0, `Receipt #${idx} missing id`);
      assert.ok(typeof r.type === 'string' && r.type.length > 0, `Receipt #${idx} missing type`);
      assert.ok(typeof r.title === 'string' && r.title.length > 0, `Receipt #${idx} missing title`);
      assert.ok(typeof r.timestamp === 'string', `Receipt #${idx} missing timestamp`);
      assert.ok(!isNaN(Date.parse(r.timestamp)), `Receipt #${idx} has invalid timestamp ${r.timestamp}`);
      assert.ok(typeof r.category === 'string', `Receipt #${idx} missing category`);
      assert.ok(typeof r.significance === 'string', `Receipt #${idx} missing significance`);
      assert.ok(typeof r.mood === 'string', `Receipt #${idx} missing mood`);
      assert.ok(typeof r.amount === 'number' && r.amount >= 0, `Receipt #${idx} has invalid amount ${r.amount}`);
      assert.ok(validTimeOfDays.has(r.timeOfDay), `Receipt #${idx} has invalid timeOfDay ${r.timeOfDay}`);
      assert.ok(Array.isArray(r.connectedReceiptIds), `Receipt #${idx} connectedReceiptIds must be an array`);
    });
  });

  test('chapters should contain 4 curated emotional narratives referencing valid receipts', () => {
    assert.strictEqual(chapters.length, 4, 'Expected exactly 4 curated chapters');
    const receiptIds = new Set(receipts.map(r => r.id));

    chapters.forEach((ch, idx) => {
      assert.ok(ch.id, `Chapter #${idx} missing id`);
      assert.ok(ch.title, `Chapter #${idx} missing title`);
      assert.ok(ch.tagline, `Chapter #${idx} missing tagline`);
      assert.ok(ch.description, `Chapter #${idx} missing description`);
      assert.ok(Array.isArray(ch.keyMoments) && ch.keyMoments.length > 0, `Chapter #${idx} must have key moments`);

      ch.keyMoments.forEach(momentId => {
        assert.ok(receiptIds.has(momentId), `Chapter ${ch.id} references non-existent receipt ${momentId}`);
      });
    });
  });
});
