import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, UserCheck, Users, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About DigiSci | Senior-Led AI Consulting',
  description: 'Meet Kwok Pang and the DigiSci team. Deep domain expertise in pharmaceutical operations, CGT manufacturing, and AI strategy — delivered by principals.',
  openGraph: {
    type: 'website',
    url: '/about',
    title: 'About DigiSci | Senior-Led AI Consulting',
    description: 'Meet Kwok Pang and the DigiSci team. Deep domain expertise in pharmaceutical operations, CGT manufacturing, and AI strategy — delivered by principals.',
  },
};

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

const CAREER_THREAD = [
  {
    n: '01',
    title: 'Cell & Gene Therapy Manufacturing',
    body:  'Hands-on operations in advanced-therapy production — patient-specific batches, chain of identity, and scale-up under evolving ATMP frameworks.',
  },
  {
    n: '02',
    title: 'Pharmaceutical Quality Systems',
    body:  'Building and modernising GxP quality systems — the discipline that turns a process into something a regulator will approve.',
  },
  {
    n: '03',
    title: 'AI Strategy in Regulated Environments',
    body:  'Defining where AI creates durable value when governance, validation and data integrity are non-negotiable.',
  },
  {
    n: '04',
    title: 'Digital Operations Transformation',
    body:  'Moving manufacturing and quality beyond paper and legacy systems toward an AI-ready operational data layer.',
  },
  {
    n: '05',
    title: 'Vision for AI-Enabled Biotech Operations',
    body:  'A through-line conviction: the next decade of biotech operations is defined by firms that operationalise AI without compromising rigour.',
  },
] as const;

const HOW_WE_WORK = [
  { Icon: UserCheck, label: 'Delivery',   value: 'Senior-led, principal-delivered' },
  { Icon: Users,     label: 'Roster',     value: 'Small, deliberately' },
  { Icon: Globe,     label: 'Geography',  value: 'UK · United States · Europe' },
] as const;

