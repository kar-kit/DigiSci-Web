import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Input({ label, hint, id, className = '', ...rest }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={inputId} className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--color-text-secondary)]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'h-11 px-4 rounded-[2px]',
          'bg-[var(--color-surface-overlay)] border border-[var(--color-border-default)]',
          'text-[var(--color-text-primary)] font-sans text-sm',
          'outline-none placeholder:text-[var(--color-text-tertiary)]',
          'transition-[border-color,box-shadow] duration-[120ms]',
          'focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(0,163,224,0.16)]',
        ].join(' ')}
        {...rest}
      />
      {hint && (
        <p className="font-mono text-[0.6875rem] tracking-[0.04em] text-[var(--color-text-tertiary)]">{hint}</p>
      )}
    </div>
  );
}
