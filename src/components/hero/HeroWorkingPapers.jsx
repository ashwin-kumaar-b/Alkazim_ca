import React from 'react'
import { motion } from 'framer-motion'

export function HeroWorkingPapers({ effectiveStep }) {
  return (
    <div className="lg:col-span-7 flex flex-col justify-between bg-surface-subtle border border-surface-border rounded-xl p-3 sm:p-4">
      <div>
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-border">
          <div>
            <span className="text-xs font-semibold text-brand-navy block">
              Draft Working Schedule: General Ledger Reconciliation
            </span>
            <span className="text-[10px] text-brand-navy-muted font-mono">
              Prepared by Endloops Engine • Awaiting Auditor Sign-off
            </span>
          </div>
          <span className="text-[10px] bg-brand-green-light text-brand-green-dark px-2 py-0.5 rounded-full font-medium">
            Auto-Checked
          </span>
        </div>

        {/* Generated Rows */}
        <div className="space-y-1.5 text-xs font-mono">
          <div className="grid grid-cols-12 text-[10px] uppercase text-brand-navy-muted font-sans font-semibold pb-1">
            <span className="col-span-3">GL Account</span>
            <span className="col-span-4">Vendor</span>
            <span className="col-span-3 text-right">Amount (AED)</span>
            <span className="col-span-2 text-right">State</span>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-12 py-1.5 px-2 rounded bg-white border border-surface-border items-center">
            <span className="col-span-3 text-brand-navy-light text-[11px]">5020-01 (CapEx)</span>
            <span className="col-span-4 truncate font-sans text-brand-navy font-medium">Gulf Contracting</span>
            <span className="col-span-3 text-right tabular-nums text-brand-navy">84,200.00</span>
            <span className="col-span-2 text-right">
              <span className="text-[10px] text-brand-green-dark bg-brand-green-light px-1.5 py-0.2 rounded font-sans font-medium">
                Verified
              </span>
            </span>
          </div>

          {/* Row 2 - Duplicate warning */}
          <div
            className={`grid grid-cols-12 py-1.5 px-2 rounded border items-center transition-colors ${
              effectiveStep >= 2 ? 'bg-amber-50/60 border-amber-300' : 'bg-white border-surface-border'
            }`}
          >
            <span className="col-span-3 text-brand-navy-light text-[11px]">6110-04 (Logistics)</span>
            <span className="col-span-4 truncate font-sans text-brand-navy font-medium">Al-Bahar Log.</span>
            <span className="col-span-3 text-right tabular-nums text-brand-navy">14,500.00</span>
            <span className="col-span-2 text-right">
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-sans font-medium ${
                  effectiveStep >= 2 ? 'bg-amber-200 text-amber-900' : 'bg-surface-muted text-brand-navy-subtle'
                }`}
              >
                {effectiveStep >= 2 ? 'Flagged' : 'Pending'}
              </span>
            </span>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-12 py-1.5 px-2 rounded bg-white border border-surface-border items-center">
            <span className="col-span-3 text-brand-navy-light text-[11px]">6300-02 (Utilities)</span>
            <span className="col-span-4 truncate font-sans text-brand-navy font-medium">DEWA Authority</span>
            <span className="col-span-3 text-right tabular-nums text-brand-navy">9,340.50</span>
            <span className="col-span-2 text-right">
              <span className="text-[10px] text-brand-green-dark bg-brand-green-light px-1.5 py-0.2 rounded font-sans font-medium">
                Verified
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Sign-off Action */}
      <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between gap-3">
        <div className="text-[11px] text-brand-navy-subtle">
          Rule: <span className="font-semibold text-brand-navy">Auditor sign-off required</span>
        </div>

        <motion.button
          type="button"
          animate={effectiveStep === 4 ? { scale: [1, 0.97, 1] } : {}}
          transition={{ duration: 0.3 }}
          className={`px-3 py-1.5 text-xs font-medium rounded-button transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
            effectiveStep === 4
              ? 'bg-brand-green text-white shadow-sm'
              : 'bg-brand-navy text-white hover:bg-brand-navy-dark'
          }`}
        >
          {effectiveStep === 4 ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Signed Off by Senior Auditor
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Review & Approve Batch
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
