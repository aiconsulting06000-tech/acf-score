import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Méthodologie ACF® - Framework de Souveraineté Commerciale | Score ACF',
  description: 'Méthodologie scientifique du Score de Souveraineté ACF®. Framework propriétaire développé par Vincent DORANGE (2024-2026). 4 dimensions validées, formule pondérée, benchmarks sectoriels.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo-acf.jpg" alt="ACF Logo" width={40} height={40} />
            <div>
              <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Score ACF®</div>
              <div className="text-xs text-gray-500">Méthodologie & Recherche</div>
            </div>
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Agentic Commerce Framework® (ACF)
          </h1>
          <p className="text-xl text-gray-600">
            Méthodologie propriétaire pour mesurer votre souveraineté opérationnelle dans l'économie des agents IA autonomes
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contexte et vision</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              L'émergence des agents IA autonomes transforme radicalement le commerce. Ces agents prennent des décisions d'achat, comparent des offres et négocient sans intervention humaine directe. Dans ce nouveau paradigme, les entreprises doivent repenser leur positionnement stratégique.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le framework ACF® a été développé pour répondre à une question essentielle : comment mesurer et préserver votre capacité à opérer de manière autonome face aux agents IA des plateformes ?
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary p-6 rounded-lg mb-6">
              <p className="text-gray-800 font-semibold mb-2">
                📋 Framework propriétaire
              </p>
              <p className="text-gray-700">
                L'Agentic Commerce Framework® est un cadre méthodologique propriétaire développé par Vincent DORANGE (2024-2026). Les concepts de haut niveau sont accessibles publiquement pour favoriser la compréhension des enjeux. Les outils de certification et d'audit complet restent propriétaires.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Les 4 dimensions du Score ACF®</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Dépendance Structurelle (DS) - 30%</h3>
                <p className="text-gray-700">
                  Mesure la concentration de votre chiffre d'affaires auprès d'agents IA de plateformes tierces. Une dépendance élevée signifie qu'une plateforme contrôle l'accès à vos clients via ses agents.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Dépendance Décisionnelle (DD) - 25%</h3>
                <p className="text-gray-700">
                  Évalue votre capacité à prendre des décisions stratégiques basées sur vos propres données et vos propres agents IA, plutôt que de dépendre d'algorithmes externes.
                </p>
              </div>

              <div className="border-l-4 border-success pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Dépendance au Trafic (DT) - 25%</h3>
                <p className="text-gray-700">
                  Quantifie votre dépendance aux agents publicitaires (Meta Ads, Google Ads) pour générer du trafic qualifié. Plus cette dépendance est forte, plus vous êtes vulnérable aux changements d'algorithmes.
                </p>
              </div>

              <div className="border-l-4 border-warning pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Dépendance Transactionnelle (DTr) - 20%</h3>
                <p className="text-gray-700">
                  Mesure votre capacité à récupérer votre trésorerie rapidement sans dépendre de cycles de paiement imposés par des intermédiaires.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Formule de calcul</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-lg font-mono text-center mb-4">
                Score ACF® = 100 - (DS × 0.30 + DD × 0.25 + DT × 0.25 + DTr × 0.20)
              </p>
              <p className="text-sm text-gray-600 text-center">
                Chaque dimension est normalisée sur une échelle de 0 à 100
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interprétation des scores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-2">80-100 : Souverain</h3>
                <p className="text-green-700">
                  Forte autonomie opérationnelle. Capacité à naviguer l'économie des agents IA avec vos propres systèmes.
                </p>
              </div>
              <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-2">60-79 : Partiellement souverain</h3>
                <p className="text-blue-700">
                  Dépendances limitées mais gérables. Opportunités d'amélioration identifiables.
                </p>
              </div>
              <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">40-59 : Dépendant</h3>
                <p className="text-yellow-700">
                  Dépendances significatives qui limitent votre autonomie. Action recommandée.
                </p>
              </div>
              <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg">
                <h3 className="text-xl font-bold text-red-800 mb-2">0-39 : Captif</h3>
                <p className="text-red-700">
                  Forte dépendance structurelle. Vulnérabilité critique face aux plateformes.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gouvernance et conformité</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le Score ACF® s'inscrit dans une démarche de conformité proactive face aux réglementations émergentes sur l'IA, notamment l'AI Act européen. Il aide les organisations à :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Identifier les zones de risque liées à l'utilisation d'agents IA externes</li>
              <li>Documenter les processus décisionnels critiques</li>
              <li>Établir des mécanismes de gouvernance adaptés</li>
              <li>Préparer les audits de conformité</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Limites et avertissements</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <p className="text-gray-800 mb-4">
                <strong>⚠️ Important :</strong> Le Score ACF® est un outil d'évaluation indicatif. Il ne remplace pas :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Un audit juridique complet de vos relations contractuelles</li>
                <li>Une analyse approfondie de vos risques opérationnels</li>
                <li>Un conseil stratégique personnalisé</li>
                <li>Une évaluation de conformité réglementaire formelle</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Évolution du framework</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le framework ACF® est en développement continu. Les futures versions intégreront :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Une taxonomie complète des agents IA (tâches, décision, orchestrateurs, gouverneurs)</li>
              <li>Une échelle de maturité agentique (0-3)</li>
              <li>Des indicateurs de zones non délégables</li>
              <li>18 KPIs complémentaires pour un diagnostic approfondi</li>
              <li>Des modules de constitution agentique</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Auteur et contact</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le framework ACF® a été développé par Vincent DORANGE, consultant en stratégie digitale et IA.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pour toute question méthodologique ou demande de collaboration académique :
              <a href="mailto:research@acfscore.com" className="text-primary hover:underline ml-1">
                research@acfscore.com
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Citation</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 italic mb-4">
                "Ce framework est propriétaire. Les concepts de haut niveau sont accessibles publiquement pour favoriser la sensibilisation aux enjeux de souveraineté dans l'économie des agents IA. Pour une utilisation académique ou commerciale, veuillez nous contacter."
              </p>
              <p className="text-gray-600 text-sm">
                DORANGE, V. (2024-2026). Agentic Commerce Framework® - Méthodologie de mesure de la souveraineté opérationnelle. https://acfscore.com
              </p>
            </div>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/" 
              className="text-primary hover:text-accent font-semibold transition"
            >
              ← Retour à l'accueil
            </Link>
            <Link 
              href="/calculator" 
              className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Calculer mon Score ACF® →
            </Link>
          </div>
        </div>

      </article>
    </main>
  )
}
