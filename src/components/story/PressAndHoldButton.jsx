import React, { useState, useRef, useEffect, useCallback } from 'react'

/**
 * PressAndHoldButton
 * Press & hold interaction for Chapter 5 sign-off.
 * Fills a teal ring over 1.2 seconds.
 * Keyboard-accessible alternative: Enter to confirm directly.
 */
export function PressAndHoldButton({
  isSigned,
  disabled,
  onComplete,
  holdDurationMs = 1200,
}) {
  const [progress, setProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const animRef = useRef(null)
  const startTimeRef = useRef(null)

  const stopHold = useCallback(() => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current)
      animRef.current = null
    }
    setIsHolding(false)
    setProgress(0)
  }, [])

  const startHold = useCallback(() => {
    if (disabled || isSigned) return
    setIsHolding(true)
    startTimeRef.current = performance.now()

    const step = (now) => {
      const elapsed = now - startTimeRef.current
      const pct = Math.min(100, (elapsed / holdDurationMs) * 100)
      setProgress(pct)

      if (pct >= 100) {
        setIsHolding(false)
        setProgress(100)
        onComplete()
        return
      }
      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
  }, [disabled, isSigned, holdDurationMs, onComplete])

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  // Keyboard accessibility: Enter immediately confirms; Space triggers hold
  const handleKeyDown = (e) => {
    if (disabled || isSigned) return
    if (e.key === 'Enter') {
      e.preventDefault()
      onComplete()
    } else if (e.key === ' ' && !isHolding) {
      e.preventDefault()
      startHold()
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === ' ' && isHolding) {
      e.preventDefault()
      stopHold()
    }
  }

  // SVG Ring geometry
  const radius = 14
  const circumference = 2 * Math.PI * radius
  const dashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="w-full space-y-2">
      <button
        type="button"
        disabled={disabled || isSigned}
        aria-pressed={isSigned}
        aria-label={
          isSigned
            ? 'Schedule signed and sealed'
            : disabled
            ? 'Sign-off locked until all 3 exceptions are resolved'
            : 'Press and hold to sign off, or press Enter to confirm'
        }
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
        onTouchCancel={stopHold}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-3 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
          isSigned
            ? 'bg-green-700 text-white shadow-xs cursor-default'
            : disabled
            ? 'bg-slate-100 text-navy-300 cursor-not-allowed border border-slate-200'
            : 'bg-navy text-white hover:bg-navy-800 active:bg-navy-900 shadow-card cursor-pointer'
        }`}
      >
        {/* Subtle background fill indicator while holding */}
        {isHolding && (
          <div
            className="absolute inset-0 bg-teal/25 pointer-events-none transition-all duration-75 origin-left"
            style={{ width: `${progress}%` }}
          />
        )}

        {/* Circular Progress Ring */}
        <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
          <svg className="w-7 h-7 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
            {/* Background track */}
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className={isSigned ? 'text-green-500/40' : 'text-slate-300/30'}
            />
            {/* Animated Teal Progress Ring */}
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke={isSigned ? '#22C55E' : '#118379'}
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={isSigned ? 0 : dashoffset}
              strokeLinecap="round"
              className="transition-all duration-75"
            />
          </svg>

          {/* Centered Check or Lock or Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isSigned ? (
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : disabled ? (
              <svg className="w-3 h-3 text-navy-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            ) : (
              <span className={`w-1.5 h-1.5 rounded-full ${isHolding ? 'bg-teal' : 'bg-white/60'}`} />
            )}
          </div>
        </div>

        {/* Button Label */}
        <span className="relative z-10 font-mono text-xs sm:text-sm tracking-wide">
          {isSigned
            ? '✓ Signed & Sealed (WP-410 Approved)'
            : disabled
            ? 'Sign-off locked · Resolve 3 items in Ch. 4'
            : isHolding
            ? `Holding to sign off... ${Math.round(progress)}%`
            : 'Press and hold to sign off'}
        </span>
      </button>

      {/* Keyboard & Interaction Hint */}
      {!isSigned && (
        <p className="text-[11px] font-mono text-center text-navy-400">
          {disabled
            ? 'Resolve all 3 items above to enable sign-off'
            : 'Hold mouse / touch, or press Enter to confirm directly'}
        </p>
      )}
    </div>
  )
}

export default PressAndHoldButton
