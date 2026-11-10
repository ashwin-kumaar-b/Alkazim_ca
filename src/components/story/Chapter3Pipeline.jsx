import React, { useRef } from 'react'
import { motion, useScroll, useInView } from 'framer-motion'
import { Container } from '../ui/Container'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { CUBE_CARDS } from '../../data/chapter3CubeData'
import {
  ENDLOOPS_PREP_END_CLOCK,
  STORY_TIME_CONFIG,
  getChapter3Sub,
} from '../../config/storyTimeConfig'
import { useChapter3Cube } from '../../hooks/useChapter3Cube'
import { MinimalSquare } from './MinimalSquare'
import { Chapter3CubeCard } from './Chapter3CubeCard'

export function Chapter3Pipeline() {
  const containerRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()

  // InView triggers ensure cards pop without scroll delay when scrolled into view
  const inView1 = useInView(card1Ref, { once: true, margin: '0px 0px -15% 0px' })
  const inView2 = useInView(card2Ref, { once: true, margin: '0px 0px -15% 0px' })
  const inView3 = useInView(card3Ref, { once: true, margin: '0px 0px -15% 0px' })

  // Natural document scroll tracking with responsive entry offset
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 85%'],
  })

  const {
    squareTravelPercent,
    squareRotate,
    squareBounceY,
    spineScaleY,
    card1Popped,
    card2Popped,
    card3Popped,
    popDelays,
    instantCards,
    settled,
    greyBgOp,
    tealBgOp,
  } = useChapter3Cube({
    scrollYProgress,
    shouldStack: shouldReduceMotion,
    inViews: { inView1, inView2, inView3 },
  })

  const cardRefs = [card1Ref, card2Ref, card3Ref]
  const cardStates = [card1Popped, card2Popped, card3Popped]
  const cardAligns = ['right', 'left', 'right']

  return (
    <section
      ref={containerRef}
      id="chapter-3"
      className="relative bg-white border-b border-teal-100 transition-colors duration-500 overflow-clip"
    >
      <div role="status" aria-live="polite" className="sr-only">
        {settled
          ? 'Chapter 3: Same 412 documents read, matched, checked. Ready for your review.'
          : 'Chapter 3: Three audit steps along the spine.'}
      </div>

      {/* Crossfading Background Layers: Tension Grey -> White & Light Calm Teal */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            style={{ opacity: greyBgOp }}
            className="absolute inset-0 bg-tension-bg pointer-events-none will-change-transform"
            aria-hidden="true"
          />
          <motion.div
            style={{ opacity: tealBgOp }}
            className="absolute inset-0 bg-gradient-to-b from-white via-calm-teal/35 to-white pointer-events-none will-change-transform"
            aria-hidden="true"
          />
        </>
      )}

      <Container size="xl" className="relative z-10 py-16 sm:py-24">
        {/* Top Header: Centered Headline & Sub (from storyTimeConfig) */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-12 sm:pb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs">
            <span className="font-semibold text-teal uppercase tracking-widest">
              Chapter 03
            </span>
            <span className="text-navy-300">·</span>
            <span className="text-navy font-semibold">{ENDLOOPS_PREP_END_CLOCK}</span>
            <span className="text-navy-300">·</span>
            <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-900 font-semibold border border-teal-200">
              Prep: {STORY_TIME_CONFIG.endloopsPrepMinutes} min
            </span>
          </div>

          <h2 className="text-h1 sm:text-[2.75rem] font-display font-extrabold text-navy tracking-tight leading-tight">
            Same 412 documents. Read, matched, checked.
          </h2>
          <p className="text-body-lg text-navy-400 max-w-2xl mx-auto leading-relaxed font-normal">
            {getChapter3Sub()}
          </p>
        </div>

        {/* Vertical Spine & Traveling 3D Cube Container */}
        <div className="relative w-full max-w-5xl mx-auto pt-6 pb-12">
          {/* Vertical Spine Track */}
          <div
            className={`absolute top-0 bottom-16 pointer-events-none z-10 ${
              isMobile ? 'left-5 sm:left-6' : 'left-1/2 -translate-x-1/2'
            }`}
          >
            <div className="absolute inset-y-0 left-0 w-0.5 border-l-2 border-dotted border-slate-300" />
            <motion.div
              style={shouldReduceMotion ? { scaleY: 1 } : { scaleY: spineScaleY }}
              className="absolute inset-y-0 left-0 w-0.5 bg-teal origin-top will-change-transform"
            />
            <motion.div
              style={shouldReduceMotion ? { top: '0%' } : { top: squareTravelPercent }}
              className="absolute left-0 -translate-x-1/2 -translate-y-1/2 z-20 will-change-transform"
            >
              <MinimalSquare
                rotate={shouldReduceMotion ? 0 : squareRotate}
                bounceY={shouldReduceMotion ? 0 : squareBounceY}
                isMobile={isMobile}
              />
            </motion.div>
          </div>

          {/* Three Cards along the Spine (Alternating Right, Left, Right) */}
          <div className="space-y-16 sm:space-y-24 relative z-10">
            {CUBE_CARDS.map((card, idx) => (
              <div
                key={card.id}
                ref={cardRefs[idx]}
                className={`flex items-center min-h-[45vh] sm:min-h-[55vh] ${
                  isMobile ? 'pl-14 sm:pl-16' : ''
                }`}
              >
                <Chapter3CubeCard
                  card={card}
                  isPopped={cardStates[idx]}
                  align={cardAligns[idx]}
                  isStatic={shouldReduceMotion}
                  popDelay={popDelays[idx]}
                  isInstant={instantCards[idx]}
                />
              </div>
            ))}
          </div>

          {/* Ending: Cube settles at bottom of spine, line fades in */}
          <div className="pt-24 sm:pt-32 text-center relative z-20">
            <motion.div
              initial={false}
              animate={settled || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex flex-col items-center gap-2 will-change-transform"
            >
              <span className="w-2 h-2 rounded-full bg-green" />
              <p className="text-h2 sm:text-h1 font-display font-bold text-navy tracking-tight">
                Ready for your review.
              </p>
              <p className="text-small font-mono text-teal-800">
                412 vouchers matched · 3 exceptions flagged
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Chapter3Pipeline
