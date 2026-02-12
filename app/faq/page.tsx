'use client'

import { useState } from 'react'
import Header from '@/components/Header'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      category: "Définitions",
      questions: [
        {
          q: "Qu'est-ce que l'Agentic Commerce ?",
          a: "L'Agentic Commerce est l'évolution du e-commerce où des agents IA autonomes prennent des décisions opérationnelles (pricing, promotions, stocks, recommandations) en temps réel, sans intervention humaine systématique. Ces agents analysent les données, apprennent des comportements, et optimisent les performances business de manière continue."
        },
        {
          q: "Qu'est-ce que la souveraineté opérationnelle (ou agentique) ?",
          a: "La souveraineté opérationnelle désigne la capacité d'une organisation à garder le contrôle stratégique sur ses opérations même quand des agents IA autonomes prennent des décisions. Cela implique : définir les limites des agents, pouvoir les arrêter, comprendre leurs décisions, et ne pas dépendre entièrement de fournisseurs externes. Un score de souveraineté élevé signifie que vous maîtrisez votre destin opérationnel."
        },
        {
          q: "Qu'est-ce qu'un agent IA autonome ?",
          a: "Un agent IA autonome est un système logiciel capable de percevoir son environnement, prendre des décisions et agir pour atteindre des objectifs définis, sans supervision humaine constante. Exemples : agent de pricing qui ajuste les prix selon la demande, agent de supply qui passe des commandes fournisseurs, agent de recommandation qui personnalise l'expérience client. Contrairement à une simple règle automatisée, un agent apprend et s'adapte."
        }
      ]
    },
    {
      category: "Calculateur",
      questions: [
        {
          q: "Combien de temps dure le diagnostic ?",
          a: "Le diagnostic complet dure entre 10 et 15 minutes. Il se compose de 7 étapes progressives couvrant votre contexte, votre maturité agentique, les 4 couches du framework ACF®, et vos dépendances critiques."
        },
        {
          q: "Comment est calculé mon Score Global ACF® ?",
          a: "Le Score Global ACF® (/100) se base sur 4 couches opérationnelles notées chacune sur 25 points : (1) Gouvernance & Souveraineté, (2) Politique de Décision, (3) Système d'Agents, (4) Exécution & Supervision. Chaque couche évalue la présence et la maturité de mécanismes de contrôle essentiels."
        },
        {
          q: "Qu'est-ce que le Niveau de Maturité (/3) ?",
          a: "Le Niveau de Maturité évalue l'autonomie actuelle de vos agents IA : Niveau 0 (règles fixes), Niveau 1 (agents assistés, proposent mais humains valident), Niveau 2 (agents décident dans un cadre strict), Niveau 3 (agents autonomes qui apprennent). Plus le niveau est élevé, plus la gouvernance est critique."
        },
        {
          q: "Qu'est-ce que le Score de Souveraineté (/100) ?",
          a: "Le Score de Souveraineté mesure votre capacité à garder le contrôle stratégique sur vos opérations. Il évalue : l'existence d'une gouvernance, la capacité à arrêter les agents (kill switch), la traçabilité des décisions, l'indépendance vis-à-vis des fournisseurs externes, et la définition de zones non-délégables aux agents."
        }
      ]
    },
    {
      category: "Scores & Résultats",
      questions: [
        {
          q: "Que signifie un score ACF® de 0/100 ?",
          a: "Un score de 0/100 signifie une absence totale de gouvernance agentique. Vous n'avez probablement pas de comité de gouvernance, pas de documentation des règles de décision, pas de mécanisme d'arrêt d'urgence, et pas de traçabilité des actions des agents. C'est une situation critique qui expose votre organisation à des risques majeurs."
        },
        {
          q: "Que signifie un score ACF® de 100/100 ?",
          a: "Un score de 100/100 représente l'excellence en gouvernance agentique. Vous avez un comité dédié, une charte de souveraineté, des objectifs hiérarchisés, des seuils de sécurité, un mandat explicite pour chaque agent, un responsable humain identifié, une traçabilité complète, un kill switch fonctionnel, et une indépendance vis-à-vis des fournisseurs."
        },
        {
          q: "Quelles sont les zones non-délégables aux agents ?",
          a: "Les zones non-délégables sont les décisions critiques qui doivent rester sous contrôle humain : validation finale des décisions à fort impact financier, modifications de la stratégie globale, accès aux données sensibles, changements dans les règles de gouvernance elles-mêmes. Ces zones doivent être documentées dans votre charte de souveraineté."
        },
        {
          q: "Qu'est-ce qu'un kill switch et pourquoi est-il essentiel ?",
          a: "Un kill switch est un mécanisme d'arrêt d'urgence qui permet de désactiver immédiatement un ou plusieurs agents en cas de comportement anormal. Exemples : agent qui fixe des prix aberrants, agent qui vide les stocks, agent qui envoie des emails inappropriés. Sans kill switch, vous ne pouvez pas arrêter un agent défaillant, ce qui peut causer des dégâts irréversibles."
        }
      ]
    },
    {
      category: "Réglementation",
      questions: [
        {
          q: "Quelles sont les sanctions en cas de non-conformité AI Act ?",
          a: "L'AI Act prévoit des amendes jusqu'à 35 millions d'euros OU 7% du chiffre d'affaires mondial annuel (le montant le plus élevé) pour les infractions les plus graves. Les systèmes d'IA à haut risque (comme les agents autonomes dans le commerce) doivent respecter des obligations strictes de transparence, traçabilité, et supervision humaine."
        },
        {
          q: "Mon Score ACF® garantit-il la conformité RGPD et AI Act ?",
          a: "Non. Le Score ACF® évalue votre gouvernance agentique mais ne remplace pas un audit juridique de conformité RGPD/AI Act. Cependant, un score élevé indique que vous avez mis en place des mécanismes (traçabilité, supervision humaine, documentation) qui facilitent grandement la conformité réglementaire."
        }
      ]
    },
    {
      category: "Audit & Accompagnement",
      questions: [
        {
          q: "Quelle est la différence entre ce diagnostic gratuit et un audit ACF® complet ?",
          a: "Le diagnostic gratuit est une évaluation indicative basée sur vos réponses (10-15 min). Un audit ACF® complet inclut : des entretiens avec vos équipes, l'analyse de votre documentation existante, l'observation de vos agents en production, un rapport détaillé de 50+ pages, et une roadmap personnalisée sur 12 mois. L'audit complet dure 2-3 semaines."
        },
        {
          q: "Que faire après avoir obtenu mon Score ACF® ?",
          a: "Si votre score est inférieur à 60/100, contactez un expert ACF® pour un plan d'action prioritaire (gratuit, 30 min). Si votre score est supérieur à 60/100, vous pouvez demander un audit complet pour identifier les optimisations avancées. Dans tous les cas, téléchargez votre PDF de résultats et partagez-le avec vos équipes."
        },
        {
          q: "Combien coûte un accompagnement ACF® ?",
          a: "Les tarifs dépendent de la taille de votre organisation et du niveau d'accompagnement : Diagnostic approfondi (5-10k€), Audit complet + Roadmap (15-30k€), Accompagnement à la mise en œuvre (forfait mensuel ou pourcentage des gains). La consultation initiale de 30 minutes est gratuite et sans engagement."
        }
      ]
    },
    {
      category: "Technique",
      questions: [
        {
          q: "Le calculateur fonctionne-t-il pour tout type d'agents IA ?",
          a: "Oui. Le framework ACF® s'applique à tous les agents IA autonomes en contexte business : agents de pricing, de recommandation, de supply chain, de customer service, de fraud detection, etc. Les 4 couches (Gouvernance, Politique, Système, Supervision) sont universelles et s'adaptent à tout cas d'usage."
        },
        {
          q: "Mes données sont-elles confidentielles ?",
          a: "Oui. Le calculateur fonctionne entièrement côté client (dans votre navigateur). Aucune donnée n'est envoyée à un serveur pendant le diagnostic. Seul le formulaire de contact (si vous le remplissez) transmet vos informations pour vous recontacter. Vos réponses au diagnostic restent privées."
        },
        {
          q: "Puis-je refaire le diagnostic plusieurs fois ?",
          a: "Oui, sans limite. Nous recommandons de refaire le diagnostic tous les 6 mois pour mesurer vos progrès. Vous pouvez également le faire pour différentes business units ou différents types d'agents au sein de votre organisation pour identifier les disparités de maturité."
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h1>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur le Score ACF® et la gouvernance agentique
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full mr-3"></span>
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = faqs.slice(0, catIndex).reduce((acc, cat) => acc + cat.questions.length, 0) + qIndex
                  const isOpen = openIndex === globalIndex
                  
                  return (
                    <div key={qIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                      >
                        <span className="font-semibold text-gray-900 pr-8">{faq.q}</span>
                        <svg
                          className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary to-accent rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Contactez un expert ACF® pour une consultation gratuite
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-bold hover:shadow-2xl transition"
          >
            Poser ma question
          </a>
        </div>
      </div>
    </main>
  )
}
