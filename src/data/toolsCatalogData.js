/**
 * Tools Catalog Data with category tags
 * Categories: Extraction | Matching | Review
 */

export const TOOL_CATEGORIES = ['All', 'Extraction', 'Matching', 'Review']

export const toolsCatalog = [
  {
    id: 'po-extraction',
    title: 'Purchase-order extraction',
    category: 'Extraction',
    status: 'Live',
    description:
      'Extracts line items, pricing, delivery terms, and tax registration numbers (TRN) from multi-page contractor POs with zero manual data entry.',
    inputs: 'PDFs, Scans, Multi-page Tenders',
    capability: 'Structured OCR & Table Parsing',
  },
  {
    id: 'expense-working',
    title: 'Expense working automation',
    category: 'Extraction',
    status: 'Live',
    description:
      'Scans employee receipts, corporate card statements, and bills to verify 5% UAE VAT compliance and produces balanced journal entry batches.',
    inputs: 'Receipt Images, PDF Invoices, CSV Feeds',
    capability: 'Tax Verification & Batch Formatting',
  },
  {
    id: 'vouching-automation',
    title: 'Vouching automation',
    category: 'Matching',
    status: 'Live',
    description:
      'Three-way matches supplier payment vouchers against underlying tax invoices, goods received notes (GRN), and delivery slips in seconds.',
    inputs: 'Voucher Batches, ERP Ledgers, PDFs',
    capability: 'Three-Way Match Verification',
  },
  {
    id: 'reconciliation',
    title: 'Reconciliation',
    category: 'Matching',
    status: 'Live',
    description:
      'Executes multi-way matching between bank MT940 feeds, sub-ledgers, vendor statements, and general ledger control accounts.',
    inputs: 'Bank MT940 / CSV, ERP Trial Balances',
    capability: 'Automated Exception Flagging',
  },
  {
    id: 'tender-verification',
    title: 'Tender verification',
    category: 'Matching',
    status: 'Live',
    description:
      'Analyzes contractor BOQ bids line-by-line, highlighting mathematical errors, rate outliers, and unbalanced front-loading bid tactics.',
    inputs: 'Excel BOQs, Tender Submissions',
    capability: 'Rate Outlier & Variance Analysis',
  },
  {
    id: 'financial-report-review',
    title: 'Financial report review',
    category: 'Review',
    status: 'In development',
    description:
      'Analyzes draft financial statements to catch cross-statement arithmetic mismatches, note reference errors, and rounding discrepancies.',
    inputs: 'Draft Balance Sheets, P&L, Notes',
    capability: 'Cross-Statement Consistency Check',
  },
]
