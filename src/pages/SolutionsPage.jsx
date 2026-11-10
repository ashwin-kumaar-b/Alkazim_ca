import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Section } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { solutionsProducts } from '../data/solutionsData'

export function SolutionsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <Section spacing="sm" className="bg-calm-teal border-b border-teal-100">
        <Container size="lg" className="text-center space-y-3">
          <span className="text-label text-teal">End-to-End Products</span>
          <h1 className="text-display font-display text-navy tracking-tight">
            End-to-End Solutions
          </h1>
          <p className="text-body-lg text-navy-400 max-w-2xl mx-auto">
            Complete software that runs an entire financial service from start to finish.
            The software prepares the work; the professional reviews and decides.
          </p>
        </Container>
      </Section>

      {/* Solutions Product Sections */}
      <Container size="xl" className="py-16 sm:py-24 space-y-12 sm:space-y-16">
        {solutionsProducts.map((product, idx) => (
          <section
            key={product.id}
            id={product.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-card space-y-6"
          >
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-semibold text-teal">
                    Solution 0{idx + 1}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                      product.status === 'Live'
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <h2 className="text-h2 font-display text-navy tracking-tight">
                  {product.title}
                </h2>
                <p className="text-small text-navy-400 mt-1">{product.tagline}</p>
              </div>

              <Button as={Link} to="/contact" variant="secondary" size="sm">
                Request Walkthrough
              </Button>
            </div>

            {/* Two Side-by-Side Panels: "What Endloops handles" vs "What you review" */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: What Endloops Handles */}
              <div className="bg-calm-teal/50 rounded-xl border border-teal-100 p-5 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-teal-100/80">
                  <span className="w-2 h-2 rounded-full bg-teal" />
                  <h3 className="text-small font-bold uppercase tracking-wider text-teal-800 font-mono">
                    What Endloops Handles
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs text-navy-600">
                  {product.handles.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal font-bold shrink-0 mt-0.5">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: What You Review */}
              <div className="bg-calm-subtle rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80">
                  <span className="w-2 h-2 rounded-full bg-navy" />
                  <h3 className="text-small font-bold uppercase tracking-wider text-navy font-mono">
                    What You Review
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs text-navy-600">
                  {product.reviews.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-navy font-bold shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-calm-teal border border-teal-200 text-center space-y-4">
          <h2 className="text-h2 font-display text-navy">
            Need a tailored workflow for your practice methodology?
          </h2>
          <p className="text-small text-navy-400 max-w-xl mx-auto">
            Our Dubai engineering team works with regional partners to configure custom substantive testing and working paper templates.
          </p>
          <div className="pt-2">
            <Button as={Link} to="/contact" variant="primary" size="lg">
              Speak with our Technical Team
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SolutionsPage
