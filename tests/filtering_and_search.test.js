import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const receiptsPath = path.resolve(__dirname, '../src/data/life_receipts.json');
const receipts = JSON.parse(fs.readFileSync(receiptsPath, 'utf-8'));

// Replicate sanitization logic
const sanitizeQuery = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>'"`;(){}[\]\\/]/g, '').slice(0, 100);
};

// Replicate filtering logic
const filterReceipts = (data, { type = 'all', timeFilter = 'all', query = '' }) => {
  const sanitized = sanitizeQuery(query).toLowerCase().trim();
  return data.filter(r => {
    if (type !== 'all' && r.type !== type) return false;
    if (timeFilter === 'night' && r.timeOfDay !== 'midnight') return false;
    if (timeFilter === 'day' && r.timeOfDay === 'midnight') return false;
    if (sanitized) {
      const matchTitle = r.title.toLowerCase().includes(sanitized);
      const matchCat = r.category.toLowerCase().includes(sanitized);
      const matchSig = r.significance.toLowerCase().includes(sanitized);
      const matchMood = r.mood.toLowerCase().includes(sanitized);
      if (!matchTitle && !matchCat && !matchSig && !matchMood) return false;
    }
    return true;
  });
};

describe('PaperTrail Multi-Dimensional Search & Filtering', () => {
  test('should return all receipts when default filter is active', () => {
    const result = filterReceipts(receipts, { type: 'all', timeFilter: 'all', query: '' });
    assert.strictEqual(result.length, receipts.length);
  });

  test('should filter by specific activity type', () => {
    const musicReceipts = filterReceipts(receipts, { type: 'music' });
    assert.ok(musicReceipts.length > 0, 'Should have music receipts');
    musicReceipts.forEach(r => assert.strictEqual(r.type, 'music'));

    const placeReceipts = filterReceipts(receipts, { type: 'places' });
    assert.ok(placeReceipts.length > 0, 'Should have places receipts');
    placeReceipts.forEach(r => assert.strictEqual(r.type, 'places'));
  });

  test('should filter by Night Owl (midnight) time of day', () => {
    const nightReceipts = filterReceipts(receipts, { timeFilter: 'night' });
    assert.ok(nightReceipts.length > 0, 'Should have night receipts');
    nightReceipts.forEach(r => assert.strictEqual(r.timeOfDay, 'midnight'));

    const dayReceipts = filterReceipts(receipts, { timeFilter: 'day' });
    assert.ok(dayReceipts.length > 0, 'Should have daytime receipts');
    dayReceipts.forEach(r => assert.notStrictEqual(r.timeOfDay, 'midnight'));
  });

  test('should sanitize malicious input in search query', () => {
    const maliciousInput = '<script>alert("xss")</script>; DROP TABLE receipts;';
    const sanitized = sanitizeQuery(maliciousInput);
    assert.ok(!sanitized.includes('<script>'), 'Script tag must be stripped');
    assert.ok(!sanitized.includes(';'), 'Semicolons must be stripped');
    assert.ok(!sanitized.includes('"'), 'Quotes must be stripped');
  });

  test('should find relevant receipts by keyword query', () => {
    const searchResults = filterReceipts(receipts, { query: 'train' });
    assert.ok(searchResults.length > 0, 'Should find receipts mentioning train');
    searchResults.forEach(r => {
      const match = 
        r.title.toLowerCase().includes('train') ||
        r.category.toLowerCase().includes('train') ||
        r.significance.toLowerCase().includes('train') ||
        r.mood.toLowerCase().includes('train');
      assert.ok(match, 'Result must match search query');
    });
  });
});
