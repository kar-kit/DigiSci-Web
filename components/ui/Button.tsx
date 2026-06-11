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
  primary:   'bg-[--color-accent] text-[--color-accent-text] hover:bg-[--color-accent-hover] active:bg-[--color-accent-press]',
  secondary: 'bg-transparent text-[--color-text-primary] border border-[--color-border-strong] hover:border-[--color-accent] hover:text-[--color-text-accent]',
  ghost:     'bg-transparent text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-border-subtle] px-3',
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
    'border border-transparent rounded-[2px]',
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
