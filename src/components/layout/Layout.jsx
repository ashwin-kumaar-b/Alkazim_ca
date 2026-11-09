import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-navy selection:bg-brand-green/20 selection:text-brand-navy">
      {/* Top micro-announcement banner */}
      <aside aria-label="Announcement" className="bg-brand-navy text-white text-xs py-2 px-4 text-center tracking-wide font-medium">
        <span className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
          <span>Spun out of Alkazim (Dubai). Purpose-built automation for GCC financial teams.</span>
        </span>
      </aside>

      <Navbar />
      
      <main id="main-content" className="flex-1 flex flex-col focus:outline-none">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
