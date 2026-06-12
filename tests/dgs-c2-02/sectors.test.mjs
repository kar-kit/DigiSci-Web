/**
 * DGS-C2-02: Industry sectors section
 * Sectors are on the /industry page per mockups/industry.html.
 * AC: Three detailed sector sections: Cell & Gene Therapy, Pharmaceutical Manufacturing,
 *     AI in Regulated Environments. Each with sector tags, body copy, and capabilities.
 *
 * NOTE: Updated from stub (basic grid) to full mockup spec (three individual sections).
 * The mockup spec uses three separate detail sections, not a single SECTORS.map grid.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/industry/page.tsx'), 'utf8');

describe('DGS-C2-02 — Page structure', () => {
  test('industry page exports a default component', () => {
    assert.ok(src.includes('export default function') || src.includes('export default async function'), 'No default export function found');
  });

  test('page hero section present', () => {
    assert.ok(src.includes('aria-label="Page hero"'), 'Page hero aria-label missing');
  });

  test('page heading about deep expertise present', () => {
    assert.ok(
      src.includes('Deep Expertise') || src.includes('Deep expertise') || src.includes('demand it most'),
      'Deep expertise heading missing'
    );
  });
});

describe('DGS-C2-02 — All three sectors present', () => {
  test('Cell & Gene Therapy sector section present', () => {
    assert.ok(
      src.includes('Cell and Gene Therapy expertise') || src.includes('Cell & Gene Therapy') || src.includes('Cell &amp; Gene Therapy'),
      'Cell & Gene Therapy sector missing'
    );
  });

  test('Pharmaceutical Manufacturing sector section present', () => {
    assert.ok(
      src.includes('Pharmaceutical Manufacturing'),
      'Pharmaceutical Manufacturing sector missing'
    );
  });

  test('AI in Regulated Environments sector section present', () => {
    assert.ok(
      src.includes('AI in Regulated Environments'),
      'AI in Regulated Environments sector missing'
    );
  });
});

describe('DGS-C2-02 — Sector tags', () => {
  test('CGT sector tags present (ATMP, chain of identity, GMP)', () => {
    assert.ok(src.includes('ATMP'), 'ATMP tag missing');
    assert.ok(src.includes('Chain of identity') || src.includes('chain of identity'), 'Chain of identity tag missing');
    assert.ok(src.includes('GMP cell therapy') || src.includes('GMP'), 'GMP cell therapy tag missing');
  });

  test('pharma sector tags present (small-molecule, quality systems)', () => {
    assert.ok(
      src.includes('Small-molecule') || src.includes('small-molecule'),
      'Small-molecule tag missing'
    );
    assert.ok(src.includes('Quality systems') || src.includes('quality systems'), 'Quality systems tag missing');
  });

  test('AI sector regulatory tags present', () => {
    assert.ok(src.includes('GxP'), 'GxP tag missing');
    assert.ok(src.includes('ALCOA+') || src.includes('ALCOA'), 'ALCOA+ tag missing');
  });

  test('Tag component with sector variant used', () => {
    assert.ok(src.includes('variant="sector"'), 'sector variant Tag missing');
  });
});

describe('DGS-C2-02 — Sector body copy', () => {
  test('CGT body copy mentions patient-specific or autologous/allogeneic', () => {
    assert.ok(
      src.includes('patient-specific') || src.includes('autologous') || src.includes('allogeneic'),
      'CGT patient-specific manufacturing context missing'
    );
  });

  test('Pharma body copy mentions quality/compliance alignment', () => {
    assert.ok(
      src.includes('compliance') || src.includes('quality') && src.includes('aligned'),
      'Pharma quality/compliance context missing'
    );
  });

  test('AI section mentions regulatory compliance / defensible', () => {
    assert.ok(
      src.includes('defensible') || src.includes('regulatory compliance') || src.includes('regulatory expectations'),
      'AI regulatory defensibility context missing'
    );
  });
});

describe('DGS-C2-02 — Capabilities and CTAs', () => {
  test('Check icon used for capability items', () => {
    assert.ok(src.includes('Check'), 'Check icon missing from capabilities list');
  });

  test('link to /case-studies present from sector sections', () => {
    assert.ok(src.includes('/case-studies'), 'Link to /case-studies missing');
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
