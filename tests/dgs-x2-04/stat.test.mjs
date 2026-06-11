/**
 * DGS-X2-04: Stat display component tests
 * AC: large typographic number + unit, small label below, visual hierarchy.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const src = readFileSync(join(ROOT, 'components/ui/Stat.tsx'), 'utf8');

describe('DGS-X2-04 — Stat props', () => {
  test('value prop present', () => assert.ok(src.includes('value'), 'value prop missing'));
  test('unit prop present (optional)', () => assert.ok(src.includes('unit'), 'unit prop missing'));
  test('label prop present', () => assert.ok(src.includes('label'), 'label prop missing'));
});

describe('DGS-X2-04 — Stat typography', () => {
  test('tabular-nums for numeric stability', () => {
    assert.ok(src.includes('tabular-nums'), 'tabular-nums missing');
  });

  test('label uses mono font (uppercase brand voice)', () => {
    assert.ok(src.includes('font-mono'), 'font-mono missing on label');
    assert.ok(src.includes('uppercase'), 'uppercase missing on label');
  });

  test('display size (4rem or 4xl range) for hero number', () => {
    assert.ok(src.includes('4rem') || src.includes('text-[4rem]') || src.includes('text-4xl'), 'hero font size missing');
  });

  test('unit uses accent colour', () => {
    assert.ok(src.includes('accent') || src.includes('color-blue'), 'unit accent colour missing');
  });
});

describe('DGS-X2-04 — Stat code quality', () => {
  test('no CSS module imports', () => assert.ok(!src.includes('.module.css'), 'CSS module found'));
  test('no hardcoded hex', () => assert.ok(!src.match(/#[0-9A-Fa-f]{6}/), 'hardcoded hex found'));
  test('uses design token references', () => assert.ok(src.includes('--color-'), 'no design token refs'));
});
