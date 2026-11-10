import React from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Standalone Tools', to: '/tools' },
  { label: 'Contact', to: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-calm-subtle border-t border-slate-200 pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-block bg-white px-3 py-2 rounded-lg border border-slate-200 focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none"
              aria-label="Endloops home"
            >
              <img
                src="/endloops-logo.png"
                alt="Endloops"
                width={120}
                height={35}
                loading="lazy"
                decoding="async"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <p className="text-small text-navy-400 max-w-sm leading-relaxed">
              Financial automation for GCC accountants, auditors, and property management companies.
              The software prepares the work. The professional reviews and decides.
            </p>
            <p className="text-label text-navy-400">
              Spun out of Alkazim · Dubai, UAE
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-label text-navy mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-small text-navy-400 hover:text-navy transition-colors focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance & Trust */}
          <div>
            <h3 className="text-label text-navy mb-4">Standards</h3>
            <ul className="space-y-2 text-small text-navy-400">
              <li>Human-in-the-Loop Sign-off</li>
              <li>UAE & GCC Data Residency</li>
              <li>Deterministic Audit Trails</li>
              <li>Zero Hallucination Guarantee</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-caption text-navy-400">
          <p>© {new Date().getFullYear()} Endloops Technologies. All rights reserved.</p>
          <p>Dubai, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
