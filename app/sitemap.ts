import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/lib/sanity/client';
import { articlesSitemapQuery, caseStudiesSitemapQuery } from '@/lib/sanity/queries';

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

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cmsArticles, cmsCaseStudies] = await Promise.all([
    sanityFetch<{ slug: string; lastmod: string }[]>(articlesSitemapQuery),
    sanityFetch<{ slug: string }[]>(caseStudiesSitemapQuery),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${BASE}${path}`,
      changeFrequency,
      priority,
    })
  );

  const caseStudySlugs: string[] = cmsCaseStudies
    ? [...new Set([...cmsCaseStudies.map((c) => c.slug), ...CASE_STUDY_SLUGS])]
    : [...CASE_STUDY_SLUGS];

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${BASE}/case-studies/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const articleSlugs: string[] = cmsArticles
    ? [...new Set([...cmsArticles.map((a) => a.slug), ...ARTICLE_SLUGS])]
    : [...ARTICLE_SLUGS];

  const cmsDateMap = new Map(cmsArticles?.map((a) => [a.slug, a.lastmod]) ?? []);

  const articleEntries: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${BASE}/insights/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    ...(cmsDateMap.has(slug) ? { lastModified: cmsDateMap.get(slug) } : {}),
  }));

  return [...staticEntries, ...caseStudyEntries, ...articleEntries];
}
