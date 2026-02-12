import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Éditeur du site</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>AI CONSULTING</strong><br/>
              38 Bis Boulevard Victor Hugo<br/>
              06000 Nice, France<br/>
              RCS Nice : 909116329<br/>
              TVA intracommunautaire : FR96909116329
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Directeur de publication</h2>
            <p className="text-gray-700 leading-relaxed">
              Vincent DORANGE, Président
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hébergement</h2>
            <p className="text-gray-700 leading-relaxed">
              Le site est hébergé par <strong>Vercel Inc.</strong><br/>
              340 S Lemon Ave #4133<br/>
              Walnut, CA 91789, USA
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
            <p className="text-gray-700 leading-relaxed">
              Le framework <strong>Agentic Commerce Framework® (ACF®)</strong> est une méthodologie propriétaire 
              développée par Vincent DORANGE. Tous les contenus de ce site (textes, images, logos, structure) 
              sont protégés par le droit d'auteur et le droit des marques.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">
              Pour toute question concernant le site :{' '}
              <Link href="/contact" className="text-primary hover:underline font-semibold">
                Formulaire de contact
              </Link>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
