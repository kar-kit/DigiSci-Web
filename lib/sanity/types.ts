import type { PortableTextBlock } from '@portabletext/types';

export interface SanitySlug { current: string }

export interface ArticleListItem {
  title: string;
  slug: string;
  tag: string;
  date: string;
  readTime: string;
  excerpt: string;
  featured?: boolean;
}

export interface ArticleFull extends ArticleListItem {
  lede: string;
  body: PortableTextBlock[];
}

export interface CaseStudyListItem {
  title: string;
  slug: string;
  sector: string;
  service: string;
  client: string;
  outcome: string;
}

export interface CaseStudyCard extends CaseStudyListItem {
  challenge: string;
  approach: string;
  impact: string;
}

export interface CaseStudyFull extends CaseStudyListItem {
  context: string;
  challenge: { heading: string; body: string };
  approach:  { heading: string; body: string };
  impact:    { heading: string; body: string };
}

export interface StatItem { value: string; unit: string; label: string }
export interface PillarItem { n: string; iconKey: string; title: string; body: string }
export interface ServiceItem { iconKey: string; title: string; body: string; points: string[] }

export interface HomePage {
  hero: {
    eyebrow: string;
    heading: string;
    accentText: string;
    body: string;
    stats: StatItem[];
  };
  industryContext: {
    heading: string;
    paragraphs: string[];
    pullQuote: string;
    accentText: string;
  };
  credTags: string[];
  pillars: PillarItem[];
  valueProposition: { eyebrow: string; heading: string; body: string; pullQuote: string };
  services: ServiceItem[];
  cta: { eyebrow: string; heading: string; body: string };
}

export interface AboutPage {
  hero: { heading: string; body: string };
  founder: { name: string; title: string; paragraphs: string[]; quote: string };
  careerThread: { n: string; title: string; body: string }[];
  mission: { eyebrow: string; heading: string; accentText: string };
  howWeWork: { iconKey: string; label: string; value: string }[];
  cta: { eyebrow: string; heading: string; body: string };
}

export interface ServicesPage {
  hero: { heading: string; body: string };
  services: { n: string; title: string; duration: string; who: string; deliverables: string[] }[];
  offers: { title: string; scope: string; description: string }[];
  processSteps: { n: string; label: string }[];
}

export interface IndustryPage {
  hero: { heading: string; body: string };
  cgt:         { eyebrow: string; heading: string; body: string; tags: string[]; capabilities: string[] };
  pharma:      { eyebrow: string; heading: string; body: string; tags: string[]; capabilities: string[] };
  aiRegulated: { eyebrow: string; heading: string; body: string; tags: string[]; capabilities: string[] };
}

export interface InsightsPage {
  hero: { heading: string; body: string };
  subscribe: { heading: string; body: string };
}

export interface ContactPage {
  hero: { heading: string; body: string };
  contact: { geography: string; linkedin: string; email: string };
}

export interface SiteSettings {
  siteName: string;
  description: string;
  nav: { links: { label: string; href: string }[] };
  footer: { description: string; legalName: string; linkedin: string; email: string };
}
