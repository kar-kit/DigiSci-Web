/**
 * DGS-E1-03: Enquire about a project CTA on Services page
 * AC: CTA button 'Enquire About a Project' links to Contact page or opens a brief
 *     contact form. Appears at least once at bottom of page.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/services/page.tsx'), 'utf8');

describe('DGS-E1-03 — Bottom CTA section exists', () => {
  test('Call to action section present at bottom of page', () => {
    assert.ok(
      src.includes('aria-label="Call to action"'),
      'Call to action section aria-label missing'
    );
  });

  test('CTA section appears after engagement process section in source order', () => {
    const engagementIdx = src.indexOf('aria-label="Engagement process"');
    const ctaIdx        = src.indexOf('aria-label="Call to action"');
    assert.ok(engagementIdx !== -1, 'Engagement process section missing');
    assert.ok(ctaIdx !== -1, 'Call to action section missing');
    assert.ok(ctaIdx > engagementIdx, 'Call to action section must appear after engagement process in source');
  });
});

describe('DGS-E1-03 — Enquire About a Project button', () => {
  test('"Enquire About a Project" button text present', () => {
    assert.ok(
      src.includes('Enquire About a Project'),
      'Button text "Enquire About a Project" missing from services page'
    );
  });

  test('"Enquire About a Project" CTA links to /contact', () => {
    const ctaBlock = src.slice(src.indexOf('aria-label="Call to action"'));
    assert.ok(
      ctaBlock.includes('href="/contact"'),
      'CTA section must link to /contact'
    );
  });

  test('"Enquire About a Project" button appears in bottom CTA section', () => {
    const ctaBlock = src.slice(src.indexOf('aria-label="Call to action"'));
    assert.ok(
      ctaBlock.includes('Enquire About a Project'),
      '"Enquire About a Project" must appear inside the Call to action section'
    );
  });

  test('Button component used for the CTA', () => {
    const ctaBlock = src.slice(src.indexOf('aria-label="Call to action"'));
    assert.ok(ctaBlock.includes('<Button'), 'Button component missing from CTA section');
  });

  test('Primary variant used for Enquire About a Project button', () => {
    const ctaBlock = src.slice(src.indexOf('aria-label="Call to action"'));
    const btnIdx   = ctaBlock.indexOf('Enquire About a Project');
    const surrounding = ctaBlock.slice(Math.max(0, btnIdx - 200), btnIdx + 50);
    assert.ok(
      surrounding.includes('primary'),
      'Enquire About a Project button must use primary variant'
    );
  });
});

describe('DGS-E1-03 — CTA section layout and content', () => {
  test('CTA section has heading copy', () => {
    const ctaBlock = src.slice(src.indexOf('aria-label="Call to action"'));
    assert.ok(ctaBlock.includes('<h2'), 'CTA section missing h2 heading');
  });

  test('CTA section links to /contact at least once', () => {
    const ctaBlock = src.slice(src.indexOf('aria-label="Call to action"'));
    assert.ok(ctaBlock.includes('href="/contact"'), 'No /contact link in CTA section');
  });
});

describe('DGS-E1-03 — No raw CSS', () => {
  test('no hardcoded hex colours in services page', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
