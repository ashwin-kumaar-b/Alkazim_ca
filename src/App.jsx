import React, { useEffect, useRef, Suspense, lazy } from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext'
import {
  saveRouteScroll,
  getSavedRouteScroll,
  isReloadNavigation,
} from './utils/scrollHelpers'

// Lazy-load secondary routes for performance & minimal initial payload
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const ToolsPage = lazy(() => import('./pages/ToolsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

// Reset scroll on forward route transitions; restore scroll on page reload & back-forward navigation
function ScrollReset() {
  const { pathname, hash } = useLocation()
  const navType = useNavigationType()
  const prevPathRef = useRef(null)
  const initialReloadYRef = useRef(isReloadNavigation() ? getSavedRouteScroll(pathname) : 0)
  const smoothScroll = useSmoothScroll()
  const actionsRef = useRef(smoothScroll)
  actionsRef.current = smoothScroll

  useEffect(() => {
    const onScroll = () => saveRouteScroll(pathname, window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pagehide', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pagehide', onScroll)
    }
  }, [pathname])

  useEffect(() => {
    const prevPath = prevPathRef.current
    prevPathRef.current = pathname

    if (hash) {
      const rafId = window.requestAnimationFrame(() => {
        if (actionsRef.current?.scrollToTarget) actionsRef.current.scrollToTarget(hash)
        else document.querySelector(hash)?.scrollIntoView({ behavior: 'auto' })
      })
      return () => window.cancelAnimationFrame(rafId)
    }

    if (prevPath === null) {
      const reloadY = initialReloadYRef.current
      if (reloadY > 0) {
        const rafId = window.requestAnimationFrame(() => {
          actionsRef.current?.scrollToImmediate?.(reloadY)
        })
        return () => window.cancelAnimationFrame(rafId)
      }
      return undefined
    }

    if (navType === 'POP') {
      const popY = getSavedRouteScroll(pathname)
      const rafId = window.requestAnimationFrame(() => {
        actionsRef.current?.scrollToImmediate?.(popY)
      })
      return () => window.cancelAnimationFrame(rafId)
    }

    if (prevPath !== pathname) {
      actionsRef.current?.scrollToImmediate?.(0)
    }
    return undefined
  }, [pathname, hash, navType])

  return null
}

export function App() {
  return (
    <SmoothScrollProvider>
      <ScrollReset />
      <Suspense
        fallback={
          <div className="min-h-screen bg-white flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" aria-hidden="true" />
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="solutions" element={<SolutionsPage />} />
            <Route path="tools" element={<ToolsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>
    </SmoothScrollProvider>
  )
}

export default App
