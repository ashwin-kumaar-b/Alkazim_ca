import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '../ui/Container'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { loopItems } from '../../data/chapter2Data'
import { chapter2Beats, CHAPTER_RUNWAYS } from '../../data/storyBeatsData'
import { MANUAL_END_CLOCK, STORY_TIME_CONFIG } from '../../config/storyTimeConfig'
import { EASINGS } from '../../styles/motionTokens'
import { LoopVoucherCard } from './LoopVoucherCard'
import { ChapterConnectorCurve } from './ChapterConnectorCurve'

export function Chapter2Loop() {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const shouldStack = isMobile || shouldReduceMotion

  // Pinned scene useScroll: target containerRef, offset start start -> end end
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Beat 1 begins at progress 0.0: Eased stuttering loop translation starts immediately upon pinning
  const cycleY = useTransform(
    scrollYProgress,
    [0.0, 0.22, 0.32, 0.52, 0.62, 0.82, 1.0],
    [0, -35, -35, -75, -75, -115, -115],
    { ease: EASINGS.easeInOut }
  )

  const infinityOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.25, 0.70, 1.0],
    [0.4, 0.65, 0.65, 0.35],
    { ease: EASINGS.easeInOut }
  )

  // Beat 3: Flag appearing on duplicate card
  const amberOutlineOp = useTransform(scrollYProgress, [0.48, 0.58], [0, 1], { ease: EASINGS.easeInOut })
  const flagSlideX = useTransform(scrollYProgress, [0.58, 0.68], [24, 0], { ease: EASINGS.springGentle })
  const flagOp = useTransform(scrollYProgress, [0.58, 0.64], [0, 1], { ease: EASINGS.easeInOut })

  const [activeBeatIdx, setActiveBeatIdx] = useState(0)
  useEffect(() => {
    if (shouldStack) return
    const syncBeat = (p) => {
      let idx = 0
      chapter2Beats.forEach((b, i) => { if (p >= b.start) idx = i })
      setActiveBeatIdx(idx)
    }
    syncBeat(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', syncBeat)
    return () => unsub()
  }, [scrollYProgress, shouldStack])

  const activeBeat = chapter2Beats[activeBeatIdx]

  return (
    <section
      ref={containerRef}
      id="chapter-2"
      className={`relative bg-tension-surface border-b border-tension-border transition-colors duration-500 ${
        shouldStack ? 'py-12 sm:py-16' : CHAPTER_RUNWAYS.chapter2
      }`}
    >
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {activeBeat?.caption}
      </div>

      {/* Pinned Scene: 100vh/100svh, sticky top: 0 offset by navbar + progress bar */}
      <div className={shouldStack ? 'relative' : 'pinned-scene'}>
        {/* Immediate crisp state without hidden whileInView veil after jumps/refresh */}
        <div className="w-full will-change-transform">
          <Container size="xl" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Copy Column */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="inline-flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="font-semibold text-teal uppercase tracking-widest">Chapter 02</span>
                  <span className="text-navy-300">·</span>
                  <span className="text-navy font-semibold">{MANUAL_END_CLOCK}</span>
                  <span className="text-navy-300">·</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300 animate-pulse">
                    {STORY_TIME_CONFIG.chapter2BarLabel}
                  </span>
                </div>

                <h2 className="text-h1 font-display text-navy tracking-tight">
                  By invoice 200, they all look the same.
                </h2>
                <p className="text-body-lg text-navy-400 leading-relaxed font-normal">
                  You retype TRNs, tick off quantities, and check the same totals line by line. Hours into manual ticking, fatigue sets in. Somewhere in the stack, a duplicate slips through.
                </p>

                <div className="pt-2">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-xs font-mono text-amber-900 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
                    <span>8h 15m of manual checking · 45 minutes before review</span>
                  </div>
                </div>
              </div>

              {/* Right Visual: Infinity curve + cycling repeating cards (~60% width) */}
              <div className="lg:col-span-7 flex justify-center items-center w-full min-h-[420px] sm:min-h-[480px] relative">
                <motion.div
                  style={{ opacity: shouldStack ? 0.4 : infinityOpacity }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 400 200" className="w-full max-w-xl h-auto text-teal/20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" aria-hidden="true">
                    <path d="M100,100 C40,40 40,160 100,100 C160,40 240,160 300,100 C360,40 360,160 300,100 C240,40 160,160 100,100 Z" />
                  </svg>
                </motion.div>

                <div className="relative w-full max-w-xl sm:max-w-2xl py-6 px-1 min-h-[440px] overflow-clip">
                  <motion.div
                    style={shouldStack ? {} : { y: cycleY }}
                    className="space-y-3.5 will-change-transform"
                  >
                    {loopItems.map((item) => (
                      <LoopVoucherCard
                        key={item.id}
                        item={item}
                        amberOutlineOp={amberOutlineOp}
                        flagSlideX={flagSlideX}
                        flagOp={flagOp}
                        shouldStack={shouldStack}
                        isMobile={isMobile}
                        shouldReduceMotion={shouldReduceMotion}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Inter-Chapter Connecting Curve */}
      {!shouldStack && <ChapterConnectorCurve scrollYProgress={scrollYProgress} />}
    </section>
  )
}

export default Chapter2Loop
