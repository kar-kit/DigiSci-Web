/**
 * DGS-G1-04: Case study 3 — Manufacturing Data Architecture for CGT
 * AC: Sections: Client context (CGT development company), Challenge,
 *     Approach (data mapping, integration architecture, analytics, GxP governance),
 *     Impact (integrated data access, AI analytics foundation, process trends). Anonymised.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/case-studies/[slug]/page.tsx'), 'utf8');

describe('DGS-G1-04 — Case study 3 content', () => {
  test('title "Manufacturing Data Architecture for Cell Therapy Operations" present', () => {
    assert.ok(
      src.includes('Manufacturing Data Architecture for Cell Therapy Operations'),
      'Case study 3 title missing'
    );
  });

  test('"manufacturing-data-architecture-cgt" slug present', () => {
    assert.ok(src.includes('manufacturing-data-architecture-cgt'), 'Case study 3 slug missing');
  });

  test('CGT development company client context present', () => {
    assert.ok(
      src.includes('Cell & Gene Therapy Development Company') || src.includes('CGT development'),
      'CGT development company client context missing'
    );
  });

  test('"Unified operational data layer" outcome present', () => {
    assert.ok(src.includes('Unified operational data layer'), 'Case study 3 outcome metric missing');
  });

  test('"Digital Ops" service tag present', () => {
    assert.ok(src.includes('Digital Ops'), 'Digital Ops service tag missing');
  });
});

describe('DGS-G1-04 — Approach details (AC requirements)', () => {
  test('data mapping mentioned in approach', () => {
    assert.ok(src.includes('data mapping') || src.includes('data map'), 'Data mapping missing from approach');
  });

  test('integration architecture mentioned in approach', () => {
    assert.ok(
      src.includes('integration architecture') || src.includes('Integration Architecture'),
      'Integration architecture missing from approach'
    );
  });

  test('analytics architecture mentioned in approach', () => {
    assert.ok(
      src.includes('analytics architecture') || src.includes('Analytics Architecture'),
      'Analytics architecture missing from approach'
    );
  });

  test('GxP governance mentioned in approach', () => {
    assert.ok(
      src.includes('GxP') && (src.includes('governance') || src.includes('data integrity')),
      'GxP governance missing from approach'
    );
  });
});

describe('DGS-G1-04 — Impact details (AC requirements)', () => {
  test('integrated data access/visibility impact present', () => {
    assert.ok(
      src.includes('Integrated data') || src.includes('integrated data'),
      'Integrated data visibility impact missing'
    );
  });

  test('AI analytics foundation impact present', () => {
    assert.ok(
      src.includes('AI-enabled analytics') || src.includes('AI analytics') || src.includes('foundation for AI'),
      'AI analytics foundation impact missing'
    );
  });

  test('process trends / trend identification impact present', () => {
    assert.ok(
      src.includes('trend identification') || src.includes('process trend') || src.includes('trend'),
      'Trend identification impact missing'
    );
  });
});

describe('DGS-G1-04 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
