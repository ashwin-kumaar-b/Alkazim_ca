import React from 'react'

/**
 * Reusable Button Component
 * Variants:
 *  - primary: solid navy background, white text
 *  - secondary: 1px border, navy text, subtle hover
 *  - accent: solid teal background, white text
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-button ' +
    'transition-all duration-200 select-none border border-transparent ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ' +
    'focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const sizeStyles = {
    sm: 'text-small px-3.5 py-1.5 h-8',
    md: 'text-small px-4 py-2.5 h-10',
    lg: 'text-body px-6 py-3 h-12',
  }

  const variantStyles = {
    primary: 'bg-navy text-white hover:bg-navy-700 active:bg-navy-600 shadow-xs',
    secondary: 'border-slate-200 text-navy bg-transparent hover:bg-calm-subtle hover:border-slate-300',
    accent: 'bg-teal text-white hover:bg-teal-600 active:bg-teal-700 shadow-xs',
    ghost: 'text-navy hover:bg-calm-subtle',
  }

  return (
    <Component
      disabled={Component === 'button' ? disabled : undefined}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button
