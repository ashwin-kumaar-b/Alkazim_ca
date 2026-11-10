import React from 'react'
import { motion } from 'framer-motion'
import { CHAPTERS } from '../../data/storyBeatsData'

/**
 * StoryChapterTrack
 * 2px chapter track with 5 evenly spaced dots and hanging label pills.
 * Scroll-driven, monotonic, with hover expansion and accessible keyboard navigation.
 */
export function StoryChapterTrack({
  trackFill,
  activeDotIndex = 0,
  isHovered = false,
  setIsHovered,
  focusedIndex = null,
  setFocusedIndex,
  handleDotClick,
  isMobile = false,
  shouldReduceMotion = false,
}) {
  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* 2px Background Track Line with Monotonic ScaleX Fill */}
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-[2px] bg-slate-200 overflow-hidden pointer-events-none">
        <motion.div
          style={{
            scaleX: trackFill,
            transformOrigin: 'left',
          }}
          className="h-full w-full bg-teal origin-left will-change-transform"
        />
      </div>

      {/* 40px Hit Area Row with 5 Evenly Spaced Dots */}
      <nav
        aria-label="Story chapters"
        className="relative w-full h-10 flex items-center justify-between"
      >
        {CHAPTERS.map((ch, idx) => {
          const isActive = activeDotIndex === idx
          const isPast = activeDotIndex > idx
          const isFocused = focusedIndex === idx
          const isVisible = (isHovered && !isMobile) || isFocused || isActive

          // Label alignment: left for first, right for last, center for middle
          const alignmentClasses =
            idx === 0
              ? 'left-0 origin-left'
              : idx === CHAPTERS.length - 1
              ? 'right-0 origin-right'
              : 'left-1/2 -translate-x-1/2 origin-top'

          return (
            <div key={ch.id} className="relative flex flex-col items-center">
              {/* Dot Button with 40px Hit Area */}
              <button
                type="button"
                onClick={() => handleDotClick(idx, ch.id)}
                onFocus={() => setFocusedIndex(idx)}
                onBlur={() => setFocusedIndex(null)}
                aria-label={`Chapter ${ch.chapterNumber}: ${ch.title}`}
                aria-current={isActive ? 'step' : undefined}
                className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 transition-transform"
              >
                <span
                  className={`rounded-full transition-all duration-200 border-2 border-white ${
                    isActive
                      ? 'w-3 h-3 bg-teal scale-125 shadow-xs ring-2 ring-teal/30'
                      : isPast
                      ? 'w-2.5 h-2.5 bg-teal'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Hanging Label Pill (transforms & opacity only) */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  y: isVisible || shouldReduceMotion ? 0 : 4,
                }}
                transition={{
                  duration: shouldReduceMotion
                    ? 0
                    : isHovered
                    ? 0.2
                    : isVisible
                    ? 0.25
                    : 0.15,
                  ease: 'easeOut',
                }}
                className={`absolute top-8.5 pointer-events-none z-30 ${alignmentClasses}`}
              >
                <span
                  className={`inline-block px-2.5 py-1 rounded-pill text-xs font-mono font-semibold whitespace-nowrap shadow-xs border transition-colors ${
                    isActive
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-navy-600 border-slate-200'
                  }`}
                >
                  {ch.fullTitle}
                </span>
              </motion.div>
            </div>
          )
        })}
      </nav>
    </div>
  )
}

export default StoryChapterTrack
