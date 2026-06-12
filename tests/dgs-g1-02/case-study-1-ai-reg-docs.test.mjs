/**
 * DGS-G1-02: Case study 1 — AI Regulatory Documentation Platform
 * AC: Sections: Client context (global life sciences consulting firm), Challenge,
 *     Approach (CTD templates, knowledge base, AI drafting, expert-in-the-loop),
 *     Impact (accelerated drafting, consistency, knowledge reuse). Anonymised. Sector tag. CTA.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/case-studies/[slug]/page.tsx'), 'utf8');

describe('DGS-G1-02 — Detail page exists', () => {
  test('app/case-studies/[slug]/page.tsx exists and is non-empty', () => {
    assert.ok(src.length > 100, 'page.tsx appears empty');
  });

  test('page exports a default React component', () => {
    assert.ok(src.includes('export default'), 'No default export found');
  });

  test('generateStaticParams exports all three slugs', () => {
    assert.ok(src.includes('generateStaticParams'), 'generateStaticParams missing');
    assert.ok(src.includes('ai-regulatory-documentation-platform'), 'Case study 1 slug missing');
    assert.ok(src.includes('digital-pqs-blueprint'), 'Case study 2 slug missing');
    assert.ok(src.includes('manufacturing-data-architecture-cgt'), 'Case study 3 slug missing');
  });

  test('notFound() called for unknown slug', () => {
    assert.ok(src.includes('notFound'), 'notFound() handler missing');
  });
});

describe('DGS-G1-02 — Case study 1 content', () => {
  test('title "AI-Enabled Regulatory Documentation Platform" present', () => {
    assert.ok(src.includes('AI-Enabled Regulatory Documentation Platform'), 'Case study 1 title missing');
  });

  test('client "Global Life Sciences" context present', () => {
    assert.ok(src.includes('Global Life Sciences'), 'Global Life Sciences client context missing');
  });

  test('"Biopharmaceutical" sector and "AI Implementation" service present', () => {
    assert.ok(src.includes('Biopharmaceutical'), 'Biopharmaceutical sector missing');
    assert.ok(src.includes('AI Implementation'), 'AI Implementation service tag missing');
  });

  test('"CTD drafting accelerated" outcome present', () => {
    assert.ok(src.includes('CTD drafting accelerated'), 'Outcome metric missing');
  });
});

describe('DGS-G1-02 — Page sections', () => {
  test('Client context section present', () => {
    assert.ok(src.includes('aria-label="Client context"'), 'Client context section aria-label missing');
  });

  test('Challenge section present', () => {
    assert.ok(src.includes('aria-label="Challenge"'), 'Challenge section aria-label missing');
  });

  test('Approach section present', () => {
    assert.ok(src.includes('aria-label="Approach"'), 'Approach section aria-label missing');
  });

  test('Impact section present', () => {
    assert.ok(src.includes('aria-label="Impact"'), 'Impact section aria-label missing');
  });
});

describe('DGS-G1-02 — Approach details (AC requirements)', () => {
  test('CTD templates mentioned in approach', () => {
    assert.ok(src.includes('CTD template') || src.includes('CTD templates'), 'CTD templates missing from approach');
  });

  test('knowledge base mentioned in approach', () => {
    assert.ok(
      src.includes('knowledge base') || src.includes('regulatory knowledge'),
      'Knowledge base missing from approach'
    );
  });

  test('AI drafting mentioned in approach', () => {
    assert.ok(src.includes('AI drafting') || src.includes('drafting workflow'), 'AI drafting workflows missing from approach');
  });

  test('expert-in-the-loop mentioned in approach', () => {
    assert.ok(src.includes('expert-in-the-loop') || src.includes('expert in the loop'), 'Expert-in-the-loop missing from approach');
  });
});

describe('DGS-G1-02 — Impact details (AC requirements)', () => {
  test('accelerated drafting impact present', () => {
    assert.ok(src.includes('Accelerated drafting') || src.includes('accelerated'), 'Accelerated drafting impact missing');
  });

  test('consistency impact present', () => {
    assert.ok(src.includes('consistency') || src.includes('consistent'), 'Consistency impact missing');
  });

  test('knowledge reuse impact present', () => {
    assert.ok(src.includes('knowledge reuse') || src.includes('reuse'), 'Knowledge reuse impact missing');
  });
});

describe('DGS-G1-02 — Anonymisation and tags', () => {
  test('client is anonymised (no real company name)', () => {
    assert.ok(
      src.includes('Global Life Sciences Consulting Firm') || src.includes('anonymised') || src.includes('anonymized'),
      'Client should be anonymised — use generic description'
    );
    assert.ok(!src.includes('Pfizer') && !src.includes('Roche') && !src.includes('AstraZeneca'), 'Real client name must not appear');
  });

  test('sector tag component used in hero', () => {
    const heroBlock = src.slice(src.indexOf('aria-label="Page hero"'));
    assert.ok(heroBlock.includes('<Tag'), 'Tag component missing from case study hero');
  });
});

describe('DGS-G1-02 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
