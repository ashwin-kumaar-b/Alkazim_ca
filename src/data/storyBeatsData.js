import { RUNWAY_HEIGHTS } from '../config/pacingConfig'
import {
  STORY_TIME_CONFIG,
  MANUAL_END_CLOCK,
  ENDLOOPS_PREP_END_CLOCK,
  SIGN_OFF_CLOCK,
  getChapter3Sub,
  getChapter5Sub,
} from '../config/storyTimeConfig'

/**
 * Story Narrative & Chapter Definitions
 * Second-person auditor scenario: 8:00 AM start, partner review at 5:00 PM, 412 documents.
 */
export const CHAPTERS = [
  {
    id: 'chapter-1',
    chapterNumber: '01',
    title: 'The inbox',
    fullTitle: '1. The inbox',
    time: STORY_TIME_CONFIG.dayStartClock, // 8:00 AM
    badgeTone: 'tense',
    headline: STORY_TIME_CONFIG.chapter1Headline,
    subhead: STORY_TIME_CONFIG.chapter1Sub,
    docsCount: 412,
  },
  {
    id: 'chapter-2',
    chapterNumber: '02',
    title: 'The loop',
    fullTitle: '2. The loop',
    time: MANUAL_END_CLOCK, // 4:15 PM
    barLabel: STORY_TIME_CONFIG.chapter2BarLabel, // 45 minutes left
    badgeTone: 'tense',
    headline: 'By invoice 200, they all look the same.',
    subhead:
      'You retype TRNs, tick off quantities, and check the same totals line by line. Hours into manual ticking, fatigue sets in. Somewhere in the stack, a duplicate slips through.',
    docsCount: 412,
  },
  {
    id: 'chapter-3',
    chapterNumber: '03',
    title: 'Enter Endloops',
    fullTitle: '3. Enter Endloops',
    time: ENDLOOPS_PREP_END_CLOCK, // 8:25 AM
    badgeTone: 'transition',
    headline: 'Same 412 documents. Read, matched, checked.',
    subhead: getChapter3Sub(),
    docsCount: 412,
  },
  {
    id: 'chapter-4',
    chapterNumber: '04',
    title: 'The draft',
    fullTitle: '4. The draft',
    time: `${ENDLOOPS_PREP_END_CLOCK} – ${SIGN_OFF_CLOCK}`,
    badgeTone: 'calm',
    headline: 'A schedule is ready. Three items need your judgement.',
    subhead:
      'The matching is already done. You review the duplicate claim, the flagged variance, and the missing delivery note, make your call, and accept or reject with a click.',
    docsCount: 412,
  },
  {
    id: 'chapter-5',
    chapterNumber: '05',
    title: 'The sign-off',
    fullTitle: '5. The sign-off',
    time: SIGN_OFF_CLOCK, // 9:10 AM
    badgeTone: 'settled',
    headline: STORY_TIME_CONFIG.chapter5Headline,
    subhead: getChapter5Sub(),
    closingLine: STORY_TIME_CONFIG.chapter5ClosingLine,
    docsCount: 412,
  },
]

export const CHAPTER_RUNWAYS = RUNWAY_HEIGHTS

export const chapter1Beats = [
  {
    id: 'c1-b1', number: 1, title: 'First Tax Invoice',
    start: 0.06, transitionEnd: 0.16, holdEnd: 0.28,
    changeDescription: 'Tax invoice INV-0940 arrives from Gulf Contracting PJSC.',
    caption: '8:00 AM — Tax invoice INV-0940 for AED 84,200.00 lands in your queue.',
    docId: 'INV-0940', docType: 'Tax Invoice', vendor: 'Gulf Contracting PJSC',
    ref: 'PO #8820', amount: 'AED 84,200.00', date: '28-Oct-2024', rotation: -3, yTarget: 0,
  },
  {
    id: 'c1-b2', number: 2, title: 'Purchase Order Stack',
    start: 0.28, transitionEnd: 0.42, holdEnd: 0.54,
    changeDescription: 'Purchase order PO-4410 slides in, tilting opposite to overlap the first invoice.',
    caption: 'Purchase Order PO-4410 for AED 14,500.00 stacks onto the queue with shipping notes.',
    docId: 'PO-4410', docType: 'Purchase Order', vendor: 'Al-Bahar Logistics LLC',
    ref: 'Shipment 402', amount: 'AED 14,500.00', date: '29-Oct-2024', rotation: 3.5, yTarget: 22,
  },
  {
    id: 'c1-b3', number: 3, title: 'Commercial Statement',
    start: 0.54, transitionEnd: 0.67, holdEnd: 0.78,
    changeDescription: 'DEWA utility statement arrives with multi-meter tariff breakdown.',
    caption: 'Commercial utility statement for AED 9,340.50 arrives awaiting tariff validation.',
    docId: 'DEWA-891', docType: 'Utility Statement', vendor: 'Dubai Electricity & Water',
    ref: 'Account #9021', amount: 'AED 9,340.50', date: '30-Oct-2024', rotation: -1.5, yTarget: 44,
  },
  {
    id: 'c1-b4', number: 4, title: 'Contract Claim Completes Stack',
    start: 0.78, transitionEnd: 0.86, holdEnd: 0.90,
    changeDescription: 'Contract certificate caps the queue; counter confirms 412 unread documents.',
    caption: 'Subcontract certificate for AED 184,500.00 caps the queue. 412 documents waiting.',
    docId: 'INV-0942', docType: 'Progress Certificate', vendor: 'Arabian MEP Contracting',
    ref: 'Subcontract C-12', amount: 'AED 184,500.00', date: '31-Oct-2024', rotation: 4, yTarget: 66,
  },
]

