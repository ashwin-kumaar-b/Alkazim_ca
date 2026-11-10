import React from 'react'
import { motion } from 'framer-motion'
import { IMPACT_CARDS, IMPACT_FIGURES_CONFIG } from '../../data/whatChangesData'
import { EASINGS } from '../../styles/motionTokens'

function ImpactIcon({ type }) {
  const iconClasses = 'w-5 h-5 text-teal'
  switch (type) {
    case 'clock':
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
        </svg>
      )
    case 'shield-check':
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    case 'layers':
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l9.75 5.25 9.75-5.25-4.179-2.25m-11.142 4.5L2.25 16.5 12 21.75l9.75-5.25-4.179-2.25M12 2.25l9.75 5.25-9.75 5.25L2.25 7.5 12 2.25z" />
        </svg>
      )
    case 'file-search':
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    case 'user-check':
    default:
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      )
  }
}

export function ImpactCardsGrid({ isInView = false, shouldReduceMotion = false }) {
  // Render optional figures ONLY if values are non-null (strictly no invented numbers)
  const activeFigures = IMPACT_FIGURES_CONFIG.filter(
    (item) => item.value !== null && item.value !== undefined
  )

  return (
    <div className="space-y-8">
      {/* Optional figures strip (renders only when non-null) */}
      {activeFigures.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-calm-teal border border-teal-200">
          {activeFigures.map((fig) => (
            <div key={fig.id} className="text-center space-y-1">
              <span className="font-display font-bold text-h2 text-navy">
                {fig.value}
                {fig.unit}
              </span>
              <p className="text-caption font-mono text-navy-400">{fig.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* 5 Impact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {IMPACT_CARDS.map((card, index) => {
          // Span 2 columns on 2nd row on large screens for balanced 3+2 layout
          const isSpanClass =
            index === 3
              ? 'lg:col-start-1 lg:col-span-1'
              : index === 4
              ? 'lg:col-start-2 lg:col-span-2 md:col-span-2 lg:col-auto'
              : ''

          return (
            <motion.article
              key={card.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, delay: index * 0.08, ease: EASINGS.easeOut }
              }
              className={`p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-card hover:-translate-y-1 hover:shadow-hover transition-transform duration-300 will-change-transform space-y-4 flex flex-col justify-between ${isSpanClass}`}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <ImpactIcon type={card.iconType} />
                </div>
                <h3 className="text-h3 font-display font-bold text-navy tracking-tight">
                  {card.title}
                </h3>
              </div>
              <p className="text-body text-navy-400 leading-relaxed font-sans">
                {card.description}
              </p>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}

export default ImpactCardsGrid
