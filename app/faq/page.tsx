'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Qu'est-ce que l'Agentic Commerce Framework® ?",
      answer: "L'Agentic Commerce Framework® (ACF®) est une méthodologie propriétaire qui permet aux organisations de structurer, contrôler et optimiser la gouvernance de leurs agents IA autonomes. Il repose sur 4 couches opérationnelles : Gouvernance & Souveraineté, Politique de Décision, Système d'Agents, et Exécution & Supervision. L'ACF® garantit que vos agents IA opèrent dans votre intérêt stratégique tout en respectant les contraintes réglementaires (RGPD, AI Act)."
    },
    {
      question: "Qu'est-ce que la gouvernance agentique ?",
      answer: "La gouvernance agentique est un cadre méthodologique qui permet aux organisations de contrôler, superviser et optimiser les décisions prises par des agents IA autonomes. Elle garantit que ces agents opèrent dans l'intérêt stratégique de l'entreprise, tout en respectant les contraintes réglementaires et éthiques."
    },
    {
      question: "Combien de temps prend le diagnostic ?",
      answer: "Le diagnostic complet prend environ 10 minutes. Il est structuré en 7 étapes guidées qui couvrent votre contexte entreprise, votre maturité agentique, vos 4 couches de gouvernance et vos dépendances critiques. Vous obtenez immédiatement vos résultats et un rapport PDF détaillé."
    },
    {
      question: "Comment est calculé mon Score ACF® ?",
      answer: "Votre Score ACF® est calculé sur 100 points à partir de vos réponses aux 7 étapes du diagnostic. Il agrège 4 scores de couches (chacune sur 25 points) : Gouvernance & Souveraineté (comité, charte, matrice), Politique de Décision (objectifs, seuils, arbitrage), Système d'Agents (mandats, responsables), et Exécution & Supervision (traçabilité, kill switch, monitoring). Chaque réponse est pondérée selon son impact sur la robustesse de votre gouvernance."
    },
    {
      question: "Qu'est-ce que le Niveau de Maturité Agentique ?",
      answer: "Le Niveau de Maturité Agentique mesure l'autonomie décisionnelle de vos agents IA sur une échelle de 0 à 3. Niveau 0 : Règles fixes programmées (pas d'apprentissage). Niveau 1 : Les agents proposent, les humains valident (toute décision finale humaine). Niveau 2 : Les agents décident dans un cadre strict (seuils définis, supervision permanente) - c'est le niveau recommandé. Niveau 3 : Les agents décident et apprennent de manière autonome (nécessite une gouvernance très robuste)."
    },
    {
      question: "Pourquoi le Niveau 2 est-il recommandé ?",
      answer: "Le Niveau 2 (agents décident dans un cadre strict) offre le meilleur équilibre entre efficacité opérationnelle et contrôle stratégique. À ce niveau, vos agents peuvent agir en temps réel pour optimiser vos KPIs, mais restent dans des limites prédéfinies (seuils de prix, budgets max, règles métier). Vous gardez le contrôle sans ralentir l'exécution. Le Niveau 3 (pleine autonomie) requiert une gouvernance exceptionnelle que seules les organisations très matures peuvent assumer."
    },
    {
      question: "Que sont les 'zones non délégables' ?",
      answer: "Les zones non délégables sont les décisions stratégiques qui doivent TOUJOURS rester sous contrôle humain, même avec des agents IA. Exemples : validation finale de campagnes publicitaires sensibles, approbation de partenariats commerciaux majeurs, décisions impactant l'image de marque ou les valeurs de l'entreprise, arbitrages entre objectifs conflictuels (rentabilité vs croissance), gestion de crises ou situations exceptionnelles. Ces zones sont définies dans votre Politique de Décision (Couche 2 de l'ACF®)."
    },
    {
      question: "Mon score est faible, est-ce grave ?",
      answer: "Un score faible (0-49/100) signale des vulnérabilités critiques dans votre gouvernance agentique, mais ce n'est PAS une fatalité. C'est même une opportunité d'agir AVANT qu'un problème majeur ne survienne. Le diagnostic vous fournit 3 actions prioritaires personnalisées pour renforcer rapidement les couches les plus fragiles. Beaucoup d'organisations démarrent avec un score faible et atteignent 70+ en 3-6 mois avec les bons leviers."
    },
    {
      question: "Que faire après avoir obtenu mon score ?",
      answer: "Après le diagnostic, suivez ces étapes : 1) Téléchargez votre rapport PDF complet, 2) Partagez-le avec votre CODIR ou équipe tech, 3) Priorisez les 3 actions recommandées (elles sont classées par impact), 4) Si votre score est < 50, planifiez un audit complet ACF® avec un expert certifié, 5) Implémentez les quick-wins (gouvernance documentée, kill switch, logs 3 ans), 6) Refaites le diagnostic dans 3 mois pour mesurer vos progrès."
    },
    {
      question: "Quelles sont les sanctions en cas de non-conformité AI Act ?",
      answer: "L'AI Act européen prévoit des sanctions financières majeures en cas de non-conformité : jusqu'à 35M€ ou 7% du CA mondial annuel (le montant le plus élevé) pour violations graves (ex: absence de surveillance humaine sur systèmes à haut risque), jusqu'à 15M€ ou 3% du CA pour informations inexactes fournies aux autorités, jusqu'à 7,5M€ ou 1,5% du CA pour non-respect des obligations de transparence. L'ACF® vous aide à structurer la conformité AI Act dès la conception."
    },
    {
      question: "L'ACF® est-il compatible avec le RGPD ?",
      answer: "Oui, le framework ACF® intègre par design les exigences du RGPD. La Couche 1 (Gouvernance & Souveraineté) inclut la conformité réglementaire. La Couche 4 (Exécution & Supervision) impose la traçabilité complète des décisions (logs 3 ans minimum), essentielle pour exercer les droits RGPD (droit d'accès, rectification, opposition). L'ACF® vous oblige également à documenter les finalités de traitement et à désigner des responsables humains pour chaque agent."
    },
    {
      question: "Qu'est-ce qu'un 'kill switch' ?",
      answer: "Un kill switch est un mécanisme d'arrêt d'urgence qui permet de désactiver instantanément un agent IA en cas de comportement anormal ou de crise. Exemples : bouton rouge physique pour couper un agent de pricing qui détruit vos marges, procédure documentée pour stopper un chatbot qui donne des réponses inappropriées, failover automatique vers règles fixes si l'agent dépasse ses seuils. L'ACF® exige un kill switch testé au moins une fois par trimestre."
    },
    {
      question: "Combien coûte la mise en conformité ACF® ?",
      answer: "Le coût varie selon votre maturité initiale et le nombre d'agents. Pour une PME (score 30-50) : 15K-40K€ pour structurer gouvernance + documentation (3-6 mois). Pour une ETI (score 50-70) : 50K-150K€ pour renforcement + certification (6-12 mois). Pour un Groupe (score > 70 ou déploiement multi-BU) : 200K-500K€ pour gouvernance enterprise + accompagnement continu. Le ROI se mesure en risques évités : 1 incident majeur coûte en moyenne 2,4M€."
    },
    {
      question: "Puis-je implémenter ACF® seul ?",
      answer: "Oui pour les quick-wins (documentation basique, kill switch simple, logs). Non pour une certification complète ou un score > 70/100. Raisons : l'ACF® requiert une expertise en gouvernance IA (matrice RACI, politiques de décision, audit technique), les zones critiques (kill switch, conformité AI Act) nécessitent une validation externe, et la certification ACF® impose un audit par un expert agréé. Notre recommandation : démarrez seul sur les fondations, puis faites-vous accompagner pour la certification."
    },
    {
      question: "ACF® fonctionne-t-il pour mon secteur ?",
      answer: "Oui, l'ACF® est sectoriel-agnostique. Il a été testé avec succès dans : E-commerce / Retail (pricing, recommandations, gestion stocks), Services B2B/B2C (chatbots, lead scoring, optimisation rendez-vous), Industrie / Manufacturing (maintenance prédictive, optimisation production, supply chain), Tech / SaaS (agents internes, automatisation support), Finance / Assurance (détection fraude, credit scoring, sinistres). Seules les pondérations et benchmarks sectoriels changent."
    },
    {
      question: "Quelle est la différence entre un agent IA et une automatisation classique ?",
      answer: "Une automatisation classique (RPA, workflow) exécute des règles fixes définies à l'avance (si X alors Y). Un agent IA autonome apprend, s'adapte et optimise ses décisions en fonction du contexte, sans règles exhaustives. Exemple : Automatisation classique = 'Si stock < 10, commander 50 unités'. Agent IA = 'Prédire la demande en analysant historique, saisonnalité, promotions concurrentes, météo, puis optimiser quantité ET timing de commande pour minimiser coûts + ruptures'. L'agent nécessite donc une gouvernance robuste."
    },
    {
      question: "Le Score de Souveraineté ACF® est-il certifié ?",
      answer: "Le Score de Souveraineté ACF® est une métrique propriétaire développée par Vincent DORANGE, non certifiée par un organisme tiers. Il mesure votre degré d'indépendance vis-à-vis des plateformes tierces (Amazon, Google, Meta, etc.) sur 4 dimensions : dépendance structurelle (% CA), dépendance données (% détenues par tiers), dépendance trafic (% sources non-owned), résilience opérationnelle (jours pour retrouver CA si blocage). Il n'a pas de valeur légale mais sert de diagnostic stratégique."
    },
    {
      question: "Mes résultats sont-ils confidentiels ?",
      answer: "Oui, absolument. Vos réponses sont stockées de manière sécurisée et ne sont jamais partagées avec des tiers. Vous pouvez également compléter le diagnostic de manière anonyme. Le rapport PDF reste votre propriété exclusive."
    },
    {
      question: "Puis-je refaire le diagnostic plusieurs fois ?",
      answer: "Oui, vous pouvez refaire le diagnostic autant de fois que vous le souhaitez pour suivre l'évolution de votre gouvernance agentique au fil du temps. C'est même recommandé après avoir mis en place vos actions prioritaires pour mesurer vos progrès. Nous conseillons un diagnostic tous les 3-6 mois pour les organisations en phase d'amélioration active."
    },
    {
      question: "Pourquoi ai-je besoin du score ACF® ?",
      answer: "Le score ACF® vous permet d'évaluer objectivement la robustesse de votre gouvernance agentique sur 4 dimensions critiques : Gouvernance & Souveraineté, Politique de Décision, Système d'Agents, et Exécution & Supervision. Il identifie vos zones de vulnérabilité et vos priorités d'action avant qu'un problème ne survienne."
    },
    {
      question: "Qu'est-ce qu'un agent IA autonome ?",
      answer: "Un agent IA autonome est un système capable de prendre des décisions et d'exécuter des actions sans intervention humaine constante. Exemples : agents de pricing dynamique, chatbots transactionnels, systèmes de recommandation produits, agents d'optimisation logistique. Plus l'agent est autonome, plus la gouvernance doit être robuste."
    },
    {
      question: "Le diagnostic est-il vraiment gratuit ?",
      answer: "Oui, 100% gratuit et sans inscription. Vous obtenez votre score ACF®, votre niveau de maturité agentique, votre positionnement marché et vos 3 actions prioritaires immédiatement. Le rapport PDF complet est également gratuit et téléchargeable."
    },
    {
      question: "Qui a développé la méthodologie ACF® ?",
      answer: "L'Agentic Commerce Framework® a été développé par Vincent DORANGE, expert en gouvernance agentique, diplômé du MIT Sloan et de Columbia University. La méthodologie est basée sur 25 ans d'expérience en e-commerce et IA, et intègre les meilleures pratiques de gouvernance des systèmes autonomes."
    },
    {
      question: "Qu'est-ce qu'un audit complet ACF® ?",
      answer: "Un audit complet ACF® est réalisé par un expert certifié qui analyse en profondeur vos systèmes agentiques, votre documentation de gouvernance, vos processus de décision et votre infrastructure de supervision. Il inclut des recommandations détaillées, un plan d'action priorisé et un accompagnement personnalisé."
    },
    {
      question: "Qu'est-ce que le score de souveraineté ?",
      answer: "Le score de souveraineté mesure votre degré d'indépendance vis-à-vis des plateformes tierces (Amazon, Google, Meta, etc.). Il évalue 4 dimensions : dépendance structurelle (% CA), dépendance données, dépendance trafic, et résilience opérationnelle. Un score élevé signifie que vous contrôlez votre destin commercial."
    },
    {
      question: "Le framework ACF® est-il compatible avec le RGPD et l'AI Act ?",
      answer: "Oui, le framework ACF® intègre par design les exigences du RGPD et de l'AI Act européen. La couche Gouvernance & Souveraineté inclut spécifiquement la conformité réglementaire, la traçabilité des décisions, et les mécanismes de contrôle humain requis par ces réglementations."
    },
    {
      question: "Que contient le rapport PDF ?",
      answer: "Le rapport PDF complet contient : vos 3 scores (Souveraineté, ACF Global, Maturité), votre interprétation personnalisée, votre positionnement marché, vos 3 priorités d'action, l'analyse détaillée des 4 couches opérationnelles, les 7 risques majeurs sans gouvernance, et le contexte complet de votre diagnostic."
    },
    {
      question: "Comment interpréter mon score ACF® ?",
      answer: "Score 70-100 : Excellente gouvernance, fondations solides. Score 50-69 : Gouvernance solide mais zones de fragilité, renforcement recommandé. Score 30-49 : Gouvernance fragile, action requise rapidement. Score 0-29 : Situation critique, audit d'urgence nécessaire. Le diagnostic vous explique précisément les zones à améliorer."
    },
    {
      question: "Que sont les 4 couches opérationnelles de l'ACF® ?",
      answer: "Couche 1 - Gouvernance & Souveraineté : Comité de gouvernance, charte de souveraineté, matrice de responsabilités. Couche 2 - Politique de Décision : Objectifs hiérarchisés, seuils de sécurité, règles d'arbitrage. Couche 3 - Système d'Agents : Mandat explicite par agent, responsable humain identifié. Couche 4 - Exécution & Supervision : Traçabilité complète, kill switch, monitoring temps réel."
    },
    {
      question: "Comment se positionne mon score par rapport au marché ?",
      answer: "Le diagnostic compare votre Score ACF® à la moyenne du marché (basée sur 1 200+ diagnostics réalisés). La fourchette basse représente le percentile 25, la moyenne le percentile 50, et la fourchette haute le percentile 75. Vous voyez immédiatement si vous êtes en avance, dans la moyenne, ou en retard par rapport à vos pairs sectoriels."
    },
    {
      question: "Qu'est-ce qu'une action prioritaire ACF® ?",
      answer: "Une action prioritaire est une recommandation concrète et personnalisée pour renforcer votre gouvernance agentique. Chaque action indique : la couche concernée (1 à 4), le titre de l'action (ex: 'Formaliser votre comité de gouvernance'), la description détaillée (pourquoi c'est critique, comment le faire), et l'impact estimé sur votre score. Les 3 actions sont classées par ordre de priorité selon votre profil."
    },
    {
      question: "Combien d'agents IA dois-je avoir pour faire le diagnostic ?",
      answer: "Vous pouvez faire le diagnostic même sans aucun agent IA actuellement déployé. Le diagnostic évalue également votre préparation et votre capacité à gouverner des agents IA si vous prévoyez d'en déployer. Cela vous permet d'anticiper et de structurer votre gouvernance AVANT de lancer vos premiers agents, ce qui est la meilleure approche."
    },
    {
      question: "Quelle est la durée de validité de mon Score ACF® ?",
      answer: "Votre Score ACF® reflète votre gouvernance au moment du diagnostic. Il reste pertinent 3-6 mois en moyenne, car votre contexte évolue : déploiement de nouveaux agents, changements organisationnels, évolution réglementaire. Nous recommandons de refaire le diagnostic tous les trimestres si vous êtes en phase d'amélioration active, ou tous les 6 mois pour un suivi de maintenance."
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur la gouvernance agentique et le score ACF®
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between text-left py-4 hover:text-primary transition"
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="pb-4 pr-12">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Vous n'avez pas trouvé la réponse à votre question ?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Notre équipe est là pour vous aider
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-bold hover:shadow-2xl transition"
          >
            Contactez-nous
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/calculator"
            className="inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition"
          >
            Calculer mon score ACF® gratuitement →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
