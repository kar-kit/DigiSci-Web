/**
 * DGS-C2-02: Industry sectors section
 * Sectors are on the /industry page (not homepage) per design_mockup/index.html.
 * AC: Section showing 3 sectors: Cell & Gene Therapy, Pharmaceutical Manufacturing,
 * AI in Regulated Environments. Each with brief description.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/industry/page.tsx'), 'utf8');

describe('DGS-C2-02 — Sectors section structure', () => {
  test('section has aria-label="Industry sectors"', () => {
    assert.ok(src.includes('aria-label="Industry sectors"'), 'Industry sectors section aria-label missing');
  });

  test('"Who we work with" eyebrow present', () => {
    assert.ok(src.includes('Who we work with'), '"Who we work with" eyebrow missing');
  });

  test('section heading present', () => {
    assert.ok(src.includes('Deep expertise') || src.includes('demand it most'), 'sectors section heading missing');
  });

  test('responsive grid: 1-col mobile, 3-col desktop (sm:grid-cols-3)', () => {
    assert.ok(src.includes('sm:grid-cols-3'), 'sm:grid-cols-3 missing on sectors grid');
  });
});

describe('DGS-C2-02 — All three sectors present', () => {
  test('Cell & Gene Therapy sector present', () => {
    assert.ok(src.includes('Cell & Gene Therapy') || src.includes('Cell &amp; Gene Therapy'), 'Cell & Gene Therapy sector missing');
  });

  test('Pharmaceutical Manufacturing sector present', () => {
    assert.ok(src.includes('Pharmaceutical Manufacturing') || src.includes('Pharmaceutical'), 'Pharmaceutical Manufacturing sector missing');
  });

  test('AI in Regulated Environments sector present', () => {
    assert.ok(src.includes('AI in Regulated Environments') || src.includes('Regulated Environments'), 'AI in Regulated Environments sector missing');
  });
});

describe('DGS-C2-02 — Sector cards content', () => {
  test('sector card template has h3 title', () => {
    const sectorsBlock = src.slice(src.indexOf('SECTORS.map'));
    assert.ok(sectorsBlock.includes('<h3'), 'h3 title missing from sectors map template');
  });

  test('sector card template has description paragraph (font-serif)', () => {
    const sectorsBlock = src.slice(src.indexOf('SECTORS.map'));
    assert.ok(sectorsBlock.includes('font-serif'), 'font-serif description missing from sectors template');
  });

  test('sector cards use Tag with variant="sector"', () => {
    const sectorsBlock = src.slice(src.indexOf('SECTORS.map'));
    assert.ok(sectorsBlock.includes('variant="sector"'), 'sector variant Tag missing from sectors template');
  });
});

describe('DGS-C2-02 — Learn more links present', () => {
  test('learn more links present', () => {
    assert.ok(src.includes('Learn more'), '"Learn more" link text missing');
  });

  test('links have aria-label for accessibility', () => {
    const sectorsIdx = src.indexOf('Industry sectors');
    const sectorsSection = src.slice(sectorsIdx);
    assert.ok(sectorsSection.includes('aria-label'), 'sector links missing aria-label');
  });
});

describe('DGS-C2-02 — No raw CSS', () => {
  test('no hardcoded hex colours in industry page', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });
});
