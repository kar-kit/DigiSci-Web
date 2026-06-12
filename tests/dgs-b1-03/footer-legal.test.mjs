/**
 * DGS-B1-03: Footer legal links
 * AC: Privacy Policy and Cookie Policy links present in footer.
 * Pages exist or link to policy document.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir  = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, '..', '..');
const footer = readFileSync(join(ROOT, 'components/layout/Footer.tsx'), 'utf8');

describe('DGS-B1-03 — Privacy Policy link', () => {
  test('Privacy Policy link present', () => {
    assert.ok(footer.includes('Privacy Policy'), 'Privacy Policy text missing from footer');
  });

  test('Privacy Policy links to /privacy', () => {
    assert.ok(footer.includes('/privacy'), 'Privacy Policy href "/privacy" missing');
  });
});

describe('DGS-B1-03 — Cookie Policy link', () => {
  test('Cookie Policy link present', () => {
    assert.ok(footer.includes('Cookie Policy'), 'Cookie Policy text missing from footer');
  });

  test('Cookie Policy links to /cookies', () => {
    assert.ok(footer.includes('/cookies'), 'Cookie Policy href "/cookies" missing');
  });
});

describe('DGS-B1-03 — Legal link styling', () => {
  test('legal links use muted text colour (tertiary)', () => {
    assert.ok(footer.includes('text-[--text-tertiary]'), 'legal links should use tertiary muted text');
  });

  test('legal links use mono font (small print convention)', () => {
    assert.ok(footer.includes('font-mono'), 'legal links should use font-mono for small print');
  });

  test('no hardcoded hex colours', () => {
    const hexCount = (footer.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
