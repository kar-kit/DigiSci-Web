import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  rule?: boolean;
  muted?: boolean;
  className?: string;
}

// DS spec: mono xs (12px), tracking-label (0.14em), uppercase
// Rule: 28px wide × 1px high, accent color
export function Eyebrow({ children, rule, muted, className = '' }: EyebrowProps) {
  return (
    <p className={[
      'font-mono text-xs font-medium tracking-[0.14em] uppercase',
      'inline-flex items-center gap-3',
      muted ? 'text-[--color-text-tertiary]' : 'text-[--color-text-accent]',
      className,
    ].filter(Boolean).join(' ')}>
      {rule && <span className="block w-7 h-px bg-[--color-accent] shrink-0" />}
      {children}
    </p>
  );
}
