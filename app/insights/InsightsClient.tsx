'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';
import { trackEvent } from '@/lib/umami';
import type { ArticleListItem } from '@/lib/sanity/types';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

type FeaturedArticle = Pick<ArticleListItem, 'slug' | 'tag' | 'date' | 'title' | 'excerpt' | 'readTime'>;

const FILTERS = ['All', 'AI in Pharma Ops', 'CGT Manufacturing', 'Digital Quality Systems', 'Future Operating Models'] as const;

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

export function InsightsClient({
  articles,
  featured,
}: {
  articles: ArticleListItem[];
  featured: FeaturedArticle | null;
}) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredArticles = activeFilter === 'All'
    ? articles
    : articles.filter((a) => a.tag === activeFilter);

  const tagCounts = FILTERS.reduce<Record<string, number>>((acc, label) => {
    acc[label] = label === 'All' ? articles.length : articles.filter((a) => a.tag === label).length;
    return acc;
  }, {});

  return (
    <>
      {/* Featured article */}
      {featured && (
        <section aria-label="Featured article" className="border-b border-[var(--border-subtle)]">
          <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-12">
            <Link
              href={`/insights/${featured.slug}`}
              className="group flex flex-col gap-4 p-8 bg-[var(--surface-raised)] border border-[var(--border-default)] hover:border-[var(--border-strong)] transition-colors duration-[120ms] md:flex-row md:items-start md:gap-10"
              aria-label={`Read featured article: ${featured.title}`}
            >
              <div className="flex flex-col gap-2 shrink-0">
                <Tag variant="accent">Featured</Tag>
                <Tag variant="sector">{featured.tag}</Tag>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <h2 className="font-sans font-semibold text-[1.75rem] leading-[1.2] tracking-[-0.02em] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-[120ms] max-w-[36ch]">
                  {featured.title}
                </h2>
                <p className="font-serif text-base leading-[1.65] text-[var(--text-secondary)] max-w-[52em]">
                  {featured.excerpt}
                </p>
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                  {featured.date ? formatDate(featured.date) : ''} · {featured.readTime}
                </span>
              </div>
              <div className="shrink-0 self-end md:self-center">
                <ArrowRight size={20} className="text-[var(--accent)]" aria-hidden />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter bar */}
      <section aria-label="Filter bar" className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-4 flex items-center gap-2 flex-wrap">
          {FILTERS.map((label) => {
            const isActive = label === activeFilter;
            return (
              <button
                key={label}
                onClick={() => setActiveFilter(label)}
                aria-pressed={isActive}
                className={[
                  'font-sans text-sm px-4 py-2 border transition-colors duration-[120ms]',
                  isActive
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
                ].join(' ')}
              >
                {label}
                {label !== 'All' && tagCounts[label] > 0 && (
                  <span className="ml-1.5 font-mono text-[0.6rem] opacity-60">{tagCounts[label]}</span>
                )}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* Article grid */}
      <section aria-label="Article grid" className="border-b border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map(({ slug, tag, date, title, excerpt, readTime }) => (
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
                <p className="font-serif text-sm leading-[1.65] text-[var(--text-secondary)] flex-1">{excerpt}</p>
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
                  {date ? formatDate(date) : ''} · {readTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section aria-label="Subscribe" className="bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-[560px]">
            <Eyebrow rule>Subscribe</Eyebrow>
            <h2 className="font-sans font-semibold text-[3rem] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[22ch]">
              Stay current on AI and biotech operations.
            </h2>
            <p className="font-serif text-[1.125rem] leading-[1.65] text-[var(--text-secondary)] mt-4">
              New insights are published regularly. Strategic and technical perspectives written for biotech and pharmaceutical operations leaders.
            </p>
            <NewsletterForm
                emailId="subscribe-email"
                onSuccess={() => trackEvent('newsletter_subscribe')}
              />
          </div>
        </div>
      </section>
    </>
  );
}
