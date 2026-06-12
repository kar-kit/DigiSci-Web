import type { MetadataRoute } from 'next';

const BASE = 'https://digisci.solutions';

const STATIC_ROUTES = [
  { path: '/',             changeFrequency: 'monthly',  priority: 1.0 },
  { path: '/about',        changeFrequency: 'monthly',  priority: 0.8 },
  { path: '/services',     changeFrequency: 'monthly',  priority: 0.9 },
  { path: '/industry',     changeFrequency: 'monthly',  priority: 0.8 },
  { path: '/case-studies', changeFrequency: 'weekly',   priority: 0.9 },
  { path: '/insights',     changeFrequency: 'weekly',   priority: 0.9 },
  { path: '/contact',      changeFrequency: 'monthly',  priority: 0.7 },
] as const;

const CASE_STUDY_SLUGS = [
  'ai-regulatory-documentation-platform',
  'digital-pqs-blueprint',
  'manufacturing-data-architecture-cgt',
] as const;

const ARTICLE_SLUGS = [
  'future-ai-biopharmaceutical-quality-systems',
  'ai-regulatory-documentation-gmp',
  'digital-future-cell-therapy-manufacturing',
  'operational-data-strategic-asset-biotech',
  'validating-ai-systems-csv-gamp5',
  'where-ai-reduces-cogs-manufacturing',
  'scaling-atmp-operations-without-losing-compliance',
  'senior-led-operating-model-ai-transformation',
  'designing-data-integrity-alcoa-plus',
  'ai-enabled-batch-disposition-promise-guardrails',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${BASE}${path}`,
      changeFrequency,
      priority,
    })
  );

  const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDY_SLUGS.map((slug) => ({
    url: `${BASE}/case-studies/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = ARTICLE_SLUGS.map((slug) => ({
    url: `${BASE}/insights/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...caseStudyEntries, ...articleEntries];
}
