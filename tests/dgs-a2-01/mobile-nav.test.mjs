/**
 * DGS-A2-01: Mobile responsive navigation menu
 * AC: full-screen overlay on mobile, body scroll lock when open, large link typography,
 * dialog ARIA semantics, CTA visible at bottom, closes on link click / resize >= 768px.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'components/layout/Nav.tsx'), 'utf8');

describe('DGS-A2-01 — Full-screen mobile overlay', () => {
  test('overlay uses fixed inset-0 for full-screen coverage', () => {
    assert.ok(src.includes('fixed inset-0'), 'overlay must be fixed inset-0 to cover viewport');
  });

  test('overlay z-index below header (z-[99] vs z-[100])', () => {
    assert.ok(src.includes('z-[99]'), 'overlay z-index must be 99 (below header z-100)');
  });

  test('overlay has md:hidden so it never shows on desktop', () => {
    assert.ok(src.includes('md:hidden'), 'md:hidden missing on overlay — would render on desktop');
  });

  test('overlay id is mobile-nav-overlay', () => {
    assert.ok(src.includes('id="mobile-nav-overlay"'), 'overlay id must be mobile-nav-overlay');
  });
});

describe('DGS-A2-01 — ARIA / accessibility', () => {
  test('overlay has role="dialog"', () => {
    assert.ok(src.includes('role="dialog"'), 'role="dialog" missing on mobile overlay');
  });

  test('overlay has aria-modal="true"', () => {
    assert.ok(src.includes('aria-modal="true"'), 'aria-modal="true" missing on overlay');
  });

  test('overlay has aria-hidden wired to open state', () => {
    assert.ok(src.includes('aria-hidden={!open}'), 'aria-hidden={!open} missing on overlay');
  });

  test('hamburger aria-controls points to mobile-nav-overlay', () => {
    assert.ok(
      src.includes('aria-controls="mobile-nav-overlay"'),
      'aria-controls must reference mobile-nav-overlay',
    );
  });

  test('hamburger aria-label distinguishes open vs close state', () => {
    assert.ok(
      src.includes('Close navigation menu') && src.includes('Open navigation menu'),
      'hamburger aria-label must change between open and close state',
    );
  });

  test('mobile nav has aria-label="Mobile navigation"', () => {
    assert.ok(src.includes('aria-label="Mobile navigation"'), 'mobile nav aria-label missing');
  });
});

describe('DGS-A2-01 — Body scroll lock', () => {
  test('useEffect locks body scroll when open', () => {
    assert.ok(
      src.includes("document.body.style.overflow = open ? 'hidden' : ''"),
      'body scroll lock missing — overflow:hidden when open',
    );
  });

  test('scroll lock effect cleanup restores scroll', () => {
    assert.ok(
      src.includes("document.body.style.overflow = ''"),
      'body scroll cleanup missing',
    );
  });
});

describe('DGS-A2-01 — Nav link typography', () => {
  test('mobile links use large display size (32px)', () => {
    assert.ok(src.includes('text-[32px]'), 'mobile nav links must use text-[32px] for large readable targets');
  });

  test('mobile links use semibold weight', () => {
    assert.ok(src.includes('font-semibold'), 'font-semibold missing on mobile nav links');
  });

  test('mobile links have tight leading for display scale', () => {
    assert.ok(src.includes('leading-[1.1]'), 'leading-[1.1] missing on mobile nav links');
  });
});

describe('DGS-A2-01 — Interaction', () => {
  test('nav links close menu on click via onClick={()=>setOpen(false)}', () => {
    assert.ok(
      src.includes('onClick={() => setOpen(false)}'),
      'nav links must close menu on click',
    );
  });

  test('resize listener closes menu at md breakpoint (768px)', () => {
    assert.ok(src.includes('768') && src.includes('setOpen(false)'), 'resize-to-desktop close missing');
  });

  test('hamburger cross animation uses rotate-45', () => {
    assert.ok(src.includes('rotate-45'), 'rotate-45 missing — cross animation broken');
  });

  test('middle hamburger line fades on open (opacity-0)', () => {
    assert.ok(src.includes('opacity-0'), 'middle bar fade-out missing');
  });

  test('hamburger button touch target is 44×44 (w-11 h-11)', () => {
    assert.ok(src.includes('w-11 h-11'), 'hamburger touch target must be w-11 h-11 (44px × 44px)');
  });
});

describe('DGS-A2-01 — CTA in overlay', () => {
  test('CTA button present in mobile overlay with /contact href', () => {
    const overlaySection = src.slice(src.indexOf('mobile-nav-overlay'));
    assert.ok(overlaySection.includes('href="/contact"'), 'CTA /contact href missing from overlay');
  });

  test('CTA closes overlay on click', () => {
    assert.ok(
      src.includes("onClick={() => setOpen(false)}"),
      'CTA must close overlay on click',
    );
  });

  test('CTA uses primary variant', () => {
    assert.ok(src.includes('variant="primary"'), 'CTA must use primary variant');
  });

  test('CTA is full width (w-full)', () => {
    assert.ok(src.includes('w-full'), 'CTA must be full-width in mobile overlay');
  });
});

describe('DGS-A2-01 — No raw CSS', () => {
  test('no CSS modules imported', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });

  test('no style="" inline attributes', () => {
    // body.style.overflow is JS, not an HTML attribute — regex looks for style=" in JSX
    const hasInlineStyle = /style="/.test(src);
    assert.ok(!hasInlineStyle, 'inline style attribute found — use Tailwind');
  });
});
