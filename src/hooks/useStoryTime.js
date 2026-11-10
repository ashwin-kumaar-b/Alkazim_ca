import { useState, useEffect, useMemo } from 'react'
import {
  STORY_TIME_CONFIG,
  MANUAL_END_CLOCK,
  ENDLOOPS_PREP_END_CLOCK,
  SIGN_OFF_CLOCK,
  DAY_RATIOS,
} from '../config/storyTimeConfig'

/**
 * useStoryTime
 * Master commented hook driving the central Time Bar and narrative clock.
 * Maps chapter, scroll progress, and flag resolution to horizontal bar segments,
 * clock time, contextual badge labels, and accessible aria descriptions.
 */
export function useStoryTime({
  activeChapter = 0,
  scrollProgress = 0,
  resolution = {},
  shouldReduceMotion = false,
}) {
  const { resolvedCount = 0, isSigned = false } = resolution

  // ─── Chapter-specific parameters ──────────────────────────────────────────
  const timeState = useMemo(() => {
    switch (activeChapter) {
      case 0: // Chapter 1: The inbox (8:00 AM start, manual checking begins)
        return {
          clock: STORY_TIME_CONFIG.dayStartClock,
          clockIndex: 0,
          barLabel: 'Manual checking',
          tone: 'neutral',
          // Fills manual segment from 0 to ~35% of the day
          manualScaleX: shouldReduceMotion ? 0.35 : 0.35,
          prepScaleX: 0,
          reviewScaleX: 0,
          ariaText: `Chapter 1: 8:00 AM. 412 documents queued for manual checking. Time to the 5:00 PM review.`,
        }

      case 1: // Chapter 2: The loop (fatigue, clock reaches 4:15 PM, 45 min left)
        return {
          clock: MANUAL_END_CLOCK,
          clockIndex: 1,
          barLabel: STORY_TIME_CONFIG.chapter2BarLabel, // "45 minutes left"
          tone: 'amber',
          // Manual segment reaches ~92% (495 min / 540 min)
          manualScaleX: DAY_RATIOS.manual,
          prepScaleX: 0,
          reviewScaleX: 0,
          ariaText: `Chapter 2: 4:15 PM. 45 minutes left before the 5:00 PM review. Manual ticking falling behind.`,
        }

      case 2: // Chapter 3: Enter Endloops (loop broke: manual reset, 25m prep fills teal)
        return {
          clock: ENDLOOPS_PREP_END_CLOCK,
          clockIndex: 2,
          barLabel: `Prep: ${STORY_TIME_CONFIG.endloopsPrepMinutes} min`,
          tone: 'teal',
          // Manual segment is empty; prep segment fills to ~4.6% (25 min)
          manualScaleX: 0,
          prepScaleX: DAY_RATIOS.prep,
          reviewScaleX: 0,
          ariaText: `Chapter 3: 8:25 AM. Endloops completes document preparation in 25 minutes. 3 exceptions flagged.`,
        }

      case 3: // Chapter 4: The draft (human review, 45m purple segment grows)
        {
          const reviewFraction = Math.max(0.33, resolvedCount / 3)
          return {
            clock: resolvedCount === 3 ? SIGN_OFF_CLOCK : '8:55 AM',
            clockIndex: resolvedCount === 3 ? 3 : 2,
            barLabel: `Your review: ${STORY_TIME_CONFIG.reviewMinutes} min`,
            tone: 'purple',
            manualScaleX: 0,
            prepScaleX: DAY_RATIOS.prep,
            reviewScaleX: DAY_RATIOS.review * reviewFraction,
            ariaText: `Chapter 4: Your review and judgement. ${resolvedCount} of 3 exceptions resolved. Advancing towards 9:10 AM.`,
          }
        }

      case 4: // Chapter 5: The sign-off (completed at 9:10 AM, hours before 5 PM)
      default:
        return {
          clock: SIGN_OFF_CLOCK,
          clockIndex: 3,
          barLabel: `Signed at ${SIGN_OFF_CLOCK}`,
          tone: 'settled',
          manualScaleX: 0,
          prepScaleX: DAY_RATIOS.prep,
          reviewScaleX: DAY_RATIOS.review,
          ariaText: `Chapter 5: Signed at ${SIGN_OFF_CLOCK}. File sealed clean hours before the 5:00 PM review.`,
        }
    }
  }, [activeChapter, resolvedCount, isSigned, shouldReduceMotion])

  // ─── Screen Reader Polite Live Announcement (updates ONLY on chapter change) ─
  const [liveAriaLabel, setLiveAriaLabel] = useState(timeState.ariaText)

  useEffect(() => {
    setLiveAriaLabel(timeState.ariaText)
  }, [activeChapter, isSigned])

  return {
    ...timeState,
    liveAriaLabel,
    deadlineLabel: STORY_TIME_CONFIG.deadlineLabel,
    illustrativeScenarioLabel: STORY_TIME_CONFIG.illustrativeScenarioLabel,
    dayStartClock: STORY_TIME_CONFIG.dayStartClock,
    deadlineClock: STORY_TIME_CONFIG.deadlineClock,
  }
}

export default useStoryTime
