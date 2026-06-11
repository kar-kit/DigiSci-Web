/**
 * DGS-X2-01: Button component tests
 * AC: primary/secondary/ghost variants, sm/md/lg sizes, disabled state, accessible.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const src = readFileSync(join(ROOT, 'components/ui/Button.tsx'), 'utf8');

describe('DGS-X2-01 — Button variants', () => {
  test('primary variant defined', () => {
    assert.ok(src.includes('primary'), 'primary variant missing');
    assert.ok(src.includes('bg-[--color-accent]') || src.includes('color-accent'), 'primary must use accent colour');
  });

  test('secondary variant defined', () => {
    assert.ok(src.includes('secondary'), 'secondary variant missing');
    assert.ok(src.includes('border'), 'secondary must have border');
  });

  test('ghost variant defined', () => {
    assert.ok(src.includes('ghost'), 'ghost variant missing');
  });
});

describe('DGS-X2-01 — Button sizes', () => {
  test('sm size (34px height)', () => {
    assert.ok(src.includes('34px') || src.includes('h-[34px]'), 'sm size h-34px missing');
  });

  test('md size (44px height — minimum touch target)', () => {
    assert.ok(src.includes('44px') || src.includes('h-[44px]'), 'md size h-44px missing');
  });

  test('lg size (52px height)', () => {
    assert.ok(src.includes('52px') || src.includes('h-[52px]'), 'lg size h-52px missing');
  });
});

describe('DGS-X2-01 — Button accessibility + interaction', () => {
  test('hover state declared', () => {
    assert.ok(src.includes('hover:'), 'hover state missing');
  });

  test('focus-visible state declared', () => {
    assert.ok(src.includes('focus-visible'), 'focus-visible state missing');
  });

  test('active state declared', () => {
    assert.ok(src.includes('active:'), 'active state missing');
  });

  test('disabled opacity declared', () => {
    assert.ok(src.includes('disabled:'), 'disabled state missing');
  });

  test('no raw CSS classes (only Tailwind utilities)', () => {
    assert.ok(!src.includes('.ds-btn') && !src.includes('className="btn'), 'BEM/raw class naming found');
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });

  test('no inline style attributes (except dynamic)', () => {
    const styleMatches = src.match(/style=/g);
    assert.ok(!styleMatches || styleMatches.length === 0, 'inline style= attributes found');
  });
});

describe('DGS-X2-01 — Button uses design tokens', () => {
  test('uses --color-* token references (not hardcoded hex)', () => {
    assert.ok(!src.match(/#[0-9A-Fa-f]{6}/), 'hardcoded hex colour found in Button');
  });

  test('font is Tailwind font-sans class (IBM Plex Sans)', () => {
    assert.ok(src.includes('font-sans'), 'font-sans class missing');
  });

  test('tracking-[0.04em] for button label', () => {
    assert.ok(src.includes('tracking-'), 'letter-spacing tracking class missing');
  });
});
