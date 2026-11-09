import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { solutions, standaloneTools } from '../../data/products'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export function SolutionsToolsSwitcher() {
  const [activeTab, setActiveTab] = useState('solutions')
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Philosophy */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="green" size="sm" className="mb-3">
            Two Complementary Offerings
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-brand-navy tracking-tight">
            Built to fit how your practice works.
          </h2>
          <p className="mt-3 text-base text-brand-navy-light leading-relaxed">
            Choose full software that drives an entire financial engagement, or targeted tools to automate specific bottlenecks.
          </p>

          {/* Segmented Control */}
          <div className="mt-8 inline-flex p-1.5 rounded-xl bg-surface-muted border border-surface-border" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'solutions'}
              onClick={() => setActiveTab('solutions')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                activeTab === 'solutions' ? 'bg-white text-brand-navy shadow-sm' : 'text-brand-navy-subtle hover:text-brand-navy'
              }`}
            >
              End-to-End Solutions
              <span className="ml-2 text-xs font-mono text-brand-teal">({solutions.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'tools'}
              onClick={() => setActiveTab('tools')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                activeTab === 'tools' ? 'bg-white text-brand-navy shadow-sm' : 'text-brand-navy-subtle hover:text-brand-navy'
              }`}
            >
              Standalone Tools
              <span className="ml-2 text-xs font-mono text-brand-teal">({standaloneTools.length})</span>
            </button>
          </div>
        </div>

        {/* Dynamic Panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'solutions' ? (
            <motion.div
              key="solutions-panel"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-brand-teal-subtle/50 border border-brand-teal/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-teal-dark">
                    Complete software suites for end-to-end financial workflows
                  </h3>
                  <p className="text-xs text-brand-navy-light mt-0.5">
                    Runs an entire financial audit, escrow review, or budget cycle from ingestion to finalized partner pack.
                  </p>
                </div>
                <Link to="/solutions">
                  <Button variant="secondary" size="sm" className="whitespace-nowrap">
                    View Solutions Guide →
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutions.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-surface-border p-6 shadow-subtle hover:shadow-card transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={item.status === 'In Production' ? 'green' : 'amber'} size="sm">
                          {item.status}
                        </Badge>
                        <span className="text-[11px] font-mono text-brand-navy-muted">Full Workflow</span>
                      </div>
                      <h4 className="text-lg font-bold text-brand-navy mb-2 font-display">{item.title}</h4>
                      <p className="text-sm text-brand-navy-light leading-relaxed mb-4">{item.summary}</p>
                      <div className="space-y-1.5 pt-2 border-t border-surface-border">
                        {item.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="text-xs text-brand-navy-subtle flex items-start gap-2">
                            <span className="text-brand-green font-bold">✓</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between text-xs">
                      <span className="text-brand-navy-muted">Target: {item.targetUser.split(',')[0]}</span>
                      <span className="font-semibold text-brand-teal">{item.timeSaved}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tools-panel"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-brand-green-subtle/60 border border-brand-green/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-green-dark">
                    Focused tools that solve one specific problem with zero overhead
                  </h3>
                  <p className="text-xs text-brand-navy-light mt-0.5">
                    Deploy instantly alongside your current spreadsheet and ERP workflow without lengthy implementations.
                  </p>
                </div>
                <Link to="/tools">
                  <Button variant="secondary" size="sm" className="whitespace-nowrap">
                    Explore All Standalone Tools →
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {standaloneTools.map((tool) => (
                  <div key={tool.id} className="bg-white rounded-xl border border-surface-border p-6 shadow-subtle hover:shadow-card transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={tool.status === 'In Production' ? 'teal' : 'amber'} size="sm">
                          {tool.status}
                        </Badge>
                        <span className="text-[11px] font-mono text-brand-navy-muted">Standalone</span>
                      </div>
                      <h4 className="text-lg font-bold text-brand-navy mb-2 font-display">{tool.title}</h4>
                      <p className="text-sm text-brand-navy-light leading-relaxed mb-4">{tool.summary}</p>
                      <div className="p-3 rounded-lg bg-surface-subtle border border-surface-border text-xs space-y-1">
                        <div className="text-[10px] text-brand-navy-muted uppercase font-mono">Input Formats</div>
                        <div className="text-brand-navy font-medium truncate">{tool.inputFormats}</div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between">
                      <span className="text-xs font-mono text-brand-teal font-medium">{tool.capability}</span>
                      <Link to={`/tools#${tool.id}`}>
                        <span className="text-xs font-semibold text-brand-navy hover:text-brand-teal transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                          Try Demo →
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
