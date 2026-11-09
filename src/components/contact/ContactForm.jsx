import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { ContactSuccessView } from './ContactSuccessView'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Audit Practice Partner',
    interest: 'Both Solutions and Tools',
    volume: '1,000 - 5,000 documents / month',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Please provide your full name'
    if (!formData.email.trim()) errs.email = 'Work email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Please provide a valid corporate email'
    if (!formData.company.trim()) errs.company = 'Firm or organization name is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({
      name: '',
      email: '',
      company: '',
      role: 'Audit Practice Partner',
      interest: 'Both Solutions and Tools',
      volume: '1,000 - 5,000 documents / month',
      notes: '',
    })
  }

  if (submitted) return <ContactSuccessView formData={formData} onReset={handleReset} />

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-surface-border p-6 sm:p-8 shadow-card space-y-5"
    >
      <div>
        <h3 className="text-xl font-bold font-display text-brand-navy">
          Request a Tailored Practice Walkthrough
        </h3>
        <p className="text-xs sm:text-sm text-brand-navy-light mt-1">
          Discuss your firm's vouching, audit schedules, or property budgeting workflows with our technical team.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-brand-navy mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-surface-subtle focus:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
              errors.name ? 'border-red-400' : 'border-surface-border'
            }`}
            placeholder="e.g. Rashid Al-Nuaimi"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-brand-navy mb-1">
            Corporate Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-surface-subtle focus:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
              errors.email ? 'border-red-400' : 'border-surface-border'
            }`}
            placeholder="r.alnuaimi@auditfirm.ae"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-xs font-semibold text-brand-navy mb-1">
            Firm or Company <span className="text-red-500">*</span>
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-surface-subtle focus:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
              errors.company ? 'border-red-400' : 'border-surface-border'
            }`}
            placeholder="e.g. Alkazim Audit Practice"
            aria-invalid={Boolean(errors.company)}
          />
          {errors.company && <p className="text-[11px] text-red-600 mt-1">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="role" className="block text-xs font-semibold text-brand-navy mb-1">
            Your Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-surface-border bg-surface-subtle focus:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
          >
            <option>Audit Practice Partner</option>
            <option>Senior Audit Manager</option>
            <option>CFO / Finance Director</option>
            <option>Property Finance / Owners Assoc. Manager</option>
            <option>Chartered Accountant / Controller</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="interest" className="block text-xs font-semibold text-brand-navy mb-1">
            Product Interest
          </label>
          <select
            id="interest"
            value={formData.interest}
            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-surface-border bg-surface-subtle focus:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
          >
            <option>End-to-End Solutions (Full Audit / Escrow / Budgeting)</option>
            <option>Standalone Tools (Extraction, Vouching, Reconcile)</option>
            <option>Both Solutions and Tools</option>
          </select>
        </div>

        <div>
          <label htmlFor="volume" className="block text-xs font-semibold text-brand-navy mb-1">
            Monthly Document Volume
          </label>
          <select
            id="volume"
            value={formData.volume}
            onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-surface-border bg-surface-subtle focus:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
          >
            <option>Under 1,000 documents / month</option>
            <option>1,000 - 5,000 documents / month</option>
            <option>5,000 - 20,000 documents / month</option>
            <option>20,000+ documents (Enterprise Practice)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-xs font-semibold text-brand-navy mb-1">
          Specific Requirements or Questions (Optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-3.5 py-2 text-sm rounded-lg border border-surface-border bg-surface-subtle focus:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
          placeholder="Tell us about your current ERP, audit software, or document bottlenecks..."
        />
      </div>

      <Button type="submit" variant="accent" size="lg" className="w-full justify-center">
        Submit Request for Private Demonstration
      </Button>

      <p className="text-[11px] text-brand-navy-muted text-center">
        Zero commitment. We operate with strict client data confidentiality and UAE data governance standards.
      </p>
    </form>
  )
}
