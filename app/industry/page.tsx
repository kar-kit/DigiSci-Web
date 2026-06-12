import type { Metadata } from 'next';
import { ArrowRight, Check, Dna, Factory, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';
import { sanityFetch } from '@/lib/sanity/client';
import { industryPageQuery } from '@/lib/sanity/queries';
import type { IndustryPage } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'Industry Expertise | CGT & Pharma AI | DigiSci',
  description: 'Deep sector knowledge across cell and gene therapy, pharmaceutical manufacturing, and AI in regulated environments. Built from operational experience.',
  openGraph: {
    type: 'website',
    url: '/industry',
    title: 'Industry Expertise | CGT & Pharma AI | DigiSci',
    description: 'Deep sector knowledge across cell and gene therapy, pharmaceutical manufacturing, and AI in regulated environments. Built from operational experience.',
  },
};

const FALLBACK_CGT = {
  eyebrow: 'Sector',
  heading: 'Cell & Gene Therapy',
  body: ['Advanced therapies introduce manufacturing and quality challenges with no precedent in conventional pharma — patient-specific production, complex supply chains, short shelf lives, and immature regulatory frameworks.', 'DigiSci works at this frontier, where operational design and regulatory strategy cannot be separated.'],
  tags: ['Patient-specific mfg', 'ATMP regulations', 'Chain of identity', 'GMP cell therapy'],
  capabilities: ['CGT manufacturing process & quality system design', 'Manufacturing scale-up strategy', 'AI-enabled batch disposition', 'Digital MBR & chain of identity / custody systems'],
};

const FALLBACK_PHARMA = {
  eyebrow: 'Sector',
  heading: 'Pharmaceutical Manufacturing',
  body: ['Transformation across manufacturing, quality, and regulatory functions must be aligned — separate programmes rarely produce durable outcomes.', 'DigiSci works across this boundary, treating data, process and compliance as one system.'],
  tags: ['Small-molecule & biologics', 'Quality systems', 'Data architecture', 'PAT'],
  capabilities: ['Manufacturing data infrastructure', 'Operational analytics & KPI design', 'Digital quality system transformation', 'AI-enabled PAT integration'],
};

const FALLBACK_AI_REGULATED = {
  eyebrow: 'Sector',
  heading: 'AI in Regulated Environments',
  body: ['Applying AI in regulated industries requires governance, validation and risk-management frameworks that satisfy regulatory expectations.', 'DigiSci bridges AI capability and regulatory compliance — so a model is not just accurate, but defensible.'],
  tags: ['GxP', 'CSV', 'ALCOA+', '21 CFR Part 11', 'EU Annex 11', 'GAMP 5', 'ICH E6'],
  capabilities: ['AI governance frameworks for regulated environments', 'CSV & computer system validation for AI systems', 'Data integrity design aligned with ALCOA+', 'Regulatory strategy for AI-enabled quality systems'],
};

function SectorSection({
  label,
  Icon,
  index,
  data,
  cta,
}: {
  label: string;
  Icon: React.ComponentType<{ size?: number; 'aria-hidden'?: boolean; className?: string }>;
  index: string;
  data: typeof FALLBACK_CGT;
  cta: { href: string; label: string };
}) {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20 md:items-start">
      <div>
        <Eyebrow rule index={index}>{data.eyebrow}</Eyebrow>
        <div className="flex items-center gap-3 mt-4 mb-5">
          <Icon size={28} className="text-[var(--accent)] shrink-0" aria-hidden />
          <h2 className="font-sans font-semibold text-[2.5rem] leading-[1.1] tracking-[-0.02em]">{data.heading}</h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {data.tags.map((t) => <Tag key={t} variant="sector">{t}</Tag>)}
        </div>
        <div className="flex flex-col gap-4">
          {(Array.isArray(data.body) ? data.body : [data.body]).map((p, i) => (
            <p key={i} className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">{p}</p>
          ))}
        </div>
      </div>
      <div>
        <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] block mb-5">Capabilities</span>
        <ul className="list-none p-0 m-0 flex flex-col gap-4">
          {data.capabilities.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check size={14} aria-hidden className="text-[var(--accent)] shrink-0 mt-[3px]" />
              <span className="font-sans text-base text-[var(--text-secondary)]">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button variant="secondary" size="sm" as="a" href={cta.href}>{cta.label}</Button>
        </div>
      </div>
    </div>
  );
}

export default async function IndustryPage() {
  const cms = await sanityFetch<IndustryPage>(industryPageQuery);

  const cgtData = cms?.cgt ? {
    eyebrow: cms.cgt.eyebrow,
    heading: cms.cgt.heading,
    body: [cms.cgt.body],
    tags: cms.cgt.tags,
    capabilities: cms.cgt.capabilities,
  } : FALLBACK_CGT;

  const pharmaData = cms?.pharma ? {
    eyebrow: cms.pharma.eyebrow,
    heading: cms.pharma.heading,
    body: [cms.pharma.body],
    tags: cms.pharma.tags,
    capabilities: cms.pharma.capabilities,
  } : FALLBACK_PHARMA;

  const aiData = cms?.aiRegulated ? {
    eyebrow: cms.aiRegulated.eyebrow,
    heading: cms.aiRegulated.heading,
    body: [cms.aiRegulated.body],
    tags: cms.aiRegulated.tags,
    capabilities: cms.aiRegulated.capabilities,
  } : FALLBACK_AI_REGULATED;

  const hero = cms?.hero;

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
          <Eyebrow rule>Industry Expertise</Eyebrow>
          <h1 className="font-sans font-semibold text-[clamp(2.25rem,3.5vw,4rem)] leading-[1.08] tracking-[-0.02em] mt-5 mb-5 max-w-[22ch]">
            {hero?.heading ?? 'Deep Expertise Across Biotech and Pharmaceutical Operations'}
          </h1>
          <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] max-w-[52em]">
            {hero?.body ?? "DigiSci operates in sectors where operational complexity, regulatory rigour, and technological transformation are most acute. Our work is grounded in practical experience — not generic consulting frameworks."}
          </p>
        </div>
      </section>

      {/* §01 Cell & Gene Therapy */}
      <section aria-label="Cell and Gene Therapy expertise" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <SectorSection label="Cell and Gene Therapy" Icon={Dna} index="01" data={cgtData} cta={{ href: '/case-studies', label: 'View related case studies' }} />
        </div>
      </section>

      {/* §02 Pharmaceutical Manufacturing */}
      <section aria-label="Pharmaceutical Manufacturing expertise" className="bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <SectorSection label="Pharmaceutical Manufacturing" Icon={Factory} index="02" data={pharmaData} cta={{ href: '/case-studies', label: 'View related case studies' }} />
        </div>
      </section>

      {/* §03 AI in Regulated Environments */}
      <section aria-label="AI in Regulated Environments expertise" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <SectorSection label="AI in Regulated Environments" Icon={ShieldCheck} index="03" data={aiData} cta={{ href: '/services', label: 'View related services' }} />
        </div>
      </section>

      {/* CTA Band */}
      <section aria-label="Call to action" className="bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow rule>Sector-specific</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[22ch]">Tell us where your sector breaks.</h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4 max-w-[40ch]">
              We&apos;ll route the conversation to the relevant work — not a generic contact form.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button variant="primary" size="lg" as="a" href="/contact" iconRight={<ArrowRight size={17} />}>Discuss Your Sector Challenge</Button>
            <Button variant="secondary" size="lg" as="a" href="/services">View Services</Button>
          </div>
        </div>
      </section>

    </main>
  );
}
