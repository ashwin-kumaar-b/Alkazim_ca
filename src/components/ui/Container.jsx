import React from 'react'

/**
 * Container Component
 * Centers content and restricts maximum width.
 * Sizes: 'sm' | 'md' | 'lg' (default) | 'xl' | 'full'
 */
export function Container({ children, size = 'lg', className = '', ...props }) {
  const widths = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  }

  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${widths[size]} ${className}`} {...props}>
      {children}
    </div>
  )
}

/**
 * Section Component
 * Provides vertical rhythm and optional narrative mood background.
 * Mood: 'neutral' (default) | 'calm' | 'calm-teal' | 'tension'
 * Spacing: 'sm' | 'md' | 'lg' (default) | 'xl' | 'tension' | 'calm'
 */
export function Section({
  children,
  mood = 'neutral',
  spacing = 'lg',
  className = '',
  ...props
}) {
  const moodStyles = {
    neutral: 'bg-white text-navy',
    calm: 'bg-calm text-navy',
    'calm-teal': 'bg-calm-teal text-navy border-y border-teal-100',
    tension: 'bg-tension-bg text-navy border-y border-tension-border',
  }

  const spacingStyles = {
    sm: 'py-10 md:py-14',
    md: 'py-14 md:py-20',
    lg: 'py-20 md:py-28',
    xl: 'py-28 md:py-36',
    tension: 'py-tension-section',
    calm: 'py-calm-section',
  }

  return (
    <section className={`${moodStyles[mood]} ${spacingStyles[spacing]} ${className}`} {...props}>
      {children}
    </section>
  )
}

export default Container
