import React from 'react'
import { solutionsTimeline } from '../../data/epilogueData'

export function SolutionsTimeline() {
  return (
    <div
      id="panel-solutions"
      role="tabpanel"
      aria-labelledby="tab-solutions"
      className="space-y-6 focus-visible:outline-none"
    >
      <div className="text-center">
        <span className="font-mono text-xs text-navy-400 uppercase tracking-wider">
          Run an entire process, start to finish
        </span>
      </div>

      {/* Connected Timeline: Horizontal on Desktop, Vertical on Mobile */}
      <div className="relative pt-4">
        {/* Connecting Horizontal Line on Desktop */}
        <div
          className="hidden lg:block absolute top-[52px] inset-x-12 h-0.5 bg-slate-200 z-0"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative z-10">
          {solutionsTimeline.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-card transition-shadow flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 font-mono text-xs font-bold flex items-center justify-center border border-teal-200">
                    {item.step}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                      item.status === 'Live'
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-small font-bold text-navy font-display leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-navy-400 leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-teal">
                Complete Lifecycle Software →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SolutionsTimeline
