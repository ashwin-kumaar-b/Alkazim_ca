import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { stepsData } from '../../data/howItWorksData'
import { Badge } from '../ui/Badge'

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-surface-subtle border-y border-surface-border scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Badge variant="teal" size="sm" className="mb-3">
            How It Works
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-brand-navy tracking-tight">
            From raw financial documents to audit-ready working papers.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-brand-navy-light leading-relaxed">
            Here is how Endloops handles the heavy lifting while leaving every critical decision with your team.
          </p>
        </div>

        {/* Desktop Experience: Interactive Tabbed Flow (1280px) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector List */}
          <div className="lg:col-span-5 space-y-3" role="tablist" aria-label="How Endloops works steps">
            {stepsData.map((step, idx) => {
              const isSelected = activeStep === idx
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                    isSelected
                      ? 'bg-white border-brand-teal/40 shadow-card'
                      : 'bg-white/60 border-surface-border hover:bg-white hover:border-surface-borderStrong'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-semibold text-brand-teal">
                      Step {step.number}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-brand-navy-muted font-mono">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-brand-navy mb-1">{step.title}</h3>
                  <p className="text-xs text-brand-navy-light line-clamp-2 leading-relaxed">
                    {step.subtitle}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Active Step Visual Showcase */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-surface-border shadow-card p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-brand-teal-light text-brand-teal-dark">
                      Stage {stepsData[activeStep].number}
                    </span>
                    <span className="text-xs text-brand-navy-muted">• {stepsData[activeStep].metric}</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-brand-navy">
                    {stepsData[activeStep].title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-navy-light leading-relaxed">
                    {stepsData[activeStep].description}
                  </p>
                </div>

                {/* Simulated Data Artifact */}
                <div className="bg-surface-subtle border border-surface-border rounded-xl p-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border font-sans">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-green" />
                      <span className="font-semibold text-brand-navy text-xs">
                        {stepsData[activeStep].preview.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-brand-navy-muted truncate max-w-[200px]">
                      {stepsData[activeStep].preview.filename}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stepsData[activeStep].preview.items.map((item, i) => (
                      <div key={i} className="p-2.5 rounded bg-white border border-surface-border">
                        <span className="text-[10px] text-brand-navy-muted uppercase block font-sans">
                          {item.label}
                        </span>
                        <span className="text-xs font-medium text-brand-navy mt-0.5 block truncate">
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between text-xs text-brand-navy-subtle">
              <span>Philosophy in action:</span>
              <span className="font-medium text-brand-teal">
                Automated preparation + Certified human sign-off
              </span>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Simplified Stacked View */}
        <div className="lg:hidden space-y-4">
          {stepsData.map((step) => (
            <div key={step.id} className="bg-white rounded-xl border border-surface-border p-5 shadow-subtle space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-brand-teal">
                  Step {step.number}
                </span>
                <span className="text-[10px] font-mono uppercase bg-surface-muted px-2 py-0.5 rounded text-brand-navy-subtle">
                  {step.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-brand-navy">{step.title}</h3>
              <p className="text-sm text-brand-navy-light leading-relaxed">{step.description}</p>
              
              <div className="bg-surface-subtle p-3 rounded-lg border border-surface-border text-xs font-mono space-y-1.5">
                <div className="text-[11px] font-sans font-semibold text-brand-navy">
                  {step.preview.badge}
                </div>
                <div className="text-brand-navy-light text-[11px]">{step.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
