import React from 'react'
import { Hero } from '../components/hero/Hero'
import { StorySection } from '../components/story/StorySection'

export function HomePage() {
  return (
    <>
      {/* Home Hero Section */}
      <Hero />

      {/* Story Engine: Continuous 5-Chapter Narrative */}
      <StorySection />
    </>
  )
}

export default HomePage
