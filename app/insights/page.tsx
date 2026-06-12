import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';

const FEATURED = {
  slug:     'future-ai-biopharmaceutical-quality-systems',
  tag:      'Digital Quality Systems',
  date:     'May 2026',
  title:    'The Future of AI in Biopharmaceutical Quality Systems',
  excerpt:  'Quality systems are where AI in pharma either earns its place or is quietly removed at the next audit. A practical view of where models belong in a modern PQS — and where human judgement must stay.',
  readTime: '9 min read',
} as const;

const ARTICLES = [
  {
    slug:     'ai-regulatory-documentation-gmp',
    tag:      'AI in Pharma Ops',
    date:     'May 2026',
    title:    'AI and Regulatory Documentation in GMP Environments',
    excerpt:  'What it takes to put AI drafting into a CTD workflow without breaking traceability or trust.',
    readTime: '7 min read',
  },
  {
    slug:     'digital-future-cell-therapy-manufacturing',
    tag:      'CGT Manufacturing',
    date:     'Apr 2026',
    title:    'The Digital Future of Cell Therapy Manufacturing',
    excerpt:  'Chain of identity, batch disposition, and the data architecture that makes both tractable at scale.',
    readTime: '6 min read',
  },
  {
    slug:     'operational-data-strategic-asset-biotech',
    tag:      'Future Biotech Operating Models',
    date:     'Apr 2026',
    title:    'Operational Data as a Strategic Asset in Biotech',
    excerpt:  'Why the operational data layer — not the model — is the real competitive moat for biotech operators.',
    readTime: '8 min read',
  },
  {
    slug:     'validating-ai-systems-csv-gamp5',
    tag:      'Digital Quality Systems',
    date:     'Mar 2026',
    title:    'Validating AI Systems Under CSV and GAMP 5',
    excerpt:  'A pragmatic path through computer system validation when the system in question learns.',
    readTime: '6 min read',
  },
  {
    slug:     'where-ai-reduces-cogs-manufacturing',
    tag:      'AI in Pharma Ops',
    date:     'Mar 2026',
    title:    'Where AI Actually Reduces COGS in Manufacturing',
    excerpt:  'Cutting through the hype to the handful of places AI moves the cost line in regulated production.',
    readTime: '5 min read',
  },
  {
    slug:     'scaling-atmp-operations-without-losing-compliance',
    tag:      'CGT Manufacturing',
    date:     'Feb 2026',
    title:    'Scaling ATMP Operations Without Losing Compliance',
    excerpt:  'The operational decisions that separate a clinical process from a commercial one.',
    readTime: '7 min read',
  },
  {
    slug:     'senior-led-operating-model-ai-transformation',
    tag:      'Future Biotech Operating Models',
    date:     'Feb 2026',
    title:    'The Senior-Led Operating Model for AI Transformation',
    excerpt:  'Why boutique, principal-delivered engagements outperform large programmes in regulated work.',
    readTime: '6 min read',
  },
  {
    slug:     'designing-data-integrity-alcoa-plus',
    tag:      'Digital Quality Systems',
    date:     'Jan 2026',
    title:    'Designing Data Integrity for ALCOA+ from Day One',
    excerpt:  'Data integrity is an architecture decision, not an audit response. Designing it in.',
    readTime: '5 min read',
  },
  {
    slug:     'ai-enabled-batch-disposition-promise-guardrails',
    tag:      'AI in Pharma Ops',
    date:     'Jan 2026',
    title:    'AI-Enabled Batch Disposition: Promise and Guardrails',
    excerpt:  'Faster release decisions are possible — with the right human-in-the-loop guardrails.',
    readTime: '6 min read',
  },
] as const;

const FILTERS = ['All', 'AI in Pharma Ops', 'CGT Manufacturing', 'Digital Quality Systems', 'Future Operating Models'] as const;

export default function InsightsPage() {
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
          <Eyebrow rule>Insights</Eyebrow>
          <h1 className="font-sans font-semibold text-[clamp(2.25rem,3.5vw,4rem)] leading-[1.08] tracking-[-0.02em] mt-5 mb-5 max-w-[24ch]">
            Insights on AI-Enabled Biotech Operations
          </h1>
          <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] max-w-[52em]">
            Practical perspectives on AI strategy, pharmaceutical manufacturing, digital quality systems, and the future of biotech operations. Written for leaders who operate in this space.
          </p>
        </div>
      </section>

      {/* Featured article */}
      <section aria-label="Featured article" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-12">
          <Link
            href={`/insights/${FEATURED.slug}`}
            className="group flex flex-col gap-4 p-8 bg-[var(--surface-raised)] border border-[var(--border-default)] hover:border-[var(--border-strong)] transition-colors duration-[120ms] md:flex-row md:items-start md:gap-10"
            aria-label={`Read featured article: ${FEATURED.title}`}
          >
            <div className="flex flex-col gap-2 shrink-0">
              <Tag variant="accent">Featured</Tag>
              <Tag variant="sector">{FEATURED.tag}</Tag>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <h2 className="font-sans font-semibold text-[1.75rem] leading-[1.2] tracking-[-0.02em] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-[120ms] max-w-[36ch]">
                {FEATURED.title}
              </h2>
              <p className="font-serif text-base leading-[1.65] text-[var(--text-secondary)] max-w-[52em]">
                {FEATURED.excerpt}
              </p>
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                {FEATURED.date} · {FEATURED.readTime}
              </span>
            </div>
            <div className="shrink-0 self-end md:self-center">
              <ArrowRight size={20} className="text-[var(--accent)]" aria-hidden="true" />
            </div>
          </Link>
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
                  ? 'border-[var(--accent)] text-[var(--accent)]'
                  : 'border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
          <span className="ml-auto font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
            9 articles
          </span>
        </div>
      </section>

      {/* Article grid */}
      <section aria-label="Article grid" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map(({ slug, tag, date, title, excerpt, readTime }) => (
              <Link
                key={slug}
                href={`/insights/${slug}`}
                className="group flex flex-col gap-4 p-6 border border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--surface-base)] transition-colors duration-[120ms]"
                aria-label={`Read article: ${title}`}
              >
                <Tag variant="sector">{tag}</Tag>
                <h3 className="font-sans font-semibold text-[1.125rem] leading-[1.35] tracking-[-0.01em] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-[120ms]">
                  {title}
                </h3>
                <p className="font-serif text-sm leading-[1.65] text-[var(--text-secondary)] flex-1">
                  {excerpt}
                </p>
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                  {date} · {readTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section
        aria-label="Subscribe"
        className="bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)]"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-[560px]">
            <Eyebrow rule>Subscribe</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[22ch]">
              Stay current on AI and biotech operations.
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4">
              New insights are published regularly. Strategic and technical perspectives written for biotech and pharmaceutical operations leaders.
            </p>
            <form
              aria-label="Subscribe to Insights"
              className="mt-8 flex gap-3 flex-col sm:flex-row"
              action="#"
            >
              <label htmlFor="subscribe-email" className="sr-only">Work email</label>
              <input
                id="subscribe-email"
                type="email"
                placeholder="name@company.com"
                className="flex-1 bg-[var(--surface-base)] border border-[var(--border-default)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-[120ms]"
              />
              <Button variant="primary" as="button" type="submit">
                Subscribe for Insights
              </Button>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
}
