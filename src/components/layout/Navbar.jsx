import React, { useState, useEffect, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '../ui/Button'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Tools', to: '/tools' },
  { label: 'Contact', to: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Shrink navbar height slightly when page is scrolled; hide on scroll down inside story
  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const curY = window.scrollY
      setScrolled(curY > 16)

      // Inside story section: hide on scroll down, show on scroll up
      const ch1 = document.getElementById('chapter-1')
      const whatChanges = document.getElementById('what-changes')
      if (ch1 && whatChanges) {
        const ch1Top = ch1.getBoundingClientRect().top
        const wcTop = whatChanges.getBoundingClientRect().top
        const insideStory = ch1Top <= 100 && wcTop > 100
        if (insideStory) {
          if (curY > lastY + 6) {
            setHidden(true)
          } else if (curY < lastY - 6) {
            setHidden(false)
          }
        } else {
          setHidden(false)
        }
      } else {
        setHidden(false)
      }
      lastY = curY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key press
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `text-small font-medium transition-colors duration-150 rounded px-1.5 py-1 focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none ` +
    (isActive ? 'text-teal font-semibold' : 'text-navy-600 hover:text-navy')

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200',
        'transition-all duration-300',
        hidden ? '-translate-y-full pointer-events-none' : 'translate-y-0',
        scrolled ? 'h-14 shadow-xs' : 'h-20',
      ].join(' ')}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-6">
        {/* Logo - exact supplied logo, explicit width/height, alt="Endloops", on white bg */}
        <Link
          to="/"
          className="shrink-0 rounded focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="Endloops home"
        >
          <img
            src="/endloops-logo.png"
            alt="Endloops"
            width={138}
            height={40}
            loading="eager"
            decoding="async"
            className={`w-auto object-contain transition-all duration-200 ${scrolled ? 'h-7' : 'h-9'}`}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === '/'} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block shrink-0">
          <Button as={Link} to="/contact" variant="primary" size={scrolled ? 'sm' : 'md'}>
            Request a demo
          </Button>
        </div>

        {/* Mobile Hamburger Button (min 44x44px tap target) */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-lg text-navy hover:bg-calm-subtle focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none flex items-center justify-center"
        >
          <svg className="w-6 h-6" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Accessible Mobile Menu Dropdown */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1 shadow-card">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-3 rounded-lg text-small font-medium min-h-[44px] flex items-center transition-colors ` +
                (isActive ? 'bg-teal-100 text-teal-700' : 'text-navy-600 hover:bg-calm-subtle hover:text-navy')
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-slate-100">
            <Button
              as={Link}
              to="/contact"
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => setMenuOpen(false)}
            >
              Request a demo
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
