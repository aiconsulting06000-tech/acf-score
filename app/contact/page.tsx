'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    hasReport: false,
    // Anti-spam honeypot (invisible)
    website: ''
  })
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formTimestamp, setFormTimestamp] = useState<number>(0)

  // Enregistrer le timestamp quand le formulaire est chargé
  useEffect(() => {
    setFormTimestamp(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('=== FORM SUBMIT ===')
    
    // Anti-spam : vérifier honeypot
    if (formData.website) {
      console.log('SPAM DETECTED: Honeypot filled')
      setStatus('error')
      setErrorMessage('Erreur de validation du formulaire.')
      return
    }

    // Anti-spam : vérifier que le formulaire n'a pas été soumis trop vite (< 3 secondes)
    const timeSinceLoad = Date.now() - formTimestamp
    if (timeSinceLoad < 3000) {
      console.log('SPAM DETECTED: Form submitted too quickly')
      setStatus('error')
      setErrorMessage('Veuillez prendre le temps de remplir le formulaire.')
      return
    }

    console.log('Form data:', formData)
    
    setStatus('loading')
    setErrorMessage('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('company', formData.company)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('message', formData.message)
      formDataToSend.append('hasReport', formData.hasReport ? 'true' : 'false')
      formDataToSend.append('timestamp', formTimestamp.toString())
      
      if (file) {
        formDataToSend.append('file', file)
        console.log('File attached:', file.name)
      }

      console.log('Sending to /api/contact...')
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi')
      }

      console.log('=== SUCCESS ===')
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        hasReport: false,
        website: ''
      })
      setFile(null)
    } catch (error: any) {
      console.error('=== ERROR ===')
      console.error('Error:', error)
      setStatus('error')
      setErrorMessage(error?.message || 'Une erreur est survenue. Veuillez reessayer.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600">
            Parlez avec un expert de gouvernance agentique
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message envoye !</h2>
              <p className="text-gray-600 mb-6">Nous vous recontacterons dans les plus brefs delais.</p>
              <button
                onClick={() => setStatus('idle')}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - invisible pour les humains */}
              <div className="hidden">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="Mon Entreprise"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Decrivez votre besoin en gouvernance agentique..."
                />
              </div>

              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasReport}
                    onChange={(e) => setFormData({ ...formData, hasReport: e.target.checked })}
                    className="w-5 h-5 text-primary border-2 border-gray-300 rounded focus:ring-primary mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    J'ai complete le diagnostic ACF et je souhaite joindre mon rapport PDF
                  </span>
                </label>
              </div>

              {formData.hasReport && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Joindre votre rapport ACF (PDF)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                  {file && (
                    <p className="text-sm text-gray-600 mt-2">
                      Fichier selectionne : {file.name}
                    </p>
                  )}
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-semibold">Erreur</p>
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                  <p className="text-red-600 text-xs mt-2">
                    Si le probleme persiste, contactez-nous directement a contact@acf-score.com
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Ce formulaire est protege contre le spam
              </p>
            </form>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">contact@acf-score.com</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Reponse</h3>
            <p className="text-gray-600">Sous 24-48h</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Confidentialite</h3>
            <p className="text-gray-600">Donnees securisees</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
