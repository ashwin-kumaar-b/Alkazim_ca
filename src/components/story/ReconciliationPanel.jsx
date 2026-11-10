import React, { useEffect } from 'react'
import { Button } from '../ui/Button'

export function ReconciliationPanel({ selectedRow, onClose, onAccept, onReject }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!selectedRow) return null

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 bg-navy/30 backdrop-blur-xs z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel: Desktop Side Panel (inside grid) or Mobile Bottom Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-panel-title"
        data-lenis-prevent
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl border-t border-slate-200 p-5 shadow-2xl max-h-[85vh] overflow-y-auto lg:static lg:inset-auto lg:z-auto lg:rounded-2xl lg:border lg:border-slate-200 lg:p-5 lg:shadow-card lg:max-h-none flex flex-col justify-between space-y-4"
      >
        <div>
          {/* Header & Close Button */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {selectedRow.status === 'duplicate' ? 'Duplicate Alert' : 'Variance Audit'}
              </span>
              <h3 id="audit-panel-title" className="text-small font-bold text-navy mt-1.5 font-display">
                {selectedRow.issueTitle}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="min-w-[36px] min-h-[36px] p-1.5 rounded-lg text-navy-400 hover:text-navy hover:bg-calm-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal flex items-center justify-center"
              aria-label="Close review panel"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Transaction Metadata */}
          <div className="my-3 p-3 rounded-xl bg-calm-subtle border border-slate-200 text-xs font-mono space-y-2">
            <div className="flex justify-between gap-2">
              <span className="text-navy-400 shrink-0">Description:</span>
              <span className="text-navy font-semibold truncate text-right">{selectedRow.desc}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-navy-400 shrink-0">Bank Statement:</span>
              <span className="text-navy font-semibold tabular-nums">AED {Math.abs(selectedRow.bankAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-navy-400 shrink-0">General Ledger:</span>
              <span className="text-navy font-semibold tabular-nums">
                {selectedRow.glAmount !== 0 ? `AED ${Math.abs(selectedRow.glAmount).toLocaleString()}` : 'Unbooked (AED 0)'}
              </span>
            </div>
          </div>

          {/* Auditor Explanation */}
          <div className="text-xs space-y-2 text-navy-600">
            <p className="leading-relaxed">{selectedRow.issueExplanation}</p>
            <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-100 text-[11px] text-teal-800">
              <span className="font-semibold block mb-0.5">Recommended Practice Action:</span>
              <span>{selectedRow.recommendedAction}</span>
            </div>
          </div>
        </div>

        {/* Auditor Action Buttons (min 44px tap target on mobile) */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => onAccept(selectedRow.id)}
            className="w-full sm:flex-1 justify-center bg-teal hover:bg-teal-600 min-h-[44px]"
          >
            Accept Adjustment
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => onReject(selectedRow.id)}
            className="w-full sm:flex-1 justify-center min-h-[44px]"
          >
            Reject / Flag
          </Button>
        </div>
      </div>
    </>
  )
}

export default ReconciliationPanel
