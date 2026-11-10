import React from 'react'

export function ContactDetails() {
  return (
    <div className="space-y-6 text-left">
      <h2 className="text-h2 font-display text-navy tracking-tight">
        Let's talk about your firm's day.
      </h2>
      <p className="text-body text-navy-400 leading-relaxed">
        We operate with strict client confidentiality and NDA governance. We can walk you through live tool configurations tailored to your specific chart of accounts or working paper formats.
      </p>

      <div className="p-5 rounded-2xl bg-calm-subtle border border-slate-200 space-y-4 text-xs font-mono">
        <div>
          <span className="text-navy-400 block text-[10px] uppercase">Dubai Operations</span>
          <span className="text-navy font-semibold">Alkazim Technology Division / Endloops</span>
          <p className="text-navy-400 font-sans mt-0.5">Dubai, United Arab Emirates</p>
        </div>
        <div className="pt-3 border-t border-slate-200">
          <span className="text-navy-400 block text-[10px] uppercase">Response Window</span>
          <span className="text-teal font-semibold font-sans">Under 24 hours (GST)</span>
        </div>
        <div className="pt-3 border-t border-slate-200">
          <span className="text-navy-400 block text-[10px] uppercase">Data Governance</span>
          <span className="text-navy font-sans">UAE Data Residency · Deterministic audit trails</span>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails
