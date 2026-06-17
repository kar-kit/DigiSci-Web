/**
 * DGS-F1-03: AI in Regulated Environments expertise section on Industry Expertise page
 * AC: Covers AI governance, CSV/computer system validation for AI, ALCOA+, data integrity,
 *     regulatory strategy for AI-enabled QMS. References practical implementation in GxP environments.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/industry/page.tsx'), 'utf8');

describe('DGS-F1-03 — AI in Regulated Environments section exists', () => {
  test('AI in Regulated Environments section present with aria-label', () => {
    assert.ok(
      src.includes('aria-label="AI in Regulated Environments expertise"'),
      'AI in Regulated Environments section aria-label missing'
    );
  });

  test('section appears as third sector section (index "03")', () => {
    const block = src.slice(src.indexOf('aria-label="AI in Regulated Environments expertise"'));
    assert.ok(
      block.includes('index="03"') && block.includes('Sector'),
      'Eyebrow "03 Sector" missing from AI Regulated section'
    );
  });

  test('"AI in Regulated Environments" heading present', () => {
    assert.ok(
      src.includes('AI in Regulated Environments'),
      '"AI in Regulated Environments" heading missing'
    );
  });

  test('ShieldCheck icon used in section', () => {
    assert.ok(src.includes('ShieldCheck'), 'ShieldCheck icon missing from AI Regulated section');
  });
});

describe('DGS-F1-03 — Sector tags (AC requirements)', () => {
  const aiRegBlock = () => src.slice(src.indexOf('FALLBACK_AI_REGULATED'));

  test('GxP tag present', () => {
    assert.ok(aiRegBlock().includes("'GxP'") || aiRegBlock().includes('"GxP"') || src.includes('GxP'), 'GxP tag missing');
  });

  test('CSV tag present', () => {
    assert.ok(
      src.includes("'CSV'") || src.includes('"CSV"') || src.includes('CSV'),
      'CSV tag missing'
    );
  });

  test('ALCOA+ tag present', () => {
    assert.ok(src.includes('ALCOA+'), 'ALCOA+ tag missing');
  });

  test('21 CFR Part 11 regulatory reference present', () => {
    assert.ok(src.includes('21 CFR Part 11') || src.includes('CFR Part 11'), '21 CFR Part 11 missing');
  });

  test('EU Annex 11 regulatory reference present', () => {
    assert.ok(src.includes('EU Annex 11') || src.includes('Annex 11'), 'EU Annex 11 missing');
  });

  test('GAMP 5 reference present', () => {
    assert.ok(src.includes('GAMP 5') || src.includes('GAMP5'), 'GAMP 5 reference missing');
  });
});

describe('DGS-F1-03 — Capabilities (AC requirements)', () => {
  test('AI governance frameworks capability present', () => {
    assert.ok(
      src.includes('AI governance') || src.includes('governance framework'),
      'AI governance frameworks capability missing'
    );
  });

  test('CSV / computer system validation for AI capability present', () => {
    assert.ok(
      src.includes('computer system validation') || src.includes('CSV &') || src.includes('CSV and'),
      'CSV / computer system validation for AI capability missing'
    );
  });

  test('data integrity / ALCOA+ capability present', () => {
    assert.ok(
      src.includes('Data integrity') || src.includes('data integrity'),
      'Data integrity capability missing'
    );
  });

  test('regulatory strategy for AI-enabled quality systems present', () => {
    assert.ok(
      src.includes('Regulatory strategy') || src.includes('regulatory strategy'),
      'Regulatory strategy for AI-enabled quality systems capability missing'
    );
  });
});

describe('DGS-F1-03 — Body copy references GxP and regulatory compliance', () => {
  test('GxP or regulated environment context in body copy', () => {
    assert.ok(
      src.includes('regulated') && src.includes('governance'),
      'GxP / regulated environment governance context missing from body copy'
    );
  });

  test('validation or risk-management mentioned', () => {
    assert.ok(
      src.includes('validation') || src.includes('risk-management') || src.includes('risk management'),
      'Validation / risk-management context missing'
    );
  });

  test('regulatory expectations or defensibility mentioned', () => {
    assert.ok(
      src.includes('regulatory expectations') || src.includes('defensible') || src.includes('compliance'),
      'Regulatory expectations / defensibility context missing'
    );
  });
});

describe('DGS-F1-03 — CTA links to services', () => {
  test('AI Regulated section has a CTA linking to /services', () => {
    const block = src.slice(src.indexOf('aria-label="AI in Regulated Environments expertise"'));
    assert.ok(block.includes('/services'), 'CTA link to /services missing from AI Regulated section');
  });
});

describe('DGS-F1-03 — Layout and structure', () => {
  test('section appears after Pharmaceutical Manufacturing section in source order', () => {
    const pharmaIdx = src.indexOf('aria-label="Pharmaceutical Manufacturing expertise"');
    const aiIdx     = src.indexOf('aria-label="AI in Regulated Environments expertise"');
    assert.ok(pharmaIdx !== -1, 'Pharmaceutical Manufacturing section missing');
    assert.ok(aiIdx !== -1, 'AI in Regulated Environments section missing');
    assert.ok(aiIdx > pharmaIdx, 'AI Regulated section must appear after Pharmaceutical Manufacturing');
  });

  test('responsive 2-col layout present', () => {
    assert.ok(src.includes('md:grid-cols'), '2-col md layout missing on industry page');
  });
});

describe('DGS-F1-03 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });
});
