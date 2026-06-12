/**
 * DGS-F1-01: Cell & Gene Therapy expertise section on Industry Expertise page
 * AC: Covers autologous/allogeneic manufacturing, GMP cell therapy QS, scale-up strategy,
 *     AI-enabled batch disposition, digital MBR, chain of identity/custody.
 *     Sector tag. Link to relevant case study.
 *     Visual spec per mockups/industry.html §01.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/industry/page.tsx'), 'utf8');

describe('DGS-F1-01 — Page exists', () => {
  test('app/industry/page.tsx exists and is non-empty', () => {
    assert.ok(src.length > 100, 'app/industry/page.tsx appears empty');
  });

  test('page exports a default React component', () => {
    assert.ok(src.includes('export default function'), 'No default export function found');
  });
});

describe('DGS-F1-01 — Page hero', () => {
  test('page hero section present', () => {
    assert.ok(src.includes('aria-label="Page hero"'), 'Page hero aria-label missing');
  });

  test('h1 about expertise across biotech/pharma operations present', () => {
    assert.ok(
      src.includes('Deep Expertise Across Biotech'),
      'h1 heading missing'
    );
  });
});

describe('DGS-F1-01 — CGT expertise section', () => {
  test('CGT section present with aria-label', () => {
    assert.ok(
      src.includes('aria-label="Cell and Gene Therapy expertise"'),
      'CGT section aria-label missing'
    );
  });

  test('eyebrow "01 Sector" present in CGT section', () => {
    const block = src.slice(src.indexOf('aria-label="Cell and Gene Therapy expertise"'));
    assert.ok(
      block.includes('index="01"') && block.includes('Sector'),
      'Eyebrow "01 Sector" missing from CGT section'
    );
  });

  test('"Cell & Gene Therapy" heading present', () => {
    assert.ok(
      src.includes('Cell &amp; Gene Therapy') || src.includes("Cell & Gene Therapy"),
      '"Cell & Gene Therapy" heading missing'
    );
  });

  test('Dna icon used in CGT section', () => {
    assert.ok(src.includes('Dna'), 'Dna icon missing from CGT section');
  });
});

describe('DGS-F1-01 — CGT sector tags', () => {
  test('patient-specific manufacturing tag present', () => {
    assert.ok(src.includes('Patient-specific mfg') || src.includes('patient-specific'), 'Patient-specific manufacturing tag missing');
  });

  test('ATMP regulations tag present', () => {
    assert.ok(src.includes('ATMP'), 'ATMP tag missing');
  });

  test('chain of identity tag present', () => {
    assert.ok(src.includes('Chain of identity'), 'Chain of identity tag missing');
  });

  test('GMP cell therapy tag present', () => {
    assert.ok(src.includes('GMP cell therapy'), 'GMP cell therapy tag missing');
  });
});

describe('DGS-F1-01 — CGT capabilities (AC requirements)', () => {
  test('CGT manufacturing / quality system design present', () => {
    assert.ok(
      src.includes('CGT manufacturing') || src.includes('quality system design'),
      'CGT manufacturing/quality system capability missing'
    );
  });

  test('manufacturing scale-up strategy present', () => {
    assert.ok(
      src.includes('scale-up strategy') || src.includes('Manufacturing scale-up'),
      'Scale-up strategy capability missing'
    );
  });

  test('AI-enabled batch disposition present', () => {
    assert.ok(src.includes('batch disposition'), 'AI-enabled batch disposition capability missing');
  });

  test('digital MBR present', () => {
    assert.ok(src.includes('Digital MBR') || src.includes('digital MBR'), 'Digital MBR capability missing');
  });

  test('chain of identity / custody present', () => {
    assert.ok(
      src.includes('chain of identity') || src.includes('chain of custody') || src.includes('identity / custody'),
      'Chain of identity/custody capability missing'
    );
  });
});

describe('DGS-F1-01 — CGT body copy', () => {
  test('patient-specific production challenges mentioned', () => {
    assert.ok(
      src.includes('patient-specific') || src.includes('autologous') || src.includes('allogeneic'),
      'Patient-specific / autologous / allogeneic manufacturing context missing'
    );
  });

  test('regulatory frameworks complexity mentioned', () => {
    assert.ok(
      src.includes('regulatory') && (src.includes('frontier') || src.includes('framework') || src.includes('immature')),
      'Regulatory complexity context missing'
    );
  });
});

describe('DGS-F1-01 — Link to case studies', () => {
  test('link to /case-studies in CGT section', () => {
    const block = src.slice(src.indexOf('aria-label="Cell and Gene Therapy expertise"'));
    assert.ok(block.includes('href="/case-studies"'), 'Link to /case-studies missing from CGT section');
  });
});

describe('DGS-F1-01 — Layout', () => {
  test('2-col layout at md breakpoint in CGT section', () => {
    const block = src.slice(src.indexOf('aria-label="Cell and Gene Therapy expertise"'));
    assert.ok(block.includes('md:grid-cols'), '2-col md layout missing in CGT section');
  });
});

describe('DGS-F1-01 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });
});
