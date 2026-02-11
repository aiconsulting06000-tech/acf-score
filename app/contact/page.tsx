'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    scoreAcf: '',
    message: ''
  })
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Pré-remplir le score si venant des résultats
  useEffect(() => {
    const prefillScore = localStorage.getItem('acf_prefill_score')
    if (prefillScore) {
      setFormData(prev => ({ ...prev, scoreAcf: `${prefillScore}/100` }))
      localStorage.removeItem('acf_prefill_score')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('email', formData.email)
      submitData.append('company', formData.company)
      submitData.append('scoreAcf', formData.scoreAcf)
      submitData.append('message', formData.message)
      if (pdfFile) {
        submitData.append('pdfScore', pdfFile)
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: submitData,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', scoreAcf: '', message: '' })
        setPdfFile(null)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) {
        setPdfFile(file)
      } else if (file.size > 10 * 1024 * 1024) {
        alert('Le fichier est trop volumineux (max 10 MB)')
        e.target.value = ''
      } else {
        alert('Veuillez sélectionner un fichier PDF')
        e.target.value = ''
      }
    }
  }

  const removeFile = () => {
    setPdfFile(null)
    const fileInput = document.getElementById('pdf-upload') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contacter un expert ACF®
          </h1>
          <p className="text-xl text-gray-600">
            Échangez avec notre équipe pour discuter de votre Score ACF® et de votre stratégie de souveraineté opérationnelle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Demande de contact
            </h2>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-green-900 mb-2">Message envoyé ! ✅</h3>
                    <p className="text-green-800 mb-3">
                      Vous allez recevoir un email de confirmation avec un lien pour réserver votre créneau.
                    </p>
                    <div className="space-y-1 text-sm text-green-700">
                      <p>📧 Vérifiez votre boîte mail (pensez aux spams)</p>
                      <p>📅 Lien Calendly inclus dans l'email de confirmation</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
                <p className="text-red-800">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="jean.dupont@entreprise.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Entreprise *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Score ACF® obtenu (optionnel)
                </label>
                <input
                  type="text"
                  name="scoreAcf"
                  value={formData.scoreAcf}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: 42/100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Joindre votre rapport ACF® (optionnel)
                </label>
                
                {!pdfFile ? (
                  <div className="relative">
                    <input
                      id="pdf-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="w-full flex items-center justify-center px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition"
                    >
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">
                          Cliquez pour sélectionner votre PDF
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF uniquement • Max 10 MB
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-center flex-1 mr-4">
                      <svg className="w-10 h-10 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-900 truncate">
                          {pdfFile.name}
                        </p>
                        <p className="text-xs text-green-700">
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="flex-shrink-0 p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      title="Supprimer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-2">
                  💡 Téléchargez votre PDF depuis la page de résultats et joignez-le ici pour un échange encore plus ciblé.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Décrivez votre besoin et vos attentes..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-6 rounded-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  'Envoyer ma demande'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                En soumettant ce formulaire, vous acceptez d'être recontacté par notre équipe.
              </p>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            
            {/* Pourquoi nous contacter */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border-2 border-primary/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Pourquoi nous contacter ?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Interpréter votre Score ACF® en détail</div>
                    <div className="text-sm text-gray-600">Comprendre vos forces et faiblesses</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Élaborer un plan d'action sur mesure</div>
                    <div className="text-sm text-gray-600">Roadmap adaptée à votre contexte</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Découvrir les modules ACF®</div>
                    <div className="text-sm text-gray-600">Diagnostic complet, constitution agentique</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Préparer votre entreprise à l'économie des agents IA</div>
                    <div className="text-sm text-gray-600">Anticiper les risques et opportunités</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Ce qui se passe ensuite */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📋 Ce qui se passe ensuite
              </h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900">Vous recevez un email de confirmation</div>
                    <div className="text-sm text-gray-600">Avec un lien Calendly pour réserver votre créneau</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900">Vous choisissez votre créneau</div>
                    <div className="text-sm text-gray-600">Consultation de 30 minutes par visio</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900">Échange avec un expert ACF®</div>
                    <div className="text-sm text-gray-600">Gratuit, sans engagement, confidentiel</div>
                  </div>
                </li>
              </ol>
            </div>

            {/* Note importante */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                💡 <strong>Astuce :</strong> Téléchargez votre PDF de résultats depuis la page de diagnostic et 
                joignez-le au formulaire. Cela nous permettra de préparer un échange encore plus ciblé et efficace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
