import React from 'react'
import { motion } from 'framer-motion'
import { FLIP_STYLES } from '../../styles/motionTokens'

/**
 * FlippedInvoiceCard
 * 3D flipping card (rotateY, perspective, backfaceVisibility: hidden)
 * Front: Scanned voucher preview (visible at 0 deg).
 * Back: Extracted structured fields (visible at 180 deg).
 * Underline: scaleX from left origin.
 */
export function FlippedInvoiceCard({
  doc,
  flipRotateYFront,
  flipRotateYBack,
  highlightScaleX,
  isStatic = false,
}) {
  return (
    <div
      className="relative w-full h-[180px] sm:h-[190px]"
      style={isStatic ? {} : FLIP_STYLES.container}
    >
      {/* Front Face: Raw Scanned Tax Invoice */}
      <motion.div
        style={
          isStatic
            ? { display: 'none' }
            : {
                rotateY: flipRotateYFront,
                ...FLIP_STYLES.cardFace,
              }
        }
        className="absolute inset-0 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-card flex flex-col justify-between will-change-transform"
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-[11px] font-mono text-navy-400">
          <span className="font-semibold text-navy">{doc.docId}</span>
          <span className="px-2 py-0.5 rounded-full bg-tension-surface border border-tension-border text-[10px]">
            Scanned PDF
          </span>
        </div>
        <div>
          <p className="text-small font-semibold text-navy">{doc.vendor}</p>
          <p className="text-xs text-navy-400 font-mono mt-0.5">{doc.ref} · {doc.date}</p>
        </div>
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-navy-400">
          <span>Stated Invoice Total</span>
          <span className="font-bold text-navy tabular-nums whitespace-nowrap shrink-0">{doc.amount}</span>
        </div>
      </motion.div>

      {/* Back Face: Extracted Structured Fields with Teal Highlight */}
      <motion.div
        style={
          isStatic
            ? { opacity: 1 }
            : {
                rotateY: flipRotateYBack,
                ...FLIP_STYLES.cardFace,
              }
        }
        className={`${
          isStatic ? 'relative' : 'absolute inset-0'
        } bg-white rounded-2xl border border-teal-200 p-4 sm:p-5 shadow-card flex flex-col justify-between will-change-transform`}
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-[11px] font-mono text-navy-400">
          <span className="font-semibold text-teal font-mono">{doc.docId} · Extracted</span>
          <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-mono text-[10px] border border-teal-100">
            TRN Verified
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-small font-semibold text-navy truncate">{doc.vendor}</p>
          <p className="text-xs text-navy-400 font-mono">{doc.ref} · {doc.date}</p>
        </div>

        {/* Amount with Animated Teal Underline */}
        <div className="pt-2 border-t border-slate-100 relative">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-navy-400 font-mono">Parsed Net Total</span>
            <span className="font-mono text-small sm:text-base font-bold text-teal-700 tabular-nums whitespace-nowrap shrink-0">
              {doc.amount}
            </span>
          </div>

          {/* Teal Underline Drawing Left-to-Right */}
          <motion.div
            style={
              isStatic
                ? { scaleX: 1 }
                : {
                    scaleX: highlightScaleX,
                    originX: 0,
                  }
            }
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal rounded-full will-change-transform"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default FlippedInvoiceCard
