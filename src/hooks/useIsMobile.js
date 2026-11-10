import { useState, useEffect } from 'react'

/**
 * useIsMobile
 * Responsive breakpoint hook to detect mobile viewport (< 768px).
 * Allows pinned desktop scenes to gracefully degrade to stacked scenes on mobile.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpoint
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = (e) => setIsMobile(e.matches)

    setIsMobile(mql.matches)
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [breakpoint])

  return isMobile
}

export default useIsMobile
