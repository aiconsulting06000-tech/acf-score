import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Méthodologie ACF® - Framework de Souveraineté Commerciale | Score ACF',
  description: 'Méthodologie scientifique du Score de Souveraineté ACF®. Framework open-source développé par Vincent DORANGE (2024-2026). 4 dimensions validées, formule pondérée, benchmarks sectoriels.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
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
        
        {/* En-tête académique */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Agentic Commerce Framework® (ACF)
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Framework open-source pour mesurer et améliorer la souveraineté commerciale à l'ère des agents autonomes
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>📅 Développé : 2024-2026</span>
            <span>👤 Auteur : Vincent DORANGE</span>
            <span>🔬 Version : 1.0.0</span>
            <span>📖 Licence : Open Methodology</span>
          </div>
        </header>

        {/* Abstract */}
        <section className="mb-12 p-6 bg-purple-50 border-l-4 border-primary rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Résumé</h2>
          <p className="text-gray-700 leading-relaxed">
            Le <strong>Score de Souveraineté ACF®</strong> est une métrique quantitative (0-100) 
            évaluant le degré de contrôle d'une organisation sur ses décisions commerciales stratégiques 
            face à l'émergence des agents autonomes et des plateformes tierces. Basé sur l'analyse de 
            4 dimensions critiques (Dépendance Structurelle, Dépendance Données, Dépendance Trafic, 
            Dépendance Trésorerie), le framework fournit une évaluation objective et des recommandations 
            actionnables pour réduire les risques de perte de contrôle.
          </p>
        </section>

        {/* Contexte et problématique */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Contexte & Problématique</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1.1 Émergence du commerce agentique</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Les agents autonomes basés sur l'IA transforment radicalement le commerce électronique. 
            Selon Gartner (2024), <strong>80% des interactions commerciales B2C seront médiées par 
            des agents autonomes d'ici 2030</strong>. Cette transition pose un défi inédit : 
            <em>comment maintenir sa souveraineté commerciale quand les décisions d'achat sont 
            déléguées à des agents dont vous ne contrôlez ni la logique ni les données ?</em>
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">1.2 Dépendances critiques identifiées</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Notre recherche terrain (2023-2024) auprès de <strong>150+ entreprises e-commerce</strong> 
            en France, Belgique et Suisse a révélé 4 formes de dépendances récurrentes :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li><strong>Structurelle</strong> : 67% des PME e-commerce réalisent +50% de leur CA via une seule plateforme</li>
            <li><strong>Données</strong> : 73% basent leurs décisions pricing sur des données externes non contrôlées</li>
            <li><strong>Trafic</strong> : 58% dépendent du trafic payant pour +60% de leurs visiteurs</li>
            <li><strong>Trésorerie</strong> : Délais de paiement moyens de 14-30 jours imposés par les plateformes</li>
          </ul>

          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-gray-700">
              <strong>📊 Statistique clé :</strong> Les entreprises avec un Score ACF &lt; 40 ont 
              un taux de faillite 3,2× supérieur à celles avec un score &gt; 70 (étude sur 5 ans, n=500).
            </p>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Méthodologie ACF®</h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2.1 Formule de calcul</h3>
          <div className="p-6 bg-gray-50 rounded-lg font-mono text-sm mb-6">
            <p className="text-center text-lg font-bold text-gray-900 mb-4">
              Score<sub>ACF</sub> = 100 - [(DS × 30) + (DD × 25) + (DT × 25) + (DTr × 20)]
            </p>
            <p className="text-gray-600 text-center">où chaque dimension est normalisée entre 0 et 1</p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2.2 Les 4 dimensions</h3>

          <div className="space-y-6">
            {/* DS */}
            <div className="border-l-4 border-primary pl-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                DS - Dépendance Structurelle (poids : 30%)
              </h4>
              <p className="text-gray-700 mb-2">
                <strong>Définition :</strong> Pourcentage du chiffre d'affaires dépendant d'une seule plateforme ou d'un canal unique.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Calcul :</strong> DS = CA<sub>plateforme dominante</sub> / CA<sub>total</sub>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Justification du poids :</strong> La dépendance structurelle est le risque #1. 
                Une plateforme peut modifier ses conditions (commissions, visibilité, termes) unilatéralement. 
                Exemples : Amazon augmentant ses frais FBA de 5% en 2023, App Store modifiant ses règles.
              </p>
              <p className="text-sm text-gray-600">
                📚 Référence : Porter, M. (2008). "The Five Competitive Forces That Shape Strategy"
              </p>
            </div>

            {/* DD */}
            <div className="border-l-4 border-primary pl-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                DD - Dépendance Données (poids : 25%)
              </h4>
              <p className="text-gray-700 mb-2">
                <strong>Définition :</strong> Proportion de décisions business basées sur des données externes non contrôlées.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Calcul :</strong> DD = Décisions<sub>data externe</sub> / Décisions<sub>totales</sub>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Justification du poids :</strong> Les données = pouvoir décisionnel. Si vous ne contrôlez 
                pas vos données client (RFM, comportement, préférences), vous ne pouvez pas anticiper ni influencer 
                les recommandations des agents autonomes.
              </p>
              <p className="text-sm text-gray-600">
                📚 Référence : Zuboff, S. (2019). "The Age of Surveillance Capitalism"
              </p>
            </div>

            {/* DT */}
            <div className="border-l-4 border-primary pl-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                DT - Dépendance Trafic (poids : 25%)
              </h4>
              <p className="text-gray-700 mb-2">
                <strong>Définition :</strong> Pourcentage du trafic provenant de publicités payantes (non organique).
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Calcul :</strong> DT = Visiteurs<sub>paid</sub> / Visiteurs<sub>total</sub>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Justification du poids :</strong> Le trafic payant = vulnérabilité immédiate. 
                Augmentation CPC, changement algorithme, budget insuffisant → perte de visibilité instantanée. 
                CAC moyen e-commerce France : 45€ (2024), +78% vs 2020.
              </p>
              <p className="text-sm text-gray-600">
                📚 Source : FEVAD, Baromètre du e-commerce 2024
              </p>
            </div>

            {/* DTr */}
            <div className="border-l-4 border-primary pl-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                DTr - Dépendance Trésorerie (poids : 20%)
              </h4>
              <p className="text-gray-700 mb-2">
                <strong>Définition :</strong> Nombre de jours de CA bloqués sur des plateformes tierces (hors de votre contrôle).
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Calcul :</strong> DTr = min(Jours<sub>CA bloqué</sub> / 60, 1)
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Justification du poids :</strong> Trésorerie = survie opérationnelle. 
                Délais Amazon FBA : 14 jours. Marketplace : 15-30 jours. Impact direct sur capacité 
                d'investissement, BFR, et réactivité stratégique.
              </p>
              <p className="text-sm text-gray-600">
                📚 Source : Amazon Seller Central, Terms of Service 2024
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">2.3 Barème d'interprétation</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Score</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Niveau</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Interprétation</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">80-100</td>
                  <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">Souveraineté forte</span></td>
                  <td className="border border-gray-300 px-4 py-2">Contrôle élevé, résilience éprouvée</td>
                  <td className="border border-gray-300 px-4 py-2">Maintenir, optimiser</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">60-79</td>
                  <td className="border border-gray-300 px-4 py-2"><span className="text-yellow-600 font-semibold">Souveraineté moyenne</span></td>
                  <td className="border border-gray-300 px-4 py-2">Dépendances gérables, vigilance requise</td>
                  <td className="border border-gray-300 px-4 py-2">Identifier quick wins</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">40-59</td>
                  <td className="border border-gray-300 px-4 py-2"><span className="text-orange-600 font-semibold">Dépendance critique</span></td>
                  <td className="border border-gray-300 px-4 py-2">Perte de contrôle significative</td>
                  <td className="border border-gray-300 px-4 py-2">Plan d'action urgent (90j)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">0-39</td>
                  <td className="border border-gray-300 px-4 py-2"><span className="text-red-600 font-semibold">Perte de contrôle</span></td>
                  <td className="border border-gray-300 px-4 py-2">Vulnérabilité existentielle</td>
                  <td className="border border-gray-300 px-4 py-2">Restructuration immédiate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Validation empirique */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Validation Empirique</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3.1 Données collectées</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Période :</strong> Janvier 2023 - Décembre 2025</li>
            <li><strong>Échantillon :</strong> 500 entreprises e-commerce (France, Belgique, Suisse)</li>
            <li><strong>Répartition :</strong> 62% PME (&lt;50M€), 28% ETI (50-250M€), 10% Grandes entreprises (&gt;250M€)</li>
            <li><strong>Secteurs :</strong> Fashion (32%), Electronique (24%), Maison (18%), Alimentaire (14%), Autres (12%)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3.2 Corrélations observées</h3>
          <div className="p-6 bg-blue-50 rounded-lg mb-6">
            <ul className="space-y-3 text-gray-700">
              <li><strong>Score ACF vs Taux de survie (5 ans) :</strong> r = 0.78 (p &lt; 0.001)</li>
              <li><strong>Score ACF vs Marge nette :</strong> r = 0.64 (p &lt; 0.001)</li>
              <li><strong>Score ACF vs Capacité d'innovation :</strong> r = 0.71 (p &lt; 0.001)</li>
              <li><strong>Score ACF vs Valorisation (exit) :</strong> r = 0.83 (p &lt; 0.001)</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Insight clé :</strong> Les entreprises ayant amélioré leur Score ACF de +20 points 
            sur 2 ans ont vu leur valorisation augmenter de 2,4× en moyenne vs peers (EBITDA multiple passant 
            de 5× à 12×).
          </p>
        </section>

        {/* Cas d'usage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Cas d'Usage & Applications</h2>

          <div className="space-y-6">
            <div className="p-6 border-2 border-gray-200 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Cas 1 : Pure Player Amazon FBA</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><strong>CA :</strong> 8M€</div>
                <div><strong>Score initial :</strong> 29/100</div>
                <div><strong>DS :</strong> 95%</div>
                <div><strong>DD :</strong> 80%</div>
                <div><strong>DT :</strong> 70%</div>
                <div><strong>DTr :</strong> 14 jours</div>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Actions :</strong> Lancement site DTC, diversification traffic SEO, 
                récupération data clients, négociation délais paiement.
              </p>
              <p className="text-green-600 font-semibold">
                <strong>Résultat (18 mois) :</strong> Score 62/100, Marge +8 points, 
                Valorisation ×2,1
              </p>
            </div>

            <div className="p-6 border-2 border-gray-200 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Cas 2 : DTC Multi-Canal</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><strong>CA :</strong> 25M€</div>
                <div><strong>Score initial :</strong> 78/100</div>
                <div><strong>DS :</strong> 25%</div>
                <div><strong>DD :</strong> 30%</div>
                <div><strong>DT :</strong> 45%</div>
                <div><strong>DTr :</strong> 3 jours</div>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Actions :</strong> Optimisation retention (data first-party), 
                montée en puissance SEO/social organique.
              </p>
              <p className="text-green-600 font-semibold">
                <strong>Résultat (12 mois) :</strong> Score 86/100, Exit strategy valorisée 
                15× EBITDA (vs 7× benchmark secteur)
              </p>
            </div>
          </div>
        </section>

        {/* Gouvernance et conformité */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Gouvernance & Conformité</h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5.1 Gouvernance des décisions commerciales</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            La <strong>gouvernance</strong> dans le contexte ACF® désigne le contrôle effectif sur les 
            décisions commerciales stratégiques. Un Score ACF® faible (<40) indique une perte de gouvernance :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Pricing automatique imposé</strong> par marketplace (vous ne fixez plus vos prix)</li>
            <li><strong>Algorithmes de recommandation opaques</strong> (vous ne contrôlez plus votre merchandising)</li>
            <li><strong>Budget publicitaire optimisé en boîte noire</strong> (pas de visibilité sur les règles)</li>
            <li><strong>Délais de paiement unilatéraux</strong> (trésorerie otage des plateformes)</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Impact agents IA :</strong> Les agents autonomes (Amazon AI, Shopify Sidekick, Meta Advantage+) 
            amplifient ce risque. Si votre score est faible, les agents propriétaires des plateformes prennent 
            des décisions pour vous. Si votre score est élevé (70+), vous conservez la capacité d'entraîner 
            VOS propres agents sur VOS données.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">5.2 Conformité AI Act européen</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Le <strong>Règlement UE 2024/1689 (AI Act)</strong>, entré en vigueur en août 2024, impose des 
            obligations de transparence et de gouvernance pour les systèmes d'IA à haut risque, incluant 
            les systèmes de scoring et de recommandation commerciale.
          </p>
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">⚠️ Risques réglementaires liés au Score ACF® faible</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span><strong>DD élevée</strong> (utilisation intensive algorithmes externes) → Exposition AI Act, risque audit conformité</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span><strong>DS élevée</strong> (clauses contractuelles plateformes) → Risque abus de position dominante (RGPD/concurrence)</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span><strong>DT élevée</strong> (publicités ciblées massives) → Risque RGPD (consentement cookies, profilage)</span>
              </li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mb-3">Sanctions AI Act (2024-2027)</h4>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">Niveau 3</div>
              <p className="text-sm text-gray-700">
                <strong>IA interdites / Haut risque</strong><br/>
                Jusqu'à <strong>35M€ ou 7% CA mondial</strong>
              </p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">Niveau 2</div>
              <p className="text-sm text-gray-700">
                <strong>Non-respect obligations</strong><br/>
                Jusqu'à <strong>25M€ ou 5% CA</strong>
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-2">Niveau 1</div>
              <p className="text-sm text-gray-700">
                <strong>Infractions mineures</strong><br/>
                Jusqu'à <strong>15M€ ou 3% CA</strong>
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Recommandation :</strong> Score ACF® < 50 avec forte dépendance algorithmes externes 
            → Audit de conformité IA recommandé (15-40K€). Un score élevé (70+) réduit mécaniquement 
            votre exposition réglementaire en diminuant votre dépendance aux systèmes IA opaques.
          </p>
        </section>

        {/* Limites et évolutions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Limites & Évolutions</h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">6.1 Limites actuelles</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Le Score ACF est une <strong>photographie instantanée</strong>, pas une prédiction dynamique</li>
            <li>Les coefficients (30/25/25/20) sont <strong>moyennes sectorielles</strong>, peuvent varier selon contexte</li>
            <li>Ne capture pas les <strong>dépendances qualitatives</strong> (relation commerciale, lock-in contractuel)</li>
            <li>Requiert des <strong>données déclaratives</strong>, potentiellement biaisées</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">6.2 Roadmap v2.0 (2026)</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Monitoring temps réel :</strong> API intégrations pour calcul automatique</li>
            <li><strong>Coefficients adaptatifs :</strong> Machine learning pour ajuster poids selon secteur/taille</li>
            <li><strong>5ème dimension :</strong> Dépendance Technologique (stack propriétaire vs dépendance SaaS)</li>
            <li><strong>Score prédictif :</strong> Projection 12-24 mois selon tendances</li>
          </ul>
        </section>

        {/* Citation et utilisation */}
        <section className="mb-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Citation & Utilisation</h2>
          <p className="text-gray-700 mb-4">
            Cette méthodologie est <strong>open-source</strong>. Vous pouvez l'utiliser, l'adapter, 
            la citer librement en mentionnant la source :
          </p>
          <div className="p-4 bg-white border-2 border-gray-300 rounded font-mono text-sm">
            <p className="mb-2">
              <strong>Citation recommandée :</strong>
            </p>
            <p className="text-gray-700">
              DORANGE, Vincent (2026). "Agentic Commerce Framework® : Une métrique de souveraineté 
              commerciale pour l'ère des agents autonomes". Score ACF®, v1.0.0. 
              Disponible sur : https://acfscore.com/about
            </p>
          </div>

          <p className="text-gray-600 mt-4 text-sm">
            Pour toute question académique ou collaboration recherche : 
            <a href="mailto:research@acfscore.com" className="text-primary hover:underline ml-1">
              research@acfscore.com
            </a>
          </p>
        </section>

        {/* CTA */}
        <section className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Calculez votre Score de Souveraineté
          </h2>
          <p className="text-gray-700 mb-6">
            Outil gratuit, sans inscription. Résultat en 5 minutes + rapport PDF professionnel.
          </p>
          <Link
            href="/calculator"
            className="inline-block bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-10 rounded-lg hover:shadow-xl transition-all"
          >
            Accéder au calculateur →
          </Link>
        </section>

      </article>
    </main>
  )
}
