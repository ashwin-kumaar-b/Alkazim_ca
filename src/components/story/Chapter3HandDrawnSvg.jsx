import React from 'react'
import { motion } from 'framer-motion'
import { TEAL_PATH, AMBER_PATH } from '../../data/chapter3PathData'

/**
 * Chapter3HandDrawnSvg
 * The 40px hand-drawn pen lane located strictly below the three step cards:
 * 1. Teal path: scribble under Step 1 -> low wave -> scribble under Step 2 -> low wave
 * 2. Amber path: scribble under Step 3
 * 3. Animated pen dot sitting at the pen tip
 * Never crosses any text, card content or invoice amount.
 */
export function Chapter3HandDrawnSvg({
  tealPathRef,
  amberPathRef,
  tealPathLength,
  amberPathLength,
  dotPos,
  dotColor,
  isStatic = false,
}) {
  return (
    <div className="w-full h-10 relative flex items-center justify-center overflow-visible select-none pointer-events-none">
      <svg
        viewBox="0 0 600 40"
        fill="none"
        className="w-full h-10 overflow-visible"
        aria-hidden="true"
      >
        {/* Teal Segment: Scribble 1 -> Wave 1-2 -> Scribble 2 -> Wave 2-3 */}
        <motion.path
          ref={tealPathRef}
          d={TEAL_PATH}
          stroke="#118379"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={isStatic ? { pathLength: 1 } : { pathLength: tealPathLength }}
          className="will-change-transform"
        />

        {/* Amber Segment: Scribble 3 under Step 3 */}
        <motion.path
          ref={amberPathRef}
          d={AMBER_PATH}
          stroke="#D97706"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={isStatic ? { pathLength: 1 } : { pathLength: amberPathLength }}
          className="will-change-transform"
        />

        {/* Small Pen Tip Dot following the head of the line */}
        {!isStatic && (
          <g transform={`translate(${dotPos.x}, ${dotPos.y})`}>
            {/* Soft halo */}
            <circle cx="0" cy="0" r="6" fill={dotColor} opacity="0.25" />
            {/* Pen tip point */}
            <circle cx="0" cy="0" r="3.5" fill={dotColor} />
            <circle cx="0" cy="0" r="1.2" fill="#FFFFFF" />
          </g>
        )}
      </svg>
    </div>
  )
}

export default Chapter3HandDrawnSvg
