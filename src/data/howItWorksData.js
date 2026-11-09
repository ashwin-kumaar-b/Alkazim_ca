export const stepsData = [
  {
    id: 'ingest',
    number: '01',
    title: 'Read & Extract Documents',
    subtitle: 'Structured data from complex GCC documents',
    description:
      'Upload hundreds of PDFs, scanned invoices, vendor quotes, or escrow statements. Endloops extracts line-item totals, tax registrations (TRN), and currency codes directly into structured fields.',
    metric: 'Bulk extraction across 500+ pages/min',
    tag: 'OCR & Ingestion',
    preview: {
      badge: 'Extraction Sample',
      filename: 'Contractor_Billing_Q3.pdf',
      items: [
        { label: 'Vendor Name', val: 'Arabian MEP Contracting LLC' },
        { label: 'TRN / VAT ID', val: '100293847200003 (Verified)' },
        { label: 'Total Invoiced', val: 'AED 184,500.00' },
        { label: 'VAT Rate', val: '5.00% (AED 8,785.71)' },
      ],
    },
  },
  {
    id: 'match',
    number: '02',
    title: 'Compare & Match Against Ledgers',
    subtitle: 'Two-way and three-way cross checking',
    description:
      'The engine cross-checks extracted amounts against your ERP general ledger, PO registers, or approved contractor quotes. Discrepancies are flagged before postings occur.',
    metric: '3-way automated matching against PO & GRN',
    tag: 'Reconciliation',
    preview: {
      badge: 'Matching Status',
      filename: 'GL Reconciliation: Account 5200',
      items: [
        { label: 'Purchase Order #', val: 'PO-2024-884 (Matched)' },
        { label: 'Delivery Note', val: 'DN-9921 signed by Site Mgr' },
        { label: 'GL Ledger Amount', val: 'AED 184,500.00' },
        { label: 'Variance', val: 'AED 0.00 (Exact Match)' },
      ],
    },
  },
  {
    id: 'rules',
    number: '03',
    title: 'Check Against Rules & Flag Variances',
    subtitle: 'Duplicate detection & limit compliance',
    description:
      'Instantly surfaces duplicate invoice submissions, tax discrepancies, missing delivery stamps, or line items that exceed authority matrix limits.',
    metric: 'Zero unnoticed duplicate payments',
    tag: 'Audit Rules',
    preview: {
      badge: 'Rule Evaluation',
      filename: 'Audit Rule Engine v4.2',
      items: [
        { label: 'Duplicate Check', val: 'PASS (No prior submission)' },
        { label: 'Approval Limit', val: 'Within AED 200,000 threshold' },
        { label: 'Withholding Tax', val: 'Exempt under UAE CIT Rule 14' },
        { label: 'Risk Rating', val: 'Low Risk — Cleared for Draft' },
      ],
    },
  },
  {
    id: 'draft',
    number: '04',
    title: 'Prepare Draft Schedules for Human Sign-off',
    subtitle: 'Audit papers prepped; you make the decision',
    description:
      'Endloops prepares working papers, vouching schedules, and escrow reports. The software takes care of the repetitive calculations, and the final sign-off always stays with the professional.',
    metric: 'Up to 70% reduction in working paper prep',
    tag: 'Working Papers',
    preview: {
      badge: 'Ready for Review',
      filename: 'Working_Paper_WP-410.xlsx',
      items: [
        { label: 'Schedule Status', val: 'Complete & Cross-referenced' },
        { label: 'Prepared By', val: 'Endloops Automated Engine' },
        { label: 'Reviewed By', val: 'Senior Auditor (Pending Click)' },
        { label: 'Decision', val: 'Approve / Request Adjustment' },
      ],
    },
  },
]
