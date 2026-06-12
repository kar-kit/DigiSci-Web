import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Calendar, Route, Cpu, Database, TrendingUp, Layers, ShieldCheck, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { Stat } from '@/components/ui/Stat';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { sanityFetch } from '@/lib/sanity/client';
import { homePageQuery, allCaseStudiesQuery, allArticlesQuery } from '@/lib/sanity/queries';
import type { HomePage, CaseStudyListItem, ArticleListItem } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'DigiSci — AI for Biotech & Pharma Operations',
  description: 'Senior-led AI strategy, digital quality systems, and manufacturing transformation for biotech and pharmaceutical operations leaders.',
  openGraph: {
    type: 'website',
    url: '/',
    title: 'DigiSci — AI for Biotech & Pharma Operations',
    description: 'Senior-led AI strategy, digital quality systems, and manufacturing transformation for biotech and pharmaceutical operations leaders.',
  },
};

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean; className?: string }>> = {
  'layers': Layers, 'cpu': Cpu, 'shield-check': ShieldCheck, 'compass': Compass,
  'route': Route, 'database': Database, 'trending-up': TrendingUp,
};

const FALLBACK_PILLARS = [
  { n: '01', iconKey: 'layers',       title: 'Domain Depth',         body: 'Years inside advanced-therapy manufacturing and pharmaceutical quality — not a framework learned for the engagement.' },
  { n: '02', iconKey: 'cpu',          title: 'AI Transformation',    body: 'Implementation-grade AI fluency: where it creates value, where it does not, and how to ship it.' },
  { n: '03', iconKey: 'shield-check', title: 'Regulatory Awareness', body: 'GxP, CSV, ALCOA+ and Part 11 considered from the first design decision, not bolted on at audit.' },
  { n: '04', iconKey: 'compass',      title: 'Strategic Clarity',    body: 'Senior-led judgement that separates the real constraint from the one in the deck.' },
];

const FALLBACK_SERVICES = [
  { iconKey: 'route',       title: 'AI Transformation Strategy',        body: 'Define where AI creates real value in a regulated environment.',        points: ['Opportunity assessment', 'Transformation roadmap', 'Executive alignment'] },
  { iconKey: 'cpu',         title: 'AI Implementation Programmes',      body: 'Build, deploy and validate AI systems within GMP.',                     points: ['AI-enabled QMS design', 'Manufacturing analytics', 'Validation support'] },
  { iconKey: 'database',    title: 'Digital Operations Transformation',  body: 'Modernise data infrastructure beyond paper and legacy systems.',         points: ['Data architecture', 'KPI frameworks', 'Digital MBR / EBR'] },
  { iconKey: 'trending-up', title: 'Operational Excellence',             body: 'Manufacturing performance and quality modernisation.',                   points: ['COGS reduction', 'Process optimisation', 'Quality systems'] },
];

const FALLBACK_CRED_TAGS = [
  'Cell & Gene Therapy', 'Pharma Manufacturing', 'GxP Quality Systems',
  'AI Strategy', 'Digital Operations', 'Regulated Environments', 'CDMO',
];

const FALLBACK_CASE_STUDIES: CaseStudyListItem[] = [
  { slug: 'ai-regulatory-documentation-platform', sector: 'Biopharmaceutical',    service: 'AI Implementation', client: 'Global Life Sciences Consulting Firm · Regulatory Affairs', title: 'AI-Enabled Regulatory Documentation Platform',            outcome: 'CTD drafting accelerated' },
  { slug: 'digital-pqs-blueprint',                sector: 'Cell & Gene Therapy',  service: 'AI Strategy',       client: 'Emerging Biotech (Advanced Therapies)',                       title: 'Digital Pharmaceutical Quality System Blueprint',          outcome: 'Inspection-ready roadmap' },
  { slug: 'manufacturing-data-architecture-cgt',  sector: 'Cell & Gene Therapy',  service: 'Digital Ops',       client: 'Cell & Gene Therapy Development Company',                    title: 'Manufacturing Data Architecture for Cell Therapy Operations', outcome: 'Unified operational data layer' },
];

