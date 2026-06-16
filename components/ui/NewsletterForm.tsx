'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterForm({
  emailId = 'subscribe-email',
  onSuccess,
}: {
  emailId?: string;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const gdprConsent = (form.elements.namedItem('gdpr') as HTMLInputElement)?.checked;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, gdprConsent }),
      });

      if (res.ok) {
        setStatus('success');
        onSuccess?.();
      } else {
        const data = await res.json() as { error?: string };
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Subscription confirmed"
        className="mt-8 p-5 border border-[var(--accent)] bg-[var(--accent)]/5"
      >
        <p className="font-sans text-[var(--accent)] font-medium">You&apos;re subscribed.</p>
        <p className="font-serif text-sm text-[var(--text-secondary)] mt-1 leading-[1.6]">
          New insights will arrive in your inbox. You can unsubscribe at any time.
        </p>
      </div>
    );
  }

  return (
    <form
      aria-label="Subscribe to Insights"
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-4"
      noValidate
    >
      <div className="flex gap-3 flex-col sm:flex-row">
        <label htmlFor={emailId} className="sr-only">Work email</label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          placeholder="name@company.com"
          disabled={status === 'loading'}
          className="flex-1 bg-[var(--surface-base)] border border-[var(--border-default)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-[120ms] disabled:opacity-50"
        />
        <Button variant="primary" as="button" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing…' : 'Subscribe for Insights'}
        </Button>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          name="gdpr"
          type="checkbox"
          required
          aria-required="true"
          aria-label="GDPR consent — I agree to receive DigiSci Insights by email"
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)] cursor-pointer"
        />
        <span className="font-sans text-sm text-[var(--text-tertiary)] leading-[1.55]">
          I agree to receive DigiSci Insights by email. I can unsubscribe at any time. No spam, no third-party sharing.
        </span>
      </label>

      {status === 'error' && (
        <p role="alert" aria-live="assertive" className="font-sans text-sm text-red-400">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
