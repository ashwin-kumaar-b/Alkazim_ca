import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

export function AboutPage() {
  return (
    <div className="py-12 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <Badge variant="teal" size="sm">
            Our Story & Heritage
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-navy tracking-tight">
            Born inside an audit firm. Built for the professionals who carry the liability.
          </h1>
          <p className="text-lg text-brand-navy-light leading-relaxed">
            Alkazim is an established accounting and audit firm based in Dubai. For years, our internal technology department engineered software to automate routine audit routines, voucher extraction, and escrow filings. That department is now Endloops.
          </p>
        </div>

        {/* Philosophy Callout Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-surface-subtle border border-surface-border space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-teal">
            The Core Endloops Philosophy
          </span>
          <blockquote className="text-xl sm:text-2xl font-bold font-display text-brand-navy leading-snug">
            "The software prepares the work, and the professional reviews and decides. We take care of the repetitive tasks, and the final sign-off always stays with people."
          </blockquote>
          <p className="text-sm text-brand-navy-light leading-relaxed">
            Much of a finance professional's day goes into tasks that software can handle. This work is repetitive and time-consuming, leaves room for error, and takes attention away from judgement and from clients. We do not replace financial judgement; we free financial professionals to practice it.
          </p>
        </div>

        {/* Why Trust Matters: 3 Pillars */}
        <div className="space-y-6" id="heritage">
          <h2 className="text-2xl font-bold font-display text-brand-navy">
            Why GCC Practices Trust Endloops
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-surface-border bg-white shadow-subtle space-y-2">
              <div className="w-9 h-9 rounded-lg bg-brand-green-light text-brand-green-dark flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-brand-navy">100% Traceable Audit Trails</h3>
              <p className="text-xs text-brand-navy-light leading-relaxed">
                Every extracted amount, VAT calculation, and variance links directly back to the source coordinate in the ingested PDF or scanned voucher.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-surface-border bg-white shadow-subtle space-y-2">
              <div className="w-9 h-9 rounded-lg bg-brand-teal-light text-brand-teal-dark flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-brand-navy">GCC Statutory Nuance</h3>
              <p className="text-xs text-brand-navy-light leading-relaxed">
                Native handling of UAE VAT 5% rules, UAE Corporate Tax filings, Dubai RERA escrow disbursement protocols, and regional bank formats.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-surface-border bg-white shadow-subtle space-y-2">
              <div className="w-9 h-9 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-brand-navy">Zero Hallucination</h3>
              <p className="text-xs text-brand-navy-light leading-relaxed">
                Deterministic calculation engines with verified mathematical cross-checks ensure working papers balance to the exact fils.
              </p>
            </div>
          </div>
        </div>

        {/* Where We Are Heading */}
        <div className="p-8 rounded-2xl bg-white border border-surface-border shadow-subtle space-y-4">
          <Badge variant="purple" size="sm">
            The Road Ahead
          </Badge>
          <h2 className="text-2xl font-bold font-display text-brand-navy">
            Our Regional Ambition
          </h2>
          <p className="text-sm sm:text-base text-brand-navy-light leading-relaxed">
            Endloops is a young company with a clear ambition: to become the trusted automation partner for accounting, audit and property finance teams in the GCC region and beyond. We are growing our engineering, design and quality capabilities to get there.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <Button variant="primary" size="md">
                Connect with our Team in Dubai
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
