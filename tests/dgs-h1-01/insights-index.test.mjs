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
// Interactive content was extracted into a client component; subscribe form extracted to NewsletterForm (DGS-H1-02)
const clientSrc = (() => {
  try { return readFileSync(join(ROOT, 'app/insights/InsightsClient.tsx'), 'utf8'); } catch { return src; }
})();
const newsletterSrc = (() => {
  try { return readFileSync(join(ROOT, 'components/ui/NewsletterForm.tsx'), 'utf8'); } catch { return ''; }
})();

describe('DGS-H1-01 — Page exists', () => {
  test('app/insights/page.tsx exists and is non-empty', () => {
    assert.ok(src.length > 100, 'app/insights/page.tsx appears empty');
  });

  test('page exports a default React component', () => {
    assert.ok(src.includes('export default function') || src.includes('export default async function'), 'No default export function found');
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
    assert.ok(src.includes('ARTICLES') || clientSrc.includes('ARTICLES'), 'ARTICLES constant missing');
  });

  test('ARTICLES has 9 entries', () => {
    const constKey = src.includes('const FALLBACK_ARTICLES') ? 'const FALLBACK_ARTICLES' : 'const ARTICLES';
    const searchSrc = src.includes(constKey) ? src : clientSrc;
    const idx   = searchSrc.indexOf(constKey);
    const end   = searchSrc.indexOf('];', idx);
    const block = searchSrc.slice(idx, end);
    const count = (block.match(/slug:/g) || []).length;
    assert.equal(count, 9, `Expected 9 article entries in ARTICLES, found ${count}`);
  });

  test('all article titles present', () => {
    const allSrc = src + clientSrc;
    assert.ok(allSrc.includes('AI and Regulatory Documentation in GMP Environments'), 'Article 1 title missing');
    assert.ok(allSrc.includes('The Digital Future of Cell Therapy Manufacturing'), 'Article 2 title missing');
    assert.ok(allSrc.includes('Validating AI Systems Under CSV and GAMP 5'), 'Article 4 title missing');
    assert.ok(allSrc.includes('Scaling ATMP Operations Without Losing Compliance'), 'Article 6 title missing');
    assert.ok(allSrc.includes('Designing Data Integrity for ALCOA+ from Day One'), 'Article 8 title missing');
  });

  test('article data includes date, excerpt, and readTime fields', () => {
    const constKey = src.includes('const FALLBACK_ARTICLES') ? 'const FALLBACK_ARTICLES' : 'const ARTICLES';
    const searchSrc = src.includes(constKey) ? src : clientSrc;
    const idx = searchSrc.indexOf(constKey);
    const end = searchSrc.indexOf('];', idx);
    const block = searchSrc.slice(idx, end);
    assert.ok(block.includes('date:'), 'date field missing from ARTICLES entries');
    assert.ok(block.includes('excerpt:'), 'excerpt field missing from ARTICLES entries');
    assert.ok(block.includes('readTime:'), 'readTime field missing from ARTICLES entries');
  });
});

describe('DGS-H1-01 — Article card markup', () => {
  test('article grid section present', () => {
    assert.ok(src.includes('aria-label="Article grid"') || clientSrc.includes('aria-label="Article grid"'), 'Article grid section aria-label missing');
  });

  test('article cards are links to /insights/[slug]', () => {
    const mapSrc = clientSrc.includes('filteredArticles.map') || clientSrc.includes('ARTICLES.map') ? clientSrc : src;
    const idx = mapSrc.indexOf('filteredArticles.map') !== -1 ? mapSrc.indexOf('filteredArticles.map') : mapSrc.indexOf('ARTICLES.map');
    const block = mapSrc.slice(idx);
    assert.ok(block.includes('/insights/'), 'Links to article detail pages missing');
  });

  test('Tag component used in article card', () => {
    const mapSrc = clientSrc.includes('filteredArticles.map') || clientSrc.includes('ARTICLES.map') ? clientSrc : src;
    const idx = mapSrc.indexOf('filteredArticles.map') !== -1 ? mapSrc.indexOf('filteredArticles.map') : mapSrc.indexOf('ARTICLES.map');
    const block = mapSrc.slice(idx);
    assert.ok(block.includes('<Tag'), 'Tag component missing from article cards');
  });

  test('date and readTime rendered in card', () => {
    const mapSrc = clientSrc.includes('filteredArticles.map') || clientSrc.includes('ARTICLES.map') ? clientSrc : src;
    const idx = mapSrc.indexOf('filteredArticles.map') !== -1 ? mapSrc.indexOf('filteredArticles.map') : mapSrc.indexOf('ARTICLES.map');
    const block = mapSrc.slice(idx);
    assert.ok(block.includes('date') && block.includes('readTime'), 'date and readTime not rendered in card');
  });

  test('excerpt rendered in card', () => {
    const mapSrc = clientSrc.includes('filteredArticles.map') || clientSrc.includes('ARTICLES.map') ? clientSrc : src;
    const idx = mapSrc.indexOf('filteredArticles.map') !== -1 ? mapSrc.indexOf('filteredArticles.map') : mapSrc.indexOf('ARTICLES.map');
    const block = mapSrc.slice(idx);
    assert.ok(block.includes('excerpt'), 'excerpt not rendered in card');
  });

  test('h3 heading in article card', () => {
    const mapSrc = clientSrc.includes('filteredArticles.map') || clientSrc.includes('ARTICLES.map') ? clientSrc : src;
    const idx = mapSrc.indexOf('filteredArticles.map') !== -1 ? mapSrc.indexOf('filteredArticles.map') : mapSrc.indexOf('ARTICLES.map');
    const block = mapSrc.slice(idx);
    assert.ok(block.includes('<h3'), 'h3 heading missing from article cards');
  });
});

