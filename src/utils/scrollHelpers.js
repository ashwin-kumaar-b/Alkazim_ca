const SCROLL_KEYS = new Set([
  'Space',
  'PageDown',
  'PageUp',
  'ArrowDown',
  'ArrowUp',
  'Home',
  'End',
])

const INPUT_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])
const INTERACTIVE_TAGS = new Set(['BUTTON', 'A', 'SUMMARY'])

/** Resolve a selector string, bare ID, or Element into a DOM element */
export function resolveTargetElement(target) {
  if (!target) return null
  if (target instanceof Element) return target
  if (typeof target === 'string') {
    const id = target.startsWith('#') ? target.slice(1) : target
    return document.getElementById(id) || document.querySelector(target)
  }
  return null
}

/** Move keyboard focus cleanly to target section heading without scrolling */
export function focusTargetHeading(targetEl) {
  if (!targetEl) return
  const heading = targetEl.matches('h1, h2, h3, h4')
    ? targetEl
    : targetEl.querySelector('h1, h2, h3, h4')
  const focusEl = heading || targetEl
  if (!focusEl.hasAttribute('tabindex')) {
    focusEl.setAttribute('tabindex', '-1')
  }
  focusEl.focus({ preventScroll: true })
}

/** Check whether a keydown should cancel leftover wheel inertia for native keyboard scrolling */
export function isScrollKey(event) {
  if (!SCROLL_KEYS.has(event.code)) return false
  const active = document.activeElement
  if (active) {
    if (INPUT_TAGS.has(active.tagName) || active.isContentEditable) return false
    if (
      event.code === 'Space' &&
      (INTERACTIVE_TAGS.has(active.tagName) ||
        active.getAttribute('role') === 'button' ||
        active.getAttribute('role') === 'tab')
    ) {
      return false
    }
  }
  return true
}

/** Resolve same-page anchor click target if eligible for Lenis routing */
export function getSamePageHashTarget(event) {
  if (event.defaultPrevented) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    return null
  }

  const anchor = event.target?.closest?.('a[href]')
  if (!anchor) return null

  const rawHref = anchor.getAttribute('href')
  if (!rawHref || !rawHref.includes('#')) return null

  let parsedUrl
  try {
    parsedUrl = new URL(anchor.href, window.location.href)
  } catch {
    return null
  }

  if (
    parsedUrl.origin !== window.location.origin ||
    parsedUrl.pathname !== window.location.pathname ||
    !parsedUrl.hash
  ) {
    return null
  }

  return resolveTargetElement(decodeURIComponent(parsedUrl.hash))
}

const SCROLL_STORAGE_KEY = 'endloops_scroll_positions'

export function saveRouteScroll(pathname, y) {
  try {
    const raw = sessionStorage.getItem(SCROLL_STORAGE_KEY)
    const map = raw ? JSON.parse(raw) : {}
    map[pathname] = Math.max(0, Math.round(y))
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(map))
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}

export function getSavedRouteScroll(pathname) {
  try {
    const raw = sessionStorage.getItem(SCROLL_STORAGE_KEY)
    if (!raw) return 0
    const map = JSON.parse(raw)
    return typeof map[pathname] === 'number' ? map[pathname] : 0
  } catch {
    return 0
  }
}

export function isReloadNavigation() {
  try {
    const entries = performance.getEntriesByType?.('navigation')
    return entries?.[0]?.type === 'reload'
  } catch {
    return false
  }
}
