import React from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '../components/hero/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { SolutionsToolsSwitcher } from '../components/home/SolutionsToolsSwitcher'
import { POExtractorDemo } from '../components/demos/POExtractorDemo'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

export function HomePage() {
  return (
    <div>
      {/* 1. Hero with Document-Pipeline Animation */}
      <Hero />

      {/* 2. Regional Credibility Band */}
      <section className="border-y border-surface-border bg-surface-subtle/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-display text-brand-navy tabular-nums">
                100%
              </div>
              <div className="text-xs text-brand-navy-light mt-0.5">Human Verification</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-display text-brand-teal tabular-nums">
                500+
              </div>
              <div className="text-xs text-brand-navy-light mt-0.5">Pages Analyzed / Min</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-display text-brand-navy tabular-nums">
                11
              </div>
              <div className="text-xs text-brand-navy-light mt-0.5">Specialized Finance Tools</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-display text-brand-green-dark tabular-nums">
                GCC
              </div>
              <div className="text-xs text-brand-navy-light mt-0.5">Audit & Tax Standards</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solutions vs Tools Switcher */}
      <SolutionsToolsSwitcher />

      {/* 4. Scroll-Driven "How It Works" Section */}
      <HowItWorks />

      {/* 5. Live Interactive Demo Showcase */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <Badge variant="teal" size="sm" className="mb-3">
              Interactive Testbench
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-brand-navy tracking-tight">
              Test the extraction engine with realistic GCC vouchers.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-brand-navy-light">
              See how Endloops parses vendor line items, verifies 5% VAT calculations, and flags duplicates before voucher posting.
            </p>
          </div>

          <POExtractorDemo />
        </div>
      </section>

      {/* 6. Philosophy Callout Section */}
      <section className="py-16 bg-surface-subtle border-t border-surface-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="green" size="sm">
            Our Foundation Philosophy
          </Badge>
          <blockquote className="text-2xl sm:text-3xl font-bold font-display text-brand-navy leading-snug">
            "The software prepares the work, and the professional reviews and decides. We take care of the repetitive tasks, and the final sign-off always stays with people."
          </blockquote>
          <p className="text-sm sm:text-base text-brand-navy-light max-w-2xl mx-auto leading-relaxed">
            Financial figures carry statutory liability and real business consequences. That is why Endloops never pretends to replace the auditor. We eliminate the tedious extraction and reconciliation so you can focus on judgment, compliance, and client relationships.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <Button variant="accent" size="lg">
                Schedule a Consultation with our Engineers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
