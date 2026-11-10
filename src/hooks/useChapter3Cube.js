import { useState, useEffect, useRef } from 'react'
import { useTransform } from 'framer-motion'
import { CUBE_CHAPTER3_CONFIG, NO_SKIP_CONFIG } from '../config/pacingConfig'
import { EASINGS } from '../styles/motionTokens'

/**
 * useChapter3Cube
 * Drives the vertical spine, rotating square, and step card pops.
 * Robust state: evaluates progress synchronously on mount/jump so earlier chapters
 * complete instantly and skipped visible pops play in staggered order.
 */
export function useChapter3Cube({ scrollYProgress, shouldStack = false, inViews = {} }) {
  const { anchors } = CUBE_CHAPTER3_CONFIG
  const { inView1 = false, inView2 = false, inView3 = false } = inViews

  const [popState, setPopState] = useState(() => ({
    c1: shouldStack,
    c2: shouldStack,
    c3: shouldStack,
    settled: shouldStack,
    delays: [0, 0, 0],
    instant: [shouldStack, shouldStack, shouldStack],
  }))

  const stateRef = useRef(popState)
  stateRef.current = popState

  const cubeTravelPercent = useTransform(
    scrollYProgress,
    [0.0, 0.05, 0.18, 0.28, 0.48, 0.58, 0.78, 0.88, 0.96, 1.0],
    ['0%', '0%', '18%', '18%', '50%', '50%', '82%', '82%', '100%', '100%'],
    { ease: EASINGS.easeInOut }
  )

  const cubeRotateX = useTransform(
    scrollYProgress,
    [0.0, 0.15, 0.19, 0.45, 0.49, 0.75, 0.79, 1.0],
    [0, 0, 90, 90, 180, 180, 270, 270],
    { ease: EASINGS.easeInOut }
  )

  const squareRotate = useTransform(
    scrollYProgress,
    [0.0, 0.15, 0.19, 0.45, 0.49, 0.75, 0.79, 0.96, 1.0],
    [0, 0, 90, 90, 180, 180, 270, 270, 360],
    { ease: EASINGS.easeInOut }
  )

  const cubeBounceY = useTransform(
    scrollYProgress,
    [0.15, 0.18, 0.21, 0.45, 0.48, 0.51, 0.75, 0.78, 0.81],
    [0, -10, 0, 0, -10, 0, 0, -10, 0],
    { ease: EASINGS.easeInOut }
  )

  const squareBounceY = useTransform(
    scrollYProgress,
    [0.15, 0.18, 0.21, 0.45, 0.48, 0.51, 0.75, 0.78, 0.81],
    [0, -6, 0, 0, -6, 0, 0, -6, 0],
    { ease: EASINGS.easeInOut }
  )

  const cubeRotateY = useTransform(scrollYProgress, [0, 1], [0, 360], { ease: EASINGS.easeInOut })
  const cubeRotateZ = useTransform(scrollYProgress, [0, 1], [0, 45], { ease: EASINGS.easeInOut })

  const spineScaleY = useTransform(
    scrollYProgress,
    [0.0, 0.05, 0.18, 0.28, 0.48, 0.58, 0.78, 0.88, 0.96, 1.0],
    [0, 0, 0.18, 0.18, 0.50, 0.50, 0.82, 0.82, 1.0, 1.0],
    { ease: EASINGS.easeInOut }
  )

  const greyBgOp = useTransform(scrollYProgress, [0.0, 0.45], [1, 0], { ease: EASINGS.easeInOut })
  const tealBgOp = useTransform(scrollYProgress, [0.15, 0.85], [0, 1], { ease: EASINGS.easeInOut })

  useEffect(() => {
    if (shouldStack) {
      setPopState({
        c1: true, c2: true, c3: true, settled: true,
        delays: [0, 0, 0], instant: [true, true, true],
      })
      return undefined
    }

    const evaluate = (p) => {
      const cur = stateRef.current
      const pastChapter = p >= 0.98
      const next1 = cur.c1 || pastChapter || p >= anchors.card1 || inView1
      const next2 = cur.c2 || pastChapter || p >= anchors.card2 || inView2
      const next3 = cur.c3 || pastChapter || p >= anchors.card3 || inView3
      const nextSettled = cur.settled || pastChapter || p >= anchors.settled

      if (
        next1 === cur.c1 &&
        next2 === cur.c2 &&
        next3 === cur.c3 &&
        nextSettled === cur.settled
      ) {
        return
      }

      const staggerS = NO_SKIP_CONFIG.popStaggerMs / 1000
      const delays = [...cur.delays]
      const instant = [...cur.instant]
      const newlyUnlocked = [
        !cur.c1 && next1 ? 0 : -1,
        !cur.c2 && next2 ? 1 : -1,
        !cur.c3 && next3 ? 2 : -1,
      ].filter((idx) => idx >= 0)

      newlyUnlocked.forEach((cardIdx, orderIdx) => {
        instant[cardIdx] = pastChapter
        delays[cardIdx] = pastChapter || newlyUnlocked.length <= 1 ? 0 : orderIdx * staggerS
      })

      setPopState({ c1: next1, c2: next2, c3: next3, settled: nextSettled, delays, instant })
    }

    evaluate(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', evaluate)
    return () => unsub()
  }, [scrollYProgress, shouldStack, anchors, inView1, inView2, inView3])

  return {
    cubeTravelPercent,
    squareTravelPercent: cubeTravelPercent,
    cubeRotateX,
    cubeRotateY,
    cubeRotateZ,
    cubeBounceY,
    squareRotate,
    squareBounceY,
    spineScaleY,
    card1Popped: popState.c1,
    card2Popped: popState.c2,
    card3Popped: popState.c3,
    popDelays: popState.delays,
    instantCards: popState.instant,
    settled: popState.settled,
    greyBgOp,
    tealBgOp,
  }
}

export default useChapter3Cube
