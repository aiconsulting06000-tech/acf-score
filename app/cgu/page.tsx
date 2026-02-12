import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CGU() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Conditions Générales d'Utilisation</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objet</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes CGU définissent les conditions d'utilisation du calculateur de Score ACF® 
              mis à disposition gratuitement par AI CONSULTING.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Accès au service</h2>
            <p className="text-gray-700 leading-relaxed">
              Le calculateur ACF® est accessible gratuitement, sans inscription préalable. 
              AI CONSULTING se réserve le droit de suspendre ou modifier le service à tout moment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Nature du diagnostic</h2>
            <p className="text-gray-700 leading-relaxed">
              Le Score ACF® est une <strong>évaluation indicative</strong> basée sur les réponses 
              fournies par l'utilisateur. Il ne constitue pas un audit certifié et n'engage pas 
              la responsabilité d'AI CONSULTING quant aux décisions prises sur la base de ce score.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
            <p className="text-gray-700 leading-relaxed">
              Le framework <strong>Agentic Commerce Framework® (ACF®)</strong> est une marque 
              et une méthodologie propriétaire de Vincent DORANGE. Toute reproduction, même partielle, 
              est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Responsabilité</h2>
            <p className="text-gray-700 leading-relaxed">
              AI CONSULTING ne saurait être tenu responsable :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>Des décisions prises sur la base du Score ACF®</li>
              <li>Des erreurs ou inexactitudes dans les réponses de l'utilisateur</li>
              <li>Des interruptions temporaires du service</li>
              <li>Des dommages indirects résultant de l'utilisation du calculateur</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Données personnelles</h2>
            <p className="text-gray-700 leading-relaxed">
              Voir notre <a href="/confidentialite" className="text-primary hover:underline font-semibold">
                Politique de Confidentialité
              </a> pour plus de détails sur le traitement des données.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Droit applicable</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes CGU sont régies par le droit français. Tout litige relève 
              de la compétence exclusive des tribunaux de Nice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modification des CGU</h2>
            <p className="text-gray-700 leading-relaxed">
              AI CONSULTING se réserve le droit de modifier les présentes CGU à tout moment. 
              Les CGU applicables sont celles en vigueur au moment de l'utilisation du service.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
