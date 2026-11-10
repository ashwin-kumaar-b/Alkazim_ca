import React from 'react'

/**
 * FlagResolutionCard
 * Simplified, accessible card for resolving audit exceptions in Chapter 4.
 * Clear status, minimal concise copy, and reliable Approve / Reject actions.
 */
export function FlagResolutionCard({ flag, onResolve }) {
  const isApproved = flag.resolution === 'approved' || flag.resolution === 'accepted'
  const isRejected = flag.resolution === 'rejected'
  const isResolved = isApproved || isRejected

  const handleAction = (action) => {
    const current = isApproved ? 'approved' : isRejected ? 'rejected' : null
    onResolve(flag.id, current === action ? null : action)
  }

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between ${
        isApproved
          ? 'bg-teal-50/40 border-teal-400 shadow-sm'
          : isRejected
          ? 'bg-amber-50/40 border-amber-400 shadow-sm'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-card'
      }`}
    >
      <div className="space-y-3.5">
        {/* Header: Category Badge + Status Pill */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
              isResolved
                ? 'bg-white text-navy-600 border-slate-200'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            {flag.badge}
          </span>

          <span
            className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full transition-colors ${
              isApproved
                ? 'bg-teal text-white'
                : isRejected
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-navy-400'
            }`}
          >
            {isApproved ? '✓ Approved' : isRejected ? '✕ Rejected' : 'Needs review'}
          </span>
        </div>

        {/* Voucher Info */}
        <div className="pb-2.5 border-b border-slate-100 flex items-start justify-between gap-2">
          <div>
            <span className="text-small font-mono font-bold text-navy block">
              {flag.docId}
            </span>
            <span className="text-caption text-navy-400 block truncate max-w-[170px]">
              {flag.vendor}
            </span>
          </div>
          <div className="text-right shrink-0">
            <span className="text-small font-mono font-bold text-navy whitespace-nowrap block tabular-nums">
              {flag.amount}
            </span>
            <span className="text-[11px] font-mono text-navy-400 block">
              {flag.ref}
            </span>
          </div>
        </div>

        {/* Single Simplified Issue Line */}
        <p className="text-small text-navy-600 leading-relaxed font-sans">
          {flag.issue}
        </p>
      </div>

      {/* Action Buttons: Reject / Approve */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleAction('rejected')}
          aria-pressed={isRejected}
          aria-label={`Reject ${flag.badge} for ${flag.docId}`}
          className={`flex-1 py-2 px-3 rounded-button text-xs font-mono font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
            isRejected
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-50 hover:bg-amber-50 text-navy-700 hover:text-amber-800 border border-slate-200 hover:border-amber-300'
          }`}
        >
          <span>✕</span>
          <span>Reject</span>
        </button>

        <button
          type="button"
          onClick={() => handleAction('approved')}
          aria-pressed={isApproved}
          aria-label={`Approve ${flag.badge} for ${flag.docId}`}
          className={`flex-1 py-2 px-3 rounded-button text-xs font-mono font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
            isApproved
              ? 'bg-teal text-white shadow-xs'
              : 'bg-slate-50 hover:bg-teal-50 text-navy-700 hover:text-teal-800 border border-slate-200 hover:border-teal-300'
          }`}
        >
          <span>✓</span>
          <span>Approve</span>
        </button>
      </div>
    </div>
  )
}

export default FlagResolutionCard
