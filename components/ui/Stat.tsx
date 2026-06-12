import React from 'react';

interface StatProps {
  value: string;
  unit?: string;
  label: string;
  size?: 'sm' | 'md';
}

// DS spec: value at --text-4xl (4rem/64px) for md, --text-3xl (3rem/48px) for sm
// Unit is .42em of the value font-size, in --text-accent color
// Label is mono, --text-2xs (11px), uppercase, --tracking-label
export function Stat({ value, unit, label, size = 'md' }: StatProps) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-baseline gap-1 leading-[0.95]">
        <span className={[
          'font-sans font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] tabular-nums',
          size === 'sm' ? 'text-[3rem]' : 'text-[4rem]',
        ].join(' ')}>
          {value}
        </span>
        {unit && (
          <span className={[
            'font-mono font-medium text-[var(--color-text-accent)] self-start mt-[0.15em]',
            size === 'sm' ? 'text-[1.26rem]' : 'text-[1.68rem]',
          ].join(' ')}>
            {unit}
          </span>
        )}
      </div>
      <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--color-text-secondary)]">
        {label}
      </p>
    </div>
  );
}
