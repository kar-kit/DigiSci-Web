import { ArrowRight, Check, Dna, Factory, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';

const CGT_TAGS    = ['Patient-specific mfg', 'ATMP regulations', 'Chain of identity', 'GMP cell therapy'] as const;
const PHARMA_TAGS = ['Small-molecule & biologics', 'Quality systems', 'Data architecture', 'PAT'] as const;
const AI_TAGS     = ['GxP', 'CSV', 'ALCOA+', '21 CFR Part 11', 'EU Annex 11', 'GAMP 5', 'ICH E6'] as const;

const CGT_CAPABILITIES = [
  'CGT manufacturing process & quality system design',
  'Manufacturing scale-up strategy',
  'AI-enabled batch disposition',
  'Digital MBR & chain of identity / custody systems',
] as const;

const PHARMA_CAPABILITIES = [
  'Manufacturing data infrastructure',
  'Operational analytics & KPI design',
  'Digital quality system transformation',
  'AI-enabled PAT integration',
] as const;

const AI_CAPABILITIES = [
  'AI governance frameworks for regulated environments',
  'CSV & computer system validation for AI systems',
  'Data integrity design aligned with ALCOA+',
  'Regulatory strategy for AI-enabled quality systems',
] as const;

export default function IndustryPage() {
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
          <Eyebrow rule>Industry Expertise</Eyebrow>
          <h1 className="font-sans font-semibold text-[clamp(2.25rem,3.5vw,4rem)] leading-[1.08] tracking-[-0.02em] mt-5 mb-5 max-w-[22ch]">
            Deep Expertise Across Biotech and Pharmaceutical Operations
          </h1>
          <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] max-w-[52em]">
            DigiSci operates in sectors where operational complexity, regulatory rigour, and technological transformation are most acute. Our work is grounded in practical experience — not generic consulting frameworks.
          </p>
        </div>
      </section>

      {/* §01 Cell & Gene Therapy */}
      <section aria-label="Cell and Gene Therapy expertise" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20 md:items-start">
            <div>
              <Eyebrow rule index="01">Sector</Eyebrow>
              <div className="flex items-center gap-3 mt-4 mb-5">
                <Dna size={28} className="text-[var(--accent)] shrink-0" aria-hidden="true" />
                <h2 className="font-sans font-semibold text-[2.5rem] leading-[1.1] tracking-[-0.02em]">
                  Cell &amp; Gene Therapy
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {CGT_TAGS.map((t) => <Tag key={t} variant="sector">{t}</Tag>)}
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">
                  Advanced therapies introduce manufacturing and quality challenges with no precedent in conventional pharma — patient-specific production, complex supply chains, short shelf lives, and immature regulatory frameworks.
                </p>
                <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">
                  DigiSci works at this frontier, where operational design and regulatory strategy cannot be separated.
                </p>
              </div>
            </div>
            <div>
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] block mb-5">
                Capabilities
              </span>
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                {CGT_CAPABILITIES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={14} aria-hidden="true" className="text-[var(--accent)] shrink-0 mt-[3px]" />
                    <span className="font-sans text-base text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="secondary" size="sm" as="a" href="/case-studies">
                  View related case studies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §02 Pharmaceutical Manufacturing */}
      <section aria-label="Pharmaceutical Manufacturing expertise" className="bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20 md:items-start">
            <div>
              <Eyebrow rule index="02">Sector</Eyebrow>
              <div className="flex items-center gap-3 mt-4 mb-5">
                <Factory size={28} className="text-[var(--accent)] shrink-0" aria-hidden="true" />
                <h2 className="font-sans font-semibold text-[2.5rem] leading-[1.1] tracking-[-0.02em]">
                  Pharmaceutical Manufacturing
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {PHARMA_TAGS.map((t) => <Tag key={t} variant="sector">{t}</Tag>)}
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">
                  Transformation across manufacturing, quality, and regulatory functions must be aligned — separate programmes rarely produce durable outcomes.
                </p>
                <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">
                  DigiSci works across this boundary, treating data, process and compliance as one system.
                </p>
              </div>
            </div>
            <div>
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] block mb-5">
                Capabilities
              </span>
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                {PHARMA_CAPABILITIES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={14} aria-hidden="true" className="text-[var(--accent)] shrink-0 mt-[3px]" />
                    <span className="font-sans text-base text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="secondary" size="sm" as="a" href="/case-studies">
                  View related case studies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §03 AI in Regulated Environments */}
      <section aria-label="AI in Regulated Environments expertise" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20 md:items-start">
            <div>
              <Eyebrow rule index="03">Sector</Eyebrow>
              <div className="flex items-center gap-3 mt-4 mb-5">
                <ShieldCheck size={28} className="text-[var(--accent)] shrink-0" aria-hidden="true" />
                <h2 className="font-sans font-semibold text-[2.5rem] leading-[1.1] tracking-[-0.02em]">
                  AI in Regulated Environments
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {AI_TAGS.map((t) => <Tag key={t} variant="sector">{t}</Tag>)}
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">
                  Applying AI in regulated industries requires governance, validation and risk-management frameworks that satisfy regulatory expectations.
                </p>
                <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">
                  DigiSci bridges AI capability and regulatory compliance — so a model is not just accurate, but defensible.
                </p>
              </div>
            </div>
            <div>
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] block mb-5">
                Capabilities
              </span>
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                {AI_CAPABILITIES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={14} aria-hidden="true" className="text-[var(--accent)] shrink-0 mt-[3px]" />
                    <span className="font-sans text-base text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="secondary" size="sm" as="a" href="/services">
                  View related services
                </Button>
              </div>
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
            <Eyebrow rule>Sector-specific</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[22ch]">
              Tell us where your sector breaks.
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4 max-w-[40ch]">
              We&apos;ll route the conversation to the relevant work — not a generic contact form.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button variant="primary" size="lg" as="a" href="/contact" iconRight={<ArrowRight size={17} />}>
              Discuss Your Sector Challenge
            </Button>
            <Button variant="secondary" size="lg" as="a" href="/services">
              View Services
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
