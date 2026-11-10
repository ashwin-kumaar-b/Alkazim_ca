import React from 'react'
import { Button } from '../ui/Button'
import { ReconciliationPanel } from '../story/ReconciliationPanel'
import { useReconciliationDemo } from '../../hooks/useReconciliationDemo'

export function ReconciliationWorkbench() {
  const {
    rows,
    selectedRow,
    counts,
    announcement,
    onSelectRow,
    onClosePanel,
    onAccept,
    onReject,
    onReset,
  } = useReconciliationDemo()

  return (
    <div className="relative">
      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Metrics & Reset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-calm-subtle border border-slate-200 rounded-2xl p-3 sm:p-4 mb-6 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-green-100 text-green-700 text-xs font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            {counts.matched} matched
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-amber-100 text-amber-800 text-xs font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {counts.toReview} to review
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-semibold">
            {counts.duplicate} duplicate
          </span>
        </div>

        <Button variant="secondary" size="sm" onClick={onReset} className="text-xs font-mono">
          Reset Demo
        </Button>
      </div>

      {/* Main Two-Column Table Grid + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className={selectedRow ? 'lg:col-span-8' : 'lg:col-span-12'}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Column 1: Bank Statement Feed */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-navy">
                    Bank Statement Feed
                  </span>
                  <span className="text-[11px] font-mono text-navy-400">MT940 / Direct</span>
                </div>
                <div className="space-y-2">
                  {rows.map((row) => {
                    const isResolved = Boolean(row.resolution)
                    const isFlagged = row.status !== 'matched' && !isResolved
                    const isSelected = selectedRow?.id === row.id

                    return (
                      <div
                        key={`bank-${row.id}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectRow(row)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectRow(row)}
                        className={`p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                          isSelected
                            ? 'border-teal bg-teal-50/50 shadow-xs'
                            : isFlagged
                            ? 'border-amber-300 bg-amber-50/40 hover:bg-amber-50'
                            : 'border-slate-100 hover:bg-calm-subtle'
                        }`}
                      >
                        <div className="flex items-center justify-between text-navy-400 text-[11px]">
                          <span>{row.bankRef}</span>
                          <span>{row.date}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1 gap-2">
                          <span className="font-sans font-medium text-navy truncate max-w-[130px] sm:max-w-[170px]">
                            {row.desc}
                          </span>
                          <span className="font-bold text-navy tabular-nums shrink-0 whitespace-nowrap">
                            AED {row.bankAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Column 2: General Ledger Postings */}
              <div className="p-4 sm:p-5 bg-calm-subtle/50">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-navy">
                    General Ledger Postings
                  </span>
                  <span className="text-[11px] font-mono text-teal font-medium">Auto-Paired</span>
                </div>
                <div className="space-y-2">
                  {rows.map((row) => {
                    const isResolved = Boolean(row.resolution)
                    const isFlagged = row.status !== 'matched' && !isResolved
                    const isSelected = selectedRow?.id === row.id

                    return (
                      <div
                        key={`gl-${row.id}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectRow(row)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectRow(row)}
                        className={`p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal flex items-center justify-between ${
                          isSelected
                            ? 'border-teal bg-teal-50/50 shadow-xs'
                            : isFlagged
                            ? 'border-amber-300 bg-amber-50/40 hover:bg-amber-50'
                            : 'border-slate-100 hover:bg-white'
                        }`}
                      >
                        <div className="truncate max-w-[130px] sm:max-w-[180px]">
                          <span className="text-[11px] text-navy-400 block">{row.glRef}</span>
                          <span className="font-sans font-medium text-navy text-xs truncate block">
                            {row.desc}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                              isResolved
                                ? 'bg-green-100 text-green-700'
                                : isFlagged
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {isResolved ? 'Resolved' : row.status === 'matched' ? 'Matched' : row.status}
                          </span>
                          <span className="block font-bold text-navy tabular-nums mt-0.5 shrink-0 whitespace-nowrap">
                            AED {row.glAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel (Desktop) / Bottom Sheet (Mobile) */}
        {selectedRow && (
          <div className="lg:col-span-4 w-full">
            <ReconciliationPanel
              selectedRow={selectedRow}
              onClose={onClosePanel}
              onAccept={onAccept}
              onReject={onReject}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ReconciliationWorkbench
