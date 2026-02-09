import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo-acf.jpg" alt="ACF Logo" width={40} height={40} className="object-contain" />
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Score ACF®</div>
                <div className="text-xs text-gray-500">Calculateur de Souveraineté</div>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#comment-ca-marche" className="text-gray-600 hover:text-primary transition">
                Comment ça marche
              </a>
              <a href="#exemples" className="text-gray-600 hover:text-primary transition">
                Exemples
              </a>
              <Link 
                href="/calculator" 
                className="bg-gradient-to-r from-primary to-accent hover:shadow-xl text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                Calculer mon score
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-dark via-primary to-accent text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Gratuit • Sans inscription • Résultat immédiat</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">
              Mesurez votre dépendance aux plateformes
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-8 text-balance">
              Calculez votre <strong>Score de Souveraineté ACF®</strong> en 5 minutes.
              <br className="hidden sm:block" />
              Comprenez vos vulnérabilités business.
            </p>
            
            <Link 
              href="/calculator" 
              className="inline-flex items-center bg-white text-primary hover:bg-gray-100 font-bold py-4 px-10 rounded-lg text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Calculer mon score gratuitement
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-purple-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Résultat immédiat
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Rapport PDF pro
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                0€
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600 font-medium">Organisations analysées</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">42</div>
              <p className="text-gray-600 font-medium">Score moyen e-commerce</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5 min</div>
              <p className="text-gray-600 font-medium">Pour obtenir votre score</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is ACF Score */}
      <section id="comment-ca-marche" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Qu'est-ce que le Score de Souveraineté ACF® ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une métrique propriétaire qui mesure votre niveau de contrôle sur vos décisions commerciales stratégiques.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📐 La formule</h3>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg mb-4 overflow-x-auto">
                <code className="font-mono text-sm whitespace-nowrap">
                  Score = 100 - [(DS × 30) + (DD × 25) + (DT × 25) + (DTr × 20)]
                </code>
              </div>
              <p className="text-gray-600">
                Un score composite qui évalue <strong>4 dimensions critiques</strong> de votre dépendance aux plateformes et partenaires externes.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Les 4 dimensions</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="font-bold text-primary text-lg">DS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dépendance Structurelle</div>
                    <div className="text-sm text-gray-600">% CA via une plateforme unique</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="font-bold text-primary text-lg">DD</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dépendance Données</div>
                    <div className="text-sm text-gray-600">% décisions basées sur data externe</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="font-bold text-primary text-lg">DT</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dépendance Trafic</div>
                    <div className="text-sm text-gray-600">% acquisition payante (Ads)</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="font-bold text-primary text-lg">DTr</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dépendance Trésorerie</div>
                    <div className="text-sm text-gray-600">Jours de CA bloqués</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interpretation Scale */}
          <div className="card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Barème d'interprétation</h3>
            <div className="space-y-3">
              <div className="flex items-center p-4 bg-green-50 border-l-4 border-success rounded-lg hover:shadow-md transition">
                <div className="font-bold text-success mr-4 w-24 text-lg">80-100</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">✓ Souveraineté forte</div>
                  <div className="text-sm text-gray-600">Contrôle élevé, dépendances limitées</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-yellow-50 border-l-4 border-warning rounded-lg hover:shadow-md transition">
                <div className="font-bold text-warning mr-4 w-24 text-lg">60-79</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">⚡ Souveraineté moyenne</div>
                  <div className="text-sm text-gray-600">Dépendances gérables, surveillance nécessaire</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-orange-50 border-l-4 border-alert rounded-lg hover:shadow-md transition">
                <div className="font-bold text-alert mr-4 w-24 text-lg">40-59</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">⚠️ Dépendance critique</div>
                  <div className="text-sm text-gray-600">Perte de contrôle significative, plan d'urgence requis</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-red-50 border-l-4 border-red-600 rounded-lg hover:shadow-md transition">
                <div className="font-bold text-red-700 mr-4 w-24 text-lg">0-39</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">🚨 Perte de contrôle</div>
                  <div className="text-sm text-gray-600">Situation dangereuse, restructuration profonde nécessaire</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section id="exemples" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Exemples de scores réels
            </h2>
            <p className="text-xl text-gray-600">(données anonymisées)</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Example 1 */}
            <div className="relative bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 p-6 rounded-xl hover:shadow-xl transition-all">
              <div className="absolute top-4 right-4">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">CRITIQUE</span>
              </div>
              <div className="text-center mb-4">
                <div className="text-6xl font-bold text-red-700 mb-2">29</div>
                <div className="text-sm font-semibold text-red-600 uppercase tracking-wide">Perte de contrôle</div>
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Pure player Amazon FBA</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  95% CA via Amazon
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Pricing piloté par Amazon
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  60% trafic Ads
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  30 jours CA bloqués
                </li>
              </ul>
            </div>

            {/* Example 2 */}
            <div className="relative bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 p-6 rounded-xl hover:shadow-xl transition-all">
              <div className="absolute top-4 right-4">
                <span className="bg-warning text-white text-xs font-bold px-2 py-1 rounded">MOYEN</span>
              </div>
              <div className="text-center mb-4">
                <div className="text-6xl font-bold text-warning mb-2">65</div>
                <div className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">Souveraineté moyenne</div>
              </div>
              <h3 className="font-bold text-gray-900 mb-3">E-commerce diversifié</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  30% CA marketplace
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  Mix data interne/externe
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  50% trafic payant
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  9 jours bloqués
                </li>
              </ul>
            </div>

            {/* Example 3 */}
            <div className="relative bg-gradient-to-br from-green-50 to-green-100 border-2 border-success p-6 rounded-xl hover:shadow-xl transition-all">
              <div className="absolute top-4 right-4">
                <span className="bg-success text-white text-xs font-bold px-2 py-1 rounded">FORT</span>
              </div>
              <div className="text-center mb-4">
                <div className="text-6xl font-bold text-success mb-2">80</div>
                <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Souveraineté forte</div>
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Marque DTC site propre</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  10% via revendeurs
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Data interne majoritaire
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  40% Ads, 60% organique
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  3 jours délai paiement
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Prêt à mesurer votre niveau de souveraineté ?
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-8">
            Obtenez votre score en 5 minutes et un rapport PDF professionnel gratuit.
          </p>
          <Link 
            href="/calculator" 
            className="inline-flex items-center bg-white text-primary hover:bg-gray-100 font-bold py-4 px-10 rounded-lg text-lg transition-all shadow-2xl hover:scale-105 transform"
          >
            Calculer mon Score ACF®
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-sm text-purple-100 mt-4">
            Aucune carte bancaire • Pas de spam • Résultat immédiat
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">ACF</span>
                </div>
                <h3 className="text-white font-bold">Score ACF®</h3>
              </div>
              <p className="text-sm">
                Calculateur de Souveraineté basé sur l'Agentic Commerce Framework®
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Ressources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Méthodologie ACF</a></li>
                <li><a href="#" className="hover:text-white transition">Livre "La Souveraineté Agentique"</a></li>
                <li><a href="#" className="hover:text-white transition">Formations & Certifications</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:contact@vincentdorange.com" className="hover:text-white transition">
                    contact@vincentdorange.com
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/vincentdorange" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 Vincent DORANGE. Tous droits réservés.</p>
            <p className="mt-2">
              Agentic Commerce Framework® et Score ACF® sont des marques déposées.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
