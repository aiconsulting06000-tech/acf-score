'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface FormData {
  ds: number
  dd: number
  dt: number
  dtr_days: number
  company_name: string
  email: string
  sector: string
}

export default function CalculatorPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5
  
  const [formData, setFormData] = useState<FormData>({
    ds: 50,
    dd: 50,
    dt: 50,
    dtr_days: 15,
    company_name: '',
    email: '',
    sector: 'ecommerce',
  })

  const calculateScore = () => {
    const ds = formData.ds / 100
    const dd = formData.dd / 100
    const dt = formData.dt / 100
    const dtr = Math.min(formData.dtr_days / 60, 1)
    
    const score = 100 - (ds * 30 + dd * 25 + dt * 25 + dtr * 20)
    return Math.round(score * 10) / 10
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem('acfFormData', JSON.stringify(formData))
    sessionStorage.setItem('acfScore', calculateScore().toString())
    router.push('/results')
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const updateField = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <Image src="/logo-acf.jpg" alt="ACF Logo" width={40} height={40} className="object-contain" />
            <div>
              <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Score ACF®
              </div>
              <div className="text-xs text-gray-500">Calculateur de Souveraineté</div>
            </div>
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Step 1: DS */}
          {currentStep === 1 && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent mb-4">
                  <span className="text-white font-bold text-xl">DS</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Dépendance Structurelle
                </h2>
                <p className="text-lg text-gray-600">
                  Quel pourcentage de votre chiffre d'affaires dépend d'une seule plateforme ?
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-semibold text-gray-700">
                      Votre dépendance structurelle
                    </label>
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {formData.ds}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.ds}
                    onChange={(e) => updateField('ds', parseInt(e.target.value))}
                    className="slider w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>0% - Indépendant</span>
                    <span>100% - Totalement dépendant</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Exemple :</strong> Si 80% de vos ventes passent par Amazon → indiquez 80%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: DD */}
          {currentStep === 2 && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent mb-4">
                  <span className="text-white font-bold text-xl">DD</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Dépendance Données
                </h2>
                <p className="text-lg text-gray-600">
                  Quel pourcentage de vos décisions business utilisent des données externes (hors de votre contrôle) ?
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-semibold text-gray-700">
                      Utilisation données externes
                    </label>
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {formData.dd}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.dd}
                    onChange={(e) => updateField('dd', parseInt(e.target.value))}
                    className="slider w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>0% - Données 100% internes</span>
                    <span>100% - Dépendance totale externe</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Exemple :</strong> Pricing basé à 100% sur la concurrence externe → 100%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: DT */}
          {currentStep === 3 && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent mb-4">
                  <span className="text-white font-bold text-xl">DT</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Dépendance Trafic
                </h2>
                <p className="text-lg text-gray-600">
                  Quel pourcentage de votre trafic provient de publicités payantes ?
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-semibold text-gray-700">
                      Trafic payant
                    </label>
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {formData.dt}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.dt}
                    onChange={(e) => updateField('dt', parseInt(e.target.value))}
                    className="slider w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>0% - 100% organique/direct</span>
                    <span>100% - 100% payant (Ads)</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Exemple :</strong> 80% via Google Ads / Facebook Ads → 80%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: DTr */}
          {currentStep === 4 && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent mb-4">
                  <span className="text-white font-bold text-xl">DTr</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Dépendance Trésorerie
                </h2>
                <p className="text-lg text-gray-600">
                  Combien de jours de chiffre d'affaires sont bloqués sur des plateformes (hors de votre contrôle) ?
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-semibold text-gray-700">
                      Jours de CA bloqués
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max="90"
                        value={formData.dtr_days}
                        onChange={(e) => updateField('dtr_days', parseInt(e.target.value) || 0)}
                        className="w-24 text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-right border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-primary focus:outline-none"
                      />
                      <span className="text-xl font-semibold text-gray-600">jours</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={formData.dtr_days}
                    onChange={(e) => updateField('dtr_days', parseInt(e.target.value))}
                    className="slider w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>0 jours - Paiement immédiat</span>
                    <span>90+ jours - Très bloqué</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Exemple :</strong> Amazon bloque vos paiements 15 jours → 15 jours
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Informations optionnelles */}
          {currentStep === 5 && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Informations (optionnel)
                </h2>
                <p className="text-lg text-gray-600">
                  Pour personnaliser votre rapport PDF et recevoir des recommandations adaptées.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom de votre organisation
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => updateField('company_name', e.target.value)}
                    placeholder="Ex: Ma Société"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email (pour recevoir le rapport)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="votre@email.com"
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nous ne partagerons jamais votre email. Pas de spam.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Secteur d'activité
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => updateField('sector', e.target.value)}
                    className="input-field"
                  >
                    <option value="ecommerce">E-commerce / Retail</option>
                    <option value="saas">SaaS / Software</option>
                    <option value="finance">Finance / Assurance</option>
                    <option value="industrie">Industrie / B2B</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-success/10 to-success/5 border-l-4 border-success rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>✓ Prêt !</strong> Cliquez sur "Calculer mon score" pour obtenir vos résultats immédiatement.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-primary'
              }`}
            >
              ← Retour
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all"
              >
                Suivant →
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-success to-success/80 text-white hover:shadow-lg transition-all"
              >
                Calculer mon Score ACF® →
              </button>
            )}
          </div>

          {/* Preview Score */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 p-8 rounded-2xl text-center">
            <p className="text-sm font-semibold text-gray-600 mb-3">Aperçu de votre score</p>
            <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              {calculateScore()}
            </div>
            <p className="text-sm text-gray-500">
              Score de Souveraineté ACF® (provisoire)
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}
