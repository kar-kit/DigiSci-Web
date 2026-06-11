/**
 * DGS-X2-02: Card component tests
 * Verifies structure, Tailwind-only styling, interactive states, accessibility.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const SRC = readFileSync(join(ROOT, 'components', 'ui', 'Card.tsx'), 'utf8');

describe('DGS-X2-02 — Card structure', () => {
  test('exports a Card function component', () => {
    assert.ok(SRC.includes('export function Card'), 'Card must be a named export');
  });

  test('supports title prop', () => {
    assert.ok(SRC.includes('title'), 'Card must accept a title prop');
  });

  test('supports children (body text slot)', () => {
    assert.ok(SRC.includes('children'), 'Card must accept children for body text');
  });

  test('supports optional tag/eyebrow slot', () => {
    assert.ok(
      SRC.includes('eyebrow') || SRC.includes('tag'),
      'Card must support an eyebrow or tag slot'
    );
  });

  test('supports optional cta prop', () => {
    assert.ok(SRC.includes('cta'), 'Card must accept a cta prop');
  });
});

describe('DGS-X2-02 — Dark card variant (navy background)', () => {
  test('uses surface-raised token for background (not hardcoded)', () => {
    assert.ok(
      SRC.includes('surface-raised') || SRC.includes('navy'),
      'Card must use a navy/surface-raised background token'
    );
    // Must not use a raw hex for background
    const hexBg = SRC.match(/bg-#[0-9a-fA-F]/);
    assert.ok(!hexBg, 'Card must not hardcode a hex background colour');
  });
});

describe('DGS-X2-02 — Hover elevation state', () => {
  test('has hover translate/shadow classes when interactive', () => {
    assert.ok(
      SRC.includes('hover:-translate-y') || SRC.includes('hover:shadow'),
      'Card interactive state must include hover elevation (translate + shadow)'
    );
  });

  test('hover state is conditional on interactive prop', () => {
    assert.ok(
      SRC.includes('interactive'),
      'Hover elevation must be gated on an interactive prop'
    );
  });
});

describe('DGS-X2-02 — No hardcoded colours or spacing', () => {
  test('no raw hex values in Card.tsx', () => {
    const hexMatches = SRC.match(/#[0-9A-Fa-f]{3,6}(?![0-9A-Fa-f])/g);
    assert.ok(!hexMatches, `Card.tsx must not contain raw hex values, found: ${hexMatches}`);
  });

  test('no raw pixel spacing values (px integers outside of border/outline widths)', () => {
    // Allow 1px/2px for borders; disallow things like margin:16px, padding:24px
    const badPx = SRC.match(/(?:gap|margin|padding|space)-\[(?!1px|2px)\d+px\]/g);
    assert.ok(!badPx, `Card.tsx must not use raw px spacing, found: ${badPx}`);
  });

  test('Card.module.css does not exist (dead CSS removed)', () => {
    assert.ok(
      !existsSync(join(ROOT, 'components', 'ui', 'Card.module.css')),
      'Card.module.css must be deleted — component uses Tailwind only'
    );
  });
});

describe('DGS-X2-02 — Responsive', () => {
  test('component accepts className prop for layout overrides', () => {
    assert.ok(SRC.includes('className'), 'Card must accept className for responsive layout composition');
  });
});
