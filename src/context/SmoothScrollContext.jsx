import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { SMOOTH_SCROLL_CONFIG, NO_SKIP_CONFIG } from '../config/pacingConfig'
import {
  resolveTargetElement,
  focusTargetHeading,
  isScrollKey,
  getSamePageHashTarget,
} from '../utils/scrollHelpers'
import { useStoryNoSkip } from '../hooks/useStoryNoSkip'
import { NoSkipDebugOverlay } from '../components/story/NoSkipDebugOverlay'

const SmoothScrollContext = createContext(null)

/**
 * SmoothScrollProvider — Single root Lenis provider + story no-skip coordinator.
 * Uses SMOOTH_SCROLL_CONFIG for wheel/trackpad lerp while leaving touch native.
 */
export function SmoothScrollProvider({ children }) {
  const { pathname } = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const lenisRef = useRef(null)
  const [lenisInstance, setLenisInstance] = useState(null)
  const isProgrammaticJumpRef = useRef(false)
  const jumpTokenRef = useRef(0)
  const onVirtualScrollRef = useRef(null)

  const noSkip = useStoryNoSkip({
    lenisInstance, lenisRef, shouldReduceMotion, isProgrammaticJumpRef, pathname,
  })
  onVirtualScrollRef.current = noSkip.onVirtualScroll
  const cancelHoldRef = useRef(noSkip.cancelHold)
  cancelHoldRef.current = noSkip.cancelHold

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') {
      lenisRef.current = null
      setLenisInstance(null)
      return undefined
    }

    const lenis = new Lenis({
      lerp: SMOOTH_SCROLL_CONFIG.lerp,
      smoothWheel: SMOOTH_SCROLL_CONFIG.smoothWheel,
      syncTouch: SMOOTH_SCROLL_CONFIG.syncTouch,
      wheelMultiplier: SMOOTH_SCROLL_CONFIG.wheelMultiplier,
      touchMultiplier: SMOOTH_SCROLL_CONFIG.touchMultiplier,
      autoRaf: SMOOTH_SCROLL_CONFIG.autoRaf,
      stopInertiaOnNavigate: SMOOTH_SCROLL_CONFIG.stopInertiaOnNavigate,
      respectReducedMotion: SMOOTH_SCROLL_CONFIG.respectReducedMotion,
      virtualScroll: (data) => onVirtualScrollRef.current?.(data),
      anchors: false,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    let rafId = 0
    let lastSmoothY = null
    const raf = (time) => {
      if (lenis.isScrolling === 'smooth' && !lenis.isLocked && lastSmoothY !== null && Math.abs(window.scrollY - lastSmoothY) > 40) {
        isProgrammaticJumpRef.current = false
        lenis.reset()
        lastSmoothY = null
      }
      lenis.raf(time)
      lastSmoothY = lenis.isScrolling === 'smooth' ? window.scrollY : null
      rafId = window.requestAnimationFrame(raf)
    }
    rafId = window.requestAnimationFrame(raf)

    const handleKeyDown = (e) => {
      if (!e.defaultPrevented && lenis.isScrolling === 'smooth' && !lenis.isLocked && isScrollKey(e)) {
        isProgrammaticJumpRef.current = false
        lenis.reset()
      }
    }
    window.addEventListener('keydown', handleKeyDown, { passive: true })

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('keydown', handleKeyDown)
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [shouldReduceMotion])

  const scrollToTarget = useCallback((target, options = {}) => {
    const targetEl = resolveTargetElement(target)
    if (!targetEl) return

    cancelHoldRef.current?.(true)
    const token = ++jumpTokenRef.current
    isProgrammaticJumpRef.current = true
    const offset = options.offset ?? 0
    const finish = () => {
      if (jumpTokenRef.current === token) isProgrammaticJumpRef.current = false
      window.dispatchEvent(new CustomEvent('endloops:jump-complete', { detail: { targetId: targetEl.id } }))
      if (options.focusHeading !== false) focusTargetHeading(targetEl)
      options.onComplete?.()
    }

    const lenis = lenisRef.current
    if (lenis && !shouldReduceMotion) {
      if (Math.abs(window.scrollY - lenis.animatedScroll) > 2) lenis.reset()
      lenis.scrollTo(targetEl, {
        offset,
        duration: options.duration ?? SMOOTH_SCROLL_CONFIG.jumpDuration,
        easing: options.easing ?? SMOOTH_SCROLL_CONFIG.jumpEasing,
        force: true,
        onComplete: finish,
      })
      return
    }

    const top = Math.max(0, window.scrollY + targetEl.getBoundingClientRect().top + offset)
    window.scrollTo({ top, behavior: 'auto' })
    finish()
  }, [shouldReduceMotion])

  const scrollToImmediate = useCallback((position = 0) => {
    cancelHoldRef.current?.(true)
    isProgrammaticJumpRef.current = false
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(position, { immediate: true, force: true })
    else if (typeof window !== 'undefined') {
      window.scrollTo({ top: typeof position === 'number' ? position : 0, behavior: 'auto' })
    }
  }, [])

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const targetEl = getSamePageHashTarget(e)
      if (!targetEl) return
      e.preventDefault()
      scrollToTarget(targetEl)
    }
    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [scrollToTarget])

  const value = useMemo(() => ({
    lenis: lenisInstance,
    isEnabled: !shouldReduceMotion && Boolean(lenisInstance),
    scrollToTarget,
    scrollToImmediate,
    cancelHold: noSkip.cancelHold,
  }), [lenisInstance, shouldReduceMotion, scrollToTarget, scrollToImmediate, noSkip.cancelHold])

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
      {import.meta.env.DEV && NO_SKIP_CONFIG.showDebugOverlay && (
        <NoSkipDebugOverlay debugState={noSkip.debugState} />
      )}
    </SmoothScrollContext.Provider>
  )
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export default SmoothScrollProvider
