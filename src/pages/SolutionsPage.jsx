import React from 'react'
import { Link } from 'react-router-dom'
import { solutions } from '../data/products'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

export function SolutionsPage() {
  return (
    <div className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Badge variant="teal" size="sm" className="mb-3">
            Product Category 1
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-navy tracking-tight">
            End-to-End Solutions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-navy-light leading-relaxed">
            Complete software suites that run an entire financial engagement or process from start to finish. From raw ingestion to lead schedule drafting and partner sign-off.
          </p>
        </div>

        {/* Detailed Solutions Cards */}
        <div className="space-y-8">
          {solutions.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-surface-border p-6 sm:p-8 lg:p-10 shadow-subtle hover:shadow-card transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left col: Title, summary, target */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-brand-teal">
                      Solution 0{index + 1}
                    </span>
                    <Badge variant={item.status === 'In Production' ? 'green' : 'amber'} size="sm">
                      {item.status}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold font-display text-brand-navy">
                    {item.title}
                  </h2>
                  <p className="text-sm text-brand-navy-light leading-relaxed">
                    {item.summary}
                  </p>
                  <div className="p-3 rounded-xl bg-surface-subtle border border-surface-border text-xs space-y-1">
                    <span className="text-[10px] uppercase font-mono text-brand-navy-muted block">
                      Targeted Practice Profile
                    </span>
                    <span className="font-medium text-brand-navy block">
                      {item.targetUser}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-brand-teal">
                    Impact: {item.timeSaved}
                  </div>
                </div>

                {/* Right col: Features & Sign-off flow */}
                <div className="lg:col-span-7 bg-surface-subtle border border-surface-border rounded-xl p-5 sm:p-6 space-y-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-navy">
                    Automated Process Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className="bg-white p-3 rounded-lg border border-surface-border text-xs text-brand-navy flex items-start gap-2.5"
                      >
                        <span className="text-brand-green font-bold text-sm leading-none">✓</span>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="text-brand-navy-muted">
                      Sign-off Model: <span className="text-brand-navy font-medium">Digital Audit Sign-off</span>
                    </div>
                    <Link to="/contact">
                      <Button variant="primary" size="sm">
                        Request Walkthrough
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-16 p-8 rounded-2xl bg-brand-navy text-white text-center space-y-4">
          <h2 className="text-2xl font-bold font-display">
            Need a custom workflow tailored to your GCC audit methodology?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Our engineering team builds tailored rule engines matching your firm's working paper templates.
          </p>
          <Link to="/contact" className="inline-block pt-2">
            <Button variant="accent" size="lg">
              Speak with Our Audit Engineering Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
