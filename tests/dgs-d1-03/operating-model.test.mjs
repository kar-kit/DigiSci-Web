/**
 * DGS-D1-03: Operating model description on About page
 * AC: Covers small roster, senior-led delivery, outcomes focus.
 *     Differentiates from large consultancies and pure-play tech firms.
 *     Visual spec per mockups/about.html §04 "How we work".
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/about/page.tsx'), 'utf8');

describe('DGS-D1-03 — Section structure', () => {
  test('"How we work" section present', () => {
    assert.ok(src.includes('aria-label="How we work"'), '"How we work" section aria-label missing');
  });

  test('eyebrow "03 How we work" present', () => {
    const block = src.slice(src.indexOf('aria-label="How we work"'));
    assert.ok(block.includes('index="03"') && block.includes('How we work'), 'Eyebrow "03 How we work" missing');
  });

  test('section heading "A focused, senior-led boutique" present', () => {
    assert.ok(src.includes('A focused, senior-led boutique'), 'Section heading missing');
  });
});

describe('DGS-D1-03 — Operating model content', () => {
  test('senior-led delivery messaging present', () => {
    assert.ok(
      src.includes('Senior-led, principal-delivered'),
      '"Senior-led, principal-delivered" delivery label missing'
    );
  });

  test('small roster messaging present', () => {
    assert.ok(
      src.includes('Small, deliberately'),
      '"Small, deliberately" roster label missing'
    );
  });

  test('anti-bait-and-switch differentiation present', () => {
    assert.ok(
      src.includes('bait-and-switch') || src.includes('junior delivery'),
      'Differentiation from large-firm junior delivery missing'
    );
  });

  test('geography coverage present', () => {
    assert.ok(
      src.includes('UK · United States · Europe') || src.includes('UK') && src.includes('United States') && src.includes('Europe'),
      'Geography coverage missing'
    );
  });
});

describe('DGS-D1-03 — HOW_WE_WORK data rows', () => {
  test('HOW_WE_WORK constant declared', () => {
    assert.ok(src.includes('HOW_WE_WORK'), 'HOW_WE_WORK constant missing');
  });

  test('three detail rows (Delivery, Roster, Geography)', () => {
    const idx   = src.indexOf('const HOW_WE_WORK');
    const end   = src.indexOf('] as const', idx);
    const block = src.slice(idx, end);
    const count = (block.match(/label:/g) || []).length;
    assert.equal(count, 3, `Expected 3 label entries in HOW_WE_WORK, found ${count}`);
  });

  test('lucide icon components used in HOW_WE_WORK', () => {
    assert.ok(
      src.includes('UserCheck') || src.includes('Users') || src.includes('Globe'),
      'lucide icon references missing from HOW_WE_WORK'
    );
  });

  test('icons rendered with accent colour', () => {
    const block = src.slice(src.indexOf('HOW_WE_WORK.map'));
    assert.ok(block.includes('var(--accent)'), 'Accent colour missing from icon rendering');
  });
});

describe('DGS-D1-03 — Responsive layout', () => {
  test('2-col layout at md breakpoint', () => {
    const block = src.slice(src.indexOf('aria-label="How we work"'));
    assert.ok(block.includes('md:grid-cols'), '2-col md layout missing on "How we work" section');
  });

  test('detail rows stack on mobile', () => {
    const block = src.slice(src.indexOf('HOW_WE_WORK.map'));
    assert.ok(
      block.includes('flex-col') || block.includes('flex flex-col'),
      'flex-col stacking for mobile detail rows missing'
    );
  });
});

describe('DGS-D1-03 — No raw CSS', () => {
  test('no hardcoded hex colours in about/page.tsx', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
