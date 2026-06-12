import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';
import { sanityFetch } from '@/lib/sanity/client';
import { caseStudyBySlugQuery, allCaseStudySlugsQuery } from '@/lib/sanity/queries';
import type { CaseStudyFull } from '@/lib/sanity/types';

type Params = { slug: string };

const HARDCODED_CASE_STUDIES: CaseStudyFull[] = [
  {
    slug:    'ai-regulatory-documentation-platform',
    sector:  'Biopharmaceutical',
    service: 'AI Implementation',
    client:  'Global Life Sciences Consulting Firm · Regulatory Affairs',
    title:   'AI-Enabled Regulatory Documentation Platform',
    outcome: 'CTD drafting accelerated',
    context: 'A global life sciences consulting firm with a large regulatory affairs practice needed to scale its CTD documentation capacity without proportionally scaling headcount — critical for a pipeline of concurrent biologics submissions.',
    challenge: { heading: 'The problem with regulatory documentation at scale.', body: 'Regulatory submissions for biologics require extensive CTD documentation — highly labour-intensive and accuracy-critical, with little room for error. Manual processes created bottlenecks, inconsistency across modules, and knowledge locked in individual contributors rather than the practice.' },
    approach:  { heading: 'AI-enabled documentation — with humans in the loop.', body: 'DigiSci designed and delivered an AI-enabled regulatory documentation platform: structured CTD templates, a curated regulatory knowledge base, AI drafting workflows, citation and traceability mechanisms, and expert-in-the-loop review. The system was built to preserve regulatory defensibility — not to replace regulatory expertise.' },
    impact:    { heading: 'Accelerated capacity, consistent quality.', body: 'Accelerated drafting across CTD modules, improved consistency across the practice, enhanced knowledge reuse across submissions, and a scalable delivery capability. The firm can now handle a larger submission volume with the same senior team — the AI handles the first draft, the experts handle judgement.' },
  },
  {
    slug:    'digital-pqs-blueprint',
    sector:  'Cell & Gene Therapy',
    service: 'AI Strategy',
    client:  'Emerging Biotech (Advanced Therapies)',
    title:   'Digital Pharmaceutical Quality System Blueprint',
    outcome: 'Inspection-ready roadmap',
    context: 'An emerging biotech entering late-stage clinical development in advanced therapies. The company had grown rapidly, with quality processes that were document-driven and fragmented across systems — adequate for early-stage but not for the demands of commercial-scale operations.',
    challenge: { heading: "Quality systems built for early-stage don't survive commercialisation.", body: 'Preparing for late-stage clinical development and commercialisation with document-driven, fragmented quality processes. Leadership needed a modern digital PQS, inspection-ready at commercial scale — but without a clear picture of what that looked like or how to get there.' },
    approach:  { heading: 'A blueprint before a build.', body: 'A PQS transformation assessment across process architecture, GxP alignment, system landscape and scalability — culminating in a Digital PQS Blueprint with digital quality architecture, integrated workflows, governance and validation strategy, and a phased roadmap.' },
    impact:    { heading: 'Clarity, alignment, and a path to inspection readiness.', body: 'A clear roadmap aligned to regulatory expectations, improved inspection readiness across quality functions, and leadership alignment on the target digital quality architecture.' },
  },
  {
    slug:    'manufacturing-data-architecture-cgt',
    sector:  'Cell & Gene Therapy',
    service: 'Digital Ops',
    client:  'Cell & Gene Therapy Development Company',
    title:   'Manufacturing Data Architecture for Cell Therapy Operations',
    outcome: 'Unified operational data layer',
    context: 'A cell and gene therapy development company operating across autologous manufacturing, quality control, and supply chain — with data spread across disconnected lab, manufacturing and quality systems. The company was operationally effective but analytically blind.',
    challenge: { heading: 'Data everywhere, insight nowhere.', body: 'Large data volumes across lab, manufacturing and quality systems with no integrated architecture — limiting the ability to identify process trends, support batch disposition, or build an AI-ready foundation.' },
    approach:  { heading: 'Architecture before automation.', body: 'DigiSci designed a Manufacturing Data Architecture Framework: data mapping across production, quality and lab systems, an integration architecture for a unified operational data layer, analytics architecture for batch analysis and KPI monitoring, and a governance framework for data integrity and audit trails aligned to GxP expectations.' },
    impact:    { heading: 'An operational data layer that supports AI.', body: 'Integrated data visibility across manufacturing, quality and lab functions, a foundation for AI-enabled analytics, enhanced trend identification across batches, and scalable, regulatory-aligned infrastructure.' },
  },
];

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cms = await sanityFetch<CaseStudyFull>(caseStudyBySlugQuery, { slug });
  const study = cms ?? HARDCODED_CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) return {};
  const title = `${study.title} | DigiSci Case Study`;
  const description = `${study.outcome} — ${study.client}. A DigiSci case study in ${study.sector}.`;
  return {
    title,
    description,
    openGraph: { type: 'article', url: `/case-studies/${slug}`, title, description },
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await sanityFetch<string[]>(allCaseStudySlugsQuery);
  const cmsParams = (slugs ?? []).map((s) => ({ slug: s }));
  const hardcodedParams = HARDCODED_CASE_STUDIES.map(({ slug }) => ({ slug }));
  const all = [...cmsParams, ...hardcodedParams];
  return all.filter((p, i) => all.findIndex((x) => x.slug === p.slug) === i);
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cms = await sanityFetch<CaseStudyFull>(caseStudyBySlugQuery, { slug });
  const study = cms ?? HARDCODED_CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  const { sector, service, client, title, outcome, context, challenge, approach, impact } = study;

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
          <div className="mb-4">
            <Button variant="secondary" size="sm" as="a" href="/case-studies">← All case studies</Button>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            <Tag variant="sector" dot>{sector}</Tag>
            <Tag variant="accent">{service}</Tag>
          </div>
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mb-3">{client}</p>
          <h1 className="font-sans font-semibold text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.08] tracking-[-0.02em] mt-0 mb-4 max-w-[26ch]">{title}</h1>
          <p className="font-sans text-sm text-[var(--accent)]">Outcome: {outcome}</p>
        </div>
      </section>

      {/* Client context */}
      <section aria-label="Client context" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
          <div><Eyebrow rule>Context</Eyebrow></div>
          <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">{context}</p>
        </div>
      </section>

      {/* Challenge */}
      <section aria-label="Challenge" className="bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
          <div><Eyebrow rule>Challenge</Eyebrow></div>
          <div>
            <h2 className="font-sans font-semibold text-[1.75rem] leading-[1.2] tracking-[-0.02em] mb-5 max-w-[30ch]">{challenge.heading}</h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">{challenge.body}</p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section aria-label="Approach" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
          <div><Eyebrow rule>Approach</Eyebrow></div>
          <div>
            <h2 className="font-sans font-semibold text-[1.75rem] leading-[1.2] tracking-[-0.02em] mb-5 max-w-[30ch]">{approach.heading}</h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">{approach.body}</p>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section aria-label="Impact" className="bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
          <div><Eyebrow rule>Impact</Eyebrow></div>
          <div>
            <h2 className="font-sans font-semibold text-[1.75rem] leading-[1.2] tracking-[-0.02em] mb-5 max-w-[30ch]">{impact.heading}</h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">{impact.body}</p>
            <p className="font-sans font-medium text-[var(--accent)] mt-6">{outcome}</p>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section aria-label="Call to action" className="bg-[var(--navy-850)] border-t border-[var(--border-default)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow rule>Late-stage evaluation</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[22ch]">See your own problem in this?</h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4 max-w-[40ch]">
              A buyer who reads a full case study has already visualised their challenge. Let&apos;s discuss yours.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 sm:flex-row">
            <Button variant="primary" size="lg" as="a" href="/contact" iconRight={<ArrowRight size={17} />}>Book a Discovery Call</Button>
            <Button variant="secondary" size="lg" as="a" href="/case-studies">View All Case Studies</Button>
          </div>
        </div>
      </section>

    </main>
  );
}
