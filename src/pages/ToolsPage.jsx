import React, { useState, useMemo } from 'react'
import { Container, Section } from '../components/ui/Container'
import { ReconciliationWorkbench } from '../components/demos/ReconciliationWorkbench'
import { TOOL_CATEGORIES, toolsCatalog } from '../data/toolsCatalogData'

export function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTools = useMemo(() => {
    if (selectedCategory === 'All') return toolsCatalog
    return toolsCatalog.filter((t) => t.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div className="bg-white">
      {/* Header */}
      <Section spacing="sm" className="bg-calm-teal border-b border-teal-100">
        <Container size="lg" className="text-center space-y-3">
          <span className="text-label text-teal">Modular Capabilities</span>
          <h1 className="text-display font-display text-navy tracking-tight">
            Standalone Tools
          </h1>
          <p className="text-body-lg text-navy-400 max-w-2xl mx-auto">
            Targeted precision tools that solve one specific financial bottleneck.
            Deploy individually into your current spreadsheet and ERP workflow.
          </p>
        </Container>
      </Section>

      <Container size="xl" className="py-16 sm:py-24 space-y-20">
        {/* Interactive Reconciliation Demo Reused from Chapter 4 */}
        <section className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-label text-teal">Live Workbench Demo</span>
            <h2 className="text-h2 font-display text-navy mt-1">
              General Ledger & Bank Feed Reconciliation
            </h2>
            <p className="text-small text-navy-400 mt-1 max-w-xl">
              Experience the matching engine in real-time. Click any flagged row to open the audit exception panel and review the source discrepancy.
            </p>
          </div>

          <ReconciliationWorkbench />
        </section>

        {/* Filterable Tools Catalog Section */}
        <section className="space-y-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-h2 font-display text-navy">
                Standalone Tool Directory
              </h2>
              <p className="text-small text-navy-400 mt-0.5">
                Filter by workflow capability ({filteredTools.length} tools available)
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter tools by category"
              className="inline-flex p-1 rounded-xl bg-calm-subtle border border-slate-200"
            >
              {TOOL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat}
                  role="tab"
                  type="button"
                  aria-selected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' && idx < TOOL_CATEGORIES.length - 1) {
                      e.preventDefault()
                      setSelectedCategory(TOOL_CATEGORIES[idx + 1])
                    } else if (e.key === 'ArrowLeft' && idx > 0) {
                      e.preventDefault()
                      setSelectedCategory(TOOL_CATEGORIES[idx - 1])
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] sm:min-h-0 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                    selectedCategory === cat
                      ? 'bg-white text-navy shadow-xs font-bold'
                      : 'text-navy-400 hover:text-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-card transition-shadow flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-calm-teal text-teal-800 text-[10px] font-mono font-semibold border border-teal-100">
                      {tool.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                        tool.status === 'Live'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>

                  <h3 className="text-small font-bold text-navy font-display">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-navy-400 leading-relaxed mt-2">
                    {tool.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-[11px] font-mono">
                  <div className="flex justify-between text-navy-400">
                    <span>Inputs:</span>
                    <span className="text-navy font-medium truncate max-w-[170px]">{tool.inputs}</span>
                  </div>
                  <div className="flex justify-between text-teal">
                    <span>Capability:</span>
                    <span className="font-medium truncate max-w-[170px]">{tool.capability}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  )
}

export default ToolsPage
