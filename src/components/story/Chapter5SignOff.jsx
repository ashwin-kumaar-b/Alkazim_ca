import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Container } from '../ui/Container'
import { useStoryResolution } from '../../hooks/useStoryResolution'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { CHAPTER_RUNWAYS } from '../../data/storyBeatsData'
import { EASINGS } from '../../styles/motionTokens'
import { ClosingLoopSvg } from './ClosingLoopSvg'
import {
  SIGN_OFF_CLOCK,
  STORY_TIME_CONFIG,
  getChapter5Sub,
} from '../../config/storyTimeConfig'
import { WorkingPaperRows } from './WorkingPaperRows'
import { PressAndHoldButton } from './PressAndHoldButton'

export function Chapter5SignOff({ resolution: extResolution }) {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const shouldStack = isMobile || shouldReduceMotion

  const localResolution = useStoryResolution()
  const resolution = extResolution || localResolution
  const { isSigned, setIsSigned, allResolved, resolvedCount, resolveAll } = resolution

  // Pinned scene useScroll: target containerRef, offset start start -> end end
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [arrivedByJump, setArrivedByJump] = useState(false)

  useEffect(() => {
    const onJump = (e) => {
      if (e.detail?.targetId === 'chapter-5') setArrivedByJump(true)
    }
    window.addEventListener('endloops:jump-complete', onJump)
    return () => window.removeEventListener('endloops:jump-complete', onJump)
  }, [])

  return (
    <section
      ref={containerRef}
      id="chapter-5"
      className={`relative bg-gradient-to-b from-white via-calm-teal/40 to-white border-b border-teal-100 transition-colors duration-500 ${
        shouldStack ? 'py-16 sm:py-24' : CHAPTER_RUNWAYS.chapter5
      }`}
    >
      <div role="status" aria-live="polite" className="sr-only">
        {isSigned ? 'Working Paper WP-410 signed and sealed. Countdown stopped.' : 'Chapter 5: Awaiting sign-off.'}
      </div>

      {/* Pinned Scene: 100vh/100svh, sticky top: 0 offset by navbar + progress bar */}
      <div className={shouldStack ? 'relative' : 'pinned-scene'}>
        {/* Immediate crisp state without hidden whileInView veil after jumps/refresh */}
        <div className="w-full will-change-transform">
          <Container size="xl" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Narrative Copy & Dynamic Countdown */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="inline-flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="font-semibold text-teal uppercase tracking-widest">Chapter 05</span>
                  <span className="text-navy-300">·</span>
                  <span className="text-navy font-semibold">{SIGN_OFF_CLOCK}</span>
                  <span className="text-navy-300">·</span>

                  {isSigned ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-900 font-semibold border border-green-300 animate-pulse">
                      Signed at {SIGN_OFF_CLOCK}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-900 font-semibold border border-green-200">
                      Ready to Sign · {SIGN_OFF_CLOCK}
                    </span>
                  )}
                </div>

                <h2 className="text-h1 font-display text-navy tracking-tight">{STORY_TIME_CONFIG.chapter5Headline}</h2>
                <p className="text-body-lg text-navy-400 leading-relaxed font-normal">
                  {getChapter5Sub()}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-teal-800 bg-white border border-teal-200 px-3.5 py-1.5 rounded-pill shadow-xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${isSigned ? 'bg-green-600' : allResolved ? 'bg-teal' : 'bg-amber-500'}`} aria-hidden="true" />
                    <span>
                      {isSigned
                        ? `WP-410 lead schedule sealed · Ready for ${STORY_TIME_CONFIG.deadlineClock} partner review`
                        : allResolved
                        ? 'All 3 exceptions resolved · Ready for sign-off'
                        : `Awaiting 3 resolutions in Chapter 4 (${resolvedCount}/3 completed)`}
                    </span>
                  </span>
                </div>

                {/* Closing Line Fades In on Completion */}
                <AnimatePresence>
                  {isSigned && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: EASINGS.easeInOut }}
                      className="mt-6 p-4 rounded-xl bg-teal-50/80 border border-teal-200 shadow-xs"
                    >
                      <p className="text-small text-teal-900 font-medium italic leading-relaxed">
                        “{STORY_TIME_CONFIG.chapter5ClosingLine}”
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Draft Working Paper (~60% width) */}
              <div className="lg:col-span-7 relative w-full flex flex-col items-center">
                <div className="w-full max-w-xl sm:max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card relative z-10 space-y-5">
                  <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-mono text-navy-400 uppercase tracking-widest block">Working Paper Reference</span>
                      <span className="text-small font-mono font-bold text-navy">WP-410 · Lead Audit Schedule</span>
                    </div>
                    <span className={`px-3 py-1 rounded-pill text-xs font-mono font-semibold transition-colors duration-300 ${
                      isSigned ? 'bg-green-100 text-green-700 border border-green-200' : allResolved ? 'bg-calm-teal text-teal-700 border border-teal-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {isSigned ? '✓ Signed & Sealed' : allResolved ? 'Ready for Sign-off' : `Pending Resolution (${resolvedCount}/3)`}
                    </span>
                  </div>

                  <WorkingPaperRows
                    scrollYProgress={scrollYProgress}
                    shouldStack={shouldStack}
                    isMobile={isMobile}
                    shouldReduceMotion={shouldReduceMotion}
                    arrivedByJump={arrivedByJump}
                  />

                  <div className="pt-2">
                    <PressAndHoldButton isSigned={isSigned} disabled={!allResolved} onComplete={() => setIsSigned(true)} />
                  </div>

                  {!allResolved && (
                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={resolveAll}
                        className="text-xs font-mono text-teal hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal"
                      >
                        Resolve all 3 items in Chapter 4 now (Demo)
                      </button>
                    </div>
                  )}

                  {isSigned && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[11px] font-mono text-center text-navy-400 pt-1">
                      Audit Record: <span className="text-teal font-semibold">SHA256-DXB-9810-LEAD</span> · Signed & Locked
                    </motion.p>
                  )}
                </div>

                {isSigned && <ClosingLoopSvg isSigned={isSigned} isStatic={shouldStack} />}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}

export default Chapter5SignOff
