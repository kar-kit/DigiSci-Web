import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';

type Section = { heading?: string; paragraphs: string[] };
type Article = {
  slug: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  lede: string;
  body: Section[];
};
type Params = { slug: string };

const ARTICLES: Article[] = [
  {
    slug: 'future-ai-biopharmaceutical-quality-systems',
    tag: 'Digital Quality Systems',
    date: 'May 2026',
    title: 'The Future of AI in Biopharmaceutical Quality Systems',
    excerpt: 'Quality systems are where AI in pharma either earns its place or is quietly removed at the next audit.',
    readTime: '9 min read',
    lede: 'Quality systems are where AI in pharma either earns its place or is quietly removed at the next audit. The question is not whether AI belongs in a pharmaceutical quality system — it is which parts of the PQS can tolerate model-mediated judgment, and which parts cannot.',
    body: [
      {
        heading: 'What the PQS Actually Does',
        paragraphs: [
          'The pharmaceutical quality system is a set of controls and decisions designed to ensure that every batch released is what the label says it is. It is not an administrative burden — it is the mechanism by which a company demonstrates, to a regulator and to itself, that it understands its process and controls it.',
          'AI that supports this goal earns its place. AI that obscures the chain of human accountability does not.',
        ],
      },
      {
        heading: 'Where Models Belong',
        paragraphs: [
          'Document review, trend analysis, anomaly detection — these are tasks where a well-trained model accelerates work that a QA professional would otherwise do more slowly and less consistently. The model surfaces candidates; the human decides. This division is not a compromise: it is the only defensible configuration under current regulatory frameworks.',
          'Deviation management is another area of genuine fit. A model that pre-classifies deviations by severity and likely root cause reduces the cognitive load on QA staff without removing their accountability. The decision remains theirs; the triage does not.',
        ],
      },
      {
        heading: 'Where Human Judgement Must Stay',
        paragraphs: [
          'Batch disposition is the clearest case. No model currently meets the standard for autonomous release of a drug product — not because the technology is inadequate, but because the regulatory framework does not yet have a validated pathway for it. QA sign-off remains a human act. So does any deviation closure that involves a causal judgment about process understanding.',
          'The practical question for QA leaders right now is not how to replace human judgment, but how to document AI involvement in a way that survives inspection. An AI-assisted review that produces a traceable, auditable record is more defensible than a manual review with informal documentation. The audit trail is the key.',
        ],
      },
    ],
  },
  {
    slug: 'ai-regulatory-documentation-gmp',
    tag: 'AI in Pharma Ops',
    date: 'May 2026',
    title: 'AI and Regulatory Documentation in GMP Environments',
    excerpt: 'What it takes to put AI drafting into a CTD workflow without breaking traceability or trust.',
    readTime: '7 min read',
    lede: 'Regulatory documentation is one of the most time-intensive activities in pharmaceutical development. It is also one of the most tractable for AI assistance — if the workflow is designed around auditability from the start.',
    body: [
      {
        heading: 'The Documentation Problem in GMP',
        paragraphs: [
          'A typical CTD submission involves thousands of pages of technical documentation, each carrying regulatory weight and requiring traceability back to underlying data. The bottleneck is not knowledge — it is the labour of translating study data into structured, compliant language at the pace regulators expect.',
          'AI drafting tools can close much of that gap. The challenge is ensuring that every model-generated sentence is traceable to a source, flagged for human review, and versioned in a way the quality system can track.',
        ],
      },
      {
        heading: 'Designing a Traceable Workflow',
        paragraphs: [
          'The most robust implementations treat the AI as a first-pass drafter, not an author. Each output is linked to the underlying data source — a clinical study report, a batch record, a method validation summary — so the reviewer is not just checking prose, but verifying that the prose accurately reflects the data.',
          'Prompt engineering matters less here than workflow architecture. The model\'s contribution is contained within a controlled step; the quality system\'s controls apply before and after. That is what makes it defensible.',
        ],
      },
      {
        heading: 'What Survives an Inspection',
        paragraphs: [
          'Inspectors look for the same things in AI-assisted documentation they look for in any regulated activity: defined procedures, trained personnel, and documented evidence that the controls worked. A well-implemented AI drafting workflow produces better documentation of its own process than most manual workflows do.',
          'The companies that will struggle are those that use AI to go faster without building the audit trail. Speed without traceability creates liability. Speed with traceability creates competitive advantage.',
        ],
      },
    ],
  },
  {
    slug: 'digital-future-cell-therapy-manufacturing',
    tag: 'CGT Manufacturing',
    date: 'Apr 2026',
    title: 'The Digital Future of Cell Therapy Manufacturing',
    excerpt: 'Chain of identity, batch disposition, and the data architecture that makes both tractable at scale.',
    readTime: '6 min read',
    lede: 'Cell therapy manufacturing sits at the intersection of the most demanding requirements in biotech: personalised processes, short manufacturing windows, no margin for identity error, and a regulatory environment still catching up to the science.',
    body: [
      {
        heading: 'Chain of Identity Is Not a Software Problem',
        paragraphs: [
          'Chain of identity — the unbroken link from a specific patient\'s cells to the final product administered to that patient — is a data architecture problem that manifests as a software problem. The records must be immutable, time-stamped, and accessible across multiple handoffs between collection site, manufacturing facility, and clinical site.',
          'Many early CGT programmes manage this with spreadsheets and manual reconciliation. That works at clinical scale. It does not work at commercial scale, and the switch is more expensive when it happens after the process is locked.',
        ],
      },
      {
        heading: 'Batch Disposition in a 24-Hour Window',
        paragraphs: [
          'Autologous therapies frequently have release windows measured in hours, not days. The quality review that would take a week in a small-molecule facility must happen in a fraction of that time. AI-assisted review — anomaly detection, specification verification, documentation completeness checking — is not a nice-to-have in this context. It is the only way to sustain throughput.',
          'The disposition model must be designed before the process is locked. Retrofitting AI-assisted release into a validated process is possible but expensive. Building it in from the start is the better call.',
        ],
      },
      {
        heading: 'The Data Architecture That Makes It Work',
        paragraphs: [
          'Unified operational data — instrument outputs, in-process measurements, environmental data, and logistics records in a single queryable layer — is the foundation every CGT manufacturer needs and few have built. Without it, the analytics that drive AI-assisted disposition are speculative. With it, they are reliable.',
          'The investment is not trivial, but the alternative is a manufacturing operation that cannot scale without proportional headcount increases. Digital infrastructure is the leverage point.',
        ],
      },
    ],
  },
  {
    slug: 'operational-data-strategic-asset-biotech',
    tag: 'Future Biotech Operating Models',
    date: 'Apr 2026',
    title: 'Operational Data as a Strategic Asset in Biotech',
    excerpt: 'Why the operational data layer — not the model — is the real competitive moat for biotech operators.',
    readTime: '8 min read',
    lede: 'In every conversation about AI in biotech, the discussion gravitates toward models. Which model, what architecture, which vendor. The model is the wrong focus. The operational data layer underneath it is where competitive advantage actually accrues.',
    body: [
      {
        heading: 'Why the Model Is the Commodity',
        paragraphs: [
          'Foundation models are increasingly accessible and increasingly capable. The difference between using one vendor\'s model and another\'s narrows every quarter. What does not narrow is the gap between a company that has five years of structured, queryable operational data and one that does not.',
          'Models trained on proprietary operational data — your process parameters, your deviation history, your supply chain performance — produce insights no off-the-shelf model can replicate. That is the moat. Building it requires treating data infrastructure as a strategic investment, not an IT cost.',
        ],
      },
      {
        heading: 'What Structured Operational Data Looks Like',
        paragraphs: [
          'Most biotech operations generate vast quantities of data. Very little of it is structured for analysis. Instrument outputs exist in proprietary formats. Batch records are PDFs. Environmental monitoring lives in standalone systems. The integration work required to create a unified, queryable operational data layer is substantial — and it is worth doing.',
          'The companies that have done this work — usually driven by a specific operational pain point — find that the second use case comes quickly, and the third, and the fourth. The infrastructure investment pays dividends across the organisation.',
        ],
      },
      {
        heading: 'Building the Layer Incrementally',
        paragraphs: [
          'The right approach is not a big-bang data warehouse project. It is identifying the one operational question that matters most — where do my batch failures come from, what predicts my supply chain disruptions, which process parameters drift before a specification excursion — and building the data infrastructure to answer it.',
          'From that foundation, you extend. The strategic asset is not built in a single programme. It is built one well-scoped integration at a time, accumulating over years into something no competitor can replicate quickly.',
        ],
      },
    ],
  },
  {
    slug: 'validating-ai-systems-csv-gamp5',
    tag: 'Digital Quality Systems',
    date: 'Mar 2026',
    title: 'Validating AI Systems Under CSV and GAMP 5',
    excerpt: 'A pragmatic path through computer system validation when the system in question learns.',
    readTime: '6 min read',
    lede: 'Computer system validation frameworks were designed for deterministic software. AI systems — particularly those that learn from operational data — introduce behaviours that existing CSV and GAMP 5 guidance was not written to address. The gap is real, but it is navigable.',
    body: [
      {
        heading: 'What GAMP 5 Gets Right',
        paragraphs: [
          'GAMP 5\'s risk-based approach — categorising systems by their complexity and impact on product quality and patient safety — remains the right lens. An AI system used for administrative efficiency sits in a different risk category from one that contributes to batch disposition decisions. The validation effort should reflect that difference.',
          'The categorisation challenge is that AI systems often span multiple GAMP categories simultaneously. A document management system with an AI drafting layer is both a Category 4 configured product and something closer to a Category 5 custom application. Pragmatic validators treat the AI layer as a distinct scope.',
        ],
      },
      {
        heading: 'Validating a System That Learns',
        paragraphs: [
          'The core challenge with learning systems is that the validated state is not static. A model\'s parameters change as it trains on new data; its outputs for a given input may shift over time. The validation framework must account for this explicitly: defining which model version is validated, under what data conditions, and what change control applies when the model is retrained.',
          'Periodic performance monitoring — comparing model outputs against a reference standard at defined intervals — is the practical mechanism for maintaining validated state in a learning system. The frequency depends on the rate of data ingestion and the regulatory risk of the application.',
        ],
      },
      {
        heading: 'Regulatory Submissions and AI',
        paragraphs: [
          'For systems that contribute to regulatory submissions, the validation package must include not just performance evidence but explainability documentation: how the system produces its outputs, what data it draws on, and what the known failure modes are. Regulators are increasingly asking these questions. Getting ahead of them is straightforward if the system was designed with explainability in mind from the start.',
          'The companies that will find CSV of AI systems difficult are those that bought a capability and are now trying to reverse-engineer documentation for it. The companies that will find it manageable are those that specified the validation approach before selecting the system.',
        ],
      },
    ],
  },
  {
    slug: 'where-ai-reduces-cogs-manufacturing',
    tag: 'AI in Pharma Ops',
    date: 'Mar 2026',
    title: 'Where AI Actually Reduces COGS in Manufacturing',
    excerpt: 'Cutting through the hype to the handful of places AI moves the cost line in regulated production.',
    readTime: '5 min read',
    lede: 'The claims about AI reducing manufacturing costs in pharma range from credible to implausible. The credible ones cluster around a handful of specific use cases. Knowing which is which is the first step to building a business case that holds up.',
    body: [
      {
        heading: 'Three Places AI Moves the Cost Line',
        paragraphs: [
          'Yield optimisation through process analytics is the most consistently evidenced use case. Correlating in-process measurements with final product yield — in fermentation, in downstream processing, in fill-finish — and using predictive models to adjust parameters in near real-time reduces batch failures and improves mean yield. The financial impact is direct and measurable.',
          'Predictive maintenance reduces unplanned downtime in manufacturing environments where equipment failure has an outsized cost impact. The AI contribution is identifying leading indicators of failure before the failure occurs, allowing maintenance to be scheduled at lower cost than emergency repair. The value is highest in high-utilisation, continuous manufacturing settings.',
        ],
      },
      {
        heading: 'Where the Hype Exceeds the Evidence',
        paragraphs: [
          'Autonomous manufacturing — reducing headcount through AI-driven process control — is the most frequently claimed and least frequently realised benefit. Regulatory requirements around human oversight of GMP operations, combined with the validation burden of autonomous control systems, make meaningful headcount reduction through AI a longer-term prospect than vendor pitches suggest.',
          'Quality control automation is similarly constrained by validation requirements and the current state of visual inspection technology. The use cases where AI genuinely accelerates QC — pre-screening, anomaly flagging, data capture — are narrower than the advertised versions.',
        ],
      },
      {
        heading: 'Building a Credible Business Case',
        paragraphs: [
          'A credible COGS reduction case starts with the operational data to support the claim. If you cannot show historical yield variance and correlate it with process parameters, you cannot credibly project yield improvement. The data foundation has to come before the business case, not after it.',
          'The projects that succeed are specific: one product family, one manufacturing step, one well-defined outcome metric. Broad transformation programmes that promise AI-driven COGS reduction across the enterprise tend to diffuse accountability and underdeliver. Start narrow, measure rigorously, extend.',
        ],
      },
    ],
  },
  {
    slug: 'scaling-atmp-operations-without-losing-compliance',
    tag: 'CGT Manufacturing',
    date: 'Feb 2026',
    title: 'Scaling ATMP Operations Without Losing Compliance',
    excerpt: 'The operational decisions that separate a clinical process from a commercial one.',
    readTime: '7 min read',
    lede: 'The gap between a clinical ATMP process and a commercial one is not primarily scientific. It is operational. The decisions made during process development — about data architecture, quality system design, and manufacturing footprint — determine whether scaling up is a controlled exercise or a crisis.',
    body: [
      {
        heading: 'What Changes at Commercial Scale',
        paragraphs: [
          'At clinical scale, a cell therapy process can be managed with institutional knowledge and manual documentation. The team is small, the batch count is low, and the QA review can be thorough because the volume allows it. None of that translates to commercial scale without deliberate redesign.',
          'Commercial scale introduces multiple concurrent batches, reduced time per batch for quality review, multiple manufacturing sites, and the need for supply chain visibility across an end-to-end chain that spans collection sites, logistics partners, and clinical administration. The manual processes that worked at clinical scale become bottlenecks.',
        ],
      },
      {
        heading: 'The Compliance Risk in Rapid Scale-Up',
        paragraphs: [
          'The compliance risk in rapid scale-up is not that companies make decisions they know are wrong — it is that they make decisions under time pressure that they later cannot defend. A deviation management process designed for ten batches a year has no capacity for a hundred batches a year. A chain-of-identity system based on spreadsheets cannot absorb the volume of a commercial programme.',
          'Regulators understand the challenges of scaling novel therapies. What they do not accept is a quality system that was never designed to scale. The inspection questions will be direct: how was this process designed for commercial volumes, and what evidence supports that the controls remain adequate.',
        ],
      },
      {
        heading: 'Designing for Commercial from Clinical',
        paragraphs: [
          'The best time to design commercial-scale quality systems is during clinical development, when there is time to think and the cost of change is low. The decisions are straightforward if made early: what data must be captured electronically, what quality review steps require human judgment and how long do they take at commercial volume, what does the supply chain need to look like.',
          'Companies that treat commercial readiness as a late-stage project find themselves making expensive changes to validated systems under regulatory time pressure. Companies that build for commercial from clinical find the transition is a controlled programme, not a crisis.',
        ],
      },
    ],
  },
  {
    slug: 'senior-led-operating-model-ai-transformation',
    tag: 'Future Biotech Operating Models',
    date: 'Feb 2026',
    title: 'The Senior-Led Operating Model for AI Transformation',
    excerpt: 'Why boutique, principal-delivered engagements outperform large programmes in regulated work.',
    readTime: '6 min read',
    lede: 'Large AI transformation programmes in regulated industries tend to underdeliver for a predictable reason: the people who sell them are not the people who do them. The operational insight required to implement AI in a GMP environment lives at the senior level, and it rarely gets deployed there.',
    body: [
      {
        heading: 'The Bait-and-Switch Problem',
        paragraphs: [
          'Every large consulting engagement in this space follows a similar pattern: senior partners present a compelling vision, a team of junior consultants arrives to execute it. The junior team works hard, produces deliverables, and generates a body of documentation that the client then has to implement themselves. The senior expertise that sold the engagement is mostly absent from the delivery.',
          'In regulated environments, this pattern is not just commercially suboptimal — it is operationally risky. AI implementation in a GMP setting requires deep familiarity with quality system requirements, regulatory expectations, and the specific failure modes of AI in validated environments. That knowledge cannot be transferred from a slide deck.',
        ],
      },
      {
        heading: 'What Principal Delivery Actually Means',
        paragraphs: [
          'Principal delivery means the people with domain expertise are the ones doing the work, not directing it from afar. In practice, this means smaller teams, more direct client contact, and a delivery model where the person who understood the problem during scoping is the person executing the solution.',
          'The constraint is throughput: a principal-led model cannot scale to hundreds of concurrent engagements. The advantage is quality: every engagement benefits from the full depth of expertise the team has, not a filtered version of it.',
        ],
      },
      {
        heading: 'Why Regulated Work Rewards This Model',
        paragraphs: [
          'In regulated environments, the cost of a wrong decision compounds. A quality system designed without adequate understanding of regulatory expectations creates inspection findings. An AI system implemented without proper validation creates a compliance liability. The cost of rework in regulated environments is not just financial — it is reputational and can delay product launches.',
          'The economics of a senior-led model are straightforward for clients who have experienced the alternative. A smaller engagement staffed with principals costs less to deliver in total than a large programme staffed with juniors, because the rework rate is lower. The value is not in the hours — it is in the decisions.',
        ],
      },
    ],
  },
  {
    slug: 'designing-data-integrity-alcoa-plus',
    tag: 'Digital Quality Systems',
    date: 'Jan 2026',
    title: 'Designing Data Integrity for ALCOA+ from Day One',
    excerpt: 'Data integrity is an architecture decision, not an audit response. Designing it in.',
    readTime: '5 min read',
    lede: 'ALCOA+ — attributable, legible, contemporaneous, original, accurate, plus complete, consistent, enduring, and available — is a framework regulators use to assess the reliability of data in GMP environments. Most companies encounter it during an audit. The ones that encounter it during system design have a fundamentally different relationship with inspection readiness.',
    body: [
      {
        heading: 'Why Data Integrity Failures Are Systemic, Not Accidental',
        paragraphs: [
          'Data integrity failures in GMP environments are rarely caused by deliberate falsification. They are caused by systems that make it difficult to do the right thing: paper records that invite backdating, electronic systems without audit trails, processes where contemporaneous documentation is practically impossible given the workload. The failure mode is systemic, and the fix is systemic.',
          'Treating data integrity as a training and culture issue, as many quality programmes do, addresses symptoms. The root cause is usually design: systems and processes that do not make ALCOA+ compliance the path of least resistance.',
        ],
      },
      {
        heading: 'What ALCOA+-Native Design Looks Like',
        paragraphs: [
          'An ALCOA+-native system is one where every data entry is automatically attributed to a specific user and timestamp; where the audit trail is maintained by the system, not the user; where original data is never overwritten, only superseded with a documented reason; and where the complete record is available for the lifetime of the product.',
          'Modern electronic batch records and LIMS systems can deliver all of this. The challenge is configuration and validation, not capability. The design decisions that matter most are made before the system is implemented, not after.',
        ],
      },
      {
        heading: 'The Audit-Ready Organisation',
        paragraphs: [
          'Organisations that design for ALCOA+ from the start find that audit preparation is not a project — it is an ongoing state. Because the data is always attributable, always complete, and always available, responding to a regulatory inquiry is a matter of retrieval, not reconstruction.',
          'The organisations that struggle with data integrity inspections are those that have to explain why records are not contemporaneous, why audit trails are incomplete, or why data exists in multiple inconsistent forms. Designing those problems out is less expensive than explaining them away.',
        ],
      },
    ],
  },
  {
    slug: 'ai-enabled-batch-disposition-promise-guardrails',
    tag: 'AI in Pharma Ops',
    date: 'Jan 2026',
    title: 'AI-Enabled Batch Disposition: Promise and Guardrails',
    excerpt: 'Faster release decisions are possible — with the right human-in-the-loop guardrails.',
    readTime: '6 min read',
    lede: 'Batch disposition is one of the most consequential decisions in pharmaceutical manufacturing, and one of the most time-consuming. AI can make it faster without making it less rigorous — but only if the human-in-the-loop architecture is designed correctly.',
    body: [
      {
        heading: 'The Current State of Batch Disposition',
        paragraphs: [
          'Batch disposition in a conventional manufacturing environment involves collecting test results, reviewing batch records, assessing deviations, and reaching a decision about whether the batch meets specification. In a high-volume operation, this process is a bottleneck: QA capacity is the constraint, not the science.',
          'AI can compress the pre-review work significantly. Automated compilation of test results, specification verification, deviation flagging, and documentation completeness checking can reduce the time a QA professional spends on preparation before the actual disposition decision. The decision itself remains human.',
        ],
      },
      {
        heading: 'Where the Guardrails Must Be',
        paragraphs: [
          'The risk in AI-assisted disposition is automation complacency: reviewers who over-rely on model outputs without exercising independent judgment. Preventing this requires workflow design that forces engagement, not just sign-off. The model\'s output should be a structured review package, not a recommendation — the human reviewer reaches the conclusion, they do not ratify the model\'s.',
          'Any deviation flagged by the model that is dismissed must require documented justification. Any specification result that falls outside historical norms, even if it meets specification, should be reviewed with additional attention. The model\'s role is to surface these situations; the reviewer\'s role is to assess them.',
        ],
      },
      {
        heading: 'What Regulators Expect',
        paragraphs: [
          'Current regulatory guidance does not endorse autonomous AI-driven batch disposition. It does not prohibit AI assistance in the disposition process. The distinction matters: AI tools that support the QA reviewer in preparing for a disposition decision are consistent with existing frameworks. AI tools that attempt to make the disposition decision are not.',
          'The validation package for an AI-assisted disposition tool must demonstrate that the tool\'s assistance improves the quality of the review, not just its speed. Performance metrics — time to disposition, detection rate for specification excursions, reviewer override frequency — should be tracked and reported as part of the quality system.',
        ],
      },
    ],
  },
] as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  const title = `${article.title} | DigiSci Insights`;
  return {
    title,
    description: article.excerpt,
    openGraph: {
      type: 'article',
      url: `/insights/${slug}`,
      title,
      description: article.excerpt,
    },
  };
}

