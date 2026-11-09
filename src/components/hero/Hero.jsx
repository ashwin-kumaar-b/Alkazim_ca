import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { HeroAnimation } from './HeroAnimation'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-white via-surface-subtle/50 to-white">
      {/* Background subtle accent circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="teal" size="sm">
                Spun out of Alkazim • Dubai
              </Badge>
              <Badge variant="neutral" size="sm">
                GCC Audit & Accounting Focus
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-navy tracking-tight leading-[1.15]">
              The software prepares the work.{' '}
              <span className="text-brand-teal block sm:inline">
                The professional reviews and decides.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-brand-navy-light leading-relaxed">
              Much of a finance team's day is lost to manual voucher checking, extraction, and draft schedules. 
              Endloops automates repetitive financial tasks from start to finish, while keeping final sign-off with people.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/contact">
                <Button variant="accent" size="lg" className="w-full sm:w-auto shadow-sm">
                  Request a Practice Demo
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  See How It Works
                </Button>
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-4 border-t border-surface-border grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-brand-navy-subtle">
              <div>
                <span className="font-semibold text-brand-navy block text-sm">IFRS & GCC Ready</span>
                <span>Tailored for regional statutory standards</span>
              </div>
              <div>
                <span className="font-semibold text-brand-navy block text-sm">Full Traceability</span>
                <span>Every figure links back to source files</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="font-semibold text-brand-navy block text-sm">Human-in-Loop</span>
                <span>Engine drafts, partner approves</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Document Pipeline Animation */}
          <div className="lg:col-span-6 w-full">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </section>
  )
}
