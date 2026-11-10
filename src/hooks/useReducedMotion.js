import { useState, useEffect } from 'react'
import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

/**
 * useReducedMotion
 * Hook to detect whether the user has requested reduced motion.
 * Uses Framer Motion's hook with window.matchMedia fallback.
 */
export function useReducedMotion() {
  const framerReduced = useFramerReducedMotion()
  const [matches, setMatches] = useState(Boolean(framerReduced))

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setMatches(mediaQuery.matches)

    const handleChange = (event) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return Boolean(framerReduced || matches)
}

export default useReducedMotion
