/**
 * DGS-G1-05: CTA at end of each case study detail page
 * AC: Strong closing statement. "Book a Discovery Call" primary CTA.
 *     "View All Case Studies" secondary. High-contrast section.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/case-studies/[slug]/page.tsx'), 'utf8');

describe('DGS-G1-05 — CTA section structure', () => {
  test('CTA section present with aria-label', () => {
    assert.ok(src.includes('aria-label="Call to action"'), 'CTA section aria-label missing');
  });

  test('CTA section at the end of the page (after Impact)', () => {
    const impactIdx = src.lastIndexOf('aria-label="Impact"');
    const ctaIdx    = src.indexOf('aria-label="Call to action"');
    assert.ok(ctaIdx > impactIdx, 'CTA section must appear after Impact section');
  });
});

describe('DGS-G1-05 — CTA copy (strong closing statement)', () => {
  test('"See your own problem" closing statement present', () => {
    assert.ok(
      src.includes('See your own problem') || src.includes('visualised their challenge'),
      'Strong closing statement missing from CTA'
    );
  });

  test('body copy references reading the case study', () => {
    assert.ok(
      src.includes('reads a full case study') || src.includes('read a full case study') || src.includes('visualised'),
      'Body copy referencing case study reading missing'
    );
  });
});

describe('DGS-G1-05 — Primary and secondary CTAs', () => {
  test('"Book a Discovery Call" primary CTA present', () => {
    assert.ok(src.includes('Book a Discovery Call'), '"Book a Discovery Call" CTA missing');
  });

  test('"Book a Discovery Call" links to /contact', () => {
    const ctaBlock = src.slice(src.lastIndexOf('aria-label="Call to action"'));
    assert.ok(ctaBlock.includes('href="/contact"'), '"Book a Discovery Call" must link to /contact');
  });

  test('"View All Case Studies" secondary CTA present', () => {
    assert.ok(src.includes('View All Case Studies'), '"View All Case Studies" secondary CTA missing');
  });

  test('"View All Case Studies" links back to /case-studies', () => {
    const ctaBlock = src.slice(src.lastIndexOf('aria-label="Call to action"'));
    assert.ok(ctaBlock.includes('href="/case-studies"'), '"View All Case Studies" must link to /case-studies');
  });
});

describe('DGS-G1-05 — High-contrast section', () => {
  test('CTA section uses high-contrast dark background (navy-850 or surface-sunken)', () => {
    const ctaBlock = src.slice(src.lastIndexOf('aria-label="Call to action"'));
    assert.ok(
      ctaBlock.includes('navy-850') || ctaBlock.includes('surface-sunken') || ctaBlock.includes('navy-800'),
      'CTA section must use a high-contrast dark background'
    );
  });

  test('primary button uses primary variant', () => {
    const ctaBlock = src.slice(src.lastIndexOf('aria-label="Call to action"'));
    assert.ok(ctaBlock.includes('variant="primary"'), 'Primary CTA button variant missing');
  });

  test('secondary button uses secondary variant', () => {
    const ctaBlock = src.slice(src.lastIndexOf('aria-label="Call to action"'));
    assert.ok(ctaBlock.includes('variant="secondary"'), 'Secondary CTA button variant missing');
  });
});

describe('DGS-G1-05 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
