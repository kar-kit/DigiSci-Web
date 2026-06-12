/**
 * DGS-H1-01: Insights article index page
 * AC: Grid of article cards. Each card: title, date, sector tag, excerpt (2-3 lines), read time.
 *     Filterable by sector tag. Responsive grid. Visual spec per mockups/insights.html.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/insights/page.tsx'), 'utf8');

describe('DGS-H1-01 — Page exists', () => {
  test('app/insights/page.tsx exists and is non-empty', () => {
    assert.ok(src.length > 100, 'app/insights/page.tsx appears empty');
  });

  test('page exports a default React component', () => {
    assert.ok(src.includes('export default function'), 'No default export function found');
  });
});

describe('DGS-H1-01 — Page hero', () => {
  test('page hero section present', () => {
    assert.ok(src.includes('aria-label="Page hero"'), 'Page hero aria-label missing');
  });

  test('h1 about Insights on AI-Enabled Biotech Operations', () => {
    assert.ok(
      src.includes('Insights on AI-Enabled Biotech Operations'),
      'h1 heading missing'
    );
  });
});

describe('DGS-H1-01 — ARTICLES constant (9 articles)', () => {
  test('ARTICLES constant declared', () => {
    assert.ok(src.includes('ARTICLES'), 'ARTICLES constant missing');
  });

  test('ARTICLES has 9 entries', () => {
    const idx   = src.indexOf('const ARTICLES');
    const end   = src.indexOf('] as const', idx);
    const block = src.slice(idx, end);
    const count = (block.match(/slug:/g) || []).length;
    assert.equal(count, 9, `Expected 9 article entries in ARTICLES, found ${count}`);
  });

  test('all article titles present', () => {
    assert.ok(src.includes('AI and Regulatory Documentation in GMP Environments'), 'Article 1 title missing');
    assert.ok(src.includes('The Digital Future of Cell Therapy Manufacturing'), 'Article 2 title missing');
    assert.ok(src.includes('Validating AI Systems Under CSV and GAMP 5'), 'Article 4 title missing');
    assert.ok(src.includes('Scaling ATMP Operations Without Losing Compliance'), 'Article 6 title missing');
    assert.ok(src.includes('Designing Data Integrity for ALCOA+ from Day One'), 'Article 8 title missing');
  });

  test('article data includes date, excerpt, and readTime fields', () => {
    const idx = src.indexOf('const ARTICLES');
    const end = src.indexOf('] as const', idx);
    const block = src.slice(idx, end);
    assert.ok(block.includes('date:'), 'date field missing from ARTICLES entries');
    assert.ok(block.includes('excerpt:'), 'excerpt field missing from ARTICLES entries');
    assert.ok(block.includes('readTime:'), 'readTime field missing from ARTICLES entries');
  });
});

describe('DGS-H1-01 — Article card markup', () => {
  test('article grid section present', () => {
    assert.ok(src.includes('aria-label="Article grid"'), 'Article grid section aria-label missing');
  });

  test('article cards are links to /insights/[slug]', () => {
    const block = src.slice(src.indexOf('ARTICLES.map'));
    assert.ok(block.includes('/insights/'), 'Links to article detail pages missing');
  });

  test('Tag component used in article card', () => {
    const block = src.slice(src.indexOf('ARTICLES.map'));
    assert.ok(block.includes('<Tag'), 'Tag component missing from article cards');
  });

  test('date and readTime rendered in card', () => {
    const block = src.slice(src.indexOf('ARTICLES.map'));
    assert.ok(block.includes('date') && block.includes('readTime'), 'date and readTime not rendered in card');
  });

  test('excerpt rendered in card', () => {
    const block = src.slice(src.indexOf('ARTICLES.map'));
    assert.ok(block.includes('excerpt'), 'excerpt not rendered in card');
  });

  test('h3 heading in article card', () => {
    const block = src.slice(src.indexOf('ARTICLES.map'));
    assert.ok(block.includes('<h3'), 'h3 heading missing from article cards');
  });
});

describe('DGS-H1-01 — Responsive grid', () => {
  test('responsive grid: 1-col mobile baseline', () => {
    const block = src.slice(src.indexOf('aria-label="Article grid"'));
    assert.ok(block.includes('grid-cols-1'), 'grid-cols-1 missing on article grid');
  });

  test('responsive grid: multi-col at sm/lg breakpoint', () => {
    const block = src.slice(src.indexOf('aria-label="Article grid"'));
    assert.ok(
      block.includes('sm:grid-cols') || block.includes('lg:grid-cols'),
      'Responsive multi-col grid missing on article grid'
    );
  });
});

describe('DGS-H1-01 — Filter bar', () => {
  test('filter bar section present', () => {
    assert.ok(src.includes('aria-label="Filter bar"'), 'Filter bar aria-label missing');
  });

  test('filter options include sector names', () => {
    assert.ok(src.includes('AI in Pharma Ops'), 'AI in Pharma Ops filter missing');
    assert.ok(src.includes('CGT Manufacturing'), 'CGT Manufacturing filter missing');
    assert.ok(src.includes('Digital Quality Systems'), 'Digital Quality Systems filter missing');
  });

  test('FILTERS constant declared', () => {
    assert.ok(src.includes('FILTERS'), 'FILTERS constant missing');
  });
});

describe('DGS-H1-01 — Featured article', () => {
  test('featured article section present', () => {
    assert.ok(src.includes('aria-label="Featured article"'), 'Featured article aria-label missing');
  });

  test('FEATURED constant present with title', () => {
    assert.ok(
      src.includes('FEATURED') && src.includes('The Future of AI in Biopharmaceutical Quality Systems'),
      'FEATURED article title missing'
    );
  });
});

describe('DGS-H1-01 — Subscribe CTA', () => {
  test('subscribe section present', () => {
    assert.ok(src.includes('aria-label="Subscribe"'), 'Subscribe section aria-label missing');
  });

  test('"Stay current" subscribe heading present', () => {
    assert.ok(src.includes('Stay current'), '"Stay current" subscribe heading missing');
  });

  test('email input present', () => {
    assert.ok(src.includes('type="email"') || src.includes("type='email'"), 'Email input missing');
  });

  test('"Subscribe for Insights" button present', () => {
    assert.ok(src.includes('Subscribe for Insights'), '"Subscribe for Insights" button missing');
  });
});

describe('DGS-H1-01 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });
});
