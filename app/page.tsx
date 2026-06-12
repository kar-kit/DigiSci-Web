import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { Stat } from '@/components/ui/Stat';
import { Eyebrow } from '@/components/ui/Eyebrow';

const STATS = [
  { value: '12',  unit: 'wks',  label: 'To first model in production' },
  { value: '40',  unit: '%',    label: 'Median cycle-time reduction' },
  { value: '100', unit: '%',    label: 'GxP-validated deployments' },
  { value: '9',   unit: 'figs', label: 'Supply at risk, de-risked' },
] as const;

const SECTORS = [
  {
    tag:         'Cell & Gene Therapy',
    title:       'Living therapy manufacturing',
    description: 'From viral vector production to CAR-T fill-finish — we understand the biology, the process variability, and the regulatory expectations that make CGT manufacturing uniquely demanding.',
  },
  {
    tag:         'Pharmaceutical Manufacturing',
    title:       'Pharmaceutical operations',
    description: 'Batch record intelligence, deviation reduction, and supply-chain risk modelling for small-molecule and biologics operations running under 21 CFR Part 211 or EU GMP Annex.',
  },
  {
    tag:         'AI in Regulated Environments',
    title:       'AI built for GxP',
    description: 'Explainable models, validated pipelines, and audit-ready documentation — AI deployments that satisfy regulators, not just data scientists.',
  },
] as const;

const SERVICES = [
  {
    eyebrow: '01 — Cell & Gene Therapy',
    title: 'Manufacturing & scale-up',
    body:  'De-risking the path from clinical to commercial supply for living therapies.',
  },
  {
    eyebrow: '02 — Pharma Operations',
    title: 'Operations intelligence',
    body:  'Instrumenting batch, quality, and supply data into right-first-time decisions.',
  },
  {
    eyebrow: '03 — AI Systems',
    title: 'AI built for GxP',
    body:  'Explainable, validated, auditable models engineered for regulated environments.',
  },
] as const;

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section
        aria-label="Hero"
        style={{ backgroundImage: 'var(--grid-bg)', backgroundSize: 'var(--grid-bg-size)' }}
        className="border-b border-[--border-subtle]"
      >
        <div className="max-w-[1240px] mx-auto px-10 pt-[128px] pb-24">
          <Eyebrow rule>AI × Regulated Manufacturing</Eyebrow>

          <h1 className="font-sans font-semibold text-[84px] leading-[1.05] tracking-[-0.02em] mt-6 mb-0 max-w-[14ch]">
            AI that survives contact with{' '}
            <span className="text-[--accent]">GMP.</span>
          </h1>

          <p className="font-serif text-lg leading-[1.65] text-[--text-secondary] max-w-[36em] mt-6 mb-8">
            A boutique consultancy at the intersection of cell &amp; gene therapy
            manufacturing, pharmaceutical operations, and artificial intelligence —
            building systems that hold up to validation, audit, and the realities
            of regulated supply.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Tag variant="sector" dot>Cell &amp; Gene Therapy</Tag>
            <Tag variant="sector">Pharma Operations</Tag>
            <Tag variant="accent">AI Systems</Tag>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" as="a" href="/contact">Request a briefing</Button>
            <Button variant="secondary" size="lg" as="a" href="/approach">Read the approach</Button>
          </div>
        </div>
      </section>

      {/* ── Proof band ── */}
      <section aria-label="Key metrics" className="bg-[--surface-sunken] border-b border-[--border-subtle]">
        <div className="max-w-[1240px] mx-auto px-10 py-16 grid grid-cols-2 gap-10 sm:grid-cols-4">
          {STATS.map(({ value, unit, label }) => (
            <Stat key={label} value={value} unit={unit} label={label} />
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section aria-label="Services" className="max-w-[1240px] mx-auto px-10 py-32">
        <Eyebrow rule>What we do</Eyebrow>
        <h2 className="font-sans font-semibold text-[48px] leading-[1.1] tracking-[-0.02em] mt-4 mb-12 max-w-[18ch]">
          Three disciplines, one operating thesis.
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SERVICES.map(({ eyebrow, title, body }) => (
            <Card key={title} eyebrow={eyebrow} ruled interactive>
              <h3 className="font-sans font-semibold text-[28px] leading-snug tracking-[-0.01em] text-[--text-primary] mb-3">
                {title}
              </h3>
              <p className="font-serif text-base leading-[1.65] text-[--text-secondary]">
                {body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Industry sectors ── */}
      <section aria-label="Industry sectors" className="bg-[--surface-sunken] border-t border-b border-[--border-subtle]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <Eyebrow rule>Who we work with</Eyebrow>
          <h2 className="font-sans font-semibold text-[40px] leading-[1.1] tracking-[-0.02em] mt-4 mb-12 max-w-[22ch]">
            Deep expertise in the sectors that demand it most.
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {SECTORS.map(({ tag, title, description }) => (
              <div key={tag} className="flex flex-col gap-4">
                <Tag variant="sector">{tag}</Tag>
                <h3 className="font-sans font-semibold text-[22px] leading-snug tracking-[-0.01em] text-[--text-primary]">
                  {title}
                </h3>
                <p className="font-serif text-base leading-[1.65] text-[--text-secondary] flex-1">
                  {description}
                </p>
                <Link
                  href="/industry"
                  className="font-sans text-sm tracking-[0.04em] text-[--accent] hover:text-[--accent-hover] transition-colors duration-[120ms] self-start"
                  aria-label={`Learn more about our ${tag} expertise`}
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section aria-label="Call to action" className="bg-[--surface-sunken] border-t border-[--border-subtle]">
        <div className="max-w-[1240px] mx-auto px-10 py-24 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow rule>Start a conversation</Eyebrow>
            <h2 className="font-sans font-semibold text-[48px] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[16ch]">
              Bring AI to your most regulated work.
            </h2>
          </div>
          <Button variant="primary" size="lg" as="a" href="/contact" className="shrink-0">
            Request a briefing
          </Button>
        </div>
      </section>
    </main>
  );
}
