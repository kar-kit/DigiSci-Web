/**
 * DGS-D1-02: Founding conviction statement on About page
 * AC: Verbatim or adapted version of the founding conviction —
 *     "most valuable transformation work happens when deep domain expertise
 *     and AI capability are held in the same mind." Prominent typographic treatment.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/about/page.tsx'), 'utf8');

describe('DGS-D1-02 — Conviction quote present', () => {
  test('blockquote element used for conviction statement', () => {
    assert.ok(src.includes('<blockquote'), '<blockquote> element missing');
  });

  test('core conviction text present (domain expertise + AI capability)', () => {
    assert.ok(
      src.includes('most valuable transformation work'),
      '"most valuable transformation work" phrase missing'
    );
    assert.ok(
      src.includes('deep domain expertise') && src.includes('AI capability'),
      'Core conviction text ("deep domain expertise" / "AI capability") missing'
    );
    assert.ok(
      src.includes('same mind'),
      '"same mind" conclusion of conviction missing'
    );
  });

  test('conviction is attributed as a quote (opening quote mark)', () => {
    const block = src.slice(src.indexOf('<blockquote'), src.indexOf('</blockquote>') + 13);
    assert.ok(
      block.includes('“') || block.includes('"') || block.includes('&ldquo;'),
      'Opening quote mark missing from blockquote'
    );
  });
});

describe('DGS-D1-02 — Prominent typographic treatment', () => {
  test('blockquote has large font size (prominent treatment)', () => {
    const block = src.slice(src.indexOf('<blockquote'), src.indexOf('</blockquote>') + 13);
    const hasFontSize = block.includes('1.75rem') || block.includes('2rem') || block.includes('text-2xl') || block.includes('text-3xl') || block.includes('text-4xl');
    assert.ok(hasFontSize, 'Blockquote must have a prominent large font size');
  });

  test('blockquote has accent left-border (visual treatment)', () => {
    const block = src.slice(src.indexOf('<blockquote'), src.indexOf('</blockquote>') + 13);
    assert.ok(
      block.includes('border-l') && block.includes('var(--accent)'),
      'Blockquote missing accent left-border treatment'
    );
  });

  test('blockquote uses primary text colour', () => {
    const block = src.slice(src.indexOf('<blockquote'), src.indexOf('</blockquote>') + 13);
    assert.ok(
      block.includes('text-primary') || block.includes('var(--text-primary)'),
      'Blockquote must use primary text colour'
    );
  });

  test('blockquote positioned within founder bio section', () => {
    const profileStart = src.indexOf('aria-label="Founder profile"');
    const profileEnd   = src.indexOf('aria-label="Career thread"');
    const bioBlock     = src.slice(profileStart, profileEnd);
    assert.ok(bioBlock.includes('<blockquote'), 'Conviction blockquote must be inside the Founder profile section');
  });
});

describe('DGS-D1-02 — No raw CSS', () => {
  test('no hardcoded hex colours in about/page.tsx', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
