'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { calculerResultatsACF, type ACFResults, type ACFFormData } from '@/lib/acf-calculations'

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<ACFResults | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer les données du localStorage
    const encodedData = localStorage.getItem('acf_results')
    
    if (!encodedData) {
      router.push('/calculator')
      return
    }

    try {
      const formData: ACFFormData = JSON.parse(decodeURIComponent(encodedData))
      const calculatedResults = calculerResultatsACF(formData)
      setResults(calculatedResults)
      setLoading(false)
    } catch (error) {
      console.error('Erreur calcul résultats:', error)
      router.push('/calculator')
    }
  }, [router])

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

  // Couleurs selon le score de souveraineté
  const getSouveraineteColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getSouveraineteBg = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600'
    if (score >= 60) return 'from-blue-500 to-blue-600'
    if (score >= 40) return 'from-orange-500 to-orange-600'
    return 'from-red-500 to-red-600'
  }

  // Couleur niveau maturité
  const getMaturiteColor = (niveau: number) => {
    if (niveau === 0) return 'text-gray-600'
    if (niveau === 1) return 'text-blue-600'
    if (niveau === 2) return 'text-green-600'
    return 'text-purple-600'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo-acf.jpg" alt="ACF Logo" width={50} height={50} />
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Score ACF®
              </div>
              <div className="text-xs text-gray-500">Vos Résultats</div>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Score */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Votre Diagnostic ACF®
            </h1>
            <p className="text-xl text-gray-600">
              Analyse complète de votre souveraineté opérationnelle
            </p>
          </div>

          {/* Scores principaux */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            
            {/* Score Global */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 text-center border-2 border-primary/20">
              <div className="text-sm font-semibold text-gray-600 mb-2">SCORE GLOBAL ACF®</div>
              <div className="text-6xl font-bold text-primary mb-2">
                {results.scoreGlobal}
                <span className="text-3xl text-gray-500">/100</span>
              </div>
              <div className="text-sm font-medium text-gray-700">
                {results.interpretationGlobale}
              </div>
            </div>

            {/* Score Souveraineté */}
            <div className={`bg-gradient-to-br ${getSouveraineteBg(results.scoreSouverainete)} rounded-xl p-6 text-center text-white shadow-lg`}>
              <div className="text-sm font-semibold mb-2 opacity-90">SCORE DE SOUVERAINETÉ</div>
              <div className="text-6xl font-bold mb-2">
                {results.scoreSouverainete.toFixed(1)}
                <span className="text-3xl opacity-75">/100</span>
              </div>
              <div className="text-sm font-medium opacity-90">
                {results.interpretationSouverainete}
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

          {/* Description maturité */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">💡 À propos de votre niveau de maturité</h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              {results.niveauMaturite === 0 && "Vous utilisez principalement des règles fixes et de l'automatisation classique. C'est un bon point de départ, mais vous pourriez gagner en agilité avec des agents assistés (Niveau 1)."}
              {results.niveauMaturite === 1 && "Vos agents proposent des décisions que les humains valident. C'est une approche prudente qui limite les risques. Pour plus d'efficacité, envisagez le Niveau 2 avec un cadre de gouvernance strict."}
              {results.niveauMaturite === 2 && "Excellent ! Le Niveau 2 (agents gouvernés) est la cible recommandée par le framework ACF®. Vous bénéficiez de l'autonomie tout en gardant le contrôle via des seuils et une supervision."}
              {results.niveauMaturite === 3 && "Niveau avancé : vos agents ont une large autonomie et apprennent en continu. Attention : ce niveau nécessite une gouvernance maximale et des contrôles très stricts pour éviter les dérives."}
            </p>
          </div>
        </div>

        {/* Les 4 Couches */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Analyse des 4 Couches Opérationnelles
          </h2>
          <p className="text-gray-600 mb-8">
            Le framework ACF® repose sur 4 couches interdépendantes. Chaque couche est notée sur 25 points.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Couche 1 */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Couche 1 : Gouvernance & Souveraineté
                </h3>
                <span className={`text-3xl font-bold ${results.scoreCouche1 >= 20 ? 'text-green-600' : results.scoreCouche1 >= 12 ? 'text-orange-600' : 'text-red-600'}`}>
                  {results.scoreCouche1}/25
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className={`h-3 rounded-full ${results.scoreCouche1 >= 20 ? 'bg-green-500' : results.scoreCouche1 >= 12 ? 'bg-orange-500' : 'bg-red-500'}`}
                  style={{ width: `${(results.scoreCouche1 / 25) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Comité de gouvernance, charte de souveraineté, matrice des responsabilités
              </p>
            </div>

            {/* Couche 2 */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Couche 2 : Politique de Décision
                </h3>
                <span className={`text-3xl font-bold ${results.scoreCouche2 >= 20 ? 'text-green-600' : results.scoreCouche2 >= 12 ? 'text-orange-600' : 'text-red-600'}`}>
                  {results.scoreCouche2}/25
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className={`h-3 rounded-full ${results.scoreCouche2 >= 20 ? 'bg-green-500' : results.scoreCouche2 >= 12 ? 'bg-orange-500' : 'bg-red-500'}`}
                  style={{ width: `${(results.scoreCouche2 / 25) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Objectifs hiérarchisés, seuils de sécurité, règles d'arbitrage
              </p>
            </div>

            {/* Couche 3 */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Couche 3 : Système d'Agents
                </h3>
                <span className={`text-3xl font-bold ${results.scoreCouche3 >= 20 ? 'text-green-600' : results.scoreCouche3 >= 12 ? 'text-orange-600' : 'text-red-600'}`}>
                  {results.scoreCouche3}/25
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className={`h-3 rounded-full ${results.scoreCouche3 >= 20 ? 'bg-green-500' : results.scoreCouche3 >= 12 ? 'bg-orange-500' : 'bg-red-500'}`}
                  style={{ width: `${(results.scoreCouche3 / 25) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Mandat explicite par agent, responsable humain identifié
              </p>
            </div>

            {/* Couche 4 */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Couche 4 : Exécution & Supervision
                </h3>
                <span className={`text-3xl font-bold ${results.scoreCouche4 >= 20 ? 'text-green-600' : results.scoreCouche4 >= 12 ? 'text-orange-600' : 'text-red-600'}`}>
                  {results.scoreCouche4}/25
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className={`h-3 rounded-full ${results.scoreCouche4 >= 20 ? 'bg-green-500' : results.scoreCouche4 >= 12 ? 'bg-orange-500' : 'bg-red-500'}`}
                  style={{ width: `${(results.scoreCouche4 / 25) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Traçabilité complète, mécanisme d'arrêt d'urgence, monitoring
              </p>
            </div>
          </div>
        </div>

        {/* Agents déployés */}
        {(results.agentsDeployes.prescripteurs || results.agentsDeployes.transactionnels || 
          results.agentsDeployes.operationnels || results.agentsDeployes.conformite || 
          results.agentsDeployes.analytiques) && (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Taxonomie de vos Agents
            </h2>
            <p className="text-gray-600 mb-6">
              Classification de vos agents selon les 5 catégories du framework ACF®.
            </p>
            
            <div className="grid md:grid-cols-5 gap-4">
              {results.agentsDeployes.prescripteurs && (
                <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="font-semibold text-blue-900 text-sm">Prescripteurs</div>
                  <div className="text-xs text-blue-600 mt-1">Recommandations</div>
                </div>
              )}
              {results.agentsDeployes.transactionnels && (
                <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="font-semibold text-green-900 text-sm">Transactionnels</div>
                  <div className="text-xs text-green-600 mt-1">Pricing, Promos</div>
                </div>
              )}
              {results.agentsDeployes.operationnels && (
                <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                  <div className="text-3xl mb-2">📦</div>
                  <div className="font-semibold text-orange-900 text-sm">Opérationnels</div>
                  <div className="text-xs text-orange-600 mt-1">Supply, Stocks</div>
                </div>
              )}
              {results.agentsDeployes.conformite && (
                <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                  <div className="text-3xl mb-2">🛡️</div>
                  <div className="font-semibold text-red-900 text-sm">Conformité</div>
                  <div className="text-xs text-red-600 mt-1">Fraude, RGPD</div>
                </div>
              )}
              {results.agentsDeployes.analytiques && (
                <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="font-semibold text-purple-900 text-sm">Analytiques</div>
                  <div className="text-xs text-purple-600 mt-1">BI, Prévisions</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recommandations */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Recommandations Personnalisées
          </h2>
          <p className="text-gray-600 mb-6">
            Actions prioritaires pour améliorer votre gouvernance agentique.
          </p>

          <div className="space-y-4 mb-8">
            {results.recommandations.map((reco, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border-l-4 border-primary">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <p className="text-gray-800 flex-1">{reco}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
            <h3 className="font-bold text-yellow-900 mb-3">🎯 Priorités d'action</h3>
            <div className="space-y-2">
              {results.priorites.map((priorite, index) => (
                <p key={index} className="text-yellow-800 text-sm">{priorite}</p>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Passez à l'action
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Ce diagnostic est la première étape. Parlons de votre stratégie de souveraineté.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:shadow-2xl transition"
            >
              📞 Parler à un expert ACF®
            </Link>
            <button
              onClick={() => window.print()}
              className="px-8 py-4 bg-white/10 backdrop-blur border-2 border-white rounded-lg font-semibold text-lg hover:bg-white/20 transition"
            >
              🖨️ Imprimer mes résultats
            </button>
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
