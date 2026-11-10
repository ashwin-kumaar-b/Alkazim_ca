import { useState, useCallback } from 'react'

/**
 * useStoryResolution
 * Shared state between Chapter 4 (Flag Resolution) and Chapter 5 (Sign-off).
 * Concise audit exception data and reliable Approve / Reject handling.
 */
export const INITIAL_FLAGS = [
  {
    id: 'flag-dup',
    type: 'duplicate',
    title: 'Duplicate Submission',
    badge: 'Duplicate',
    docId: 'INV-2024-0941',
    vendor: 'Al-Bahar Logistics LLC',
    amount: 'AED 14,500.00',
    date: '29-Oct-2024',
    ref: 'PO #4410',
    issue: 'Already paid in Batch #402. Reject to prevent double settlement.',
    recommendedAction: 'rejected',
    resolution: null,
  },
  {
    id: 'flag-mismatch',
    type: 'mismatch',
    title: 'Mismatched Total',
    badge: 'Total Mismatch',
    docId: 'INV-2024-0940',
    vendor: 'Gulf Contracting PJSC',
    amount: 'AED 84,200.00',
    date: '28-Oct-2024',
    ref: 'PO #8820',
    issue: 'Invoice is AED 84,200 vs approved PO of AED 82,400 (AED 1,800 variance).',
    recommendedAction: 'rejected',
    resolution: null,
  },
  {
    id: 'flag-missing',
    type: 'missing',
    title: 'Missing Delivery Receipt',
    badge: 'Missing Note',
    docId: 'PO-4410',
    vendor: 'Al-Bahar Logistics LLC',
    amount: 'AED 14,500.00',
    date: '29-Oct-2024',
    ref: 'Shipment 402',
    issue: 'Goods receipt note (GRN #882) is missing from the voucher packet.',
    recommendedAction: 'approved',
    resolution: null,
  },
]

export function useStoryResolution() {
  const [flags, setFlags] = useState(INITIAL_FLAGS)
  const [announcement, setAnnouncement] = useState('3 audit exceptions awaiting your judgement.')
  const [isSigned, setIsSigned] = useState(false)

  const resolveFlag = useCallback((id, action) => {
    // Normalize action: 'approved' | 'rejected' | null
    const normalized =
      action === 'approved' || action === 'accepted' || action === 'accept'
        ? 'approved'
        : action === 'rejected' || action === 'reject'
        ? 'rejected'
        : null

    setFlags((prev) => {
      const next = prev.map((f) => (f.id === id ? { ...f, resolution: normalized } : f))
      const resolved = next.filter((f) => f.resolution !== null).length
      const targetFlag = next.find((f) => f.id === id)
      const actionLabel = normalized === 'approved' ? 'Approved' : normalized === 'rejected' ? 'Rejected' : 'Reset'
      setAnnouncement(`${targetFlag?.title} marked as ${actionLabel}. ${resolved} of 3 resolved.`)
      return next
    })
  }, [])

  const resetFlags = useCallback(() => {
    setFlags(INITIAL_FLAGS)
    setIsSigned(false)
    setAnnouncement('Draft exceptions reset. 0 of 3 resolved.')
  }, [])

  const resolveAll = useCallback(() => {
    setFlags((prev) =>
      prev.map((f) => ({
        ...f,
        resolution: f.recommendedAction || 'rejected',
      }))
    )
    setAnnouncement('All 3 exceptions resolved for demonstration. Ready for sign-off.')
  }, [])

  const resolvedCount = flags.filter((f) => f.resolution !== null).length
  const allResolved = resolvedCount === 3

  return {
    flags,
    resolveFlag,
    resetFlags,
    resolveAll,
    resolvedCount,
    allResolved,
    announcement,
    isSigned,
    setIsSigned,
  }
}

export default useStoryResolution
