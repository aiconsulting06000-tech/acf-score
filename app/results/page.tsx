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

  useEffect(() => {
    const encodedData = localStorage.getItem('acf_results')
    
    if (!encodedData) {
      router.push('/calculator')
      return
    }

    try {
      const savedFormData: ACFFormData = JSON.parse(decodeURIComponent(encodedData))
      const calculatedResults = calculerResultatsACF(savedFormData)
      
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

  const getCoucheExplanation = (coucheNum: number, score: number) => {
    const explanations = {
      1: {
        good: "Excellente structure de gouvernance avec comité actif et charte validée. Vous avez posé les fondations solides pour contrôler vos agents IA.",
        medium: "Gouvernance en construction. Formalisez rapidement votre comité et votre charte pour sécuriser vos décisions avant que les agents ne prennent trop d'autonomie.",
        bad: "Gouvernance absente ou critique. Créez d'urgence un comité avec rôles définis et une charte de souveraineté. Sans cela, vous pilotez à l'aveugle."
      },
      2: {
        good: "Politique de décision claire et documentée. Vos agents connaissent vos priorités business et vos limites de sécurité, ils peuvent optimiser dans le bon cadre.",
        medium: "Politique partiellement définie. Complétez la hiérarchie de vos objectifs et vos seuils critiques pour éviter que les agents n'optimisent les mauvaises métriques.",
        bad: "Pas de politique formalisée. Vos agents décident sans cadre, risque élevé de décisions contraires à vos intérêts stratégiques et financiers."
      },
      3: {
        good: "Système d'agents bien structuré avec mandats clairs et responsables identifiés pour chaque agent. Vous savez qui fait quoi et qui répond de quoi.",
        medium: "Structure partielle. Formalisez les mandats manquants et assignez des responsables à tous les agents pour éviter les zones grises dangereuses.",
        bad: "Agents non documentés. Impossible de savoir qui fait quoi et qui est responsable en cas de problème. Risque juridique et opérationnel majeur."
      },
      4: {
        good: "Supervision exemplaire avec traçabilité complète et mécanisme d'arrêt testé. Vous gardez le contrôle et pouvez auditer ou stopper à tout moment.",
        medium: "Supervision partielle. Complétez vos logs (minimum 3 ans) et testez votre kill switch pour être prêt en cas de crise ou d'audit réglementaire.",
        bad: "Pas de supervision. Vous ne pouvez ni auditer ni arrêter vos agents. Risque juridique majeur (RGPD, AI Act) et impossibilité de corriger les erreurs."
      }
    }

    const level = score >= 20 ? 'good' : score >= 12 ? 'medium' : 'bad'
    return explanations[coucheNum as keyof typeof explanations][level]
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
              <h2 className="text-2xl font-bold text-red-900 mb-2">Situation critique détectée</h2>
              <p className="text-red-800 leading-relaxed">
                Votre score indique une <strong>vulnérabilité majeure</strong>. Sans gouvernance agentique robuste, vous risquez une perte de contrôle opérationnel et des sanctions réglementaires. <strong>Un audit ACF® complet est fortement recommandé.</strong>
              </p>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Vos résultats ACF®</h1>
          <p className="text-xl text-gray-600">Diagnostic complet de votre gouvernance agentique</p>
        </div>

        {/* SCORES RECENTRÉS : Souveraineté - ACF GLOBAL AU MILIEU - Maturité */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Souveraineté */}
          <div className={`rounded-xl shadow-lg p-8 border-2 ${getScoreBg(results.scoreSouverainete)}`}>
            <div className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Score de Souveraineté</div>
            <div className={`text-6xl font-bold ${getScoreColor(results.scoreSouverainete)} mb-2`}>
              {results.scoreSouverainete.toFixed(1)}<span className="text-3xl">/100</span>
            </div>
            <div className="text-sm font-medium text-gray-700 mb-3">{results.interpretationSouverainete}</div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Mesure votre indépendance vis-à-vis des plateformes tierces. Un score élevé signifie que vous contrôlez votre destin commercial.
            </p>
          </div>

          {/* ACF GLOBAL AU MILIEU */}
          <div className={`rounded-xl shadow-xl p-8 border-4 border-primary bg-gradient-to-br from-purple-50 to-pink-50`}>
            <div className="text-sm font-bold text-primary mb-2 uppercase tracking-wide">⭐ Score Global ACF®</div>
            <div className="text-7xl font-bold text-primary mb-2">
              {results.scoreGlobal}<span className="text-4xl">/100</span>
            </div>
            <div className="text-sm font-bold text-gray-800 mb-3">{results.interpretationGlobale}</div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Évalue la robustesse de votre gouvernance sur 4 couches. Un score élevé garantit que vos agents IA travaillent dans vos intérêts.
            </p>
          </div>

          {/* Maturité */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-8 border-2 border-purple-200">
            <div className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Niveau de Maturité</div>
            <div className="text-6xl font-bold text-purple-600 mb-2">
              {results.niveauMaturite}<span className="text-3xl">/3</span>
            </div>
            <div className="text-sm font-medium text-gray-700 mb-3">{results.interpretationMaturite}</div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Degré d'autonomie de vos agents : 0 = règles fixes, 1 = proposition, 2 = décision cadrée (cible), 3 = autonomie apprenante.
            </p>
          </div>
        </div>

        {/* INTERPRÉTATION GLOBALE + CTA */}
        <div className={`rounded-xl p-8 mb-12 border-2 ${
          results.scoreGlobal >= 70 ? 'bg-green-50 border-green-300' :
          results.scoreGlobal >= 50 ? 'bg-blue-50 border-blue-300' :
          results.scoreGlobal >= 30 ? 'bg-orange-50 border-orange-300' :
          'bg-red-50 border-red-300'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${
            results.scoreGlobal >= 70 ? 'text-green-800' :
            results.scoreGlobal >= 50 ? 'text-blue-800' :
            results.scoreGlobal >= 30 ? 'text-orange-800' :
            'text-red-800'
          }`}>
            {results.scoreGlobal >= 70 ? '✅ Excellente gouvernance agentique' :
             results.scoreGlobal >= 50 ? '👍 Gouvernance solide, à renforcer' :
             results.scoreGlobal >= 30 ? '⚠️ Gouvernance fragile, action requise' :
             '🚨 Situation critique, agir d\'urgence'}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {results.scoreGlobal >= 70 ? 'Votre gouvernance agentique est robuste. Vous avez posé les fondations nécessaires pour contrôler vos agents IA. Continuez à affiner votre supervision et restez vigilant face à l\'évolution de l\'autonomie de vos agents.' :
             results.scoreGlobal >= 50 ? 'Vous avez une base correcte mais des zones de fragilité persistent. Sans renforcement rapide, vous risquez une perte de contrôle à mesure que vos agents gagnent en autonomie. Les 3 actions prioritaires ci-dessous sont essentielles.' :
             results.scoreGlobal >= 30 ? 'Votre gouvernance présente des failles critiques. Vous êtes exposé à des décisions IA contraires à vos intérêts business. Une action immédiate est nécessaire pour sécuriser votre organisation avant qu\'un incident majeur ne survienne.' :
             'ALERTE MAXIMALE : Votre organisation est en danger immédiat. Sans gouvernance, vos agents IA peuvent prendre des décisions catastrophiques (érosion de marge, non-conformité, atteinte image). Un audit d\'urgence est impératif.'}
          </p>
          {results.scoreGlobal < 50 && (
            <Link
              href="/contact"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl transition"
            >
              🚨 Planifier un audit d'urgence
            </Link>
          )}
          {results.scoreGlobal >= 50 && results.scoreGlobal < 70 && (
            <Link
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
            >
              📞 Planifier un audit complet
            </Link>
          )}
        </div>

        {/* BANNIÈRE MARCHÉ - VIOLET/ROSE */}
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-2xl shadow-xl p-8 mb-12 border-2 border-purple-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📊 Positionnement marché</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-white/70 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Fourchette basse</div>
              <div className="text-3xl font-bold text-purple-600">{marketStats.lower}</div>
            </div>
            <div className="text-center p-4 bg-white/90 rounded-lg shadow-md">
              <div className="text-sm text-gray-600 mb-1">Moyenne marché</div>
              <div className="text-4xl font-bold text-pink-600">{marketStats.average}</div>
            </div>
            <div className="text-center p-4 bg-white/70 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Fourchette haute</div>
              <div className="text-3xl font-bold text-purple-600">{marketStats.upper}</div>
            </div>
          </div>
          
          <div className="text-center">
            {results.scoreGlobal >= marketStats.average ? (
              <p className="text-lg font-semibold text-green-700">
                ✓ Vous êtes à <strong>+{results.scoreGlobal - marketStats.average} points</strong> au-dessus de la moyenne
              </p>
            ) : (
              <p className="text-lg font-semibold text-red-700">
                ⚠ Vous êtes à <strong>{results.scoreGlobal - marketStats.average} points</strong> en-dessous de la moyenne
              </p>
            )}
            <p className="text-sm text-gray-600 mt-2">{marketStats.source}</p>
          </div>
        </div>

        {/* ANALYSE 4 COUCHES - AVEC EXPLICATIONS PERSONNALISÉES */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Analyse des 4 Couches Opérationnelles</h2>
          
          <div className="space-y-8">
            {[
              { num: 1, nom: 'Couche 1 : Gouvernance & Souveraineté', score: results.scoreCouche1, desc: 'Comité, charte, matrice responsabilités' },
              { num: 2, nom: 'Couche 2 : Politique de Décision', score: results.scoreCouche2, desc: 'Objectifs hiérarchisés, seuils sécurité' },
              { num: 3, nom: 'Couche 3 : Système d\'Agents', score: results.scoreCouche3, desc: 'Mandats explicites, responsables identifiés' },
              { num: 4, nom: 'Couche 4 : Exécution & Supervision', score: results.scoreCouche4, desc: 'Logs 3 ans, kill switch, monitoring' }
            ].map((couche) => {
              const scoreColor = couche.score >= 20 ? 'text-green-600' : couche.score >= 12 ? 'text-orange-600' : 'text-red-600'
              const progressColor = couche.score >= 20 ? 'bg-green-500' : couche.score >= 12 ? 'bg-orange-500' : 'bg-red-500'
              
              return (
                <div key={couche.num} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{couche.nom}</h3>
                      <p className="text-sm text-gray-600">{couche.desc}</p>
                    </div>
                    <div className={`text-4xl font-bold ${scoreColor}`}>{couche.score}/25</div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div className={`${progressColor} h-3 rounded-full transition-all`} style={{ width: `${(couche.score / 25) * 100}%` }}></div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {getCoucheExplanation(couche.num, couche.score)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* PRIORITÉS D'ACTION */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Vos 3 Priorités d'Action</h2>
          <div className="space-y-6">
            {results.priorites.slice(0, 3).map((priorite, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{priorite.titre}</h3>
                  <p className="text-sm text-gray-600">{priorite.description}</p>
                  <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                    Couche {priorite.couche}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition text-center"
          >
            📄 Télécharger le rapport PDF
          </button>
          
          <Link
            href="/contact"
            className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-bold hover:bg-primary hover:text-white transition text-center"
          >
            📞 Planifier un audit complet
          </Link>
          
          <Link
            href="/calculator"
            className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition text-center"
          >
            🔄 Refaire le diagnostic
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
