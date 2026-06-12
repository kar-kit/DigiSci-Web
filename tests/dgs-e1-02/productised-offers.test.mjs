/**
 * DGS-E1-02: Three productised offers section on Services page
 * AC: AI Readiness Assessment, Digital PQS Blueprint, Manufacturing Data Architecture Design
 *     each shown with scope, duration, and deliverable. Visually distinct from full service lines.
 *     CTA on each. Visual spec per mockups/services.html §02 "Structured entry points".
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/services/page.tsx'), 'utf8');

describe('DGS-E1-02 — Section structure', () => {
  test('"Structured entry points" section present', () => {
    assert.ok(
      src.includes('aria-label="Structured entry points"'),
      '"Structured entry points" section aria-label missing'
    );
  });

  test('eyebrow "02 Structured entry points" present', () => {
    const block = src.slice(src.indexOf('aria-label="Structured entry points"'));
    assert.ok(
      block.includes('index="02"') && block.includes('Structured entry points'),
      'Eyebrow "02 Structured entry points" missing'
    );
  });

  test('section heading "For organisations at an earlier stage" present', () => {
    assert.ok(src.includes('For organisations at an earlier stage'), 'Section heading missing');
  });

  test('lower activation energy copy present', () => {
    assert.ok(src.includes('activation energy'), '"activation energy" procurement copy missing');
  });
});

describe('DGS-E1-02 — OFFERS data (3 entries)', () => {
  test('OFFERS constant declared with 3 entries', () => {
    assert.ok(src.includes('OFFERS'), 'OFFERS constant missing');
    const constKey = src.includes('const FALLBACK_OFFERS') ? 'const FALLBACK_OFFERS' : 'const OFFERS';
    const idx   = src.indexOf(constKey);
    const end   = src.indexOf('];', idx);
    const block = src.slice(idx, end);
    const count = (block.match(/title:/g) || []).length;
    assert.equal(count, 3, `Expected 3 title entries in OFFERS, found ${count}`);
  });

  test('AI Readiness Assessment present', () => {
    assert.ok(src.includes('AI Readiness Assessment'), 'AI Readiness Assessment missing');
  });

  test('Digital PQS Blueprint present', () => {
    assert.ok(src.includes('Digital PQS Blueprint'), 'Digital PQS Blueprint missing');
  });

  test('Manufacturing Data Architecture Design present', () => {
    assert.ok(src.includes('Manufacturing Data Architecture Design'), 'Manufacturing Data Architecture Design missing');
  });
});

describe('DGS-E1-02 — Scope and duration per offer', () => {
  test('offer 1 scope: Fixed scope · 2–3 weeks', () => {
    assert.ok(src.includes('Fixed scope · 2–3 weeks'), 'Offer 1 scope missing');
  });

  test('offer 2 scope: Fixed scope · defined outputs', () => {
    assert.ok(src.includes('Fixed scope · defined outputs'), 'Offer 2 scope missing');
  });

  test('offer 3 scope: Fixed scope · time-bounded', () => {
    assert.ok(src.includes('Fixed scope · time-bounded'), 'Offer 3 scope missing');
  });
});

describe('DGS-E1-02 — Offer descriptions', () => {
  test('AI Readiness Assessment description present', () => {
    assert.ok(
      src.includes('scoped diagnostic') || src.includes('where AI can credibly create value'),
      'AI Readiness Assessment description missing'
    );
  });

  test('Digital PQS Blueprint description present', () => {
    assert.ok(
      src.includes('inspection-ready pharmaceutical quality system'),
      'Digital PQS Blueprint description missing'
    );
  });

  test('Manufacturing Data Architecture Design description present', () => {
    assert.ok(
      src.includes('unified operational data layer'),
      'Manufacturing Data Architecture Design description missing'
    );
  });
});

describe('DGS-E1-02 — CTA per offer', () => {
  test('"Enquire" CTA on each offer card', () => {
    const block = src.slice(src.indexOf('OFFERS.map'));
    assert.ok(block.includes('Enquire'), '"Enquire" CTA missing from offers');
  });

  test('offer CTA links to /contact', () => {
    const block = src.slice(src.indexOf('OFFERS.map'));
    assert.ok(block.includes('href="/contact"'), 'CTA link to /contact missing from offers');
  });
});

describe('DGS-E1-02 — Visually distinct from service lines', () => {
  test('offers section uses sunken background (distinct from service lines)', () => {
    const block = src.slice(src.indexOf('aria-label="Structured entry points"'));
    assert.ok(
      block.includes('surface-sunken') || block.includes('sunken'),
      'Offers section must use sunken background to be visually distinct from service lines'
    );
  });

  test('offer cards use article elements', () => {
    const block = src.slice(src.indexOf('OFFERS.map'));
    assert.ok(block.includes('<article'), 'article element missing from offer cards');
  });

  test('3-col grid at md breakpoint', () => {
    const block = src.slice(src.indexOf('aria-label="Structured entry points"'));
    const gridEnd = block.indexOf('aria-label="Engagement process"');
    const gridBlock = block.slice(0, gridEnd > 0 ? gridEnd : undefined);
    assert.ok(gridBlock.includes('md:grid-cols-3'), 'md:grid-cols-3 missing on offers grid');
  });
});

describe('DGS-E1-02 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
