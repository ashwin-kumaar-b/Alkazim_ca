import React, { useState } from 'react'
import {
  EFFICIENCY_NOTE,
  TIME_HANDED_BACK_MINUTES,
  TIME_HANDED_BACK_FORMATTED,
} from '../../config/storyTimeConfig'
import { AnimatedTimeCounter } from './AnimatedTimeCounter'
import { TimeComparisonBars } from './TimeComparisonBars'

/**
 * ImpactVisual
 * Minimalistic animated time comparison on the shared 8:00 AM to 5:00 PM timeline.
 */
export function ImpactVisual({ isInView = false, shouldReduceMotion = false }) {
  const [replayKey, setReplayKey] = useState(0)

  const handleReplay = () => {
    setReplayKey((k) => k + 1)
  }

  const isAnimated = isInView && !shouldReduceMotion

  return (
    <div
      className="w-full rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-card space-y-6"
      aria-label="Time comparison: Without Endloops vs With Endloops"
    >
      {/* Header: Clean Headline + Replay */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <h3 className="font-display font-bold text-h3 text-navy tracking-tight">
          The same work, on the same clock.
        </h3>

        <button
          type="button"
          onClick={handleReplay}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-button text-xs font-mono font-medium text-navy-600 hover:text-teal bg-slate-50 hover:bg-calm-teal border border-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal cursor-pointer shrink-0"
          aria-label="Replay time comparison animation"
        >
          <svg className="w-3.5 h-3.5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span>Replay</span>
        </button>
      </div>

      {/* Main Grid: Bars Left (8 cols) + Counter Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Bars & Shared Axis */}
        <div className="lg:col-span-8" key={replayKey}>
          <TimeComparisonBars isAnimated={isAnimated} />
        </div>

        {/* Right Column: Minimalist Counter Stat Card */}
        <div className="lg:col-span-4 p-6 rounded-xl bg-calm-teal/50 border border-teal-200/60 flex flex-col justify-center space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-900">
            Time handed back
          </span>
          <AnimatedTimeCounter
            totalMinutes={TIME_HANDED_BACK_MINUTES}
            targetFormatted={TIME_HANDED_BACK_FORMATTED}
            startDelay={2.4}
            replayKey={replayKey}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>
      </div>

      {/* Permanent Footnote Label */}
      <div className="pt-2 border-t border-slate-100 text-caption font-mono text-navy-400">
        * {EFFICIENCY_NOTE}
      </div>
    </div>
  )
}

export default ImpactVisual
