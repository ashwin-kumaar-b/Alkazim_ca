import React from 'react'
import { motion } from 'framer-motion'
import { ReadVisual, MatchVisual, CheckVisual } from './Chapter3CardVisuals'

/**
 * Chapter3CubeCard
 * Single large step card (about 44% container width on desktop).
 * Pops when cube lands on anchor; once open, never closes or fades.
 */
export function Chapter3CubeCard({
  card,
  isPopped,
  align = 'right', // 'right' or 'left'
  isStatic = false,
  popDelay = 0,
  isInstant = false,
}) {
  const isFlagged = card.tagTone === 'amber'
  const popSpring = {
    duration: isStatic || isInstant ? 0 : 0.4,
    delay: isStatic || isInstant ? 0 : popDelay,
    ease: [0.34, 1.3, 0.64, 1],
  }

  // Align left vs right on desktop
  const desktopAlignClass =
    align === 'left'
      ? 'md:mr-auto md:ml-0'
      : 'md:ml-auto md:mr-0'

  return (
    <div className={`w-full md:w-[44%] lg:w-[45%] ${desktopAlignClass}`}>
      <motion.article
        initial={false}
        animate={
          isStatic
            ? { scale: 1, opacity: 1 }
            : isPopped
            ? { scale: 1, opacity: 1 }
            : { scale: 0.92, opacity: 0 }
        }
        transition={popSpring}
        aria-label={`${card.title} - ${card.tag}`}
        className={`w-full p-6 sm:p-8 rounded-2xl border bg-white shadow-card transition-colors duration-300 space-y-4 will-change-transform ${
          isFlagged && isPopped
            ? 'border-amber-400 bg-amber-50/15 ring-1 ring-amber-300'
            : 'border-slate-200'
        }`}
      >
        {/* Card Header: Step & Outcome Tag */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="font-mono text-xs font-bold text-teal tracking-widest uppercase">
            Step {card.stepNumber}
          </span>
          <span
            className={`font-mono text-xs font-bold px-3 py-1 rounded-full shadow-xs ${
              isFlagged
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-teal-50 text-teal-900 border border-teal-200'
            }`}
          >
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-h2 font-display font-bold text-navy tracking-tight">
          {card.title}
        </h3>

        {/* How It Works Paragraph */}
        <p className="text-small sm:text-body text-navy-400 leading-relaxed font-sans">
          {card.howItWorks}
        </p>

        {/* Small Live Visual */}
        <div className="pt-2">
          {card.id === 'card-read' && <ReadVisual invoice={card.invoice} />}
          {card.id === 'card-match' && <MatchVisual matchTarget={card.matchTarget} />}
          {card.id === 'card-check' && <CheckVisual duplicateComparison={card.duplicateComparison} />}
        </div>
      </motion.article>
    </div>
  )
}

export default Chapter3CubeCard
