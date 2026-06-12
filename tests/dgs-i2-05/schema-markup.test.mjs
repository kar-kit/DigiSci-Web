/**
 * DGS-I2-05: Organisation and Person schema markup
 * AC: Organization schema on all pages (name, url, logo, sameAs LinkedIn).
 *     Person schema on About page (Kwok Pang, jobTitle, worksFor, sameAs).
 *     Article schema on all Insights pages.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');

const layout  = readFileSync(join(ROOT, 'app/layout.tsx'), 'utf8');
const about   = readFileSync(join(ROOT, 'app/about/page.tsx'), 'utf8');
const article = readFileSync(join(ROOT, 'app/insights/[slug]/page.tsx'), 'utf8');

describe('DGS-I2-05 — Organization schema in root layout', () => {
  test('application/ld+json script in layout', () => {
    assert.ok(layout.includes('application/ld+json'), 'JSON-LD script missing from root layout');
  });

  test('Organization @type declared', () => {
    assert.ok(layout.includes("'Organization'") || layout.includes('"Organization"'), 'Organization @type missing from layout schema');
  });

  test('organization name "DigiSci"', () => {
    assert.ok(layout.includes("name: 'DigiSci'") || layout.includes('name: "DigiSci"'), 'Organization name "DigiSci" missing');
  });

  test('organization url digisci.solutions', () => {
    assert.ok(layout.includes('digisci.solutions'), 'Organization URL missing from schema');
  });

  test('logo declared in organization schema', () => {
    const block = layout.slice(layout.indexOf('ORGANIZATION_SCHEMA'));
    assert.ok(block.includes('logo'), 'logo missing from Organization schema');
  });

  test('sameAs LinkedIn in organization schema', () => {
    const block = layout.slice(layout.indexOf('ORGANIZATION_SCHEMA'));
    assert.ok(block.includes('linkedin.com/in/kwok-pang'), 'sameAs LinkedIn missing from Organization schema');
  });
});

describe('DGS-I2-05 — Person schema on About page', () => {
  test('application/ld+json script in about page', () => {
    assert.ok(about.includes('application/ld+json'), 'JSON-LD script missing from About page');
  });

  test('Person @type declared', () => {
    assert.ok(about.includes("'Person'") || about.includes('"Person"'), 'Person @type missing from About schema');
  });

  test('person name "Kwok Pang"', () => {
    assert.ok(about.includes('Kwok Pang'), '"Kwok Pang" missing from Person schema');
  });

  test('jobTitle declared', () => {
    assert.ok(about.includes('jobTitle'), 'jobTitle missing from Person schema');
  });

  test('worksFor declared', () => {
    assert.ok(about.includes('worksFor'), 'worksFor missing from Person schema');
  });

  test('sameAs LinkedIn in person schema', () => {
    const block = about.slice(about.indexOf('application/ld+json'));
    assert.ok(block.includes('linkedin.com/in/kwok-pang'), 'sameAs LinkedIn missing from Person schema');
  });
});

describe('DGS-I2-05 — Article schema on Insights detail page', () => {
  test('application/ld+json script in insights article page', () => {
    assert.ok(article.includes('application/ld+json'), 'JSON-LD script missing from article page');
  });

  test('Article @type declared', () => {
    assert.ok(article.includes("'Article'") || article.includes('"Article"'), 'Article @type missing from article schema');
  });

  test('headline from article data', () => {
    const block = article.slice(article.indexOf('application/ld+json'));
    assert.ok(block.includes('article.title') || block.includes('headline'), 'headline missing from Article schema');
  });

  test('author Person declared', () => {
    const block = article.slice(article.indexOf('application/ld+json'));
    assert.ok(block.includes('author') && block.includes('Kwok Pang'), 'author Kwok Pang missing from Article schema');
  });

  test('publisher Organization declared', () => {
    const block = article.slice(article.indexOf('application/ld+json'));
    assert.ok(block.includes('publisher') && (block.includes('DigiSci') || block.includes('Organization')), 'publisher Organization missing from Article schema');
  });

  test('datePublished declared', () => {
    const block = article.slice(article.indexOf('application/ld+json'));
    assert.ok(block.includes('datePublished'), 'datePublished missing from Article schema');
  });

  test('mainEntityOfPage declared', () => {
    const block = article.slice(article.indexOf('application/ld+json'));
    assert.ok(block.includes('mainEntityOfPage'), 'mainEntityOfPage missing from Article schema');
  });
});
