/**
 * DGS-I1-03: Contact page expectation setting
 * AC: Copy states expected response time (within 1 business day).
 *     Brief note on how discovery calls are structured.
 *     Tone: authoritative but approachable.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..', '..');
const src   = readFileSync(join(ROOT, 'app/contact/page.tsx'), 'utf8');

describe('DGS-I1-03 — Response time copy', () => {
  test('response time stated as one business day', () => {
    assert.ok(
      src.includes('one business day') || src.includes('1 business day'),
      'Response time "one business day" missing from contact page'
    );
  });

  test('response time copy present outside the post-submit confirmation (always visible)', () => {
    // The copy must appear before the formSubmitted conditional, not only inside it
    const formSubmittedIdx = src.indexOf('formSubmitted ?');
    const responseTimeIdx  = src.indexOf('one business day');
    assert.ok(responseTimeIdx !== -1, 'Response time copy not found');
    // It should appear in the source at least once before the post-submit block
    // (it can also appear inside it — but must exist outside)
    const beforeBlock = src.slice(0, formSubmittedIdx);
    assert.ok(
      beforeBlock.includes('one business day') || beforeBlock.includes('1 business day'),
      'Response time copy must be visible before form submission, not only in success state'
    );
  });

  test('review every enquiry personally mentioned', () => {
    assert.ok(
      src.includes('review every enquiry personally') || src.toLowerCase().includes('review personally'),
      '"review every enquiry personally" missing'
    );
  });
});

describe('DGS-I1-03 — Discovery call structure', () => {
  test('discovery call section has a structured list', () => {
    assert.ok(src.includes('<ul') && src.includes('Discovery call structure'), 'Discovery call structured list missing');
  });

  test('discovery call explains what happens (context/challenge)', () => {
    const discoverySectionIdx = src.indexOf('Discovery call booking');
    const block = src.slice(discoverySectionIdx);
    assert.ok(
      block.includes('challenge') || block.includes('situation') || block.includes('context'),
      'Discovery call structure must describe what is shared/discussed'
    );
  });

  test('discovery call mentions fit assessment', () => {
    const discoverySectionIdx = src.indexOf('Discovery call booking');
    const block = src.slice(discoverySectionIdx);
    assert.ok(
      block.includes('fit') || block.includes('expertise'),
      'Discovery call structure should mention assessing fit/expertise'
    );
  });

  test('discovery call mentions next steps', () => {
    const discoverySectionIdx = src.indexOf('Discovery call booking');
    const block = src.slice(discoverySectionIdx);
    assert.ok(
      block.includes('next steps') || block.includes('next step'),
      'Discovery call structure should mention next steps'
    );
  });

  test('no obligation copy present in discovery section', () => {
    const discoverySectionIdx = src.indexOf('Discovery call booking');
    const block = src.slice(discoverySectionIdx);
    assert.ok(
      block.includes('no obligation') || block.includes('No obligation'),
      '"No obligation" copy missing from discovery section'
    );
  });
});

describe('DGS-I1-03 — No raw CSS', () => {
  test('no hardcoded hex colours', () => {
    const hexCount = (src.match(/#[0-9A-Fa-f]{3,6}\b/g) || []).length;
    assert.equal(hexCount, 0, `${hexCount} hardcoded hex colours found`);
  });
});
