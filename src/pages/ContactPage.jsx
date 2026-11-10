import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Container, Section } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { useContactForm } from '../hooks/useContactForm'
import { ContactSuccessCard } from '../components/contact/ContactSuccessCard'
import { ContactDetails } from '../components/contact/ContactDetails'

export function ContactPage() {
  const {
    formData,
    errors,
    isSubmitted,
    roles,
    onBlur,
    onChange,
    onSubmit,
    onReset,
  } = useContactForm()

  return (
    <div className="bg-white">
      {/* Header */}
      <Section spacing="sm" className="bg-calm-teal border-b border-teal-100">
        <Container size="lg" className="text-center space-y-3">
          <span className="text-label text-teal">Practice Consultation</span>
          <h1 className="text-display font-display text-navy tracking-tight">
            Request a Practice Walkthrough
          </h1>
          <p className="text-body-lg text-navy-400 max-w-xl mx-auto">
            Discuss your firm's vouching, escrow audit, or reconciliation workflows with our Dubai engineering team.
          </p>
        </Container>
      </Section>

      <Container size="xl" className="py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office & Trust Details */}
          <div className="lg:col-span-5">
            <ContactDetails />
          </div>

          {/* Right Column: Interactive Form or Success State */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <ContactSuccessCard
                  key="success-card"
                  formData={formData}
                  onReset={onReset}
                />
              ) : (
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-4 text-left"
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-navy mb-1">
                      Full Name <span className="text-amber-700">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => onChange('name', e.target.value)}
                      onBlur={() => onBlur('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      placeholder="e.g. Tariq Al-Hashimi"
                      className={`w-full px-3.5 py-2 text-small rounded-xl border bg-calm-subtle focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                        errors.name ? 'border-amber-400 ring-1 ring-amber-300' : 'border-slate-200'
                      }`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="text-[11px] text-amber-800 mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-navy mb-1">
                        Work Email <span className="text-amber-700">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        onBlur={() => onBlur('email')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        placeholder="tariq@auditfirm.ae"
                        className={`w-full px-3.5 py-2 text-small rounded-xl border bg-calm-subtle focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                          errors.email ? 'border-amber-400 ring-1 ring-amber-300' : 'border-slate-200'
                        }`}
                      />
                      {errors.email && (
                        <p id="contact-email-error" role="alert" className="text-[11px] text-amber-800 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-semibold text-navy mb-1">
                        Company / Firm <span className="text-amber-700">*</span>
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => onChange('company', e.target.value)}
                        onBlur={() => onBlur('company')}
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={errors.company ? 'contact-company-error' : undefined}
                        placeholder="Alkazim Audit & Advisory"
                        className={`w-full px-3.5 py-2 text-small rounded-xl border bg-calm-subtle focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                          errors.company ? 'border-amber-400 ring-1 ring-amber-300' : 'border-slate-200'
                        }`}
                      />
                      {errors.company && (
                        <p id="contact-company-error" role="alert" className="text-[11px] text-amber-800 mt-1">
                          {errors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="contact-role" className="block text-xs font-semibold text-navy mb-1">
                      Practice Role
                    </label>
                    <select
                      id="contact-role"
                      value={formData.role}
                      onChange={(e) => onChange('role', e.target.value)}
                      className="w-full px-3.5 py-2 text-small rounded-xl border border-slate-200 bg-calm-subtle focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-navy mb-1">
                      Message / Workflow Need <span className="text-amber-700">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      data-lenis-prevent
                      value={formData.message}
                      onChange={(e) => onChange('message', e.target.value)}
                      onBlur={() => onBlur('message')}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      placeholder="Tell us about your current voucher volume, ERP, or audit paper bottlenecks..."
                      className={`w-full px-3.5 py-2 text-small rounded-xl border bg-calm-subtle focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                        errors.message ? 'border-amber-400 ring-1 ring-amber-300' : 'border-slate-200'
                      }`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" role="alert" className="text-[11px] text-amber-800 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
                    Submit Demo Request
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ContactPage
