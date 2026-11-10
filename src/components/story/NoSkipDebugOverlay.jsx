import React from 'react'

/**
 * NoSkipDebugOverlay (Dev Only)
 * Compact HUD showing active story chapter/zone, Lenis velocity, and no-skip hold state
 * for tuning pacingConfig.js (`NO_SKIP_CONFIG`). Stripped in production builds.
 */
export function NoSkipDebugOverlay({ debugState }) {
  if (!import.meta.env.DEV || !debugState) return null

  const { chapter, velocity, holdActive, holdReason } = debugState
  const absVel = Math.abs(velocity)
  const dirArrow = velocity > 0.2 ? '↓' : velocity < -0.2 ? '↑' : '·'

  return (
    <aside
      data-noskip-debug="true"
      aria-hidden="true"
      className="fixed bottom-3 right-3 z-[70] pointer-events-none select-none font-mono text-[11px] bg-navy/90 text-white backdrop-blur-md px-3 py-2 rounded-xl border border-white/15 shadow-lg space-y-1 min-w-[215px]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-1">
        <span className="text-[10px] uppercase tracking-wider text-teal-300 font-bold">
          Story Pacing HUD
        </span>
        <span
          className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            holdActive
              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
              : 'bg-teal-500/20 text-teal-200 border border-teal-400/30'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              holdActive ? 'bg-amber-400 animate-pulse' : 'bg-teal-300'
            }`}
          />
          {holdActive ? `HOLD:${holdReason}` : 'FREE'}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-slate-400">Chapter:</span>
        <span className="text-white font-semibold truncate max-w-[140px]">{chapter}</span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-slate-400">Velocity:</span>
        <span className="text-teal-200 tabular-nums font-semibold">
          {dirArrow} {absVel.toFixed(1)} px/f
        </span>
      </div>
    </aside>
  )
}

export default NoSkipDebugOverlay
