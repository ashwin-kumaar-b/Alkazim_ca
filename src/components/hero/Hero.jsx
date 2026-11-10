import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { HeroVisual } from './HeroVisual'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSmoothScroll } from '../../context/SmoothScrollContext'

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const smoothScroll = useSmoothScroll()

  const scrollToStory = (e) => {
    e.preventDefault()
    if (smoothScroll?.scrollToTarget) {
      smoothScroll.scrollToTarget('#chapter-1')
    } else {
      document.getElementById('chapter-1')?.scrollIntoView({ behavior: 'auto' })
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-12 pb-8 sm:pt-16 sm:pb-12 bg-white overflow-hidden">
      <Container size="xl" className="my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Context Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-calm-teal border border-teal-100 text-xs text-teal-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              <span>Spun out of Alkazim · Dubai, UAE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-display font-display text-navy tracking-tight">
              The prep work, done.
              <br />
              <span className="text-teal">The sign-off, yours.</span>
            </h1>

            {/* Subhead */}
            <p className="text-body-lg sm:text-h3 text-navy-400 font-normal max-w-2xl leading-relaxed">
              Endloops automates the repetitive work of accounting, audit and property finance, so your team spends its time on judgement, not data entry.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button as={Link} to="/contact" variant="primary" size="lg">
                Request a demo
              </Button>
              <Button
                as="a"
                href="#chapter-1"
                onClick={scrollToStory}
                variant="secondary"
                size="lg"
              >
                Follow a day with Endloops
              </Button>
            </div>

            {/* Core Capability Tag Row */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-2.5 text-caption text-navy-600 font-mono">
              <span>Reads documents</span>
              <span className="text-navy-300">·</span>
              <span>Matches against ledgers</span>
              <span className="text-navy-300">·</span>
              <span>Flags what's wrong</span>
              <span className="text-navy-300">·</span>
              <span>Drafts for your review</span>
            </div>
          </div>

          {/* Right Column: Looping Invoice Card Visual */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <HeroVisual />
          </div>
        </div>
      </Container>

      {/* Subtle Scroll Cue at the Bottom */}
      <div className="w-full pt-8 pb-2 text-center">
        <a
          href="#chapter-1"
          onClick={scrollToStory}
          className="inline-flex flex-col items-center gap-1.5 text-navy-400 hover:text-teal transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-pill p-1"
          aria-label="Scroll to Chapter 1"
        >
          <span className="text-caption font-mono uppercase tracking-widest text-navy-300 group-hover:text-teal transition-colors">
            Scroll to follow a day with Endloops
          </span>
          <motion.div
            animate={shouldReduceMotion ? false : { y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <svg
              className="w-4 h-4 text-navy-300 group-hover:text-teal transition-colors"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        </a>
      </div>
    </section>
  )
}

export default Hero
