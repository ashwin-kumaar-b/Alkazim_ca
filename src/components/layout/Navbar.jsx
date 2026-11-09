import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Standalone Tools', href: '/tools' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'About', href: '/about' },
  ]

  const isActive = (path) => {
    if (path.startsWith('/#')) return false
    return location.pathname === path
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-surface-border shadow-subtle'
          : 'bg-white border-b border-surface-border/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - As supplied, on white background, explicit width/height, alt="Endloops" */}
          <Link
            to="/"
            className="flex items-center focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded-md p-1"
            aria-label="Endloops Home"
          >
            <img
              src="/endloops-logo.png"
              alt="Endloops"
              width={142}
              height={41}
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                  isActive(link.href)
                    ? 'text-brand-teal font-semibold'
                    : 'text-brand-navy-light hover:text-brand-navy hover:bg-surface-subtle'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact">
              <Button variant="secondary" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="primary" size="sm">
                Request a Demo
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-brand-navy hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-border bg-white px-4 pt-3 pb-6 shadow-card">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`px-3 py-2.5 rounded-md text-base font-medium focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                  isActive(link.href)
                    ? 'bg-brand-teal-light text-brand-teal-dark font-semibold'
                    : 'text-brand-navy hover:bg-surface-subtle'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-surface-border flex flex-col gap-2.5">
              <Link to="/contact" className="w-full">
                <Button variant="secondary" size="md" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
              <Link to="/contact" className="w-full">
                <Button variant="primary" size="md" className="w-full justify-center">
                  Request a Demo
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
