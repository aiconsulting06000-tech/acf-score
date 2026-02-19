'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function BlogPage() {
  const articles = [
    {
      titre: "L'économie des agents IA : ce qui change pour votre entreprise en 2026",
      description: "Les agents IA autonomes transforment le commerce. Découvrez comment vous préparer à cette révolution et maintenir votre souveraineté.",
      date: "15 février 2026",
      categorie: "Tendances",
      lien: "#"
    },
    {
      titre: "AI Act européen : ce que vous devez savoir pour rester conforme",
      description: "L'AI Act impose de nouvelles obligations sur les systèmes IA à haut risque. Guide pratique pour les entreprises qui utilisent des agents autonomes.",
      date: "10 février 2026",
      categorie: "Réglementation",
      lien: "#"
    },
    {
      titre: "Comment calculer votre Score de Souveraineté ACF® ?",
      description: "Méthodologie détaillée pour mesurer votre indépendance vis-à-vis des plateformes tierces et reprendre le contrôle de votre destin commercial.",
      date: "5 février 2026",
      categorie: "Méthodologie",
      lien: "#"
    },
    {
      titre: "Les 4 couches de gouvernance agentique expliquées",
      description: "Gouvernance & Souveraineté, Politique de Décision, Système d'Agents, Supervision : décryptage du framework ACF® couche par couche.",
      date: "1er février 2026",
      categorie: "Framework",
      lien: "#"
    },
    {
      titre: "Cas pratique : De 32 à 78 points ACF® en 6 mois",
      description: "Retour d'expérience d'un e-commerçant qui a restructuré sa gouvernance agentique et réduit ses dépendances critiques.",
      date: "28 janvier 2026",
      categorie: "Cas client",
      lien: "#"
    },
    {
      titre: "Kill switch : Pourquoi et comment implémenter un mécanisme d'arrêt d'urgence",
      description: "Guide technique pour mettre en place un kill switch efficace et le tester régulièrement pour garder le contrôle de vos agents IA.",
      date: "20 janvier 2026",
      categorie: "Technique",
      lien: "#"
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* HERO avec dégradé violet/rose */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Blog ACF®
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Actualités, analyses et guides sur la gouvernance agentique
          </p>
        </div>
      </div>

      {/* LISTE DES ARTICLES */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                    {article.categorie}
                  </span>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition">
                  {article.titre}
                </h2>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {article.description}
                </p>
                
                <Link
                  href={article.lien}
                  className="inline-flex items-center text-primary font-semibold hover:underline"
                >
                  Lire l'article
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* PAGINATION (pour plus tard) */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Plus d'articles à venir prochainement...
          </p>
        </div>
      </div>

      {/* CTA BOTTOM */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à évaluer votre gouvernance agentique ?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Obtenez votre Score ACF® en 10 minutes
          </p>
          <Link
            href="/calculator"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:shadow-2xl transition"
          >
            Calculer mon score gratuitement →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
