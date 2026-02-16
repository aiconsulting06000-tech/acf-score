'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const faqs = [
  {
    category: "Général",
    questions: [
      {
        q: "Qu'est-ce que le framework ACF® ?",
        a: "ACF® (Agentic Commerce Framework) est un framework de gouvernance pour les agents IA en e-commerce. Il permet d'évaluer, sécuriser et optimiser vos systèmes agentiques selon 7 piliers : Souveraineté, Traçabilité, Alignement Business, Supervision, Conformité, Qualité et Optimisation."
      },
      {
        q: "Pourquoi ai-je besoin d'ACF® ?",
        a: "Sans gouvernance structurée, 73% des entreprises subissent des incidents majeurs (perte moyenne : 2,4M€). ACF® vous aide à éviter ces risques, assurer la conformité AI Act, et optimiser le ROI de vos agents IA."
      },
      {
        q: "Le diagnostic est-il vraiment gratuit ?",
        a: "Oui, le diagnostic ACF® est 100% gratuit, sans engagement et sans carte bancaire. Vous obtenez instantanément votre score, votre niveau de maturité et 3 actions prioritaires."
      },
      {
        q: "Combien de temps prend le diagnostic ?",
        a: "Le diagnostic complet prend environ 10 minutes. Vous pouvez le sauvegarder et le reprendre plus tard si nécessaire."
      },
      {
        q: "Mes données sont-elles confidentielles ?",
        a: "Absolument. Vos données sont chiffrées, stockées en Europe (RGPD), et ne sont jamais partagées avec des tiers. Vous pouvez demander leur suppression à tout moment."
      },
    ]
  },
  {
    category: "Score ACF®",
    questions: [
      {
        q: "Comment est calculé le score ACF® ?",
        a: "Le score est calculé sur 100 points en évaluant 7 piliers : Souveraineté (15 pts), Traçabilité (20 pts), Alignement Business (15 pts), Supervision (15 pts), Conformité (15 pts), Qualité (10 pts), Optimisation (10 pts). Chaque question contribue au score total selon son poids."
      },
      {
        q: "Qu'est-ce qu'un bon score ACF® ?",
        a: "Score < 30 : Critique (risque majeur imminent). Score 30-49 : Fragile (incidents probables). Score 50-69 : Solide (améliorations nécessaires). Score 70+ : Excellent (gouvernance robuste)."
      },
      {
        q: "Puis-je refaire le diagnostic ?",
        a: "Oui, vous pouvez refaire le diagnostic à tout moment pour mesurer vos progrès. Nous recommandons un diagnostic tous les 3-6 mois."
      },
      {
        q: "Le score est-il certifié ?",
        a: "Le score ACF® n'est pas une certification officielle, mais une évaluation objective basée sur les meilleures pratiques et les exigences de l'AI Act européen."
      },
    ]
  },
  {
    category: "Résultats et Rapport",
    questions: [
      {
        q: "Que contient le rapport détaillé ?",
        a: "Le rapport PDF contient : votre score global et par pilier, votre niveau de maturité agentique, 3 actions prioritaires personnalisées, une roadmap de 6 mois, des benchmarks sectoriels, et des recommandations détaillées."
      },
      {
        q: "Puis-je partager mon rapport avec mon équipe ?",
        a: "Oui, le rapport PDF est conçu pour être partagé. Vous pouvez le présenter à votre direction, vos équipes techniques, ou vos investisseurs."
      },
      {
        q: "Comment se compare mon score à celui des autres ?",
        a: "Le rapport inclut des benchmarks anonymisés par secteur et taille d'entreprise. Vous saurez où vous vous situez par rapport à vos pairs."
      },
    ]
  },
  {
    category: "Conformité AI Act",
    questions: [
      {
        q: "ACF® couvre-t-il la conformité AI Act ?",
        a: "Oui, le pilier Conformité évalue spécifiquement votre niveau de préparation à l'AI Act européen : classification des systèmes, documentation, traçabilité, supervision humaine, et gestion des risques."
      },
      {
        q: "Quand l'AI Act entre-t-il en vigueur ?",
        a: "L'AI Act est entré en vigueur progressivement depuis 2024. Les obligations pour les systèmes à haut risque s'appliquent dès maintenant. Non-conformité = amendes jusqu'à 35M€."
      },
      {
        q: "ACF® suffit-il pour être conforme ?",
        a: "ACF® identifie vos gaps de conformité et vous guide dans la mise en œuvre. Pour une validation juridique complète, nous recommandons de consulter un avocat spécialisé."
      },
    ]
  },
  {
    category: "Implémentation",
    questions: [
      {
        q: "Combien coûte l'implémentation d'ACF® ?",
        a: "Le coût dépend de votre niveau de maturité et de vos objectifs. En moyenne : Niveau 0→1 (15-40K€, 2-4 mois), Niveau 1→2 (50-150K€, 3-6 mois), Niveau 2→3 (200-500K€, 6-12 mois)."
      },
      {
        q: "Puis-je implémenter ACF® en interne ?",
        a: "Oui, avec des compétences techniques suffisantes (ML ops, data engineering, conformité). Nous proposons aussi un accompagnement pour accélérer et sécuriser l'implémentation."
      },
      {
        q: "Quel est le ROI d'ACF® ?",
        a: "ROI moyen : 8:1 sur 18 mois. Bénéfices : réduction des incidents (-85%), conformité AI Act assurée, optimisation du ROI des agents IA, et avantage compétitif durable."
      },
      {
        q: "Combien de temps pour voir des résultats ?",
        a: "Quick wins visibles en 2-4 semaines (kill switch, logs basiques). Résultats significatifs en 3-6 mois (réduction incidents, conformité). ROI complet en 12-18 mois."
      },
    ]
  },
  {
    category: "Support et Services",
    questions: [
      {
        q: "Proposez-vous un accompagnement ?",
        a: "Oui, nous proposons : des audits approfondis, de l'accompagnement à l'implémentation, de la formation des équipes, du support continu, et de l'optimisation post-déploiement."
      },
      {
        q: "Puis-je avoir une démo d'ACF® ?",
        a: "Oui, contactez-nous pour une démo personnalisée de 30 minutes. Nous analyserons votre situation et vous montrerons comment ACF® peut vous aider."
      },
      {
        q: "Offrez-vous une garantie ?",
        a: "Nous nous engageons sur les résultats. Si après 6 mois d'implémentation vous n'avez pas réduit vos incidents de 70%, nous travaillons gratuitement jusqu'à atteindre cet objectif."
      },
    ]
  },
  {
    category: "Technique",
    questions: [
      {
        q: "ACF® est-il compatible avec mes outils existants ?",
        a: "Oui, ACF® s'intègre avec les principales plateformes : AWS, Google Cloud, Azure, Shopify, Salesforce, Supabase, et la plupart des outils de ML/Data."
      },
      {
        q: "Dois-je tout reconstruire avec ACF® ?",
        a: "Non, ACF® s'ajoute par-dessus vos systèmes existants. Vous n'avez pas à tout recommencer. L'implémentation est progressive et non-disruptive."
      },
      {
        q: "ACF® ralentit-il mes agents IA ?",
        a: "Non, l'overhead de performance est minimal (<2%). Les logs et le monitoring sont asynchrones et n'impactent pas la latence de vos agents."
      },
    ]
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* HERO */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Questions Fréquentes
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Tout ce que vous devez savoir sur ACF® et la gouvernance agentique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:shadow-2xl transition"
            >
              Calculer mon score ACF®
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-purple-800/50 backdrop-blur-sm text-white rounded-lg font-bold border-2 border-white/30 hover:bg-purple-700/50 transition"
            >
              Parler à un expert
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-purple-600">
              {category.category}
            </h2>
            
            <div className="space-y-4">
              {category.questions.map((faq, qIndex) => {
                const globalIndex = catIndex * 1000 + qIndex
                const isOpen = openIndex === globalIndex
                
                return (
                  <div
                    key={qIndex}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <span className="font-semibold text-gray-900 pr-8">
                        {faq.q}
                      </span>
                      <svg
                        className={`w-6 h-6 text-purple-600 transform transition-transform flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 py-4 bg-gray-50 border-t">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Bottom */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Notre équipe d'experts est là pour vous aider
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:shadow-2xl transition"
          >
            Contactez-nous
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
