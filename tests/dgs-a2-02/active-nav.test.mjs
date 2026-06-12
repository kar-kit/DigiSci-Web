/**
 * DGS-A2-02: Active state on current page link
 * AC: Current page link has distinct active style (underline or colour).
 * Updates correctly on all pages.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'components/layout/Nav.tsx'), 'utf8');

describe('DGS-A2-02 — Active state detection', () => {
  test('usePathname imported from next/navigation', () => {
    assert.ok(
      src.includes("from 'next/navigation'") && src.includes('usePathname'),
      'usePathname must be imported from next/navigation',
    );
  });

  test('pathname variable derived from usePathname()', () => {
    assert.ok(src.includes('usePathname()'), 'usePathname() call missing');
  });

  test('active boolean computed by comparing pathname to href', () => {
    assert.ok(
      src.includes('pathname === href'),
      'active state must compare pathname === href',
    );
  });
});

describe('DGS-A2-02 — ARIA active indicator', () => {
  test('aria-current="page" applied on active link', () => {
    assert.ok(src.includes("aria-current={active ? 'page' : undefined}"), 'aria-current="page" missing on active link');
  });

  test('aria-current is undefined (omitted) on non-active links', () => {
    assert.ok(src.includes("undefined"), 'aria-current must be undefined (not false) on inactive links');
  });
});

describe('DGS-A2-02 — Visual active style — desktop', () => {
  test('active link uses text-[--text-primary] colour', () => {
    assert.ok(src.includes('text-[--text-primary]'), 'active link must use text-[--text-primary]');
  });

  test('active link has accent underline via after: pseudo-element', () => {
    assert.ok(
      src.includes('after:absolute') && src.includes('after:bg-[--accent]'),
      'active link must have accent-coloured after: underline',
    );
  });

  test('active link underline positioned at bottom (after:bottom-0)', () => {
    assert.ok(src.includes('after:bottom-0'), 'underline must be at bottom of link');
  });

  test('active link underline is 1px height (after:h-px)', () => {
    assert.ok(src.includes('after:h-px'), 'underline must be 1px (after:h-px)');
  });

  test('inactive link uses text-[--text-secondary]', () => {
    assert.ok(src.includes('text-[--text-secondary]'), 'inactive link must use text-[--text-secondary]');
  });
});

describe('DGS-A2-02 — Visual active style — mobile overlay', () => {
  test('active mobile link uses accent colour', () => {
    assert.ok(src.includes("active ? 'text-[--accent]'"), 'active mobile link must use text-[--accent]');
  });

  test('inactive mobile link still has hover:text-[--accent]', () => {
    assert.ok(src.includes('hover:text-[--accent]'), 'inactive mobile links must have hover accent state');
  });

  test('mobile links also carry aria-current', () => {
    const mobileSection = src.slice(src.indexOf('Mobile navigation'));
    assert.ok(mobileSection.includes('aria-current'), 'mobile nav links must also carry aria-current');
  });
});

describe('DGS-A2-02 — No raw CSS', () => {
  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });

  test('no inline style= attributes', () => {
    assert.ok(!/style="/.test(src), 'inline style attribute found — use Tailwind');
  });

  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
