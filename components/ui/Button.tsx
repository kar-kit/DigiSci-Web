import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:   'border-transparent bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:bg-[var(--color-accent-hover)] active:bg-[var(--color-accent-press)]',
  secondary: 'bg-transparent text-[var(--color-text-primary)] border-[var(--color-border-strong)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-accent)]',
  ghost:     'border-transparent bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)] px-3',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'h-[34px] px-[14px] text-xs',
  md: 'h-[44px] px-[22px] text-sm',
  lg: 'h-[52px] px-[30px] text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  as: Tag = 'button',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    'inline-flex items-center justify-center gap-[10px]',
    'font-sans font-semibold tracking-[0.04em] leading-none whitespace-nowrap',
    'border rounded-[2px]',
    'cursor-pointer select-none no-underline',
    'transition-[background,border-color,color,transform] duration-[120ms]',
    'focus-visible:outline-none active:translate-y-px disabled:opacity-40 disabled:pointer-events-none',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={cls} {...(rest as any)}>
      {icon && <span className="inline-flex w-[1.05em] h-[1.05em] [&_svg]:w-full [&_svg]:h-full">{icon}</span>}
      {children}
      {iconRight && <span className="inline-flex w-[1.05em] h-[1.05em] [&_svg]:w-full [&_svg]:h-full">{iconRight}</span>}
    </Tag>
  );
}
