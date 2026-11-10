import React from 'react'
import { motion } from 'framer-motion'
import {
  STORY_TIME_CONFIG,
  MANUAL_END_CLOCK,
  SIGN_OFF_CLOCK,
  REST_OF_DAY_LABEL,
} from '../../config/storyTimeConfig'

/**
 * TimeComparisonBars
 * Minimalistic two-bar comparison on the shared 8:00 AM to 5:00 PM timeline.
 * Clean, uncluttered layout with zero overlapping text.
 */
export function TimeComparisonBars({ isAnimated = false }) {
  return (
    <div className="space-y-6">
      {/* Bar 1: Without Endloops */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-semibold text-navy">Without Endloops</span>
          <span className="text-amber-800 font-medium">
            8h 15m manual · ends {MANUAL_END_CLOCK}
          </span>
        </div>

        <div className="h-10 sm:h-11 w-full bg-slate-100 rounded-xl p-1 overflow-hidden relative flex">
          {/* Amber Manual Checking (91.67% of day) */}
          <div className="w-[91.67%] h-full relative">
            <motion.div
              initial={isAnimated ? { scaleX: 0 } : { scaleX: 1 }}
              animate={{ scaleX: 1 }}
              transition={isAnimated ? { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 } : { duration: 0 }}
              style={{ transformOrigin: 'left' }}
              className="h-full w-full bg-amber-500 rounded-lg shadow-xs will-change-transform"
            />
          </div>

          {/* Faint Remaining Track to 5:00 PM (8.33%) */}
          <div className="w-[8.33%] h-full bg-slate-200/40 border-l border-slate-300/60 rounded-r-lg" />
        </div>
      </div>

      {/* Bar 2: With Endloops */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-semibold text-teal-800">With Endloops</span>
          <span className="text-teal font-medium">
            25m prep + 45m review · done {SIGN_OFF_CLOCK}
          </span>
        </div>

        <div className="h-10 sm:h-11 w-full bg-slate-100 rounded-xl p-1 overflow-hidden relative flex gap-1">
          {/* Teal Prep (4.63%) */}
          <div className="w-[4.63%] min-w-[18px] h-full relative" title="25 min prep">
            <motion.div
              initial={isAnimated ? { scaleX: 0 } : { scaleX: 1 }}
              animate={{ scaleX: 1 }}
              transition={isAnimated ? { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.8 } : { duration: 0 }}
              style={{ transformOrigin: 'left' }}
              className="h-full w-full bg-teal rounded-l-lg shadow-xs will-change-transform"
            />
          </div>

          {/* Purple Review (8.33%) */}
          <div className="w-[8.33%] min-w-[28px] h-full relative" title="45 min review">
            <motion.div
              initial={isAnimated ? { scaleX: 0 } : { scaleX: 1 }}
              animate={{ scaleX: 1 }}
              transition={isAnimated ? { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 2.45 } : { duration: 0 }}
              style={{ transformOrigin: 'left' }}
              className="h-full w-full bg-purple shadow-xs will-change-transform"
            />
          </div>

          {/* Open Pale Area: Rest of your day (87.04%) */}
          <div className="flex-1 h-full relative">
            <motion.div
              initial={isAnimated ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={isAnimated ? { duration: 0.5, ease: 'easeOut', delay: 3.15 } : { duration: 0 }}
              className="h-full w-full bg-teal-50/70 border border-dashed border-teal-300/80 rounded-r-lg flex items-center px-3"
            >
              <span className="text-xs font-medium text-teal-800 flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
                <span>{REST_OF_DAY_LABEL}</span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Shared Time Axis (8:00 AM -> 9:10 AM -> 5:00 PM) with ZERO collisions */}
      <div className="relative w-full pt-1">
        <div className="w-full h-px bg-slate-200 relative" />
        <div className="relative flex justify-between items-center text-xs font-mono text-navy-400 pt-1.5">
          <span>{STORY_TIME_CONFIG.dayStartClock}</span>
          <div
            className="absolute -translate-x-1/2 flex flex-col items-center"
            style={{ left: '12.96%' }}
          >
            <div className="w-px h-1.5 bg-teal -mt-2 mb-0.5" />
            <span className="font-bold text-teal">{SIGN_OFF_CLOCK}</span>
          </div>
          <span>{STORY_TIME_CONFIG.deadlineClock}</span>
        </div>
      </div>
    </div>
  )
}

export default TimeComparisonBars
