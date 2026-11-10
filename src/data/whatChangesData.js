import {
  STORY_TIME_CONFIG,
  MANUAL_END_CLOCK,
  SIGN_OFF_CLOCK,
} from '../config/storyTimeConfig'

/**
 * What Changes Impact Section Data
 * Content and configuration for the post-sign-off impact payoff.
 * All figures default to null — no generated or estimated numbers.
 */

export const IMPACT_CARDS = [
  {
    id: 'time-back',
    title: 'Time back',
    description: 'The repetitive work is prepared for you, so your hours go to judgement and clients.',
    iconType: 'clock',
  },
  {
    id: 'fewer-misses',
    title: 'Fewer misses',
    description: 'Every document is checked against the same rules, every time.',
    iconType: 'shield-check',
  },
  {
    id: 'scale-without-strain',
    title: 'Scale without strain',
    description: 'Hundreds of documents, handled in one run.',
    iconType: 'layers',
  },
  {
    id: 'a-clear-trail',
    title: 'A clear trail',
    description: 'Every flag and decision traces back to its source document.',
    iconType: 'file-search',
  },
  {
    id: 'people-stay-in-control',
    title: 'People stay in control',
    description: 'Nothing is signed off without a professional.',
    iconType: 'user-check',
  },
]

/**
 * Optional figures strip configuration
 * Each value defaults strictly to null.
 * Figures render only if their value is not null.
 */
export const IMPACT_FIGURES_CONFIG = [
  {
    id: 'turnaround-time',
    label: 'Preparation turnaround',
    value: null,
    unit: '',
  },
  {
    id: 'verification-rate',
    label: 'Rules evaluated across batch',
    value: null,
    unit: '',
  },
  {
    id: 'audit-readiness',
    label: 'Workpaper sign-off readiness',
    value: null,
    unit: '',
  },
]

export const TIMELINE_DATA = {
  startTime: STORY_TIME_CONFIG.dayStartClock, // 8:00 AM
  without: {
    label: 'Without Endloops',
    subline: `Manual checking until ${MANUAL_END_CLOCK} · 45 minutes before review`,
  },
  with: {
    label: 'With Endloops',
    prepSegment: `Automated prep (${STORY_TIME_CONFIG.endloopsPrepMinutes}m)`,
    reviewSegment: 'Your review and judgement',
    signedAt: `Signed off ${SIGN_OFF_CLOCK}`,
  },
  footnote: STORY_TIME_CONFIG.illustrativeScenarioLabel,
}
