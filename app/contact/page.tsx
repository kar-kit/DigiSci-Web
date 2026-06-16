'use client';

import { useState } from 'react';
import { Calendar, Globe, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { trackEvent } from '@/lib/umami';

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const BOOKING_DAYS = [
  { label: 'Mon 16', slots: ['09:30', '11:00', '14:00', '15:30'] },
  { label: 'Tue 17', slots: ['09:30', '11:00', '14:00', '15:30'] },
  { label: 'Wed 18', slots: ['09:30', '11:00', '14:00', '15:30'] },
  { label: 'Thu 19', slots: ['09:30', '11:00', '14:00', '15:30'] },
  { label: 'Fri 20', slots: ['09:30', '11:00', '14:00', '15:30'] },
] as const;

const ENQUIRY_TYPES = [
  'AI Strategy',
  'Implementation Programme',
  'Digital Operations',
  'Operational Excellence',
  'Productised Offer',
  'Other',
] as const;

export default function ContactPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleSlotClick(dayLabel: string, slot: string) {
    const key = `${dayLabel} ${slot}`;
    setSelectedSlot((prev) => (prev === key ? null : key));
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fd.get('name'),
        organisation: fd.get('organisation'),
        role: fd.get('role'),
        email: fd.get('email'),
        enquiryType: fd.get('enquiryType'),
        description: fd.get('description'),
        gdprConsent: fd.get('gdprConsent') === 'on',
      }),
    });
    if (res.ok) {
      trackEvent('contact_form_submit');
      setFormSubmitted(true);
    } else {
      setFormError('Something went wrong — please email us directly.');
    }
  }

  return (
    <main>

      {/* Page hero */}
      <section
        aria-label="Page hero"
        style={{ backgroundImage: 'var(--grid-bg)', backgroundSize: 'var(--grid-bg-size)' }}
        className="relative border-b border-[var(--border-subtle)] overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-200px] right-[-140px] w-[560px] h-[560px] bg-[radial-gradient(circle,var(--blue-glow),transparent_62%)]"
        />
        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-20 pb-16">
          <Eyebrow rule>Contact</Eyebrow>
          <h1 className="font-sans font-semibold text-[clamp(2.25rem,3.5vw,4rem)] leading-[1.08] tracking-[-0.02em] mt-5 mb-5 max-w-[22ch]">
            Start a Conversation
          </h1>
          <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] max-w-[52em]">
            Whether you have a defined project in mind or an operational challenge you're working through, we're happy to have an initial conversation to explore whether DigiSci can help. We review every enquiry personally.
          </p>
        </div>
      </section>

      {/* Main contact section */}
      <section aria-label="Contact" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

            {/* Discovery call booking */}
            <div aria-label="Discovery call booking">
              <Eyebrow rule index="01">Discovery call</Eyebrow>
              <h2 className="font-sans font-semibold text-[1.75rem] leading-[1.2] tracking-[-0.02em] mt-4 mb-4">
                Book a Discovery Call
              </h2>
              <p className="font-serif text-[1.0625rem] leading-[1.7] text-[var(--text-secondary)] mb-4">
                A 30-minute discovery call is the most efficient starting point. No obligation, no sales pitch — just an honest conversation.
              </p>
              <ul aria-label="Discovery call structure" className="mb-8 flex flex-col gap-2 pl-0 list-none">
                <li className="flex items-start gap-3 font-serif text-[0.9375rem] leading-[1.65] text-[var(--text-secondary)]">
                  <span className="mt-[0.45em] w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" aria-hidden="true" />
                  You share the operational challenge and context
                </li>
                <li className="flex items-start gap-3 font-serif text-[0.9375rem] leading-[1.65] text-[var(--text-secondary)]">
                  <span className="mt-[0.45em] w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" aria-hidden="true" />
                  We assess whether our expertise is the right fit
                </li>
                <li className="flex items-start gap-3 font-serif text-[0.9375rem] leading-[1.65] text-[var(--text-secondary)]">
                  <span className="mt-[0.45em] w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" aria-hidden="true" />
                  If there is a fit, we agree on next steps together
                </li>
              </ul>

              {/* Calendar widget */}
              <div
                aria-label="Booking calendar"
                className="border border-[var(--border-default)] bg-[var(--surface-raised)] p-6"
              >
                <div className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mb-5">
                  <Calendar size={14} aria-hidden="true" />
                  <span>June 2026 · 30-minute call</span>
                </div>

                {/* Day headers */}
                <div
                  className="grid gap-2 mb-2"
                  style={{ gridTemplateColumns: `repeat(${BOOKING_DAYS.length}, 1fr)` }}
                >
                  {BOOKING_DAYS.map(({ label }) => (
                    <div
                      key={label}
                      className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-[var(--text-tertiary)] text-center pb-1 border-b border-[var(--border-subtle)]"
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {/* Slot grid */}
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${BOOKING_DAYS.length}, 1fr)` }}
                >
                  {BOOKING_DAYS.map(({ label, slots }) => (
                    <div key={label} className="flex flex-col gap-1.5">
                      {slots.map((slot) => {
                        const key = `${label} ${slot}`;
                        const isSelected = selectedSlot === key;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => handleSlotClick(label, slot)}
                            aria-pressed={isSelected}
                            aria-label={`Select ${label} at ${slot}`}
                            className={[
                              'w-full font-mono text-[0.6875rem] py-2 border transition-colors duration-[120ms]',
                              isSelected
                                ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--navy-950)]'
                                : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
                            ].join(' ')}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href="https://calendly.com/digisci"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('discovery_call_click', { selected_slot: selectedSlot ?? 'none' })}
                    aria-disabled={!selectedSlot}
                    className={[
                      'inline-flex items-center gap-2 px-5 py-2.5 font-sans text-sm font-medium border transition-colors duration-[120ms]',
                      selectedSlot
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--navy-950)] hover:opacity-90'
                        : 'border-[var(--border-default)] text-[var(--text-tertiary)] pointer-events-none opacity-50',
                    ].join(' ')}
                    tabIndex={selectedSlot ? 0 : -1}
                  >
                    {selectedSlot ? `Book ${selectedSlot}` : 'Select a time'}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[var(--text-tertiary)]">
                    Powered by Calendly / Cal.com
                  </span>
                </div>
              </div>
            </div>

            {/* Enquiry form */}
            <div aria-label="Enquiry form">
              <Eyebrow rule index="02">Enquiry form</Eyebrow>
              <h2 className="font-sans font-semibold text-[1.75rem] leading-[1.2] tracking-[-0.02em] mt-4 mb-4">
                Send an Enquiry
              </h2>
              <p className="font-serif text-[1.0625rem] leading-[1.7] text-[var(--text-secondary)] mb-8">
                Tell us about your situation and what you&apos;re trying to solve. We review every enquiry personally and typically respond within one business day.
              </p>

              {formSubmitted ? (
                <div
                  aria-live="polite"
                  className="mt-8 p-6 border border-[var(--border-default)] bg-[var(--surface-raised)]"
                >
                  <p className="font-sans font-semibold text-[1.125rem] text-[var(--text-primary)] mb-2">
                    Enquiry received
                  </p>
                  <p className="font-serif text-sm leading-[1.65] text-[var(--text-secondary)]">
                    We review every enquiry personally and will be in touch within one business day. If your matter is urgent, reach out directly on LinkedIn.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="mt-8 flex flex-col gap-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                        Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Dr. Jordan Avila"
                        required
                        className="bg-[var(--surface-base)] border border-[var(--border-default)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-[120ms]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-org" className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                        Organisation
                      </label>
                      <input
                        id="contact-org"
                        name="organisation"
                        type="text"
                        placeholder="Helix Biotherapeutics"
                        className="bg-[var(--surface-base)] border border-[var(--border-default)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-[120ms]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-role" className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                        Role
                      </label>
                      <input
                        id="contact-role"
                        name="role"
                        type="text"
                        placeholder="VP, Manufacturing"
                        className="bg-[var(--surface-base)] border border-[var(--border-default)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-[120ms]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                        Email <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="name@company.com"
                        required
                        className="bg-[var(--surface-base)] border border-[var(--border-default)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-[120ms]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-type" className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                      Nature of enquiry
                    </label>
                    <select
                      id="contact-type"
                      name="enquiryType"
                      className="bg-[var(--surface-base)] border border-[var(--border-default)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-[120ms] appearance-none"
                    >
                      <option value="" disabled>Select a type…</option>
                      {ENQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                      Brief description
                    </label>
                    <textarea
                      id="contact-message"
                      name="description"
                      rows={5}
                      placeholder="The operational challenge you're working through…"
                      className="bg-[var(--surface-base)] border border-[var(--border-default)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-[120ms] resize-y"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="contact-gdpr"
                      name="gdprConsent"
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 border border-[var(--border-default)] bg-[var(--surface-base)] accent-[var(--accent)] cursor-pointer"
                    />
                    <label htmlFor="contact-gdpr" className="font-serif text-sm leading-[1.6] text-[var(--text-secondary)] cursor-pointer">
                      I agree that DigiSci may store and use the information I provide to respond to my enquiry, in accordance with its{' '}
                      <a
                        href="/privacy"
                        className="text-[var(--accent)] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  {formError && (
                    <p aria-live="polite" className="font-sans text-sm text-[var(--color-red-500)]">{formError}</p>
                  )}
                  <Button variant="primary" as="button" type="submit" iconRight={<ArrowRight size={16} />}>
                    Send Enquiry
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Contact details strip */}
        <div className="border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
          <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-8">
            <div className="flex flex-wrap gap-8 md:gap-12" aria-label="Contact details">
              <div className="flex items-start gap-3">
                <Globe size={18} className="text-[var(--text-tertiary)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <span className="block font-mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mb-1">Geography</span>
                  <span className="font-sans text-sm text-[var(--text-secondary)]">United Kingdom — serving UK, United States &amp; Europe</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <LinkedinIcon size={18} />
                <div>
                  <span className="block font-mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mb-1">LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/kwok-pang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-[120ms]"
                  >
                    Kwok Pang →
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[var(--text-tertiary)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <span className="block font-mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mb-1">Email</span>
                  <a
                    href="mailto:hello@digisci.solutions"
                    className="font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-[120ms]"
                  >
                    hello@digisci.solutions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
