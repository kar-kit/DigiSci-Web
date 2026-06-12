import React from 'react';

type TagVariant = 'default' | 'sector' | 'accent';

interface TagProps {
  variant?: TagVariant;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

// DS spec: height 24px, padding 0 9px, border-radius 2px, mono uppercase 11px, tracking-label
const VARIANT_CLASSES: Record<TagVariant, string> = {
  default: 'bg-transparent border-[var(--color-border-default)] text-[var(--color-text-secondary)]',
  sector:  'bg-[rgba(62,149,118,0.14)] border-[rgba(62,149,118,0.35)] text-[var(--color-green-400)]',
  accent:  'bg-[var(--color-accent-muted)] border-[rgba(0,163,224,0.35)] text-[var(--color-blue-300)]',
};

export function Tag({ variant = 'default', dot, children, className = '' }: TagProps) {
  return (
    <span className={[
      'inline-flex items-center gap-[7px]',
      'h-6 px-[9px]',
      'font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase leading-none',
      'rounded-[2px] border',
      VARIANT_CLASSES[variant],
      className,
    ].filter(Boolean).join(' ')}>
      {dot && <span className="w-[6px] h-[6px] rounded-full bg-current shrink-0" />}
      {children}
    </span>
  );
}
