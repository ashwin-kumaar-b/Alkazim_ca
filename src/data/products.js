/**
 * Endloops Product Catalog
 * Finance-specific data matching Alkazim / GCC audit firm operations.
 */

export const solutions = [
  {
    id: 'budget-review',
    title: 'Budget Review',
    status: 'In Production',
    category: 'End-to-End Solution',
    summary:
      'Orchestrates complete organizational budget reviews across departments, comparing proposed expenses against historical ledger actuals.',
    features: [
      'Automated historical variance analysis (YoY / QoQ)',
      'Departmental cap enforcement and threshold alarms',
      'Consolidated board-level budget approval packs',
      'Audit log of adjustments with managerial rationale',
    ],
    targetUser: 'CFOs, Finance Directors, and Audit Committees',
    timeSaved: 'Reduces quarterly review cycles by 65%',
  },
  {
    id: 'escrow-audit',
    title: 'Escrow Audit',
    status: 'In Production',
    category: 'End-to-End Solution',
    summary:
      'Purpose-built for GCC property escrow regulations (such as Dubai RERA). Validates trust account payouts against engineer completion certificates.',
    features: [
      'Direct verification of contractor payment certificates',
      'Trust account bank statement cross-matching',
      'Statutory compliance checklist generation',
      'Instant audit pack export for regulatory authorities',
    ],
    targetUser: 'Approved Escrow Auditors & Property Developers',
    timeSaved: 'Cut disbursement audit time from days to hours',
  },
  {
    id: 'financial-audit',
    title: 'Financial Audit',
    status: 'In Production',
    category: 'End-to-End Solution',
    summary:
      'Complete substantive testing suite that guides audit engagements from trial balance ingestion through to lead schedule finalization.',
    features: [
      'Automated sample selection based on materiality benchmarks',
      'Lead schedule generation linked to working paper references',
      'Analytical procedure worksheets with anomaly flags',
      'Senior partner review workflow and digital sign-off',
    ],
    targetUser: 'External Audit Firms & Chartered Accountants',
    timeSaved: 'Automates up to 70% of routine vouching schedules',
  },
  {
    id: 'interim-audit',
    title: 'Interim Audit',
    status: 'In Production',
    category: 'End-to-End Solution',
    summary:
      'Accelerated mid-year testing engine that assesses internal control effectiveness, tests balance sheet accruals, and highlights emerging risks.',
    features: [
      'Rapid balance sheet movement tracking',
      'Accruals and prepaid expense amortization verification',
      'Control testing worksheets with documented evidence',
      'Early warning summary for year-end audit planning',
    ],
    targetUser: 'Audit Teams and Corporate Controllers',
    timeSaved: 'Slices interim field testing time in half',
  },
  {
    id: 'property-budget-prep',
    title: 'Budget Preparation for Property Management',
    status: 'In Development',
    category: 'End-to-End Solution',
    summary:
      'Tailored for GCC property managers and Owners Association management companies to assemble legally compliant annual service charge budgets.',
    features: [
      'Service charge modeling based on square footage & unit types',
      'Reserve fund study integration and future CapEx forecasting',
      'Utility consumption indexation (DEWA/Chiller rates)',
      'RERA budget submission templates ready for filing',
    ],
    targetUser: 'Property Management Companies & HOA Boards',
    timeSaved: 'Standardizes complex property portfolio budgets',
  },
]

export const standaloneTools = [
  {
    id: 'po-extraction',
    title: 'Purchase-Order Extraction',
    status: 'In Production',
    category: 'Standalone Tool',
    summary:
      'Extracts supplier details, itemized quantities, delivery milestones, and tax terms from PDF and scanned purchase orders with zero data entry.',
    capability: 'Ingestion & Structured Parsing',
    inputFormats: 'PDFs, Scans, Multi-page Tenders, TIFF',
    demoType: 'po-extractor',
  },
  {
    id: 'vouching-automation',
    title: 'Vouching Automation',
    status: 'In Production',
    category: 'Standalone Tool',
    summary:
      'Automatically matches payment vouchers with underlying supplier tax invoices, goods received notes (GRN), and delivery slips.',
    capability: 'Substantive Audit Testing',
    inputFormats: 'Voucher Batches, ERP Ledgers, Invoices',
    demoType: 'vouching',
  },
  {
    id: 'expense-working',
    title: 'Expense Working Automation',
    status: 'In Production',
    category: 'Standalone Tool',
    summary:
      'Scans employee receipts, corporate card statements, and operational expenses to verify VAT tax validity and produce balanced GL journal batches.',
    capability: 'Tax Compliance & Ledger Posting',
    inputFormats: 'Receipt Images, PDF Invoices, Bank Feeds',
    demoType: 'expense',
  },
  {
    id: 'financial-report-review',
    title: 'Financial Report Review',
    status: 'In Development',
    category: 'Standalone Tool',
    summary:
      'Analyzes draft financial statements to catch cross-statement arithmetic mismatches, footnote numbering misalignments, and rounding variances.',
    capability: 'Consistency & Quality Assurance',
    inputFormats: 'Draft Balance Sheets, P&L, Cash Flow',
    demoType: 'report-review',
  },
  {
    id: 'tender-verification',
    title: 'Tender Verification',
    status: 'In Production',
    category: 'Standalone Tool',
    summary:
      'Compares subcontractor BOQ (Bill of Quantities) bids line-by-line, highlighting arithmetic discrepancies, rate outliers, and front-loading tactics.',
    capability: 'Bid Analysis & CapEx Control',
    inputFormats: 'Excel BOQs, Tender Submission Schedules',
    demoType: 'tender',
  },
  {
    id: 'reconciliation',
    title: 'Reconciliation',
    status: 'In Production',
    category: 'Standalone Tool',
    summary:
      'Executes multi-tier reconciliations between bank records, customer sub-ledgers, vendor statements, and general ledger control accounts.',
    capability: 'GL & Sub-ledger Cross Matching',
    inputFormats: 'Bank MT940 / CSV, ERP General Ledgers',
    demoType: 'reconciliation',
  },
]
