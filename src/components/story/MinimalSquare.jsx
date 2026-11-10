import React from 'react'
import { motion } from 'framer-motion'

/**
 * MinimalSquare
 * Minimalistic square that glides down the vertical spine in Chapter 3 ("Enter Endloops").
 * Replaces the 3D cube with a clean, flat 2D geometric indicator.
 * Features a crisp teal border, frosted white canvas, inner gradient core, and soft ambient shadow.
 */
export function MinimalSquare({
  rotate = 0,
  bounceY = 0,
  isMobile = false,
}) {
  const sizeClass = isMobile ? 'w-8 h-8' : 'w-10 h-10'

  return (
    <div
      className={`relative ${sizeClass} flex items-center justify-center select-none pointer-events-none`}
      aria-hidden="true"
    >
      {/* Soft ambient glow beneath square */}
      <div
        className="absolute inset-0 rounded-lg bg-teal/25 blur-sm -z-10"
        aria-hidden="true"
      />

      {/* Minimalist Square Body */}
      <motion.div
        style={{
          rotate,
          y: bounceY,
        }}
        className={`relative ${sizeClass} rounded-lg bg-white/95 border-2 border-teal shadow-sm flex items-center justify-center will-change-transform`}
      >
        {/* Inner Teal-to-Green Core */}
        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm bg-gradient-to-br from-teal to-green shadow-xs" />
      </motion.div>
    </div>
  )
}

export default MinimalSquare
