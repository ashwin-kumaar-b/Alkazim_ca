/**
 * Chapter 3: 3D Cube & Spine Chapter Data
 * All card copy, step details, and live visual metadata defined once.
 */

export const CUBE_CARDS = [
  {
    id: 'card-read',
    stepNumber: '01',
    title: 'Read',
    tag: 'Extracted',
    tagTone: 'teal',
    anchorProgress: 0.24,
    howItWorks:
      'Endloops opens every document and lifts out the figures that matter: supplier, invoice number, date, amount and PO reference. Invoices, purchase orders, contracts and statements, in bulk.',
    invoice: {
      id: 'INV-2024-0941',
      vendor: 'Al-Bahar Logistics LLC',
      date: '29-Oct-2024',
      amount: 'AED 14,500.00',
      poRef: 'PO #4410',
    },
  },
  {
    id: 'card-match',
    stepNumber: '02',
    title: 'Match to the ledger',
    tag: 'Matched',
    tagTone: 'teal',
    anchorProgress: 0.54,
    howItWorks:
      'Each document is compared against your ledger and against its related documents, like the purchase order, so every figure has something to agree with.',
    matchTarget: {
      account: '6110-04 Freight',
      poRef: 'PO #4410',
      amount: 'AED 14,500.00',
    },
  },
  {
    id: 'card-check',
    stepNumber: '03',
    title: 'Check against your rules',
    tag: 'Flagged for you',
    tagTone: 'amber',
    anchorProgress: 0.82,
    howItWorks:
      'Every match is tested against your rules: missing items, mismatched totals, duplicates and anything outside agreed limits.',
    duplicateComparison: {
      docA: { id: 'INV-2024-0940', vendor: 'Gulf Contracting PJSC', po: 'PO #8820', date: '28-Oct-2024', amount: 'AED 84,200.00' },
      docB: { id: 'INV-2024-0941', vendor: 'Al-Bahar Logistics LLC', po: 'PO #4410', date: '29-Oct-2024', amount: 'AED 14,500.00' },
      warning: 'Same PO, same delivery date: billed twice.',
    },
  },
]
