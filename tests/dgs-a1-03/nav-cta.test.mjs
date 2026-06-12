/**
 * DGS-A1-03: Request a Briefing CTA in nav
 * AC: primary blue button, links to /contact, visible all breakpoints,
 * collapses into hamburger on mobile.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'components/layout/Nav.tsx'), 'utf8');

describe('DGS-A1-03 — CTA button', () => {
  test('CTA button uses primary variant', () => {
    assert.ok(src.includes('variant="primary"'), 'primary variant missing on CTA');
  });

  test('CTA links to /contact', () => {
    assert.ok(src.includes('href="/contact"'), 'CTA href="/contact" missing');
  });

  test('CTA text "Request a briefing"', () => {
    assert.ok(src.includes('Request a briefing'), 'CTA copy missing');
  });
});

describe('DGS-A1-03 — Mobile hamburger', () => {
  test('hamburger button present', () => {
    assert.ok(src.includes('Open menu') || src.includes('hamburger') || src.includes('aria-expanded'), 'hamburger button missing');
  });

  test('hamburger has aria-expanded for accessibility', () => {
    assert.ok(src.includes('aria-expanded'), 'aria-expanded missing on hamburger');
  });

  test('hamburger has aria-controls pointing to mobile overlay', () => {
    // id updated from mobile-menu → mobile-nav-overlay in DGS-A2-01 (full-screen overlay refactor)
    assert.ok(
      src.includes('aria-controls') &&
        (src.includes('mobile-nav-overlay') || src.includes('mobile-menu')),
      'aria-controls missing',
    );
  });

  test('hamburger hidden on md+ (md:hidden)', () => {
    assert.ok(src.includes('md:hidden'), 'md:hidden missing on hamburger — would show on desktop');
  });

  test('desktop nav hidden on mobile (hidden md:flex)', () => {
    assert.ok(src.includes('hidden md:flex'), 'desktop nav not hidden on mobile');
  });

  test('mobile overlay id matches aria-controls', () => {
    // id updated from mobile-menu → mobile-nav-overlay in DGS-A2-01 (full-screen overlay refactor)
    assert.ok(
      src.includes('id="mobile-nav-overlay"') || src.includes('id="mobile-menu"'),
      'mobile overlay id missing',
    );
  });

  test('mobile drawer has aria-hidden', () => {
    assert.ok(src.includes('aria-hidden'), 'aria-hidden missing on mobile drawer');
  });
});

describe('DGS-A1-03 — Hamburger animation', () => {
  test('hamburger lines use CSS transform for cross animation', () => {
    assert.ok(src.includes('rotate-45') || src.includes('rotate'), 'hamburger cross animation missing');
  });

  test('open state tracked in component state', () => {
    assert.ok(src.includes('open') && src.includes('setOpen'), 'open state missing');
  });
});
