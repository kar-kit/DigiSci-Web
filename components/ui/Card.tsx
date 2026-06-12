import React from 'react';

interface CardProps {
  title?: string;
  eyebrow?: string;
  cta?: React.ReactNode;
  ruled?: boolean;
  interactive?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Card({ title, eyebrow, cta, ruled, interactive, children, className = '' }: CardProps) {
  return (
    <div className={[
      'relative flex flex-col overflow-hidden',
      'bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] rounded-[4px] p-8',
      // Accent top rule: 64px wide at rest, animates to 100% on hover when interactive
      ruled ? 'before:absolute before:top-0 before:left-0 before:h-0.5 before:w-16 before:bg-[var(--color-accent)] before:transition-[width] before:duration-[280ms] before:[transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)]' : '',
      interactive ? 'cursor-pointer transition-[border-color,transform] duration-[180ms] hover:border-[var(--color-border-strong)] hover:-translate-y-0.5 hover:before:w-full' : '',
      className,
    ].filter(Boolean).join(' ')}>
      {eyebrow && (
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--color-text-accent)] mb-4">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col flex-1">
        {title && (
          <h3 className="font-sans font-semibold text-[1.125rem] leading-snug tracking-[-0.01em] text-[var(--color-text-primary)] mb-3">
            {title}
          </h3>
        )}
        {children}
      </div>
      {cta && (
        <div className="mt-6 pt-5 border-t border-[var(--color-border-subtle)]">
          {cta}
        </div>
      )}
    </div>
  );
}
