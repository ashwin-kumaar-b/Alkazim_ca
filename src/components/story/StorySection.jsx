import React, { useState, useEffect, useRef } from 'react'
import { StoryNav } from './StoryNav'
import { CHAPTERS } from '../../data/storyBeatsData'
import { Chapter1Pile } from './Chapter1Pile'
import { Chapter2Loop } from './Chapter2Loop'
import { TransitionLoopBreak } from './TransitionLoopBreak'
import { Chapter3Pipeline } from './Chapter3Pipeline'
import { Chapter4Draft } from './Chapter4Draft'
import { Chapter5SignOff } from './Chapter5SignOff'
import { ImpactSection } from './ImpactSection'
import { EpilogueSection } from './EpilogueSection'
import { useStoryResolution } from '../../hooks/useStoryResolution'

export function StorySection() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef(null)
  const resolution = useStoryResolution()

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false
            return
          }
          const rect = sectionRef.current.getBoundingClientRect()
          const totalHeight = sectionRef.current.offsetHeight - window.innerHeight
          const currentScroll = Math.max(0, -rect.top)

          if (totalHeight > 0) {
            const progress = Math.min(1, Math.max(0, currentScroll / totalHeight))
            setScrollProgress(progress)
          }

          // Check which chapter is currently in view
          const chapterEls = CHAPTERS.map((ch) => document.getElementById(ch.id))
          const viewportMid = window.innerHeight / 3

          chapterEls.forEach((el, index) => {
            if (!el) return
            const r = el.getBoundingClientRect()
            if (r.top <= viewportMid && r.bottom >= viewportMid) {
              setActiveChapter(index)
            }
          })

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSelectChapter = (index) => {
    setActiveChapter(index)
  }

  return (
    <div ref={sectionRef} className="relative">
      {/* Slim Fixed Progress Line Navigation with Central Time Bar */}
      <StoryNav
        activeChapter={activeChapter}
        scrollProgress={scrollProgress}
        resolution={resolution}
        onSelectChapter={handleSelectChapter}
      />

      {/* Chapter 1: The inbox (8:00 AM) */}
      <Chapter1Pile />

      {/* Chapter 2: The loop (to 4:15 PM) */}
      <Chapter2Loop />

      {/* Transition Scene: The loop breaks */}
      <TransitionLoopBreak />

      {/* Chapter 3: Enter Endloops (8:25 AM) */}
      <Chapter3Pipeline />

      {/* Chapter 4: The draft (8:25 – 9:10 AM) */}
      <Chapter4Draft resolution={resolution} />

      {/* Chapter 5: The sign-off (9:10 AM) */}
      <Chapter5SignOff resolution={resolution} />

      {/* Illustrative Scenario Footnote */}
      <div className="w-full py-4 text-center border-t border-slate-100 bg-white">
        <p className="text-caption font-mono text-navy-400">
          * Illustrative scenario: month-end audit preparation, 412 documents, partner review at 5:00 PM.
        </p>
      </div>

      {/* What changes when the prep work is done for you */}
      <ImpactSection />

      {/* Epilogue: Two ways to meet your month-end, About Alkazim & Final CTA */}
      <EpilogueSection />
    </div>
  )
}

export default StorySection
