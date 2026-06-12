import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { sanityFetch } from '@/lib/sanity/client';
import { allArticlesQuery, featuredArticleQuery } from '@/lib/sanity/queries';
import type { ArticleListItem } from '@/lib/sanity/types';
import { InsightsClient } from './InsightsClient';

export const metadata: Metadata = {
  title: 'Insights | AI & Biotech Operations | DigiSci',
  description: 'Practical perspectives on AI strategy, pharmaceutical manufacturing, digital quality systems, and the future of biotech operations.',
  openGraph: {
    type: 'website',
    url: '/insights',
    title: 'Insights | AI & Biotech Operations | DigiSci',
    description: 'Practical perspectives on AI strategy, pharmaceutical manufacturing, digital quality systems, and the future of biotech operations.',
  },
};

const FALLBACK_FEATURED: ArticleListItem = {
  slug:     'future-ai-biopharmaceutical-quality-systems',
  tag:      'Digital Quality Systems',
  date:     '2026-05-01',
  title:    'The Future of AI in Biopharmaceutical Quality Systems',
  excerpt:  'Quality systems are where AI in pharma either earns its place or is quietly removed at the next audit. A practical view of where models belong in a modern PQS — and where human judgement must stay.',
  readTime: '9 min read',
  featured: true,
};

const FALLBACK_ARTICLES: ArticleListItem[] = [
  { slug: 'ai-regulatory-documentation-gmp',             tag: 'AI in Pharma Ops',             date: '2026-05-01', title: 'AI and Regulatory Documentation in GMP Environments',        excerpt: 'What it takes to put AI drafting into a CTD workflow without breaking traceability or trust.',                                       readTime: '7 min read' },
  { slug: 'digital-future-cell-therapy-manufacturing',   tag: 'CGT Manufacturing',             date: '2026-04-01', title: 'The Digital Future of Cell Therapy Manufacturing',             excerpt: 'Chain of identity, batch disposition, and the data architecture that makes both tractable at scale.',                                readTime: '6 min read' },
  { slug: 'operational-data-strategic-asset-biotech',    tag: 'Future Biotech Operating Models', date: '2026-04-01', title: 'Operational Data as a Strategic Asset in Biotech',           excerpt: 'Why the operational data layer — not the model — is the real competitive moat for biotech operators.',                               readTime: '8 min read' },
  { slug: 'validating-ai-systems-csv-gamp5',             tag: 'Digital Quality Systems',       date: '2026-03-01', title: 'Validating AI Systems Under CSV and GAMP 5',                  excerpt: 'A pragmatic path through computer system validation when the system in question learns.',                                            readTime: '6 min read' },
  { slug: 'where-ai-reduces-cogs-manufacturing',         tag: 'AI in Pharma Ops',             date: '2026-03-01', title: 'Where AI Actually Reduces COGS in Manufacturing',              excerpt: 'Cutting through the hype to the handful of places AI moves the cost line in regulated production.',                                  readTime: '5 min read' },
  { slug: 'scaling-atmp-operations-without-losing-compliance', tag: 'CGT Manufacturing',      date: '2026-02-01', title: 'Scaling ATMP Operations Without Losing Compliance',            excerpt: 'The operational decisions that separate a clinical process from a commercial one.',                                                    readTime: '7 min read' },
  { slug: 'senior-led-operating-model-ai-transformation', tag: 'Future Biotech Operating Models', date: '2026-02-01', title: 'The Senior-Led Operating Model for AI Transformation',    excerpt: 'Why boutique, principal-delivered engagements outperform large programmes in regulated work.',                                        readTime: '6 min read' },
  { slug: 'designing-data-integrity-alcoa-plus',         tag: 'Digital Quality Systems',       date: '2026-01-01', title: 'Designing Data Integrity for ALCOA+ from Day One',            excerpt: 'Data integrity is an architecture decision, not an audit response. Designing it in.',                                                  readTime: '5 min read' },
  { slug: 'ai-enabled-batch-disposition-promise-guardrails', tag: 'AI in Pharma Ops',         date: '2026-01-01', title: 'AI-Enabled Batch Disposition: Promise and Guardrails',         excerpt: 'Faster release decisions are possible — with the right human-in-the-loop guardrails.',                                               readTime: '6 min read' },
];

export default async function InsightsPage() {
  const [articles, featured] = await Promise.all([
    sanityFetch<ArticleListItem[]>(allArticlesQuery),
    sanityFetch<ArticleListItem>(featuredArticleQuery),
  ]);

  const displayArticles = articles ?? FALLBACK_ARTICLES;
  const displayFeatured = featured ?? FALLBACK_FEATURED;

  return (
    <main>

      {/* Page hero */}
      <section
        aria-label="Page hero"
        style={{ backgroundImage: 'var(--grid-bg)', backgroundSize: 'var(--grid-bg-size)' }}
        className="relative border-b border-[var(--border-subtle)] overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute top-[-200px] right-[-140px] w-[560px] h-[560px] bg-[radial-gradient(circle,var(--blue-glow),transparent_62%)]" />
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

      <InsightsClient articles={displayArticles} featured={displayFeatured} />

    </main>
  );
}
