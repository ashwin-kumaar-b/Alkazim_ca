/**
 * Chapter 3: Single Example Path & Step Data
 * 
 * Defined once for easy tweaking:
 * - Single invoice duplicate (Al-Bahar Logistics LLC)
 * - Three step cards ("Read", "Match to the ledger", "Check against your rules")
 * - Hand-drawn SVG pen path strictly living in the 40px lane below the step cards:
 *   [scribble under step 1] -> [low wave to step 2] -> [scribble under step 2] -> [low wave to step 3] -> [scribble under step 3 (amber)]
 */

export const INVOICE_DATA = {
  id: 'INV-2024-0941',
  docType: 'Tax Invoice',
  vendor: 'Al-Bahar Logistics LLC',
  date: '29-Oct-2024',
  amount: 'AED 14,500.00',
  ref: 'PO #4410',
  glMatch: '6110-04 Freight, matched',
  duplicateReason: 'Same PO, same delivery date: billed twice.',
}

export const STEP_CARDS = [
  {
    id: 'step-1',
    number: '1',
    title: 'Read',
    popContent: 'Supplier, amount, and date extracted',
  },
  {
    id: 'step-2',
    number: '2',
    title: 'Match to the ledger',
    popContent: '6110-04 Freight, matched',
  },
  {
    id: 'step-3',
    number: '3',
    title: 'Check against your rules',
    popContent: 'Same PO, same delivery date: billed twice.',
  },
]

// ─── Desktop SVG Lane Paths (ViewBox: 0 0 600 40) ──────────────────────────
// Stays strictly in the 40px lane underneath the step cards.
// Never touches or covers any text, card content or invoice amount.

// Start point: x=28, y=20 (under Step 1 card)
export const PEN_START_POINT = { x: 28, y: 20 }

// Segment 1: Hand-drawn loose scribble zigzag under Step 1
export const SCRIBBLE_1 =
  'M 28,20 ' +
  'Q 44,15 60,23 ' +
  'Q 78,16 96,22 ' +
  'Q 114,15 132,23 ' +
  'Q 148,17 162,21'

// Low wave across the gap from Step 1 to Step 2
export const WAVE_1_2 =
  'C 176,25 192,32 208,30 ' +
  'C 216,28 222,23 228,20'

// Segment 2: Hand-drawn loose scribble zigzag under Step 2
export const SCRIBBLE_2 =
  'C 246,15 264,23 282,16 ' +
  'C 300,22 318,15 336,23 ' +
  'C 352,17 365,22 376,20'

// Low wave across the gap from Step 2 to Step 3
export const WAVE_2_3 =
  'C 390,25 404,32 418,30 ' +
  'C 426,28 430,23 434,20'

// Segment 3: Hand-drawn loose scribble zigzag under Step 3 (Amber!)
export const SCRIBBLE_3 =
  'M 434,20 ' +
  'C 452,15 470,23 488,16 ' +
  'C 506,22 524,15 542,23 ' +
  'C 556,17 568,22 576,20'

// Combined Teal Path (Scribble 1 + Wave 1-2 + Scribble 2 + Wave 2-3)
export const TEAL_PATH = `${SCRIBBLE_1} ${WAVE_1_2} ${SCRIBBLE_2} ${WAVE_2_3}`

// Amber Path (Scribble 3)
export const AMBER_PATH = SCRIBBLE_3

// ─── Mobile Stacked Scribble Paths (ViewBox: 0 0 240 24) ────────────────────
export const MOBILE_SCRIBBLE =
  'M 12,12 Q 35,7 60,16 Q 85,8 110,15 Q 135,7 160,16 Q 185,8 210,14 Q 224,9 232,12'
