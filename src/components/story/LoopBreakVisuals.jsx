import React from 'react'
import { motion } from 'framer-motion'
import { MANUAL_END_CLOCK, STORY_TIME_CONFIG } from '../../config/storyTimeConfig'

/**
 * LoopBreakVisuals — Phase 1
 * Tension, invoice rows, tightening teal curve, freeze moment, and laser snap line.
 * Staging:
 *  1. Mono line fades in (300ms).
 *  2. Hold 400ms scroll, headline fades up from translateY 12px (500ms).
 *  3. Hold 600ms scroll, sub lines fade in soft teal (400ms).
 *  4. Hold full frame for a beat of silence before the snap line triggers.
 * Reduced motion: all three lines render statically.
 */
export function LoopBreakVisuals({
  rowsY,
  rowsOp,
  tighteningLoopPath,
  tighteningLoopScale,
  tighteningLoopOp,
  monoOp,
  headlineOp,
  headlineY,
  subOp,
  subY,
  snapLineScaleX,
  snapLineOp,
  letterboxScaleY,
  shouldReduceMotion = false,
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-clip">
      {/* Cinematic Letterbox Bars */}
      <motion.div
        style={{ scaleY: letterboxScaleY }}
        className="absolute top-0 inset-x-0 h-14 sm:h-20 bg-black/40 z-25 origin-top will-change-transform"
        aria-hidden="true"
      />
      <motion.div
        style={{ scaleY: letterboxScaleY }}
        className="absolute bottom-0 inset-x-0 h-14 sm:h-20 bg-black/40 z-25 origin-bottom will-change-transform"
        aria-hidden="true"
      />

      {/* Accelerating Invoice Rows */}
      <motion.div
        style={{ y: rowsY, opacity: rowsOp }}
        className="w-full max-w-md sm:max-w-lg px-4 space-y-3 z-10 will-change-transform"
      >
        <div className="flex justify-center pb-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-amber-100 text-amber-900 border border-amber-300 font-mono text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
            <span>{MANUAL_END_CLOCK} · {STORY_TIME_CONFIG.chapter2BarLabel}</span>
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-card">
          <div className="flex items-center justify-between text-xs font-mono pb-1 border-b border-slate-100">
            <span className="font-bold text-navy">INV-2024-0941</span>
            <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Duplicate Submission
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-small font-semibold text-navy">Al-Bahar Logistics LLC</p>
              <p className="text-[11px] font-mono text-navy-400">PO #4410 · 29-Oct-2024</p>
            </div>
            <span className="font-mono text-small font-bold text-navy tabular-nums">
              AED 14,500.00
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tightening Teal Curve */}
      <motion.div
        style={{
          scale: tighteningLoopScale,
          opacity: tighteningLoopOp,
        }}
        className="absolute inset-4 sm:inset-12 z-15 flex items-center justify-center will-change-transform"
        aria-hidden="true"
      >
        <svg viewBox="0 0 800 500" fill="none" className="w-full h-full max-w-4xl max-h-[80vh]">
          <motion.rect
            x="40"
            y="40"
            width="720"
            height="420"
            rx="40"
            stroke="#118379"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            style={{ pathLength: tighteningLoopPath }}
            className="will-change-transform"
          />
        </svg>
      </motion.div>

      {/* Staged Freeze Beat: Mono Line -> Headline -> Sub Lines */}
      <div className="absolute z-30 w-full max-w-4xl px-4 sm:px-6 text-center space-y-3 pointer-events-none">
        {/* 1. Small mono line above the headline */}
        <motion.p
          style={shouldReduceMotion ? { opacity: 1 } : { opacity: monoOp }}
          className="font-mono text-xs sm:text-small font-medium text-amber-300 tracking-wider uppercase will-change-transform"
        >
          {MANUAL_END_CLOCK} · {STORY_TIME_CONFIG.chapter2BarLabel}
        </motion.p>

        {/* 2. Headline (one line, never wraps, scale font down on small screens) */}
        <motion.h2
          style={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: headlineOp, y: headlineY }
          }
          className="text-[clamp(1.15rem,4.4vw,2.85rem)] font-display font-extrabold text-white tracking-tight leading-tight whitespace-nowrap will-change-transform"
        >
          Your name goes on this file.
        </motion.h2>

        {/* 3. Sub lines in soft teal */}
        <motion.div
          style={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: subOp, y: subY }
          }
          className="space-y-1.5 will-change-transform pt-1"
        >
          <p className="text-body sm:text-body-lg md:text-h3 font-sans font-medium text-teal-200/90 leading-relaxed">
            You found one duplicate. How many are still hiding?
          </p>
          <p className="text-body-lg sm:text-h3 font-sans font-semibold text-teal-300 tracking-tight">
            what if there was another way?
          </p>
        </motion.div>
      </div>

      {/* Laser Snap Line */}
      <motion.div
        style={{ scaleX: snapLineScaleX, opacity: snapLineOp }}
        className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-teal via-green to-teal z-40 origin-left will-change-transform shadow-[0_0_12px_#118379]"
        aria-hidden="true"
      />
    </div>
  )
}

export default LoopBreakVisuals
