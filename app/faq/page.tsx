'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Qu'est-ce que la gouvernance agentique ?",
      answer: "La gouvernance agentique est un cadre méthodologique qui permet aux organisations de contrôler, superviser et optimiser les décisions prises par des agents IA autonomes. Elle garantit que ces agents opèrent dans l'intérêt stratégique de l'entreprise, tout en respectant les contraintes réglementaires et éthiques."
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
      question: "Combien de temps prend le diagnostic ?",
      answer: "Le diagnostic complet prend environ 10 minutes. Il est structuré en 7 étapes guidées qui couvrent votre contexte entreprise, votre maturité agentique, vos 4 couches de gouvernance et vos dépendances critiques. Vous obtenez immédiatement vos résultats et un rapport PDF détaillé."
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
      question: "Quels sont les 4 niveaux de maturité agentique ?",
      answer: "Niveau 0 : Règles fixes programmées (pas d'apprentissage). Niveau 1 : Les agents proposent, les humains valident (toute décision finale humaine). Niveau 2 : Les agents décident dans un cadre strict (seuils définis, supervision permanente) - c'est le niveau recommandé. Niveau 3 : Les agents décident et apprennent de manière autonome (nécessite une gouvernance très robuste)."
    },
    {
      question: "Que faire si mon score est faible ?",
      answer: "Un score faible signale des vulnérabilités dans votre gouvernance agentique. Le diagnostic vous fournit 3 actions prioritaires personnalisées pour renforcer les couches les plus critiques. Vous pouvez également planifier un audit complet avec un expert certifié ACF® pour un accompagnement sur mesure."
    },
    {
      question: "Qu'est-ce que le score de souveraineté ?",
      answer: "Le score de souveraineté mesure votre degré d'indépendance vis-à-vis des plateformes tierces (Amazon, Google, Meta, etc.). Il évalue 4 dimensions : dépendance structurelle (% CA), dépendance données, dépendance trafic, et résilience opérationnelle. Un score élevé signifie que vous contrôlez votre destin commercial."
    },
    {
      question: "Mes données sont-elles confidentielles ?",
      answer: "Oui, absolument. Vos réponses sont stockées de manière sécurisée et ne sont jamais partagées avec des tiers. Vous pouvez également compléter le diagnostic de manière anonyme. Le rapport PDF reste votre propriété exclusive."
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
      question: "Puis-je refaire le diagnostic plus tard ?",
      answer: "Oui, vous pouvez refaire le diagnostic autant de fois que vous le souhaitez pour suivre l'évolution de votre gouvernance agentique au fil du temps. C'est même recommandé après avoir mis en place vos actions prioritaires pour mesurer vos progrès."
    },
    {
      question: "Qu'est-ce qu'un audit complet ACF® ?",
      answer: "Un audit complet ACF® est réalisé par un expert certifié qui analyse en profondeur vos systèmes agentiques, votre documentation de gouvernance, vos processus de décision et votre infrastructure de supervision. Il inclut des recommandations détaillées, un plan d'action priorisé et un accompagnement personnalisé."
    },
    {
      question: "Le framework ACF® est-il compatible avec le RGPD et l'AI Act ?",
      answer: "Oui, le framework ACF® intègre par design les exigences du RGPD et de l'AI Act européen. La couche Gouvernance & Souveraineté inclut spécifiquement la conformité réglementaire, la traçabilité des décisions, et les mécanismes de contrôle humain requis par ces réglementations."
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
