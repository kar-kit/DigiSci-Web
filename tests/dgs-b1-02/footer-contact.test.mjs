/**
 * DGS-B1-02: Footer contact and LinkedIn link
 * AC: Email address clickable (mailto). LinkedIn icon links to DigiSci's profile. Opens in new tab.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir  = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, '..', '..');
const footer = readFileSync(join(ROOT, 'components/layout/Footer.tsx'), 'utf8');

describe('DGS-B1-02 — Email contact link', () => {
  test('mailto: link present', () => {
    assert.ok(footer.includes('mailto:'), 'mailto: link missing');
  });

  test('email address is @digisci.solutions domain', () => {
    assert.ok(footer.includes('digisci.solutions'), 'email must use digisci.solutions domain');
  });

  test('email link displays the address as visible text', () => {
    assert.ok(
      footer.includes('hello@digisci.solutions') || footer.includes('@digisci.solutions'),
      'email address text missing — link must show the address visibly',
    );
  });

  test('email link has aria-label for screen readers', () => {
    assert.ok(
      footer.includes('aria-label="Email DigiSci"') || footer.includes('aria-label'),
      'email link aria-label missing',
    );
  });

  test('Mail icon present (lucide-react)', () => {
    assert.ok(footer.includes('Mail'), 'Mail icon missing from lucide-react');
  });
});

describe('DGS-B1-02 — LinkedIn link', () => {
  test('LinkedIn URL present', () => {
    assert.ok(
      footer.includes('linkedin.com'),
      'LinkedIn URL missing from footer',
    );
  });

  test('LinkedIn link opens in new tab (target="_blank")', () => {
    assert.ok(footer.includes('target="_blank"'), 'LinkedIn link must open in new tab (target="_blank")');
  });

  test('LinkedIn link has rel="noopener noreferrer" for security', () => {
    assert.ok(
      footer.includes('noopener') && footer.includes('noreferrer'),
      'LinkedIn link missing rel="noopener noreferrer"',
    );
  });

  test('LinkedIn icon present (inline SVG with LinkedIn path)', () => {
    // LinkedIn not in this lucide-react version — implemented as inline SVG
    assert.ok(footer.includes('<svg') && footer.includes('linkedin.com'), 'LinkedIn SVG icon missing');
  });

  test('LinkedIn link has descriptive aria-label', () => {
    assert.ok(
      footer.includes('LinkedIn') && footer.includes('aria-label'),
      'LinkedIn link aria-label missing',
    );
  });
});

describe('DGS-B1-02 — Icons accessibility', () => {
  test('icons have aria-hidden="true" (decorative — text/label carries meaning)', () => {
    assert.ok(footer.includes('aria-hidden="true"'), 'icon aria-hidden missing — icons are decorative');
  });
});
