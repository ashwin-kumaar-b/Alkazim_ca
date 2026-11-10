import React from 'react'
import { motion } from 'framer-motion'

/**
 * Chapter3CardVisuals
 * Small live visuals for the three spine cards:
 * 1. Read: INV-2024-0941 with fields highlighting teal in sequence.
 * 2. Match: Invoice amount linked to Freight ledger and PO #4410 with checks.
 * 3. Check: Two invoices side by side with amber highlights and duplicate banner.
 */

// Card 1 Live Visual: Document Field Extraction
export function ReadVisual({ invoice }) {
  return (
    <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4 space-y-2.5 font-mono text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-teal-100/80">
        <span className="font-bold text-navy bg-white px-2 py-0.5 rounded border border-teal-200 shadow-xs">
          {invoice.id}
        </span>
        <span className="bg-teal-100 text-teal-900 font-semibold px-2 py-0.5 rounded">
          {invoice.date}
        </span>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[10px] text-teal-800 uppercase tracking-wider block">Supplier</span>
          <span className="font-sans font-semibold text-navy text-small bg-white px-1.5 py-0.5 rounded">
            {invoice.vendor}
          </span>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] text-teal-800 uppercase tracking-wider block">Ref</span>
          <span className="text-teal-900 font-semibold">{invoice.poRef}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-teal-100/80 flex items-baseline justify-between">
        <span className="text-[10px] uppercase text-teal-700">Net Payable</span>
        <span className="text-small font-bold text-teal-950 bg-teal-200/80 px-2.5 py-1 rounded-md shadow-xs">
          {invoice.amount}
        </span>
      </div>
    </div>
  )
}

// Card 2 Live Visual: Ledger & PO Agreement Link
export function MatchVisual({ matchTarget }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 font-mono text-xs">
      {/* Top Invoice Amount Anchor */}
      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
        <span className="text-navy-400 text-[11px]">Invoice Total</span>
        <span className="font-bold text-navy">{matchTarget.amount}</span>
      </div>

      {/* Downward agreement links */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2.5 rounded-lg bg-calm-teal/70 border border-teal-200 text-teal-950 flex flex-col justify-between">
          <span className="text-[10px] uppercase text-teal-700">General Ledger</span>
          <span className="font-bold mt-1">✓ {matchTarget.account}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-calm-teal/70 border border-teal-200 text-teal-950 flex flex-col justify-between">
          <span className="text-[10px] uppercase text-teal-700">Purchase Order</span>
          <span className="font-bold mt-1">✓ {matchTarget.poRef}</span>
        </div>
      </div>
    </div>
  )
}

// Card 3 Live Visual: Two Invoices Side-by-Side Duplicate Flag
export function CheckVisual({ duplicateComparison }) {
  const { docA, docB, warning } = duplicateComparison

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
        {/* Left Invoice */}
        <div className="p-3 rounded-xl border border-amber-300 bg-amber-50/40 space-y-1">
          <span className="font-bold text-navy block">{docA.id}</span>
          <span className="text-amber-900 font-semibold block">{docA.amount}</span>
          <span className="text-navy-400 block text-[10px]">{docA.date}</span>
        </div>

        {/* Right Duplicate Invoice */}
        <div className="p-3 rounded-xl border-2 border-amber-400 bg-amber-100/50 space-y-1 shadow-xs">
          <span className="font-bold text-navy block">{docB.id}</span>
          <span className="text-amber-950 font-bold block">{docB.amount}</span>
          <span className="text-navy-500 block text-[10px]">{docB.date}</span>
        </div>
      </div>

      {/* Amber Warning Result */}
      <div className="p-2.5 rounded-lg bg-amber-200/80 border border-amber-400 text-amber-950 text-xs font-mono font-semibold flex items-center gap-2 shadow-xs">
        <span className="text-amber-700 text-base leading-none">⚠</span>
        <span>{warning}</span>
      </div>
    </div>
  )
}
