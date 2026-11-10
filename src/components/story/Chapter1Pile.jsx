import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '../ui/Container'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { chapter1Beats, CHAPTER_RUNWAYS } from '../../data/storyBeatsData'
import { STORY_TIME_CONFIG } from '../../config/storyTimeConfig'
import { EASINGS, FLIP_CONFIG, COUNTER_CONFIG } from '../../styles/motionTokens'
import { FlippedInvoiceCard } from './FlippedInvoiceCard'
import { ChapterConnectorCurve } from './ChapterConnectorCurve'

export function Chapter1Pile() {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const shouldStack = isMobile || shouldReduceMotion

  // Pinned scene useScroll: target containerRef, offset start start -> end end
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Beat 1: Card 1 is visible at progress 0.0 (first frame), flips 3D [0.0 -> 0.16], underline [0.10 -> 0.20], holds to 0.28
  const card1FlipFront = useTransform(scrollYProgress, FLIP_CONFIG.flipProgressRange, [0, 180], { ease: EASINGS.easeInOut })
  const card1FlipBack = useTransform(scrollYProgress, FLIP_CONFIG.flipProgressRange, [180, 360], { ease: EASINGS.easeInOut })
  const card1Underline = useTransform(scrollYProgress, FLIP_CONFIG.underlineRange, [0, 1], { ease: EASINGS.easeInOut })

  // Beat 2: Card 2 arrives [0.28 -> 0.44], holds [0.44 -> 0.54]
  const card2Y = useTransform(scrollYProgress, [0.0, 0.28, 0.44, 0.54, 1.0], [90, 90, 22, 22, 22], { ease: EASINGS.easeInOut })
  const card2Op = useTransform(scrollYProgress, [0.0, 0.28, 0.38, 0.54, 1.0], [0, 0, 1, 1, 1], { ease: EASINGS.easeInOut })

  // Beat 3: Card 3 arrives [0.54 -> 0.70], holds [0.70 -> 0.78]
  const card3Y = useTransform(scrollYProgress, [0.0, 0.54, 0.70, 0.78, 1.0], [110, 110, 44, 44, 44], { ease: EASINGS.easeInOut })
  const card3Op = useTransform(scrollYProgress, [0.0, 0.54, 0.64, 0.78, 1.0], [0, 0, 1, 1, 1], { ease: EASINGS.easeInOut })

  // Beat 4: Card 4 arrives [0.78 -> 0.90], holds [0.90 -> 1.0]
  const card4Y = useTransform(scrollYProgress, [0.0, 0.78, 0.90, 1.0], [130, 130, 66, 66], { ease: EASINGS.easeInOut })
  const card4Op = useTransform(scrollYProgress, [0.0, 0.78, 0.86, 1.0], [0, 0, 1, 1], { ease: EASINGS.easeInOut })

  // Counter ticking up smoothly to target 412
  const counterVal = useTransform(scrollYProgress, COUNTER_CONFIG.chapter1.progressRange, [0, COUNTER_CONFIG.chapter1.target], { ease: EASINGS.easeInOut })
  const counterOp = useTransform(scrollYProgress, [0.0, COUNTER_CONFIG.chapter1.fadeRange[0], COUNTER_CONFIG.chapter1.fadeRange[1], 1.0], [0, 0, 1, 1], { ease: EASINGS.easeInOut })
  const [displayCount, setDisplayCount] = useState(shouldStack ? COUNTER_CONFIG.chapter1.target : 0)

  const [activeBeatIdx, setActiveBeatIdx] = useState(0)
  useEffect(() => {
    if (shouldStack) return
    const syncFromScroll = (p) => {
      let idx = 0
      chapter1Beats.forEach((b, i) => { if (p >= b.start) idx = i })
      setActiveBeatIdx(idx)
    }
    setDisplayCount(Math.round(counterVal.get()))
    syncFromScroll(scrollYProgress.get())
    const unsubC = counterVal.on('change', (v) => setDisplayCount(Math.round(v)))
    const unsubP = scrollYProgress.on('change', syncFromScroll)
    return () => { unsubC(); unsubP() }
  }, [counterVal, scrollYProgress, shouldStack])

  const activeBeat = chapter1Beats[activeBeatIdx]

  return (
    <section
      ref={containerRef}
      id="chapter-1"
      className={`relative bg-tension-bg border-y border-tension-border transition-colors duration-500 ${
        shouldStack ? 'py-12 sm:py-16' : CHAPTER_RUNWAYS.chapter1
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
                  <span className="font-semibold text-teal uppercase tracking-widest">Chapter 01</span>
                  <span className="text-navy-300">·</span>
                  <span className="text-navy font-semibold">{STORY_TIME_CONFIG.dayStartClock}</span>
                  <span className="text-navy-300">·</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                    Manual Checking Begins
                  </span>
                </div>

                <h2 className="text-h1 font-display text-navy tracking-tight">
                  {STORY_TIME_CONFIG.chapter1Headline}
                </h2>
                <p className="text-body-lg text-navy-400 leading-relaxed font-normal">
                  {STORY_TIME_CONFIG.chapter1Sub}
                </p>

                {/* Animated Counter Pill */}
                <motion.div style={shouldStack ? { opacity: 1 } : { opacity: counterOp }} className="pt-2">
                  <div className="inline-flex items-center gap-3 bg-white border border-tension-border rounded-xl px-4 py-2.5 shadow-xs">
                    <span className="font-mono text-2xl font-bold text-navy tabular-nums whitespace-nowrap">{shouldStack ? 412 : displayCount}</span>
                    <div className="border-l border-tension-border pl-3 text-left">
                      <p className="text-xs font-semibold text-navy">Documents queued</p>
                      <p className="text-[11px] font-mono text-navy-400">Month-End Statutory Batch</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Visual: 3D Flip Card Deck on Desktop, Stacked on Mobile (~60% width) */}
              <div className="lg:col-span-7 flex justify-center items-center w-full min-h-[400px] sm:min-h-[460px] relative">
                <div className={shouldStack ? 'relative w-full max-w-xl space-y-4' : 'relative w-full max-w-xl sm:max-w-2xl h-[400px]'}>
                  {/* Document 1: Visible immediately on first frame, 3D flips at progress 0 */}
                  <motion.div
                    initial={isMobile && !shouldReduceMotion ? { opacity: 0, y: 16 } : undefined}
                    whileInView={isMobile && !shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, ease: EASINGS.easeOut }}
                    style={shouldStack ? {} : { y: 0, opacity: 1, rotate: chapter1Beats[0].rotation }}
                    className={`${shouldStack ? 'relative' : 'absolute inset-x-0 top-0'} z-10 will-change-transform`}
                  >
                    <FlippedInvoiceCard
                      doc={chapter1Beats[0]}
                      flipRotateYFront={card1FlipFront}
                      flipRotateYBack={card1FlipBack}
                      highlightScaleX={card1Underline}
                      isStatic={shouldStack}
                    />
                  </motion.div>

                  {/* Documents 2, 3, 4 */}
                  {[
                    { b: chapter1Beats[1], y: card2Y, op: card2Op, z: 'z-20' },
                    { b: chapter1Beats[2], y: card3Y, op: card3Op, z: 'z-30' },
                    { b: chapter1Beats[3], y: card4Y, op: card4Op, z: 'z-40' },
                  ].map(({ b, y, op, z }) => (
                    <motion.div
                      key={b.id}
                      initial={isMobile && !shouldReduceMotion ? { opacity: 0, y: 16 } : undefined}
                      whileInView={isMobile && !shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, ease: EASINGS.easeOut }}
                      style={shouldStack ? {} : { y, opacity: op, rotate: b.rotation }}
                      className={`${shouldStack ? 'relative' : `absolute inset-x-0 top-0 ${z}`} bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-card will-change-transform`}
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[11px] font-mono text-navy-400">
                        <span className="font-semibold text-navy">{b.docId}</span>
                        <span className="px-2 py-0.5 rounded-full bg-tension-surface border border-tension-border text-[10px]">{b.docType}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-small font-semibold text-navy truncate">{b.vendor}</p>
                        <p className="text-xs text-navy-400 font-mono">{b.ref} · {b.date}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-navy-400">Unreconciled Total</span>
                        <span className="font-mono text-small sm:text-base font-bold text-navy tabular-nums whitespace-nowrap shrink-0">{b.amount}</span>
                      </div>
                    </motion.div>
                  ))}
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

export default Chapter1Pile
