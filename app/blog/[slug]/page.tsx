import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getArticleBySlug, getAllSlugs, Article, Section, FaqItem } from '@/data/articles'

// Génération statique des routes
export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

// Métadonnées dynamiques pour le SEO
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Article introuvable' }
  return {
    title: `${article.titre} | Blog ACF®`,
    description: article.description,
    openGraph: {
      title: article.titre,
      description: article.description,
      images: [{ url: article.image }],
    },
  }
}

// Couleurs par catégorie
const categorieColors: Record<string, string> = {
  Tendances:    'bg-blue-100 text-blue-700',
  Réglementation: 'bg-red-100 text-red-700',
  Méthodologie: 'bg-green-100 text-green-700',
  Framework:    'bg-purple-100 text-purple-700',
  'Cas client': 'bg-orange-100 text-orange-700',
  Technique:    'bg-gray-100 text-gray-700',
}

// Rendu d'une section de contenu
function renderSection(section: Section, index: number) {
  switch (section.type) {
    case 'intro':
      return (
        <p key={index} className="text-xl text-gray-600 leading-relaxed font-medium border-l-4 border-purple-500 pl-6 py-2 my-8">
          {section.texte}
        </p>
      )
    case 'h2':
      return (
        <h2 key={index} className="text-2xl font-bold text-gray-900 mt-12 mb-4">
          {section.texte}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={index} className="text-xl font-semibold text-gray-800 mt-8 mb-3">
          {section.texte}
        </h3>
      )
    case 'p':
      return (
        <p key={index} className="text-gray-700 leading-relaxed my-4">
          {section.texte}
        </p>
      )
    case 'ul':
      return (
        <ul key={index} className="my-6 space-y-3">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <span className="text-purple-500 mt-1 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={index} className="my-6 space-y-4">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-gray-700">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="pt-1">{item}</span>
            </li>
          ))}
        </ol>
      )
    case 'quote':
      return (
        <blockquote key={index} className="my-10 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-r-xl p-6">
          <p className="text-lg text-gray-800 italic leading-relaxed mb-3">
            « {section.texte} »
          </p>
          {section.auteur && (
            <cite className="text-sm font-semibold text-purple-700 not-italic">
              — {section.auteur}
            </cite>
          )}
        </blockquote>
      )
    case 'encadre':
      return (
        <div key={index} className="my-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
          {section.titre && (
            <h4 className="font-bold text-amber-800 mb-2">💡 {section.titre}</h4>
          )}
          <p className="text-amber-900 leading-relaxed">{section.texte}</p>
        </div>
      )
    case 'cta':
      return (
        <div key={index} className="my-10 text-center">
          <Link
            href="/calculator"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            {section.texte} →
          </Link>
        </div>
      )
    case 'definition':
      return (
        <div key={index} className="my-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6">
          {section.titre && (
            <h4 className="font-bold text-blue-800 mb-2">📖 {section.titre}</h4>
          )}
          <p className="text-blue-900 leading-relaxed">{section.texte}</p>
        </div>
      )
    case 'faq':
      return (
        <div key={index} className="my-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
          <div className="space-y-4">
            {section.faqs?.map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition">
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 w-6 h-6 text-purple-600 group-open:rotate-180 transition-transform duration-200">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-2 text-gray-700 leading-relaxed border-t border-gray-100">
                  {faq.reponse}
                </div>
              </details>
            ))}
          </div>
        </div>
      )
    default:
      return null
  }
}

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) notFound()

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-700 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-purple-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <span>›</span>
            <span className="text-white">{article.categorie}</span>
          </nav>

          {/* Badge catégorie */}
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full mb-4">
            {article.categorie}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {article.titre}
          </h1>

          <p className="text-xl text-purple-100 leading-relaxed mb-8">
            {article.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-purple-200">
            <span>📅 {article.date}</span>
            <span>•</span>
            <span>⏱ {article.tempsLecture} de lecture</span>
            <span>•</span>
            <span>✍️ Vincent DORANGE</span>
          </div>
        </div>
      </div>

      {/* IMAGE PRINCIPALE */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-0 relative z-10">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={article.image}
            alt={article.imageAlt}
            width={1200}
            height={500}
            className="w-full object-cover"
            style={{ maxHeight: '420px' }}
            priority
          />
        </div>
      </div>

      {/* CONTENU */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">

          {/* Article principal */}
          <article className="prose-custom">
            {article.contenu.map((section, index) => renderSection(section, index))}
          </article>

          {/* Sidebar */}
          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-8 space-y-6">

              {/* À propos de l'auteur */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="font-bold text-gray-900 mb-3">À propos de l'auteur</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    VD
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Vincent DORANGE</p>
                    <p className="text-sm text-gray-600">Créateur du framework ACF®</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Expert en gouvernance agentique et souveraineté opérationnelle. Fondateur d'AI CONSULTING et créateur du Score ACF®.
                </p>
              </div>

              {/* CTA Score */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Évaluez votre gouvernance</h3>
                <p className="text-sm text-purple-100 mb-4">
                  Calculez votre Score ACF® en 10 minutes et obtenez un rapport personnalisé.
                </p>
                <Link
                  href="/calculator"
                  className="block text-center py-3 px-4 bg-white text-purple-700 rounded-lg font-bold hover:bg-purple-50 transition"
                >
                  Calculer mon score →
                </Link>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Une question ?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Nos experts répondent à vos questions sur la gouvernance agentique.
                </p>
                <Link
                  href="/contact"
                  className="block text-center py-3 px-4 border-2 border-purple-600 text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* NAVIGATION ENTRE ARTICLES */}
      <div className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Continuer la lecture</h3>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline"
          >
            ← Tous les articles du Blog ACF®
          </Link>
        </div>
      </div>

      {/* CTA FINAL */}
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