export default function AboutPage() {
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
          <Eyebrow rule>About</Eyebrow>
          <h1 className="font-sans font-semibold text-[clamp(2.25rem,3.5vw,4rem)] leading-[1.08] tracking-[-0.02em] mt-5 mb-5 max-w-[18ch]">
            About DigiSci and its Founder
          </h1>
          <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] max-w-[46em]">
            DigiSci was built on a straightforward observation: the biotech industry needs transformation partners who understand both the science of the operation and the science of AI.
          </p>
        </div>
      </section>

      {/* §01 Founder profile */}
      <section aria-label="Founder profile" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[320px_1fr] md:gap-16 items-start">

            {/* Portrait placeholder */}
            <div
              className="relative aspect-[4/5] bg-[var(--navy-850)] border border-[var(--border-default)] flex items-end p-5"
              style={{ backgroundImage: 'var(--grid-bg)', backgroundSize: '24px 24px' }}
              aria-label="Kwok Pang portrait"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--blue-glow),transparent_65%)]"
              />
              <span className="relative font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-secondary)]">
                Kwok Pang · Founder &amp; Principal
              </span>
            </div>

            {/* Bio */}
            <div>
              <Eyebrow rule index="01">The founder</Eyebrow>
              <h2 className="font-sans font-semibold text-[2.5rem] leading-[1.1] tracking-[-0.02em] mt-4 mb-6 max-w-[20ch]">
                Kwok Pang — Operator, Digital Strategist, AI Transformation Architect.
              </h2>
              <div className="flex flex-col gap-5">
                <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">
                  Kwok's career runs along a single thread: advanced therapy manufacturing, into pharmaceutical quality systems, into digital and AI transformation. Each step was inside the regulated environment — not observing it from a technology vendor's side of the table.
                </p>
                <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">
                  That arc is the proof of the positioning. DigiSci does not pair a domain expert with an AI expert and hope they translate. The expertise lives in one operator.
                </p>
              </div>
              <blockquote className="font-sans text-[1.75rem] leading-[1.45] text-[var(--text-primary)] font-medium border-l-2 border-[var(--accent)] pl-5 mt-8">
                "The most valuable transformation work happens when deep domain expertise and AI capability are held in the same mind."
              </blockquote>
              <div className="mt-6 flex gap-3">
                <Button
                  variant="secondary"
                  as="a"
                  href="https://www.linkedin.com/in/kwok-pang"
                  iconRight={<LinkedinIcon size={16} />}
                >
                  Connect on LinkedIn
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* §02 Career thread */}
      <section aria-label="Career thread" className="bg-[var(--surface-sunken)] border-t border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-[44rem] mb-10">
            <Eyebrow rule index="02">Career thread</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4">
              The through-line is the proof.
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4">
              Each area of expertise maps directly to a capability DigiSci sells.
            </p>
          </div>
          <ul className="list-none p-0 m-0">
            {CAREER_THREAD.map(({ n, title, body }) => (
              <li
                key={n}
                className="grid grid-cols-[56px_1fr] gap-5 py-6 border-t border-[var(--border-subtle)] items-baseline"
              >
                <span className="font-mono text-sm text-[var(--text-accent)]">{n}</span>
                <div>
                  <h3 className="font-sans font-semibold text-[1.375rem] text-[var(--text-primary)] mb-2">
                    {title}
                  </h3>
                  <p className="font-serif text-base leading-[1.65] text-[var(--text-secondary)]">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §03 Mission */}
      <section
        aria-label="Mission"
        style={{ backgroundImage: 'var(--grid-bg)', backgroundSize: 'var(--grid-bg-size)' }}
        className="text-center py-40 border-b border-[var(--border-subtle)]"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <Eyebrow rule>The mission</Eyebrow>
          <p className="font-sans font-semibold text-[4rem] leading-[1.08] tracking-[-0.02em] max-w-[18ch] mx-auto mt-5">
            Enable the{' '}
            <b className="text-[var(--accent)] font-semibold">AI-driven future</b>
            {' '}of biotech operations.
          </p>
        </div>
      </section>

      {/* §04 How we work */}
      <section aria-label="How we work" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 grid grid-cols-1 gap-16 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <Eyebrow rule index="03">How we work</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[16ch]">
              A focused, senior-led boutique.
            </h2>
          </div>
          <div>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">
              Engagements are led directly by Kwok, supported where appropriate by a small network of specialist collaborators. Enterprise buyers won&apos;t get a bait-and-switch with junior delivery.
            </p>
            <div className="flex flex-col gap-5 mt-6 pt-6 border-t border-[var(--border-subtle)] sm:flex-row sm:flex-wrap sm:gap-6">
              {HOW_WE_WORK.map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-3 items-start">
                  <Icon size={18} aria-hidden="true" className="text-[var(--accent)] shrink-0 mt-[2px]" />
                  <div>
                    <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] block mb-1">
                      {label}
                    </span>
                    <span className="font-sans text-sm text-[var(--text-primary)]">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section
        aria-label="Call to action"
        className="bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow rule>Two ways forward</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[22ch]">
              Ready to engage, or prefer to research first?
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4 max-w-[40ch]">
              About pages have high intent — if you read this far, let&apos;s talk. Or follow the work on LinkedIn.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button variant="primary" size="lg" as="a" href="/services" iconRight={<ArrowRight size={17} />}>
              View Services
            </Button>
            <Button variant="secondary" size="lg" as="a" href="https://www.linkedin.com/in/kwok-pang">
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Kwok Pang',
            jobTitle: 'Founder & Principal Consultant',
            worksFor: {
              '@type': 'Organization',
              name: 'DigiSci',
              url: 'https://digisci.solutions',
            },
            sameAs: 'https://www.linkedin.com/in/kwok-pang',
          }),
        }}
      />
    </main>
  );
}
