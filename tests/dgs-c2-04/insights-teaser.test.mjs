/**
 * DGS-C2-04: Insights teaser section on homepage
 * AC: 2-3 most recent articles shown. Article title, date, sector tag, and read time.
 *     Link to Insights page. Visual spec per mockups/index.html §07.
 *     Note: mockup has no subscribe prompt or excerpt — design spec takes precedence.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/page.tsx'), 'utf8');

describe('DGS-C2-04 — Section structure', () => {
  test('section has aria-label="Insights"', () => {
    assert.ok(src.includes('aria-label="Insights"'), 'Insights section aria-label missing');
  });

  test('eyebrow with index 04 present', () => {
    const insightsBlock = src.slice(src.indexOf('aria-label="Insights"'));
    assert.ok(insightsBlock.includes('index="04"'), 'Eyebrow index="04" missing on Insights section');
  });

  test('"Insights" eyebrow label present', () => {
    const insightsBlock = src.slice(src.indexOf('aria-label="Insights"'));
    assert.ok(insightsBlock.includes('>Insights<'), '"Insights" eyebrow label missing');
  });

  test('section heading present', () => {
    assert.ok(src.includes('Perspectives on AI-enabled biotech operations'), 'Section heading missing');
  });
});

describe('DGS-C2-04 — INSIGHTS data (3 articles)', () => {
  test('INSIGHTS fallback declared with 3 entries', () => {
    const key = src.includes('FALLBACK_INSIGHTS') ? 'FALLBACK_INSIGHTS' : 'INSIGHTS';
    assert.ok(src.includes(key), `${key} constant missing`);
    const constKey = src.includes('const FALLBACK_INSIGHTS') ? 'const FALLBACK_INSIGHTS' : 'const INSIGHTS';
    const insightsIdx = src.indexOf(constKey);
    const blockEnd    = src.indexOf('];', insightsIdx);
    const block       = src.slice(insightsIdx, blockEnd);
    const entries     = (block.match(/\{/g) || []).length;
    assert.ok(entries >= 3, `Expected 3+ entries in insights fallback, found ${entries}`);
  });

  test('all article titles present', () => {
    assert.ok(src.includes('The Future of AI in Biopharmaceutical Quality Systems'), 'First article title missing');
    assert.ok(src.includes('The Digital Future of Cell Therapy Manufacturing'), 'Second article title missing');
    assert.ok(src.includes('AI and Regulatory Documentation in GMP Environments'), 'Third article title missing');
  });

  test('article dates present', () => {
    assert.ok(
      src.includes('May 2026') || src.includes('2026-05-01'),
      'May 2026 date missing (as string or ISO)',
    );
    assert.ok(
      src.includes('Apr 2026') || src.includes('2026-04-01'),
      'Apr 2026 date missing (as string or ISO)',
    );
  });

  test('article sector tags present', () => {
    assert.ok(src.includes('AI in Pharma Ops'), 'AI in Pharma Ops tag missing');
    assert.ok(src.includes('CGT Manufacturing'), 'CGT Manufacturing tag missing');
    assert.ok(src.includes('Digital Quality'), 'Digital Quality tag missing');
  });

  test('read times present', () => {
    assert.ok(src.includes('8 min'), '8 min read time missing');
    assert.ok(src.includes('6 min'), '6 min read time missing');
    assert.ok(src.includes('7 min'), '7 min read time missing');
  });
});

describe('DGS-C2-04 — Article card markup', () => {
  const mapKey = src.includes('displayInsights.map') ? 'displayInsights.map'
    : src.includes('FALLBACK_INSIGHTS.map') ? 'FALLBACK_INSIGHTS.map' : 'INSIGHTS.map';

  test('articles are links (a/Link elements)', () => {
    const insightsBlock = src.slice(src.indexOf(mapKey));
    assert.ok(insightsBlock.includes('<Link') || insightsBlock.includes('<a'), 'Article cards must be link elements');
  });

  test('article links to /insights', () => {
    const insightsBlock = src.slice(src.indexOf(mapKey));
    assert.ok(
      insightsBlock.includes('href="/insights') || insightsBlock.includes("href='/insights"),
      'Article link to /insights missing',
    );
  });

  test('Tag component used for sector label', () => {
    const insightsBlock = src.slice(src.indexOf(mapKey));
    assert.ok(insightsBlock.includes('<Tag'), 'Tag component missing from article cards');
  });

  test('hover state on article card', () => {
    const insightsBlock = src.slice(src.indexOf(mapKey));
    assert.ok(insightsBlock.includes('hover:'), 'Hover state missing from article cards');
  });

  test('transition/animation on card', () => {
    const insightsBlock = src.slice(src.indexOf(mapKey));
    assert.ok(insightsBlock.includes('transition'), 'Transition missing from article cards');
  });
});

describe('DGS-C2-04 — CTA and responsive', () => {
  test('"View all insights" CTA present', () => {
    assert.ok(src.includes('View all insights'), '"View all insights" CTA missing');
  });

  test('CTA links to /insights', () => {
    const ctaBlock = src.slice(src.indexOf('View all insights') - 200, src.indexOf('View all insights') + 200);
    assert.ok(ctaBlock.includes('/insights'), 'CTA link to /insights missing');
  });

  test('responsive grid (sm:grid-cols-3)', () => {
    const sectionStart = src.indexOf('aria-label="Insights"');
    const sectionEnd   = src.indexOf('§08 CTA Band');
    const sectionSrc   = src.slice(sectionStart, sectionEnd);
    assert.ok(sectionSrc.includes('sm:grid-cols-3'), 'sm:grid-cols-3 missing on insights grid');
  });

  test('1-col mobile baseline', () => {
    const sectionStart = src.indexOf('aria-label="Insights"');
    const sectionEnd   = src.indexOf('§08 CTA Band');
    const sectionSrc   = src.slice(sectionStart, sectionEnd);
    assert.ok(sectionSrc.includes('grid-cols-1'), 'grid-cols-1 mobile baseline missing');
  });
});

describe('DGS-C2-04 — No raw CSS', () => {
  test('no hardcoded hex in page.tsx', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });
});
