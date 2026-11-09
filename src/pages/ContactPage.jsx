import React from 'react'
import { ContactForm } from '../components/contact/ContactForm'
import { Badge } from '../components/ui/Badge'

export function ContactPage() {
  return (
    <div className="py-12 lg:py-20 bg-surface-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Practice Consultation info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="teal" size="sm">
              Direct Practice Inquiries
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-brand-navy tracking-tight">
              Let's discuss how Endloops fits your firm.
            </h1>
            <p className="text-sm sm:text-base text-brand-navy-light leading-relaxed">
              Whether you are an external audit practice looking to automate vouching, an internal finance team preparing quarterly budgets, or a property management firm handling escrow disbursements, our team is ready to walk you through our tools.
            </p>

            <div className="space-y-4 pt-4 border-t border-surface-border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-surface-border flex items-center justify-center text-brand-teal flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-navy">
                    Dubai Operations
                  </h2>
                  <p className="text-xs text-brand-navy-light mt-0.5">
                    Alkazim Technology Division / Endloops Technologies<br />
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-surface-border flex items-center justify-center text-brand-teal flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-navy">
                    Technical & Partner Inquiries
                  </h2>
                  <p className="text-xs text-brand-navy-light mt-0.5">
                    partner-inquiries@endloops.ae<br />
                    Response window: Under 24 hours (GST)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-surface-border flex items-center justify-center text-brand-green flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-navy">
                    Data Security & NDA
                  </h2>
                  <p className="text-xs text-brand-navy-light mt-0.5">
                    We treat all practice consultations with strict client confidentiality and standard non-disclosure terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form with Validation (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
