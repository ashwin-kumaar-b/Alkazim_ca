import React, { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { Container } from '../ui/Container'
import {
  ENDLOOPS_PREP_END_CLOCK,
  SIGN_OFF_CLOCK,
  STORY_TIME_CONFIG,
} from '../../config/storyTimeConfig'
import { FlagResolutionCard } from './FlagResolutionCard'
import { useStoryResolution } from '../../hooks/useStoryResolution'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { ChapterConnectorCurve } from './ChapterConnectorCurve'

export function Chapter4Draft({ resolution: extResolution }) {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const shouldStack = isMobile || shouldReduceMotion

  // Fallback to local resolution hook if not provided by parent
  const localResolution = useStoryResolution()
  const resolution = extResolution || localResolution
  const { flags, resolveFlag, resetFlags, resolveAll, resolvedCount, allResolved, announcement } = resolution

  // Connecting curve scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={containerRef}
      id="chapter-4"
      className="relative bg-white border-b border-slate-200 py-16 sm:py-24"
    >
      {/* Screen reader live region */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {/* Immediate crisp state without hidden whileInView veil after jumps/refresh */}
      <div className="w-full will-change-transform">
        <Container size="xl">
          {/* Section Header */}
          <div className="max-w-2xl text-left pb-8 mb-8 border-b border-slate-100 space-y-3">
            <div className="inline-flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="font-semibold text-teal uppercase tracking-widest">Chapter 04</span>
              <span className="text-navy-300">·</span>
              <span className="text-navy font-semibold">{ENDLOOPS_PREP_END_CLOCK} – {SIGN_OFF_CLOCK}</span>
              <span className="text-navy-300">·</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-light text-purple font-semibold border border-purple/30">
                {resolvedCount === 3
                  ? `Your review: ${STORY_TIME_CONFIG.reviewMinutes} min complete`
                  : `Your review: ${resolvedCount} of 3 resolved`}
              </span>
            </div>
            <h2 className="text-h1 font-display text-navy tracking-tight">
              A schedule is ready. Three items need your judgement.
            </h2>
            <p className="text-body-lg text-navy-400 leading-relaxed font-normal">
              Matching is done. Review the three flagged items and make your call with a click.
            </p>
          </div>

          {/* Interactive Workbench Container (~60% viewport feel) */}
          <div className="w-full max-w-5xl mx-auto space-y-6">
            {/* Status & Counter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-calm-subtle border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-full border transition-colors ${
                    allResolved
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  {resolvedCount} of 3 resolved
                </span>
                <span className="text-xs font-mono text-navy-500 hidden sm:inline">
                  {allResolved
                    ? 'All 3 items decided. Ready for sign-off.'
                    : 'Approve or Reject each item to complete the schedule.'}
                </span>
              </div>

              {/* Action shortcuts */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetFlags}
                  className="text-xs font-mono text-navy-500 hover:text-navy hover:underline px-2.5 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                >
                  Reset decisions
                </button>
                {!allResolved && (
                  <button
                    type="button"
                    onClick={resolveAll}
                    className="text-xs font-mono font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1 rounded-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                  >
                    Resolve All (Demo)
                  </button>
                )}
              </div>
            </div>

            {/* 3 Interactive Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {flags.map((flag) => (
                <FlagResolutionCard
                  key={flag.id}
                  flag={flag}
                  onResolve={resolveFlag}
                />
              ))}
            </div>

            {/* All-Resolved Callout */}
            {allResolved && (
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs sm:text-small flex items-center justify-between gap-4 animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-green" />
                  <span className="font-mono font-semibold">
                    All exceptions resolved. Lead schedule WP-410 is balanced and ready for sign-off.
                  </span>
                </div>
                <a
                  href="#chapter-5"
                  className="font-mono text-xs font-bold text-teal hover:text-teal-800 underline shrink-0"
                >
                  Proceed to Chapter 5 ↓
                </a>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Inter-Chapter Connecting Curve into Chapter 5 */}
      {!shouldStack && (
        <ChapterConnectorCurve
          scrollYProgress={scrollYProgress}
          range={[0.82, 0.98]}
        />
      )}
    </section>
  )
}

export default Chapter4Draft