export const chapter2Beats = [
  {
    id: 'c2-b1', number: 1, title: 'Manual TRN Entry',
    start: 0.07, transitionEnd: 0.22, holdEnd: 0.32,
    changeDescription: 'Retyping 15-digit UAE tax registration numbers line by line.',
    caption: '4:15 PM — Retyping 15-digit TRNs from scanned vouchers into your ERP ledger.',
  },
  {
    id: 'c2-b2', number: 2, title: 'Goods Received Cross-Check',
    start: 0.32, transitionEnd: 0.48, holdEnd: 0.58,
    changeDescription: 'Matching PO quantities against warehouse delivery notes.',
    caption: 'Ticking off line items between purchase orders and delivery notes.',
  },
  {
    id: 'c2-b3', number: 3, title: 'The Unnoticed Duplicate',
    start: 0.52, transitionEnd: 0.68, holdEnd: 0.78,
    changeDescription: 'Duplicate customs invoice for AED 14,500.00 quietly passes into approval queue.',
    caption: 'Hours into manual ticking: duplicate invoice INV-2024-0941 slips through unnoticed.',
  },
  {
    id: 'c2-b4', number: 4, title: 'The Loop Continues',
    start: 0.78, transitionEnd: 0.86, holdEnd: 0.90,
    changeDescription: 'Manual routine cycles continuously while unflagged variances compound.',
    caption: '45 minutes left before the 5:00 PM review. The ticking loop continues.',
  },
]

export const chapter3Beats = [
  {
    id: 'c3-b1', number: 1, title: 'Step 1: Read',
    start: 0.08, transitionEnd: 0.22, holdEnd: 0.32,
    changeDescription: 'Supplier, date, and invoice total are extracted and highlighted in teal.',
    caption: '8:25 AM — Endloops extracts supplier, amount, and date from the duplicate voucher.',
  },
  {
    id: 'c3-b2', number: 2, title: 'Step 2: Match to the ledger',
    start: 0.32, transitionEnd: 0.48, holdEnd: 0.58,
    changeDescription: 'Voucher matches directly against General Ledger Freight account 6110-04.',
    caption: 'Voucher matches against General Ledger line 6110-04 Freight.',
  },
  {
    id: 'c3-b3', number: 3, title: 'Step 3: Check against your rules',
    start: 0.58, transitionEnd: 0.74, holdEnd: 0.82,
    changeDescription: 'Audit rule triggers amber outline: Same PO, same delivery date: billed twice.',
    caption: 'Rule triggered: same PO, same delivery date — billed twice.',
  },
  {
    id: 'c3-b4', number: 4, title: 'The Duplicate Circled',
    start: 0.82, transitionEnd: 0.90, holdEnd: 0.96,
    changeDescription: 'Scribbled circle encloses the amount.',
    caption: '8:25 AM — That’s your duplicate. Isolated in plain sight.',
  },
]

export const chapter5Beats = [
  {
    id: 'c5-b1', number: 1, title: 'Draft Lead Schedule Presented',
    start: 0.06, transitionEnd: 0.24, holdEnd: 0.36,
    changeDescription: 'Working paper WP-410 displays zero remaining variances.',
    caption: '9:10 AM — Clean draft working paper WP-410 is ready with 412 of 412 documents reconciled.',
  },
  {
    id: 'c5-b2', number: 2, title: 'Auditor Sign-off Action',
    start: 0.36, transitionEnd: 0.54, holdEnd: 0.62,
    changeDescription: 'Sign-off button transitions to signed green state with auditor credentials.',
    caption: 'You click "Approve and sign off". The judgement was always yours.',
  },
  {
    id: 'c5-b3', number: 3, title: 'Closing Teal Loop Draws In',
    start: 0.62, transitionEnd: 0.78, holdEnd: 0.90,
    changeDescription: 'Teal curve draws smoothly from start to finish, culminating in an upward arrow.',
    caption: 'Signed at 9:10 AM. File sealed clean hours before the 5:00 PM review.',
  },
]
