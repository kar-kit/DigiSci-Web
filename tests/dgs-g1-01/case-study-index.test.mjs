/**
 * DGS-G1-01: Case study index page
 * AC: 3 case study cards with client type, sector tag, project type, headline outcome.
 *     Dark card grid layout. CTA to Book a Discovery Call.
 *     Visual spec per mockups/case-studies.html.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/case-studies/page.tsx'), 'utf8');

describe('DGS-G1-01 — Page exists', () => {
  test('app/case-studies/page.tsx exists and is non-empty', () => {
    assert.ok(src.length > 100, 'app/case-studies/page.tsx appears empty');
  });

  test('page exports a default React component', () => {
    assert.ok(src.includes('export default function'), 'No default export function found');
  });
});

describe('DGS-G1-01 — Page hero', () => {
  test('page hero section present', () => {
    assert.ok(src.includes('aria-label="Page hero"'), 'Page hero aria-label missing');
  });

  test('"Client Work" h1 present', () => {
    assert.ok(src.includes('Client Work'), '"Client Work" h1 missing');
  });

  test('anonymised/confidentiality note present', () => {
    assert.ok(
      src.includes('anonymised') || src.includes('anonymized') || src.includes('confidentiality'),
      'Anonymised/confidentiality note missing'
    );
  });
});

describe('DGS-G1-01 — Case studies section', () => {
  test('"Case studies" section present', () => {
    assert.ok(src.includes('aria-label="Case studies"'), '"Case studies" section aria-label missing');
  });

  test('CASE_STUDIES constant declared with 3 entries', () => {
    assert.ok(src.includes('CASE_STUDIES'), 'CASE_STUDIES constant missing');
    const idx   = src.indexOf('const CASE_STUDIES');
    const end   = src.indexOf('] as const', idx);
    const block = src.slice(idx, end);
    const count = (block.match(/slug:/g) || []).length;
    assert.equal(count, 3, `Expected 3 slug entries in CASE_STUDIES, found ${count}`);
  });
});

describe('DGS-G1-01 — All three case study cards', () => {
  test('all three titles present', () => {
    assert.ok(src.includes('AI-Enabled Regulatory Documentation Platform'), 'Case study 1 title missing');
    assert.ok(src.includes('Digital Pharmaceutical Quality System Blueprint'), 'Case study 2 title missing');
    assert.ok(src.includes('Manufacturing Data Architecture for Cell Therapy Operations'), 'Case study 3 title missing');
  });

  test('all three client descriptions present', () => {
    assert.ok(src.includes('Global Life Sciences'), 'Case study 1 client missing');
    assert.ok(src.includes('Emerging Biotech'), 'Case study 2 client missing');
    assert.ok(src.includes('Cell & Gene Therapy Development Company') || src.includes('Cell &amp; Gene Therapy Development Company'), 'Case study 3 client missing');
  });

  test('all three outcome metrics present', () => {
    assert.ok(src.includes('CTD drafting accelerated'), 'Case study 1 outcome missing');
    assert.ok(src.includes('Inspection-ready roadmap'), 'Case study 2 outcome missing');
    assert.ok(src.includes('Unified operational data layer'), 'Case study 3 outcome missing');
  });

  test('all three sector tags present', () => {
    assert.ok(src.includes('Biopharmaceutical'), 'Biopharmaceutical sector tag missing');
    assert.ok(src.includes('Cell & Gene Therapy') || src.includes("'Cell & Gene Therapy'"), 'CGT sector tag missing');
  });

  test('all three service tags present', () => {
    assert.ok(src.includes('AI Implementation'), 'AI Implementation service tag missing');
    assert.ok(src.includes('AI Strategy'), 'AI Strategy service tag missing');
    assert.ok(src.includes('Digital Ops'), 'Digital Ops service tag missing');
  });
});

describe('DGS-G1-01 — Card markup', () => {
  test('article elements used for case study cards', () => {
    assert.ok(src.includes('<article'), 'article element missing from case study cards');
  });

  test('dark card background (navy-800)', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(
      block.includes('navy-800') || block.includes('surface-overlay'),
      'Dark card background missing'
    );
  });

  test('sector Tag with dot variant present', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(block.includes('variant="sector"') && block.includes('dot'), 'Sector Tag with dot variant missing');
  });

  test('accent Tag for service type present', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(block.includes('variant="accent"'), 'Accent Tag for service type missing');
  });
});

describe('DGS-G1-01 — Challenge / Approach / Impact sections', () => {
  test('Challenge, Approach, Impact labels present in card template', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(block.includes('Challenge'), '"Challenge" label missing');
    assert.ok(block.includes('Approach'), '"Approach" label missing');
    assert.ok(block.includes('Impact'), '"Impact" label missing');
  });

  test('3-col grid for Challenge/Approach/Impact at md', () => {
    const block = src.slice(src.indexOf('CASE_STUDIES.map'));
    assert.ok(block.includes('md:grid-cols-3'), 'md:grid-cols-3 missing on Challenge/Approach/Impact grid');
  });
});

describe('DGS-G1-01 — Links to detail pages', () => {
  test('links to /case-studies/[slug] present', () => {
    assert.ok(src.includes('/case-studies/'), 'Links to case study detail pages missing');
  });

  test('"Read full case study" CTA present', () => {
    assert.ok(src.includes('Read full case study'), '"Read full case study" CTA missing');
  });
});

describe('DGS-G1-01 — Filter bar', () => {
  test('filter bar section present', () => {
    assert.ok(src.includes('aria-label="Filter bar"'), '"Filter bar" section aria-label missing');
  });

  test('filter options include "All work" and sector names', () => {
    assert.ok(src.includes('All work'), '"All work" filter missing');
    assert.ok(src.includes('Cell & Gene Therapy') || src.includes("'Cell & Gene Therapy'"), 'CGT filter missing');
  });

  test('engagement count label present', () => {
    assert.ok(src.includes('engagements') || src.includes('engagement'), 'Engagement count label missing');
  });
});

describe('DGS-G1-01 — CTA band', () => {
  test('"See your own problem" CTA heading present', () => {
    assert.ok(src.includes('See your own problem'), '"See your own problem" heading missing');
  });

  test('"Book a Discovery Call" CTA present', () => {
    assert.ok(src.includes('Book a Discovery Call'), '"Book a Discovery Call" CTA missing');
  });

  test('"Discuss a Similar Challenge" primary CTA present', () => {
    assert.ok(src.includes('Discuss a Similar Challenge'), '"Discuss a Similar Challenge" primary CTA missing');
  });
});

describe('DGS-G1-01 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });
});
