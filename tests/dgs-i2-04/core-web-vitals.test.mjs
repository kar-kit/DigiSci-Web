/**
 * DGS-I2-04: Core Web Vitals optimisation
 * AC: LCP < 2.5s, CLS < 0.1, FID/INP < 100ms.
 *     Fonts preloaded (no render-blocking googleapis @import).
 *     Hero image loaded appropriately.
 *     Images served as WebP with correct dimensions.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');

const layout  = readFileSync(join(ROOT, 'app/layout.tsx'), 'utf8');
const css     = readFileSync(join(ROOT, 'app/globals.css'), 'utf8');
const nav     = readFileSync(join(ROOT, 'components/layout/Nav.tsx'), 'utf8');
const footer  = readFileSync(join(ROOT, 'components/layout/Footer.tsx'), 'utf8');

describe('DGS-I2-04 — Font loading (no render-blocking external import)', () => {
  test('globals.css has no googleapis @import', () => {
    assert.ok(
      !css.includes('fonts.googleapis.com'),
      'Render-blocking @import url(fonts.googleapis.com) found in globals.css — must be removed',
    );
  });

  test('layout uses next/font/google for IBM Plex Sans', () => {
    assert.ok(
      layout.includes('IBM_Plex_Sans') || layout.includes('IBMPlexSans'),
      'IBM Plex Sans not loaded via next/font/google in layout.tsx',
    );
  });

  test('layout uses next/font/google for Source Serif 4', () => {
    assert.ok(
      layout.includes('Source_Serif_4') || layout.includes('SourceSerif4'),
      'Source Serif 4 not loaded via next/font/google in layout.tsx',
    );
  });

  test('layout uses next/font/google for IBM Plex Mono', () => {
    assert.ok(
      layout.includes('IBM_Plex_Mono') || layout.includes('IBMPlexMono'),
      'IBM Plex Mono not loaded via next/font/google in layout.tsx',
    );
  });

  test('font CSS variables injected onto <html> element', () => {
    assert.ok(
      layout.includes('fontSans.variable') || layout.includes('.variable'),
      'next/font CSS variable classes not applied to <html> in layout.tsx',
    );
  });

  test('font display swap declared', () => {
    const swapCount = (layout.match(/display:\s*['"]swap['"]/g) || []).length;
    assert.ok(swapCount >= 3, `Expected at least 3 font-display:swap declarations (one per font), found ${swapCount}`);
  });
});

describe('DGS-I2-04 — Image optimisation (next/image, priority on LCP)', () => {
  test('Nav logo uses next/image', () => {
    assert.ok(
      nav.includes("from 'next/image'") || nav.includes('from "next/image"'),
      'Nav does not import next/image',
    );
  });

  test('Nav logo has priority prop (above-fold LCP candidate)', () => {
    const imgBlock = nav.slice(nav.indexOf('<Image'));
    assert.ok(imgBlock.includes('priority'), 'Nav logo <Image> missing priority prop — it is an above-fold LCP candidate');
  });

  test('Footer logo uses next/image', () => {
    assert.ok(
      footer.includes("from 'next/image'") || footer.includes('from "next/image"'),
      'Footer does not import next/image',
    );
  });

  test('Footer logo does NOT have priority (below-fold, lazy is correct)', () => {
    const imgBlock = footer.slice(footer.indexOf('<Image'));
    assert.ok(
      !imgBlock.slice(0, 200).includes('priority'),
      'Footer logo has priority prop — it is below the fold and should lazy-load',
    );
  });

  test('no raw <img> tags in app pages (all images via next/image)', () => {
    function collectTsx(dir) {
      const entries = readdirSync(dir);
      const files = [];
      for (const e of entries) {
        const full = join(dir, e);
        if (statSync(full).isDirectory()) files.push(...collectTsx(full));
        else if (e.endsWith('.tsx') || e.endsWith('.ts')) files.push(full);
      }
      return files;
    }
    const matches = collectTsx(join(ROOT, 'app'))
      .filter(f => readFileSync(f, 'utf8').includes('<img '));
    assert.deepEqual(matches, [], `Raw <img> tags found in: ${matches.join(', ')} — use next/image instead`);
  });
});
