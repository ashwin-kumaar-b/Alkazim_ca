import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * HeroVisual
 * 5-second looping animation:
 * 1. Read (0 - 1.8s): Document arrives, parsing fields
 * 2. Extract (1.8s - 3.4s): Amount field highlights teal, PO matched
 * 3. Approved (3.4s - 5.0s): Green checkmark, approved by auditor
 * Fallback: static approved final frame when prefers-reduced-motion is true.
 */
export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion()
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return

    // 0 -> 1 at 1.8s, 1 -> 2 at 3.4s, loop back to 0 at 5.2s
    const timer1 = setTimeout(() => setStage(1), 1800)
    const timer2 = setTimeout(() => setStage(2), 3400)
    const timerLoop = setTimeout(() => setStage(0), 5200)

    const interval = setInterval(() => {
      setStage(0)
      setTimeout(() => setStage(1), 1800)
      setTimeout(() => setStage(2), 3400)
    }, 5400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timerLoop)
      clearInterval(interval)
    }
  }, [shouldReduceMotion])

  // Final frame if reduced motion is requested
  const currentStage = shouldReduceMotion ? 2 : stage

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Background ambient blur */}
      <div className="absolute -inset-2 bg-gradient-to-r from-teal-100/60 to-green-100/60 rounded-3xl blur-xl opacity-70 pointer-events-none" />

      {/* Main Invoice Card (rounded-2xl, thin 1px border, soft shadow) */}
      <div className="relative bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-card overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                currentStage === 2 ? 'bg-green' : currentStage === 1 ? 'bg-teal' : 'bg-slate-300'
              }`}
            />
            <span className="font-mono text-xs text-navy-400">INV-2024-0940</span>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-navy-300">
            Tax Invoice · UAE
          </span>
        </div>

        {/* Vendor & Details */}
        <div className="space-y-1 mb-4">
          <p className="text-body-sm font-semibold text-navy">Gulf Contracting PJSC</p>
          <p className="text-xs text-navy-400">Foundation Concrete Works · Matched to PO #PO-8820</p>
        </div>

        {/* Amount Field (Highlights Teal in Stage 1 & 2) */}
        <div
          className={`p-3.5 rounded-xl border transition-all duration-300 ${
            currentStage >= 1
              ? 'bg-teal-50 border-teal-200 shadow-xs'
              : 'bg-calm-subtle border-slate-100'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-navy-400">Net Amount</span>
            {currentStage >= 1 && (
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[10px] text-teal font-semibold uppercase tracking-wider"
              >
                Extracted
              </motion.span>
            )}
          </div>
          <div className="flex items-baseline justify-between">
            <span
              className={`font-mono text-xl sm:text-2xl font-bold tabular whitespace-nowrap shrink-0 transition-colors duration-300 ${
                currentStage >= 1 ? 'text-teal-700' : 'text-navy'
              }`}
            >
              AED 84,200.00
            </span>
            <span className="text-xs text-navy-400 font-mono">5% VAT verified</span>
          </div>
        </div>

        {/* Bottom State: Reading vs Approved */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between min-h-[32px]">
          <span className="text-xs text-navy-400 font-mono">Status</span>

          <AnimatePresence mode="wait">
            {currentStage === 2 ? (
              <motion.div
                key="approved"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-green-100 text-green-700 border border-green-200 text-xs font-medium"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Approved by Auditor</span>
              </motion.div>
            ) : currentStage === 1 ? (
              <motion.div
                key="matched"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-teal-100 text-teal-700 border border-teal-200 text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                <span>Line Items Matched</span>
              </motion.div>
            ) : (
              <motion.div
                key="reading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1.5 text-xs text-navy-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                <span>Reading fields...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default HeroVisual
