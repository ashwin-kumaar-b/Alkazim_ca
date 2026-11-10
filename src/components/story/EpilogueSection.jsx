import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { SolutionsTimeline } from './SolutionsTimeline'
import { StandaloneToolsGrid } from './StandaloneToolsGrid'
import { aboutCopy } from '../../data/epilogueData'

export function EpilogueSection() {
  const [activeTab, setActiveTab] = useState('solutions')
  const solutionsTabRef = useRef(null)
  const toolsTabRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      if (activeTab === 'solutions') {
        setActiveTab('tools')
        toolsTabRef.current?.focus()
      } else {
        setActiveTab('solutions')
        solutionsTabRef.current?.focus()
      }
    }
  }

  return (
    <section id="epilogue" className="bg-white py-20 sm:py-28">
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <span className="text-label text-teal">Epilogue</span>
          <h2 className="text-h1 font-display text-navy tracking-tight">
            Two ways to meet your month-end.
          </h2>
          <p className="text-body text-navy-400">
            Choose complete software for full financial engagements, or standalone tools for targeted bottlenecks.
          </p>

          {/* Accessible Tab Toggle (Arrow Keys, ARIA Roles) */}
          <div
            role="tablist"
            aria-label="Product categories"
            onKeyDown={handleKeyDown}
            className="pt-4 inline-flex p-1.5 rounded-2xl bg-calm-subtle border border-slate-200"
          >
            <button
              ref={solutionsTabRef}
              id="tab-solutions"
              role="tab"
              type="button"
              aria-selected={activeTab === 'solutions'}
              aria-controls="panel-solutions"
              tabIndex={activeTab === 'solutions' ? 0 : -1}
              onClick={() => setActiveTab('solutions')}
              className={`px-5 py-2.5 rounded-xl text-small font-semibold transition-all min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                activeTab === 'solutions' ? 'bg-white text-navy shadow-card' : 'text-navy-400 hover:text-navy'
              }`}
            >
              End-to-end solutions
            </button>

            <button
              ref={toolsTabRef}
              id="tab-tools"
              role="tab"
              type="button"
              aria-selected={activeTab === 'tools'}
              aria-controls="panel-tools"
              tabIndex={activeTab === 'tools' ? 0 : -1}
              onClick={() => setActiveTab('tools')}
              className={`px-5 py-2.5 rounded-xl text-small font-semibold transition-all min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                activeTab === 'tools' ? 'bg-white text-navy shadow-card' : 'text-navy-400 hover:text-navy'
              }`}
            >
              Standalone tools
            </button>
          </div>
        </div>

        {/* Dynamic Panels */}
        {activeTab === 'solutions' ? <SolutionsTimeline /> : <StandaloneToolsGrid />}

        {/* About Block & Final CTA */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Logo on Light Surface */}
            <div className="inline-block bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
              <img
                src="/endloops-logo.png"
                alt="Endloops"
                width={138}
                height={40}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto object-contain mx-auto"
              />
            </div>

            {/* About Copy */}
            <p className="text-body-lg text-navy-600 max-w-2xl mx-auto leading-relaxed">
              {aboutCopy.about}
            </p>

            {/* Final CTA */}
            <div className="p-8 sm:p-10 rounded-2xl bg-calm-teal border border-teal-200 space-y-4">
              <h3 className="text-h2 font-display text-navy">
                {aboutCopy.ctaHeadline}
              </h3>
              <p className="text-small text-navy-400 max-w-md mx-auto">
                Discover how Endloops automates the repetitive preparation while keeping final sign-off with your team.
              </p>
              <div className="pt-2">
                <Button as={Link} to="/contact" variant="primary" size="lg" className="bg-navy hover:bg-navy-700">
                  {aboutCopy.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default EpilogueSection
