'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { calculerResultatsACF, type ACFResults, type ACFFormData } from '@/lib/acf-calculations'
import { downloadPDF } from '@/lib/pdf-generator'
import { getMarketStats, getMarketPosition } from '@/lib/market-stats'

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<ACFResults | null>(null)
  const [formData, setFormData] = useState<ACFFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    const encodedData = localStorage.getItem('acf_results')
    
    if (!encodedData) {
      router.push('/calculator')
      return
    }

    try {
      const savedFormData: ACFFormData = JSON.parse(decodeURIComponent(encodedData))
      const calculatedResults = calculerResultatsACF(savedFormData)
      
      // Fix NaN → 0
      const fixedResults = {
        ...calculatedResults,
        scoreGlobal: isNaN(calculatedResults.scoreGlobal) ? 0 : calculatedResults.scoreGlobal,
        scoreSouverainete: isNaN(calculatedResults.scoreSouverainete) ? 0 : calculatedResults.scoreSouverainete,
        niveauMaturite: isNaN(calculatedResults.niveauMaturite) ? 0 : calculatedResults.niveauMaturite,
        scoreCouche1: isNaN(calculatedResults.scoreCouche1) ? 0 : calculatedResults.scoreCouche1,
        scoreCouche2: isNaN(calculatedResults.scoreCouche2) ? 0 : calculatedResults.scoreCouche2,
        scoreCouche3: isNaN(calculatedResults.scoreCouche3) ? 0 : calculatedResults.scoreCouche3,
        scoreCouche4: isNaN(calculatedResults.scoreCouche4) ? 0 : calculatedResults.scoreCouche4,
      }
      
      setResults(fixedResults)
      setFormData(savedFormData)
      setLoading(false)
      
      // Sauvegarder dans DB
      fetch('/api/save-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...savedFormData, ...fixedResults })
      }).catch(console.error)
    } catch (error) {
      console.error('Erreur calcul résultats:', error)
      router.push('/calculator')
    }
  }, [router])

  const handleDownloadPDF = () => {
    if (results && formData) {
      downloadPDF(results, formData)
    }
  }

  const handleContactWithScore = () => {
    if (results) {
      localStorage.setItem('acf_prefill_score', results.scoreGlobal.toString())
      router.push('/contact')
    }
  }

  const handleShare = (platform: string) => {
    const baseUrl = 'https://acf-score-app.vercel.app'
    const text = `J'ai obtenu un Score ACF® de ${results?.scoreGlobal}/100 ! Découvrez votre niveau de souveraineté opérationnelle`
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(baseUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(baseUrl)}`,
    }
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400')
    }
  }

  const copyLink = () => {
    const baseUrl = 'https://acf-score-app.vercel.app'
    navigator.clipboard.writeText(baseUrl)
    alert('Lien copié !')
  }

  if (loading || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Calcul de vos résultats...</p>
        </div>
      </div>
    )
  }

  const marketStats = getMarketStats()
  const marketPosition = getMarketPosition(results.scoreGlobal)

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200'
    if (score >= 60) return 'bg-blue-50 border-blue-200'
    if (score >= 40) return 'bg-orange-50 border-orange-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {results.scoreGlobal < 30 && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6 mb-8 flex items-start">
            <svg className="w-16 h-16 text-red-600 mr-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-2">
                Situation critique détectée
              </h2>
              <p className="text-red-800 leading-relaxed">
                Votre score indique une <strong>vulnérabilité majeure</strong>. Sans gouvernance agentique,
                vous risquez une perte de contrôle opérationnel et des sanctions réglementaires.
                <strong> Un audit ACF® complet est fortement recommandé.</strong>
              </p>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Vos résultats ACF®
          </h1>
          <p className="text-xl text-gray-600">
            Diagnostic complet de votre souveraineté opérationnelle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className={`rounded-xl shadow-lg p-8 border-2 ${getScoreBg(results.scoreGlobal)} relative`}>
            <div className="relative group/tooltip">
              <svg className="w-5 h-5 text-gray-400 cursor-help absolute top-0 right-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <div className="invisible group-hover/tooltip:visible absolute top-8 right-0 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 z-10 shadow-xl">
                Mesure globale de votre maturité sur les 4 couches ACF® (/100)
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Score Global ACF®</div>
            <div className={`text-6xl font-bold ${getScoreColor(results.scoreGlobal)} mb-2`}>
              {results.scoreGlobal}<span className="text-3xl">/100</span>
            </div>
            <div className="text-sm font-medium text-gray-700">{results.interpretationGlobale}</div>
          </div>

          <div className={`rounded-xl shadow-lg p-8 border-2 ${getScoreBg(results.scoreSouverainete)} relative`}>
            <div className="relative group/tooltip">
              <svg className="w-5 h-5 text-gray-400 cursor-help absolute top-0 right-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <div className="invisible group-hover/tooltip:visible absolute top-8 right-0 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 z-10 shadow-xl">
                Mesure votre capacité à garder le contrôle stratégique sur vos agents IA
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Score de Souveraineté</div>
            <div className={`text-6xl font-bold ${getScoreColor(results.scoreSouverainete)} mb-2`}>
              {results.scoreSouverainete.toFixed(1)}<span className="text-3xl">/100</span>
            </div>
            <div className="text-sm font-medium text-gray-700">{results.interpretationSouverainete}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-8 border-2 border-purple-200 relative">
            <div className="relative group/tooltip">
              <svg className="w-5 h-5 text-gray-400 cursor-help absolute top-0 right-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <div className="invisible group-hover/tooltip:visible absolute top-8 right-0 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 z-10 shadow-xl">
                Niveau d'autonomie actuel de vos agents IA (0-4)
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Niveau de Maturité</div>
            <div className="text-6xl font-bold text-purple-600 mb-2">
              {results.niveauMaturite}<span className="text-3xl">/4</span>
            </div>
            <div className="text-sm font-medium text-gray-700">{results.interpretationMaturite}</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-6">📊 Positionnement marché</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-gray-300 mb-1">Fourchette basse</div>
              <div className="text-2xl font-bold">{marketStats.lower}</div>
            </div>
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-gray-300 mb-1">Moyenne marché</div>
              <div className="text-2xl font-bold text-blue-400">{marketStats.average}</div>
            </div>
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-gray-300 mb-1">Fourchette haute</div>
              <div className="text-2xl font-bold">{marketStats.upper}</div>
            </div>
          </div>

          <div className="text-center">
            {marketPosition === 'faible' && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                <p className="font-semibold">⚠️ Votre score est en-dessous de la fourchette basse du marché</p>
                <p className="text-sm text-gray-300 mt-2">Action urgente recommandée</p>
              </div>
            )}
            {marketPosition === 'bas' && (
              <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4">
                <p className="font-semibold">📊 Vous êtes dans la fourchette basse</p>
                <p className="text-sm text-gray-300 mt-2">Des améliorations significatives sont possibles</p>
              </div>
            )}
            {marketPosition === 'moyen' && (
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <p className="font-semibold">✅ Score dans la moyenne marché</p>
                <p className="text-sm text-gray-300 mt-2">Continuez à progresser vers l'excellence</p>
              </div>
            )}
            {marketPosition === 'haut' && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="font-semibold">🎯 Excellent score, au-dessus de la moyenne</p>
                <p className="text-sm text-gray-300 mt-2">Vous faites partie des entreprises bien préparées</p>
              </div>
            )}
            {marketPosition === 'excellence' && (
              <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                <p className="font-semibold">🏆 Score d'excellence - Top 5%</p>
                <p className="text-sm text-gray-300 mt-2">Gouvernance agentique exemplaire</p>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">{marketStats.source}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Couche 1: Gouvernance</h3>
            <div className={`text-4xl font-bold ${getScoreColor(results.scoreCouche1)} mb-2`}>
              {results.scoreCouche1}<span className="text-xl">/25</span>
            </div>
            <p className="text-sm text-gray-600">Stratégie, objectifs, garde-fous</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Couche 2: Politique</h3>
            <div className={`text-4xl font-bold ${getScoreColor(results.scoreCouche2)} mb-2`}>
              {results.scoreCouche2}<span className="text-xl">/25</span>
            </div>
            <p className="text-sm text-gray-600">Règles métier, conformité</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Couche 3: Système</h3>
            <div className={`text-4xl font-bold ${getScoreColor(results.scoreCouche3)} mb-2`}>
              {results.scoreCouche3}<span className="text-xl">/25</span>
            </div>
            <p className="text-sm text-gray-600">Architecture, sécurité</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Couche 4: Supervision</h3>
            <div className={`text-4xl font-bold ${getScoreColor(results.scoreCouche4)} mb-2`}>
              {results.scoreCouche4}<span className="text-xl">/25</span>
            </div>
            <p className="text-sm text-gray-600">Monitoring, alertes</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🚀 Vos 5 priorités d'action</h2>
          <div className="space-y-4">
            {results.priorites.slice(0, 5).map((priorite, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border-l-4 border-primary">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{priorite.titre}</h3>
                  <p className="text-sm text-gray-600">{priorite.description}</p>
                  <div className="mt-2 inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                    Couche {priorite.couche}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <button
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-primary to-accent text-white py-4 rounded-lg font-semibold hover:shadow-xl transition flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Télécharger PDF</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="bg-white border-2 border-primary text-primary py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Partager</span>
          </button>

          <button
            onClick={handleContactWithScore}
            className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Audit complet</span>
          </button>
        </div>

        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Partager votre score</h3>
                <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
                >
                  <span>Partager sur LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
                >
                  <span>Partager sur X (Twitter)</span>
                </button>
                
                <button
                  onClick={copyLink}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copier le lien</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/calculator"
            className="inline-block text-primary hover:text-accent font-semibold transition"
          >
            ← Refaire le diagnostic
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
