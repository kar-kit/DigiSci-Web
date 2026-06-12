/**
 * DGS-B1-01: Footer with all site page links
 * AC: Footer present on all pages. Links to Home, About, Services, Industry Expertise,
 * Case Studies, Insights, Contact. DigiSci wordmark present.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir  = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, '..', '..');
const footer = readFileSync(join(ROOT, 'components/layout/Footer.tsx'), 'utf8');
const layout = readFileSync(join(ROOT, 'app/layout.tsx'), 'utf8');

describe('DGS-B1-01 — Footer present on all pages', () => {
  test('Footer component imported in root layout', () => {
    assert.ok(
      layout.includes("from '@/components/layout/Footer'") ||
        layout.includes('from "@/components/layout/Footer"'),
      'Footer not imported in layout',
    );
  });

  test('Footer rendered in root layout body', () => {
    assert.ok(layout.includes('<Footer />'), 'Footer not rendered in layout — not present on all pages');
  });

  test('footer uses <footer> semantic element', () => {
    assert.ok(footer.includes('<footer'), 'footer element missing — must use semantic <footer> tag');
  });

  test('footer has aria-label="Site footer"', () => {
    assert.ok(footer.includes('aria-label="Site footer"'), 'aria-label missing on footer');
  });
});

describe('DGS-B1-01 — All required page links present', () => {
  test('link to Home (/)', () => {
    assert.ok(footer.includes('href="/"'), 'Home link (href="/") missing');
  });

  test('link to About (/about)', () => {
    assert.ok(footer.includes('/about'), 'About link missing');
  });

  test('link to Services (/services)', () => {
    assert.ok(footer.includes('/services'), 'Services link missing');
  });

  test('link to Industry Expertise (/industry)', () => {
    assert.ok(footer.includes('/industry') || footer.includes('Industry Expertise'), 'Industry Expertise link missing');
  });

  test('link to Case Studies (/case-studies)', () => {
    assert.ok(footer.includes('/case-studies') || footer.includes('Case Studies'), 'Case Studies link missing');
  });

  test('link to Insights (/insights)', () => {
    assert.ok(footer.includes('/insights') || footer.includes('Insights'), 'Insights link missing');
  });

  test('link to Contact (/contact)', () => {
    assert.ok(footer.includes('/contact') || footer.includes('Contact'), 'Contact link missing');
  });

  test('footer nav has aria-label="Footer navigation"', () => {
    assert.ok(footer.includes('aria-label="Footer navigation"'), 'footer nav aria-label missing');
  });
});

describe('DGS-B1-01 — DigiSci wordmark', () => {
  test('DigiSci wordmark image present', () => {
    assert.ok(
      footer.includes('logo-lockup') || footer.includes('DigiSci'),
      'DigiSci wordmark missing from footer',
    );
  });

  test('wordmark image has alt="DigiSci"', () => {
    assert.ok(footer.includes('alt="DigiSci"'), 'wordmark alt text missing');
  });

  test('wordmark wrapped in Link to homepage', () => {
    assert.ok(footer.includes('href="/"') && footer.includes('logo'), 'wordmark not linked to homepage');
  });
});

describe('DGS-B1-01 — No raw CSS', () => {
  test('no CSS module imports', () => {
    assert.ok(!footer.includes('.module.css'), 'CSS module import found in Footer');
  });

  test('no inline style= attributes (HTML)', () => {
    assert.ok(!/style="/.test(footer), 'inline style attribute found — use Tailwind');
  });

  test('no hardcoded hex colours in Footer', () => {
    const hexCount = (footer.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('uses design token references (--surface-sunken, --text-secondary, etc.)', () => {
    assert.ok(footer.includes('--surface-sunken') || footer.includes('--surface'), 'no surface token used in footer');
    assert.ok(footer.includes('--text-secondary') || footer.includes('--text-'), 'no text token used in footer');
  });
});

describe('DGS-B1-01 — Layout and structure', () => {
  test('max-w-[1240px] container for consistent page width', () => {
    assert.ok(footer.includes('max-w-[1240px]'), 'footer container width missing');
  });

  test('responsive layout (flex-col → md:flex-row)', () => {
    assert.ok(footer.includes('md:flex-row'), 'footer not responsive — md:flex-row missing');
  });

  test('border-t separator from page content', () => {
    assert.ok(footer.includes('border-t'), 'border-t separator missing on footer');
  });
});
