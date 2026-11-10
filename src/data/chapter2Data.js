/**
 * Chapter 2: The Loop — Repeating manual tasks
 */

export const loopItems = [
  {
    id: 'doc-1',
    ref: 'INV-2024-0940',
    vendor: 'Gulf Contracting PJSC',
    action: 'Retyping VAT TRN: 100293847100003',
    amount: 'AED 84,200.00',
    status: 'Checked',
    isDuplicate: false,
  },
  {
    id: 'doc-2',
    ref: 'PO-4410',
    vendor: 'Al-Bahar Logistics LLC',
    action: 'Comparing PO #4410 against GRN #882',
    amount: 'AED 14,500.00',
    status: 'Checked',
    isDuplicate: false,
  },
  {
    id: 'doc-3',
    ref: 'INV-2024-0941',
    vendor: 'Al-Bahar Logistics LLC',
    action: 'Cross-checking PO #4410 delivery note #882',
    amount: 'AED 14,500.00',
    status: 'Pending check',
    isDuplicate: true,
  },
  {
    id: 'doc-4',
    ref: 'DEWA-891',
    vendor: 'Dubai Electricity & Water',
    action: 'Retyping Account #9021 tariff total',
    amount: 'AED 9,340.50',
    status: 'Checked',
    isDuplicate: false,
  },
]
