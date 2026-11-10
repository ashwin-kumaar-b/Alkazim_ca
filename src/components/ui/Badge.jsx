import React from 'react'

/** Badge — coloured pill for status/category labels */
export function Badge({ children, variant = 'neutral', size = 'md', className = '' }) {
  const base = 'inline-flex items-center gap-1.5 font-medium rounded-pill border'

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs    px-2.5 py-1',
    lg: 'text-sm    px-3 py-1.5',
  }

  const variants = {
    neutral: 'bg-canvas-subtle text-navy-600 border-slate-200',
    green:   'bg-green-100 text-green-700 border-green-200',
    teal:    'bg-teal-100  text-teal-700  border-teal-200',
    blue:    'bg-blue-light text-blue border-blue/20',
    purple:  'bg-purple-light text-purple border-purple/20',
    amber:   'bg-amber-light text-amber-700 border-amber-border',
    red:     'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
