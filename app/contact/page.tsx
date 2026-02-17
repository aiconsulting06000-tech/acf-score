'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // OTP
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_code', ...formData }),
      })
      const data = await res.json()

      if (data.status === 'code_sent') {
        setStep('otp')
        startResendTimer()
      } else {
        setSubmitError(data.message || 'Une erreur est survenue. Réessayez.')
      }
    } catch {
      setSubmitError('Erreur réseau. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function startResendTimer() {
    setResendDisabled(true)
    setResendCountdown(60)
    const interval = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setResendDisabled(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1)
    const newCode = [...otpCode]
    newCode[index] = digit
    setOtpCode(newCode)
    setOtpError('')
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  async function handleOtpVerify() {
    const code = otpCode.join('')
    if (code.length < 6) {
      setOtpError('Entrez les 6 chiffres du code.')
      return
    }
    setOtpLoading(true)
    setOtpError('')

    try {
      const res = await fetch('/api/contact/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify_code', email: formData.email, code, ...formData }),
      })
      const data = await res.json()

      if (data.status === 'success') {
        setStep('success')
        setFormData({ name: '', email: '', company: '', message: '' })
      } else if (data.status === 'blocked') {
        setOtpError('Trop de tentatives. Veuillez réessayer dans 5 minutes.')
      } else {
        setOtpError('Code incorrect. Vérifiez votre email et réessayez.')
      }
    } catch {
      setOtpError('Erreur réseau. Veuillez réessayer.')
    } finally {
      setOtpLoading(false)
    }
  }

  async function handleResend() {
    if (resendDisabled) return
    setOtpCode(['', '', '', '', '', ''])
    setOtpError('')
    try {
      await fetch('/api/contact/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_code', ...formData }),
      })
      startResendTimer()
    } catch {
      // silent
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contacter un expert ACF®
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Échangez avec notre équipe pour discuter de votre Score ACF® et de votre stratégie de souveraineté opérationnelle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Carte Info gauche */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border-2 border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pourquoi nous contacter ?
            </h2>
            <ul className="space-y-4">
              {[
                'Interpréter votre Score ACF® en détail',
                'Élaborer un plan d\'action sur mesure',
                'Découvrir les modules ACF® (diagnostic complet, constitution agentique)',
                'Préparer votre entreprise à l\'économie des agents IA',
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-white rounded-lg border-2 border-primary/30">
              <p className="text-sm font-semibold text-gray-900 mb-2">📞 Contact direct</p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Email :</strong> contact@acfscore.com
              </p>
              <a
                href="https://calendly.com/aiconsulting_fr/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-lg hover:shadow-lg transition-all"
              >
                📅 Réserver directement sur Calendly →
              </a>
            </div>
          </div>

          {/* Carte droite — formulaire / OTP / succès */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

            {/* ===== SUCCÈS ===== */}
            {step === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Message envoyé ! ✅</h3>
                <p className="text-gray-600 mb-6">
                  Votre message nous est bien parvenu. Notre équipe vous répondra sous 24h.
                </p>
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>📅 Besoin d'un créneau rapidement ?</strong>
                  </p>
                  <a
                    href="https://calendly.com/aiconsulting_fr/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-lg hover:shadow-lg transition-all"
                  >
                    📅 Réserver directement maintenant →
                  </a>
                </div>
                <button
                  onClick={() => { setStep('form'); setOtpCode(['','','','','','']) }}
                  className="text-primary hover:text-accent font-semibold"
                >
                  ← Envoyer un autre message
                </button>
              </div>
            )}

            {/* ===== FORMULAIRE ===== */}
            {step === 'form' && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Formulaire de contact</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text" id="name" name="name" required
                      value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      placeholder="jean@entreprise.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text" id="company" name="company"
                      value={formData.company} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message" name="message" required rows={4}
                      value={formData.message} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                      placeholder="Décrivez votre besoin (Score ACF®, audit complet, constitution agentique...)"
                    />
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <p className="text-sm text-red-700">❌ {submitError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                        Envoi en cours...
                      </span>
                    ) : 'Envoyer le message →'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Un code de vérification sera envoyé à votre email pour confirmer l'envoi.
                  </p>
                </form>
              </>
            )}

            {/* ===== OTP ===== */}
            {step === 'otp' && (
              <div>
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérifiez votre email</h2>
                  <p className="text-gray-600 text-sm">
                    Un code à 6 chiffres a été envoyé à<br />
                    <strong className="text-gray-800">{formData.email}</strong>
                  </p>
                </div>

                {/* Champs OTP */}
                <div className="flex justify-center gap-3 mb-6">
                  {otpCode.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { otpRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      onPaste={i === 0 ? (e) => {
                        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
                        if (pasted.length === 6) {
                          setOtpCode(pasted.split(''))
                          otpRefs.current[5]?.focus()
                        }
                      } : undefined}
                      className={`w-11 h-14 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:border-primary transition ${
                        otpError ? 'border-red-400 bg-red-50' : digit ? 'border-primary bg-primary/5' : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {otpError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded mb-4">
                    <p className="text-sm text-red-700">{otpError}</p>
                  </div>
                )}

                <button
                  onClick={handleOtpVerify}
                  disabled={otpLoading || otpCode.join('').length < 6}
                  className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {otpLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Vérification...
                    </span>
                  ) : 'Confirmer l\'envoi →'}
                </button>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <button
                    onClick={() => { setStep('form'); setOtpCode(['','','','','','']); setOtpError('') }}
                    className="hover:text-primary transition"
                  >
                    ← Modifier mes infos
                  </button>
                  <button
                    onClick={handleResend}
                    disabled={resendDisabled}
                    className={`transition ${resendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:underline'}`}
                  >
                    {resendDisabled ? `Renvoyer (${resendCountdown}s)` : 'Renvoyer le code'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-primary hover:text-accent font-semibold transition">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
