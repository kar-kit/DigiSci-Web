/**
 * DGS-X1-02: DigiSci logo variants tests
 * Verifies all required SVG logo variants exist and meet spec.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dir, '..', '..', 'public', 'assets');

const VARIANTS = {
  'logomark.svg':       'white-on-dark logomark',
  'logomark-light.svg': 'dark-on-light logomark',
  'logomark-mono.svg':  'monochrome logomark',
  'logo-lockup.svg':    'white-on-dark full lockup',
  'logo-lockup-light.svg': 'dark-on-light full lockup',
};

describe('DGS-X1-02 — All required logo variant files exist', () => {
  for (const [file, desc] of Object.entries(VARIANTS)) {
    test(`${file} (${desc}) exists`, () => {
      assert.ok(existsSync(join(ASSETS, file)), `Missing: public/assets/${file}`);
    });
  }
});

describe('DGS-X1-02 — SVG structure validity', () => {
  for (const [file] of Object.entries(VARIANTS)) {
    test(`${file} is valid SVG with viewBox and aria-label`, () => {
      const path = join(ASSETS, file);
      if (!existsSync(path)) return; // existence tested separately
      const svg = readFileSync(path, 'utf8');
      assert.ok(svg.includes('<svg'), `${file}: missing <svg> element`);
      assert.ok(svg.includes('viewBox'), `${file}: missing viewBox attribute`);
      assert.ok(svg.includes('aria-label'), `${file}: missing aria-label for accessibility`);
      assert.ok(svg.includes('role="img"'), `${file}: missing role="img"`);
    });
  }
});

describe('DGS-X1-02 — Colour correctness per variant', () => {
  test('logomark.svg uses off-white strokes (#F9FAFB) — white-on-dark', () => {
    const svg = readFileSync(join(ASSETS, 'logomark.svg'), 'utf8');
    assert.ok(svg.includes('#F9FAFB'), 'logomark.svg: expected #F9FAFB stroke for white-on-dark');
    assert.ok(svg.includes('#00A3E0'), 'logomark.svg: expected Precise Blue #00A3E0 accent');
  });

  test('logomark-light.svg uses navy strokes (#0A1628) — dark-on-light', () => {
    const svg = readFileSync(join(ASSETS, 'logomark-light.svg'), 'utf8');
    assert.ok(svg.includes('#0A1628'), 'logomark-light.svg: expected navy #0A1628 stroke for dark-on-light');
    assert.ok(svg.includes('#00A3E0'), 'logomark-light.svg: expected Precise Blue #00A3E0 accent');
    // Must NOT use white strokes on this variant
    assert.ok(!svg.includes('#F9FAFB'), 'logomark-light.svg: must not contain #F9FAFB white strokes');
  });

  test('logomark-mono.svg uses currentColor for full theme-ability', () => {
    const svg = readFileSync(join(ASSETS, 'logomark-mono.svg'), 'utf8');
    assert.ok(svg.includes('currentColor'), 'logomark-mono.svg: must use currentColor');
    // Monochrome must have no hardcoded brand hex other than currentColor
    const brandHexRegex = /#(?:F9FAFB|0A1628|00A3E0)/gi;
    const hardcoded = svg.match(brandHexRegex);
    assert.ok(!hardcoded, `logomark-mono.svg: must not hardcode brand colours, found: ${hardcoded}`);
  });

  test('logo-lockup.svg contains wordmark text "DigiSci"', () => {
    const svg = readFileSync(join(ASSETS, 'logo-lockup.svg'), 'utf8');
    assert.ok(svg.includes('DigiSci'), 'logo-lockup.svg: must include wordmark text');
  });

  test('logo-lockup-light.svg contains wordmark text "DigiSci" with navy text', () => {
    const svg = readFileSync(join(ASSETS, 'logo-lockup-light.svg'), 'utf8');
    assert.ok(svg.includes('DigiSci'), 'logo-lockup-light.svg: must include wordmark text');
    assert.ok(svg.includes('#0A1628'), 'logo-lockup-light.svg: wordmark must use navy #0A1628');
  });
});

describe('DGS-X1-02 — Proportions', () => {
  test('Logomark variants are square (48×48)', () => {
    for (const file of ['logomark.svg', 'logomark-light.svg', 'logomark-mono.svg']) {
      const svg = readFileSync(join(ASSETS, file), 'utf8');
      assert.ok(svg.includes('width="48"') && svg.includes('height="48"'),
        `${file}: must be 48×48`);
    }
  });

  test('Lockup variants are wider than tall', () => {
    for (const file of ['logo-lockup.svg', 'logo-lockup-light.svg']) {
      const svg = readFileSync(join(ASSETS, file), 'utf8');
      const w = parseInt(svg.match(/width="(\d+)"/)?.[1] ?? '0');
      const h = parseInt(svg.match(/height="(\d+)"/)?.[1] ?? '0');
      assert.ok(w > h, `${file}: lockup width (${w}) must be greater than height (${h})`);
    }
  });
});
