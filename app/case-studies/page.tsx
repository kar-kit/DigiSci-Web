import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';

const CASE_STUDIES = [
  {
    slug:      'ai-regulatory-documentation-platform',
    sector:    'Biopharmaceutical',
    service:   'AI Implementation',
    client:    'Global Life Sciences Consulting Firm · Regulatory Affairs',
    title:     'AI-Enabled Regulatory Documentation Platform',
    outcome:   'CTD drafting accelerated',
    challenge: 'Regulatory submissions for biologics require extensive CTD documentation — highly labour-intensive and accuracy-critical, with little room for error.',
    approach:  'DigiSci designed and delivered an AI-enabled regulatory documentation platform: structured CTD templates, a curated regulatory knowledge base, AI drafting workflows, citation and traceability mechanisms, and expert-in-the-loop review.',
    impact:    'Accelerated drafting across CTD modules, improved consistency, enhanced knowledge reuse, and a scalable delivery capability.',
  },
  {
    slug:      'digital-pqs-blueprint',
    sector:    'Cell & Gene Therapy',
    service:   'AI Strategy',
    client:    'Emerging Biotech (Advanced Therapies)',
    title:     'Digital Pharmaceutical Quality System Blueprint',
    outcome:   'Inspection-ready roadmap',
    challenge: 'Preparing for late-stage clinical development and commercialisation with document-driven, fragmented quality processes. Leadership needed a modern digital PQS, inspection-ready at commercial scale.',
    approach:  'A PQS transformation assessment across process architecture, GxP alignment, system landscape and scalability — culminating in a Digital PQS Blueprint with digital quality architecture, integrated workflows, governance and validation strategy, and a phased roadmap.',
    impact:    'A clear roadmap aligned to regulatory expectations, improved inspection readiness, and leadership alignment.',
  },
  {
    slug:      'manufacturing-data-architecture-cgt',
    sector:    'Cell & Gene Therapy',
    service:   'Digital Ops',
    client:    'Cell & Gene Therapy Development Company',
    title:     'Manufacturing Data Architecture for Cell Therapy Operations',
    outcome:   'Unified operational data layer',
    challenge: 'Large data volumes across lab, manufacturing and quality systems with no integrated architecture — limiting the ability to identify process trends, support batch disposition, or build an AI-ready foundation.',
    approach:  'DigiSci designed a Manufacturing Data Architecture Framework: data mapping across production, quality and lab systems, an integration architecture for a unified operational data layer, analytics architecture for batch analysis and KPI monitoring, and a governance framework for data integrity and audit trails.',
    impact:    'Integrated data visibility, a foundation for AI-enabled analytics, enhanced trend identification, and scalable, regulatory-aligned infrastructure.',
  },
] as const;

const FILTERS = ['All work (3)', 'Cell & Gene Therapy', 'Pharma Mfg', 'Biopharmaceutical'] as const;

export default function CaseStudiesPage() {
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
          <Eyebrow rule>Case Studies</Eyebrow>
          <h1 className="font-sans font-semibold text-[clamp(2.25rem,3.5vw,4rem)] leading-[1.08] tracking-[-0.02em] mt-5 mb-5 max-w-[18ch]">
            Client Work
          </h1>
          <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] max-w-[52em]">
            A selection of engagements illustrating the scope and outcomes of DigiSci&apos;s work. Client details are anonymised in line with confidentiality commitments.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section aria-label="Filter bar" className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-4 flex items-center gap-2 flex-wrap">
          {FILTERS.map((label, i) => (
            <button
              key={label}
              className={[
                'font-sans text-sm px-4 py-2 border transition-colors duration-[120ms]',
                i === 0
                  ? 'border-[var(--accent)] text-[var(--accent)] bg-transparent'
                  : 'border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
          <span className="ml-auto font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
            3 engagements
          </span>
        </div>
      </section>

      {/* Case studies grid */}
      <section aria-label="Case studies" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 flex flex-col gap-8">
          {CASE_STUDIES.map(({ slug, sector, service, client, title, outcome, challenge, approach, impact }) => (
            <article
              key={slug}
              aria-label={title}
              className="bg-[var(--navy-800)] border border-[var(--border-default)] p-8 md:p-10"
            >
              <div className="flex flex-wrap gap-2 mb-5">
                <Tag variant="sector" dot>{sector}</Tag>
                <Tag variant="accent">{service}</Tag>
              </div>

              <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mb-2">
                {client}
              </p>
              <h2 className="font-sans font-semibold text-[1.75rem] leading-[1.2] tracking-[-0.02em] text-[var(--text-primary)] mb-3 max-w-[32ch]">
                {title}
              </h2>
              <p className="font-sans text-sm text-[var(--accent)] mb-8">
                Outcome: {outcome}
              </p>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 border-t border-[var(--border-subtle)] pt-8">
                <div>
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] block mb-3">
                    Challenge
                  </span>
                  <p className="font-serif text-sm leading-[1.65] text-[var(--text-secondary)]">{challenge}</p>
                </div>
                <div>
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] block mb-3">
                    Approach
                  </span>
                  <p className="font-serif text-sm leading-[1.65] text-[var(--text-secondary)]">{approach}</p>
                </div>
                <div>
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] block mb-3">
                    Impact
                  </span>
                  <p className="font-serif text-sm leading-[1.65] text-[var(--text-secondary)]">{impact}</p>
                </div>
              </div>

              <div className="mt-8 border-t border-[var(--border-subtle)] pt-6">
                <Button variant="secondary" size="sm" as="a" href={`/case-studies/${slug}`} iconRight={<ArrowRight size={14} />}>
                  Read full case study
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section
        aria-label="Call to action"
        className="bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow rule>Late-stage evaluation</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[22ch]">
              See your own problem in one of these?
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4 max-w-[40ch]">
              A buyer who reads a full case study has already visualised their challenge. Let&apos;s discuss yours.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button variant="primary" size="lg" as="a" href="/contact" iconRight={<ArrowRight size={17} />}>
              Discuss a Similar Challenge
            </Button>
            <Button variant="secondary" size="lg" as="a" href="/contact">
              Book a Discovery Call
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