export function generateStaticParams(): Params[] {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = [
    ...ARTICLES.filter((a) => a.slug !== slug && a.tag === article.tag),
    ...ARTICLES.filter((a) => a.slug !== slug && a.tag !== article.tag),
  ].slice(0, 3);

  return (
    <main>

      {/* Article header */}
      <section
        aria-label="Article header"
        style={{ backgroundImage: 'var(--grid-bg)', backgroundSize: 'var(--grid-bg-size)' }}
        className="relative border-b border-[var(--border-subtle)] overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-200px] right-[-140px] w-[560px] h-[560px] bg-[radial-gradient(circle,var(--blue-glow),transparent_62%)]"
        />
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
            <span>{article.date}</span>
            <span className="text-[var(--border-default)]">·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article
        aria-label="Article body"
        className="border-b border-[var(--border-subtle)]"
      >
        <div className="max-w-[700px] mx-auto px-6 py-16">
          <p className="font-serif text-[1.25rem] leading-[1.7] text-[var(--text-primary)] mb-10">
            {article.lede}
          </p>
          {article.body.map((section, i) => (
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
          ))}
        </div>
      </article>

      {/* Share article */}
      <section
        aria-label="Share article"
        className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]"
      >
        <div className="max-w-[700px] mx-auto px-6 py-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
              Share this article
            </span>
          </div>
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
      <section
        aria-label="Related articles"
        className="border-b border-[var(--border-subtle)]"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16">
          <Eyebrow rule>Related</Eyebrow>
          <h2 className="font-sans font-semibold text-[1.75rem] leading-[1.2] tracking-[-0.02em] mt-4 mb-10">
            Continue Reading
          </h2>
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

      {/* Subscribe */}
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
              <label htmlFor="article-subscribe-email" className="sr-only">Work email</label>
              <input
                id="article-subscribe-email"
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
