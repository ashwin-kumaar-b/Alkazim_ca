import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INVOICE_DATA } from '../../data/chapter3PathData'

/**
 * Chapter3SingleInvoice
 * Single duplicate invoice card (INV-2024-0941).
 * When Step 1 pops: supplier, amount, and date highlight teal.
 * When Caption pops: caption "That's your duplicate." fades in under the invoice.
 * No developer-style labels or overlays.
 */
export function Chapter3SingleInvoice({
  step1Popped,
  captionPopped,
  isStatic = false,
}) {
  const isHighlighted = isStatic || step1Popped
  const isDuplicateRevealed = isStatic || captionPopped

  return (
    <div className="w-full space-y-2">
      <div className="relative bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-card transition-colors duration-300">
        {/* Top Metadata Row: Doc ID, Type, Date */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-navy">{INVOICE_DATA.id}</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-navy-500 text-[10px]">
              {INVOICE_DATA.docType}
            </span>
          </div>

          {/* Date: highlights teal when Step 1 pops */}
          <div className="flex items-center gap-1.5">
            <span className="text-navy-400">Date:</span>
            <span
              className={`px-2 py-0.5 rounded transition-all duration-300 ${
                isHighlighted
                  ? 'bg-teal-100 text-teal-900 font-bold'
                  : 'text-navy-700 font-medium'
              }`}
            >
              {INVOICE_DATA.date}
            </span>
          </div>
        </div>

        {/* Vendor & Amount Row */}
        <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Supplier: highlights teal when Step 1 pops */}
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-400 block">
              Vendor
            </span>
            <p
              className={`text-body sm:text-h3 font-display font-semibold transition-all duration-300 inline-block px-1.5 py-0.5 rounded ${
                isHighlighted ? 'bg-teal-50 text-teal-900 ring-1 ring-teal-200' : 'text-navy'
              }`}
            >
              {INVOICE_DATA.vendor}
            </p>
            <p className="text-xs font-mono text-navy-400">{INVOICE_DATA.ref}</p>
          </div>

          {/* Amount: highlights teal when Step 1 pops */}
          <div className="text-left sm:text-right shrink-0 space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-400 block">
              Invoice Amount
            </span>
            <div
              className={`inline-block px-2.5 py-1 rounded-lg transition-all duration-300 font-mono text-h3 sm:text-h2 font-bold tabular-nums whitespace-nowrap ${
                isHighlighted
                  ? 'bg-teal-100/90 text-teal-900 ring-1 ring-teal-300'
                  : 'bg-slate-50 text-navy'
              }`}
            >
              {INVOICE_DATA.amount}
            </div>
          </div>
        </div>
      </div>

      {/* Caption: "That's your duplicate." fades in under the invoice */}
      <div className="h-6 flex items-center justify-end px-1">
        <AnimatePresence>
          {isDuplicateRevealed && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span>That’s your duplicate.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Chapter3SingleInvoice
