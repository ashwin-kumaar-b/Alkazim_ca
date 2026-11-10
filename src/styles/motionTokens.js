/**
 * Shared Motion Tokens
 * Re-exports pacing tokens from src/config/pacingConfig.js alongside GPU animation styles.
 */

import {
  EASING_CURVES,
  HOLD_ZONES,
  RUNWAY_HEIGHTS,
  FLIP_CONFIG,
  COUNTER_CONFIG,
  SIGN_OFF_CONFIG,
} from '../config/pacingConfig'

export {
  RUNWAY_HEIGHTS,
  HOLD_ZONES,
  EASING_CURVES,
  FLIP_CONFIG,
  COUNTER_CONFIG,
  SIGN_OFF_CONFIG,
}

// Framer Motion & CSS Cubic-Bezier Easing Curves alias
export const EASINGS = EASING_CURVES

// 3D Flip Styles for Document Reveal
export const FLIP_STYLES = {
  container: {
    perspective: FLIP_CONFIG.perspective,
    transformStyle: 'preserve-3d',
  },
  cardFace: {
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  },
  willChange: 'transform, opacity',
}

// Mood shift color tokens (Tension to Calm)
export const MOOD_COLORS = {
  tensionBg: '#F3F4F6',
  tensionSurface: '#F9FAFB',
  calmTeal: '#F0FAF9',
  calmWhite: '#FFFFFF',
}

// Convenient hold and transition aliases
export const CHAPTER_RUNWAYS = RUNWAY_HEIGHTS
export const CHAPTER_SETTLE_HOLD = HOLD_ZONES.settleHold
export const CHAPTER_ENTER_RANGE = HOLD_ZONES.enterRange
export const CHAPTER_EXIT_RANGE = HOLD_ZONES.exitRange
export const BEAT_HOLD_RATIO = HOLD_ZONES.defaultBeatHold
