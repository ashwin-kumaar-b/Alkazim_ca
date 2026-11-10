/**
 * End-to-End Solutions Data
 * Clear distinction between "What Endloops handles" and "What you review"
 */

export const solutionsProducts = [
  {
    id: 'budget-review',
    title: 'Budget review',
    status: 'Live',
    tagline: 'Full organizational budget review and variance modeling',
    handles: [
      'Aggregates multi-department expense requests and historical GL actuals',
      'Automates YoY and QoQ variance calculation across thousands of line items',
      'Applies departmental expenditure caps and threshold alarms',
      'Formats consolidated audit-ready working papers and draft board packs',
    ],
    reviews: [
      'Strategic expenditure requests exceeding established budget tolerances',
      'Discretionary headcount additions and non-recurring CapEx proposals',
      'Managerial justifications and final approval sign-off for board presentation',
    ],
  },
  {
    id: 'escrow-audit',
    title: 'Escrow audit',
    status: 'Live',
    tagline: 'GCC property trust account compliance (RERA compliant)',
    handles: [
      'Parses developer escrow trust account bank statements and MT940 feeds',
      'Extracts engineer completion certificates and contractor payment claims',
      'Validates disbursement requests against approved project milestones',
      'Flags unverified disbursements or out-of-scope subcontractor charges',
    ],
    reviews: [
      'Disbursements where engineering completion differs from payout percentages',
      'Contractor statutory lien waivers and compliance documentation',
      'Certified audit sign-off for statutory real estate regulatory authorities',
    ],
  },
  {
    id: 'financial-audit',
    title: 'Financial audit',
    status: 'Live',
    tagline: 'End-to-end statutory audit management and lead schedule drafting',
    handles: [
      'Ingests full trial balances and maps charts of accounts automatically',
      'Performs substantive sampling based on engagement materiality benchmarks',
      'Matches vouchers, invoices, and delivery notes directly to ledger lines',
      'Populates working lead schedules with immutable source coordinate links',
    ],
    reviews: [
      'Key audit matters (KAMs) and subjective management accounting estimates',
      'Complex revenue recognition adjustments under IFRS 15 / GCC standards',
      'Engagement partner sign-off and final audit opinion formulation',
    ],
  },
  {
    id: 'interim-audit',
    title: 'Interim audit',
    status: 'Live',
    tagline: 'Accelerated mid-year substantive testing and control evaluation',
    handles: [
      'Tracks half-year balance sheet movements and flags anomalous trends',
      'Verifies amortization schedules for prepayments and deferred expenses',
      'Tests routine transaction cycles against documented internal controls',
      'Produces clean interim working paper batches ready for file review',
    ],
    reviews: [
      'Identified internal control exceptions and governance recommendations',
      'Pre-close risk assessment adjustments ahead of the statutory year-end audit',
      'Audit committee interim summary notes and management letters',
    ],
  },
  {
    id: 'property-budget',
    title: 'Budget preparation for property management companies',
    status: 'In development',
    tagline: 'Service charge modeling and reserve fund budgeting for GCC properties',
    handles: [
      'Formulates service charge schedules allocated by unit types and square footage',
      'Models shared utility consumption allocations (DEWA/Chiller tariff rates)',
      'Integrates statutory reserve fund study CapEx replacement schedules',
      'Prepares standardized budget templates matching GCC regulatory submission portals',
    ],
    reviews: [
      'Long-term capital expenditure reserve contributions and contractor rates',
      'Exceptions raised by owners association boards regarding amenity charges',
      'Final annual budget sign-off prior to developer and owner submission',
    ],
  },
]
