import { cubicBezier } from 'framer-motion'

/**
 * Endloops Story Pacing & Motion Configuration
 * 
 * Single master config file to adjust the narrative pacing by hand:
 * 1. RUNWAY_HEIGHTS: Scroll distance per pinned chapter (height in vh).
 * 2. HOLD_ZONES: Settle hold at chapter start, and rest zones after changes.
 * 3. RAW_EASING_CURVES: Acceleration & deceleration cubic-bezier points [x1, y1, x2, y2].
 * 4. FLIP_CONFIG: 3D card flip start/end range and underline timing.
 * 5. COUNTER_CONFIG: Number counter tick ranges and hold settling.
 * 6. SIGN_OFF_CONFIG: Chapter 5 closing loop draw and settle holds.
 */

// 1. Runway Height per Chapter
// Total runway ~1300vh = roughly 60 to 90 seconds of steady, comfortable scrolling.
export const RUNWAY_HEIGHTS = {
  chapter1: 'md:h-[340vh]', // 4 beats x 60vh + 100vh = 340vh
  chapter2: 'md:h-[340vh]', // 4 beats x 60vh + 100vh = 340vh
  transitionLoopBreak: 'h-[550vh] md:h-[650vh]', // Transition: The loop breaks (~650vh slow 3-phase runway)
  chapter3: 'md:h-[340vh]', // 4 beats x 60vh + 100vh = 340vh (capped)
  chapter4: 'md:h-auto',    // Unpinned interactive workbench
  chapter5: 'md:h-[280vh]', // 3 beats x 60vh + 100vh = 280vh
}

// 2. Hold Zone Sizes (Scroll Progress Ratios 0.0 - 1.0)
// Ensures every change has a visible settling zone before next beat begins.
export const HOLD_ZONES = {
  // Settle hold at chapter start (allows visitor to read time & copy before animation)
  settleHold: 0.08, // 8% of runway
  // Minimum rest hold after each visual change (flip, row arrival, flag)
  defaultBeatHold: 0.12, // 12% of runway
  // Inter-chapter scene crossfade overlap
  enterRange: [0.0, 0.08],
  exitRange: [0.90, 1.0],
}

// 3. Raw Easing Curves (Cubic-Bezier control points [x1, y1, x2, y2])
// Edit these numeric arrays directly by hand
export const RAW_EASING_CURVES = {
  easeInOut: [0.42, 0, 0.58, 1],     // Standard acceleration and settling
  easeOut: [0.16, 1, 0.3, 1],        // Gentle deceleration into rest zones
  springGentle: [0.34, 1.3, 0.64, 1], // Spring for duplicate warning flags
  digitRoll: [0.25, 1, 0.5, 1],      // Time stamp digit slide reel
  snappy: [0.25, 0.1, 0.25, 1],      // Quick snap
}

// Framer Motion easing functions (required for useTransform { ease: fn })
export const EASING_CURVES = {
  easeInOut: cubicBezier(...RAW_EASING_CURVES.easeInOut),
  easeOut: cubicBezier(...RAW_EASING_CURVES.easeOut),
  springGentle: cubicBezier(...RAW_EASING_CURVES.springGentle),
  digitRoll: cubicBezier(...RAW_EASING_CURVES.digitRoll),
  snappy: cubicBezier(...RAW_EASING_CURVES.snappy),
}

// 4. Flip Duration Range & 3D Parameters (Chapter 1)
// Beat 1 begins at progress 0.0 immediately upon pinning
export const FLIP_CONFIG = {
  flipProgressRange: [0.0, 0.16], // 3D flip begins at progress 0
  underlineRange: [0.10, 0.20],   // Teal field highlight draws left-to-right
  perspective: 1200,
}

// 5. Number Counter Timing & Target Values
export const COUNTER_CONFIG = {
  chapter1: {
    target: 412,
    progressRange: [0.76, 0.86], // Ticks 0 -> 412, then rests before scene exits
    fadeRange: [0.74, 0.82],
  },
  chapter3: {
    target: 412,
    progressRange: [0.78, 0.86], // Ticks 0 -> 412, then rests before scene exits
    fadeRange: [0.76, 0.82],
  },
}

// 6. Sign-Off & Closing Loop Timing (Chapter 5)
export const SIGN_OFF_CONFIG = {
  scrollTriggerThreshold: 0.45,
  loopDrawRange: [0.62, 0.78],   // Closing teal loop draws [0.62 -> 0.78]
  arrowScaleRange: [0.76, 0.82], // Upward arrow scales in [0.76 -> 0.82]
  restHoldRange: [0.82, 0.90],   // Rest hold where the full loop settles before exit
}

// 7. Chapter 3: 3D Cube & Spine Pacing Configuration
export const CUBE_CHAPTER3_CONFIG = {
  anchors: {
    card1: 0.18, // Card 1 (Read) pops at 18% scroll
    card2: 0.48, // Card 2 (Match) pops at 48% scroll
    card3: 0.78, // Card 3 (Check) pops at 78% scroll
    settled: 0.94, // Cube settles at bottom, "Ready for your review." fades in
  },
  holdZones: {
    hold1: [0.18, 0.28], // Hold zone after Card 1
    hold2: [0.48, 0.58], // Hold zone after Card 2
    hold3: [0.78, 0.88], // Hold zone after Card 3
  },
  flipDurationMs: 450,
  popDurationMs: 400,
  cubeSizeDesktop: 64, // 64px 3D cube on desktop
  cubeSizeMobile: 40,  // 40px on mobile
}

// 8. Smooth Scrolling (Lenis) Pacing Configuration
export const SMOOTH_SCROLL_CONFIG = {
  lerp: 0.09, // Gentle wheel/trackpad smoothing intensity
  smoothWheel: true, // Smooth mouse wheel & trackpad scrolling
  syncTouch: false, // Keep touch scrolling completely native (do not smooth or intercept)
  wheelMultiplier: 1,
  touchMultiplier: 1,
  autoRaf: false, // Explicit requestAnimationFrame loop in SmoothScrollProvider
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
  jumpDuration: 1.2, // Duration in seconds for programmatic in-page jumps (lenis.scrollTo)
  jumpEasing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
}

// 9. Story "No-Skip" Pacing & Safety Valve Configuration (Story Section Only)
export const NO_SKIP_CONFIG = {
  maxLead: 1.2, // Max viewport heights target scroll can lead current scroll inside the story
  chapterStopDuration: 0.6, // ~600ms ease to exact chapter start on forward scroll
  chapterStopEasing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic ease-out for soft stops
  settleMs: 500, // Hold forward input briefly at each chapter start so slate & first frame are seen
  loopBreakDurationMs: 3500, // Timed ~3.5s must-play sequence for "The loop breaks"
  maxHoldSafetyMs: 4000, // Hard safety valve: never hold input longer than 4 seconds
  retriggerGuardPx: 80, // Distance user must scroll back up above a stop before it can re-arm
  popStaggerMs: 120, // Short stagger (ms) when skipped pops play in sequence after a jump/refresh
  showDebugOverlay: typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV),
}
