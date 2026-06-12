/**
 * DGS-A1-01: Sticky global navigation bar tests
 * AC: fixed/sticky on scroll, logo (left), links (centre), CTA (right).
 * Transparent on hero, solid navy on scroll.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const src = readFileSync(join(ROOT, 'components/layout/Nav.tsx'), 'utf8');

describe('DGS-A1-01 — Nav positioning', () => {
  test('fixed positioning declared', () => {
    assert.ok(src.includes('fixed'), 'fixed class missing');
  });

  test('high z-index for sticky behaviour', () => {
    assert.ok(src.includes('z-[100]') || src.includes('z-100') || src.includes('z-sticky'), 'z-index class missing');
  });

  test('height 72px', () => {
    assert.ok(src.includes('h-[72px]') || src.includes('72px'), 'height 72px missing');
  });
});

describe('DGS-A1-01 — Transparent → solid on scroll', () => {
  test('transparent background on unscrolled state', () => {
    assert.ok(src.includes('bg-transparent') || src.includes('transparent'), 'transparent bg missing');
  });

  test('solid navy background on scrolled state', () => {
    assert.ok(src.includes('0,22,40') || src.includes('navy') || src.includes('rgba(10,22'), 'solid navy bg missing');
  });

  test('useEffect scroll listener present', () => {
    assert.ok(src.includes('useEffect') && src.includes('scroll'), 'scroll listener missing');
  });

  test('backdrop blur on scrolled state', () => {
    assert.ok(src.includes('backdrop-blur'), 'backdrop-blur missing');
  });
});

describe('DGS-A1-01 — Nav structure', () => {
  test('logo present (DigiSci image)', () => {
    assert.ok(src.includes('logo-lockup') || src.includes('logo'), 'logo missing');
  });

  test('logo links to homepage', () => {
    assert.ok(src.includes('href="/"'), 'logo home link missing');
  });

  test('nav links present (About, Services, Industry Expertise, Case Studies, Insights, Contact)', () => {
    assert.ok(src.includes('About'), 'About link missing');
    assert.ok(src.includes('Services') || src.includes('/services'), 'Services link missing');
    assert.ok(src.includes('Industry Expertise') || src.includes('/industry'), 'Industry Expertise link missing');
    assert.ok(src.includes('Case Studies') || src.includes('/case-studies'), 'Case Studies link missing');
    assert.ok(src.includes('Insights') || src.includes('/insights'), 'Insights link missing');
    assert.ok(src.includes('Contact') || src.includes('/contact'), 'Contact link missing');
  });

  test('CTA button present', () => {
    assert.ok(src.includes('Book a Discovery Call') || src.includes('Discovery Call'), 'CTA button missing');
  });
});

describe('DGS-A1-01 — Accessibility', () => {
  test('aria-label on header', () => {
    assert.ok(src.includes('aria-label'), 'aria-label missing on header');
  });

  test('aria-label on primary nav', () => {
    assert.ok(src.includes('aria-label="Primary"') || src.includes('Primary'), 'primary nav aria-label missing');
  });

  test('no CSS modules', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module found');
  });
});
