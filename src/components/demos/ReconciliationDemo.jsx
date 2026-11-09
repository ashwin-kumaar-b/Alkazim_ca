import React, { useState } from 'react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export function ReconciliationDemo() {
  const [reconciled, setReconciled] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

  const ledgerRecords = [
    { id: 'l1', date: '01-Nov', ref: 'DEP-802', desc: 'Tenant Rent Unit 402 (Escrow)', amount: 45000.0, matched: true },
    { id: 'l2', date: '03-Nov', ref: 'UTL-109', desc: 'DEWA Utilities Tariff', amount: -9340.5, matched: true },
    { id: 'l3', date: '05-Nov', ref: 'CAP-404', desc: 'Contractor Milestone 1 Payout', amount: -120000.0, matched: true },
    { id: 'l4', date: '06-Nov', ref: 'ADJ-000', desc: 'Unposted Bank Maintenance Charge', amount: -126.0, matched: false },
  ]

  return (
    <div className="bg-white rounded-2xl border border-surface-border shadow-card p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-surface-border gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-navy">
              Interactive Demo: Automated Bank & Ledger Reconciliation
            </span>
          </div>
          <p className="text-xs text-brand-navy-light mt-0.5">
            Compare general ledger postings directly against GCC bank MT940 statements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={reconciled ? 'green' : 'neutral'} size="sm">
            {reconciled ? '3/4 Matched • 1 Exception' : 'Pending Verification'}
          </Badge>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setReconciled(!reconciled)}
          >
            {reconciled ? 'Reset Engine' : 'Run Auto-Reconciliation'}
          </Button>
        </div>
      </div>

      {/* Table Comparison View */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono text-left">
          <thead>
            <tr className="border-b border-surface-border text-[10px] uppercase text-brand-navy-muted font-sans font-semibold">
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Reference</th>
              <th className="py-2.5 px-3">Description</th>
              <th className="py-2.5 px-3 text-right">Amount (AED)</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Audit Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {ledgerRecords.map((row) => {
              const isMatched = reconciled ? row.matched : false
              return (
                <tr
                  key={row.id}
                  onClick={() => setActiveItem(row)}
                  className={`hover:bg-surface-subtle transition-colors cursor-pointer ${
                    activeItem?.id === row.id ? 'bg-brand-teal-light/20' : ''
                  }`}
                >
                  <td className="py-3 px-3 text-brand-navy-light">{row.date}</td>
                  <td className="py-3 px-3 font-semibold text-brand-navy">{row.ref}</td>
                  <td className="py-3 px-3 font-sans text-brand-navy max-w-[200px] truncate">
                    {row.desc}
                  </td>
                  <td className={`py-3 px-3 text-right tabular-nums font-semibold ${
                    row.amount > 0 ? 'text-brand-green-dark' : 'text-brand-navy'
                  }`}>
                    {row.amount > 0 ? `+${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {reconciled ? (
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-sans font-medium ${
                        row.matched
                          ? 'bg-brand-green-light text-brand-green-dark'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {row.matched ? 'Exact Match' : 'Unmatched'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-brand-navy-muted font-sans">Queued</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      className="text-[11px] text-brand-teal hover:underline font-sans font-medium focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded px-1"
                    >
                      Inspect Source
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Reconciliation Summary Footer */}
      <div className="mt-4 pt-4 border-t border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="text-brand-navy-light">
          Net Discrepancy:{' '}
          <span className="font-mono font-semibold text-amber-800">
            {reconciled ? 'AED 126.00 (Bank Service Fee not yet in GL)' : 'Calculating...'}
          </span>
        </div>
        <div className="text-brand-navy-subtle text-[11px]">
          Rule: <span className="font-medium text-brand-navy">All variances documented for audit paper WP-102</span>
        </div>
      </div>
    </div>
  )
}
