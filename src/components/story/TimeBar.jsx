import React from 'react'
import { motion } from 'framer-motion'
import { useStoryTime } from '../../hooks/useStoryTime'
import { useSmoothScroll } from '../../context/SmoothScrollContext'
import { EASINGS } from '../../styles/motionTokens'
import { DAY_RATIOS } from '../../config/storyTimeConfig'

const CLOCK_REEL = ['8:00 AM', '4:15 PM', '8:25 AM', '9:10 AM']

/**
 * TimeBar
 * Central narrative time device: 8:00 AM to 5:00 PM.
 * Layout:
 * - Centered row above: large clock + phase label beside it, left mono headline.
 * - 8px tall time bar with "8:00 AM" and "5:00 PM" end labels underneath.
 * - Accessible role="img" with polite live region updating on chapter changes.
 */
export function TimeBar({
  activeChapter = 0,
  scrollProgress = 0,
  resolution = {},
  shouldReduceMotion = false,
}) {
  const {
    clock,
    clockIndex,
    barLabel,
    tone,
    manualScaleX,
    prepScaleX,
    reviewScaleX,
    liveAriaLabel,
    deadlineLabel,
    illustrativeScenarioLabel,
    dayStartClock,
    deadlineClock,
  } = useStoryTime({
    activeChapter,
    scrollProgress,
    resolution,
    shouldReduceMotion,
  })

  const smoothScroll = useSmoothScroll()

  const handleSkipStory = (e) => {
    e.preventDefault()
    smoothScroll?.scrollToTarget?.('#what-changes')
  }

  // Dynamic badge styling based on story tension
  const badgeClasses = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    amber: 'bg-amber-100 text-amber-900 border-amber-300 font-bold animate-pulse',
    teal: 'bg-teal-50 text-teal-800 border-teal-200 font-semibold',
    purple: 'bg-purple-light text-purple border-purple/30 font-semibold',
    settled: 'bg-green-50 text-green-900 border-green-200 font-semibold',
  }[tone] || 'bg-slate-100 text-slate-700'

  const dotClasses = {
    neutral: 'bg-slate-400',
    amber: 'bg-amber-500 animate-ping',
    teal: 'bg-teal',
    purple: 'bg-purple',
    settled: 'bg-green',
  }[tone] || 'bg-slate-400'

  return (
    <div className="flex flex-col gap-1.5 w-full select-none">
      {/* Polite Live Region for Screen Readers */}
      <div role="status" aria-live="polite" className="sr-only">
        {liveAriaLabel}
      </div>

      {/* Row Above Bar: Left Scenario Info, Center/Right Large Clock + Phase Label */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4 pb-0.5">
        {/* Left: Small mono text */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-navy-400 min-w-0">
          <span className={`w-2 h-2 rounded-full shrink-0 ${dotClasses}`} aria-hidden="true" />
          <span className="font-semibold text-navy truncate">{deadlineLabel}</span>
          <span className="text-navy-300">·</span>
          <span className="text-[10px] sm:text-[11px] text-navy-400 truncate">
            {illustrativeScenarioLabel}
          </span>
        </div>

        {/* Right / Center: Large Clock + Phase Label + Skip Link */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-6 overflow-hidden relative font-display font-extrabold text-base sm:text-lg text-navy tracking-tight w-[74px] sm:w-[80px] text-right">
              {shouldReduceMotion ? (
                <span className="h-6 flex items-center justify-end tabular-nums">{clock}</span>
              ) : (
                <motion.div
                  animate={{ y: -clockIndex * 24 }}
                  transition={{ duration: 0.45, ease: EASINGS.digitRoll }}
                  className="flex flex-col will-change-transform"
                >
                  {CLOCK_REEL.map((timeStr) => (
                    <span
                      key={timeStr}
                      className="h-6 flex items-center justify-end leading-none tabular-nums"
                    >
                      {timeStr}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>

            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-mono transition-colors duration-300 ${badgeClasses}`}
            >
              {barLabel}
            </span>
          </div>

          <a
            href="#what-changes"
            onClick={handleSkipStory}
            className="text-[11px] font-mono text-navy-400 hover:text-teal underline underline-offset-4 transition-colors shrink-0 sm:ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
          >
            Skip the story
          </a>
        </div>
      </div>

      {/* 8px Tall Time Bar (8:00 AM -> 5:00 PM) */}
      <div role="img" aria-label={liveAriaLabel} className="space-y-1">
        <div className="h-2 w-full bg-slate-100 rounded-pill border border-slate-200/80 overflow-hidden relative">
          {/* Segment 1: Manual Checking (0 -> 91.67% at 4:15 PM, drains on loop break) */}
          <motion.div
            animate={{ scaleX: manualScaleX }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              ease: EASINGS.easeInOut,
            }}
            style={{ transformOrigin: 'left' }}
            className={`absolute inset-y-0 left-0 w-full origin-left will-change-transform transition-colors duration-500 ${
              tone === 'amber' ? 'bg-amber-500' : 'bg-slate-300'
            }`}
          />

          {/* Segment 2: Endloops Automated Prep (8:00 AM -> 8:25 AM = 0% to 4.63%) */}
          <motion.div
            animate={{ scaleX: prepScaleX }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              ease: EASINGS.easeInOut,
            }}
            style={{ transformOrigin: 'left' }}
            className="absolute inset-y-0 left-0 w-full bg-teal origin-left will-change-transform"
          />

          {/* Segment 3: Your Review & Judgement (8:25 AM -> 9:10 AM = 4.63% to 12.96%) */}
          <div
            style={{
              left: `${DAY_RATIOS.prep * 100}%`,
              width: `${DAY_RATIOS.review * 100}%`,
            }}
            className="absolute inset-y-0 overflow-hidden"
          >
            <motion.div
              animate={{
                scaleX: DAY_RATIOS.review > 0 ? Math.min(1, reviewScaleX / DAY_RATIOS.review) : 0,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                ease: EASINGS.easeInOut,
              }}
              style={{ transformOrigin: 'left' }}
              className="h-full w-full bg-purple origin-left will-change-transform"
            />
          </div>
        </div>

        {/* Axis End Markers Underneath (Without 540 min working day label) */}
        <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-navy-400 px-0.5 leading-none">
          <span>{dayStartClock}</span>
          <span>{deadlineClock}</span>
        </div>
      </div>
    </div>
  )
}

export default TimeBar
