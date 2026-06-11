/**
 * DGS-X1-01: Design token library tests
 * Verifies CSS variables in app/globals.css match acceptance criteria.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const GLOBALS = join(ROOT, 'app', 'globals.css');

const css = readFileSync(GLOBALS, 'utf8');

// Helper: extract the value of a CSS custom property from the :root block
function getVar(name) {
  const re = new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:\\s*([^;]+);`);
  const m = css.match(re);
  return m ? m[1].trim() : null;
}

// Helper: assert a CSS variable exists and equals expected value
function assertVar(name, expected) {
  const val = getVar(name);
  assert.ok(val !== null, `CSS variable ${name} not found in globals.css`);
  assert.equal(val, expected, `${name}: expected "${expected}", got "${val}"`);
}

describe('DGS-X1-01 — Colour tokens', () => {
  test('Navy primary #0A1628 (--navy-900)', () => {
    assertVar('--navy-900', '#0A1628');
  });

  test('Off-white #F9FAFB (--neutral-50)', () => {
    assertVar('--neutral-50', '#F9FAFB');
  });

  test('Precise Blue #00A3E0 (--blue-500)', () => {
    assertVar('--blue-500', '#00A3E0');
  });

  test('Sector Green defined (--green-500)', () => {
    const val = getVar('--green-500');
    assert.ok(val !== null, '--green-500 must be defined');
    assert.match(val, /^#[0-9A-Fa-f]{6}$/, '--green-500 must be a 6-digit hex');
  });

  test('Navy spectrum exists (950 through 400)', () => {
    for (const shade of ['950', '900', '850', '800', '700', '600', '500', '400']) {
      assert.ok(getVar(`--navy-${shade}`) !== null, `--navy-${shade} missing`);
    }
  });
});

describe('DGS-X1-01 — Typography tokens', () => {
  test('--font-sans references IBM Plex Sans', () => {
    const val = getVar('--font-sans');
    assert.ok(val !== null, '--font-sans not defined');
    assert.ok(val.includes('IBM Plex Sans'), `--font-sans should include "IBM Plex Sans", got: ${val}`);
  });

  test('--font-serif references Source Serif 4', () => {
    const val = getVar('--font-serif');
    assert.ok(val !== null, '--font-serif not defined');
    assert.ok(val.includes('Source Serif 4'), `--font-serif should include "Source Serif 4", got: ${val}`);
  });

  test('--font-mono references IBM Plex Mono', () => {
    const val = getVar('--font-mono');
    assert.ok(val !== null, '--font-mono not defined');
    assert.ok(val.includes('IBM Plex Mono'), `--font-mono should include "IBM Plex Mono", got: ${val}`);
  });
});

describe('DGS-X1-01 — Spacing scale (4px grid)', () => {
  // Spacing values: --space-1 = 0.25rem (4px) … --space-12 = 8rem (128px)
  // 1rem = 16px baseline; each must be a multiple of 0.25rem (4px)
  const expected = {
    '--space-1':  '0.25rem',
    '--space-2':  '0.5rem',
    '--space-3':  '0.75rem',
    '--space-4':  '1rem',
    '--space-5':  '1.5rem',
    '--space-6':  '2rem',
    '--space-7':  '2.5rem',
    '--space-8':  '3rem',
    '--space-9':  '4rem',
    '--space-10': '5rem',
    '--space-11': '6rem',
    '--space-12': '8rem',
  };

  for (const [name, value] of Object.entries(expected)) {
    test(`${name} = ${value} (multiple of 4px)`, () => {
      assertVar(name, value);
      // Verify the rem value is a multiple of 0.25 (4px)
      const rem = parseFloat(value);
      assert.ok(Math.round(rem * 4) === rem * 4, `${name} value ${value} is not a multiple of 0.25rem (4px)`);
    });
  }
});

describe('DGS-X1-01 — Radius scale', () => {
  test('--radius-sm = 4px', () => assertVar('--radius-sm', '4px'));
  test('--radius-md = 6px', () => assertVar('--radius-md', '6px'));
  test('--radius-xs = 2px', () => assertVar('--radius-xs', '2px'));
});

describe('DGS-X1-01 — No hardcoded values leaking into component files', () => {
  // Grep all .tsx/.ts/.css files in app/ and components/ for raw hex colours
  // that are NOT inside globals.css itself
  test('No hardcoded hex colours in component/page files', () => {
    const HARDCODED_HEX = /#[0-9A-Fa-f]{3,6}\b/g;
    const dirsToCheck = ['app', 'components'];
    const violations = [];

    for (const dir of dirsToCheck) {
      const dirPath = join(ROOT, dir);
      let files;
      try {
        files = readdirSync(dirPath, { recursive: true, withFileTypes: true });
      } catch {
        continue;
      }
      for (const f of files) {
        if (!f.isFile()) continue;
        if (!/\.(tsx?|css)$/.test(f.name)) continue;
        const fullPath = join(f.parentPath ?? f.path, f.name);
        // Skip globals.css — that's the token definition file
        if (fullPath === GLOBALS) continue;
        const content = readFileSync(fullPath, 'utf8');
        const matches = content.match(HARDCODED_HEX);
        if (matches) {
          violations.push(`${fullPath.replace(ROOT + '/', '')}: ${matches.join(', ')}`);
        }
      }
    }

    assert.deepEqual(violations, [], `Hardcoded hex colours found outside globals.css:\n${violations.join('\n')}`);
  });
});
