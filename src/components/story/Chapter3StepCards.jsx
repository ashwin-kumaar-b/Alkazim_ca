import React from 'react'
import { motion } from 'framer-motion'
import { STEP_CARDS, INVOICE_DATA, MOBILE_SCRIBBLE } from '../../data/chapter3PathData'

/**
 * Chapter3StepCards
 * Three step cards in a row below the invoice:
 * 1. Read (supplier, amount, date extracted)
 * 2. Match to the ledger (6110-04 Freight, matched with check)
 * 3. Check against your rules (amber outline, Same PO, same delivery date: billed twice)
 * Invisible at first (opacity 0, scale 0.92) to avoid layout shift.
 * Each pops individually with 350ms spring overshoot.
 */
export function Chapter3StepCards({
  step1Popped,
  step2Popped,
  step3Popped,
  isStatic = false,
}) {
  const popStates = [
    isStatic || step1Popped,
    isStatic || step2Popped,
    isStatic || step3Popped,
  ]

  const springPopTransition = { duration: 0.35, ease: [0.34, 1.3, 0.64, 1] }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 relative z-10">
      {STEP_CARDS.map((card, index) => {
        const isPopped = popStates[index]
        const isStep3 = card.id === 'step-3'

        return (
          <div key={card.id} className="flex flex-col">
            <motion.div
              initial={false}
              animate={
                isStatic
                  ? { scale: 1, opacity: 1 }
                  : isPopped
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.92, opacity: 0 }
              }
              transition={springPopTransition}
              className={`p-4 rounded-xl border transition-colors duration-300 flex flex-col justify-between shadow-card bg-white min-h-[135px] will-change-transform ${
                isStep3 && isPopped
                  ? 'border-amber-400 bg-amber-50/25 ring-1 ring-amber-300'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-teal uppercase tracking-widest block pb-1">
                  Step 0{card.number}
                </span>
                <h3 className="text-small font-display font-bold text-navy">
                  {card.title}
                </h3>
              </div>

              {/* Revealed Content on Pop */}
              <div className="pt-2 text-xs font-mono">
                {card.id === 'step-1' && (
                  <p className="text-teal-900 font-medium">
                    {card.popContent}
                  </p>
                )}

                {card.id === 'step-2' && (
                  <div className="p-2 rounded bg-calm-teal/70 border border-teal-100 text-teal-900 font-semibold flex items-center gap-1.5">
                    <span className="text-teal font-bold text-sm">✓</span>
                    <span>{INVOICE_DATA.glMatch}</span>
                  </div>
                )}

                {card.id === 'step-3' && (
                  <div className="p-2 rounded bg-amber-100/70 border border-amber-300 text-amber-900 font-semibold leading-relaxed">
                    <span>{INVOICE_DATA.duplicateReason}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Mobile Stacked Inline Scribble (underneath each step) */}
            {isStatic && (
              <div className="md:hidden py-1.5 flex justify-center" aria-hidden="true">
                <svg viewBox="0 0 240 24" fill="none" className="w-48 h-5">
                  <path
                    d={MOBILE_SCRIBBLE}
                    stroke={isStep3 ? '#D97706' : '#118379'}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Chapter3StepCards
