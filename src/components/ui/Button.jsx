import React from 'react'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  as: Component = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-button transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2'

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 h-8 gap-1.5',
    md: 'text-sm px-4 py-2.5 h-10 gap-2',
    lg: 'text-base px-6 py-3 h-12 gap-2.5',
  }

  const variantStyles = {
    primary: 'bg-brand-navy text-white hover:bg-brand-navy-dark active:bg-black shadow-subtle',
    accent: 'bg-brand-teal text-white hover:bg-brand-teal-dark active:bg-brand-teal-dark shadow-subtle',
    secondary: 'bg-surface-subtle text-brand-navy border border-surface-border hover:bg-surface-muted hover:border-surface-borderStrong',
    outline: 'border border-brand-navy/20 text-brand-navy hover:bg-surface-subtle hover:border-brand-navy/40',
    ghost: 'text-brand-navy hover:bg-surface-subtle',
    link: 'text-brand-teal hover:text-brand-teal-dark hover:underline p-0 h-auto',
  }

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
