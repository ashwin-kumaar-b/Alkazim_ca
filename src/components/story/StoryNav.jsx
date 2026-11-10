import React, { useState, useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useChapterTrack } from '../../hooks/useChapterTrack'
import { TimeBar } from './TimeBar'
import { StoryChapterTrack } from './StoryChapterTrack'

/**
 * StoryNav
 * Redesigned sticky story bar.
 * - Centered column (about 960px wide on desktop: min(960px, 72vw)).
 * - TimeBar with large clock, phase label, 8px bar, and end labels.
 * - 2px monotonic chapter track with 5 evenly spaced dots and hanging pills.
 * - Fades out after Chapter 5 so it never overlaps the impact section.
 * - Auto-docks to top-0 when main navbar slides away on scroll-down inside story.
 */
export function StoryNav({
  activeChapter = 0,
  scrollProgress = 0,
  resolution = {},
  onSelectChapter,
}) {
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const [navHidden, setNavHidden] = useState(false)

  const {
    trackFill,
    activeDotIndex,
    isHovered,
    setIsHovered,
    focusedIndex,
    setFocusedIndex,
    isStoryVisible,
    handleDotClick,
  } = useChapterTrack({ shouldReduceMotion, onSelectChapter })

  // Listen for scroll direction inside story to dock top-0 when navbar hides
  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const curY = window.scrollY
      const ch1 = document.getElementById('chapter-1')
      const whatChanges = document.getElementById('what-changes')
      if (ch1 && whatChanges) {
        const ch1Top = ch1.getBoundingClientRect().top
        const wcTop = whatChanges.getBoundingClientRect().top
        const insideStory = ch1Top <= 100 && wcTop > 100
        if (insideStory) {
          if (curY > lastY + 6) setNavHidden(true)
          else if (curY < lastY - 6) setNavHidden(false)
        } else {
          setNavHidden(false)
        }
      }
      lastY = curY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      role="region"
      aria-label="Story progress and time bar"
      className={`sticky z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-300 ${
        navHidden ? 'top-0' : 'top-14 sm:top-14'
      } ${
        isStoryVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Centered Column (Desktop: min(960px, 72vw); Mobile: 16px margins) */}
      <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 pt-2 pb-1 space-y-2">
        {/* TimeBar Component (Centered row above, 8px bar, end labels below) */}
        <TimeBar
          activeChapter={activeDotIndex}
          scrollProgress={scrollProgress}
          resolution={resolution}
          shouldReduceMotion={shouldReduceMotion}
        />

        {/* 2px Monotonic Chapter Track with 5 Evenly Spaced Dots on Bottom Edge */}
        <StoryChapterTrack
          trackFill={trackFill}
          activeDotIndex={activeDotIndex}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
          handleDotClick={handleDotClick}
          isMobile={isMobile}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>
    </div>
  )
}

export default StoryNav
