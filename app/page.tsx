import Link from 'next/link';
import { ArrowRight, ArrowUpRight, FlaskConical, Activity, Cpu } from 'lucide-react';
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

const SERVICES = [
  {
    eyebrow: '01 — Cell & Gene Therapy',
    icon:    FlaskConical,
    title:   'Manufacturing & scale-up',
    body:    'De-risking the path from clinical to commercial supply — process characterisation, tech transfer, and capacity planning for living therapies.',
  },
  {
    eyebrow: '02 — Pharma Operations',
    icon:    Activity,
    title:   'Operations intelligence',
    body:    'Instrumenting batch, quality, and supply data into decisions — bottleneck analytics, deviation prediction, and right-first-time release.',
  },
  {
    eyebrow: '03 — AI Systems',
    icon:    Cpu,
    title:   'AI built for GxP',
    body:    'Models and agents engineered for regulated environments — explainable, validated, and auditable from the first line of the design history.',
  },
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

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section
        aria-label="Hero"
        style={{ backgroundImage: 'var(--grid-bg)', backgroundSize: 'var(--grid-bg-size)' }}
        className="relative overflow-hidden border-b border-[--border-subtle]"
      >
        {/* Accent corner glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-160px] right-[-120px] w-[520px] h-[520px] bg-[radial-gradient(circle,var(--blue-glow),transparent_62%)]"
        />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-[128px] pb-24">
          {/* Two-column hero grid */}
          <div className="grid grid-cols-1 gap-10 items-center md:grid-cols-[1.35fr_1fr]">

            {/* Left: copy */}
            <div>
              <Eyebrow rule>AI × Regulated Manufacturing</Eyebrow>

              <h1 className="font-sans font-semibold text-[84px] leading-[1.05] tracking-[-0.02em] mt-6 mb-0 max-w-[14ch]">
                AI that survives contact&nbsp;with{' '}
                <span className="text-[--accent]">GMP.</span>
              </h1>

              <p className="font-serif text-lg leading-[1.65] text-[--text-secondary] max-w-[36em] mt-6 mb-8">
                We are a boutique consultancy at the intersection of cell &amp; gene therapy
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
                <Button
                  variant="primary"
                  size="lg"
                  as="a"
                  href="/contact"
                  iconRight={<ArrowRight size={17} />}
                >
                  Request a briefing
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  as="a"
                  href="/approach"
                  iconRight={<ArrowUpRight size={17} />}
                >
                  Read the approach
                </Button>
              </div>
            </div>

            {/* Right: engineered data panel */}
            <aside
              aria-label="Throughput model"
              className="bg-[--surface-raised] border border-[--border-default] rounded-[4px] p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[--text-secondary]">
                  Throughput model · v3.2
                </span>
                <span className="inline-flex items-center gap-[7px] font-mono text-[0.6875rem] tracking-[0.04em] text-[--color-green-400]">
                  <span
                    className="w-[7px] h-[7px] rounded-full bg-[--color-green-500] shadow-[0_0_8px_var(--color-green-500)]"
                  />
                  Live
                </span>
              </div>

              {/* Sparkline */}
              <svg
                viewBox="0 0 320 120"
                preserveAspectRatio="none"
                className="w-full h-[120px] block mb-5"
                aria-hidden="true"
              >
                <polyline
                  points="0,96 40,90 80,92 120,78 160,80 200,58 240,52 280,30 320,18"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <polyline
                  points="0,104 40,100 80,101 120,95 160,96 200,88 240,86 280,80 320,76"
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Panel stats */}
              <div className="grid grid-cols-2 gap-5 border-t border-[--border-subtle] pt-5">
                <Stat value="40" unit="%" label="Cycle-time reduction" size="sm" />
                <Stat value="3.2" unit="×" label="Faster tech transfer" size="sm" />
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ── Proof band ── */}
      <section aria-label="Key metrics" className="bg-[--surface-sunken] border-b border-[--border-subtle]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16">
          <Eyebrow muted>Evidence, not adjectives</Eyebrow>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 mt-8">
            {STATS.map(({ value, unit, label }) => (
              <Stat key={label} value={value} unit={unit} label={label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section aria-label="Services" className="max-w-[1240px] mx-auto px-6 md:px-10 py-32">
        <div className="max-w-[40rem] mb-8">
          <Eyebrow rule>What we do</Eyebrow>
          <h2 className="font-sans font-semibold text-[48px] leading-[1.1] tracking-[-0.02em] mt-4">
            Three disciplines, one operating thesis.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {SERVICES.map(({ eyebrow, icon: Icon, title, body }) => (
            <Card key={title} eyebrow={eyebrow} ruled interactive>
              <Icon
                size={28}
                aria-hidden="true"
                className="text-[--color-accent] mb-5 shrink-0"
              />
              <h3 className="font-sans font-semibold text-[28px] leading-snug tracking-[-0.01em] text-[--text-primary] mb-3">
                {title}
              </h3>
              <p className="font-serif text-base leading-[1.65] text-[--text-secondary] mb-6 flex-1">
                {body}
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.04em] text-[--text-accent] hover:text-[--accent-hover] transition-colors duration-[120ms] mt-auto"
                aria-label={`Explore ${title}`}
              >
                Explore <ArrowRight size={15} aria-hidden="true" />
              </Link>
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
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow rule>Start a conversation</Eyebrow>
            <h2 className="font-sans font-semibold text-[48px] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[16ch]">
              Bring AI to your most regulated work.
            </h2>
          </div>
          <Button
            variant="primary"
            size="lg"
            as="a"
            href="/contact"
            iconRight={<ArrowRight size={17} />}
            className="shrink-0"
          >
            Request a briefing
          </Button>
        </div>
      </section>
    </main>
  );
}
