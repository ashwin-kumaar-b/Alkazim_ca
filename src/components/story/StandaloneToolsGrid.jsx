import React from 'react'
import { standaloneToolsGrid } from '../../data/epilogueData'

export function StandaloneToolsGrid() {
  return (
    <div
      id="panel-tools"
      role="tabpanel"
      aria-labelledby="tab-tools"
      className="space-y-6 focus-visible:outline-none"
    >
      <div className="text-center">
        <span className="font-mono text-xs text-navy-400 uppercase tracking-wider">
          Solve one task, use it on its own
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {standaloneToolsGrid.map((tool) => (
          <div
            key={tool.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-card transition-shadow flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono uppercase text-navy-400">
                  Modular Tool
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                    tool.status === 'Live'
                      ? 'bg-teal-100 text-teal-700 border border-teal-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {tool.status}
                </span>
              </div>

              <h3 className="text-small font-bold text-navy font-display leading-snug">
                {tool.title}
              </h3>
              <p className="text-xs text-navy-400 leading-relaxed mt-1.5">
                {tool.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-teal">
              Instant Integration →
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StandaloneToolsGrid
