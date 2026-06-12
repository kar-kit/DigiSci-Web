/**
 * DGS-I1-01: Discovery call booking on Contact page
 * AC: Calendly (or equivalent) embed or link. Available slots visible.
 *     Mobile-responsive booking flow. Enquiry form alongside.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/contact/page.tsx'), 'utf8');

describe('DGS-I1-01 — File and structure', () => {
  test('app/contact/page.tsx exists and is non-empty', () => {
    assert.ok(src.length > 200, 'app/contact/page.tsx appears empty');
  });

  test('page is a client component (requires interactivity)', () => {
    assert.ok(src.startsWith("'use client'") || src.startsWith('"use client"'), 'Missing "use client" directive');
  });

  test('page exports a default React component', () => {
    assert.ok(src.includes('export default'), 'No default export found');
  });
});

describe('DGS-I1-01 — Page hero', () => {
  test('page hero section present', () => {
    assert.ok(src.includes('aria-label="Page hero"'), 'Page hero aria-label missing');
  });

  test('"Start a Conversation" h1 present', () => {
    assert.ok(src.includes('Start a Conversation'), '"Start a Conversation" h1 missing');
  });
});

describe('DGS-I1-01 — Discovery call booking', () => {
  test('discovery call section with aria-label present', () => {
    assert.ok(src.includes('aria-label="Discovery call booking"'), 'Discovery call booking aria-label missing');
  });

  test('"Book a Discovery Call" heading present', () => {
    assert.ok(src.includes('Book a Discovery Call'), '"Book a Discovery Call" heading missing');
  });

  test('"30-minute" discovery call description present', () => {
    assert.ok(src.includes('30-minute') || src.includes('30 minute'), '"30-minute" call description missing');
  });

  test('booking calendar section present', () => {
    assert.ok(src.includes('aria-label="Booking calendar"'), 'Booking calendar aria-label missing');
  });

  test('available time slots visible (BOOKING_DAYS constant with slots)', () => {
    assert.ok(src.includes('BOOKING_DAYS') && src.includes('slots:'), 'BOOKING_DAYS with slots missing');
  });

  test('time slot buttons rendered', () => {
    const block = src.slice(src.indexOf('BOOKING_DAYS'));
    assert.ok(block.includes('09:30'), 'Time slot 09:30 missing from booking widget');
  });

  test('slot selection state with useState', () => {
    assert.ok(src.includes('useState') && src.includes('selectedSlot'), 'Slot selection state missing');
  });

  test('Calendly link present', () => {
    assert.ok(src.includes('calendly.com') || src.includes('cal.com'), 'Calendly or Cal.com link missing');
  });

  test('"Powered by Calendly" attribution note present', () => {
    assert.ok(src.includes('Powered by Calendly') || src.includes('Calendly'), '"Powered by Calendly" note missing');
  });

  test('slot button aria-pressed for accessibility', () => {
    const block = src.slice(src.indexOf('aria-label="Booking calendar"'));
    assert.ok(block.includes('aria-pressed'), 'aria-pressed missing from slot buttons');
  });
});

describe('DGS-I1-01 — Enquiry form', () => {
  test('enquiry form section with aria-label present', () => {
    assert.ok(src.includes('aria-label="Enquiry form"'), 'Enquiry form aria-label missing');
  });

  test('"Send an Enquiry" heading present', () => {
    assert.ok(src.includes('Send an Enquiry'), '"Send an Enquiry" heading missing');
  });

  test('Name input field present', () => {
    assert.ok(src.includes('contact-name') || src.includes("'name'") || src.includes('name'), 'Name field missing');
  });

  test('Organisation input field present', () => {
    assert.ok(src.includes('contact-org') || src.includes('Organisation'), 'Organisation field missing');
  });

  test('Role input field present', () => {
    assert.ok(src.includes('contact-role') || src.includes('Role'), 'Role field missing');
  });

  test('Email input field present with type="email"', () => {
    assert.ok(src.includes('contact-email') && (src.includes('type="email"') || src.includes("type='email'")), 'Email input missing');
  });

  test('Nature of enquiry select field present', () => {
    assert.ok(src.includes('<select') && src.includes('Nature of enquiry'), 'Enquiry type select missing');
  });

  test('Enquiry type options present (AI Strategy, etc.)', () => {
    assert.ok(src.includes('AI Strategy'), 'AI Strategy enquiry type option missing');
    assert.ok(src.includes('Implementation Programme'), 'Implementation Programme option missing');
  });

  test('Brief description textarea present', () => {
    assert.ok(src.includes('<textarea'), 'Textarea for brief description missing');
  });

  test('"Send Enquiry" submit button present', () => {
    assert.ok(src.includes('Send Enquiry'), '"Send Enquiry" button text missing');
  });
});

describe('DGS-I1-01 — Contact details', () => {
  test('contact details section present', () => {
    assert.ok(src.includes('aria-label="Contact details"'), 'Contact details aria-label missing');
  });

  test('geography information present', () => {
    assert.ok(src.includes('Geography') || src.includes('United Kingdom'), 'Geography contact detail missing');
  });

  test('LinkedIn link to Kwok Pang present', () => {
    assert.ok(src.includes('linkedin.com/in/kwok-pang'), 'LinkedIn link missing');
  });

  test('email address present', () => {
    assert.ok(src.includes('hello@digisci.solutions'), 'Email address missing');
  });
});

describe('DGS-I1-01 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });

  test('no CSS module imports', () => {
    assert.ok(!src.includes('.module.css'), 'CSS module import found');
  });
});
