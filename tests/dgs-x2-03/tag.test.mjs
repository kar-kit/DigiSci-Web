/**
 * DGS-X2-03: Sector tag / badge component tests
 * AC: sector/accent/default variants, uppercase mono font, text label.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const src = readFileSync(join(ROOT, 'components/ui/Tag.tsx'), 'utf8');

describe('DGS-X2-03 — Tag colour variants', () => {
  test('sector (green) variant defined', () => {
    assert.ok(src.includes('sector'), 'sector variant missing');
    assert.ok(src.includes('green'), 'sector variant must reference green token');
  });

  test('accent (blue) variant defined', () => {
    assert.ok(src.includes('accent'), 'accent variant missing');
  });

  test('default variant defined', () => {
    assert.ok(src.includes('default'), 'default variant missing');
  });
});

describe('DGS-X2-03 — Tag typography', () => {
  test('uses mono font (IBM Plex Mono)', () => {
    assert.ok(src.includes('font-mono'), 'font-mono class missing');
  });

  test('uppercase casing applied', () => {
    assert.ok(src.includes('uppercase'), 'uppercase class missing');
  });

  test('wide letter-spacing for label readability', () => {
    assert.ok(src.includes('tracking-'), 'tracking class missing');
  });
});

describe('DGS-X2-03 — Tag code quality', () => {
  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });

  test('no hardcoded hex colours', () => {
    assert.ok(!src.match(/#[0-9A-Fa-f]{6}/), 'hardcoded hex colour found');
  });

  test('supports children prop (text label)', () => {
    assert.ok(src.includes('children'), 'children prop missing');
  });

  test('optional dot indicator prop', () => {
    assert.ok(src.includes('dot'), 'dot prop missing');
  });
});
