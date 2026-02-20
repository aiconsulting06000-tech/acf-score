'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { articles } from '@/data/articles'

const categorieColors: Record<string, string> = {
  Tendances:      'bg-blue-100 text-blue-700',
  Réglementation: 'bg-red-100 text-red-700',
  Méthodologie:   'bg-green-100 text-green-700',
  Framework:      'bg-purple-100 text-purple-700',
  'Cas client':   'bg-orange-100 text-orange-700',
  Technique:      'bg-gray-100 text-gray-700',
}

export default function BlogPage() {
  const articleEnAvant = articles[0]
  const autresArticles = articles.slice(1)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* HERO */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Blog ACF®</h1>
          <p className="text-xl opacity-90">
            Actualités, analyses et guides sur la gouvernance agentique
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ARTICLE EN AVANT (premier article, pleine largeur) */}
        <Link
          href={`/blog/${articleEnAvant.slug}`}
          className="group block bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition mb-12"
        >
          <div className="md:grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <Image
                src={articleEnAvant.image}
                alt={articleEnAvant.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${categorieColors[articleEnAvant.categorie] || 'bg-gray-100 text-gray-700'}`}>
                  {articleEnAvant.categorie}
                </span>
                <span className="text-sm text-gray-400">⭐ Article à la une</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition leading-tight">
                {articleEnAvant.titre}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {articleEnAvant.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{articleEnAvant.date} · {articleEnAvant.tempsLecture}</span>
                <span className="text-purple-600 font-semibold group-hover:underline flex items-center gap-1">
                  Lire l'article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* GRILLE DES AUTRES ARTICLES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {autresArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Contenu */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${categorieColors[article.categorie] || 'bg-gray-100 text-gray-700'}`}>
                    {article.categorie}
                  </span>
                  <span className="text-xs text-gray-400">{article.tempsLecture}</span>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition leading-snug flex-1">
                  {article.titre}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {article.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{article.date}</span>
                  <span className="text-purple-600 text-sm font-semibold group-hover:underline flex items-center gap-1">
                    Lire
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
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
