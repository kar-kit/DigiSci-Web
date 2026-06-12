/**
 * DGS-I2-03: Sitemap.xml and robots.txt
 * AC: sitemap.xml includes all 7 pages + all Insights articles.
 *     robots.txt present and does not block crawlers from indexable pages.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');

const sitemap = readFileSync(join(ROOT, 'app/sitemap.ts'), 'utf8');
const robots  = readFileSync(join(ROOT, 'app/robots.ts'), 'utf8');

describe('DGS-I2-03 — sitemap.ts structure', () => {
  test('sitemap.ts exists and is non-empty', () => {
    assert.ok(sitemap.length > 100, 'app/sitemap.ts appears empty');
  });

  test('exports default function', () => {
    assert.ok(sitemap.includes('export default function sitemap'), 'sitemap default export missing');
  });

  test('base URL is digisci.solutions', () => {
    assert.ok(sitemap.includes('digisci.solutions'), 'digisci.solutions base URL missing from sitemap');
  });

  test('MetadataRoute.Sitemap type used', () => {
    assert.ok(sitemap.includes('MetadataRoute'), 'MetadataRoute type missing from sitemap');
  });
});

describe('DGS-I2-03 — All 7 static pages in sitemap', () => {
  const pages = ['/', '/about', '/services', '/industry', '/case-studies', '/insights', '/contact'];
  for (const page of pages) {
    test(`"${page}" present in sitemap`, () => {
      assert.ok(sitemap.includes(`'${page}'`) || sitemap.includes(`"${page}"`), `Route "${page}" missing from STATIC_ROUTES`);
    });
  }
});

describe('DGS-I2-03 — All case study slugs in sitemap', () => {
  const slugs = [
    'ai-regulatory-documentation-platform',
    'digital-pqs-blueprint',
    'manufacturing-data-architecture-cgt',
  ];
  for (const slug of slugs) {
    test(`case study slug "${slug}" present`, () => {
      assert.ok(sitemap.includes(slug), `Case study slug "${slug}" missing from sitemap`);
    });
  }
});

describe('DGS-I2-03 — All 10 insight article slugs in sitemap', () => {
  const slugs = [
    'future-ai-biopharmaceutical-quality-systems',
    'ai-regulatory-documentation-gmp',
    'digital-future-cell-therapy-manufacturing',
    'operational-data-strategic-asset-biotech',
    'validating-ai-systems-csv-gamp5',
    'where-ai-reduces-cogs-manufacturing',
    'scaling-atmp-operations-without-losing-compliance',
    'senior-led-operating-model-ai-transformation',
    'designing-data-integrity-alcoa-plus',
    'ai-enabled-batch-disposition-promise-guardrails',
  ];
  for (const slug of slugs) {
    test(`article slug "${slug}" present`, () => {
      assert.ok(sitemap.includes(slug), `Article slug "${slug}" missing from sitemap`);
    });
  }
});

describe('DGS-I2-03 — Total entry count', () => {
  test('ARTICLE_SLUGS has 10 entries', () => {
    const idx   = sitemap.indexOf('const ARTICLE_SLUGS');
    const end   = sitemap.indexOf('] as const', idx);
    const block = sitemap.slice(idx, end);
    const count = (block.match(/'/g) || []).length / 2;
    assert.ok(count >= 10, `Expected at least 10 article slugs, found ${count}`);
  });
});

describe('DGS-I2-03 — robots.ts structure', () => {
  test('robots.ts exists and is non-empty', () => {
    assert.ok(robots.length > 50, 'app/robots.ts appears empty');
  });

  test('exports default function', () => {
    assert.ok(robots.includes('export default function robots'), 'robots default export missing');
  });

  test('does not block crawlers — allow "/" present', () => {
    assert.ok(robots.includes("allow: '/'") || robots.includes('allow: "/"'), 'allow "/" missing from robots rules');
  });

  test('sitemap URL referenced in robots', () => {
    assert.ok(robots.includes('sitemap.xml'), 'sitemap.xml reference missing from robots');
  });

  test('host declared in robots', () => {
    assert.ok(robots.includes('host:'), 'host missing from robots');
  });
});
