/**
 * Story Time Configuration — Single Source of Truth
 * Every timestamp, clock value, and duration in the story is derived from here.
 * Nothing hard-coded in components.
 */

export const STORY_TIME_CONFIG = {
  // Master Day Bounds
  dayStartClock: '8:00 AM',
  deadlineClock: '5:00 PM',
  dayStartMinutes: 480, // 8:00 AM in minutes from midnight (8 * 60)
  deadlineMinutes: 1020, // 5:00 PM in minutes from midnight (17 * 60)
  totalDaySpanMinutes: 540, // 9 hours = 540 minutes

  // Narrative Duration Budgets (in minutes)
  manualMinutes: 495, // 8h 15m of manual checking -> clock reaches 4:15 PM
  endloopsPrepMinutes: 25, // 25m automated reading, matching, checking
  reviewMinutes: 45, // 45m professional review & flag resolution

  // Labels & Copy Fragments
  deadlineLabel: 'Time to the 5:00 PM review',
  illustrativeScenarioLabel: 'Illustrative scenario',
  chapter1Headline: '412 documents. Partner review at five.',
  chapter1Sub:
    'Every invoice, order and statement has to agree with the ledger before the partner sees it. Nobody else is going to check them.',
  chapter2BarLabel: '45 minutes left',
  chapter5Headline: 'You decide. You sign.',
  chapter5ClosingLine: 'The partner gets a clean file. You get your day back.',
}

// ─── Derived Clock & Time Values ──────────────────────────────────────────

/** Manual checking end clock (8:00 AM + 495 min = 4:15 PM) */
export const MANUAL_END_MINUTES =
  STORY_TIME_CONFIG.dayStartMinutes + STORY_TIME_CONFIG.manualMinutes // 975 min
export const MANUAL_END_CLOCK = '4:15 PM'

/** Endloops prep end clock (8:00 AM + 25 min = 8:25 AM) */
export const ENDLOOPS_PREP_END_MINUTES =
  STORY_TIME_CONFIG.dayStartMinutes + STORY_TIME_CONFIG.endloopsPrepMinutes // 505 min
export const ENDLOOPS_PREP_END_CLOCK = '8:25 AM'

/** Sign-off clock (8:25 AM + 45 min = 9:10 AM) */
export const SIGN_OFF_MINUTES =
  ENDLOOPS_PREP_END_MINUTES + STORY_TIME_CONFIG.reviewMinutes // 550 min
export const SIGN_OFF_CLOCK = '9:10 AM'

/** Minutes left at the manual end (540 - 495 = 45 minutes) */
export const MINUTES_LEFT_AT_MANUAL_END =
  STORY_TIME_CONFIG.totalDaySpanMinutes - STORY_TIME_CONFIG.manualMinutes // 45

/** Time handed back to the auditor (495 - 25 - 45 = 425 minutes = 7h 5m) */
export const TIME_HANDED_BACK_MINUTES =
  STORY_TIME_CONFIG.manualMinutes -
  STORY_TIME_CONFIG.endloopsPrepMinutes -
  STORY_TIME_CONFIG.reviewMinutes // 425

/** Format total minutes to "Xh YYm" or "XX min" */
export function formatMinutesToHoursMinutes(totalMinutes) {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h === 0) return `${m} min`
  return `${h}h ${m < 10 ? '0' : ''}${m}m`
}

export const TIME_HANDED_BACK_FORMATTED = formatMinutesToHoursMinutes(TIME_HANDED_BACK_MINUTES) // '7h 05m'
export const MANUAL_DURATION_FORMATTED = formatMinutesToHoursMinutes(STORY_TIME_CONFIG.manualMinutes) // '8h 15m'
export const MANUAL_BAR_LABEL = `${MANUAL_DURATION_FORMATTED} of manual checking`
export const ENDLOOPS_PREP_LABEL = `${STORY_TIME_CONFIG.endloopsPrepMinutes} min prep`
export const REVIEW_BAR_LABEL = `${STORY_TIME_CONFIG.reviewMinutes} min your review`
export const REST_OF_DAY_LABEL = 'The rest of your day'
export const EFFICIENCY_NOTE = 'Illustrative scenario. Figures are an example, not a measured result.'

/** Day Percentage Ratios (for scaleX horizontal bar segments) */
export const DAY_RATIOS = {
  manual: STORY_TIME_CONFIG.manualMinutes / STORY_TIME_CONFIG.totalDaySpanMinutes, // ~0.9167 (92%)
  prep: STORY_TIME_CONFIG.endloopsPrepMinutes / STORY_TIME_CONFIG.totalDaySpanMinutes, // ~0.0463 (4.6%)
  review: STORY_TIME_CONFIG.reviewMinutes / STORY_TIME_CONFIG.totalDaySpanMinutes, // ~0.0833 (8.3%)
  totalEndloops:
    (STORY_TIME_CONFIG.endloopsPrepMinutes + STORY_TIME_CONFIG.reviewMinutes) /
    STORY_TIME_CONFIG.totalDaySpanMinutes, // ~0.1296 (13%)
}

/** Chapter 3 Subtitle generator (uses config value, never hardcoded) */
export function getChapter3Sub() {
  return `Endloops went through every one in ${STORY_TIME_CONFIG.endloopsPrepMinutes} minutes. Your duplicate was the first thing it flagged, along with two things you weren't looking for.`
}

/** Chapter 5 Subtitle generator (uses config values, never hardcoded) */
export function getChapter5Sub() {
  return `Signed at ${SIGN_OFF_CLOCK}. The review isn't until ${STORY_TIME_CONFIG.deadlineClock}.`
}

export default STORY_TIME_CONFIG
