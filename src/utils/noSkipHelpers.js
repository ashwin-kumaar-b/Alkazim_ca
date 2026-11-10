export const STORY_END_ID = 'what-changes'

export const STORY_STOPS_META = [
  { id: 'chapter-1', label: 'Ch 1: The inbox', type: 'chapter-stop' },
  { id: 'chapter-2', label: 'Ch 2: The loop', type: 'chapter-stop' },
  { id: 'transition-loop-break', label: 'Loop Break (3.5s)', type: 'must-play' },
  { id: 'chapter-3', label: 'Ch 3: Enter Endloops', type: 'chapter-stop' },
  { id: 'chapter-4', label: 'Ch 4: The draft', type: 'chapter-stop' },
  { id: 'chapter-5', label: 'Ch 5: The sign-off', type: 'chapter-stop' },
]

function getAbsoluteTop(el) {
  return Math.max(0, Math.round(window.scrollY + el.getBoundingClientRect().top))
}

/** Measure dynamic chapter/transition landmarks from live DOM */
export function measureStoryLandmarks() {
  if (typeof window === 'undefined') {
    return { active: false, storyStart: 0, storyEnd: 0, stops: [] }
  }

  const ch1 = document.getElementById('chapter-1')
  const storyEndEl = document.getElementById(STORY_END_ID)
  if (!ch1 || !storyEndEl) {
    return { active: false, storyStart: 0, storyEnd: 0, stops: [] }
  }

  const storyStart = getAbsoluteTop(ch1)
  const storyEnd = getAbsoluteTop(storyEndEl)
  const vh = window.innerHeight || 800

  const stops = STORY_STOPS_META.map((meta) => {
    const el = document.getElementById(meta.id)
    if (!el) return null
    const topY = getAbsoluteTop(el)
    const height = el.offsetHeight || vh
    const endY = Math.max(topY, topY + height - vh)
    return { ...meta, topY, height, endY }
  }).filter(Boolean)

  return { active: stops.length > 0 && storyEnd > storyStart, storyStart, storyEnd, stops }
}

/** True only on primary touch-only devices; fine-pointer desktop touchscreens still use wheel gating */
export function isCoarseTouchDevice() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches
}

/** Human-readable chapter or zone label for dev debug overlay */
export function getStoryLocationLabel(scrollY, landmarks) {
  if (!landmarks?.active) return 'Non-story'
  if (scrollY < landmarks.storyStart - 10) return 'Hero'
  if (scrollY >= landmarks.storyEnd - 20) return 'After Story'

  let label = landmarks.stops[0]?.label || 'Story'
  for (const stop of landmarks.stops) {
    if (scrollY >= stop.topY - 40) label = stop.label
  }
  return label
}

export function isForwardScrollKey(event) {
  return (
    event.code === 'PageDown' ||
    event.code === 'ArrowDown' ||
    (event.code === 'Space' && !event.shiftKey)
  )
}

export function isBackwardScrollKey(event) {
  return (
    event.code === 'PageUp' ||
    event.code === 'ArrowUp' ||
    event.code === 'Home' ||
    (event.code === 'Space' && event.shiftKey)
  )
}

export function clampStoryDelta({ lenis, deltaY, landmarks, clearedStops, maxLeadPx }) {
  const storyEndEl = document.getElementById(STORY_END_ID)
  if (storyEndEl && storyEndEl.getBoundingClientRect().top <= 2) return deltaY

  const currentY = lenis.animatedScroll
  const proposed = lenis.targetScroll + deltaY
  const insideOrEntering =
    (currentY >= landmarks.storyStart && currentY < landmarks.storyEnd) ||
    (deltaY > 0 && currentY < landmarks.storyStart && proposed >= landmarks.storyStart)

  if (!insideOrEntering) return deltaY

  if (deltaY > 0) {
    let clamped = Math.min(proposed, currentY + maxLeadPx)
    const nextStop = landmarks.stops.find(
      (s) => !clearedStops.has(s.id) && s.topY > currentY - 4
    )
    if (nextStop && currentY < nextStop.topY && clamped > nextStop.topY + 48) {
      clamped = nextStop.topY + 48
    }
    return Math.max(0, clamped - lenis.targetScroll)
  }

  const clamped = Math.max(proposed, currentY - maxLeadPx)
  return Math.min(0, clamped - lenis.targetScroll)
}

export function triggerStopOrMustPlay({
  stop,
  lenis,
  config,
  holdRef,
  timersRef,
  engageHold,
  releaseHold,
  syncDebug,
}) {
  if (stop.type === 'must-play' && stop.endY - stop.topY >= 200) {
    engageHold('loop-break', stop.id)
    const playEndY = stop.topY + (stop.endY - stop.topY) * 0.96
    lenis.scrollTo(playEndY, {
      duration: config.loopBreakDurationMs / 1000,
      easing: (t) => t,
      lock: true,
      force: true,
      onComplete: () => {
        if (holdRef.current.stopId === stop.id) releaseHold(false)
      },
    })
    return
  }

  engageHold('stopping', stop.id)
  lenis.scrollTo(stop.topY, {
    duration: config.chapterStopDuration,
    easing: config.chapterStopEasing,
    lock: true,
    force: true,
    onComplete: () => {
      if (holdRef.current.stopId !== stop.id) return
      holdRef.current.reason = 'settle'
      syncDebug(lenis, window.scrollY)
      timersRef.current.settle = setTimeout(() => {
        if (holdRef.current.stopId === stop.id) releaseHold(false)
      }, config.settleMs)
    },
  })
}

const INPUT_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

export function processNoSkipKeyDown({
  e,
  holdRef,
  lenisInstance,
  landmarksRef,
  maxHoldSafetyMs,
  releaseHold,
  markClearedUpTo,
}) {
  const active = document.activeElement
  if (active && (INPUT_TAGS.has(active.tagName) || active.isContentEditable)) return
  if (isBackwardScrollKey(e) || e.code === 'End') {
    if (holdRef.current.active || lenisInstance.isLocked) releaseHold(true)
    if (e.code === 'End') markClearedUpTo(landmarksRef.current.storyEnd)
    return
  }
  if (holdRef.current.active && isForwardScrollKey(e)) {
    if (performance.now() - holdRef.current.startedAt >= maxHoldSafetyMs) releaseHold(true)
    else e.preventDefault()
  }
}
