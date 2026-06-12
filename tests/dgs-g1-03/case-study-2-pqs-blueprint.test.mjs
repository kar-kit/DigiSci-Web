/**
 * DGS-G1-03: Case study 2 — Digital PQS Blueprint
 * AC: Sections: Client context (emerging biotech, advanced therapies), Challenge,
 *     Approach (PQS assessment, GxP/ALCOA+ alignment, digital landscape, commercial scalability),
 *     Impact (regulatory alignment, inspection readiness, leadership alignment). Anonymised.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/case-studies/[slug]/page.tsx'), 'utf8');

describe('DGS-G1-03 — Case study 2 content', () => {
  test('title "Digital Pharmaceutical Quality System Blueprint" present', () => {
    assert.ok(src.includes('Digital Pharmaceutical Quality System Blueprint'), 'Case study 2 title missing');
  });

  test('"digital-pqs-blueprint" slug present', () => {
    assert.ok(src.includes('digital-pqs-blueprint'), 'Case study 2 slug missing');
  });

  test('"Emerging Biotech" client context present', () => {
    assert.ok(src.includes('Emerging Biotech') || src.includes('emerging biotech'), 'Emerging biotech client context missing');
  });

  test('advanced therapies context present', () => {
    assert.ok(
      src.includes('Advanced Therapies') || src.includes('advanced therapies'),
      'Advanced therapies context missing'
    );
  });

  test('"Cell & Gene Therapy" sector tag present', () => {
    assert.ok(
      src.includes("'Cell & Gene Therapy'") || src.includes('"Cell & Gene Therapy"') || src.includes('Cell &amp; Gene Therapy'),
      'Cell & Gene Therapy sector tag missing'
    );
  });

  test('"Inspection-ready roadmap" outcome present', () => {
    assert.ok(src.includes('Inspection-ready roadmap'), 'Case study 2 outcome metric missing');
  });
});

describe('DGS-G1-03 — Approach details (AC requirements)', () => {
  test('PQS assessment mentioned in approach', () => {
    assert.ok(
      src.includes('PQS transformation') || src.includes('PQS assessment') || src.includes('PQS Blueprint'),
      'PQS assessment/transformation missing from approach'
    );
  });

  test('GxP alignment mentioned in approach', () => {
    assert.ok(src.includes('GxP'), 'GxP alignment missing from approach');
  });

  test('digital quality architecture mentioned', () => {
    assert.ok(
      src.includes('digital quality') || src.includes('Digital PQS') || src.includes('digital architecture'),
      'Digital quality architecture missing from approach'
    );
  });

  test('commercial scalability / phased roadmap mentioned', () => {
    assert.ok(
      src.includes('scalability') || src.includes('phased roadmap') || src.includes('commercial scale'),
      'Commercial scalability / phased roadmap missing'
    );
  });
});

describe('DGS-G1-03 — Impact details (AC requirements)', () => {
  test('regulatory alignment impact present', () => {
    assert.ok(
      src.includes('regulatory expectations') || src.includes('regulatory alignment'),
      'Regulatory alignment impact missing'
    );
  });

  test('inspection readiness impact present', () => {
    assert.ok(src.includes('inspection readiness') || src.includes('inspection-ready'), 'Inspection readiness impact missing');
  });

  test('leadership alignment impact present', () => {
    assert.ok(src.includes('leadership alignment') || src.includes('leadership'), 'Leadership alignment impact missing');
  });
});

describe('DGS-G1-03 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
