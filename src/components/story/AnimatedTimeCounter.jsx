import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { formatMinutesToHoursMinutes } from '../../config/storyTimeConfig'

/**
 * AnimatedTimeCounter
 * Minimalistic counter for time handed back (0h 00m -> 7h 05m).
 */
export function AnimatedTimeCounter({
  totalMinutes = 425,
  startDelay = 2.4,
  replayKey = 0,
  shouldReduceMotion = false,
}) {
  const [displayMinutes, setDisplayMinutes] = useState(
    shouldReduceMotion ? totalMinutes : 0
  )
  const [isLanded, setIsLanded] = useState(shouldReduceMotion)

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayMinutes(totalMinutes)
      setIsLanded(true)
      return
    }

    setDisplayMinutes(0)
    setIsLanded(false)

    const timer = setTimeout(() => {
      const startTime = performance.now()
      const duration = 900
      let rafId

      const step = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(1, elapsed / duration)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(eased * totalMinutes)
        setDisplayMinutes(current)

        if (progress < 1) {
          rafId = requestAnimationFrame(step)
        } else {
          setIsLanded(true)
        }
      }

      rafId = requestAnimationFrame(step)
      return () => cancelAnimationFrame(rafId)
    }, startDelay * 1000)

    return () => clearTimeout(timer)
  }, [replayKey, totalMinutes, startDelay, shouldReduceMotion])

  const formattedTime = formatMinutesToHoursMinutes(displayMinutes)

  return (
    <motion.div
      animate={
        isLanded && !shouldReduceMotion
          ? { scale: [1, 1.06, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-1 will-change-transform"
    >
      <div className="font-display font-black text-4xl sm:text-5xl text-teal tracking-tight tabular-nums">
        {formattedTime}
      </div>
      <p className="text-xs font-mono text-navy-400">
        per 412 document run
      </p>
    </motion.div>
  )
}

export default AnimatedTimeCounter
