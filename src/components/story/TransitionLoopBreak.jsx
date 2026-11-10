import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { EASINGS, RUNWAY_HEIGHTS } from '../../styles/motionTokens'
import { DAY_RATIOS } from '../../config/storyTimeConfig'
import { TransitionTimeHero } from './TransitionTimeHero'
import { LoopBreakVisuals } from './LoopBreakVisuals'
import { LoopBreakStatement } from './LoopBreakStatement'

/**
 * TransitionLoopBreak
 * Three distinct sequential phases with zero collision:
 * - Phase 1 (0.0 -> 0.30): Purple background, tension break, freeze question & snap line.
 * - Phase 2 (0.32 -> 0.65): The timer on the SAME purple background (rewinds 4:15 PM -> 8:00 AM -> 8:25 AM).
 * - Phase 3 (0.67 -> 1.00): "THE LOOP ENDS HERE." statement slams in and releases to Chapter 3.
 */
export function TransitionLoopBreak() {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const shouldStack = isMobile || shouldReduceMotion

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ─── Background Canvases ──────────────────────────────────────────────────
  // Purple background stays active through Phase 1 AND Phase 2 (0.0 -> 0.66)
  const purpleBgOp = useTransform(scrollYProgress, [0.0, 0.05, 0.65, 0.70], [0, 1, 1, 0], { ease: EASINGS.easeInOut })
  // Calm white/teal canvas crossfades in for Phase 3 (0.66 -> 1.0)
  const calmBgOp = useTransform(scrollYProgress, [0.66, 0.72, 1.0], [0, 1, 1], { ease: EASINGS.easeInOut })

  // ─── PHASE 1: Tension, Curve, Freeze & Snap (0.0 -> 0.30) ─────────────────
  const letterboxScaleY = useTransform(scrollYProgress, [0.04, 0.10, 0.25, 0.29], [0, 1, 1, 0], { ease: EASINGS.easeInOut })
  const rowsY = useTransform(scrollYProgress, [0.0, 0.10], [0, -120], { ease: EASINGS.easeInOut })
  const rowsOp = useTransform(scrollYProgress, [0.0, 0.06, 0.10], [1, 1, 0], { ease: EASINGS.easeInOut })
  const tighteningLoopPath = useTransform(scrollYProgress, [0.02, 0.12], [0, 1], { ease: EASINGS.easeInOut })
  const tighteningLoopScale = useTransform(scrollYProgress, [0.04, 0.12], [1.0, 0.8], { ease: EASINGS.easeInOut })
  const tighteningLoopOp = useTransform(scrollYProgress, [0.0, 0.04, 0.22, 0.26], [0, 1, 1, 0], { ease: EASINGS.easeInOut })

  // Staged Freeze Beat: 1. Mono line -> 2. Headline -> 3. Sub -> 4. Hold full frame
  const monoOp = useTransform(scrollYProgress, [0.08, 0.11, 0.27, 0.29], [0, 1, 1, 0], { ease: EASINGS.easeInOut })
  const headlineOp = useTransform(scrollYProgress, [0.14, 0.17, 0.27, 0.29], [0, 1, 1, 0], { ease: EASINGS.easeInOut })
  const headlineY = useTransform(scrollYProgress, [0.14, 0.17], [12, 0], { ease: EASINGS.easeOut })
  const subOp = useTransform(scrollYProgress, [0.21, 0.24, 0.27, 0.29], [0, 1, 1, 0], { ease: EASINGS.easeInOut })
  const subY = useTransform(scrollYProgress, [0.21, 0.24], [8, 0], { ease: EASINGS.easeOut })

  const snapLineScaleX = useTransform(scrollYProgress, [0.27, 0.30], [0, 1], { ease: EASINGS.easeOut })
  const snapLineOp = useTransform(scrollYProgress, [0.27, 0.29, 0.30], [1, 1, 0], { ease: EASINGS.easeInOut })

  // ─── PHASE 2: The Timer on the SAME Purple Background (0.33 -> 0.66) ──────
  const heroOp = useTransform(scrollYProgress, [0.33, 0.38, 0.62, 0.66], [0, 1, 1, 0], { ease: EASINGS.easeInOut })
  const heroScale = useTransform(scrollYProgress, [0.33, 0.38, 0.62, 0.66], [0.92, 1.0, 1.0, 0.94], { ease: EASINGS.easeInOut })
  const heroY = useTransform(scrollYProgress, [0.33, 0.38, 0.62, 0.66], [20, 0, 0, -20], { ease: EASINGS.easeInOut })

  // Initial hold at 4:15 PM (0.38 -> 0.44), slow rewind (0.44 -> 0.54), hold at 8:00 AM (0.54 -> 0.58), prep fill (0.58 -> 0.62)
  const manualScaleX = useTransform(scrollYProgress, [0.33, 0.44, 0.54], [DAY_RATIOS.manual, DAY_RATIOS.manual, 0], { ease: EASINGS.easeOut })
  const prepScaleX = useTransform(scrollYProgress, [0.58, 0.62], [0, DAY_RATIOS.prep], { ease: EASINGS.easeInOut })

  // Clock: 4:15 PM -> 8:00 AM (-448px) -> 8:25 AM (-512px)
  const clockDigitY = useTransform(
    scrollYProgress,
    [0.33, 0.44, 0.54, 0.58, 0.62],
    [0, 0, -448, -448, -512],
    { ease: EASINGS.easeOut }
  )

  // ─── PHASE 3: "THE LOOP ENDS HERE." Statement (0.70 -> 1.0) ───────────────
  const word1Op = useTransform(scrollYProgress, [0.70, 0.74], [0, 1], { ease: EASINGS.easeInOut })
  const word1Y = useTransform(scrollYProgress, [0.70, 0.74], [20, 0], { ease: EASINGS.easeInOut })
  const word2Op = useTransform(scrollYProgress, [0.74, 0.78], [0, 1], { ease: EASINGS.easeInOut })
  const word2Y = useTransform(scrollYProgress, [0.74, 0.78], [20, 0], { ease: EASINGS.easeInOut })
  const word3Op = useTransform(scrollYProgress, [0.78, 0.82], [0, 1], { ease: EASINGS.easeInOut })
  const word3Y = useTransform(scrollYProgress, [0.78, 0.82], [20, 0], { ease: EASINGS.easeInOut })
  const word4Op = useTransform(scrollYProgress, [0.82, 0.86], [0, 1], { ease: EASINGS.easeInOut })
  const word4Y = useTransform(scrollYProgress, [0.82, 0.86], [20, 0], { ease: EASINGS.easeInOut })
  const line2Op = useTransform(scrollYProgress, [0.86, 0.90], [0, 1], { ease: EASINGS.easeInOut })
  const line2Y = useTransform(scrollYProgress, [0.86, 0.90], [16, 0], { ease: EASINGS.easeInOut })
  const sublineOp = useTransform(scrollYProgress, [0.89, 0.93], [0, 1], { ease: EASINGS.easeInOut })
  const sublineY = useTransform(scrollYProgress, [0.89, 0.93], [12, 0], { ease: EASINGS.easeInOut })

  // Full statement holds from 0.93 to 0.97, then gently releases into Chapter 3
  const statementScale = useTransform(scrollYProgress, [0.97, 1.0], [1, 0.90], { ease: EASINGS.easeInOut })
  const statementY = useTransform(scrollYProgress, [0.97, 1.0], [0, -60], { ease: EASINGS.easeInOut })
  const statementOp = useTransform(scrollYProgress, [0.97, 1.0], [1, 0.25], { ease: EASINGS.easeInOut })

  // Boolean flags for badge label updates
  const [isRewound, setIsRewound] = useState(false)
  const [isHandoff, setIsHandoff] = useState(false)

  useEffect(() => {
    const syncPhaseFlags = (p) => {
      setIsRewound(p >= 0.54 && p < 0.62)
      setIsHandoff(p >= 0.62)
    }
    syncPhaseFlags(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', syncPhaseFlags)
    return () => unsub()
  }, [scrollYProgress])

  // Reduced motion: skip rewind, simple sequential fade
  if (shouldStack) {
    return (
      <section id="transition-loop-break" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-tension-surface to-white border-y border-teal-100 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-teal font-semibold">System Reset · 8:00 AM</span>
          <h2 className="text-h1 sm:text-display font-display font-extrabold text-navy tracking-tight">THE LOOP ENDS HERE.</h2>
          <p className="text-h2 font-display font-bold text-teal">This is Endloops.</p>
          <p className="text-body-lg text-navy-400 max-w-xl mx-auto">Same work. Less time.</p>
        </motion.div>
      </section>
    )
  }

  return (
    <section ref={containerRef} id="transition-loop-break" className={`relative bg-tension-surface ${RUNWAY_HEIGHTS.transitionLoopBreak}`}>
      <div role="status" aria-live="polite" className="sr-only">
        The loop breaks in three phases: tension break, clock rewinds from 4:15 PM to 8:00 AM, and THE LOOP ENDS HERE statement.
      </div>

      <div className="pinned-scene">
        {/* Phase 1 & Phase 2: Purple Background Canvas */}
        <motion.div
          style={{ opacity: purpleBgOp }}
          className="absolute inset-0 bg-gradient-to-b from-[#2E1065] via-[#4C1D95] to-[#6D28D9] pointer-events-none will-change-transform"
          aria-hidden="true"
        />

        {/* Phase 3: Calm White & Light Teal Canvas (Crossfades into Chapter 3) */}
        <motion.div
          style={{ opacity: calmBgOp }}
          className="absolute inset-0 bg-gradient-to-b from-calm-teal/30 via-white to-calm-teal/35 pointer-events-none will-change-transform"
          aria-hidden="true"
        />

        {/* PHASE 1: Tension, Curve, Freeze Beat & Laser Snap (0.0 -> 0.30) */}
        <LoopBreakVisuals
          rowsY={rowsY}
          rowsOp={rowsOp}
          tighteningLoopPath={tighteningLoopPath}
          tighteningLoopScale={tighteningLoopScale}
          tighteningLoopOp={tighteningLoopOp}
          monoOp={monoOp}
          headlineOp={headlineOp}
          headlineY={headlineY}
          subOp={subOp}
          subY={subY}
          snapLineScaleX={snapLineScaleX}
          snapLineOp={snapLineOp}
          letterboxScaleY={letterboxScaleY}
          shouldReduceMotion={shouldReduceMotion}
        />

        {/* PHASE 2: The Timer on the Same Purple Background (0.32 -> 0.65) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <TransitionTimeHero
            heroScale={heroScale}
            heroY={heroY}
            heroOp={heroOp}
            manualScaleX={manualScaleX}
            prepScaleX={prepScaleX}
            clockDigitY={clockDigitY}
            isRewound={isRewound}
            isHandoff={isHandoff}
          />
        </div>

        {/* PHASE 3: "THE LOOP ENDS HERE." Statement (0.67 -> 1.0) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <LoopBreakStatement
            statementScale={statementScale}
            statementY={statementY}
            statementOp={statementOp}
            word1Op={word1Op}
            word1Y={word1Y}
            word2Op={word2Op}
            word2Y={word2Y}
            word3Op={word3Op}
            word3Y={word3Y}
            word4Op={word4Op}
            word4Y={word4Y}
            line2Op={line2Op}
            line2Y={line2Y}
            sublineOp={sublineOp}
            sublineY={sublineY}
          />
        </div>
      </div>
    </section>
  )
}

export default TransitionLoopBreak
