import React from 'react'
import { motion } from 'framer-motion'

export function LoopVoucherCard({
  item,
  amberOutlineOp,
  flagSlideX,
  flagOp,
  shouldStack = false,
  isMobile = false,
  shouldReduceMotion = false,
}) {
  const isDup = item.isDuplicate

  return (
    <motion.div
      initial={isMobile && !shouldReduceMotion ? { opacity: 0, y: 14 } : undefined}
      whileInView={isMobile && !shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="relative bg-white rounded-2xl border border-slate-200 p-4 shadow-card overflow-hidden"
    >
      {/* Amber Outline Fade-in for Duplicate */}
      {isDup && (
        <motion.div
          style={shouldStack ? { opacity: 1 } : { opacity: amberOutlineOp }}
          className="absolute inset-0 rounded-2xl border-2 border-amber-400 bg-amber-50/20 pointer-events-none will-change-transform"
        />
      )}

      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs relative z-10">
        <span className="font-mono text-navy-400">{item.ref}</span>

        {/* Spring-animated duplicate flag */}
        {isDup ? (
          <motion.span
            style={shouldStack ? { opacity: 1, x: 0 } : { opacity: flagOp, x: flagSlideX }}
            className="px-2.5 py-0.5 rounded-full font-mono text-[10px] bg-amber-200 text-amber-900 font-bold border border-amber-300 shadow-xs will-change-transform whitespace-nowrap shrink-0"
          >
            Duplicate Submission
          </motion.span>
        ) : (
          <span className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-calm-subtle text-navy-400 whitespace-nowrap shrink-0">
            {item.status}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between relative z-10 gap-3">
        <div className="min-w-0 pr-2">
          <p className="text-small font-semibold text-navy truncate">{item.vendor}</p>
          <p className="text-xs text-navy-400 font-mono mt-0.5 truncate">{item.action}</p>
        </div>
        <span className="font-mono text-small font-bold text-navy tabular-nums whitespace-nowrap shrink-0">
          {item.amount}
        </span>
      </div>
    </motion.div>
  )
}

export default LoopVoucherCard
