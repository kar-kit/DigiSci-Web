'use client';

import React from 'react';

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ items, value, onChange, className = '' }: TabsProps) {
  return (
    <div
      role="tablist"
      className={['flex border-b border-[var(--color-border-subtle)]', className].filter(Boolean).join(' ')}
    >
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={[
              'relative py-3 px-6 border-none bg-transparent cursor-pointer',
              'font-sans text-sm font-medium tracking-[0.04em]',
              'transition-colors duration-[120ms]',
              'after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:bg-[var(--color-accent)]',
              'after:transition-[width] after:duration-[180ms] after:origin-left',
              active ? 'text-[var(--color-text-primary)] after:w-full' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] after:w-0',
            ].join(' ')}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
