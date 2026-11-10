import { useEffect, useRef, useState, useCallback } from 'react'
import { NO_SKIP_CONFIG } from '../config/pacingConfig'
import {
  measureStoryLandmarks,
  isCoarseTouchDevice,
  getStoryLocationLabel,
  clampStoryDelta,
  triggerStopOrMustPlay,
  processNoSkipKeyDown,
} from '../utils/noSkipHelpers'

/**
 * useStoryNoSkip — story-only speed cap (`maxLead`), forward chapter stops (`settleMs`),
 * ~3.5s `"The loop breaks"` timed playback, 4s safety valve, touch & reduced-motion bypass.
 */
export function useStoryNoSkip({
  lenisInstance,
  lenisRef,
  shouldReduceMotion,
  isProgrammaticJumpRef,
  pathname,
}) {
  const landmarksRef = useRef({ active: false, storyStart: 0, storyEnd: 0, stops: [] })
  const clearedStopsRef = useRef(new Set())
  const touchModeRef = useRef(isCoarseTouchDevice())
  const prevScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const holdRef = useRef({ active: false, reason: 'idle', stopId: null, startedAt: 0 })
  const timersRef = useRef({ settle: null, safety: null })

  const [debugState, setDebugState] = useState({
    chapter: 'Hero', velocity: 0, holdActive: false, holdReason: 'idle',
  })

  const clearTimers = useCallback(() => {
    if (timersRef.current.settle) clearTimeout(timersRef.current.settle)
    if (timersRef.current.safety) clearTimeout(timersRef.current.safety)
    timersRef.current = { settle: null, safety: null }
  }, [])

  const syncDebug = useCallback((lenis, scrollY) => {
    if (!NO_SKIP_CONFIG.showDebugOverlay) return
    setDebugState({
      chapter: getStoryLocationLabel(scrollY, landmarksRef.current),
      velocity: Number((lenis?.velocity || 0).toFixed(1)),
      holdActive: holdRef.current.active,
      holdReason: holdRef.current.reason,
    })
  }, [])

  const releaseHold = useCallback(
    (resetLenis = false) => {
      clearTimers()
      const wasActive = holdRef.current.active
      holdRef.current = { active: false, reason: 'idle', stopId: null, startedAt: 0 }
      if (resetLenis && lenisRef.current) lenisRef.current.reset()
      if (wasActive && typeof window !== 'undefined') syncDebug(lenisRef.current, window.scrollY)
    },
    [clearTimers, lenisRef, syncDebug]
  )

  const markClearedUpTo = useCallback((y) => {
    landmarksRef.current.stops.forEach((s) => {
      if (s.topY <= y + 20) clearedStopsRef.current.add(s.id)
    })
  }, [])

  const refreshLandmarks = useCallback(() => {
    landmarksRef.current = measureStoryLandmarks()
    const curY = typeof window !== 'undefined' ? window.scrollY : 0
    if (landmarksRef.current.active) markClearedUpTo(curY)
    syncDebug(lenisRef.current, curY)
  }, [lenisRef, markClearedUpTo, syncDebug])

  useEffect(() => {
    prevScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0
    clearedStopsRef.current.clear()
    releaseHold(false)
    const raf = window.requestAnimationFrame(refreshLandmarks)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(refreshLandmarks) : null
    if (ro) ro.observe(document.body)
    window.addEventListener('resize', refreshLandmarks, { passive: true })
    document.fonts?.ready?.then(refreshLandmarks)
    return () => {
      window.cancelAnimationFrame(raf)
      ro?.disconnect()
      window.removeEventListener('resize', refreshLandmarks)
    }
  }, [pathname, refreshLandmarks, releaseHold])

  const engageHold = useCallback(
    (reason, stopId) => {
      clearTimers()
      holdRef.current = { active: true, reason, stopId, startedAt: performance.now() }
      timersRef.current.safety = setTimeout(() => releaseHold(true), NO_SKIP_CONFIG.maxHoldSafetyMs)
      syncDebug(lenisRef.current, window.scrollY)
    },
    [clearTimers, lenisRef, releaseHold, syncDebug]
  )

  const onVirtualScroll = useCallback(
    (data) => {
      if (shouldReduceMotion) return true
      const { deltaY, event } = data
      const lenis = lenisRef.current
      if (!lenis) return true

      if (event?.type?.includes('touch') || isCoarseTouchDevice()) {
        touchModeRef.current = true
        return true
      }
      if (event?.type === 'wheel') {
        touchModeRef.current = false
        if (isProgrammaticJumpRef.current && deltaY !== 0) {
          isProgrammaticJumpRef.current = false
          markClearedUpTo(lenis.actualScroll)
        }
      }

      if (deltaY < 0 && (holdRef.current.active || lenis.isLocked)) releaseHold(true)
      if (holdRef.current.active && deltaY >= 0) {
        if (performance.now() - holdRef.current.startedAt >= NO_SKIP_CONFIG.maxHoldSafetyMs) {
          releaseHold(true)
        } else {
          if (event?.cancelable) event.preventDefault()
          return false
        }
      }

      const lm = landmarksRef.current
      if (!lm.active || isProgrammaticJumpRef.current || touchModeRef.current) return true

      const maxLeadPx = (window.innerHeight || 800) * NO_SKIP_CONFIG.maxLead
      const clamped = clampStoryDelta({
        lenis, deltaY, landmarks: lm, clearedStops: clearedStopsRef.current, maxLeadPx,
      })
      if (deltaY !== 0 && clamped === 0) {
        if (event?.cancelable) event.preventDefault()
        return false
      }
      data.deltaY = clamped
      return true
    },
    [shouldReduceMotion, lenisRef, isProgrammaticJumpRef, releaseHold, markClearedUpTo]
  )

  useEffect(() => {
    if (shouldReduceMotion || !lenisInstance) return undefined

    const handleScrollTick = () => {
      const lenis = lenisRef.current
      const curY = lenis ? lenis.actualScroll : window.scrollY
      const delta = curY - prevScrollYRef.current
      const prevY = prevScrollYRef.current
      prevScrollYRef.current = curY
      const lm = landmarksRef.current
      syncDebug(lenis, curY)
      if (!lm.active || !lenis || touchModeRef.current) return

      lm.stops.forEach((s) => {
        if (curY < s.topY - NO_SKIP_CONFIG.retriggerGuardPx) clearedStopsRef.current.delete(s.id)
      })
      if (isProgrammaticJumpRef.current || delta > (window.innerHeight || 800) * 1.3) {
        if (delta > 0) markClearedUpTo(curY)
        return
      }
      if (holdRef.current.active || delta <= 0 || curY >= lm.storyEnd) return

      const stop = lm.stops.find((s) => !clearedStopsRef.current.has(s.id) && prevY < s.topY && curY >= s.topY)
      if (!stop) return
      clearedStopsRef.current.add(stop.id)
      triggerStopOrMustPlay({
        stop, lenis, config: NO_SKIP_CONFIG, holdRef, timersRef, engageHold, releaseHold, syncDebug,
      })
    }

    const handleKeyDown = (e) => processNoSkipKeyDown({
      e, holdRef, lenisInstance, landmarksRef, maxHoldSafetyMs: NO_SKIP_CONFIG.maxHoldSafetyMs, releaseHold, markClearedUpTo,
    })

    const unsub = lenisInstance.on('scroll', handleScrollTick)
    window.addEventListener('scroll', handleScrollTick, { passive: true })
    window.addEventListener('keydown', handleKeyDown, true)
    return () => {
      unsub()
      window.removeEventListener('scroll', handleScrollTick)
      window.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [shouldReduceMotion, lenisInstance, lenisRef, isProgrammaticJumpRef, engageHold, releaseHold, markClearedUpTo, syncDebug])

  return { onVirtualScroll, cancelHold: releaseHold, debugState, refreshLandmarks }
}
