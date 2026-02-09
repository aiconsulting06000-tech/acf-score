'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ACFRadarChart from '@/components/charts/RadarChart'
import { calculateACFScore } from '@/lib/calculator'
import { generatePDF } from '@/lib/pdf-generator'
import type { FormData } from '@/lib/types'

export default function ResultsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData | null>(null)
  const [score, setScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    const savedData = sessionStorage.getItem('acfFormData')
    const savedScore = sessionStorage.getItem('acfScore')
    
    if (!savedData || !savedScore) {
      router.push('/calculator')
      return
    }

    const data: FormData = JSON.parse(savedData)
    setFormData(data)
    setScore(parseFloat(savedScore))
    setIsLoading(false)
  }, [router])

  if (isLoading || !formData || score === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const result = calculateACFScore(formData)
  
  const getScoreColor = () => {
    if (score >= 80) return 'from-success to-success/80'
    if (score >= 60) return 'from-warning to-warning/80'
    if (score >= 40) return 'from-alert to-alert/80'
    return 'from-red-600 to-red-500'
  }

  const getScoreBgColor = () => {
    if (score >= 80) return 'from-success/10 to-success/5'
    if (score >= 60) return 'from-warning/10 to-warning/5'
    if (score >= 40) return 'from-alert/10 to-alert/5'
    return 'from-red-100 to-red-50'
  }

  const handleDownloadPDF = async () => {
    if (!formData || score === null) return
    
    setIsGeneratingPDF(true)
    try {
      const result = calculateACFScore(formData)
      const pdf = await generatePDF(formData, result, score)
      
      // Generate filename with company name if provided
      const companySlug = formData.company_name 
        ? formData.company_name.toLowerCase().replace(/[^a-z0-9]/g, '-')
        : 'rapport'
      const filename = `acf-score-${companySlug}-${new Date().toISOString().split('T')[0]}.pdf`
      
      pdf.save(filename)
    } catch (error) {
      console.error('Erreur génération PDF:', error)
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
              <Image src="/logo-acf.jpg" alt="ACF Logo" width={40} height={40} className="object-contain" />
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Score ACF®
                </div>
                <div className="text-xs text-gray-500">Calculateur de Souveraineté</div>
              </div>
            </Link>
            <Link 
              href="/calculator"
              className="text-sm text-gray-600 hover:text-primary transition"
            >
              Recalculer →
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Score Principal */}
        <div className={`bg-gradient-to-br ${getScoreBgColor()} border-2 border-gray-200 rounded-3xl p-12 mb-12 text-center shadow-xl`}>
          <div className="inline-flex items-center justify-center bg-white rounded-full px-6 py-2 mb-6 shadow-sm">
            <span className="text-sm font-semibold text-gray-600">Votre Score de Souveraineté</span>
          </div>
          
          <div className={`text-8xl md:text-9xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent mb-4 animate-fadeIn`}>
            {score}
          </div>
          
          <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {result.levelLabel}
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {result.interpretation}
          </p>

          {/* Comparatif Sectoriel */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Comparatif sectoriel
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Moyenne E-commerce</div>
                  <div className="text-3xl font-bold text-gray-400">42</div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg"></div>
                  <div className="relative">
                    <div className="text-sm text-gray-700 font-semibold mb-1">Votre score</div>
                    <div className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
                      {score}
                    </div>
                    {score > 42 && (
                      <div className="text-xs text-success font-semibold mt-1">
                        +{score - 42} pts vs moyenne
                      </div>
                    )}
                    {score < 42 && (
                      <div className="text-xs text-alert font-semibold mt-1">
                        {score - 42} pts vs moyenne
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Top performers</div>
                  <div className="text-3xl font-bold text-success">78+</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                Benchmarks France 2024 (n=500 entreprises e-commerce)
              </p>
            </div>
          </div>

          {/* Bouton Partage LinkedIn */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                const text = `Je viens de mesurer mon Score de Souveraineté ACF® (Agentic Commerce Framework) : ${score}/100 🎯\n\n${result.levelLabel}\n\nDans l'économie des agents IA autonomes, connaissez-vous votre niveau de dépendance aux plateformes ?\n\nCalculez le vôtre gratuitement 👉`;
                const url = typeof window !== 'undefined' ? window.location.origin : '';
                const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`;
                window.open(linkedinUrl, '_blank', 'width=600,height=600');
              }}
              className="inline-flex items-center bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Partager sur LinkedIn
            </button>
            
            <button
              onClick={() => {
                const text = `Mon Score de Souveraineté ACF® : ${score}/100 🎯\n${result.levelLabel}\n\nMesurez le vôtre gratuitement :`;
                const url = typeof window !== 'undefined' ? window.location.origin : '';
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=AgenticCommerce,AIAgents,Ecommerce`;
                window.open(twitterUrl, '_blank', 'width=600,height=600');
              }}
              className="inline-flex items-center bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Partager sur X
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Graphique Radar */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Analyse par dimension
            </h3>
            <ACFRadarChart 
              ds={formData.ds}
              dd={formData.dd}
              dt={formData.dt}
              dtr={formData.dtr_days}
            />
            <p className="text-sm text-gray-500 mt-4 text-center">
              Plus la zone colorée est grande, meilleure est votre souveraineté
            </p>
          </div>

          {/* Détail des contributions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Détail du calcul
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900">Dépendance Structurelle</div>
                  <div className="text-sm text-gray-500">{formData.ds}% du CA via une plateforme</div>
                </div>
                <div className="text-2xl font-bold text-alert">
                  -{result.ds_contribution.toFixed(1)}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900">Dépendance Données</div>
                  <div className="text-sm text-gray-500">{formData.dd}% de données externes</div>
                </div>
                <div className="text-2xl font-bold text-alert">
                  -{result.dd_contribution.toFixed(1)}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900">Dépendance Trafic</div>
                  <div className="text-sm text-gray-500">{formData.dt}% de trafic payant</div>
                </div>
                <div className="text-2xl font-bold text-alert">
                  -{result.dt_contribution.toFixed(1)}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900">Dépendance Trésorerie</div>
                  <div className="text-sm text-gray-500">{formData.dtr_days} jours de CA bloqués</div>
                </div>
                <div className="text-2xl font-bold text-alert">
                  -{result.dtr_contribution.toFixed(1)}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-gray-900 text-lg">Score Final</div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
                    {score}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommandations */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recommandations prioritaires
          </h3>
          
          <div className="space-y-4">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border-l-4 border-primary">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                  {index + 1}
                </div>
                <p className="text-gray-700 flex-1">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="bg-gradient-to-r from-primary to-accent text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF ? (
              <>
                <div className="w-12 h-12 mx-auto mb-3 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                <div className="font-bold text-lg mb-1">Génération en cours...</div>
                <div className="text-sm text-white/80">Veuillez patienter</div>
              </>
            ) : (
              <>
                <svg className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="font-bold text-lg mb-1">Télécharger le rapport PDF</div>
                <div className="text-sm text-white/80">Rapport complet 6 pages</div>
              </>
            )}
          </button>

          <Link
            href="/calculator"
            className="bg-white border-2 border-gray-300 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-primary transition-all group text-center"
          >
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-600 group-hover:text-primary group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <div className="font-bold text-lg mb-1 text-gray-900">Recalculer mon score</div>
            <div className="text-sm text-gray-600">Modifier les paramètres</div>
          </Link>

          <a
            href="mailto:contact@acfscore.com?subject=Demande%20d%27audit%20ACF&body=Bonjour,%0D%0A%0D%0AMon%20score%20ACF%20:%20${score}%0D%0A%0D%0AJe%20souhaite%20en%20savoir%20plus%20sur%20vos%20offres%20d%27audit."
            className="bg-gradient-to-br from-success to-success/80 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group text-center"
          >
            <svg className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div className="font-bold text-lg mb-1">Parler à un expert</div>
            <div className="text-sm text-white/80">Audit personnalisé</div>
          </a>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p className="mb-2">
            Score calculé selon la méthode ACF® (Agentic Commerce Framework)
          </p>
          <p>
            © 2026 Vincent DORANGE - Tous droits réservés
          </p>
        </div>
      </div>
    </main>
  )
}
