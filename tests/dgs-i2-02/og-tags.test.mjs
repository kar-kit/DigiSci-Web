/**
 * DGS-I2-02: Open Graph tags for social sharing
 * AC: og:title, og:description, og:image, og:type, og:url on all pages.
 *     Article pages include og:type article. Images sized 1200×630px.
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

const STATIC_PAGES = [
  { label: 'Home',         path: 'app/page.tsx' },
  { label: 'About',        path: 'app/about/page.tsx' },
  { label: 'Services',     path: 'app/services/page.tsx' },
  { label: 'Industry',     path: 'app/industry/page.tsx' },
  { label: 'Case Studies', path: 'app/case-studies/page.tsx' },
  { label: 'Insights',     path: 'app/insights/layout.tsx' },
  { label: 'Contact',      path: 'app/contact/layout.tsx' },
];

describe('DGS-I2-02 — metadataBase set in root layout', () => {
  test('metadataBase declared in app/layout.tsx', () => {
    const src = readSrc('app/layout.tsx');
    assert.ok(src.includes('metadataBase'), 'metadataBase missing from root layout');
  });

  test('metadataBase points to digisci.solutions', () => {
    const src = readSrc('app/layout.tsx');
    assert.ok(src.includes('digisci.solutions'), 'metadataBase URL missing digisci.solutions');
  });
});

describe('DGS-I2-02 — OG image in root layout (1200×630)', () => {
  test('default OG image declared in root layout', () => {
    const src = readSrc('app/layout.tsx');
    assert.ok(src.includes('og-default') || src.includes('og-image'), 'Default OG image reference missing from root layout');
  });

  test('OG image width 1200 declared', () => {
    const src = readSrc('app/layout.tsx');
    assert.ok(src.includes('1200'), 'OG image width 1200 missing');
  });

  test('OG image height 630 declared', () => {
    const src = readSrc('app/layout.tsx');
    assert.ok(src.includes('630'), 'OG image height 630 missing');
  });
});

describe('DGS-I2-02 — openGraph present on all static pages', () => {
  for (const { label, path } of STATIC_PAGES) {
    test(`${label}: openGraph declared`, () => {
      const src = readSrc(path);
      assert.ok(src.includes('openGraph'), `${label} (${path}): openGraph missing`);
    });
  }
});

describe('DGS-I2-02 — og:type on static pages', () => {
  for (const { label, path } of STATIC_PAGES) {
    test(`${label}: og:type declared`, () => {
      const src = readSrc(path);
      const block = src.slice(src.indexOf('openGraph'));
      assert.ok(block.includes("'website'") || block.includes('"website"'), `${label}: og:type website missing`);
    });
  }
});

describe('DGS-I2-02 — og:url on static pages', () => {
  for (const { label, path } of STATIC_PAGES) {
    test(`${label}: og:url declared`, () => {
      const src = readSrc(path);
      const block = src.slice(src.indexOf('openGraph'));
      assert.ok(block.includes('url:'), `${label}: og:url missing from openGraph`);
    });
  }
});

describe('DGS-I2-02 — og:type article on article/case-study detail pages', () => {
  test('insights/[slug] generateMetadata includes og:type article', () => {
    const src = readSrc('app/insights/[slug]/page.tsx');
    const block = src.slice(src.indexOf('generateMetadata'));
    assert.ok(block.includes("'article'") || block.includes('"article"'), 'og:type article missing from article detail generateMetadata');
  });

  test('case-studies/[slug] generateMetadata includes og:type article', () => {
    const src = readSrc('app/case-studies/[slug]/page.tsx');
    const block = src.slice(src.indexOf('generateMetadata'));
    assert.ok(block.includes("'article'") || block.includes('"article"'), 'og:type article missing from case study detail generateMetadata');
  });
});

describe('DGS-I2-02 — Twitter card in root layout', () => {
  test('twitter card summary_large_image declared in root layout', () => {
    const src = readSrc('app/layout.tsx');
    assert.ok(src.includes('summary_large_image'), 'twitter summary_large_image card missing from root layout');
  });
});
