'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setFieldErrors({})
    setLoading(true)

    try {
      const response = await fetch('/api/contact/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_code', ...formData }),
      })

      const data = await response.json()

      if (data.status === 'code_sent') {
        setStep('otp')
      } else if (data.status === 'error' && data.errors) {
        const errors: Record<string, string> = {}
        data.errors.forEach((err: any) => { errors[err.field] = err.message })
        setFieldErrors(errors)
      } else {
        setError(data.message || "Erreur")
      }
    } catch (err) {
      setError("Erreur réseau")
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyCode() {
    const code = otpCode.join('')
    if (code.length !== 6) {
      setOtpError('6 chiffres requis')
      return
    }

    setOtpError('')
    setLoading(true)

    try {
      const response = await fetch('/api/contact/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify_code', email: formData.email, verificationCode: code }),
      })

      const data = await response.json()

      if (data.status === 'success') {
        setStep('success')
      } else if (data.status === 'invalid') {
        setOtpError(`Code incorrect. Reste: ${data.attemptsLeft || 0}`)
        setOtpCode(['', '', '', '', '', ''])
      } else {
        setOtpError(data.message || 'Erreur')
      }
    } catch (err) {
      setOtpError("Erreur réseau")
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Message envoyé !</h1>
            <p className="text-lg text-gray-600 mb-8">Notre équipe vous contactera rapidement.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:shadow-xl transition"
            >
              Retour
            </button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (step === 'otp') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold mb-4 text-center">Vérification</h1>
            <p className="text-gray-600 text-center mb-8">
              Code envoyé à <strong>{formData.email}</strong>
            </p>

            <div className="flex gap-3 justify-center mb-6">
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(-1)
                    const newOtp = [...otpCode]
                    newOtp[idx] = val
                    setOtpCode(newOtp)
                    if (val && idx < 5) {
                      document.querySelector<HTMLInputElement>(`input[name="otp-${idx+1}"]`)?.focus()
                    }
                  }}
                  name={`otp-${idx}`}
                  maxLength={1}
                  className={`w-14 h-16 text-center text-2xl font-bold border-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                    otpError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={loading}
                />
              ))}
            </div>

            {otpError && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><p className="text-red-700 text-sm">{otpError}</p></div>}

            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:shadow-xl transition disabled:opacity-50"
            >
              {loading ? 'Vérification...' : 'Vérifier'}
            </button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contactez-nous</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium mb-2">Nom *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg ${fieldErrors.name ? 'border-red-500' : ''}`}
                required
              />
              {fieldErrors.name && <p className="text-red-600 text-sm mt-1">{fieldErrors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg ${fieldErrors.email ? 'border-red-500' : ''}`}
                required
              />
              {fieldErrors.email && <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Société</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Téléphone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg ${fieldErrors.phone ? 'border-red-500' : ''}`}
                required
              />
              {fieldErrors.phone && <p className="text-red-600 text-sm mt-1">{fieldErrors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sujet</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message * (min 50 caractères)</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg ${fieldErrors.message ? 'border-red-500' : ''}`}
                required
              />
              {fieldErrors.message && <p className="text-red-600 text-sm mt-1">{fieldErrors.message}</p>}
            </div>

            {error && <div className="bg-red-50 border-l-4 border-red-500 p-4"><p className="text-red-700">{error}</p></div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:shadow-xl transition disabled:opacity-50"
            >
              {loading ? 'Envoi...' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
