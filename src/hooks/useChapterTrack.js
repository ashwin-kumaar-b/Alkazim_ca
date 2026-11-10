import { useState, useEffect, useCallback } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { CHAPTERS } from '../data/storyBeatsData'
import { useSmoothScroll } from '../context/SmoothScrollContext'

const CHAPTER_IDS = CHAPTERS.map((ch) => ch.id)

/**
 * useChapterTrack
 * Drives the monotonic, scroll-driven chapter track separate from the time bar.
 * - Measures chapter elements dynamically for piecewise progress [0, 25, 50, 75, 100]%.
 * - Controls active dot, hover expansion, focus states, and smooth-scroll + heading focus.
 * - Tracks story section visibility (fades out after Chapter 5 into What Changes).
 */
export function useChapterTrack({ shouldReduceMotion = false, onSelectChapter } = {}) {
  const { scrollY } = useScroll()
  const smoothScroll = useSmoothScroll()
  const [offsets, setOffsets] = useState([0, 800, 1600, 2400, 3200])
  const [activeDotIndex, setActiveDotIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(null)
  const [isStoryVisible, setIsStoryVisible] = useState(true)

  // Measure chapter trigger scroll positions dynamically
  const measureOffsets = useCallback(() => {
    if (typeof window === 'undefined') return
    const navOffset = 90
    const measured = CHAPTER_IDS.map((id, idx) => {
      const el = document.getElementById(id)
      if (!el) return idx * 1000
      const rect = el.getBoundingClientRect()
      return Math.max(0, window.scrollY + rect.top - navOffset)
    })

    // Ensure monotonic ascending offsets
    for (let i = 1; i < measured.length; i++) {
      if (measured[i] <= measured[i - 1]) {
        measured[i] = measured[i - 1] + 100
      }
    }
    setOffsets(measured)
  }, [])

  useEffect(() => {
    measureOffsets()
    window.addEventListener('resize', measureOffsets, { passive: true })
    document.fonts?.ready?.then(measureOffsets)
    const timer = setTimeout(measureOffsets, 500)
    return () => {
      window.removeEventListener('resize', measureOffsets)
      clearTimeout(timer)
    }
  }, [measureOffsets])

  // Piecewise monotonic track progress mapping
  const trackFill = useTransform(
    scrollY,
    offsets,
    [0, 0.25, 0.50, 0.75, 1.0],
    { clamp: true }
  )

  // Update active dot index synchronously from current trackFill & offsets (handles refresh mid-story)
  useEffect(() => {
    const syncIndex = (v) => {
      if (v >= 0.98) setActiveDotIndex(4)
      else if (v >= 0.75) setActiveDotIndex(3)
      else if (v >= 0.50) setActiveDotIndex(2)
      else if (v >= 0.25) setActiveDotIndex(1)
      else setActiveDotIndex(0)
    }
    syncIndex(trackFill.get())
    const unsub = trackFill.on('change', syncIndex)
    return () => unsub()
  }, [trackFill, offsets])

  // Track story section boundary to fade bar out after Chapter 5
  useEffect(() => {
    const checkVisibility = () => {
      const whatChangesEl = document.getElementById('what-changes')
      const ch1El = document.getElementById('chapter-1')
      const scrollPos = window.scrollY

      // Check if past Chapter 5 into What changes
      if (whatChangesEl) {
        const wcTop = whatChangesEl.getBoundingClientRect().top
        if (wcTop <= 110) {
          setIsStoryVisible(false)
          return
        }
      }

      // Check if above Chapter 1 (e.g. hero)
      if (ch1El) {
        const ch1Top = ch1El.getBoundingClientRect().top
        if (ch1Top > window.innerHeight * 0.8 && scrollPos < 150) {
          setIsStoryVisible(false)
          return
        }
      }

      setIsStoryVisible(true)
    }

    window.addEventListener('scroll', checkVisibility, { passive: true })
    checkVisibility()
    return () => window.removeEventListener('scroll', checkVisibility)
  }, [])

  // Smooth-scroll to chapter via Lenis and focus its heading afterwards
  const handleDotClick = useCallback((index, chapterId) => {
    setActiveDotIndex(index)
    if (onSelectChapter) {
      onSelectChapter(index, chapterId)
    }

    if (smoothScroll?.scrollToTarget) {
      smoothScroll.scrollToTarget(`#${chapterId}`)
      return
    }

    const el = document.getElementById(chapterId)
    if (!el) return
    el.scrollIntoView({ behavior: 'auto' })
    const heading = el.querySelector('h1, h2, h3')
    if (heading) {
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    }
  }, [onSelectChapter, smoothScroll])

  return {
    trackFill,
    activeDotIndex,
    isHovered,
    setIsHovered,
    focusedIndex,
    setFocusedIndex,
    isStoryVisible,
    handleDotClick,
  }
}

export default useChapterTrack
