import { useState, useMemo, useCallback } from 'react'
import { initialReconciliationRows } from '../data/reconciliationData'

/**
 * useReconciliationDemo
 * Custom hook containing all state logic for Chapter 4's interactive reconciliation workbench:
 * - Tracks row state and auditor accept/reject decisions
 * - Computes dynamic summary metrics (matched, to review, duplicate)
 * - Manages side panel / bottom sheet selection
 * - Provides live announcements for screen readers (aria-live)
 */
export function useReconciliationDemo() {
  const [rows, setRows] = useState(initialReconciliationRows)
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [announcement, setAnnouncement] = useState('Reconciliation schedule loaded. 6 matched, 2 to review, 1 duplicate.')

  // Lookup for currently inspected row
  const selectedRow = useMemo(
    () => rows.find((r) => r.id === selectedRowId) || null,
    [rows, selectedRowId]
  )

  // Dynamic status counters
  const counts = useMemo(() => {
    let matched = 0
    let toReview = 0
    let duplicate = 0

    rows.forEach((r) => {
      if (r.status === 'matched' || r.resolution === 'accepted') {
        matched++
      } else if (r.status === 'duplicate' && !r.resolution) {
        duplicate++
      } else if (r.status === 'mismatch' && !r.resolution) {
        toReview++
      }
    })

    return { matched, toReview, duplicate }
  }, [rows])

  // Select a row to inspect its audit exception in the side panel / bottom sheet
  const handleSelectRow = useCallback((row) => {
    if (row.status === 'matched' && !row.issueTitle) {
      setAnnouncement(`Row ${row.desc} is already verified and matched to general ledger.`)
      return
    }
    setSelectedRowId(row.id)
    setAnnouncement(`Opened audit exception for ${row.desc}: ${row.issueTitle || 'Review required'}.`)
  }, [])

  // Close inspection panel
  const handleClosePanel = useCallback(() => {
    setSelectedRowId(null)
    setAnnouncement('Closed exception review panel.')
  }, [])

  // Accept decision: approve the proposed adjustment or voucher posting
  const handleAccept = useCallback((id) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, resolution: 'accepted' } : r
      )
    )
    setSelectedRowId(null)
    setAnnouncement(`Accepted adjustment for transaction ${id}. Entry marked resolved.`)
  }, [])

  // Reject decision: disallow duplicate payment or improper tax claim
  const handleReject = useCallback((id) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, resolution: 'rejected' } : r
      )
    )
    setSelectedRowId(null)
    setAnnouncement(`Rejected transaction ${id}. Anomaly documented in working paper.`)
  }, [])

  // Reset demo back to initial draft schedule state
  const handleReset = useCallback(() => {
    setRows(initialReconciliationRows)
    setSelectedRowId(null)
    setAnnouncement('Reconciliation reset to initial draft state: 6 matched, 2 to review, 1 duplicate.')
  }, [])

  return {
    rows,
    selectedRow,
    counts,
    announcement,
    onSelectRow: handleSelectRow,
    onClosePanel: handleClosePanel,
    onAccept: handleAccept,
    onReject: handleReject,
    onReset: handleReset,
  }
}

export default useReconciliationDemo
