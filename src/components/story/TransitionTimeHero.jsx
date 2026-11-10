import React from 'react'
import { motion } from 'framer-motion'
import {
  STORY_TIME_CONFIG,
  MANUAL_END_CLOCK,
  ENDLOOPS_PREP_END_CLOCK,
} from '../../config/storyTimeConfig'

const REWIND_CLOCKS = [
  MANUAL_END_CLOCK, // 0: 4:15 PM (start of rewind)
  '3:30 PM',        // 1
  '2:45 PM',        // 2
  '1:30 PM',        // 3
  '12:00 PM',       // 4
  '10:30 AM',       // 5
  '9:15 AM',        // 6
  STORY_TIME_CONFIG.dayStartClock, // 7: 8:00 AM (rewind target)
  ENDLOOPS_PREP_END_CLOCK,        // 8: 8:25 AM (handoff to Ch3)
]

export function TransitionTimeHero({
  heroScale,
  heroY,
  heroOp,
  manualScaleX,
  prepScaleX,
  clockDigitY,
  badgeTextOp,
  badgeTone = 'amber',
  isRewound = false,
  isHandoff = false,
}) {
  return (
    <motion.div
      style={{
        scale: heroScale,
        y: heroY,
        opacity: heroOp,
      }}
      className="relative z-20 w-full max-w-xl sm:max-w-2xl px-6 mx-auto will-change-transform select-none"
    >
      <div className="p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-hover space-y-5">
        {/* Top Header Row: Label Left, Big Digits Clock Right */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isHandoff ? 'bg-teal' : isRewound ? 'bg-teal-600' : 'bg-amber-500 animate-ping'
                }`}
                aria-hidden="true"
              />
              <span className="font-mono text-xs sm:text-small font-bold uppercase tracking-wider text-navy">
                {STORY_TIME_CONFIG.deadlineLabel}
              </span>
            </div>
            <p className="text-[11px] font-mono text-navy-400">
              * {STORY_TIME_CONFIG.illustrativeScenarioLabel}
            </p>
          </div>

          {/* Contextual Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold border transition-colors duration-300 ${
                isHandoff
                  ? 'bg-teal-50 text-teal-800 border-teal-200'
                  : isRewound
                  ? 'bg-teal-50 text-teal-800 border-teal-200'
                  : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
              }`}
            >
              {isHandoff
                ? `Prep: ${STORY_TIME_CONFIG.endloopsPrepMinutes} min`
                : isRewound
                ? 'Reset to 8:00 AM'
                : STORY_TIME_CONFIG.chapter2BarLabel}
            </span>
          </div>
        </div>

        {/* Big Clock Digits Reel (4:15 PM -> 8:00 AM -> 8:25 AM) */}
        <div className="py-2 text-center overflow-hidden h-16 relative">
          <motion.div
            style={{ y: clockDigitY }}
            className="flex flex-col items-center will-change-transform"
          >
            {REWIND_CLOCKS.map((clockStr) => (
              <span
                key={clockStr}
                className={`h-16 flex items-center justify-center font-display font-black text-3xl sm:text-5xl tracking-tight tabular-nums ${
                  clockStr === ENDLOOPS_PREP_END_CLOCK
                    ? 'text-teal'
                    : clockStr === STORY_TIME_CONFIG.dayStartClock
                    ? 'text-navy-700'
                    : 'text-amber-600'
                }`}
              >
                {clockStr}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Horizontal Timeline Bar with Eased scaleX Drain */}
        <div className="space-y-1.5">
          <div className="h-3.5 sm:h-4 w-full bg-slate-100 rounded-pill border border-slate-200 overflow-hidden relative">
            {/* Manual Checking Segment (Drains right to left) */}
            <motion.div
              style={{
                scaleX: manualScaleX,
                transformOrigin: 'left',
              }}
              className="absolute inset-y-0 left-0 h-full w-full bg-amber-500 origin-left will-change-transform transition-colors duration-300"
            />

            {/* Endloops Prep Segment (Fills in teal from 0% to 4.63% at 8:25 AM) */}
            <motion.div
              style={{
                scaleX: prepScaleX,
                transformOrigin: 'left',
              }}
              className="absolute inset-y-0 left-0 h-full w-full bg-teal origin-left will-change-transform"
            />
          </div>

          {/* Timeline Axis Labels */}
          <div className="flex justify-between items-center text-xs font-mono text-navy-400 px-1">
            <span>{STORY_TIME_CONFIG.dayStartClock}</span>
            <span>{STORY_TIME_CONFIG.deadlineClock}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TransitionTimeHero
