'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Script from 'next/script'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    subject: 'general',
    hasReport: false,
    // Anti-spam honeypot
    website: ''
  })
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formTimestamp, setFormTimestamp] = useState<number>(0)
  const [turnstileToken, setTurnstileToken] = useState<string>('')

  useEffect(() => {
    setFormTimestamp(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Anti-spam: honeypot
    if (formData.website) {
      setStatus('error')
      setErrorMessage('Erreur de validation du formulaire.')
      return
    }

    // Anti-spam: timestamp
    const timeSinceLoad = Date.now() - formTimestamp
    if (timeSinceLoad < 3000) {
      setStatus('error')
      setErrorMessage('Veuillez prendre le temps de remplir le formulaire.')
      return
    }

    // Vérification Turnstile
    if (!turnstileToken) {
      setStatus('error')
      setErrorMessage('Veuillez compléter la vérification de sécurité.')
      return
    }
    
    setStatus('loading')
    setErrorMessage('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('company', formData.company)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('message', formData.message)
      formDataToSend.append('subject', formData.subject)
      formDataToSend.append('hasReport', formData.hasReport ? 'true' : 'false')
      formDataToSend.append('timestamp', formTimestamp.toString())
      formDataToSend.append('turnstileToken', turnstileToken)
      
      if (file) {
        formDataToSend.append('file', file)
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        subject: 'general',
        hasReport: false,
        website: ''
      })
      setFile(null)
      setTurnstileToken('')
    } catch (error: any) {
      setStatus('error')
      setErrorMessage(error?.message || 'Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return (
    <>
      <Script 
        src="https://challenges.cloudflare.com/turnstile/v0/api.js" 
        strategy="lazyOnload"
      />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">
              Parlons de votre gouvernance agentique
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Notre équipe d'experts est là pour vous accompagner
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Réponse sous 24-48h
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Données 100% confidentielles
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Formulaire - 2/3 de la largeur */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Message envoyé avec succès !</h2>
                    <p className="text-gray-600 text-lg mb-2">
                      Merci pour votre message.
                    </p>
                    <p className="text-gray-600 text-lg mb-8">
                      Vous allez recevoir un email de confirmation avec un lien Calendly pour réserver votre créneau de consultation gratuite (30 min).
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h2>
                      <p className="text-gray-600">Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</p>
                    </div>

                    {/* Honeypot - invisible */}
                    <div className="hidden">
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                          placeholder="Jean Dupont"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Email professionnel *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                          placeholder="jean.dupont@entreprise.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Entreprise *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                          placeholder="Mon Entreprise SAS"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Sujet de votre demande *
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                      >
                        <option value="general">Question générale</option>
                        <option value="audit">Demande d'audit ACF®</option>
                        <option value="formation">Formation / Accompagnement</option>
                        <option value="certification">Certification ACF®</option>
                        <option value="partenariat">Partenariat</option>
                        <option value="presse">Presse / Média</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Votre message *
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                        placeholder="Décrivez votre besoin en gouvernance agentique, vos enjeux actuels, ou toute question sur l'ACF®..."
                      />
                    </div>

                    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasReport}
                          onChange={(e) => setFormData({ ...formData, hasReport: e.target.checked })}
                          className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
                        />
                        <span className="text-sm text-gray-700">
                          <strong>J'ai complété le diagnostic ACF®</strong> et je souhaite joindre mon rapport PDF pour un échange plus ciblé
                        </span>
                      </label>
                    </div>

                    {formData.hasReport && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Joindre votre rapport ACF® (PDF, max 10 Mo)
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                          />
                        </div>
                        {file && (
                          <p className="text-sm text-green-600 mt-2 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Fichier sélectionné : {file.name} ({(file.size / 1024 / 1024).toFixed(2)} Mo)
                          </p>
                        )}
                      </div>
                    )}

                    {/* Cloudflare Turnstile Captcha */}
                    <div className="flex justify-center">
                      <div 
                        className="cf-turnstile" 
                        data-sitekey="0x4AAAAAACftS7qz-cWEvlwT"
                        data-callback="onTurnstileSuccess"
                      ></div>
                    </div>

                    {status === 'error' && (
                      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="text-red-800 text-sm font-semibold">Erreur d'envoi</p>
                            <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>

                    {/* MESSAGE SPAM SUPPRIMÉ ICI - PLUS DE LIGNE "🔒 Formulaire protégé..." */}
                  </form>
                )}
              </div>

              {/* Astuce en bas du formulaire */}
              <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">💡 Astuce</p>
                    <p className="text-sm text-blue-800 mt-1">
                      Téléchargez votre PDF de résultats depuis la page de diagnostic et joignez-le au formulaire. Cela nous permettra de préparer un échange encore plus ciblé et efficace.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - 1/3 de la largeur */}
            <div className="space-y-6">
              {/* Pourquoi nous contacter */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pourquoi nous contacter ?</h3>
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="block text-gray-900">Interpréter votre Score ACF® en détail</strong>
                      <span className="text-gray-600">Comprendre vos forces et faiblesses</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="block text-gray-900">Élaborer un plan d'action sur mesure</strong>
                      <span className="text-gray-600">Roadmap adaptée à votre contexte</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="block text-gray-900">Découvrir les modules ACF®</strong>
                      <span className="text-gray-600">Diagnostic complet, constitution agentique</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong className="block text-gray-900">Préparer votre entreprise à l'économie des agents IA</strong>
                      <span className="text-gray-600">Anticiper les risques et opportunités</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Ce qui se passe ensuite */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Ce qui se passe ensuite</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-900">Vous recevez un email de confirmation</p>
                      <p className="text-xs text-gray-600">Avec un lien Calendly pour réserver votre créneau</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-900">Vous choisissez votre créneau</p>
                      <p className="text-xs text-gray-600">Consultation de 30 minutes par visio</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-900">Échange avec un expert ACF®</p>
                      <p className="text-xs text-gray-600">Gratuit, sans engagement, confidentiel</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA diagnostic */}
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Pas encore fait le diagnostic ?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Obtenez votre score ACF® en 10 minutes
                </p>
                <Link
                  href="/calculator"
                  className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition"
                >
                  Calculer mon score →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>

      {/* Script callback Turnstile */}
      <Script id="turnstile-callback" strategy="afterInteractive">
        {`
          window.onTurnstileSuccess = function(token) {
            window.dispatchEvent(new CustomEvent('turnstile-success', { detail: token }));
          }
          window.addEventListener('turnstile-success', function(e) {
            document.dispatchEvent(new CustomEvent('set-turnstile-token', { detail: e.detail }));
          });
        `}
      </Script>

      <Script id="turnstile-listener" strategy="afterInteractive">
        {`
          document.addEventListener('set-turnstile-token', function(e) {
            // Le token sera capturé dans le state React via useEffect
            window.__turnstileToken = e.detail;
          });
        `}
      </Script>
    </>
  )
}
