/**
 * DGS-C2-03: Case study highlight cards on homepage
 * AC: 2-3 case study cards showing client type, project type, and headline outcome.
 *     Links to full Case Studies page. Dark card style on navy background.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/page.tsx'), 'utf8');

describe('DGS-C2-03 — Section structure', () => {
  test('section has aria-label="Case studies"', () => {
    assert.ok(src.includes('aria-label="Case studies"'), 'Case studies section aria-label missing');
  });

  test('"Client work" eyebrow present', () => {
    assert.ok(src.includes('Client work'), '"Client work" eyebrow missing');
  });

  test('section heading present', () => {
    assert.ok(src.includes('Three recent engagements'), 'Section heading missing');
  });

  test('confidentiality note present', () => {
    assert.ok(src.includes('anonymised'), 'Confidentiality note missing');
  });
});

describe('DGS-C2-03 — CASE_STUDIES data (3 entries)', () => {
  test('CASE_STUDIES constant declared', () => {
    assert.ok(src.includes('CASE_STUDIES'), 'CASE_STUDIES constant missing');
  });

  test('all three client types present', () => {
    assert.ok(src.includes('Global Life Sciences'), 'First client missing');
    assert.ok(src.includes('Emerging Biotech'), 'Second client missing');
    assert.ok(src.includes('Cell & Gene Therapy Development Company') || src.includes('Cell &amp; Gene Therapy Development Company'), 'Third client missing');
  });

  test('all three project types (service tags) present', () => {
    assert.ok(src.includes("'AI Implementation'") || src.includes('"AI Implementation"'), 'AI Implementation service tag missing');
    assert.ok(src.includes("'AI Strategy'") || src.includes('"AI Strategy"'), 'AI Strategy service tag missing');
    assert.ok(src.includes("'Digital Ops'") || src.includes('"Digital Ops"'), 'Digital Ops service tag missing');
  });

  test('all three headline outcomes present', () => {
    assert.ok(src.includes('CTD drafting accelerated'), 'First outcome missing');
    assert.ok(src.includes('Inspection-ready roadmap'), 'Second outcome missing');
    assert.ok(src.includes('Unified operational data layer'), 'Third outcome missing');
  });
});

describe('DGS-C2-03 — Card markup', () => {
  test('cards use <article> elements', () => {
    assert.ok(src.includes('<article'), 'article element missing from case study cards');
  });

  test('card template uses sector Tag (dot variant)', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(block.includes('variant="sector"'), 'sector variant Tag missing');
    assert.ok(block.includes('dot'), 'dot prop missing from sector Tag');
  });

  test('card template uses accent Tag for service type', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(block.includes('variant="accent"'), 'accent variant Tag missing (service type)');
  });

  test('"Outcome" label present in card template', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(block.includes('Outcome'), '"Outcome" label missing in card');
  });

  test('outcome text uses accent colour', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(block.includes('var(--accent)'), 'accent colour missing from outcome metric');
  });

  test('dark card background (navy-800)', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(block.includes('navy-800') || block.includes('surface-overlay'), 'dark card background missing');
  });
});

describe('DGS-C2-03 — Link to Case Studies page', () => {
  test('link to /case-studies present', () => {
    assert.ok(src.includes('/case-studies'), 'Link to /case-studies missing');
  });

  test('"View all case studies" CTA present', () => {
    assert.ok(src.includes('View all case studies'), '"View all case studies" CTA missing');
  });
});

describe('DGS-C2-03 — Responsive layout', () => {
  test('3-col desktop grid (md:grid-cols-3)', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    // check the wrapping grid div
    const gridIdx = src.lastIndexOf('md:grid-cols-3', src.indexOf('CASE_STUDIES.map'));
    // search forward from section start
    const sectionStart = src.indexOf('aria-label="Case studies"');
    const sectionEnd   = src.indexOf('§07 Insights');
    const sectionSrc   = src.slice(sectionStart, sectionEnd);
    assert.ok(sectionSrc.includes('md:grid-cols-3'), 'md:grid-cols-3 missing on case studies grid');
  });

  test('1-col mobile baseline (grid-cols-1)', () => {
    const sectionStart = src.indexOf('aria-label="Case studies"');
    const sectionEnd   = src.indexOf('§07 Insights');
    const sectionSrc   = src.slice(sectionStart, sectionEnd);
    assert.ok(sectionSrc.includes('grid-cols-1'), 'grid-cols-1 mobile baseline missing');
  });
});

describe('DGS-C2-03 — No raw CSS', () => {
  test('no hardcoded hex colours in page.tsx', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found in page.tsx`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });

  test('no inline style attributes (except hero SVG and panel)', () => {
    // hero panel uses inline style for backgroundImage — this is the permitted exception
    // case study cards must not add new inline styles
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(!block.includes('style={'), 'Unexpected inline style in case study cards');
  });
});
