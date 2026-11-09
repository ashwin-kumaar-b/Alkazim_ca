import React, { useState } from 'react'
import { standaloneTools } from '../data/products'
import { POExtractorDemo } from '../components/demos/POExtractorDemo'
import { ReconciliationDemo } from '../components/demos/ReconciliationDemo'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

export function ToolsPage() {
  const [activeDemo, setActiveDemo] = useState('po')

  return (
    <div className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <Badge variant="green" size="sm" className="mb-3">
            Product Category 2
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-navy tracking-tight">
            Standalone Financial Tools
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-navy-light leading-relaxed">
            Laser-focused tools that tackle one discrete financial pain point. Use them individually, plug them into your existing spreadsheets, or integrate directly with your ERP.
          </p>
        </div>

        {/* Live Interactive Sandbox Switcher */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-surface-border gap-4">
            <div>
              <h2 className="text-xl font-bold font-display text-brand-navy">
                Interactive Tool Workbench
              </h2>
              <p className="text-xs text-brand-navy-light">
                Switch between live interactive modules to inspect extraction and reconciliation logic.
              </p>
            </div>
            <div className="inline-flex p-1 rounded-lg bg-surface-muted border border-surface-border">
              <button
                type="button"
                onClick={() => setActiveDemo('po')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                  activeDemo === 'po'
                    ? 'bg-white text-brand-navy shadow-sm'
                    : 'text-brand-navy-subtle hover:text-brand-navy'
                }`}
              >
                PO & Invoice Extractor
              </button>
              <button
                type="button"
                onClick={() => setActiveDemo('reconcile')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                  activeDemo === 'reconcile'
                    ? 'bg-white text-brand-navy shadow-sm'
                    : 'text-brand-navy-subtle hover:text-brand-navy'
                }`}
              >
                Ledger Reconciliation
              </button>
            </div>
          </div>

          {activeDemo === 'po' ? <POExtractorDemo /> : <ReconciliationDemo />}
        </div>

        {/* Catalog of all 6 Standalone Tools */}
        <div className="pt-8 border-t border-surface-border">
          <h2 className="text-2xl font-bold font-display text-brand-navy mb-8">
            Complete Standalone Tool Directory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standaloneTools.map((tool) => (
              <div
                key={tool.id}
                id={tool.id}
                className="bg-white rounded-xl border border-surface-border p-6 shadow-subtle hover:shadow-card transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={tool.status === 'In Production' ? 'teal' : 'amber'} size="sm">
                      {tool.status}
                    </Badge>
                    <span className="text-[10px] font-mono uppercase text-brand-navy-muted">
                      {tool.capability}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-brand-navy mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-brand-navy-light leading-relaxed mb-4">
                    {tool.summary}
                  </p>
                  <div className="p-3 rounded-lg bg-surface-subtle border border-surface-border text-xs">
                    <span className="text-[10px] text-brand-navy-muted uppercase font-mono block">
                      Accepted Inputs
                    </span>
                    <span className="text-brand-navy font-medium mt-0.5 block truncate">
                      {tool.inputFormats}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-teal">Zero Configuration</span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDemo(tool.id === 'reconciliation' ? 'reconcile' : 'po')
                      window.scrollTo({ top: 400, behavior: 'smooth' })
                    }}
                    className="text-xs font-semibold text-brand-navy hover:text-brand-teal transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded px-1"
                  >
                    Open in Workbench ↑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
