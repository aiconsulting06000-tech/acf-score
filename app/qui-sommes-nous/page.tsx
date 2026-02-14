import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function QuiSommesNous() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Qui sommes-nous</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI CONSULTING</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>AI CONSULTING</strong> est un cabinet de conseil spécialisé dans 
              l'accompagnement des entreprises face à la transformation induite par les agents IA autonomes.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                38 Bis Boulevard Victor Hugo<br/>
                06000 Nice, France<br/>
                RCS Nice : 909116329<br/>
                TVA : FR96909116329
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vincent DORANGE</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Vincent DORANGE</strong> est le Président d'AI CONSULTING et le créateur 
              du framework <strong>Agentic Commerce Framework® (ACF®)</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vincent a 25 ans d'expérience dans le digital et e-commerce. Diplômé de <strong>MIT Sloan School of Management</strong> et <strong>Columbia Business School</strong> en Digital Business, Vincent a suivi de nombreuses formations en Intelligence Artificielle auprès des plus grandes institutions et sociétés internationales : Stratégie IA, Agents IA, Risques et Cybersécurité, Agentic Commerce, Gouvernance, Éthique, Stratégie produit...
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Il a développé l'ACF® pour répondre aux défis inédits posés par l'émergence 
              des agents IA autonomes dans les opérations business.
            </p>
            <p className="text-gray-700 leading-relaxed">
              L'ACF® est aujourd'hui la première méthodologie structurée permettant aux organisations 
              d'évaluer et de renforcer leur <strong>souveraineté opérationnelle</strong> face 
              à l'économie des agents IA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Accompagner les entreprises dans la mise en place d'une <strong>gouvernance agentique</strong> 
              robuste, garantissant :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
              <li>Le contrôle stratégique sur les décisions opérationnelles</li>
              <li>La conformité réglementaire (RGPD, AI Act)</li>
              <li>La résilience face aux risques liés à l'autonomie des agents</li>
              <li>L'optimisation globale (et non locale) des performances</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Diagnostic ACF®</h3>
                <p className="text-sm text-gray-700">
                  Évaluation gratuite de votre souveraineté opérationnelle
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Audit complet</h3>
                <p className="text-sm text-gray-700">
                  Analyse approfondie sur 2-3 semaines avec rapport détaillé
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Accompagnement</h3>
                <p className="text-sm text-gray-700">
                  Mise en œuvre de la gouvernance agentique
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Formation</h3>
                <p className="text-sm text-gray-700">
                  Montée en compétence de vos équipes sur l'ACF®
                </p>
              </div>
            </div>
          </section>

          <section className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-700 mb-4">
              Des questions ? Besoin d'un accompagnement personnalisé ?
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition"
            >
              Contactez-nous
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
