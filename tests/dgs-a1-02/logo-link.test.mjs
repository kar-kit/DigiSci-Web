/**
 * DGS-A1-02: Logo links back to homepage
 * AC: logo click navigates to /, renders correctly on dark/light backgrounds.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const nav   = readFileSync(join(ROOT, 'components/layout/Nav.tsx'), 'utf8');

describe('DGS-A1-02 — Logo navigation', () => {
  test('logo wrapped in Link to "/"', () => {
    assert.ok(nav.includes('href="/"'), 'logo link to "/" missing');
  });

  test('logo uses white-on-dark lockup (dark bg default)', () => {
    assert.ok(nav.includes('logo-lockup.svg'), 'dark logo-lockup.svg missing');
  });

  test('aria-label on logo link for screen readers', () => {
    assert.ok(nav.includes('aria-label'), 'aria-label on logo link missing');
  });
});

describe('DGS-A1-02 — Logo assets available for dark and light contexts', () => {
  test('logo-lockup.svg (white-on-dark) exists in public/assets', () => {
    assert.ok(existsSync(join(ROOT, 'public/assets/logo-lockup.svg')), 'logo-lockup.svg missing');
  });

  test('logo-lockup-light.svg (dark-on-light) exists in public/assets', () => {
    assert.ok(existsSync(join(ROOT, 'public/assets/logo-lockup-light.svg')), 'logo-lockup-light.svg missing');
  });
});
