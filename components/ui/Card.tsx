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
      'bg-[--color-surface-raised] border border-[--color-border-default] rounded-[4px] p-8',
      ruled ? 'before:absolute before:top-0 before:left-0 before:h-0.5 before:w-0 before:bg-[--color-accent] before:transition-[width] before:duration-[280ms]' : '',
      interactive ? 'transition-[border-color,transform,box-shadow] duration-[180ms] hover:border-[--color-border-strong] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] hover:before:w-full' : '',
      className,
    ].filter(Boolean).join(' ')}>
      {eyebrow && (
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[--color-text-tertiary] mb-5">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col flex-1 gap-3">
        {title && (
          <h3 className="font-sans font-semibold text-[1.125rem] leading-snug tracking-[-0.01em] text-[--color-text-primary]">
            {title}
          </h3>
        )}
        {children && (
          <div className="font-sans text-sm leading-relaxed text-[--color-text-secondary]">
            {children}
          </div>
        )}
      </div>
      {cta && (
        <div className="mt-6 pt-5 border-t border-[--color-border-subtle]">
          {cta}
        </div>
      )}
    </div>
  );
}
