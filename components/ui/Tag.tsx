import React from 'react';

type TagVariant = 'default' | 'sector' | 'accent';

interface TagProps {
  variant?: TagVariant;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<TagVariant, string> = {
  default: 'bg-[--color-surface-overlay] border-[--color-border-subtle] text-[--color-text-secondary]',
  sector:  'bg-[rgba(62,149,118,0.14)] border-[--color-green-600] text-[--color-green-400]',
  accent:  'bg-[--color-accent-muted] border-[--color-blue-700] text-[--color-blue-300]',
};

export function Tag({ variant = 'default', dot, children, className = '' }: TagProps) {
  return (
    <span className={[
      'inline-flex items-center gap-[6px]',
      'font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase leading-none',
      'px-[10px] py-1 rounded-[2px] border',
      VARIANT_CLASSES[variant],
      className,
    ].filter(Boolean).join(' ')}>
      {dot && <span className="w-[6px] h-[6px] rounded-full bg-[--color-green-500] shrink-0" />}
      {children}
    </span>
  );
}
