import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  rule?: boolean;
  muted?: boolean;
  className?: string;
}

export function Eyebrow({ children, rule, muted, className = '' }: EyebrowProps) {
  return (
    <p className={[
      'font-mono text-xs font-medium tracking-[0.14em] uppercase',
      'flex items-center gap-3',
      muted ? 'text-[--color-text-tertiary]' : 'text-[--color-text-accent]',
      className,
    ].filter(Boolean).join(' ')}>
      {rule && <span className="block w-6 h-px bg-[--color-accent] shrink-0" />}
      {children}
    </p>
  );
}
