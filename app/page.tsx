import Link from 'next/link'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-dark via-primary to-accent text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Gratuit • Sans inscription • Résultat immédiat</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">
              Êtes-vous prêt pour l'économie des agents IA autonomes ?
            </h1>
            
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-6 border border-white/30">
              <p className="text-sm font-semibold">
                ACF® = <span className="text-yellow-300">Agentic Commerce Framework</span>
              </p>
            </div>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-8 text-balance">
              Évaluez votre gouvernance agentique en 7 étapes.
              <br className="hidden sm:block" />
              Obtenez votre <strong>Score ACF®</strong> et vos recommandations personnalisées.
            </p>
            
            <Link 
              href="/calculator" 
              className="inline-flex items-center bg-white text-primary hover:bg-gray-100 font-bold py-4 px-10 rounded-lg text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Calculer mon score gratuitement
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-purple-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                7 étapes guidées
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Rapport PDF complet
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% Gratuit
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is ACF Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Qu'est-ce que l'Agentic Commerce Framework® ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Le premier cadre méthodologique de gouvernance pour organisations utilisant des agents IA autonomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Souveraineté Opérationnelle</h3>
              <p className="text-gray-700">
                Gardez le contrôle de vos décisions stratégiques même lorsque des agents IA opèrent de manière autonome.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border-2 border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Conformité Réglementaire</h3>
              <p className="text-gray-700">
                Respect du RGPD, AI Act et réglementations sectorielles avec une gouvernance structurée.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border-2 border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Performance & Résilience</h3>
              <p className="text-gray-700">
                Bénéficiez de l'autonomie agentique tout en maintenant votre résilience économique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="comment-ca-marche" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Un diagnostic en 7 étapes pour évaluer votre gouvernance agentique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-blue-500">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Contexte</h3>
              <p className="text-sm text-gray-600">
                Secteur, taille, présence d'agents IA
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-purple-500">
              <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Maturité Agentique</h3>
              <p className="text-sm text-gray-600">
                Niveau d'autonomie, types d'agents
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-green-500">
              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mb-4">
                3-6
              </div>
              <h3 className="font-bold text-gray-900 mb-2">4 Couches</h3>
              <p className="text-sm text-gray-600">
                Gouvernance, Politique, Système, Supervision
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-orange-500">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mb-4">
                7
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Dépendances</h3>
              <p className="text-sm text-gray-600">
                Plateformes, données, trafic, trésorerie
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/calculator" 
              className="inline-flex items-center bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-8 rounded-lg hover:shadow-xl transition"
            >
              Démarrer mon diagnostic
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Results Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que vous obtenez
            </h2>
            <p className="text-xl text-gray-600">
              Un diagnostic complet et actionnable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Scores Principaux</h3>
              <p className="text-gray-600">Global ACF®, Souveraineté, Maturité</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Couches Évaluées</h3>
              <p className="text-gray-600">Analyse détaillée par couche /25</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                5+
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Recommandations</h3>
              <p className="text-gray-600">Actions prioritaires personnalisées</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à évaluer votre souveraineté opérationnelle ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Le diagnostic est gratuit, sans inscription, et vous obtenez vos résultats immédiatement.
            </p>
            <Link 
              href="/calculator" 
              className="inline-flex items-center bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition"
            >
              Calculer mon Score ACF®
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4">ACF® Score</div>
              <p className="text-gray-400 mb-4">
                Agentic Commerce Framework® - Méthodologie propriétaire développée par Vincent DORANGE.
              </p>
              <p className="text-sm text-gray-500">
                © 2026 Tous droits réservés.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/pourquoi" className="text-gray-400 hover:text-white transition">
                    Pourquoi ACF®
                  </Link>
                </li>
                <li>
                  <Link href="/calculator" className="text-gray-400 hover:text-white transition">
                    Calculateur
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    CGU
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
