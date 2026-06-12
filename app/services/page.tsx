import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const metadata: Metadata = {
  title: 'Services | AI Strategy & Digital Ops | DigiSci',
  description: 'AI strategy, implementation programmes, digital operations, and productised offers for biotech and pharmaceutical operations. Senior-led, principal-delivered.',
  openGraph: {
    type: 'website',
    url: '/services',
    title: 'Services | AI Strategy & Digital Ops | DigiSci',
    description: 'AI strategy, implementation programmes, digital operations, and productised offers for biotech and pharmaceutical operations. Senior-led, principal-delivered.',
  },
};

const SERVICES = [
  {
    n: '01',
    title: 'AI Transformation Strategy',
    duration: '6–12 weeks',
    who: 'For executives seeking to define where AI creates real value in a regulated environment.',
    deliverables: [
      'AI opportunity assessment',
      'Transformation roadmap',
      'Executive alignment framework',
      'Regulatory considerations from the outset',
    ],
  },
  {
    n: '02',
    title: 'AI Implementation Programmes',
    duration: '3–9 months',
    who: 'For operations and quality teams ready to move from strategy to implementation.',
    deliverables: [
      'AI-enabled QMS design',
      'Manufacturing analytics platforms',
      'Validation & regulatory documentation',
      'Change management',
    ],
  },
  {
    n: '03',
    title: 'Digital Operations Transformation',
    duration: 'Project-based',
    who: 'For manufacturing leaders modernising data infrastructure beyond paper and legacy systems.',
    deliverables: [
      'Manufacturing data architecture',
      'Operational KPI framework',
      'Digital MBR / EBR systems',
      'Data governance for regulated environments',
    ],
  },
  {
    n: '04',
    title: 'Operational Excellence',
    duration: 'Advisory / programme',
    who: 'For operations leaders focused on manufacturing performance and quality improvement.',
    deliverables: [
      'COGS reduction programmes',
      'Process optimisation',
      'Quality system modernisation',
      'Digital operations strategy',
    ],
  },
] as const;

const OFFERS = [
  {
    title: 'AI Readiness Assessment',
    scope: 'Fixed scope · 2–3 weeks',
    description: 'A scoped diagnostic of where your organisation stands and where AI can credibly create value.',
  },
  {
    title: 'Digital PQS Blueprint',
    scope: 'Fixed scope · defined outputs',
    description: 'An architecture for a modern, inspection-ready pharmaceutical quality system.',
  },
  {
    title: 'Manufacturing Data Architecture Design',
    scope: 'Fixed scope · time-bounded',
    description: 'A unified operational data layer designed as the foundation for analytics and AI.',
  },
] as const;

const PROCESS_STEPS = [
  { n: '01', label: 'Scoping' },
  { n: '02', label: 'Brief' },
  { n: '03', label: 'Deliver' },
  { n: '04', label: 'Handoff' },
] as const;

export default function ServicesPage() {
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
          <Eyebrow rule>Services</Eyebrow>
          <h1 className="font-sans font-semibold text-[clamp(2.25rem,3.5vw,4rem)] leading-[1.08] tracking-[-0.02em] mt-5 mb-5 max-w-[22ch]">
            Consulting Services for AI-Enabled Biotech Operations
          </h1>
          <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] max-w-[52em]">
            A focused portfolio of consulting services for biotech and pharmaceutical organisations navigating AI and digital transformation in regulated environments. Four focused lines — specialism over a menu of twelve.
          </p>
        </div>
      </section>

      {/* §01 Service lines */}
      <section aria-label="Service lines" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="mb-16">
            <Eyebrow rule index="01">Service lines</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[30ch]">
              Scope, duration, outcome — not capability statements.
            </h2>
          </div>

          <ul className="list-none p-0 m-0 flex flex-col gap-0">
            {SERVICES.map(({ n, title, duration, who, deliverables }) => (
              <li
                key={n}
                aria-label={title}
                className="grid grid-cols-1 gap-8 py-10 border-t border-[var(--border-subtle)] md:grid-cols-[320px_1fr] md:gap-16"
              >
                {/* Meta column */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-sm text-[var(--text-accent)]">{n}</span>
                  <h3 className="font-sans font-semibold text-[1.5rem] leading-[1.2] text-[var(--text-primary)]">
                    {title}
                  </h3>
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                    {duration}
                  </span>
                  <p className="font-serif text-sm leading-[1.6] text-[var(--text-secondary)] italic">
                    {who}
                  </p>
                </div>

                {/* Deliverables column */}
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] block mb-4">
                      Deliverables
                    </span>
                    <ul className="list-none p-0 m-0 flex flex-col gap-3">
                      {deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check
                            size={14}
                            aria-hidden="true"
                            className="text-[var(--accent)] shrink-0 mt-[3px]"
                          />
                          <span className="font-sans text-sm text-[var(--text-secondary)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Button variant="secondary" size="sm" as="a" href="/contact">
                      Enquire
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §02 Structured entry points */}
      <section aria-label="Structured entry points" className="bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="mb-12">
            <Eyebrow rule index="02">Structured entry points</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[28ch]">
              For organisations at an earlier stage.
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4 max-w-[52em]">
              Scoped, time-bounded offers with defined outputs — lower activation energy for buyers who can&apos;t get open-ended engagements through procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3" aria-label="Productised offers">
            {OFFERS.map(({ title, scope, description }) => (
              <article
                key={title}
                className="flex flex-col gap-4 border border-[var(--border-default)] p-8 bg-[var(--surface-base)]"
              >
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--accent)]">
                  {scope}
                </span>
                <h3 className="font-sans font-semibold text-[1.25rem] leading-[1.3] text-[var(--text-primary)]">
                  {title}
                </h3>
                <p className="font-serif text-sm leading-[1.65] text-[var(--text-secondary)] grow">
                  {description}
                </p>
                <div>
                  <Button variant="secondary" size="sm" as="a" href="/contact">
                    Enquire
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §03 Engagement process */}
      <section aria-label="Engagement process" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="mb-12">
            <Eyebrow rule index="03">Engagement process</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[20ch]">
              No black box.
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4 max-w-[52em]">
              Regulated-industry clients need to understand governance, documentation and handoff before approving a programme.
            </p>
          </div>

          <ol className="list-none p-0 m-0 grid grid-cols-1 gap-0 sm:grid-cols-4">
            {PROCESS_STEPS.map(({ n, label }) => (
              <li
                key={n}
                className="flex flex-col gap-3 py-8 border-t border-[var(--border-subtle)] sm:border-t-0 sm:border-l sm:pl-6 first:border-l-0 first:pl-0"
              >
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                  Step {n}
                </span>
                <span className="font-sans font-semibold text-[1.25rem] text-[var(--text-primary)]">
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA Band */}
      <section
        aria-label="Call to action"
        className="bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow rule>Start a project</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[22ch]">
              Know which line fits? Brief us directly.
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4 max-w-[40ch]">
              Our enquiry form is pre-populated with a service-line selector, so your enquiry arrives qualified.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button variant="primary" size="lg" as="a" href="/contact" iconRight={<ArrowRight size={17} />}>
              Start an enquiry
            </Button>
            <Button variant="secondary" size="lg" as="a" href="/case-studies">
              View case studies
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
