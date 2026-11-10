import { useState, useEffect, useRef } from 'react'
import { useTransform } from 'framer-motion'
import { CHAPTER3_CONFIG } from '../config/pacingConfig'
import { PEN_START_POINT } from '../data/chapter3PathData'
import { EASINGS } from '../styles/motionTokens'

/**
 * useChapter3Pipeline
 * Single commented hook controlling the Chapter 3 single-example experience:
 * 1. Progress-threshold step pops: only one step pops at a time, in order.
 * 2. Pen line pathLength driving the teal and amber scribble paths.
 * 3. Dot tracking following the path head via getPointAtLength.
 * 4. Background crossfade from tension grey to white & light teal.
 * 5. Time updates from story time config.
 */
export function useChapter3Pipeline({ scrollYProgress, shouldStack = false }) {
  const { thresholds } = CHAPTER3_CONFIG

  const tealPathRef = useRef(null)
  const amberPathRef = useRef(null)

  // Pen dot position and color (starts at PEN_START_POINT on progress 0)
  const [dotPos, setDotPos] = useState(PEN_START_POINT)
  const [dotColor, setDotColor] = useState('#118379') // teal

  // Discrete pop states triggered by thresholds; only one pops at a time, in order
  const [step1Popped, setStep1Popped] = useState(shouldStack)
  const [step2Popped, setStep2Popped] = useState(shouldStack)
  const [step3Popped, setStep3Popped] = useState(shouldStack)
  const [captionPopped, setCaptionPopped] = useState(shouldStack)

  // Path length transforms (eased with EASINGS.easeInOut from motion tokens)
  // Teal path draws from start of scribble 1 (0.06) through wave to scribble 3 start (0.72)
  const tealPathLength = useTransform(
    scrollYProgress,
    [thresholds.step1, thresholds.step3],
    [0, 1],
    { ease: EASINGS.easeInOut }
  )

  // Amber path draws scribble 3 under Step 3 (0.72 -> 0.84)
  const amberPathLength = useTransform(
    scrollYProgress,
    [thresholds.step3, thresholds.caption],
    [0, 1],
    { ease: EASINGS.easeInOut }
  )

  // Background crossfade: tension grey fades out, calm white & light teal fades in
  const greyBgOp = useTransform(scrollYProgress, [0.0, 0.45], [1, 0], { ease: EASINGS.easeInOut })
  const tealBgOp = useTransform(scrollYProgress, [0.15, 0.65], [0, 1], { ease: EASINGS.easeInOut })

  // Time updates triggered when the caption pops
  const timeRollY = useTransform(scrollYProgress, [0.82, 0.90], [0, -20], { ease: EASINGS.digitRoll })

  // Listen to scroll to update pop states and track pen tip position
  useEffect(() => {
    if (shouldStack) {
      setStep1Popped(true)
      setStep2Popped(true)
      setStep3Popped(true)
      setCaptionPopped(true)
      return
    }

    const unsub = scrollYProgress.on('change', (p) => {
      // 1. One step pops at a time, in sequence, when pen starts scribble beneath it
      setStep1Popped(p >= thresholds.step1)
      setStep2Popped(p >= thresholds.step2)
      setStep3Popped(p >= thresholds.step3)
      setCaptionPopped(p >= thresholds.caption)

      // 2. Track pen dot along the respective path segment
      if (p < thresholds.step3) {
        // Teal segment (scribbles 1 & 2 + waves)
        setDotColor('#118379')
        if (tealPathRef.current) {
          try {
            const total = tealPathRef.current.getTotalLength()
            const frac = Math.min(1, Math.max(0, (p - thresholds.step1) / (thresholds.step3 - thresholds.step1)))
            const pt = tealPathRef.current.getPointAtLength(frac * total)
            setDotPos({ x: Math.round(pt.x), y: Math.round(pt.y) })
          } catch {
            // SVG fallback
          }
        }
      } else {
        // Amber segment (scribble 3)
        setDotColor('#D97706')
        if (amberPathRef.current) {
          try {
            const total = amberPathRef.current.getTotalLength()
            const frac = Math.min(1, Math.max(0, (p - thresholds.step3) / (thresholds.caption - thresholds.step3)))
            const pt = amberPathRef.current.getPointAtLength(frac * total)
            setDotPos({ x: Math.round(pt.x), y: Math.round(pt.y) })
          } catch {
            // SVG fallback
          }
        }
      }
    })

    return () => unsub()
  }, [scrollYProgress, shouldStack, thresholds])

  return {
    tealPathRef,
    amberPathRef,
    dotPos,
    dotColor,
    tealPathLength,
    amberPathLength,
    step1Popped,
    step2Popped,
    step3Popped,
    captionPopped,
    greyBgOp,
    tealBgOp,
    timeRollY,
  }
}

export default useChapter3Pipeline
