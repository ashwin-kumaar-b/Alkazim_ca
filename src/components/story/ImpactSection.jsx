import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '../ui/Container'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ImpactVisual } from './ImpactVisual'
import { ImpactCardsGrid } from './ImpactCardsGrid'
import { EASINGS } from '../../styles/motionTokens'

/**
 * ImpactSection
 * "What changes" impact section placed after Chapter 5 (Sign-Off)
 * and before "Two ways to meet Endloops".
 * Features:
 *  - Headline: "What changes when the prep work is done for you."
 *  - Horizontal efficiency visual (same evening comparison)
 *  - Five impact cards (from data file) with hover lift
 *  - Optional figures strip (all null by default)
 */
export function ImpactSection() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  const fadeUpTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: EASINGS.easeOut }

  return (
    <section
      ref={sectionRef}
      id="what-changes"
      className="relative bg-white py-20 sm:py-28 border-t border-slate-100 overflow-clip"
      aria-label="What changes with Endloops"
    >
      <Container size="xl" className="space-y-16 sm:space-y-20">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={fadeUpTransition}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <span className="font-mono text-xs font-semibold text-teal tracking-widest uppercase">
            What changes
          </span>
          <h2 className="text-h1 sm:text-display font-display font-bold text-navy tracking-tight leading-tight">
            The same work, on the same clock.
          </h2>
          <p className="text-body-lg text-navy-400 max-w-2xl mx-auto font-sans leading-relaxed">
            What changes when the prep work is done for you: your team's day transforms from manual checking into confident review and sign-off.
          </p>
        </motion.div>

        {/* Efficiency Visual: Two Horizontal Timelines on the SAME Scale */}
        <div className="max-w-4xl mx-auto w-full">
          <ImpactVisual isInView={isInView} shouldReduceMotion={shouldReduceMotion} />
        </div>

        {/* Five Impact Cards Grid */}
        <div className="max-w-5xl mx-auto w-full">
          <ImpactCardsGrid isInView={isInView} shouldReduceMotion={shouldReduceMotion} />
        </div>

        {/* Closing CTA */}
        <div className="pt-2 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-button bg-navy text-white font-display font-semibold hover:bg-navy-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            Request a demo
          </a>
        </div>
      </Container>
    </section>
  )
}

export default ImpactSection
