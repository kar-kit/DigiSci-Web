/**
 * DGS-I2-01: Custom meta title and description per page
 * AC: All 7 pages have unique meta title (< 60 chars) and meta description (< 160 chars).
 *     Titles include primary keyword. Descriptions include a CTA or value proposition.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');

function readSrc(relPath) {
  return readFileSync(join(ROOT, relPath), 'utf8');
}

function extractMetadata(src) {
  const titleMatch = src.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const descMatch  = src.match(/description:\s*['"`]([^'"`]+)['"`]/);
  return {
    title: titleMatch ? titleMatch[1] : null,
    description: descMatch ? descMatch[1] : null,
  };
}

const pages = [
  { label: 'Home',          path: 'app/page.tsx' },
  { label: 'About',         path: 'app/about/page.tsx' },
  { label: 'Services',      path: 'app/services/page.tsx' },
  { label: 'Industry',      path: 'app/industry/page.tsx' },
  { label: 'Case Studies',  path: 'app/case-studies/page.tsx' },
  { label: 'Insights',      path: 'app/insights/layout.tsx' },
  { label: 'Contact',       path: 'app/contact/layout.tsx' },
];

describe('DGS-I2-01 — All 7 pages have metadata', () => {
  for (const { label, path } of pages) {
    test(`${label}: metadata exported`, () => {
      const src = readSrc(path);
      assert.ok(
        src.includes('export const metadata') || src.includes('Metadata'),
        `${label} (${path}): metadata export missing`
      );
    });
  }
});

describe('DGS-I2-01 — Title length ≤ 60 chars', () => {
  for (const { label, path } of pages) {
    test(`${label}: title ≤ 60 chars`, () => {
      const src = readSrc(path);
      const { title } = extractMetadata(src);
      assert.ok(title, `${label}: title not found in metadata`);
      assert.ok(title.length <= 60, `${label}: title too long (${title.length} chars): "${title}"`);
    });
  }
});

describe('DGS-I2-01 — Description length ≤ 160 chars', () => {
  for (const { label, path } of pages) {
    test(`${label}: description ≤ 160 chars`, () => {
      const src = readSrc(path);
      const { description } = extractMetadata(src);
      assert.ok(description, `${label}: description not found in metadata`);
      assert.ok(description.length <= 160, `${label}: description too long (${description.length} chars)`);
    });
  }
});

describe('DGS-I2-01 — Titles include primary keywords', () => {
  test('Home title includes "DigiSci"', () => {
    const { title } = extractMetadata(readSrc('app/page.tsx'));
    assert.ok(title?.includes('DigiSci'), 'Home title missing "DigiSci"');
  });

  test('About title references DigiSci or consulting', () => {
    const { title } = extractMetadata(readSrc('app/about/page.tsx'));
    assert.ok(title?.includes('DigiSci') || title?.toLowerCase().includes('consult'), 'About title missing brand/consulting keyword');
  });

  test('Services title includes "Services" or service type', () => {
    const { title } = extractMetadata(readSrc('app/services/page.tsx'));
    assert.ok(title?.includes('Services') || title?.includes('AI'), 'Services title missing keyword');
  });

  test('Industry title includes "Industry" or sector keyword', () => {
    const { title } = extractMetadata(readSrc('app/industry/page.tsx'));
    assert.ok(title?.includes('Industry') || title?.includes('CGT') || title?.includes('Pharma'), 'Industry title missing keyword');
  });

  test('Case Studies title includes "Case Studies"', () => {
    const { title } = extractMetadata(readSrc('app/case-studies/page.tsx'));
    assert.ok(title?.includes('Case Studies'), 'Case Studies title missing keyword');
  });

  test('Insights title includes "Insights"', () => {
    const { title } = extractMetadata(readSrc('app/insights/layout.tsx'));
    assert.ok(title?.includes('Insights'), 'Insights title missing keyword');
  });

  test('Contact title includes "Contact" or "Book"', () => {
    const { title } = extractMetadata(readSrc('app/contact/layout.tsx'));
    assert.ok(title?.includes('Contact') || title?.includes('Book'), 'Contact title missing keyword');
  });
});

describe('DGS-I2-01 — Dynamic routes have generateMetadata', () => {
  test('case-studies/[slug] has generateMetadata', () => {
    const src = readSrc('app/case-studies/[slug]/page.tsx');
    assert.ok(src.includes('generateMetadata'), 'generateMetadata missing from case study detail page');
  });

  test('insights/[slug] has generateMetadata', () => {
    const src = readSrc('app/insights/[slug]/page.tsx');
    assert.ok(src.includes('generateMetadata'), 'generateMetadata missing from article detail page');
  });
});

describe('DGS-I2-01 — All 7 titles are unique', () => {
  test('no two pages share the same title', () => {
    const titles = pages.map(({ path }) => extractMetadata(readSrc(path)).title).filter(Boolean);
    const unique = new Set(titles);
    assert.equal(unique.size, titles.length, `Duplicate titles found: ${titles.join(' | ')}`);
  });
});
