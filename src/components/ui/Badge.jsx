import React from 'react'

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon,
}) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full'

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }

  const variantStyles = {
    neutral: 'bg-surface-muted text-brand-navy-light border border-surface-border',
    green: 'bg-brand-green-light text-brand-green-dark border border-brand-green/20',
    teal: 'bg-brand-teal-light text-brand-teal-dark border border-brand-teal/20',
    blue: 'bg-brand-blue-light text-brand-blue border border-brand-blue/20',
    purple: 'bg-brand-purple-light text-brand-purple border border-brand-purple/20',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200',
  }

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
