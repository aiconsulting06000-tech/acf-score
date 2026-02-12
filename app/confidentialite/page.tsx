import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Collecte des données</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lors de l'utilisation du calculateur ACF®, nous collectons les informations suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Secteur d'activité</li>
              <li>Taille de l'entreprise</li>
              <li>Présence et fonctionnement des agents IA</li>
              <li>Réponses au questionnaire de diagnostic</li>
              <li>Scores calculés</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Utilisation des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Les données collectées sont utilisées uniquement pour :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Calculer votre score ACF® personnalisé</li>
              <li>Générer vos recommandations</li>
              <li>Améliorer la méthodologie ACF®</li>
              <li>Produire des statistiques agrégées et anonymisées</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Anonymisation</h2>
            <p className="text-gray-700 leading-relaxed">
              Les données sont <strong>anonymisées</strong>. Nous ne collectons pas de nom, email, 
              ou information personnelle identifiable via le calculateur. Les adresses IP sont 
              hachées (SHA-256) avant stockage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Formulaire de contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Si vous utilisez le formulaire de contact, nous collectons : nom, email, entreprise, 
              score ACF® (si renseigné). Ces données sont utilisées uniquement pour vous recontacter 
              et ne sont jamais partagées avec des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement 
              (localStorage pour sauvegarder vos réponses pendant le diagnostic). Aucun cookie 
              de tracking ou publicitaire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos droits (RGPD)</h2>
            <p className="text-gray-700 leading-relaxed">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, 
              d'effacement, et de portabilité de vos données. Pour exercer ces droits, 
              contactez-nous via le formulaire de contact.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conservation</h2>
            <p className="text-gray-700 leading-relaxed">
              Les données anonymisées du calculateur sont conservées indéfiniment pour analyse 
              statistique. Les données du formulaire de contact sont conservées 3 ans maximum.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
