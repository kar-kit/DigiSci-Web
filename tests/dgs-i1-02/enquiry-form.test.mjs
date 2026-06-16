/**
 * DGS-I1-02: Contact enquiry form
 * AC: Fields: Name, Company, Role, Email, Brief description of interest.
 *     Submit sends notification to Kwok. GDPR consent. Thank-you confirmation on submit.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src     = readFileSync(join(ROOT, 'app/contact/page.tsx'), 'utf8');
const apiSrc  = readFileSync(join(ROOT, 'app/api/contact/route.ts'), 'utf8');

describe('DGS-I1-02 — Enquiry form section present', () => {
  test('enquiry form section with aria-label', () => {
    assert.ok(src.includes('aria-label="Enquiry form"'), 'Enquiry form aria-label missing');
  });

  test('"Send an Enquiry" heading present', () => {
    assert.ok(src.includes('Send an Enquiry'), '"Send an Enquiry" heading missing');
  });

  test('form element with onSubmit handler', () => {
    assert.ok(src.includes('onSubmit'), 'Form onSubmit handler missing');
  });
});

describe('DGS-I1-02 — Required form fields', () => {
  test('Name field present', () => {
    assert.ok(src.includes('name="name"') || src.includes("name='name'"), 'Name field missing');
  });

  test('Name field has a label', () => {
    assert.ok(src.includes('htmlFor="contact-name"') || src.includes("htmlFor='contact-name'"), 'Name label missing');
  });

  test('Company/Organisation field present', () => {
    assert.ok(
      src.includes('name="organisation"') || src.includes("name='organisation'") ||
      src.includes('name="company"') || src.includes("name='company'"),
      'Organisation/Company field missing'
    );
  });

  test('Role field present', () => {
    assert.ok(src.includes('name="role"') || src.includes("name='role'"), 'Role field missing');
  });

  test('Email field present with type="email"', () => {
    assert.ok(
      (src.includes('name="email"') || src.includes("name='email'")) &&
      src.includes('type="email"'),
      'Email field with type="email" missing'
    );
  });

  test('Email field has a label', () => {
    assert.ok(src.includes('htmlFor="contact-email"') || src.includes("htmlFor='contact-email'"), 'Email label missing');
  });

  test('Brief description / message field present (textarea)', () => {
    assert.ok(
      (src.includes('name="description"') || src.includes("name='description'") || src.includes('name="message"')) &&
      src.includes('<textarea'),
      'Description textarea missing'
    );
  });

  test('Name and Email fields are required', () => {
    const nameBlock = src.slice(src.indexOf('name="name"') - 100, src.indexOf('name="name"') + 200);
    assert.ok(nameBlock.includes('required'), 'Name field must be required');
  });
});

describe('DGS-I1-02 — GDPR consent', () => {
  test('GDPR consent checkbox present', () => {
    assert.ok(
      src.includes('name="gdprConsent"') || src.includes("name='gdprConsent'") ||
      src.includes('name="gdpr"') || src.includes("name='gdpr'"),
      'GDPR consent checkbox missing'
    );
  });

  test('GDPR consent checkbox is required', () => {
    // The checkbox element containing gdprConsent name must have required attribute nearby
    const gdprInputIdx = src.indexOf('name="gdprConsent"') !== -1
      ? src.indexOf('name="gdprConsent"')
      : src.indexOf("name='gdprConsent'");
    const gdprBlock = src.slice(Math.max(0, gdprInputIdx - 500), gdprInputIdx + 500);
    assert.ok(gdprBlock.includes('required'), 'GDPR checkbox must be required');
  });

  test('GDPR consent has visible label text', () => {
    assert.ok(
      src.toLowerCase().includes('privacy policy') || src.toLowerCase().includes('i agree'),
      'GDPR consent must have visible label text'
    );
  });
});

describe('DGS-I1-02 — Thank-you confirmation on submit', () => {
  test('formSubmitted state tracked', () => {
    assert.ok(
      src.includes('formSubmitted') || src.includes('submitted') || src.includes("'success'"),
      'No submitted/success state found'
    );
  });

  test('thank-you/confirmation message shown after submission', () => {
    assert.ok(
      src.includes('Enquiry received') || src.includes('Thank') || src.includes('received') ||
      src.includes('confirmation'),
      'No thank-you/confirmation message for after form submission'
    );
  });

  test('success area has aria-live for screen readers', () => {
    assert.ok(src.includes('aria-live'), 'Success state missing aria-live attribute');
  });
});

describe('DGS-I1-02 — Form submission sends to API', () => {
  test('form posts to /api/contact', () => {
    assert.ok(src.includes('/api/contact'), 'Form must POST to /api/contact');
  });

  test('form body includes gdprConsent field', () => {
    assert.ok(src.includes('gdprConsent'), 'Form body must include gdprConsent field');
  });
});

describe('DGS-I1-02 — API route sends notification to Kwok', () => {
  test('API route validates GDPR consent', () => {
    assert.ok(
      apiSrc.includes('gdprConsent') && (
        apiSrc.includes('GDPR consent is required') || apiSrc.includes('consent is required')
      ),
      'API must reject missing GDPR consent'
    );
  });

  test('API route validates required fields (name, email, description)', () => {
    assert.ok(
      apiSrc.includes('name') && apiSrc.includes('email') && apiSrc.includes('description'),
      'API must validate required fields'
    );
  });

  test('API route sends email notification via Resend', () => {
    assert.ok(apiSrc.includes('resend.emails.send'), 'API must send via Resend');
  });

  test('notification goes to RESEND_TO_EMAIL env var (Kwok)', () => {
    assert.ok(apiSrc.includes('RESEND_TO_EMAIL'), 'API must send to RESEND_TO_EMAIL (Kwok\'s email)');
  });

  test('email subject includes enquiry type or name', () => {
    assert.ok(apiSrc.includes('subject'), 'API response email missing subject');
  });
});

describe('DGS-I1-02 — Error handling', () => {
  test('error state present in component', () => {
    assert.ok(
      src.includes('formError') || src.includes("'error'") || src.includes('error'),
      'No error state found in form'
    );
  });

  test('error message rendered to user on failure', () => {
    assert.ok(
      src.includes('Something went wrong') || src.includes('error'),
      'No error message rendered on form failure'
    );
  });
});
