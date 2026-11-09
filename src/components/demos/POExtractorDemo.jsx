import React, { useState } from 'react'
import { sampleInvoices } from '../../data/sampleInvoices'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export function POExtractorDemo() {
  const [selectedInv, setSelectedInv] = useState(sampleInvoices[0])
  const [signedOff, setSignedOff] = useState(false)

  const handleSelect = (inv) => {
    setSelectedInv(inv)
    setSignedOff(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-surface-border shadow-card p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-surface-border gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-teal" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-navy">
              Interactive Demo: Purchase-Order & Tax Invoice Extractor
            </span>
          </div>
          <p className="text-xs text-brand-navy-light mt-0.5">
            Select a real-world GCC vendor invoice to test automatic extraction and audit rule checking.
          </p>
        </div>
        <Badge variant={selectedInv.status === 'Matched' ? 'green' : 'amber'} size="sm">
          {selectedInv.status}
        </Badge>
      </div>

      {/* Invoice Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
        {sampleInvoices.map((inv) => (
          <button
            key={inv.id}
            type="button"
            onClick={() => handleSelect(inv)}
            className={`p-3 rounded-xl border text-left transition-all focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
              selectedInv.id === inv.id
                ? 'border-brand-teal bg-brand-teal-light/30 shadow-subtle'
                : 'border-surface-border bg-surface-subtle hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-brand-navy-muted">
              <span>{inv.invNumber}</span>
              <span className={inv.status === 'Matched' ? 'text-brand-green-dark' : 'text-amber-800'}>
                {inv.status}
              </span>
            </div>
            <div className="text-xs font-semibold text-brand-navy mt-1 truncate">{inv.vendor}</div>
            <div className="text-xs font-mono tabular-nums text-brand-teal font-medium mt-0.5">
              AED {inv.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </button>
        ))}
      </div>

      {/* Main Extracted Fields Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Extracted Header & Fields */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-surface-subtle border border-surface-border rounded-xl p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-surface-border pb-2">
              <span className="text-brand-navy-muted uppercase text-[10px] font-sans font-semibold">
                Extracted Metadata
              </span>
              <span className="text-brand-green-dark text-[11px] font-medium">Confidence: 99.4%</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-brand-navy-muted uppercase block font-sans">Vendor</span>
                <span className="text-brand-navy font-semibold">{selectedInv.vendor}</span>
              </div>
              <div>
                <span className="text-[10px] text-brand-navy-muted uppercase block font-sans">TRN / Tax ID</span>
                <span className="text-brand-navy font-medium">{selectedInv.trn}</span>
              </div>
              <div>
                <span className="text-[10px] text-brand-navy-muted uppercase block font-sans">Invoice Date</span>
                <span className="text-brand-navy">{selectedInv.date}</span>
              </div>
              <div>
                <span className="text-[10px] text-brand-navy-muted uppercase block font-sans">Line Description</span>
                <span className="text-brand-navy truncate block">{selectedInv.description}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-surface-border grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-brand-navy-muted block font-sans">Subtotal</span>
                <span className="text-brand-navy tabular-nums font-semibold">
                  AED {selectedInv.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-brand-navy-muted block font-sans">VAT (5%)</span>
                <span className={`tabular-nums font-semibold ${
                  selectedInv.id === 'inv-2' ? 'text-amber-700 bg-amber-100 px-1 rounded' : 'text-brand-navy'
                }`}>
                  AED {selectedInv.vat.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-brand-navy-muted block font-sans">Total Invoiced</span>
                <span className="text-brand-teal font-bold tabular-nums">
                  AED {selectedInv.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Audit Rule Diagnostics */}
          <div className={`p-4 rounded-xl border text-xs ${
            selectedInv.status === 'Matched'
              ? 'bg-brand-green-subtle border-brand-green/30 text-brand-green-dark'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            <div className="font-semibold flex items-center gap-1.5 mb-1 font-sans">
              <span className="text-sm">{selectedInv.status === 'Matched' ? '✓' : '⚠️'}</span>
              <span>Audit Rule Engine Evaluation</span>
            </div>
            <p className="font-mono text-[11px] leading-relaxed">{selectedInv.ruleNotes}</p>
          </div>
        </div>

        {/* Right: Auditor Decision Box */}
        <div className="lg:col-span-5 bg-surface-muted rounded-xl border border-surface-border p-4 sm:p-5 flex flex-col justify-between h-full space-y-4">
          <div>
            <span className="text-xs font-semibold text-brand-navy block font-display">
              Human Sign-Off Step
            </span>
            <p className="text-xs text-brand-navy-light mt-1 leading-relaxed">
              Endloops automates extraction and rule evaluation. You decide whether to approve voucher posting or request partner clarification.
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <Button
              variant={signedOff ? 'accent' : 'primary'}
              size="md"
              className="w-full justify-center"
              onClick={() => setSignedOff(!signedOff)}
            >
              {signedOff ? '✓ Voucher Approved & Posted' : 'Sign Off & Approve Voucher'}
            </Button>
            {selectedInv.status !== 'Matched' && (
              <Button variant="secondary" size="sm" className="w-full justify-center">
                Return to Vendor for Rectification
              </Button>
            )}
          </div>

          <div className="text-[10px] text-brand-navy-muted pt-2 border-t border-surface-border text-center">
            Audit trail immutable ID: <span className="font-mono">TX-2024-DXB-9810</span>
          </div>
        </div>
      </div>
    </div>
  )
}
