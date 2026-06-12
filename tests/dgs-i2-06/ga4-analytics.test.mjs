/**
 * DGS-I2-06: Analytics integration (migrated to Umami)
 * AC: Self-hosted Umami script loaded via env var. Conversion events:
 *     Contact form submit, Newsletter subscribe.
 *     Cookie-free by default — no consent mode required.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');

const layout        = readFileSync(join(ROOT, 'app/layout.tsx'), 'utf8');
const umami         = readFileSync(join(ROOT, 'lib/umami.ts'), 'utf8');
const contact       = readFileSync(join(ROOT, 'app/contact/page.tsx'), 'utf8');
const insightsClient = readFileSync(join(ROOT, 'app/insights/InsightsClient.tsx'), 'utf8');

describe('DGS-I2-06 — Umami script setup', () => {
  test('lib/umami.ts exports trackEvent function', () => {
    assert.ok(umami.includes('export function trackEvent'), 'trackEvent not exported from lib/umami.ts');
  });

  test('trackEvent guards against server-side calls', () => {
    assert.ok(
      umami.includes("typeof window === 'undefined'") || umami.includes("typeof window !== 'undefined'"),
      'trackEvent must guard against server-side (window undefined) calls',
    );
  });

  test('umami.ts declares window.umami type', () => {
    assert.ok(umami.includes('window'), 'lib/umami.ts must reference window for the Umami SDK');
  });

  test('layout loads Umami script from env var', () => {
    assert.ok(
      layout.includes('NEXT_PUBLIC_UMAMI_SCRIPT_URL'),
      'layout.tsx must load Umami script from NEXT_PUBLIC_UMAMI_SCRIPT_URL env var',
    );
  });

  test('layout sets data-website-id from env var', () => {
    assert.ok(
      layout.includes('NEXT_PUBLIC_UMAMI_WEBSITE_ID'),
      'layout.tsx must set data-website-id from NEXT_PUBLIC_UMAMI_WEBSITE_ID env var',
    );
  });

  test('Umami script uses afterInteractive strategy', () => {
    assert.ok(
      layout.includes("strategy=\"afterInteractive\"") || layout.includes("strategy='afterInteractive'"),
      "Umami script must use strategy='afterInteractive' to avoid blocking render",
    );
  });

  test('No GA4 gtag.js script in layout', () => {
    assert.ok(
      !layout.includes('googletagmanager.com/gtag/js'),
      'GA4 gtag.js script must not be present — replaced by Umami',
    );
  });

  test('No gtag consent mode in layout', () => {
    assert.ok(
      !layout.includes("gtag('consent'") && !layout.includes('gtag("consent"'),
      'GA4 consent mode must not be present — Umami is cookie-free by default',
    );
  });
});

describe('DGS-I2-06 — Conversion event tracking', () => {
  test('contact form submit fires contact_form_submit event', () => {
    assert.ok(
      contact.includes("trackEvent('contact_form_submit')") || contact.includes('trackEvent("contact_form_submit")'),
      "contact page must call trackEvent('contact_form_submit') on form submission",
    );
  });

  test('newsletter subscribe form fires newsletter_subscribe event', () => {
    assert.ok(
      insightsClient.includes("trackEvent('newsletter_subscribe')") || insightsClient.includes('trackEvent("newsletter_subscribe")'),
      "InsightsClient must call trackEvent('newsletter_subscribe') on subscribe form submission",
    );
  });

  test('contact page imports trackEvent from umami', () => {
    assert.ok(
      contact.includes("from '@/lib/umami'") || contact.includes('from "@/lib/umami"'),
      'contact page must import trackEvent from lib/umami (not lib/gtag)',
    );
  });

  test('insights client imports trackEvent from umami', () => {
    assert.ok(
      insightsClient.includes("from '@/lib/umami'") || insightsClient.includes('from "@/lib/umami"'),
      'InsightsClient must import trackEvent from lib/umami (not lib/gtag)',
    );
  });

  test('lib/gtag.ts is deleted', () => {
    let exists = true;
    try {
      readFileSync(join(ROOT, 'lib/gtag.ts'), 'utf8');
    } catch {
      exists = false;
    }
    assert.ok(!exists, 'lib/gtag.ts must be deleted — replaced by lib/umami.ts');
  });
});
