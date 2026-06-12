/**
 * DGS-F1-02: Pharmaceutical Manufacturing expertise section on Industry page
 * AC: Covers quality systems, data architecture, AI-enabled operational intelligence,
 *     PAT integration. Small-molecule and biologics called out.
 *     Visual spec per mockups/industry.html §02.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/industry/page.tsx'), 'utf8');

describe('DGS-F1-02 — Pharma Manufacturing section structure', () => {
  test('"Pharmaceutical Manufacturing expertise" section present', () => {
    assert.ok(
      src.includes('aria-label="Pharmaceutical Manufacturing expertise"'),
      '"Pharmaceutical Manufacturing expertise" section aria-label missing'
    );
  });

  test('eyebrow "02 Sector" present in pharma section', () => {
    const block = src.slice(src.indexOf('aria-label="Pharmaceutical Manufacturing expertise"'));
    assert.ok(
      block.includes('index="02"') && block.includes('Sector'),
      'Eyebrow "02 Sector" missing from pharma section'
    );
  });

  test('"Pharmaceutical Manufacturing" heading present', () => {
    assert.ok(src.includes('Pharmaceutical Manufacturing'), '"Pharmaceutical Manufacturing" heading missing');
  });

  test('Factory icon used in pharma section', () => {
    assert.ok(src.includes('Factory'), 'Factory icon missing from pharma section');
  });
});

describe('DGS-F1-02 — Pharma sector tags (AC requirements)', () => {
  test('small-molecule and biologics tag present', () => {
    assert.ok(
      src.includes('Small-molecule') || src.includes('small-molecule'),
      'Small-molecule tag missing'
    );
    assert.ok(src.includes('biologics') || src.includes('Biologics'), 'biologics reference missing');
  });

  test('quality systems tag present', () => {
    assert.ok(src.includes('Quality systems') || src.includes('quality systems'), 'Quality systems tag missing');
  });

  test('data architecture tag present', () => {
    assert.ok(src.includes('Data architecture') || src.includes('data architecture'), 'Data architecture tag missing');
  });

  test('PAT tag present', () => {
    assert.ok(src.includes('PAT'), 'PAT tag missing');
  });
});

describe('DGS-F1-02 — Pharma capabilities (AC requirements)', () => {
  test('manufacturing data infrastructure / architecture capability present', () => {
    assert.ok(
      src.includes('Manufacturing data infrastructure') || src.includes('data architecture'),
      'Manufacturing data infrastructure capability missing'
    );
  });

  test('operational analytics / KPI capability present', () => {
    assert.ok(
      src.includes('analytics') || src.includes('KPI'),
      'Operational analytics / KPI capability missing'
    );
  });

  test('digital quality system capability present', () => {
    assert.ok(
      src.includes('quality system') || src.includes('Quality system'),
      'Digital quality system capability missing'
    );
  });

  test('AI-enabled PAT integration capability present', () => {
    assert.ok(
      src.includes('PAT integration') || src.includes('PAT'),
      'PAT integration capability missing'
    );
  });
});

describe('DGS-F1-02 — Pharma body copy', () => {
  test('transformation across manufacturing/quality/regulatory alignment mentioned', () => {
    assert.ok(
      src.includes('aligned') || src.includes('aligned') || src.includes('boundary'),
      'Transformation alignment context missing'
    );
  });

  test('data/process/compliance as one system mentioned', () => {
    assert.ok(
      src.includes('one system') || src.includes('compliance'),
      '"one system" or compliance framing missing'
    );
  });
});

describe('DGS-F1-02 — Visual distinction (sunken background)', () => {
  test('pharma section uses sunken background (alternating from CGT)', () => {
    const block = src.slice(src.indexOf('aria-label="Pharmaceutical Manufacturing expertise"'));
    assert.ok(
      block.includes('surface-sunken') || block.includes('sunken'),
      'Pharma section should have sunken background for visual separation'
    );
  });
});

describe('DGS-F1-02 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
