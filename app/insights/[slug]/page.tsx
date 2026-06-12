import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';
import { sanityFetch } from '@/lib/sanity/client';
import { articleBySlugQuery, allArticleSlugsQuery, allArticlesQuery } from '@/lib/sanity/queries';
import type { ArticleFull, ArticleListItem } from '@/lib/sanity/types';

type Section = { heading?: string; paragraphs: string[] };
type HardcodedArticle = ArticleListItem & { lede: string; body: Section[] };
type Params = { slug: string };

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-sans font-semibold text-[1.375rem] leading-[1.3] tracking-[-0.015em] text-[var(--text-primary)] mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-sans font-semibold text-[1.125rem] leading-[1.3] text-[var(--text-primary)] mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="font-sans text-[1.25rem] leading-[1.5] border-l-2 border-[var(--accent)] pl-5 my-6 text-[var(--text-primary)]">{children}</blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-serif text-[1.0625rem] leading-[1.75] text-[var(--text-secondary)] mb-4 last:mb-0">{children}</p>
    ),
  },
};

const HARDCODED_ARTICLES: HardcodedArticle[] = [
  {
    slug: 'future-ai-biopharmaceutical-quality-systems',
    tag: 'Digital Quality Systems', date: '2026-05-01',
    title: 'The Future of AI in Biopharmaceutical Quality Systems',
    excerpt: 'Quality systems are where AI in pharma either earns its place or is quietly removed at the next audit.',
    readTime: '9 min read',
    lede: 'Quality systems are where AI in pharma either earns its place or is quietly removed at the next audit. The question is not whether AI belongs in a pharmaceutical quality system — it is which parts of the PQS can tolerate model-mediated judgment, and which parts cannot.',
    body: [
      { heading: 'What the PQS Actually Does', paragraphs: ['The pharmaceutical quality system is a set of controls and decisions designed to ensure that every batch released is what the label says it is. It is not an administrative burden — it is the mechanism by which a company demonstrates, to a regulator and to itself, that it understands its process and controls it.', 'AI that supports this goal earns its place. AI that obscures the chain of human accountability does not.'] },
      { heading: 'Where Models Belong', paragraphs: ['Document review, trend analysis, anomaly detection — these are tasks where a well-trained model accelerates work that a QA professional would otherwise do more slowly and less consistently. The model surfaces candidates; the human decides.', 'Deviation management is another area of genuine fit. A model that pre-classifies deviations by severity and likely root cause reduces the cognitive load on QA staff without removing their accountability.'] },
      { heading: 'Where Human Judgement Must Stay', paragraphs: ['Batch disposition is the clearest case. No model currently meets the standard for autonomous release of a drug product — not because the technology is inadequate, but because the regulatory framework does not yet have a validated pathway for it.', 'The practical question for QA leaders right now is not how to replace human judgment, but how to document AI involvement in a way that survives inspection.'] },
    ],
  },
  {
    slug: 'ai-regulatory-documentation-gmp',
    tag: 'AI in Pharma Ops', date: '2026-05-01',
    title: 'AI and Regulatory Documentation in GMP Environments',
    excerpt: 'What it takes to put AI drafting into a CTD workflow without breaking traceability or trust.',
    readTime: '7 min read',
    lede: 'Regulatory documentation is one of the most time-intensive activities in pharmaceutical development. It is also one of the most tractable for AI assistance — if the workflow is designed around auditability from the start.',
    body: [
      { heading: 'The Documentation Problem in GMP', paragraphs: ['A typical CTD submission involves thousands of pages of technical documentation, each carrying regulatory weight and requiring traceability back to underlying data.', 'AI drafting tools can close much of that gap. The challenge is ensuring that every model-generated sentence is traceable to a source, flagged for human review, and versioned in a way the quality system can track.'] },
      { heading: 'Designing a Traceable Workflow', paragraphs: ["The most robust implementations treat the AI as a first-pass drafter, not an author. Each output is linked to the underlying data source so the reviewer is verifying that the prose accurately reflects the data.", "Prompt engineering matters less here than workflow architecture. The model's contribution is contained within a controlled step; the quality system's controls apply before and after."] },
      { heading: 'What Survives an Inspection', paragraphs: ['Inspectors look for the same things in AI-assisted documentation they look for in any regulated activity: defined procedures, trained personnel, and documented evidence that the controls worked.', 'The companies that will struggle are those that use AI to go faster without building the audit trail. Speed without traceability creates liability.'] },
    ],
  },
  {
    slug: 'digital-future-cell-therapy-manufacturing',
    tag: 'CGT Manufacturing', date: '2026-04-01',
    title: 'The Digital Future of Cell Therapy Manufacturing',
    excerpt: 'Chain of identity, batch disposition, and the data architecture that makes both tractable at scale.',
    readTime: '6 min read',
    lede: 'Cell therapy manufacturing sits at the intersection of the most demanding requirements in biotech: personalised processes, short manufacturing windows, no margin for identity error, and a regulatory environment still catching up to the science.',
    body: [
      { heading: 'Chain of Identity Is Not a Software Problem', paragraphs: ["Chain of identity — the unbroken link from a specific patient's cells to the final product — is a data architecture problem that manifests as a software problem. The records must be immutable, time-stamped, and accessible across multiple handoffs.", 'Many early CGT programmes manage this with spreadsheets and manual reconciliation. That works at clinical scale. It does not work at commercial scale.'] },
      { heading: 'Batch Disposition in a 24-Hour Window', paragraphs: ['Autologous therapies frequently have release windows measured in hours, not days. AI-assisted review — anomaly detection, specification verification, documentation completeness checking — is not a nice-to-have in this context. It is the only way to sustain throughput.', 'The disposition model must be designed before the process is locked.'] },
      { heading: 'The Data Architecture That Makes It Work', paragraphs: ['Unified operational data — instrument outputs, in-process measurements, environmental data, and logistics records in a single queryable layer — is the foundation every CGT manufacturer needs and few have built.', 'The investment is not trivial, but the alternative is a manufacturing operation that cannot scale without proportional headcount increases.'] },
    ],
  },
  {
    slug: 'operational-data-strategic-asset-biotech',
    tag: 'Future Biotech Operating Models', date: '2026-04-01',
    title: 'Operational Data as a Strategic Asset in Biotech',
    excerpt: 'Why the operational data layer — not the model — is the real competitive moat for biotech operators.',
    readTime: '8 min read',
    lede: 'In every conversation about AI in biotech, the discussion gravitates toward models. The model is the wrong focus. The operational data layer underneath it is where competitive advantage actually accrues.',
    body: [
      { heading: 'Why the Model Is the Commodity', paragraphs: ["Foundation models are increasingly accessible and increasingly capable. What does not narrow is the gap between a company that has five years of structured, queryable operational data and one that does not.", "Models trained on proprietary operational data produce insights no off-the-shelf model can replicate. That is the moat."] },
      { heading: 'What Structured Operational Data Looks Like', paragraphs: ['Most biotech operations generate vast quantities of data. Very little of it is structured for analysis. Instrument outputs exist in proprietary formats. Batch records are PDFs.', 'The companies that have done this work find that the second use case comes quickly, and the third, and the fourth.'] },
      { heading: 'Building the Layer Incrementally', paragraphs: ["The right approach is not a big-bang data warehouse project. It is identifying the one operational question that matters most and building the data infrastructure to answer it.", 'From that foundation, you extend. The strategic asset is built one well-scoped integration at a time.'] },
    ],
  },
  {
    slug: 'validating-ai-systems-csv-gamp5',
    tag: 'Digital Quality Systems', date: '2026-03-01',
    title: 'Validating AI Systems Under CSV and GAMP 5',
    excerpt: 'A pragmatic path through computer system validation when the system in question learns.',
    readTime: '6 min read',
    lede: 'Computer system validation frameworks were designed for deterministic software. AI systems introduce behaviours that existing CSV and GAMP 5 guidance was not written to address. The gap is real, but it is navigable.',
    body: [
      { heading: "What GAMP 5 Gets Right", paragraphs: ["GAMP 5's risk-based approach remains the right lens. An AI system used for administrative efficiency sits in a different risk category from one that contributes to batch disposition decisions.", "The categorisation challenge is that AI systems often span multiple GAMP categories simultaneously."] },
      { heading: 'Validating a System That Learns', paragraphs: ["The core challenge with learning systems is that the validated state is not static. The validation framework must account for this explicitly: defining which model version is validated, under what data conditions, and what change control applies when the model is retrained.", "Periodic performance monitoring is the practical mechanism for maintaining validated state in a learning system."] },
      { heading: 'Regulatory Submissions and AI', paragraphs: ["For systems that contribute to regulatory submissions, the validation package must include not just performance evidence but explainability documentation.", "The companies that will find CSV of AI systems difficult are those that bought a capability and are now trying to reverse-engineer documentation for it."] },
    ],
  },
  {
    slug: 'where-ai-reduces-cogs-manufacturing',
    tag: 'AI in Pharma Ops', date: '2026-03-01',
    title: 'Where AI Actually Reduces COGS in Manufacturing',
    excerpt: 'Cutting through the hype to the handful of places AI moves the cost line in regulated production.',
    readTime: '5 min read',
    lede: 'The claims about AI reducing manufacturing costs in pharma range from credible to implausible. The credible ones cluster around a handful of specific use cases.',
    body: [
      { heading: 'Three Places AI Moves the Cost Line', paragraphs: ['Yield optimisation through process analytics is the most consistently evidenced use case. Correlating in-process measurements with final product yield and using predictive models to adjust parameters reduces batch failures.', 'Predictive maintenance reduces unplanned downtime. The value is highest in high-utilisation, continuous manufacturing settings.'] },
      { heading: 'Where the Hype Exceeds the Evidence', paragraphs: ['Autonomous manufacturing is the most frequently claimed and least frequently realised benefit. Regulatory requirements around human oversight of GMP operations make meaningful headcount reduction through AI a longer-term prospect.', 'Quality control automation is similarly constrained by validation requirements and the current state of visual inspection technology.'] },
      { heading: 'Building a Credible Business Case', paragraphs: ['A credible COGS reduction case starts with the operational data to support the claim. If you cannot show historical yield variance and correlate it with process parameters, you cannot credibly project yield improvement.', 'The projects that succeed are specific: one product family, one manufacturing step, one well-defined outcome metric.'] },
    ],
  },
  {
    slug: 'scaling-atmp-operations-without-losing-compliance',
    tag: 'CGT Manufacturing', date: '2026-02-01',
    title: 'Scaling ATMP Operations Without Losing Compliance',
    excerpt: 'The operational decisions that separate a clinical process from a commercial one.',
    readTime: '7 min read',
    lede: 'The gap between a clinical ATMP process and a commercial one is not primarily scientific. It is operational. The decisions made during process development determine whether scaling up is a controlled exercise or a crisis.',
    body: [
      { heading: 'What Changes at Commercial Scale', paragraphs: ['At clinical scale, a cell therapy process can be managed with institutional knowledge and manual documentation. None of that translates to commercial scale without deliberate redesign.', 'Commercial scale introduces multiple concurrent batches, reduced time per batch for quality review, and multiple manufacturing sites.'] },
      { heading: 'The Compliance Risk in Rapid Scale-Up', paragraphs: ["The compliance risk is not that companies make decisions they know are wrong — it is that they make decisions under time pressure that they later cannot defend.", "Regulators understand the challenges of scaling novel therapies. What they do not accept is a quality system that was never designed to scale."] },
      { heading: 'Designing for Commercial from Clinical', paragraphs: ['The best time to design commercial-scale quality systems is during clinical development, when there is time to think and the cost of change is low.', 'Companies that treat commercial readiness as a late-stage project find themselves making expensive changes to validated systems under regulatory time pressure.'] },
    ],
  },
  {
    slug: 'senior-led-operating-model-ai-transformation',
    tag: 'Future Biotech Operating Models', date: '2026-02-01',
    title: 'The Senior-Led Operating Model for AI Transformation',
    excerpt: 'Why boutique, principal-delivered engagements outperform large programmes in regulated work.',
    readTime: '6 min read',
    lede: 'Large AI transformation programmes in regulated industries tend to underdeliver for a predictable reason: the people who sell them are not the people who do them.',
    body: [
      { heading: 'The Bait-and-Switch Problem', paragraphs: ['Every large consulting engagement in this space follows a similar pattern: senior partners present a compelling vision, a team of junior consultants arrives to execute it.', 'In regulated environments, this pattern is not just commercially suboptimal — it is operationally risky.'] },
      { heading: 'What Principal Delivery Actually Means', paragraphs: ['Principal delivery means the people with domain expertise are the ones doing the work, not directing it from afar. Smaller teams, more direct client contact.', 'The constraint is throughput: a principal-led model cannot scale to hundreds of concurrent engagements. The advantage is quality.'] },
      { heading: 'Why Regulated Work Rewards This Model', paragraphs: ['In regulated environments, the cost of a wrong decision compounds. A quality system designed without adequate understanding of regulatory expectations creates inspection findings.', 'The economics of a senior-led model are straightforward for clients who have experienced the alternative.'] },
    ],
  },
  {
    slug: 'designing-data-integrity-alcoa-plus',
    tag: 'Digital Quality Systems', date: '2026-01-01',
    title: 'Designing Data Integrity for ALCOA+ from Day One',
    excerpt: 'Data integrity is an architecture decision, not an audit response. Designing it in.',
    readTime: '5 min read',
    lede: 'ALCOA+ is a framework regulators use to assess the reliability of data in GMP environments. Most companies encounter it during an audit. The ones that encounter it during system design have a fundamentally different relationship with inspection readiness.',
    body: [
      { heading: 'Why Data Integrity Failures Are Systemic, Not Accidental', paragraphs: ['Data integrity failures in GMP environments are rarely caused by deliberate falsification. They are caused by systems that make it difficult to do the right thing.', 'Treating data integrity as a training and culture issue addresses symptoms. The root cause is usually design.'] },
      { heading: 'What ALCOA+-Native Design Looks Like', paragraphs: ['An ALCOA+-native system is one where every data entry is automatically attributed to a specific user and timestamp; where the audit trail is maintained by the system, not the user.', 'Modern electronic batch records and LIMS systems can deliver all of this. The design decisions that matter most are made before the system is implemented.'] },
      { heading: 'The Audit-Ready Organisation', paragraphs: ['Organisations that design for ALCOA+ from the start find that audit preparation is not a project — it is an ongoing state.', 'The organisations that struggle with data integrity inspections are those that have to explain why records are not contemporaneous.'] },
    ],
  },
  {
    slug: 'ai-enabled-batch-disposition-promise-guardrails',
    tag: 'AI in Pharma Ops', date: '2026-01-01',
    title: 'AI-Enabled Batch Disposition: Promise and Guardrails',
    excerpt: 'Faster release decisions are possible — with the right human-in-the-loop guardrails.',
    readTime: '6 min read',
    lede: 'Batch disposition is one of the most consequential decisions in pharmaceutical manufacturing, and one of the most time-consuming. AI can make it faster without making it less rigorous — but only if the human-in-the-loop architecture is designed correctly.',
    body: [
      { heading: 'The Current State of Batch Disposition', paragraphs: ['Batch disposition involves collecting test results, reviewing batch records, assessing deviations, and reaching a decision about whether the batch meets specification. In a high-volume operation, QA capacity is the constraint.', 'AI can compress the pre-review work significantly. Automated compilation of test results, specification verification, and documentation completeness checking reduce preparation time.'] },
      { heading: 'Where the Guardrails Must Be', paragraphs: ["The risk in AI-assisted disposition is automation complacency. Preventing this requires workflow design that forces engagement, not just sign-off. The model's output should be a structured review package, not a recommendation.", "Any deviation flagged by the model that is dismissed must require documented justification."] },
      { heading: 'What Regulators Expect', paragraphs: ["Current regulatory guidance does not endorse autonomous AI-driven batch disposition. It does not prohibit AI assistance. AI tools that support the QA reviewer in preparing for a disposition decision are consistent with existing frameworks.", "The validation package for an AI-assisted disposition tool must demonstrate that the tool's assistance improves the quality of the review, not just its speed."] },
    ],
  },
];

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cms = await sanityFetch<ArticleFull>(articleBySlugQuery, { slug });
  const article = cms ?? HARDCODED_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  const title = `${article.title} | DigiSci Insights`;
  return {
    title,
    description: article.excerpt,
    openGraph: { type: 'article', url: `/insights/${slug}`, title, description: article.excerpt },
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await sanityFetch<string[]>(allArticleSlugsQuery);
  const cmsParams = (slugs ?? []).map((s) => ({ slug: s }));
  const hardcodedParams = HARDCODED_ARTICLES.map(({ slug }) => ({ slug }));
  const all = [...cmsParams, ...hardcodedParams];
  return all.filter((p, i) => all.findIndex((x) => x.slug === p.slug) === i);
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  const [cms, allArticles] = await Promise.all([
    sanityFetch<ArticleFull>(articleBySlugQuery, { slug }),
    sanityFetch<ArticleListItem[]>(allArticlesQuery),
  ]);

  const hardcoded = HARDCODED_ARTICLES.find((a) => a.slug === slug);
  if (!cms && !hardcoded) notFound();

  const article = cms ?? hardcoded!;
  const relatedSource: ArticleListItem[] = allArticles ?? HARDCODED_ARTICLES;

  const related = [
    ...relatedSource.filter((a) => a.slug !== slug && a.tag === article.tag),
    ...relatedSource.filter((a) => a.slug !== slug && a.tag !== article.tag),
  ].slice(0, 3);

  return (
    <main>

      {/* Article header */}
      <section
        aria-label="Article header"
        style={{ backgroundImage: 'var(--grid-bg)', backgroundSize: 'var(--grid-bg-size)' }}
        className="relative border-b border-[var(--border-subtle)] overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute top-[-200px] right-[-140px] w-[560px] h-[560px] bg-[radial-gradient(circle,var(--blue-glow),transparent_62%)]" />
        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-12 pb-14">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-[120ms] mb-8"
          >
            ← All articles
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <Tag variant="sector">{article.tag}</Tag>
          </div>
          <h1 className="font-sans font-semibold text-[clamp(2rem,3.2vw,3.25rem)] leading-[1.1] tracking-[-0.02em] max-w-[22ch] mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
            <span>Kwok Pang</span>
            <span className="text-[var(--border-default)]">·</span>
            <span>{article.date ? formatDate(article.date) : ''}</span>
            <span className="text-[var(--border-default)]">·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article aria-label="Article body" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[700px] mx-auto px-6 py-16">
          <p className="font-serif text-[1.25rem] leading-[1.7] text-[var(--text-primary)] mb-10">
            {article.lede}
          </p>

          {cms ? (
            <PortableText value={cms.body} components={portableTextComponents} />
          ) : (
            (hardcoded!.body as Section[]).map((section, i) => (
              <div key={i} className="mb-10">
                {section.heading && (
                  <h2 className="font-sans font-semibold text-[1.375rem] leading-[1.3] tracking-[-0.015em] text-[var(--text-primary)] mb-4">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="font-serif text-[1.0625rem] leading-[1.75] text-[var(--text-secondary)] mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ))
          )}
        </div>
      </article>

      {/* Share article */}
      <section aria-label="Share article" className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
        <div className="max-w-[700px] mx-auto px-6 py-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">Share this article</span>
          <a
            href="https://www.linkedin.com/in/kwok-pang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-[120ms]"
            aria-label="Share on LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            Share on LinkedIn
          </a>
        </div>
      </section>

      {/* Related articles */}
      <section aria-label="Related articles" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16">
          <Eyebrow rule>Related</Eyebrow>
          <h2 className="font-sans font-semibold text-[1.75rem] leading-[1.2] tracking-[-0.02em] mt-4 mb-10">Continue Reading</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(({ slug: relSlug, tag, date, title, excerpt, readTime }) => (
              <Link
                key={relSlug}
                href={`/insights/${relSlug}`}
                className="group flex flex-col gap-4 p-6 border border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--surface-base)] transition-colors duration-[120ms]"
                aria-label={`Read article: ${title}`}
              >
                <Tag variant="sector">{tag}</Tag>
                <h3 className="font-sans font-semibold text-[1.0625rem] leading-[1.35] tracking-[-0.01em] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-[120ms]">
                  {title}
                </h3>
                <p className="font-serif text-sm leading-[1.65] text-[var(--text-secondary)] flex-1">{excerpt}</p>
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                  {date ? formatDate(date) : ''} · {readTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section aria-label="Subscribe" className="bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-[560px]">
            <Eyebrow rule>Subscribe</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[22ch]">Stay current on AI and biotech operations.</h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4">
              New insights are published regularly. Strategic and technical perspectives written for biotech and pharmaceutical operations leaders.
            </p>
            <form aria-label="Subscribe to Insights" className="mt-8 flex gap-3 flex-col sm:flex-row" action="#">
              <label htmlFor="article-subscribe-email" className="sr-only">Work email</label>
              <input
                id="article-subscribe-email"
                type="email"
                placeholder="name@company.com"
                className="flex-1 bg-[var(--surface-base)] border border-[var(--border-default)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-[120ms]"
              />
              <Button variant="primary" as="button" type="submit">Subscribe for Insights</Button>
            </form>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            author: { '@type': 'Person', name: 'Kwok Pang', url: 'https://www.linkedin.com/in/kwok-pang' },
            publisher: { '@type': 'Organization', name: 'DigiSci', url: 'https://digisci.solutions' },
            datePublished: article.date,
            mainEntityOfPage: { '@type': 'WebPage', '@id': `https://digisci.solutions/insights/${article.slug}` },
          }),
        }}
      />
    </main>
  );
}
