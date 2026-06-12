/**
 * DGS-E1-01: Four service lines detail page
 * AC: 4 sections — AI Transformation Strategy (6-12 wk), AI Implementation Programmes (3-9 mo),
 *     Digital Operations Transformation (project), Operational Excellence (advisory).
 *     Each shows engagement type, duration, key deliverables, and typical outcomes.
 *     Enquire CTA per section. Visual spec per mockups/services.html.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/services/page.tsx'), 'utf8');

describe('DGS-E1-01 — Page exists', () => {
  test('app/services/page.tsx exists and is non-empty', () => {
    assert.ok(src.length > 100, 'app/services/page.tsx appears empty');
  });

  test('page exports a default React component', () => {
    assert.ok(src.includes('export default function') || src.includes('export default async function'), 'No default export function found');
  });
});

describe('DGS-E1-01 — Page hero', () => {
  test('page hero section present', () => {
    assert.ok(src.includes('aria-label="Page hero"'), 'Page hero aria-label missing');
  });

  test('h1 "Consulting Services for AI-Enabled Biotech Operations" present', () => {
    assert.ok(
      src.includes('Consulting Services for AI-Enabled Biotech Operations'),
      'h1 heading missing'
    );
  });

  test('"four focused lines" positioning copy present', () => {
    assert.ok(src.includes('Four focused lines'), '"Four focused lines" copy missing');
  });
});

describe('DGS-E1-01 — Service lines section', () => {
  test('"Service lines" section present', () => {
    assert.ok(src.includes('aria-label="Service lines"'), '"Service lines" section aria-label missing');
  });

  test('eyebrow "01 Service lines" present', () => {
    const block = src.slice(src.indexOf('aria-label="Service lines"'));
    assert.ok(block.includes('index="01"') && block.includes('Service lines'), 'Eyebrow "01 Service lines" missing');
  });

  test('section heading present', () => {
    assert.ok(src.includes('Scope, duration, outcome'), 'Section heading missing');
  });

  test('SERVICES constant declared with 4 entries', () => {
    assert.ok(src.includes('SERVICES'), 'SERVICES constant missing');
    const constKey = src.includes('const FALLBACK_SERVICES') ? 'const FALLBACK_SERVICES' : 'const SERVICES';
    const idx   = src.indexOf(constKey);
    const end   = src.indexOf('];', idx);
    const block = src.slice(idx, end);
    const count = (block.match(/title:/g) || []).length;
    assert.equal(count, 4, `Expected 4 title entries in SERVICES, found ${count}`);
  });
});

describe('DGS-E1-01 — All four service lines', () => {
  test('Service 01: AI Transformation Strategy present', () => {
    assert.ok(src.includes('AI Transformation Strategy'), 'Service 01 title missing');
  });

  test('Service 01: 6–12 weeks duration present', () => {
    assert.ok(src.includes('6–12 weeks'), 'Service 01 duration missing');
  });

  test('Service 02: AI Implementation Programmes present', () => {
    assert.ok(src.includes('AI Implementation Programmes'), 'Service 02 title missing');
  });

  test('Service 02: 3–9 months duration present', () => {
    assert.ok(src.includes('3–9 months'), 'Service 02 duration missing');
  });

  test('Service 03: Digital Operations Transformation present', () => {
    assert.ok(src.includes('Digital Operations Transformation'), 'Service 03 title missing');
  });

  test('Service 03: Project-based duration present', () => {
    assert.ok(src.includes('Project-based'), 'Service 03 duration missing');
  });

  test('Service 04: Operational Excellence present', () => {
    assert.ok(src.includes('Operational Excellence'), 'Service 04 title missing');
  });

  test('Service 04: Advisory / programme duration present', () => {
    assert.ok(src.includes('Advisory / programme'), 'Service 04 duration missing');
  });
});

describe('DGS-E1-01 — Deliverables per service line', () => {
  test('service 01 deliverables present', () => {
    assert.ok(src.includes('AI opportunity assessment'), 'Service 01 deliverable missing');
    assert.ok(src.includes('Transformation roadmap'), 'Service 01 deliverable missing');
    assert.ok(src.includes('Executive alignment framework'), 'Service 01 deliverable missing');
  });

  test('service 02 deliverables present', () => {
    assert.ok(src.includes('AI-enabled QMS design'), 'Service 02 deliverable missing');
    assert.ok(src.includes('Manufacturing analytics platforms'), 'Service 02 deliverable missing');
    assert.ok(src.includes('Validation & regulatory documentation'), 'Service 02 deliverable missing');
  });

  test('service 03 deliverables present', () => {
    assert.ok(src.includes('Manufacturing data architecture'), 'Service 03 deliverable missing');
    assert.ok(src.includes('Operational KPI framework'), 'Service 03 deliverable missing');
    assert.ok(src.includes('Digital MBR / EBR systems'), 'Service 03 deliverable missing');
  });

  test('service 04 deliverables present', () => {
    assert.ok(src.includes('COGS reduction programmes'), 'Service 04 deliverable missing');
    assert.ok(src.includes('Process optimisation'), 'Service 04 deliverable missing');
    assert.ok(src.includes('Quality system modernisation'), 'Service 04 deliverable missing');
  });

  test('Check icon used for deliverable items', () => {
    assert.ok(src.includes('Check'), 'Check icon missing from deliverable list items');
  });
});

describe('DGS-E1-01 — Enquire CTA per service', () => {
  test('"Enquire" CTA text present', () => {
    assert.ok(src.includes('Enquire'), '"Enquire" CTA text missing');
  });

  test('CTA links to /contact', () => {
    assert.ok(src.includes('href="/contact"'), 'CTA link to /contact missing');
  });

  test('Button component used for Enquire CTA', () => {
    const block = src.slice(src.indexOf('SERVICES.map'));
    assert.ok(block.includes('<Button'), 'Button component missing from service rows');
  });
});

describe('DGS-E1-01 — Service row layout', () => {
  test('each service row has aria-label with service title', () => {
    assert.ok(src.includes('aria-label={title}'), 'aria-label on service row missing');
  });

  test('2-col layout at md breakpoint', () => {
    const block = src.slice(src.indexOf('SERVICES.map'));
    assert.ok(block.includes('md:grid-cols'), '2-col md layout missing on service rows');
  });

  test('1-col mobile baseline', () => {
    const block = src.slice(src.indexOf('SERVICES.map'));
    assert.ok(block.includes('grid-cols-1'), 'grid-cols-1 mobile baseline missing');
  });
});

describe('DGS-E1-01 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });
});
