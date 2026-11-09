import React from 'react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-surface-subtle border-t border-surface-border text-brand-navy-light pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-surface-border">
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-block bg-white p-2 rounded-lg border border-surface-border focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
            >
              <img
                src="/endloops-logo.png"
                alt="Endloops"
                width={138}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-brand-navy-light leading-relaxed max-w-sm">
              Automation built for accountants, auditors, and property finance teams across the GCC.
              The software prepares the work, and the professional reviews and decides.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-brand-navy-subtle bg-white px-3 py-1.5 rounded-full border border-surface-border">
                <span className="w-2 h-2 rounded-full bg-brand-green"></span>
                Spun out of Alkazim • Dubai, UAE
              </span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-navy mb-4">
              End-to-End Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/solutions" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Budget Review
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Escrow Audit
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Financial Audit
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Interim Audit
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Property Management Budgeting
                </Link>
              </li>
            </ul>
          </div>

          {/* Standalone Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-navy mb-4">
              Standalone Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/tools" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  PO Extraction
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Vouching Automation
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Expense Working
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Financial Report Review
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Tender Verification
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Ledger Reconciliation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Governance */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-navy mb-4">
              Company & Standards
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  About Endloops
                </Link>
              </li>
              <li>
                <Link to="/about#heritage" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Alkazim Heritage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
                  Request a Demo
                </Link>
              </li>
              <li>
                <span className="text-brand-navy-subtle">GCC & UAE Data Residency</span>
              </li>
              <li>
                <span className="text-brand-navy-subtle">Audit Trail & Traceability</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-navy-subtle">
          <p>© {new Date().getFullYear()} Endloops Technologies. Originally developed at Alkazim. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Confidential Financial Systems</span>
            <span>Human-in-the-Loop Verification</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
