import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Gratuit • Sans inscription • Résultat immédiat
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Êtes-vous prêt pour<br />
            l'économie des agents<br />
            IA autonomes ?
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            <strong>ACF® = Agentic Commerce Framework</strong>
            <br />
            Évaluez votre gouvernance agentique en 7 étapes
          </p>
          
          <Link
            href="/calculator"
            className="inline-block bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition"
          >
            Calculer mon score gratuitement →
          </Link>
          
          <p className="text-sm text-gray-500 mt-4">
            ⏱️ 10-15 minutes • 7 étapes simples
          </p>
        </div>

        {/* Comment ça marche */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Comment ça marche ?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Contexte entreprise</h3>
              <p className="text-sm text-gray-600">Secteur, taille, présence agents IA</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Niveau maturité</h3>
              <p className="text-sm text-gray-600">Fonctionnement actuel de vos agents</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">4 Couches ACF®</h3>
              <p className="text-sm text-gray-600">Gouvernance, Politique, Système, Supervision</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Dépendances</h3>
              <p className="text-sm text-gray-600">Fournisseurs critiques, risques</p>
            </div>
          </div>
        </div>

        {/* Ce que vous obtenez */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">3 scores détaillés</h3>
            <p className="text-gray-600 text-sm">Score Global ACF®, Score de Souveraineté, Niveau de Maturité</p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border-2 border-pink-200">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Analyse 4 Couches</h3>
            <p className="text-gray-600 text-sm">Diagnostic précis de chaque couche opérationnelle (/25 points)</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-300">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">5 recommandations</h3>
            <p className="text-gray-600 text-sm">Actions prioritaires pour améliorer votre gouvernance</p>
          </div>
        </div>

        {/* Risques */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 md:p-12 border-2 border-red-200 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            ⚠️ Sans gouvernance agentique, vous risquez :
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Perte de contrôle opérationnel</h3>
                <p className="text-sm text-gray-600">Agents qui prennent des décisions critiques sans supervision</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Non-conformité réglementaire</h3>
                <p className="text-sm text-gray-600">Amendes jusqu'à 35M€ (AI Act) + 4% CA (RGPD)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Vulnérabilité aux manipulations</h3>
                <p className="text-sm text-gray-600">Données benchmark corrompues par concurrents</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Optimisation locale = désastre global</h3>
                <p className="text-sm text-gray-600">Agent pricing optimise sans voir l'impact supply chain</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/pourquoi"
              className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Découvrir les 7 risques critiques →
            </Link>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Calculez votre Score ACF® maintenant
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Gratuit • 10-15 minutes • Résultats immédiats
          </p>
          <Link
            href="/calculator"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-bold hover:shadow-2xl transition"
          >
            Commencer le diagnostic →
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
