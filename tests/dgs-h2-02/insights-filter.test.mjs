/**
 * DGS-H2-02: Article tagging by sector and topic — filter UI on insights index
 * AC: Filter UI on index page. Tag count per category. Clicking tag filters article grid.
 *     Tags: AI in Pharma Ops, CGT Manufacturing, Digital Quality Systems, Future Operating Models.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/insights/page.tsx'), 'utf8');
// Interactive filter logic was extracted into a client component
const clientSrc = (() => {
  try { return readFileSync(join(ROOT, 'app/insights/InsightsClient.tsx'), 'utf8'); } catch { return src; }
})();

describe('DGS-H2-02 — Client-side interactivity', () => {
  test('page is a client component', () => {
    assert.ok(
      src.startsWith("'use client'") || src.startsWith('"use client"') ||
      clientSrc.startsWith("'use client'") || clientSrc.startsWith('"use client"'),
      'Missing "use client" directive in page or InsightsClient',
    );
  });

  test('useState imported for filter state', () => {
    assert.ok(clientSrc.includes('useState'), 'useState not imported or used');
  });

  test('active filter state variable present', () => {
    assert.ok(clientSrc.includes('activeFilter') || clientSrc.includes('active'), 'Active filter state variable missing');
  });
});

describe('DGS-H2-02 — Filter logic', () => {
  test('filter function narrows articles by tag', () => {
    assert.ok(
      clientSrc.includes("a.tag === activeFilter") || clientSrc.includes('a.tag === active'),
      'Filter logic comparing article tag to active filter missing'
    );
  });

  test('filteredArticles (or equivalent) derived from active filter', () => {
    assert.ok(
      clientSrc.includes('filteredArticles') || clientSrc.includes('filtered'),
      'Filtered articles derivation missing'
    );
  });

  test('"All" filter shows all articles', () => {
    assert.ok(
      clientSrc.includes("=== 'All'") || clientSrc.includes('=== "All"'),
      '"All" filter special-case missing'
    );
  });
});

describe('DGS-H2-02 — Filter bar interactivity', () => {
  test('onClick handler on filter buttons', () => {
    const block = clientSrc.slice(clientSrc.indexOf('aria-label="Filter bar"'));
    assert.ok(block.includes('onClick'), 'onClick handler missing on filter buttons');
  });

  test('aria-pressed on filter buttons for accessibility', () => {
    const block = clientSrc.slice(clientSrc.indexOf('aria-label="Filter bar"'));
    assert.ok(block.includes('aria-pressed'), 'aria-pressed missing on filter buttons');
  });

  test('active filter styling applied conditionally', () => {
    const block = clientSrc.slice(clientSrc.indexOf('aria-label="Filter bar"'));
    assert.ok(
      block.includes('isActive') || block.includes('activeFilter') || block.includes('active'),
      'Conditional active styling not applied to filter buttons'
    );
  });
});

describe('DGS-H2-02 — Tag counts', () => {
  test('tag count computation present (tagCounts or equivalent)', () => {
    assert.ok(
      clientSrc.includes('tagCounts') || clientSrc.includes('counts'),
      'Tag count computation missing'
    );
  });

  test('counts displayed per filter button', () => {
    const block = clientSrc.slice(clientSrc.indexOf('aria-label="Filter bar"'));
    assert.ok(
      block.includes('tagCounts') || block.includes('counts['),
      'Tag counts not rendered per filter button'
    );
  });

  test('dynamic article count shown (not hardcoded "9 articles")', () => {
    const block = clientSrc.slice(clientSrc.indexOf('aria-label="Filter bar"'));
    assert.ok(
      block.includes('filteredArticles.length') || block.includes('filtered.length'),
      'Dynamic filtered article count not shown'
    );
    assert.ok(!block.includes('"9 articles"') && !block.includes("'9 articles'"), 'Hardcoded "9 articles" found — count should be dynamic');
  });
});

describe('DGS-H2-02 — Article grid uses filtered articles', () => {
  test('article grid renders filteredArticles, not raw ARTICLES', () => {
    const gridBlock = clientSrc.slice(clientSrc.indexOf('aria-label="Article grid"'));
    assert.ok(
      gridBlock.includes('filteredArticles.map') || gridBlock.includes('filtered.map'),
      'Article grid must render filtered articles, not raw ARTICLES'
    );
  });
});

describe('DGS-H2-02 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (clientSrc.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
