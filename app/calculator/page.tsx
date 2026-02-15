'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ACFFormData } from '@/lib/acf-calculations'

export default function NewCalculatorPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 7
  
  const [formData, setFormData] = useState<Partial<ACFFormData>>({
    typesAgents: []
  })

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = () => {
    // Encoder et stocker les données
    const encodedData = encodeURIComponent(JSON.stringify(formData))
    localStorage.setItem('acf_results', encodedData)
    router.push('/results')
  }

  const updateFormData = (field: keyof ACFFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleAgent = (type: string) => {
    setFormData(prev => {
      const current = prev.typesAgents || []
      if (current.includes(type)) {
        return { ...prev, typesAgents: current.filter(t => t !== type) }
      } else {
        return { ...prev, typesAgents: [...current, type] }
      }
    })
  }

  const progress = (step / totalSteps) * 100

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Étape {step} sur {totalSteps}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          {/* ÉTAPE 1 : Contexte */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Votre contexte
                </h2>
                <p className="text-gray-600">
                  Commençons par mieux comprendre votre organisation et votre niveau d'adoption des agents IA.
                </p>
              </div>

              <div className="space-y-8 mb-8">
                {/* Secteur */}
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <label className="block text-base font-bold text-gray-900 mb-3">
                    Dans quel secteur opérez-vous ?
                  </label>
                  <select
                    value={formData.secteur || ''}
                    onChange={(e) => updateFormData('secteur', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="ecommerce">E-commerce / Retail</option>
                    <option value="services">Services B2B</option>
                    <option value="industrie">Industrie / Manufacturing</option>
                    <option value="tech">Tech / SaaS</option>
                    <option value="finance">Finance / Assurance</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                {/* Taille */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-4">
                    Taille de votre organisation
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: 'tpe', label: 'TPE (< 10 salariés)' },
                      { value: 'pme', label: 'PME (10-250 salariés)' },
                      { value: 'eti', label: 'ETI (250-5000 salariés)' },
                      { value: 'ge', label: 'Grande Entreprise (> 5000)' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('tailleEntreprise', option.value)}
                        className={`px-4 py-3 border-2 rounded-lg text-left transition ${
                          formData.tailleEntreprise === option.value
                            ? 'border-primary bg-primary/5 text-primary font-semibold'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Présence agents IA */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Avez-vous des agents IA déployés dans votre organisation ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Un agent IA est un système logiciel qui prend des décisions de manière autonome 
                    (ex: ajustement de prix automatique, recommandations produits, gestion de stock).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: 'non', label: 'Non, aucun' },
                      { value: 'quelques', label: 'Oui, quelques-uns' },
                      { value: 'nombreux', label: 'Oui, nombreux' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('presenceAgentsIA', option.value)}
                        className={`px-4 py-3 border-2 rounded-lg text-center transition ${
                          formData.presenceAgentsIA === option.value
                            ? 'border-primary bg-primary/5 text-primary font-semibold'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : Maturité Agentique */}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Maturité agentique
                </h2>
                <p className="text-gray-600">
                  Évaluons le niveau d'autonomie et de gouvernance de vos agents IA.
                </p>
              </div>

              <div className="space-y-6">
                {/* Fonctionnement agents */}
                {formData.presenceAgentsIA !== 'non' && (
                  <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                      Comment fonctionnent vos agents IA actuellement ?
                    </label>
                    <p className="text-sm text-gray-500 mb-3">
                      Cette question détermine votre niveau de maturité agentique (0 à 3).
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          value: 'regles-fixes',
                          label: 'Règles fixes programmées',
                          desc: 'Pas d\'apprentissage, intervention humaine pour toute modification'
                        },
                        {
                          value: 'proposent-humains-valident',
                          label: 'Les agents proposent, les humains valident',
                          desc: 'Toute décision finale prise par un humain'
                        },
                        {
                          value: 'decident-cadre-strict',
                          label: 'Les agents décident dans un cadre strict',
                          desc: 'Seuils définis, zones interdites, supervision permanente'
                        },
                        {
                          value: 'autonomes-apprennent',
                          label: 'Les agents décident et apprennent de manière autonome',
                          desc: 'Large autonomie, apprentissage continu, gouvernance lourde requise'
                        }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateFormData('fonctionnementAgents', option.value)}
                          className={`w-full px-4 py-4 border-2 rounded-lg text-left transition ${
                            formData.fonctionnementAgents === option.value
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`font-semibold mb-1 ${
                            formData.fonctionnementAgents === option.value ? 'text-primary' : 'text-gray-900'
                          }`}>
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-500">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Zones interdites */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Existe-t-il des décisions interdites aux agents ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Les "zones non délégables" sont des décisions qui doivent TOUJOURS rester humaines 
                    (ex: exclusion client, destruction stock, modification conditions générales).
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        value: 'non',
                        label: 'Non, pas formalisé',
                        desc: 'Aucune liste de décisions interdites'
                      },
                      {
                        value: 'oui-non-verrouillees',
                        label: 'Oui, définies mais pas protégées',
                        desc: 'Liste existe mais pas de verrouillage technique'
                      },
                      {
                        value: 'oui-verrouillees',
                        label: 'Oui, définies et verrouillées',
                        desc: 'Impossible techniquement pour un agent d\'y accéder'
                      }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('zonesInterdites', option.value)}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-left transition ${
                          formData.zonesInterdites === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold mb-1 ${
                          formData.zonesInterdites === option.value ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Types d'agents */}
                {formData.presenceAgentsIA !== 'non' && (
                  <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                      Quels types d'agents avez-vous ? (plusieurs choix possibles)
                    </label>
                    <p className="text-sm text-gray-500 mb-3">
                      Cette classification vous aidera à structurer votre gouvernance par type d'agent.
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          value: 'prescripteurs',
                          label: 'Agents prescripteurs (Buyer agent) : Rufus, Shop AI, Klarna AI, AVA, SAP Joule',
                          desc: 'Recommandations produits, discovery client, up-sell'
                        },
                        {
                          value: 'transactionnels',
                          label: 'Agents transactionnels (Pricing) : Pricefx, PROS, Competera, Revionics',
                          desc: 'Pricing dynamique, promotions, négociation B2B'
                        },
                        {
                          value: 'operationnels',
                          label: 'Agents opérationnels (Supply Chain) : Blue Yonder, Kinaxis, o9 Solutions',
                          desc: 'Supply chain, gestion stocks, logistique'
                        },
                        {
                          value: 'conformite',
                          label: 'Agents conformité : OneTrust, TrustArc, Securiti AI, Sift',
                          desc: 'Détection fraude, RGPD, risk management'
                        },
                        {
                          value: 'analytiques',
                          label: 'Agents analytiques (BI) : Tableau AI, ThoughtSpot, Qlik, Domo AI',
                          desc: 'BI, prévisions, insights, A/B testing'
                        }
                      ].map((option) => {
                        const isSelected = (formData.typesAgents || []).includes(option.value)
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => toggleAgent(option.value)}
                            className={`w-full px-4 py-4 border-2 rounded-lg text-left transition flex items-start ${
                              isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 rounded border-2 flex items-center justify-center ${
                              isSelected ? 'bg-primary border-primary' : 'border-gray-300'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className={`font-semibold mb-1 ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                                {option.label}
                              </div>
                              <div className="text-sm text-gray-500">{option.desc}</div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ÉTAPE 3 : Gouvernance (Couche 1) */}
          {step === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Gouvernance & Souveraineté
                </h2>
                <p className="text-gray-600">
                  La gouvernance définit QUI décide, JUSQU'OÙ, et selon QUELS principes. 
                  C'est le socle de votre souveraineté opérationnelle.
                </p>
              </div>

              <div className="space-y-6">
                {/* Comité de gouvernance */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Avez-vous un comité de gouvernance pour piloter vos agents IA ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Un comité réunit direction générale, technique, métier, juridique et sécurité 
                    pour prendre les décisions stratégiques sur l'autonomie agentique.
                  </p>
                  <div className="space-y-3">
                    {[
                      { value: 'non', label: 'Non', desc: 'Pas de comité dédié' },
                      { value: 'en-creation', label: 'En cours de création', desc: 'Projet identifié, pas encore actif' },
                      { value: 'oui-actif', label: 'Oui, actif', desc: 'Réunions régulières, décisions documentées' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('comiteGouvernance', option.value)}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-left transition ${
                          formData.comiteGouvernance === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold mb-1 ${
                          formData.comiteGouvernance === option.value ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Charte de souveraineté */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Existe-t-il une charte ou politique écrite de souveraineté décisionnelle ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Ce document fondateur définit vos principes directeurs, vos valeurs, 
                    et vos engagements concernant l'utilisation d'agents autonomes.
                  </p>
                  <div className="space-y-3">
                    {[
                      { value: 'non', label: 'Non', desc: 'Pas de document' },
                      { value: 'en-redaction', label: 'En rédaction', desc: 'Travail en cours' },
                      { value: 'oui-validee', label: 'Oui, validée et appliquée', desc: 'Document signé, opposable' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('charteSouverainete', option.value)}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-left transition ${
                          formData.charteSouverainete === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold mb-1 ${
                          formData.charteSouverainete === option.value ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 4 : Politique de Décision (Couche 2) */}
          {step === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Politique de décision
                </h2>
                <p className="text-gray-600">
                  La politique transforme vos orientations stratégiques en règles opérationnelles 
                  que vos agents peuvent exécuter.
                </p>
              </div>

              <div className="space-y-6">
                {/* Objectifs hiérarchisés */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Vos objectifs business sont-ils hiérarchisés et pondérés ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Exemple : Rentabilité (40%), Croissance (30%), Conformité (20%), Résilience (10%). 
                    Cette hiérarchie guide les agents en cas de conflit d'objectifs.
                  </p>
                  <div className="space-y-3">
                    {[
                      { value: 'non', label: 'Non, pas formalisés', desc: 'Objectifs flous ou implicites' },
                      { value: 'partiellement', label: 'Partiellement', desc: 'Certains objectifs définis' },
                      { value: 'oui-complet', label: 'Oui, complètement documentés', desc: 'Hiérarchie claire avec pondérations' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('objectifsHierarchises', option.value)}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-left transition ${
                          formData.objectifsHierarchises === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold mb-1 ${
                          formData.objectifsHierarchises === option.value ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seuils de sécurité */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Avez-vous défini des seuils de sécurité non franchissables ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Exemple : Prix vente minimum, remise maximum, délai paiement maximum, stock minimum. 
                    Ces garde-fous protègent votre rentabilité et votre trésorerie.
                  </p>
                  <div className="space-y-3">
                    {[
                      { value: 'non', label: 'Non', desc: 'Pas de seuils définis' },
                      { value: 'partiellement', label: 'Partiellement', desc: 'Certains seuils pour certains agents' },
                      { value: 'oui-tous', label: 'Oui, pour tous les agents', desc: 'Chaque agent a ses limites claires' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('seuilsSecurite', option.value)}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-left transition ${
                          formData.seuilsSecurite === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold mb-1 ${
                          formData.seuilsSecurite === option.value ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 5 : Système d'Agents (Couche 3) */}
          {step === 5 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Système d'agents
                </h2>
                <p className="text-gray-600">
                  Chaque agent doit avoir un mandat clair et un responsable humain identifié. 
                  Cela garantit l'imputabilité et la traçabilité.
                </p>
              </div>

              <div className="space-y-6">
                {/* Mandat explicite */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Chaque agent a-t-il un mandat explicite documenté ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Le mandat définit : objectif de l'agent, données autorisées, limites opérationnelles, 
                    niveau d'autonomie, et modes de fonctionnement.
                  </p>
                  <div className="space-y-3">
                    {[
                      { value: 'non', label: 'Non', desc: 'Pas de documentation formelle' },
                      { value: 'partiellement', label: 'Partiellement', desc: 'Certains agents documentés' },
                      { value: 'oui-tous', label: 'Oui, pour tous', desc: 'Fiche mandat complète par agent' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('mandatExplicite', option.value)}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-left transition ${
                          formData.mandatExplicite === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold mb-1 ${
                          formData.mandatExplicite === option.value ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Responsable humain */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Les agents ont-ils un responsable humain identifié ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Ce responsable assume la décision finale en cas d'incident et valide 
                    les évolutions du mandat de l'agent.
                  </p>
                  <div className="space-y-3">
                    {[
                      { value: 'non', label: 'Non', desc: 'Pas de responsable attribué' },
                      { value: 'certains', label: 'Pour certains agents', desc: 'Responsabilité partielle' },
                      { value: 'oui-tous', label: 'Oui, pour tous', desc: 'Chaque agent a son "owner" humain' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('responsableHumain', option.value)}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-left transition ${
                          formData.responsableHumain === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold mb-1 ${
                          formData.responsableHumain === option.value ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 6 : Supervision (Couche 4) */}
          {step === 6 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Exécution & Supervision
                </h2>
                <p className="text-gray-600">
                  La supervision garantit que vous pouvez tracer, expliquer et arrêter 
                  toute décision agentique à tout moment.
                </p>
              </div>

              <div className="space-y-6">
                {/* Système de logs */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Avez-vous un système d'enregistrement complet des décisions ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Chaque décision doit être enregistrée avec : date/heure, agent, contexte, 
                    logique appliquée, résultat. Conservation minimum : 3 ans.
                  </p>
                  <div className="space-y-3">
                    {[
                      { value: 'non', label: 'Non', desc: 'Pas d\'historique structuré' },
                      { value: 'partiel', label: 'Partiel', desc: 'Certaines décisions tracées' },
                      { value: 'oui-complet', label: 'Oui, complet et pérenne', desc: 'Logs structurés, rétention 3+ ans' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('systemeLogs', option.value)}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-left transition ${
                          formData.systemeLogs === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold mb-1 ${
                          formData.systemeLogs === option.value ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mécanisme d'arrêt */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Existe-t-il un mécanisme d'arrêt d'urgence pour vos agents ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    En cas de dysfonctionnement grave, vous devez pouvoir stopper un agent 
                    immédiatement (en moins de 60 secondes) et reprendre en mode manuel.
                  </p>
                  <div className="space-y-3">
                    {[
                      { value: 'non', label: 'Non', desc: 'Pas de procédure d\'arrêt' },
                      { value: 'oui-non-teste', label: 'Oui, mais pas testé', desc: 'Mécanisme théorique' },
                      { value: 'oui-teste', label: 'Oui, testé régulièrement', desc: 'Tests trimestriels, temps < 60s' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('mecanismeArret', option.value)}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-left transition ${
                          formData.mecanismeArret === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold mb-1 ${
                          formData.mecanismeArret === option.value ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 7 : Dépendances */}
          {step === 7 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Dépendances externes
                </h2>
                <p className="text-gray-600">
                  Mesurons votre dépendance aux plateformes et systèmes externes. 
                  Une dépendance élevée fragilise votre souveraineté.
                </p>
              </div>

              <div className="space-y-6">
                {/* Dépendance structurelle */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-3">
                    Quel % de votre chiffre d'affaires dépend d'agents IA de plateformes tierces ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Plateformes type Amazon, Google Shopping, Meta Ads, où des agents autonomes 
                    contrôlent l'accès à vos clients.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.dependanceStructurelle || 0}
                      onChange={(e) => updateFormData('dependanceStructurelle', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">0%</span>
                      <span className="text-2xl font-bold text-primary">
                        {formData.dependanceStructurelle || 0}%
                      </span>
                      <span className="text-gray-500">100%</span>
                    </div>
                  </div>
                </div>

                {/* Dépendance données */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-3">
                    Quel % de vos décisions sont basées sur des données externes non contrôlées ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Données de pricing concurrent, prévisions tierces, benchmarks externes 
                    que vous ne pouvez pas vérifier ou auditer.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.dependanceDonnees || 0}
                      onChange={(e) => updateFormData('dependanceDonnees', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">0%</span>
                      <span className="text-2xl font-bold text-primary">
                        {formData.dependanceDonnees || 0}%
                      </span>
                      <span className="text-gray-500">100%</span>
                    </div>
                  </div>
                </div>

                {/* Dépendance trafic */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-3">
                    Quel % de votre trafic provient d'agents publicitaires ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Trafic via Google Ads, Meta Ads, TikTok Ads. Le reste est organique, 
                    direct ou via vos propres canaux.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.dependanceTrafic || 0}
                      onChange={(e) => updateFormData('dependanceTrafic', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">0%</span>
                      <span className="text-2xl font-bold text-primary">
                        {formData.dependanceTrafic || 0}%
                      </span>
                      <span className="text-gray-500">100%</span>
                    </div>
                  </div>
                </div>

                {/* Jours bloqués */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base font-bold text-gray-900 mb-3">
                    Combien de jours de chiffre d'affaires sont bloqués hors de votre contrôle ?
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Délais de paiement imposés par plateformes ou intermédiaires. 
                    Plus c'est élevé, plus votre trésorerie est fragile.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={formData.joursBloquesCA || 0}
                      onChange={(e) => updateFormData('joursBloquesCA', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">0 jours</span>
                      <span className="text-2xl font-bold text-primary">
                        {formData.joursBloquesCA || 0} jours
                      </span>
                      <span className="text-gray-500">90 jours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            {step > 1 && (
              <button
                onClick={handlePrev}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Précédent
              </button>
            )}
            
            {step < totalSteps ? (
              <button
                onClick={handleNext}
                className="ml-auto px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center"
              >
                Suivant
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:shadow-lg transition text-lg"
              >
                Voir mes résultats 🎯
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
