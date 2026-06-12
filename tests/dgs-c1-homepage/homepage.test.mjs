/**
 * DGS-C1: Homepage sections — hero, industry context, value proposition,
 * services overview, insights teaser, CTA.
 * Updated to reflect actual design_mockup spec.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const src  = readFileSync(join(ROOT, 'app/page.tsx'), 'utf8');
const layout = readFileSync(join(ROOT, 'app/layout.tsx'), 'utf8');

describe('DGS-C1-01 — Hero section', () => {
  test('hero aria-label present', () => {
    assert.ok(src.includes('aria-label="Hero"'), 'hero aria-label missing');
  });

  test('h1 headline present', () => {
    assert.ok(src.includes('<h1'), 'h1 missing');
    assert.ok(src.includes('Biotech Operations'), 'headline copy missing ("Biotech Operations")');
  });

  test('hero has grid-bg texture', () => {
    assert.ok(src.includes('grid-bg'), 'grid-bg texture missing from hero');
  });

  test('hero padding pt-[128px]', () => {
    assert.ok(src.includes('pt-[128px]') || src.includes('128px'), 'hero top padding 128px missing');
  });

  test('accent colour on headline span', () => {
    assert.ok(src.includes('text-[--accent]') || src.includes('accent'), 'accent colour on headline missing');
  });

  test('sector tags in hero', () => {
    assert.ok(src.includes('Cell'), 'CGT tag missing');
    assert.ok(src.includes('Pharma Operations'), 'Pharma Operations tag missing');
    assert.ok(src.includes('AI Systems'), 'AI Systems tag missing');
  });

  test('primary CTA button "Book a Discovery Call"', () => {
    assert.ok(src.includes('Book a Discovery Call'), 'primary CTA missing');
  });

  test('secondary CTA "Explore Services"', () => {
    assert.ok(src.includes('Explore Services'), 'secondary CTA missing');
  });

  test('data panel label "Operational readiness"', () => {
    assert.ok(src.includes('Operational readiness'), 'data panel label missing');
  });
});

describe('DGS-C1-02 — Industry context and value proposition', () => {
  test('industry context section present', () => {
    assert.ok(
      src.includes('aria-label="Industry context"') || src.includes('Industry context'),
      'industry context section missing',
    );
  });

  test('operational inflection point headline', () => {
    assert.ok(src.includes('operational inflection point'), 'industry context headline missing');
  });

  test('value proposition section present', () => {
    assert.ok(
      src.includes('aria-label="Value proposition"') || src.includes('Operational expertise meets'),
      'value proposition section missing',
    );
  });

  test('4 pillars present', () => {
    assert.ok(src.includes('Domain Depth'), 'Domain Depth pillar missing');
    assert.ok(src.includes('AI Transformation'), 'AI Transformation pillar missing');
    assert.ok(src.includes('Regulatory Awareness'), 'Regulatory Awareness pillar missing');
    assert.ok(src.includes('Strategic Clarity'), 'Strategic Clarity pillar missing');
  });

  test('credibility bar present', () => {
    assert.ok(
      src.includes('GxP Quality Systems') || src.includes('Operating across'),
      'credibility bar missing',
    );
  });
});

describe('DGS-C1 — Services section', () => {
  test('services aria-label', () => {
    assert.ok(src.includes('aria-label="Services"'), 'services aria-label missing');
  });

  test('4 service cards present', () => {
    assert.ok(src.includes('AI Transformation Strategy'), 'service 1 (AI Transformation Strategy) missing');
    assert.ok(src.includes('AI Implementation'), 'service 2 (AI Implementation) missing');
    assert.ok(src.includes('Digital Operations'), 'service 3 (Digital Operations) missing');
    assert.ok(src.includes('Operational Excellence'), 'service 4 (Operational Excellence) missing');
  });

  test('section uses design-system spacing (py-24 or py-32)', () => {
    assert.ok(src.includes('py-24') || src.includes('py-32'), 'section padding missing');
  });

  test('Card component used', () => {
    assert.ok(src.includes('<Card'), 'Card component not used');
  });

  test('ruled and interactive props on cards', () => {
    assert.ok(src.includes('ruled'), 'ruled prop missing');
    assert.ok(src.includes('interactive'), 'interactive prop missing');
  });
});

describe('DGS-C1 — CTA section', () => {
  test('CTA aria-label', () => {
    assert.ok(src.includes('aria-label="Call to action"'), 'CTA aria-label missing');
  });

  test('CTA headline present', () => {
    assert.ok(src.includes('Working on an operational transformation challenge'), 'CTA headline missing');
  });

  test('CTA has primary button', () => {
    const ctaSection = src.slice(src.lastIndexOf('Call to action'));
    assert.ok(ctaSection.includes('Book a Discovery Call'), 'CTA primary button missing');
  });

  test('CTA responsive layout (sm:flex-row)', () => {
    assert.ok(src.includes('sm:flex-row'), 'CTA responsive flex-row missing');
  });
});

describe('DGS-C1 — Layout integrity', () => {
  test('Nav imported in layout', () => {
    assert.ok(layout.includes('Nav'), 'Nav not in layout.tsx');
  });

  test('max-w-[1240px] container on all sections', () => {
    const containerCount = (src.match(/max-w-\[1240px\]/g) || []).length;
    assert.ok(containerCount >= 3, `expected 3+ 1240px containers, found ${containerCount}`);
  });

  test('no hardcoded hex colours in page', () => {
    assert.ok(!src.match(/#[0-9A-Fa-f]{6}/), 'hardcoded hex found in page.tsx');
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });

  test('no inline style= on interactive elements (only bg-image)', () => {
    const styleAttrs = src.match(/style=\{/g) || [];
    assert.ok(styleAttrs.length <= 1, `too many inline style= attributes: ${styleAttrs.length}`);
  });

  test('heading hierarchy — h1 before h2', () => {
    const h1Pos = src.indexOf('<h1');
    const h2Pos = src.indexOf('<h2');
    assert.ok(h1Pos < h2Pos, 'h2 appears before h1 — heading hierarchy broken');
  });
});