describe('DGS-H1-01 — Responsive grid', () => {
  test('responsive grid: 1-col mobile baseline', () => {
    const gridSrc = clientSrc.includes('aria-label="Article grid"') ? clientSrc : src;
    const block = gridSrc.slice(gridSrc.indexOf('aria-label="Article grid"'));
    assert.ok(block.includes('grid-cols-1'), 'grid-cols-1 missing on article grid');
  });

  test('responsive grid: multi-col at sm/lg breakpoint', () => {
    const gridSrc = clientSrc.includes('aria-label="Article grid"') ? clientSrc : src;
    const block = gridSrc.slice(gridSrc.indexOf('aria-label="Article grid"'));
    assert.ok(
      block.includes('sm:grid-cols') || block.includes('lg:grid-cols'),
      'Responsive multi-col grid missing on article grid'
    );
  });
});

describe('DGS-H1-01 — Filter bar', () => {
  test('filter bar section present', () => {
    assert.ok(src.includes('aria-label="Filter bar"') || clientSrc.includes('aria-label="Filter bar"'), 'Filter bar aria-label missing');
  });

  test('filter options include sector names', () => {
    const allSrc = src + clientSrc;
    assert.ok(allSrc.includes('AI in Pharma Ops'), 'AI in Pharma Ops filter missing');
    assert.ok(allSrc.includes('CGT Manufacturing'), 'CGT Manufacturing filter missing');
    assert.ok(allSrc.includes('Digital Quality Systems'), 'Digital Quality Systems filter missing');
  });

  test('FILTERS constant declared', () => {
    assert.ok(src.includes('FILTERS') || clientSrc.includes('FILTERS'), 'FILTERS constant missing');
  });
});

describe('DGS-H1-01 — Featured article', () => {
  test('featured article section present', () => {
    assert.ok(src.includes('aria-label="Featured article"') || clientSrc.includes('aria-label="Featured article"'), 'Featured article aria-label missing');
  });

  test('FEATURED constant present with title', () => {
    const allSrc = src + clientSrc;
    assert.ok(
      allSrc.includes('FEATURED') && allSrc.includes('The Future of AI in Biopharmaceutical Quality Systems'),
      'FEATURED article title missing'
    );
  });
});

describe('DGS-H1-01 — Subscribe CTA', () => {
  test('subscribe section present', () => {
    assert.ok(src.includes('aria-label="Subscribe"') || clientSrc.includes('aria-label="Subscribe"'), 'Subscribe section aria-label missing');
  });

  test('"Stay current" subscribe heading present', () => {
    assert.ok(src.includes('Stay current') || clientSrc.includes('Stay current'), '"Stay current" subscribe heading missing');
  });

  test('email input present', () => {
    // DGS-H1-02: email input moved to shared NewsletterForm component
    assert.ok(
      src.includes('type="email"') || src.includes("type='email'") ||
      clientSrc.includes('type="email"') || clientSrc.includes("type='email'") ||
      newsletterSrc.includes('type="email"') || newsletterSrc.includes("type='email'"),
      'Email input missing'
    );
  });

  test('"Subscribe for Insights" button present', () => {
    // DGS-H1-02: button text moved to shared NewsletterForm component
    assert.ok(
      src.includes('Subscribe for Insights') || clientSrc.includes('Subscribe for Insights') ||
      newsletterSrc.includes('Subscribe for Insights'),
      '"Subscribe for Insights" button missing'
    );
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
