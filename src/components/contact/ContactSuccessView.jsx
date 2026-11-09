import React from 'react'
import { Badge } from '../ui/Badge'

export function ContactSuccessView({ formData, onReset }) {
  return (
    <div className="bg-white rounded-2xl border border-surface-border p-8 shadow-card text-center max-w-lg mx-auto">
      <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center mx-auto mb-4 text-brand-green-dark">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <Badge variant="green" size="sm" className="mb-2">
        Demo Request Received
      </Badge>
      <h3 className="text-xl font-bold font-display text-brand-navy">
        Thank you, {formData.name}
      </h3>
      <p className="text-sm text-brand-navy-light mt-2 leading-relaxed">
        An Endloops engineering specialist from our Dubai team will review your practice requirements and contact you at <span className="font-semibold text-brand-navy">{formData.email}</span> within 1 business day.
      </p>
      <div className="mt-6 p-4 rounded-xl bg-surface-subtle border border-surface-border text-left text-xs font-mono">
        <div className="text-brand-navy-muted uppercase text-[10px] mb-1 font-sans font-semibold">
          Request Reference
        </div>
        <div className="text-brand-navy font-semibold">REF-DXB-2024-DEMO</div>
        <div className="text-brand-navy-light text-[11px] mt-1">
          Focus: {formData.interest} • {formData.volume}
        </div>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-xs text-brand-teal font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded"
      >
        Submit another inquiry
      </button>
    </div>
  )
}
