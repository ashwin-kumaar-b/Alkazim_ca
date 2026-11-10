import React from 'react'
import { motion } from 'framer-motion'

/**
 * Css3dCube
 * Pure CSS 3D Cube (64px desktop, 40px mobile).
 * 6 translucent faces using brand teal-to-green gradient, thin borders, soft shadow.
 * No libraries. Never renders or recolors the logo.
 */
export function Css3dCube({
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  bounceY = 0,
  isMobile = false,
}) {
  const sizeClass = isMobile ? 'w-10 h-10' : 'w-16 h-16'
  const halfPx = isMobile ? 20 : 32

  const faceBase = `absolute inset-0 bg-gradient-to-br from-teal/80 via-teal-600/75 to-green/75 border border-teal-200/50 backdrop-blur-xs shadow-inner shadow-white/30 rounded-md`

  return (
    <div
      className={`relative ${sizeClass} flex items-center justify-center select-none pointer-events-none`}
      style={{ perspective: 800 }}
      aria-hidden="true"
    >
      {/* Soft dynamic contact shadow beneath cube */}
      <div
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-teal-950/20 blur-xs transition-transform ${
          isMobile ? 'w-9 h-2' : 'w-14 h-3.5'
        }`}
      />

      {/* 3D Rotating Cube Body */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          y: bounceY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative ${sizeClass} will-change-transform`}
      >
        {/* Front */}
        <div
          className={faceBase}
          style={{ transform: `translateZ(${halfPx}px)` }}
        />
        {/* Back */}
        <div
          className={faceBase}
          style={{ transform: `rotateY(180deg) translateZ(${halfPx}px)` }}
        />
        {/* Left */}
        <div
          className={faceBase}
          style={{ transform: `rotateY(-90deg) translateZ(${halfPx}px)` }}
        />
        {/* Right */}
        <div
          className={faceBase}
          style={{ transform: `rotateY(90deg) translateZ(${halfPx}px)` }}
        />
        {/* Top */}
        <div
          className={`${faceBase} bg-gradient-to-br from-teal-300/85 to-green-300/80`}
          style={{ transform: `rotateX(90deg) translateZ(${halfPx}px)` }}
        />
        {/* Bottom */}
        <div
          className={`${faceBase} bg-gradient-to-br from-teal-800/85 to-navy-700/85`}
          style={{ transform: `rotateX(-90deg) translateZ(${halfPx}px)` }}
        />
      </motion.div>
    </div>
  )
}

export default Css3dCube