const FALLBACK_INSIGHTS: Partial<ArticleListItem>[] = [
  { tag: 'AI in Pharma Ops',  date: '2026-05-01', title: 'The Future of AI in Biopharmaceutical Quality Systems', readTime: '8 min', slug: 'future-ai-biopharmaceutical-quality-systems' },
  { tag: 'CGT Manufacturing', date: '2026-04-01', title: 'The Digital Future of Cell Therapy Manufacturing',      readTime: '6 min', slug: 'digital-future-cell-therapy-manufacturing' },
  { tag: 'Digital Quality',   date: '2026-04-01', title: 'AI and Regulatory Documentation in GMP Environments',  readTime: '7 min', slug: 'ai-regulatory-documentation-gmp' },
];

export default async function HomePage() {
  const [page, caseStudies, articles] = await Promise.all([
    sanityFetch<HomePage>(homePageQuery),
    sanityFetch<CaseStudyListItem[]>(allCaseStudiesQuery),
    sanityFetch<ArticleListItem[]>(allArticlesQuery),
  ]);

  const pillars    = page?.pillars    ?? FALLBACK_PILLARS;
  const services   = page?.services   ?? FALLBACK_SERVICES;
  const credTags   = page?.credTags   ?? FALLBACK_CRED_TAGS;
  const hero       = page?.hero;
  const indCtx     = page?.industryContext;
  const vp         = page?.valueProposition;
  const cta        = page?.cta;
  const CASE_STUDIES    = (caseStudies ?? FALLBACK_CASE_STUDIES).slice(0, 3);
  const displayInsights = (articles   ?? FALLBACK_INSIGHTS).slice(0, 3);

  const heroStats = hero?.stats ?? [
    { value: '40', unit: '%', label: 'Cycle-time reduction' },
    { value: '3.2', unit: '×', label: 'Faster tech transfer' },
  ];

  return (
    <main>

      {/* §02 Hero */}
      <section
        aria-label="Hero"
        style={{ backgroundImage: 'var(--grid-bg)', backgroundSize: 'var(--grid-bg-size)' }}
        className="relative overflow-hidden border-b border-[var(--border-subtle)]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute top-[-200px] right-[-140px] w-[560px] h-[560px] bg-[radial-gradient(circle,var(--blue-glow),transparent_62%)]" />
        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-[128px] pb-20">
          <div className="grid grid-cols-1 gap-10 items-start md:grid-cols-[1.35fr_1fr] md:gap-[80px]">
            <div>
              <Eyebrow rule>{hero?.eyebrow ?? 'AI-Native Consulting · Biotech & Pharma'}</Eyebrow>
              <h1 className="font-sans font-semibold text-[clamp(4rem,4.5vw,5.25rem)] leading-[1.08] tracking-[-0.02em] mt-5 mb-5 max-w-[16ch]">
                {hero?.heading ?? 'AI-Native Transformation for'}{' '}
                <span className="text-[var(--accent)]">{hero?.accentText ?? 'Biotech Operations.'}</span>
              </h1>
              <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] max-w-[46em] mb-8">
                {hero?.body ?? 'DigiSci is a senior-led boutique consultancy bringing artificial intelligence to cell & gene therapy manufacturing, pharmaceutical operations, and regulated quality systems — where deep domain experience and AI capability are held in the same mind.'}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Tag variant="sector" dot>Cell &amp; Gene Therapy</Tag>
                <Tag variant="sector">Pharma Operations</Tag>
                <Tag variant="accent">AI Systems</Tag>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" as="a" href="/contact" iconRight={<Calendar size={17} />}>Book a Discovery Call</Button>
                <Button variant="secondary" size="lg" as="a" href="/services" iconRight={<ArrowUpRight size={17} />}>Explore Services</Button>
              </div>
            </div>
            <aside aria-label="Operational readiness model" className="bg-[var(--surface-raised)] border border-[var(--border-default)] rounded-[4px] p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-secondary)]">Operational readiness · model</span>
                <span className="inline-flex items-center gap-[7px] font-mono text-[0.6875rem] tracking-[0.04em] text-[var(--color-green-400)]">
                  <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-green-500)] shadow-[0_0_8px_var(--color-green-500)]" />Live
                </span>
              </div>
              <svg viewBox="0 0 320 120" preserveAspectRatio="none" className="w-full h-[120px] block mb-5" aria-hidden="true">
                <polyline points="0,96 40,90 80,92 120,78 160,80 200,58 240,52 280,30 320,18" fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <polyline points="0,104 40,100 80,101 120,95 160,96 200,88 240,86 280,80 320,76" fill="none" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="grid grid-cols-2 gap-5 border-t border-[var(--border-subtle)] pt-5">
                {heroStats.map(s => <Stat key={s.label} value={s.value} unit={s.unit} label={s.label} size="sm" />)}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* §03 Industry Context */}
      <section aria-label="Industry context" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-32 grid grid-cols-1 gap-16 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <Eyebrow rule index="01">Industry context</Eyebrow>
            <h2 className="font-sans font-semibold text-[2.25rem] leading-[1.1] tracking-[-0.02em] mt-4">
              {indCtx?.heading ?? 'The biotech industry is at an operational inflection point.'}
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            {(indCtx?.paragraphs ?? [
              'Cell & gene therapies and other advanced modalities introduce manufacturing and quality challenges with little precedent — patient-specific production, fragile supply chains, short shelf lives, and regulatory frameworks still being written.',
              'Artificial intelligence offers transformative potential across these operations. But implementation inside regulated environments demands governance, validation and domain judgement rarely found in technology consultancies.',
            ]).map((p, i) => (
              <p key={i} className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)]">{p}</p>
            ))}
            <p className="font-sans text-[1.75rem] leading-[1.45] text-[var(--text-primary)] font-medium mt-6">
              {indCtx?.pullQuote ?? 'DigiSci Consulting exists to'}{' '}
              <b className="text-[var(--accent)] font-semibold">{indCtx?.accentText ?? 'bridge this gap.'}</b>
            </p>
          </div>
        </div>
      </section>

      {/* §04 Credibility Bar */}
      <section aria-label="Operating sectors" className="bg-[var(--surface-sunken)] border-t border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-10 flex flex-wrap items-center justify-center gap-3">
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] mr-4 shrink-0">Operating across</span>
          {credTags.map((t, i) => <Tag key={t} variant={i < 3 ? 'sector' : 'default'}>{t}</Tag>)}
        </div>
      </section>

      {/* §05 Value Proposition */}
      <section aria-label="Value proposition" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 grid grid-cols-1 gap-16 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <Eyebrow rule index="02">{vp?.eyebrow ?? 'Why DigiSci'}</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[14ch]">
              {vp?.heading ?? 'Operational expertise meets AI capability.'}
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4">
              {vp?.body ?? "Most AI consultancies lack regulated-environment depth. Most biotech specialists lack AI fluency. DigiSci holds both."}
            </p>
            <p className="font-sans text-[1.75rem] leading-[1.45] text-[var(--text-primary)] mt-10 max-w-[30ch]">
              {vp?.pullQuote ?? 'We work with a small number of clients at any one time — not slide decks.'}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pillars.map(({ n, iconKey, title, body }) => {
              const Icon = ICON_MAP[iconKey] ?? Layers;
              return (
                <div key={n} className="flex flex-col gap-3 bg-[var(--surface-raised)] border border-[var(--border-subtle)] p-10">
                  <Icon size={26} aria-hidden className="text-[var(--accent)] mb-2" />
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-[var(--text-accent)]">{n}</span>
                  <h3 className="font-sans font-semibold text-[1.375rem] text-[var(--text-primary)]">{title}</h3>
                  <p className="font-serif text-base leading-[1.65] text-[var(--text-secondary)]">{body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* §06 Services */}
      <section aria-label="Services" className="bg-[var(--surface-sunken)] border-t border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-[44rem] mb-12">
            <Eyebrow rule index="03">What we do</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4">Four focused service lines.</h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4">Recognise your problem here and you arrive at the right conversation faster.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {services.map(({ iconKey, title, body, points }) => {
              const Icon = ICON_MAP[iconKey] ?? Route;
              return (
                <Card key={title} ruled interactive>
                  <Icon size={26} aria-hidden className="text-[var(--accent)] mb-6 shrink-0" />
                  <h3 className="font-sans font-semibold text-[1.75rem] tracking-[-0.02em] text-[var(--text-primary)] mb-3">{title}</h3>
                  <p className="font-serif text-base leading-[1.65] text-[var(--text-secondary)] mb-6">{body}</p>
                  <ul className="flex flex-col gap-2 mb-6">
                    {points.map(pt => (
                      <li key={pt} className="flex items-baseline gap-[10px] font-sans text-sm text-[var(--text-secondary)]">
                        <span aria-hidden className="w-[5px] h-[5px] bg-[var(--accent)] shrink-0 self-start mt-[7px]" />{pt}
                      </li>
                    ))}
                  </ul>
                  <Link href="/services" className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.04em] text-[var(--text-accent)] hover:gap-3 transition-[gap] duration-[120ms] mt-auto" aria-label={`Learn more about ${title}`}>
                    Learn more <ArrowRight size={15} aria-hidden />
                  </Link>
                </Card>
              );
            })}
          </div>
          <div className="mt-10"><Button variant="secondary" as="a" href="/services" iconRight={<ArrowRight size={16} />}>View all services</Button></div>
        </div>
      </section>

      {/* §06.5 Case Studies */}
      <section aria-label="Case studies" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-[44rem] mb-12">
            <Eyebrow rule>Client work</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4">Three recent engagements.</h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4">Client details are anonymised in line with confidentiality commitments.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {CASE_STUDIES.map(({ slug, sector, service, client, title, outcome }) => (
              <article key={slug} className="flex flex-col gap-4 bg-[var(--navy-800)] border border-[var(--border-default)] p-8">
                <div className="flex flex-wrap gap-2">
                  <Tag variant="sector" dot>{sector}</Tag>
                  <Tag variant="accent">{service}</Tag>
                </div>
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">{client}</span>
                <h3 className="font-sans font-semibold text-[1.25rem] leading-snug tracking-[-0.01em] text-[var(--text-primary)] flex-1">{title}</h3>
                <div>
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)] block mb-1">Outcome</span>
                  <span className="font-sans text-[1.125rem] font-semibold text-[var(--accent)] leading-[1.15]">{outcome}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10"><Button variant="secondary" as="a" href="/case-studies" iconRight={<ArrowRight size={16} />}>View all case studies</Button></div>
        </div>
      </section>

      {/* §07 Insights */}
      <section aria-label="Insights" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-[44rem] mb-12">
            <Eyebrow rule index="04">Insights</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4">Perspectives on AI-enabled biotech operations.</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {displayInsights.map(({ tag, date, title, readTime, slug }) => (
              <Link key={slug} href={`/insights/${slug}`} className="flex flex-col gap-3 bg-[var(--surface-raised)] border border-[var(--border-subtle)] p-8 hover:border-[var(--border-strong)] transition-colors duration-[180ms]">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag variant="default">{tag}</Tag>
                  <span className="font-mono text-[0.6875rem] tracking-[0.04em] text-[var(--text-tertiary)]">{date ? new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : ''}</span>
                </div>
                <h3 className="font-sans font-semibold text-[1.375rem] leading-snug tracking-[-0.01em] text-[var(--text-primary)] flex-1">{title}</h3>
                <span className="font-mono text-[0.6875rem] tracking-[0.04em] text-[var(--text-accent)] mt-auto">{readTime}<span> read →</span></span>
              </Link>
            ))}
          </div>
          <div className="mt-10"><Button variant="ghost" as="a" href="/insights" iconRight={<ArrowRight size={16} />}>View all insights</Button></div>
        </div>
      </section>

      {/* §08 CTA Band */}
      <section aria-label="Call to action" className="bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)] [background-image:var(--grid-bg)] [background-size:48px_48px]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow rule>{cta?.eyebrow ?? 'Start a conversation'}</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[18ch]">
              {cta?.heading ?? 'Working on an operational transformation challenge?'}
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4 max-w-[40ch]">
              {cta?.body ?? 'We work with a small number of biotech and pharmaceutical organisations at any one time.'}
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button variant="primary" size="lg" as="a" href="/contact" iconRight={<ArrowRight size={17} />}>Book a Discovery Call</Button>
            <Button variant="secondary" size="lg" as="a" href="/contact">Send an Enquiry</Button>
          </div>
        </div>
      </section>

    </main>
  );
}
