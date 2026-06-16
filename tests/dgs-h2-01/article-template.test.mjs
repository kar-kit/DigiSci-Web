/**
 * DGS-H2-01: Individual article page template
 * AC: Title, date, author (Kwok Pang), sector tags, read time at top.
 *     Body in Source Serif 4. Subheadings in IBM Plex Sans. Max ~700px content width.
 *     Related articles at bottom. Share and subscribe CTA.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/insights/[slug]/page.tsx'), 'utf8');
// DGS-H1-02: subscribe form extracted to shared NewsletterForm component
const newsletterSrc = (() => {
  try { return readFileSync(join(ROOT, 'components/ui/NewsletterForm.tsx'), 'utf8'); } catch { return ''; }
})();

describe('DGS-H2-01 — File exists', () => {
  test('app/insights/[slug]/page.tsx exists and is non-empty', () => {
    assert.ok(src.length > 200, 'app/insights/[slug]/page.tsx appears empty');
  });

  test('page exports a default React component', () => {
    assert.ok(src.includes('export default'), 'No default export found');
  });
});

describe('DGS-H2-01 — Static params and notFound', () => {
  test('generateStaticParams exported', () => {
    assert.ok(src.includes('generateStaticParams'), 'generateStaticParams missing');
  });

  test('generateStaticParams returns slug array from ARTICLES', () => {
    const block = src.slice(src.indexOf('generateStaticParams'));
    assert.ok(block.includes('slug') && block.includes('ARTICLES'), 'generateStaticParams must map slugs from ARTICLES');
  });

  test('notFound() called for unknown slugs', () => {
    assert.ok(src.includes('notFound()'), 'notFound() not called for unknown slugs');
  });

  test('all 10 article slugs present in ARTICLES', () => {
    const constKey = src.includes('const HARDCODED_ARTICLES') ? 'const HARDCODED_ARTICLES'
      : src.includes('const FALLBACK_ARTICLES') ? 'const FALLBACK_ARTICLES' : 'const ARTICLES';
    const idx   = src.indexOf(constKey);
    const end   = src.indexOf('];', idx);
    const block = src.slice(idx, end);
    const count = (block.match(/slug:/g) || []).length;
    assert.ok(count >= 10, `Expected at least 10 article entries in ARTICLES, found ${count}`);
  });
});

describe('DGS-H2-01 — Article header section', () => {
  test('article header section present with aria-label', () => {
    assert.ok(src.includes('aria-label="Article header"'), 'Article header aria-label missing');
  });

  test('author "Kwok Pang" displayed', () => {
    assert.ok(src.includes('Kwok Pang'), '"Kwok Pang" author attribution missing');
  });

  test('article tag rendered in header', () => {
    const block = src.slice(src.indexOf('aria-label="Article header"'));
    assert.ok(block.includes('<Tag'), 'Tag component missing from article header');
  });

  test('article title rendered as h1', () => {
    const block = src.slice(src.indexOf('aria-label="Article header"'));
    assert.ok(block.includes('<h1'), 'h1 missing from article header');
  });

  test('date and readTime shown in header meta', () => {
    const block = src.slice(src.indexOf('aria-label="Article header"'));
    assert.ok(
      block.includes('article.date') && block.includes('article.readTime'),
      'date and readTime not shown in article header'
    );
  });

  test('back link to /insights present', () => {
    const block = src.slice(src.indexOf('aria-label="Article header"'));
    assert.ok(block.includes('href="/insights"'), 'Back link to /insights missing');
  });
});

describe('DGS-H2-01 — Article body typography', () => {
  test('article body section present with aria-label', () => {
    assert.ok(src.includes('aria-label="Article body"'), 'Article body aria-label missing');
  });

  test('body content uses font-serif (Source Serif 4)', () => {
    const block = src.slice(src.indexOf('aria-label="Article body"'));
    assert.ok(block.includes('font-serif'), 'font-serif missing from article body');
  });

  test('subheadings use font-sans (IBM Plex Sans)', () => {
    const block = src.slice(src.indexOf('aria-label="Article body"'));
    assert.ok(block.includes('<h2') && block.includes('font-sans'), 'font-sans subheadings (h2) missing from article body');
  });

  test('content area max width ~700px', () => {
    const block = src.slice(src.indexOf('aria-label="Article body"'));
    assert.ok(block.includes('max-w-[700px]'), 'max-w-[700px] missing from article body content');
  });

  test('lede paragraph rendered', () => {
    const block = src.slice(src.indexOf('aria-label="Article body"'));
    assert.ok(block.includes('article.lede'), 'article.lede not rendered in body');
  });
});

describe('DGS-H2-01 — Related articles', () => {
  test('related articles section present with aria-label', () => {
    assert.ok(src.includes('aria-label="Related articles"'), 'Related articles aria-label missing');
  });

  test('related articles use responsive grid', () => {
    const block = src.slice(src.indexOf('aria-label="Related articles"'));
    assert.ok(
      block.includes('grid-cols-1') && (block.includes('sm:grid-cols') || block.includes('lg:grid-cols')),
      'Responsive grid missing from related articles'
    );
  });

  test('related articles are links to /insights/[slug]', () => {
    const block = src.slice(src.indexOf('aria-label="Related articles"'));
    assert.ok(block.includes('/insights/'), 'Links to article pages missing from related articles');
  });

  test('related articles use h3 headings', () => {
    const block = src.slice(src.indexOf('aria-label="Related articles"'));
    assert.ok(block.includes('<h3'), 'h3 headings missing from related articles');
  });
});

describe('DGS-H2-01 — Share section', () => {
  test('share section present with aria-label', () => {
    assert.ok(src.includes('aria-label="Share article"'), 'Share article aria-label missing');
  });

  test('"Share" label present in share section', () => {
    const block = src.slice(src.indexOf('aria-label="Share article"'));
    assert.ok(block.toLowerCase().includes('share'), '"Share" label missing from share section');
  });
});

describe('DGS-H2-01 — Subscribe section', () => {
  test('subscribe section present with aria-label', () => {
    assert.ok(src.includes('aria-label="Subscribe"'), 'Subscribe section aria-label missing');
  });

  test('email input in subscribe section', () => {
    // DGS-H1-02: email input moved to shared NewsletterForm component
    assert.ok(
      src.includes('type="email"') || src.includes("type='email'") ||
      newsletterSrc.includes('type="email"') || newsletterSrc.includes("type='email'"),
      'Email input missing from subscribe section'
    );
  });

  test('"Subscribe for Insights" button present', () => {
    // DGS-H1-02: button text moved to shared NewsletterForm component
    assert.ok(
      src.includes('Subscribe for Insights') || newsletterSrc.includes('Subscribe for Insights'),
      '"Subscribe for Insights" button text missing'
    );
  });

  test('"Stay current" heading present', () => {
    assert.ok(src.includes('Stay current'), '"Stay current" heading missing from subscribe section');
  });
});

describe('DGS-H2-01 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });
});
