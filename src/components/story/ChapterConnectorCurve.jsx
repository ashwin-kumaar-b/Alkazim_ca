import React from 'react'
import { motion, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { EASINGS } from '../../styles/motionTokens'

/**
 * ChapterConnectorCurve
 * A thin teal connecting curve drawn with scroll (pathLength 0 -> 1),
 * echoing the loop idea and gracefully bridging consecutive chapter scenes.
 * Note: Purely an abstract bezier thread; never reproduces or alters the logo.
 */
export function ChapterConnectorCurve({ scrollYProgress, range = [0.82, 0.98], className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  // Draws progressively during the chapter's exit runway
  const pathLength = useTransform(
    scrollYProgress,
    range,
    [0, 1],
    { ease: EASINGS.easeInOut }
  )

  const lineOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, range[0] - 0.02), (range[0] + range[1]) / 2, range[1]],
    [0, 0.8, 0.2],
    { ease: EASINGS.easeInOut }
  )

  if (shouldReduceMotion) {
    return (
      <div className={`w-full flex justify-center py-4 pointer-events-none ${className}`} aria-hidden="true">
        <svg viewBox="0 0 100 120" className="w-16 h-20 text-teal/30" fill="none">
          <path
            d="M 50,0 C 50,40 10,60 50,80 C 90,100 50,120 50,120"
            stroke="#118379"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            opacity="0.4"
          />
        </svg>
      </div>
    )
  }

  return (
    <div
      className={`absolute inset-x-0 bottom-0 flex justify-center pointer-events-none z-20 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 140"
        className="w-16 sm:w-20 h-24 sm:h-28 text-teal overflow-visible"
        fill="none"
      >
        <motion.path
          d="M 50,0 C 50,45 10,70 50,95 C 90,120 50,140 50,140"
          stroke="#118379"
          strokeWidth="1.75"
          strokeDasharray="4 4"
          style={{
            pathLength,
            opacity: lineOpacity,
          }}
          className="will-change-transform"
        />
        <motion.circle
          cx="50"
          cy="138"
          r="2.5"
          fill="#118379"
          style={{ opacity: lineOpacity }}
          className="will-change-transform"
        />
      </svg>
    </div>
  )
}

export default ChapterConnectorCurve
