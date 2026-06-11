/**
 * DGS-C1: Homepage sections — hero, proof band, services, CTA
 * Tests presence of all required sections, copy, components, and attributes.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const src  = readFileSync(join(ROOT, 'app/page.tsx'), 'utf8');
const layout = readFileSync(join(ROOT, 'app/layout.tsx'), 'utf8');

describe('DGS-C1-01 — Hero section', () => {
  test('hero aria-label present', () => {
    assert.ok(src.includes('aria-label="Hero"'), 'hero aria-label missing');
  });

  test('h1 headline present', () => {
    assert.ok(src.includes('<h1'), 'h1 missing');
    assert.ok(src.includes('GMP'), 'headline copy missing ("GMP.")');
  });

  test('hero has grid-bg texture', () => {
    assert.ok(src.includes('grid-bg'), 'grid-bg texture missing from hero');
  });

  test('hero padding pt-[128px]', () => {
    assert.ok(src.includes('pt-[128px]') || src.includes('128px'), 'hero top padding 128px missing');
  });

  test('accent colour on GMP span', () => {
    assert.ok(src.includes('text-[--accent]') || src.includes('accent'), 'accent colour on headline missing');
  });

  test('sector tags in hero', () => {
    assert.ok(src.includes('Cell'), 'CGT tag missing');
    assert.ok(src.includes('Pharma Operations'), 'Pharma Operations tag missing');
    assert.ok(src.includes('AI Systems'), 'AI Systems tag missing');
  });

  test('primary CTA button "Request a briefing"', () => {
    assert.ok(src.includes('Request a briefing'), 'primary CTA missing');
  });

  test('secondary CTA "Read the approach"', () => {
    assert.ok(src.includes('Read the approach') || src.includes('approach'), 'secondary CTA missing');
  });
});

describe('DGS-C1-02 — Proof band (key stats)', () => {
  test('proof band aria-label', () => {
    assert.ok(src.includes('aria-label="Key metrics"') || src.includes('Key metrics'), 'proof band aria-label missing');
  });

  test('proof band has sunken bg', () => {
    assert.ok(src.includes('surface-sunken'), 'sunken background missing from proof band');
  });

  test('4 stats present (12 wks, 40%, 100%, 9 figs)', () => {
    assert.ok(src.includes('12'), 'stat 12 wks missing');
    assert.ok(src.includes('40'), 'stat 40% missing');
    assert.ok(src.includes('100'), 'stat 100% missing');
    assert.ok(src.includes('9'), 'stat 9 figs missing');
  });

  test('proof band grid layout (sm:grid-cols-4)', () => {
    assert.ok(src.includes('grid-cols') && src.includes('4'), 'proof band 4-col grid missing');
  });

  test('Stat component used', () => {
    assert.ok(src.includes('<Stat') || src.includes('Stat'), 'Stat component not used');
  });
});

describe('DGS-C1 — Services section', () => {
  test('services aria-label', () => {
    assert.ok(src.includes('aria-label="Services"'), 'services aria-label missing');
  });

  test('3 service cards present', () => {
    assert.ok(src.includes('Cell &amp; Gene Therapy') || src.includes('Cell'), 'service 1 missing');
    assert.ok(src.includes('Operations intelligence') || src.includes('Operations'), 'service 2 missing');
    assert.ok(src.includes('AI built for GxP') || src.includes('GxP'), 'service 3 missing');
  });

  test('services section py-32 spacing', () => {
    assert.ok(src.includes('py-32'), 'services section py-32 spacing missing');
  });

  test('Card component used', () => {
    assert.ok(src.includes('<Card'), 'Card component not used');
  });

  test('ruled and interactive props on cards', () => {
    assert.ok(src.includes('ruled'), 'ruled prop missing');
    assert.ok(src.includes('interactive'), 'interactive prop missing');
  });
});

describe('DGS-C1 — CTA section', () => {
  test('CTA aria-label', () => {
    assert.ok(src.includes('aria-label="Call to action"'), 'CTA aria-label missing');
  });

  test('CTA headline present', () => {
    assert.ok(src.includes('Bring AI to your most regulated work'), 'CTA headline missing');
  });

  test('CTA has primary button', () => {
    const ctaSection = src.slice(src.lastIndexOf('Call to action'));
    assert.ok(ctaSection.includes('Request a briefing'), 'CTA primary button missing');
  });

  test('CTA responsive layout (sm:flex-row)', () => {
    assert.ok(src.includes('sm:flex-row'), 'CTA responsive flex-row missing');
  });
});

describe('DGS-C1 — Layout integrity', () => {
  test('Nav imported in layout', () => {
    assert.ok(layout.includes('Nav'), 'Nav not in layout.tsx');
  });

  test('max-w-[1240px] container on all sections', () => {
    const containerCount = (src.match(/max-w-\[1240px\]/g) || []).length;
    assert.ok(containerCount >= 3, `expected 3+ 1240px containers, found ${containerCount}`);
  });

  test('no hardcoded hex colours in page', () => {
    assert.ok(!src.match(/#[0-9A-Fa-f]{6}/), 'hardcoded hex found in page.tsx');
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });

  test('no inline style= on interactive elements (only bg-image)', () => {
    const styleAttrs = src.match(/style=\{/g) || [];
    assert.ok(styleAttrs.length <= 1, `too many inline style= attributes: ${styleAttrs.length}`);
  });

  test('heading hierarchy — h1 before h2', () => {
    const h1Pos = src.indexOf('<h1');
    const h2Pos = src.indexOf('<h2');
    assert.ok(h1Pos < h2Pos, 'h2 appears before h1 — heading hierarchy broken');
  });
});
