import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HeroWorkingPapers } from './HeroWorkingPapers'

export function HeroAnimation() {
  const shouldReduceMotion = useReducedMotion()
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (shouldReduceMotion || !isPlaying) return

    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5)
    }, 2400)

    return () => clearInterval(timer)
  }, [shouldReduceMotion, isPlaying])

  const effectiveStep = shouldReduceMotion ? 4 : step

  return (
    <div className="relative w-full rounded-2xl bg-white border border-surface-border shadow-card p-4 sm:p-6 overflow-hidden">
      {/* Simulation Controls Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-navy">
            Live Document Pipeline
          </span>
          <span className="hidden sm:inline text-xs text-brand-navy-muted">
            • Vouching & Reconciliation Engine
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-[11px] font-mono text-brand-navy-subtle hover:text-brand-navy px-2 py-1 rounded bg-surface-muted hover:bg-surface-border focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="flex gap-1 pl-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setStep(i)
                  setIsPlaying(false)
                }}
                className={`w-2 h-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                  effectiveStep === i ? 'bg-brand-teal w-4' : 'bg-surface-borderStrong'
                }`}
                aria-label={`Jump to stage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Ingested Document Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-[11px] font-medium uppercase tracking-wider text-brand-navy-muted mb-1 flex justify-between">
            <span>Incoming Invoices & POs</span>
            <span className="text-brand-teal">Batch #DXB-849</span>
          </div>

          {/* Doc 1 */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-xl border text-xs transition-colors ${
              effectiveStep >= 1 ? 'border-brand-teal/40 bg-brand-teal-subtle/40' : 'border-surface-border bg-surface-subtle'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-brand-navy-muted">
              <span>INV-2024-0821</span>
              <span>Gulf Contracting PJSC</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-brand-navy font-medium">Concrete & Foundation</span>
              <span className={`font-mono font-semibold tabular-nums px-1.5 py-0.5 rounded ${
                effectiveStep >= 1 ? 'bg-brand-teal text-white' : 'text-brand-navy'
              }`}>
                AED 84,200.00
              </span>
            </div>
            {effectiveStep >= 1 && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1.5 text-[10px] text-brand-teal flex items-center gap-1 font-medium"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Matched to PO #9401 & Delivery Note
              </motion.div>
            )}
          </motion.div>

          {/* Doc 2: Duplicate Flagged */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.1 }}
            className={`p-3 rounded-xl border text-xs transition-colors ${
              effectiveStep >= 2
                ? 'border-amber-400 bg-amber-50/70 shadow-sm'
                : 'border-surface-border bg-surface-subtle'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-brand-navy-muted">
              <span>INV-2024-0822</span>
              <span>Al-Bahar Logistics</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-brand-navy font-medium">Freight & Clearance</span>
              <span className="font-mono font-semibold tabular-nums text-brand-navy">
                AED 14,500.00
              </span>
            </div>
            {effectiveStep >= 2 && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-1.5 p-1.5 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[11px] flex items-center gap-1.5 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                <span>Duplicate detected: voucher #V-402</span>
              </motion.div>
            )}
          </motion.div>

          {/* Doc 3 */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="p-3 rounded-xl border border-surface-border bg-surface-subtle text-xs"
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-brand-navy-muted">
              <span>DEWA-OCT-24</span>
              <span>Dubai Electricity & Water</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-brand-navy font-medium">Commercial Chiller</span>
              <span className="font-mono font-semibold tabular-nums text-brand-navy">
                AED 9,340.50
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: Working Papers Table Component */}
        <HeroWorkingPapers effectiveStep={effectiveStep} />
      </div>
    </div>
  )
}
