/**
 * DGS-H1-02: Newsletter subscription form on Insights
 * AC: Email input + Subscribe button. GDPR-compliant consent checkbox.
 *     Success state after submission. Integrates with email platform.
 *     Appears in Insights index and individual article footer.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');

const formSrc      = readFileSync(join(ROOT, 'components/ui/NewsletterForm.tsx'), 'utf8');
const apiSrc       = readFileSync(join(ROOT, 'app/api/subscribe/route.ts'), 'utf8');
const indexSrc     = readFileSync(join(ROOT, 'app/insights/InsightsClient.tsx'), 'utf8');
const articleSrc   = readFileSync(join(ROOT, 'app/insights/[slug]/page.tsx'), 'utf8');

describe('DGS-H1-02 — NewsletterForm component exists', () => {
  test('NewsletterForm.tsx exists and is non-empty', () => {
    assert.ok(formSrc.length > 100, 'NewsletterForm.tsx appears empty');
  });

  test('is a client component', () => {
    assert.ok(formSrc.startsWith("'use client'"), "NewsletterForm must start with 'use client'");
  });

  test('exports NewsletterForm function', () => {
    assert.ok(formSrc.includes('export function NewsletterForm'), 'NewsletterForm not exported');
  });
});

describe('DGS-H1-02 — Email input', () => {
  test('email input with type="email" present', () => {
    assert.ok(formSrc.includes('type="email"'), 'email input type missing');
  });

  test('email input is required', () => {
    assert.ok(formSrc.includes('required'), 'required attribute missing from email input');
  });

  test('email input has a label (visible or sr-only)', () => {
    assert.ok(
      formSrc.includes('sr-only') || formSrc.includes('<label'),
      'No label for email input'
    );
  });

  test('subscribe button present', () => {
    assert.ok(
      formSrc.includes('Subscribe for Insights') || formSrc.includes('Subscribe'),
      'Subscribe button text missing'
    );
  });
});

describe('DGS-H1-02 — GDPR consent checkbox', () => {
  test('GDPR checkbox input present', () => {
    assert.ok(formSrc.includes('type="checkbox"'), 'GDPR consent checkbox missing');
  });

  test('consent checkbox has aria-label or is labelled', () => {
    assert.ok(
      formSrc.includes('aria-label') || formSrc.includes('<label'),
      'GDPR consent checkbox has no label'
    );
  });

  test('consent copy mentions unsubscribe', () => {
    assert.ok(
      formSrc.toLowerCase().includes('unsubscribe'),
      'Consent copy should mention ability to unsubscribe'
    );
  });

  test('checkbox is required', () => {
    const checkboxBlock = formSrc.slice(formSrc.indexOf('type="checkbox"') - 200, formSrc.indexOf('type="checkbox"') + 100);
    assert.ok(checkboxBlock.includes('required'), 'GDPR checkbox must be required');
  });
});

describe('DGS-H1-02 — Success state', () => {
  test('success status tracked in component state', () => {
    assert.ok(formSrc.includes("'success'"), "success state missing");
  });

  test('success message rendered when subscribed', () => {
    assert.ok(
      formSrc.includes("status === 'success'"),
      "No success conditional render found"
    );
  });

  test('success element has role="status" or aria-live', () => {
    assert.ok(
      formSrc.includes('role="status"') || formSrc.includes('aria-live'),
      'Success message must have accessible role="status" or aria-live'
    );
  });

  test('success message accessible label present', () => {
    assert.ok(
      formSrc.includes('aria-label="Subscription confirmed"') || formSrc.includes('subscribed'),
      'Success state should confirm subscription'
    );
  });
});

describe('DGS-H1-02 — Error state', () => {
  test('error status in component state', () => {
    assert.ok(formSrc.includes("'error'"), "error state missing");
  });

  test('error element has role="alert"', () => {
    assert.ok(formSrc.includes('role="alert"'), 'Error message must have role="alert"');
  });
});

describe('DGS-H1-02 — API route integrates with email platform', () => {
  test('/api/subscribe route exists', () => {
    assert.ok(apiSrc.length > 50, 'subscribe route appears empty');
  });

  test('route validates GDPR consent', () => {
    assert.ok(
      apiSrc.includes('gdprConsent') && apiSrc.includes('GDPR consent is required'),
      'Route must reject requests without GDPR consent'
    );
  });

  test('route validates email address', () => {
    assert.ok(
      apiSrc.includes("includes('@')") || apiSrc.includes("'@'"),
      'Route must validate email format'
    );
  });

  test('route sends confirmation email via Resend', () => {
    assert.ok(apiSrc.includes('resend.emails.send'), 'Route must send via Resend');
  });

  test('route supports audience list (RESEND_AUDIENCE_ID)', () => {
    assert.ok(
      apiSrc.includes('RESEND_AUDIENCE_ID'),
      'Route should support optional audience list'
    );
  });

  test('confirmation email mentions unsubscribe', () => {
    assert.ok(
      apiSrc.toLowerCase().includes('unsubscribe'),
      'Confirmation email must mention ability to unsubscribe'
    );
  });
});

describe('DGS-H1-02 — Appears on Insights index', () => {
  test('InsightsClient imports NewsletterForm', () => {
    assert.ok(
      indexSrc.includes('NewsletterForm'),
      'InsightsClient must use NewsletterForm component'
    );
  });

  test('Subscribe section present on Insights index', () => {
    assert.ok(
      indexSrc.includes('aria-label="Subscribe"'),
      'Subscribe section missing from Insights index'
    );
  });

  test('InsightsClient no longer uses action="#" static form', () => {
    assert.ok(
      !indexSrc.includes('action="#"'),
      'InsightsClient still has a static action="#" form — should use NewsletterForm'
    );
  });
});

describe('DGS-H1-02 — Appears on individual article footer', () => {
  test('article page imports NewsletterForm', () => {
    assert.ok(
      articleSrc.includes('NewsletterForm'),
      'Article page must use NewsletterForm component'
    );
  });

  test('article page has Subscribe section', () => {
    assert.ok(
      articleSrc.includes('aria-label="Subscribe"'),
      'Subscribe section missing from article page'
    );
  });

  test('article page no longer uses action="#" static form', () => {
    assert.ok(
      !articleSrc.includes('action="#"'),
      'Article page still has a static action="#" form — should use NewsletterForm'
    );
  });
});

describe('DGS-H1-02 — Submission calls /api/subscribe', () => {
  test('NewsletterForm POSTs to /api/subscribe', () => {
    assert.ok(
      formSrc.includes('/api/subscribe'),
      'NewsletterForm must POST to /api/subscribe'
    );
  });

  test('request body includes gdprConsent field', () => {
    assert.ok(
      formSrc.includes('gdprConsent'),
      'POST body must include gdprConsent field'
    );
  });
});
