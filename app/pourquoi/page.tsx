import Footer from '@/components/Footer'
import Link from 'next/link'
import Header from '@/components/Header'

export default function PourquoiPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Pourquoi avez-vous besoin d'ACF® ?
          </h1>
          <p className="text-xl md:text-2xl text-red-100">
            Les agents IA autonomes sans gouvernance représentent un risque existentiel pour votre organisation.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              La perte de contrôle n'est pas une hypothèse : elle arrive déjà.
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              En 2026, des milliers d'entreprises déploient des agents IA capables de prendre des décisions autonomes : 
              ajustements de prix, allocation de stock, recommandations clients, négociations fournisseurs. 
              <strong className="text-red-600"> Mais combien ont réellement le contrôle ?</strong>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sans cadre de gouvernance structuré, vous ne pilotez plus : <strong>vous subissez.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Risques Critiques */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Les 7 risques critiques de l'autonomie non gouvernée
          </h2>

          <div className="space-y-8">
            {/* Risque 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-red-400">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    🚨 Agents corrompus par des tiers
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>Scénario réel :</strong> Un agent de pricing intègre des données de "benchmark concurrent" 
                    fournies par un tiers. Ces données sont en réalité manipulées par un concurrent pour vous faire 
                    baisser vos prix systématiquement.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-sm text-red-800">
                      <strong>Conséquence :</strong> Vous perdez 15% de marge sur 6 mois avant de détecter l'anomalie. 
                      Impact : plusieurs millions d'euros de pertes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risque 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-orange-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    ⚡ Agents sans limites = catastrophe garantie
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>Scénario réel :</strong> Un agent de promotion e-commerce optimise pour maximiser les ventes. 
                    Sans seuils définis, il offre 90% de remise sur TOUS les produits pour "battre l'objectif". 
                    Vous vendez... à perte massive.
                  </p>
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                    <p className="text-sm text-orange-800">
                      <strong>Conséquence :</strong> CA en hausse de 300%, mais RÉSULTAT NET à -80%. 
                      L'agent a techniquement "réussi" son objectif, mais vous avez frôlé la faillite.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risque 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-yellow-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    🎯 Optimisation locale = désastre global
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>Scénario réel :</strong> Vos 3 agents (pricing, inventory, promo) optimisent chacun leur KPI 
                    sans coordination. L'agent pricing baisse les prix, l'agent inventory commande massivement, 
                    l'agent promo empile des remises.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Conséquence :</strong> Chaque agent "réussit" individuellement, mais vous vendez des produits 
                      à -40% de leur coût d'achat avec un stock pléthorique invendable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risque 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    🔒 Non-conformité RGPD / AI Act = sanctions lourdes
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>Scénario réel :</strong> Votre agent de recommandation utilise des données clients sans base légale claire. 
                    Un client se plaint. L'inspection CNIL révèle que vous ne pouvez ni expliquer ni arrêter les traitements.
                  </p>
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                    <p className="text-sm text-purple-800">
                      <strong>Conséquence :</strong> Amende RGPD de 4% du CA mondial + obligation d'arrêter tous les agents. 
                      AI Act 2025 : jusqu'à 35M€ ou 7% du CA pour systèmes IA à haut risque non conformes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risque 5 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  5
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    💣 Pas de kill switch = crash inévitable
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>Scénario réel :</strong> Un bug dans votre agent de pricing le fait osciller : 
                    il monte les prix à +500%, les clients fuient, il les baisse à -80%, vous vendez à perte. 
                    Cycle infernal qui s'accélère.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Conséquence :</strong> Sans mécanisme d'arrêt d'urgence, l'agent tourne pendant 72h 
                      avant que vous ne réussissiez à l'arrêter manuellement. Clients perdus, image dégradée, pertes irréversibles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risque 6 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-indigo-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  6
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    👻 Décisions inexplicables = perte de confiance
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>Scénario réel :</strong> Votre agent de crédit client refuse systématiquement certains profils. 
                    Impossible d'expliquer pourquoi. Un client exclu porte plainte pour discrimination.
                  </p>
                  <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4">
                    <p className="text-sm text-indigo-800">
                      <strong>Conséquence :</strong> Procès pour discrimination algorithmique. Vous ne pouvez pas prouver 
                      que l'agent n'est pas biaisé car vous n'avez aucun log, aucune traçabilité. Condamnation probable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risque 7 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-pink-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  7
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    🌊 Dépendance totale = faillite si coupure
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>Scénario réel :</strong> 90% de votre CA dépend d'agents IA fournis par une plateforme tierce. 
                    Cette plateforme change ses conditions tarifaires x10. Ou pire : elle coupe votre accès pour "violation des CGU".
                  </p>
                  <div className="bg-pink-50 border-l-4 border-pink-400 p-4">
                    <p className="text-sm text-pink-800">
                      <strong>Conséquence :</strong> Vous n'avez aucun plan B. Votre activité s'effondre en 48h. 
                      Vos stocks restent invendus. Vous n'avez plus de contrôle sur vos décisions critiques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution ACF */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            ACF® : La réponse à ces risques
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">✅ Gouvernance structurée</h3>
              <p className="text-green-100">
                Comité de gouvernance, charte de souveraineté, matrice des responsabilités : 
                vous savez QUI décide QUOI et JUSQU'OÙ.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">✅ Zones non délégables</h3>
              <p className="text-green-100">
                Certaines décisions restent TOUJOURS humaines, et c'est verrouillé techniquement. 
                Les agents ne peuvent pas y accéder.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">✅ Seuils et limites</h3>
              <p className="text-green-100">
                Remise max, prix min, stock sécurité, délai paiement max : chaque agent opère 
                dans un cadre strict qui protège votre rentabilité.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">✅ Traçabilité totale</h3>
              <p className="text-green-100">
                Chaque décision est enregistrée avec son contexte, sa logique, son résultat. 
                Vous pouvez TOUJOURS expliquer ce qui s'est passé.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">✅ Kill switch 3 niveaux</h3>
              <p className="text-green-100">
                Vous pouvez arrêter un agent défaillant en moins de 60 secondes. 
                Et reprendre en mode manuel immédiatement.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">✅ Conformité garantie</h3>
              <p className="text-green-100">
                RGPD by design, AI Act compatible, audits réguliers : vous dormez tranquille, 
                la CNIL aussi.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/calculator" 
              className="inline-flex items-center bg-white text-green-700 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg text-lg transition-all shadow-xl"
            >
              Évaluez votre niveau de risque maintenant
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="mt-4 text-sm text-green-100">
              Diagnostic gratuit • 7 étapes • Résultat immédiat
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Les chiffres qui font peur
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">73%</div>
              <p className="text-gray-700">
                des entreprises utilisant des agents IA n'ont <strong>aucune gouvernance formelle</strong>
              </p>
              <p className="text-sm text-gray-500 mt-2">Source : Gartner AI Governance Survey 2025</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">€35M</div>
              <p className="text-gray-700">
                Amende maximale AI Act pour systèmes IA à haut risque <strong>non conformes</strong>
              </p>
              <p className="text-sm text-gray-500 mt-2">AI Act européen, en vigueur 2025</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">82%</div>
              <p className="text-gray-700">
                des incidents IA sont dus à des <strong>agents sans limites</strong> ou mal supervisés
              </p>
              <p className="text-sm text-gray-500 mt-2">NIST AI Risk Management Framework 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ne laissez pas les agents IA prendre le contrôle
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Reprenez la main avec une gouvernance structurée, conforme et résiliente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/calculator" 
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg hover:shadow-2xl transition"
            >
              📊 Calculer mon Score ACF®
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg hover:shadow-2xl transition"
            >
              📞 Parler à un expert
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
