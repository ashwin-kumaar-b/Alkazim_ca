import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function ContactSuccessCard({ formData, onReset }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
      className="bg-white rounded-2xl border border-teal-200 p-8 shadow-card text-center space-y-5"
    >
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-700">
        <svg className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <span className="px-3 py-1 rounded-pill bg-green-100 text-green-700 text-xs font-mono font-semibold">
        Inquiry Confirmed · REF-DXB-DEMO
      </span>

      <h2 className="text-h2 font-display text-navy">
        Thank you, {formData.name}
      </h2>

      <p className="text-small text-navy-400 max-w-md mx-auto leading-relaxed">
        Our Dubai team has received your practice inquiry for <strong className="text-navy">{formData.company}</strong>. We will contact you at <strong className="text-navy">{formData.email}</strong> within 1 business day.
      </p>

      <div className="pt-4">
        <Button variant="secondary" size="md" onClick={onReset}>
          Send another inquiry
        </Button>
      </div>
    </motion.div>
  )
}

export default ContactSuccessCard
