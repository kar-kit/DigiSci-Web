import React from 'react';

interface StatProps {
  value: string;
  unit?: string;
  label: string;
  size?: 'sm' | 'md';
}

export function Stat({ value, unit, label, size = 'md' }: StatProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-1 leading-none">
        <span className={[
          'font-sans font-semibold tracking-[-0.02em] text-[--color-text-primary] tabular-nums',
          size === 'sm' ? 'text-4xl' : 'text-[4rem]',
        ].join(' ')}>
          {value}
        </span>
        {unit && (
          <span className={[
            'font-mono font-medium tracking-[0.14em] uppercase text-[--color-accent]',
            size === 'sm' ? 'text-xl' : 'text-[1.75rem]',
          ].join(' ')}>
            {unit}
          </span>
        )}
      </div>
      <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[--color-text-secondary]">
        {label}
      </p>
    </div>
  );
}
