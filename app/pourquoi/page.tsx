'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PourquoiPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Les 7 Risques Critiques sans Gouvernance Agentique
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Sans cadre structuré, vos agents IA peuvent devenir vos pires ennemis business
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
            <p className="text-sm">
              ⚠️ <strong>73%</strong> des entreprises utilisent des agents IA sans gouvernance formalisée
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Pourquoi la gouvernance agentique est critique ?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Les agents IA autonomes représentent une révolution pour votre business : optimisation en temps réel, décisions data-driven, disponibilité 24/7. Mais cette autonomie cache un risque majeur : <strong>la perte de contrôle stratégique</strong>.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Sans gouvernance structurée, vos agents peuvent prendre des décisions catastrophiques tout en pensant optimiser vos KPIs. Voici les 7 risques critiques que vous devez absolument anticiper.
          </p>
        </div>

        {/* Les 7 risques */}
        <div className="space-y-8">
          
          {/* Risque 1 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border-2 border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Décisions IA contraires à vos intérêts business
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Vos agents optimisent des métriques locales sans vision globale. Exemple : un agent de pricing qui maximise le volume de ventes en détruisant vos marges, ou un chatbot qui promet des délais impossibles pour améliorer la satisfaction immédiate.
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-600">
                  <p className="text-sm text-gray-600">
                    <strong className="text-purple-700">Cas réel :</strong> Une marketplace a perdu 1,2M€ en 3 mois car son agent de recommandation privilégiait les produits low-cost pour maximiser le taux de conversion, détruisant la marge moyenne par commande.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risque 2 */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg p-8 border-2 border-pink-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Perte de contrôle sur votre stratégie commerciale
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Impossible de piloter ou corriger en temps réel. Vos agents prennent des milliers de micro-décisions quotidiennes qui, cumulées, redéfinissent votre positionnement marché sans validation stratégique.
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-pink-600">
                  <p className="text-sm text-gray-600">
                    <strong className="text-pink-700">Impact :</strong> Sans kill switch ni logs détaillés, vous découvrez les dérives 2-3 semaines trop tard, quand les KPIs business s'effondrent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risque 3 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border-2 border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Dépendance critique aux plateformes tierces
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Si Amazon, Google ou Meta bloque votre compte, votre activité s'arrête. Sans diversification ni plan B, un incident technique ou une suspension arbitraire peut paralyser votre entreprise pendant des semaines.
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-600">
                  <p className="text-sm text-gray-600">
                    <strong className="text-purple-700">Chiffre clé :</strong> Les entreprises avec {'>'} 70% de dépendance à une plateforme mettent en moyenne 23 jours à retrouver leur CA normal après un blocage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risque 4 */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg p-8 border-2 border-pink-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Responsabilité juridique sur décisions automatisées
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Vous êtes légalement responsable de TOUTES les décisions de vos agents, même si vous n'avez aucun contrôle sur eux. L'AI Act européen impose des sanctions jusqu'à 35M€ ou 7% du CA mondial pour non-conformité.
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-pink-600">
                  <p className="text-sm text-gray-600">
                    <strong className="text-pink-700">Obligation légale :</strong> Traçabilité complète (3 ans minimum), surveillance humaine, mécanismes d'arrêt d'urgence, documentation des processus décisionnels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risque 5 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border-2 border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Érosion de marge via prix et promos non maîtrisés
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Des agents de pricing dynamique qui appliquent des remises automatiques pour "rester compétitifs" peuvent détruire votre rentabilité en quelques jours. Sans seuils de sécurité, vos marges fondent sans que vous le réalisiez.
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-600">
                  <p className="text-sm text-gray-600">
                    <strong className="text-purple-700">Exemple :</strong> Un pure player a perdu 15 points de marge brute en 2 semaines car son algorithme de pricing a sur-réagi à une guerre des prix concurrentielle, appliquant des baisses sans plancher minimum.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risque 6 */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg p-8 border-2 border-pink-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                6
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Atteinte à l'image de marque
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Vos agents peuvent prendre des décisions ou communiquer de manière non conforme à vos valeurs, votre positionnement ou votre éthique. Une seule campagne mal calibrée peut détruire des années de construction d'image.
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-pink-600">
                  <p className="text-sm text-gray-600">
                    <strong className="text-pink-700">Zone de risque :</strong> Chatbots donnant des réponses inappropriées, agents publicitaires ciblant des audiences sensibles, recommandations produits contraires à vos engagements RSE.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risque 7 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border-2 border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-700 to-pink-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                7
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Incapacité à auditer ou corriger les agents IA
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Sans logs ni traçabilité, impossible de comprendre pourquoi un agent a pris telle décision, de reproduire un comportement problématique, ou de corriger une dérive. Vous pilotez à l'aveugle.
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-600">
                  <p className="text-sm text-gray-600">
                    <strong className="text-purple-700">Conséquence :</strong> En cas de litige client, d'audit réglementaire ou d'incident majeur, vous ne pouvez pas prouver que vos systèmes fonctionnaient correctement. Responsabilité totale engagée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chiffres qui font peur */}
        <div className="mt-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-xl p-8 border-2 border-purple-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Les chiffres qui font peur
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-5xl font-bold text-purple-600 mb-2">73%</div>
              <p className="text-gray-700">des entreprises utilisent des agents IA sans gouvernance formalisée</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-5xl font-bold text-pink-600 mb-2">€2,4M</div>
              <p className="text-gray-700">de pertes moyennes dues à des décisions IA non contrôlées</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-5xl font-bold text-purple-600 mb-2">89%</div>
              <p className="text-gray-700">des dirigeants craignent une perte de contrôle stratégique</p>
            </div>
          </div>
        </div>

        {/* La solution ACF */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 rounded-2xl shadow-xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            L'ACF® vous protège de ces 7 risques
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Le framework ACF® structure votre gouvernance agentique sur 4 couches opérationnelles pour garder le contrôle tout en bénéficiant de l'autonomie IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-bold hover:shadow-2xl transition"
            >
              Évaluer mon risque gratuitement →
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-purple-900/30 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-purple-900/50 transition"
            >
              Parler à un expert
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  )
}
