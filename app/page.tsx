import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero avec gradient violet majoritaire → rose bas droite */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Gratuit • Sans inscription • Résultat immédiat
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Êtes-vous prêt pour<br />
              l'ère des agents<br />
              IA autonomes ?
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Évaluez la robustesse de votre gouvernance agentique en 10 minutes. Obtenez votre Score ACF® en 7 étapes et vos recommandations personnalisées.
            </p>
            
            <Link
              href="/calculator"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition"
            >
              Calculer mon score gratuitement →
            </Link>
            
            <p className="text-sm text-white/90 mt-4 flex items-center justify-center gap-4">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                7 étapes guidées
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Rapport PDF complet
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                100% Gratuit
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 1) Qu'est-ce que l'ACF® */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Qu'est-ce que l'Agentic Commerce Framework® ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Le premier cadre méthodologique de gouvernance pour organisations utilisant des agents IA autonomes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Souveraineté Opérationnelle</h3>
            <p className="text-gray-600">Gardez le contrôle de vos décisions stratégiques même lorsque des agents IA opèrent de manière autonome.</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-8 border-2 border-pink-200">
            <div className="text-5xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Conformité Réglementaire</h3>
            <p className="text-gray-600">Respect du RGPD, AI Act et réglementations sectorielles avec une gouvernance structurée.</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border-2 border-purple-300">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Performance & Résilience</h3>
            <p className="text-gray-600">Bénéficiez de l'autonomie agentique tout en maintenant votre résilience économique.</p>
          </div>
        </div>

        {/* 2) Comment ça marche */}
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

        {/* 3) Ce que vous obtenez */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Ce que vous obtenez
          </h2>
          <p className="text-xl text-gray-600">
            Un diagnostic complet et actionnable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Score de Souveraineté</h3>
            <p className="text-gray-600 text-sm">Mesurez votre indépendance face aux plateformes tierces</p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border-2 border-pink-200">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Score Global ACF®</h3>
            <p className="text-gray-600 text-sm">Évaluez vos 4 couches de gouvernance agentique</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-300">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">3 Actions Prioritaires</h3>
            <p className="text-gray-600 text-sm">Plan d'action personnalisé pour sécuriser votre transition</p>
          </div>
        </div>

        {/* 4) Chiffres qui font peur */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 md:p-12 mb-12 border-2 border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Les chiffres qui font peur
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
              <div className="text-5xl font-bold text-red-600 mb-2">73%</div>
              <p className="text-gray-700">des entreprises utilisent des agents IA sans gouvernance formalisée</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
              <div className="text-5xl font-bold text-red-600 mb-2">€2,4M</div>
              <p className="text-gray-700">de pertes moyennes dues à des décisions IA non contrôlées</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
              <div className="text-5xl font-bold text-red-600 mb-2">89%</div>
              <p className="text-gray-700">des dirigeants craignent une perte de contrôle stratégique</p>
            </div>
          </div>
        </div>

        {/* 5) Risques */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-xl p-8 md:p-12 border-2 border-pink-200 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Sans gouvernance agentique robuste, vous risquez :
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Décisions IA contraires à vos intérêts business</h3>
                <p className="text-sm text-gray-600">Agents qui optimisent sans vision globale</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Perte de contrôle sur votre stratégie commerciale</h3>
                <p className="text-sm text-gray-600">Impossibilité de piloter ou corriger en temps réel</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Dépendance critique aux plateformes tierces</h3>
                <p className="text-sm text-gray-600">Blocage Amazon/Google = arrêt de votre activité</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Responsabilité juridique sur décisions automatisées</h3>
                <p className="text-sm text-gray-600">Vous êtes responsable même sans contrôle</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Érosion de marge via prix/promos non maîtrisés</h3>
                <p className="text-sm text-gray-600">Destruction de rentabilité sans supervision</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Atteinte à l'image de marque</h3>
                <p className="text-sm text-gray-600">Actions non conformes à vos valeurs</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 md:col-span-2">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Incapacité à auditer ou corriger les agents IA</h3>
                <p className="text-sm text-gray-600">Sans logs ni traçabilité, impossible de comprendre les erreurs</p>
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

        {/* 6) CTA Final */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Calculez votre score ACF® maintenant
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Diagnostic gratuit en 10 minutes
          </p>
          <Link
            href="/calculator"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-bold hover:shadow-2xl transition"
          >
            Démarrer le diagnostic →
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
