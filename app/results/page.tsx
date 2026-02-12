'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
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
      setResults(calculatedResults)
      setFormData(savedFormData)
      setLoading(false)
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
    const url = window.location.href
    const text = `J'ai obtenu un Score ACF® de ${results?.scoreGlobal}/100 ! Découvrez votre niveau de souveraineté opérationnelle :`
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400')
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'from-green-500 to-green-600', text: 'text-green-600' }
    if (score >= 60) return { bg: 'from-blue-500 to-blue-600', text: 'text-blue-600' }
    if (score >= 40) return { bg: 'from-orange-500 to-orange-600', text: 'text-orange-600' }
    return { bg: 'from-red-500 to-red-600', text: 'text-red-600' }
  }

  const getMaturiteColor = (niveau: number) => {
    if (niveau === 0) return 'text-gray-600'
    if (niveau === 1) return 'text-blue-600'
    if (niveau === 2) return 'text-green-600'
    return 'text-purple-600'
  }

  const marketStats = getMarketStats()
  const marketPosition = getMarketPosition(results.scoreGlobal)
  
  const getAlertLevel = () => {
    if (results.scoreGlobal < 30) return 'critical'
    if (results.scoreGlobal < 50) return 'warning'
    if (results.scoreGlobal < 70) return 'info'
    return 'success'
  }

  const alertLevel = getAlertLevel()
  const souvColor = getScoreColor(results.scoreSouverainete)
  const globalColor = getScoreColor(results.scoreGlobal)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation Actions */}
        <div className="flex justify-between items-center mb-6">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-primary font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour accueil
          </Link>
          <Link 
            href="/calculator" 
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition"
          >
            🔄 Refaire le diagnostic
          </Link>
        </div>

        {/* Alerte Gravité */}
        {alertLevel === 'critical' && (
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <svg className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-2">⚠️ SITUATION CRITIQUE</h3>
                <p className="text-red-800 font-medium mb-2">
                  Votre score de {results.scoreGlobal}/100 révèle une <strong>absence de gouvernance agentique</strong>. 
                </p>
                <p className="text-red-700">
                  Vous êtes exposé à des risques majeurs : perte de contrôle opérationnel, non-conformité réglementaire, 
                  vulnérabilité aux manipulations externes. <strong>Action immédiate requise.</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {alertLevel === 'warning' && (
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <svg className="w-8 h-8 text-orange-500 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-bold text-orange-900 mb-2">⚠️ GOUVERNANCE INSUFFISANTE</h3>
                <p className="text-orange-800 font-medium mb-2">
                  Score de {results.scoreGlobal}/100 : votre gouvernance existe mais présente des <strong>failles importantes</strong>.
                </p>
                <p className="text-orange-700">
                  Des agents autonomes sans supervision complète représentent un risque élevé. 
                  Priorisez le renforcement des couches les plus faibles.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Score */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Votre Diagnostic ACF®
            </h1>
            <p className="text-xl text-gray-600">
              Évaluation de votre souveraineté opérationnelle
            </p>
          </div>

          {/* Scores principaux - Souveraineté | ACF Global | Maturité */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            
            {/* Score Souveraineté - COULEUR SELON BARÈME */}
            <div className={`bg-gradient-to-br ${souvColor.bg} rounded-xl p-6 text-center text-white shadow-lg`}>
              <div className="text-sm font-semibold mb-2 opacity-90">SCORE DE SOUVERAINETÉ</div>
              <div className="text-6xl font-bold mb-2">
                {results.scoreSouverainete.toFixed(1)}
                <span className="text-3xl opacity-75">/100</span>
              </div>
              <div className="text-sm font-medium opacity-90">
                {results.interpretationSouverainete}
              </div>
            </div>

            {/* Score Global ACF - AU MILIEU - COULEUR SELON BARÈME */}
            <div className={`bg-gradient-to-br ${globalColor.bg} rounded-xl p-6 text-center text-white shadow-lg border-4 border-white`}>
              <div className="text-sm font-semibold mb-2 opacity-90">SCORE GLOBAL ACF®</div>
              <div className="text-6xl font-bold mb-2">
                {results.scoreGlobal}
                <span className="text-3xl opacity-75">/100</span>
              </div>
              <div className="text-sm font-medium mb-3 opacity-90">
                {results.interpretationGlobale}
              </div>
              {/* Comparaison marché */}
              <div className="pt-3 border-t border-white/30">
                <div className="text-xs mb-1 opacity-75">vs Moyenne marché</div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="text-xl font-bold opacity-90">{marketStats.fourchetteMoyenne}</div>
                  {results.scoreGlobal > marketStats.fourchetteMoyenne ? (
                    <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">+{results.scoreGlobal - marketStats.fourchetteMoyenne} pts</span>
                  ) : (
                    <span className="text-sm font-semibold bg-black/20 px-2 py-1 rounded">{results.scoreGlobal - marketStats.fourchetteMoyenne} pts</span>
                  )}
                </div>
              </div>
            </div>

            {/* Niveau Maturité */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 text-center border-2 border-gray-300">
              <div className="text-sm font-semibold text-gray-600 mb-2">NIVEAU DE MATURITÉ</div>
              <div className={`text-6xl font-bold mb-2 ${getMaturiteColor(results.niveauMaturite)}`}>
                {results.niveauMaturite}
                <span className="text-3xl text-gray-500">/3</span>
              </div>
              <div className="text-sm font-medium text-gray-700">
                {results.interpretationMaturite}
              </div>
            </div>
          </div>

          {/* Statistiques marché détaillées */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
            <h3 className="font-bold text-gray-900 mb-3 text-center">📊 Positionnement marché</h3>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Fourchette basse</div>
                <div className={`text-2xl font-bold ${results.scoreGlobal >= marketStats.fourchetteBasse ? 'text-green-600' : 'text-red-600'}`}>
                  {marketStats.fourchetteBasse}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Moyenne</div>
                <div className={`text-2xl font-bold ${results.scoreGlobal >= marketStats.fourchetteMoyenne ? 'text-green-600' : 'text-orange-600'}`}>
                  {marketStats.fourchetteMoyenne}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Fourchette haute</div>
                <div className={`text-2xl font-bold ${results.scoreGlobal >= marketStats.fourchetteHaute ? 'text-green-600' : 'text-gray-400'}`}>
                  {marketStats.fourchetteHaute}
                </div>
              </div>
            </div>
            <p className="text-xs text-center text-gray-600">{marketStats.source}</p>
            {marketPosition === 'faible' && (
              <p className="text-sm text-center text-red-700 font-medium mt-2">
                ⚠️ Vous êtes en-dessous de la fourchette basse. Vos concurrents ont une meilleure gouvernance.
              </p>
            )}
            {marketPosition === 'haute' && (
              <p className="text-sm text-center text-green-700 font-medium mt-2">
                ✅ Excellent ! Vous êtes dans la fourchette haute, au-dessus de la majorité du marché.
              </p>
            )}
            {marketPosition === 'excellence' && (
              <p className="text-sm text-center text-green-700 font-medium mt-2">
                🏆 Exceptionnel ! Vous êtes dans le top 5% des organisations évaluées.
              </p>
            )}
          </div>

          {/* Barème interprétation */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-center">Barème d'interprétation Score Global ACF®</h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center p-3 bg-green-100 rounded-lg border-2 border-green-500">
                <div className="font-bold text-green-800 mb-1">80-100</div>
                <div className="text-xs text-green-700">Excellence</div>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg border-2 border-blue-500">
                <div className="font-bold text-blue-800 mb-1">60-79</div>
                <div className="text-xs text-blue-700">Solide</div>
              </div>
              <div className="text-center p-3 bg-orange-100 rounded-lg border-2 border-orange-500">
                <div className="font-bold text-orange-800 mb-1">40-59</div>
                <div className="text-xs text-orange-700">À renforcer</div>
              </div>
              <div className="text-center p-3 bg-red-100 rounded-lg border-2 border-red-500">
                <div className="font-bold text-red-800 mb-1">0-39</div>
                <div className="text-xs text-red-700">Critique</div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold transition hover:shadow-xl flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Télécharger mon PDF
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Partager mon score
            </button>
          </div>
        </div>

        {/* Modal Partage */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowShareModal(false)}>
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Partager mon score</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full px-4 py-3 bg-black hover:bg-gray-900 text-white rounded-lg font-semibold transition flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter / X
                </button>
                <button
                  onClick={copyLink}
                  className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copier le lien
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full mt-4 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Les 4 Couches */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Analyse des 4 Couches Opérationnelles
          </h2>
          <p className="text-gray-600 mb-8">
            Le framework ACF® repose sur 4 couches interdépendantes. Chaque couche est notée sur 25 points.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { nom: 'Couche 1 : Gouvernance & Souveraineté', score: results.scoreCouche1, desc: 'Comité de gouvernance, charte de souveraineté' },
              { nom: 'Couche 2 : Politique de Décision', score: results.scoreCouche2, desc: 'Objectifs hiérarchisés, seuils de sécurité' },
              { nom: 'Couche 3 : Système d\'Agents', score: results.scoreCouche3, desc: 'Mandat explicite par agent, responsable humain' },
              { nom: 'Couche 4 : Exécution & Supervision', score: results.scoreCouche4, desc: 'Traçabilité complète, mécanisme d\'arrêt d\'urgence' }
            ].map((couche, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{couche.nom}</h3>
                  <span className={`text-3xl font-bold ${couche.score >= 20 ? 'text-green-600' : couche.score >= 12 ? 'text-orange-600' : 'text-red-600'}`}>
                    {couche.score}/25
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className={`h-3 rounded-full ${couche.score >= 20 ? 'bg-green-500' : couche.score >= 12 ? 'bg-orange-500' : 'bg-red-500'}`}
                    style={{ width: `${(couche.score / 25) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">{couche.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommandations RÉDUITES */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Axes d'amélioration prioritaires
          </h2>
          <p className="text-gray-600 mb-6">
            Points clés à travailler pour améliorer votre gouvernance.
          </p>

          <div className="space-y-3 mb-8">
            {results.priorites.map((priorite, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border-l-4 border-primary">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <p className="text-gray-800 flex-1 text-sm">{priorite}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <p className="text-blue-900 font-medium">
              💡 Ces recommandations sont un point de départ. Pour un plan d'action détaillé et sur-mesure, 
              contactez un expert ACF® certifié.
            </p>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Passez à l'action
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Obtenez un audit complet et une roadmap personnalisée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleContactWithScore}
              className="px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:shadow-2xl transition"
            >
              📞 Parler à un expert ACF®
            </button>
            <Link
              href="/pourquoi"
              className="px-8 py-4 bg-white/10 backdrop-blur border-2 border-white rounded-lg font-semibold text-lg hover:bg-white/20 transition"
            >
              ⚠️ Comprendre les risques
            </Link>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Consultation gratuite de 30 minutes • Sans engagement • Confidentiel
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Ce calculateur fournit une évaluation indicative. Pour un audit complet conforme au framework ACF®, 
            contactez un expert certifié.
          </p>
          <p className="mt-2">
            Agentic Commerce Framework® est une méthodologie propriétaire développée par Vincent DORANGE.
          </p>
        </div>
      </div>
    </main>
  )
}
