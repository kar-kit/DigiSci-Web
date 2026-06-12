/**
 * DGS-I2-06: GA4 Analytics integration
 * AC: GA4 property connected. Pageviews tracked. Conversion events:
 *     Discovery Call booking click, Contact form submit, Newsletter subscribe.
 *     GDPR-compliant (consent mode active before GA4 initialisation).
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');

const layout   = readFileSync(join(ROOT, 'app/layout.tsx'), 'utf8');
const gtag     = readFileSync(join(ROOT, 'lib/gtag.ts'), 'utf8');
const contact  = readFileSync(join(ROOT, 'app/contact/page.tsx'), 'utf8');
const insights = readFileSync(join(ROOT, 'app/insights/page.tsx'), 'utf8');

describe('DGS-I2-06 — GA4 script setup', () => {
  test('lib/gtag.ts exports GA_ID from NEXT_PUBLIC_GA4_ID env var', () => {
    assert.ok(
      gtag.includes('NEXT_PUBLIC_GA4_ID'),
      'GA_ID must read from NEXT_PUBLIC_GA4_ID environment variable',
    );
  });

  test('lib/gtag.ts exports trackEvent function', () => {
    assert.ok(gtag.includes('export function trackEvent'), 'trackEvent not exported from lib/gtag.ts');
  });

  test('gtag helper guards against server-side calls', () => {
    assert.ok(
      gtag.includes("typeof window === 'undefined'") || gtag.includes('typeof window !== '),
      'trackEvent must guard against server-side (window undefined) calls',
    );
  });

  test('GA measurement ID not hardcoded in layout', () => {
    const hasHardcoded = /gtag\.js\?id=G-[A-Z0-9]+['"]/i.test(layout);
    assert.ok(!hasHardcoded, 'GA4 measurement ID must not be hardcoded — use NEXT_PUBLIC_GA4_ID env var');
  });

  test('layout imports and uses GA_ID', () => {
    assert.ok(
      layout.includes("from '@/lib/gtag'") || layout.includes('from "@/lib/gtag"'),
      'layout.tsx must import GA_ID from lib/gtag',
    );
    assert.ok(layout.includes('GA_ID'), 'layout.tsx must use GA_ID variable');
  });

  test('GA4 gtag.js script in layout', () => {
    assert.ok(
      layout.includes('googletagmanager.com/gtag/js'),
      'GA4 gtag.js script not found in layout',
    );
  });

  test('gtag config call in layout for pageview tracking', () => {
    assert.ok(
      layout.includes("gtag('config'") || layout.includes('gtag("config"'),
      "gtag('config', ...) call missing — required for automatic pageview tracking",
    );
  });
});

describe('DGS-I2-06 — GDPR consent mode', () => {
  test('consent default call present in layout', () => {
    assert.ok(
      layout.includes("gtag('consent', 'default'") || layout.includes('gtag("consent", "default"'),
      "gtag('consent', 'default', ...) call missing — required for GDPR consent mode",
    );
  });

  test('analytics_storage defaulted to denied', () => {
    assert.ok(
      layout.includes("analytics_storage: 'denied'") || layout.includes('analytics_storage: "denied"'),
      "analytics_storage must default to 'denied' for GDPR compliance",
    );
  });

  test('consent script uses beforeInteractive strategy (runs before GA4 loads)', () => {
    const consentBlock = layout.slice(layout.indexOf('ga-consent'));
    assert.ok(
      consentBlock.includes('beforeInteractive'),
      "Consent script must use strategy='beforeInteractive' to run before GA4 initialises",
    );
  });

  test('GA4 config script uses afterInteractive strategy (non-blocking)', () => {
    const configBlock = layout.slice(layout.lastIndexOf('ga-config'));
    assert.ok(
      configBlock.includes('afterInteractive'),
      "GA4 config script must use strategy='afterInteractive' to avoid blocking render",
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

  test('discovery call Calendly click fires discovery_call_click event', () => {
    assert.ok(
      contact.includes("trackEvent('discovery_call_click'") || contact.includes('trackEvent("discovery_call_click"'),
      "contact page must call trackEvent('discovery_call_click') on Calendly link click",
    );
  });

  test('newsletter subscribe form fires newsletter_subscribe event', () => {
    assert.ok(
      insights.includes("trackEvent('newsletter_subscribe')") || insights.includes('trackEvent("newsletter_subscribe")'),
      "insights page must call trackEvent('newsletter_subscribe') on subscribe form submission",
    );
  });

  test('contact page imports trackEvent', () => {
    assert.ok(
      contact.includes("from '@/lib/gtag'") || contact.includes('from "@/lib/gtag"'),
      'contact page must import trackEvent from lib/gtag',
    );
  });

  test('insights page imports trackEvent', () => {
    assert.ok(
      insights.includes("from '@/lib/gtag'") || insights.includes('from "@/lib/gtag"'),
      'insights page must import trackEvent from lib/gtag',
    );
  });
});
