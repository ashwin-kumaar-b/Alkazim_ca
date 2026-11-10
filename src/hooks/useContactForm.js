import { useState } from 'react'

export const ROLES = [
  'Audit Practice Partner',
  'Senior Audit Manager',
  'CFO / Finance Director',
  'Property Finance Manager',
  'Financial Controller / Senior Accountant',
]

/**
 * useContactForm
 * Encapsulates form state, on-blur validation, on-submit validation,
 * inline error mapping, and simulated submission.
 */
export function useContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ROLES[0],
    message: '',
  })

  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full name is required.'
        if (value.trim().length < 2) return 'Please enter a valid name.'
        return ''
      case 'email':
        if (!value.trim()) return 'Work email is required.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please provide a valid corporate email.'
        return ''
      case 'company':
        if (!value.trim()) return 'Firm or company name is required.'
        return ''
      case 'message':
        if (!value.trim()) return 'Please tell us briefly about your practice or workflow need.'
        return ''
      default:
        return ''
    }
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const errorMsg = validateField(field, formData[field])
    setErrors((prev) => ({ ...prev, [field]: errorMsg }))
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const errorMsg = validateField(field, value)
      setErrors((prev) => ({ ...prev, [field]: errorMsg }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      company: validateField('company', formData.company),
      message: validateField('message', formData.message),
    }

    setTouched({ name: true, email: true, company: true, role: true, message: true })
    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(Boolean)
    if (!hasErrors) {
      setIsSubmitted(true)
    }
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', role: ROLES[0], message: '' })
    setTouched({})
    setErrors({})
    setIsSubmitted(false)
  }

  return {
    formData,
    touched,
    errors,
    isSubmitted,
    roles: ROLES,
    onBlur: handleBlur,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onReset: handleReset,
  }
}

export default useContactForm
