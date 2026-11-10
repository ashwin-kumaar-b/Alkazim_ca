import React from 'react'
import { motion } from 'framer-motion'

/**
 * ClosingLoopSvg
 * Thin teal curve closing the audit loop, culminating in an upward arrow.
 * Does not alter or reproduce the logo.
 * Supports completion-triggered animation or scroll-driven animation.
 */
export function ClosingLoopSvg({
  isSigned = false,
  loopDraw,
  arrowScale,
  arrowOp,
  isStatic = false,
}) {
  const isCompletionAnim = isSigned && !loopDraw

  return (
    <div className="absolute -inset-x-8 -bottom-16 sm:-bottom-20 z-0 pointer-events-none flex items-center justify-center">
      <svg
        viewBox="0 0 600 240"
        fill="none"
        className="w-full max-w-xl h-auto text-teal overflow-visible"
        aria-hidden="true"
      >
        <motion.path
          d="M 60,190 C 140,260 380,260 480,180 C 530,140 540,80 500,50 C 460,20 400,60 440,110 C 470,150 540,110 560,30"
          stroke="#118379"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 6"
          initial={isCompletionAnim ? { pathLength: 0, opacity: 0 } : undefined}
          animate={
            isStatic
              ? { pathLength: 1, opacity: 1 }
              : isCompletionAnim
              ? { pathLength: 1, opacity: 1 }
              : undefined
          }
          transition={isCompletionAnim ? { duration: 1.0, ease: [0.16, 1, 0.3, 1] } : undefined}
          style={loopDraw ? { pathLength: loopDraw, opacity: 1 } : undefined}
          className="will-change-transform"
        />
        <motion.polygon
          points="550,38 560,20 570,38 560,32"
          fill="#118379"
          initial={isCompletionAnim ? { scale: 0, opacity: 0 } : undefined}
          animate={
            isStatic
              ? { opacity: 1, scale: 1 }
              : isCompletionAnim
              ? { opacity: 1, scale: 1 }
              : undefined
          }
          transition={isCompletionAnim ? { delay: 0.8, duration: 0.35, ease: 'easeOut' } : undefined}
          style={arrowScale ? { scale: arrowScale, opacity: arrowOp } : undefined}
          className="will-change-transform"
        />
      </svg>
    </div>
  )
}

export default ClosingLoopSvg
