import Header from '@/components/Header'

export default function FAQPage() {
  const faqs = [
    {
      question: "Qu'est-ce que l'Agentic Commerce Framework® ?",
      answer: "L'ACF® est un cadre méthodologique propriétaire de gouvernance pour organisations utilisant des agents IA autonomes. Il repose sur 4 principes fondateurs, 4 couches opérationnelles, et 4 niveaux de maturité agentique. L'objectif : maintenir votre souveraineté opérationnelle tout en bénéficiant de l'autonomie des agents IA."
    },
    {
      question: "Combien de temps prend le diagnostic ?",
      answer: "Le diagnostic complet se fait en 7 étapes et prend environ 10-15 minutes selon votre niveau de préparation. Les questions couvrent votre contexte, votre maturité agentique, les 4 couches opérationnelles, et vos dépendances externes. Vous obtenez vos résultats immédiatement."
    },
    {
      question: "Comment est calculé mon Score ACF® ?",
      answer: "Votre Score Global ACF® (sur 100) est la somme de 4 couches notées chacune sur 25 points : Gouvernance & Souveraineté, Politique de Décision, Système d'Agents, et Exécution & Supervision. Vous obtenez également un Score de Souveraineté (formule mathématique basée sur 4 dépendances) et un Niveau de Maturité Agentique (0 à 3)."
    },
    {
      question: "Qu'est-ce que le Niveau de Maturité Agentique ?",
      answer: "Le Niveau de Maturité mesure l'autonomie de vos agents IA sur une échelle de 0 à 3 : Niveau 0 (automatisation classique sans apprentissage), Niveau 1 (agents assistés qui proposent), Niveau 2 (agents gouvernés qui décident dans un cadre strict - CIBLE RECOMMANDÉE), Niveau 3 (agents autonomes qui apprennent - nécessite gouvernance maximale)."
    },
    {
      question: "Pourquoi le Niveau 2 est-il recommandé ?",
      answer: "Le Niveau 2 (agents gouvernés) offre le meilleur équilibre : vous bénéficiez de l'autonomie agentique (rapidité, optimisation) tout en gardant le contrôle via des seuils, des zones non délégables, et une supervision permanente. C'est le niveau optimal pour 90% des organisations. Le Niveau 3 est réservé aux cas d'usage très spécifiques avec gouvernance lourde."
    },
    {
      question: "Que sont les 'zones non délégables' ?",
      answer: "Ce sont des décisions qui doivent TOUJOURS rester humaines et ne peuvent JAMAIS être confiées à un agent IA, même supervisé. Exemples : exclusion définitive d'un client, destruction de stock, modification des conditions générales, embauche/licenciement. Ces zones sont définies dans votre charte de souveraineté et verrouillées techniquement."
    },
    {
      question: "Mon score est faible, est-ce grave ?",
      answer: "Un score faible (<40/100) révèle une absence de gouvernance structurée. Cela ne signifie pas que vous ne pouvez pas utiliser des agents IA, mais que vous êtes exposé à des risques majeurs : perte de contrôle, non-conformité RGPD/AI Act, vulnérabilité aux manipulations. La bonne nouvelle : ce diagnostic vous permet d'agir AVANT qu'un incident ne survienne."
    },
    {
      question: "Que faire après avoir obtenu mon score ?",
      answer: "1) Analysez vos résultats (3 scores + 4 couches + recommandations). 2) Identifiez vos priorités d'action (quelles couches renforcer en premier). 3) Contactez un expert ACF® pour obtenir un audit complet et une roadmap personnalisée. 4) Implémentez progressivement les 8 modules méthodologiques selon votre contexte."
    },
    {
      question: "Quelles sont les sanctions en cas de non-conformité AI Act ?",
      answer: "L'AI Act européen (en vigueur depuis 2025) prévoit des amendes jusqu'à 35 millions d'euros OU 7% du chiffre d'affaires annuel mondial pour les systèmes IA à haut risque non conformes. Les agents autonomes en contexte commercial peuvent être classés 'haut risque' s'ils prennent des décisions impactant significativement les personnes (pricing discriminatoire, exclusion clients, etc.)."
    },
    {
      question: "L'ACF® est-il compatible avec le RGPD ?",
      answer: "Oui, l'ACF® intègre le RGPD by design. La Couche 4 (Supervision) impose une traçabilité complète des décisions avec conservation 3 ans minimum, permettant de répondre aux droits d'accès, de rectification, et d'explication. La Couche 3 (Système d'Agents) limite les données accessibles par agent au strict nécessaire (moindre privilège)."
    },
    {
      question: "Qu'est-ce qu'un 'kill switch' ?",
      answer: "Le kill switch (mécanisme d'arrêt d'urgence) permet de stopper un agent défaillant en moins de 60 secondes et de basculer en mode manuel immédiatement. L'ACF® recommande 3 niveaux : arrêt agent individuel, arrêt catégorie d'agents, arrêt global. Ces mécanismes doivent être testés trimestriellement pour garantir leur efficacité."
    },
    {
      question: "Combien coûte la mise en conformité ACF® ?",
      answer: "Cela dépend de votre taille, de votre niveau actuel, et de vos objectifs. Un diagnostic complet (Module 1) prend 3-4 semaines. Une implémentation complète (8 modules) s'étale sur 6-18 mois. L'investissement se mesure par rapport aux risques évités : amendes RGPD/AI Act, pertes opérationnelles, dépendance excessive. Contactez un expert pour un chiffrage personnalisé."
    },
    {
      question: "Puis-je implémenter ACF® seul ?",
      answer: "Le calculateur vous donne une première évaluation et des recommandations. Cependant, l'implémentation complète du framework nécessite une expertise spécialisée : cartographie décisionnelle, design système d'agents, architecture technique, conformité réglementaire. Nous recommandons de vous faire accompagner par un expert ACF® certifié, au moins pour les phases critiques."
    },
    {
      question: "ACF® fonctionne-t-il pour mon secteur ?",
      answer: "L'ACF® est un framework sectoriel-agnostique. Il a été conçu initialement pour l'e-commerce mais s'applique à tout secteur utilisant des agents IA autonomes : retail, finance, assurance, industrie, services B2B, logistique, santé. Les principes de gouvernance restent les mêmes ; seules les décisions critiques et les contraintes réglementaires changent."
    },
    {
      question: "Quelle est la différence entre un agent IA et une automatisation classique ?",
      answer: "Une automatisation classique suit des règles fixes (si X alors Y). Un agent IA apprend de son environnement, optimise ses décisions dans le temps, et peut ajuster sa stratégie sans intervention humaine. Un agent autonome (Niveau 2-3) peut prendre des décisions complexes en temps réel dans un cadre défini, contrairement à un script qui exécute une logique figée."
    },
    {
      question: "Le Score de Souveraineté ACF® est-il certifié ?",
      answer: "Le Score de Souveraineté ACF® est une méthodologie propriétaire développée par Vincent DORANGE, protégée par enveloppe Soleau INPI et marque déposée. Ce n'est pas une certification ISO, mais un outil d'auto-évaluation reconnu par les experts en gouvernance agentique. Un audit complet par un expert certifié peut déboucher sur une attestation de conformité ACF®."
    },
    {
      question: "Mes résultats sont-ils confidentiels ?",
      answer: "Oui. Vos réponses et vos scores sont stockés localement dans votre navigateur (localStorage) et ne sont jamais envoyés à nos serveurs. Si vous contactez un expert après le diagnostic, vous partagez volontairement votre score. Nous respectons le RGPD : vos données personnelles ne sont utilisées que pour vous recontacter si vous en faites la demande."
    },
    {
      question: "Puis-je refaire le diagnostic plusieurs fois ?",
      answer: "Absolument. Nous recommandons même de refaire le diagnostic tous les 6 mois pour mesurer votre progression. Vous pouvez aussi faire plusieurs diagnostics pour différentes divisions ou lignes de produits si vos agents IA opèrent de manière distincte. Chaque diagnostic prend 10-15 minutes."
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h1>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur l'Agentic Commerce Framework®
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <summary className="px-6 py-5 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition flex items-center justify-between">
                <span className="flex-1">{faq.question}</span>
                <svg 
                  className="w-5 h-5 text-primary transform group-open:rotate-180 transition-transform flex-shrink-0 ml-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 text-gray-700 border-t border-gray-100 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Vous avez d'autres questions ?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Contactez un expert ACF® pour un échange personnalisé.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-2xl transition"
          >
            Poser ma question
          </a>
        </div>
      </div>
    </main>
  )
}
