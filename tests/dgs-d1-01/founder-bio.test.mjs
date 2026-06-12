/**
 * DGS-D1-01: Founder bio and background section on About page
 * AC: Kwok's bio rendered. Covers CGT manufacturing, GMP quality systems,
 *     digital transformation career arc. Professional photo or abstract visual. No stock imagery.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/about/page.tsx'), 'utf8');

describe('DGS-D1-01 — About page exists', () => {
  test('app/about/page.tsx exists and is non-empty', () => {
    assert.ok(src.length > 100, 'app/about/page.tsx appears empty');
  });

  test('page exports a default React component', () => {
    assert.ok(
      src.includes('export default function') || src.includes('export default async function'),
      'No default export function found',
    );
  });
});

describe('DGS-D1-01 — Page hero', () => {
  test('page hero section present', () => {
    assert.ok(src.includes('aria-label="Page hero"'), 'Page hero aria-label missing');
  });

  test('h1 "About DigiSci and its Founder" present', () => {
    assert.ok(src.includes('About DigiSci and its Founder'), 'h1 heading missing');
  });

  test('page subtitle present', () => {
    assert.ok(src.includes('straightforward observation'), 'Page subtitle missing');
  });
});

describe('DGS-D1-01 — Founder profile section', () => {
  test('founder profile section present', () => {
    assert.ok(src.includes('aria-label="Founder profile"'), 'Founder profile aria-label missing');
  });

  test('eyebrow "01 The founder" present', () => {
    assert.ok(src.includes('index="01"') && src.includes('The founder'), 'Eyebrow "01 The founder" missing');
  });

  test('founder h2 heading present', () => {
    assert.ok(src.includes('Kwok Pang'), 'Kwok Pang name missing from founder heading');
    assert.ok(
      src.includes('Operator, Digital Strategist') || src.includes("founder?.title ??"),
      'Founder title missing from h2',
    );
  });

  test('portrait placeholder present (abstract visual, no stock imagery)', () => {
    assert.ok(src.includes('aria-label="Kwok Pang portrait"'), 'Portrait aria-label missing');
    assert.ok(
      src.includes('Kwok Pang') && (src.includes('Founder') || src.includes('founder')),
      'Portrait name tag missing',
    );
    assert.ok(!src.includes('<img') || !src.includes('stock'), 'Stock image reference found');
  });

  test('portrait uses grid bg (abstract visual) and blue glow', () => {
    const block = src.slice(src.indexOf('aria-label="Kwok Pang portrait"'));
    assert.ok(block.includes('grid-bg') || block.includes('navy-850'), 'Portrait abstract background missing');
    assert.ok(block.includes('blue-glow'), 'Portrait blue glow accent missing');
  });
});

describe('DGS-D1-01 — Bio content: career arc', () => {
  test('CGT manufacturing career arc mentioned', () => {
    assert.ok(
      src.includes('advanced therapy manufacturing') || src.includes('Cell & Gene Therapy Manufacturing'),
      'CGT manufacturing career arc missing'
    );
  });

  test('GMP / pharmaceutical quality systems mentioned', () => {
    assert.ok(
      src.includes('pharmaceutical quality systems') || src.includes('Pharmaceutical Quality Systems'),
      'GMP/pharmaceutical quality systems missing'
    );
  });

  test('digital and AI transformation career arc mentioned', () => {
    assert.ok(
      src.includes('digital and AI transformation') || src.includes('Digital Operations Transformation'),
      'Digital/AI transformation career arc missing'
    );
  });

  test('career thread section with 5 items present', () => {
    assert.ok(
      src.includes('CAREER_THREAD') || src.includes('FALLBACK_CAREER_THREAD'),
      'Career thread constant missing',
    );
    const key = src.includes('FALLBACK_CAREER_THREAD') ? 'const FALLBACK_CAREER_THREAD' : 'const CAREER_THREAD';
    const idx  = src.indexOf(key);
    const end  = src.indexOf('];', idx);
    const block = src.slice(idx, end);
    const entries = (block.match(/\{/g) || []).length;
    assert.ok(entries >= 5, `Expected 5+ career thread entries, found ${entries}`);
  });
});

describe('DGS-D1-01 — LinkedIn CTA', () => {
  test('"Connect on LinkedIn" CTA present', () => {
    assert.ok(src.includes('Connect on LinkedIn'), '"Connect on LinkedIn" CTA missing');
  });

  test('LinkedIn link uses correct personal URL /in/kwok-pang', () => {
    assert.ok(src.includes('linkedin.com/in/kwok-pang'), 'LinkedIn URL missing or wrong (should be /in/kwok-pang)');
  });
});

describe('DGS-D1-01 — Responsive layout', () => {
  test('2-col portrait/bio layout at md breakpoint', () => {
    const block = src.slice(src.indexOf('aria-label="Founder profile"'));
    assert.ok(block.includes('md:grid-cols'), '2-col md layout missing on founder profile');
  });

  test('1-col mobile baseline', () => {
    const block = src.slice(src.indexOf('aria-label="Founder profile"'));
    assert.ok(block.includes('grid-cols-1'), 'grid-cols-1 mobile baseline missing');
  });
});

describe('DGS-D1-01 — No raw CSS', () => {
  test('no hardcoded hex colours in about/page.tsx', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });
});
