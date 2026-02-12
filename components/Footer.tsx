import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Colonne 1 - À propos */}
          <div>
            <h3 className="font-bold text-lg mb-4">Score ACF®</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Calculateur de Souveraineté Opérationnelle pour l'économie des agents IA autonomes.
            </p>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-white transition">Accueil</Link></li>
              <li><Link href="/calculator" className="text-gray-300 hover:text-white transition">Calculateur</Link></li>
              <li><Link href="/pourquoi" className="text-gray-300 hover:text-white transition">Pourquoi ACF®</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 3 - Légal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Informations légales</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="text-gray-300 hover:text-white transition">Mentions légales</Link></li>
              <li><Link href="/cgu" className="text-gray-300 hover:text-white transition">CGU</Link></li>
              <li><Link href="/confidentialite" className="text-gray-300 hover:text-white transition">Confidentialité</Link></li>
              <li><Link href="/qui-sommes-nous" className="text-gray-300 hover:text-white transition">Qui sommes-nous</Link></li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">AI CONSULTING</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>38 Bis Boulevard Victor Hugo<br/>06000 Nice, France</p>
              <p>RCS Nice : 909116329</p>
              <p>TVA : FR96909116329</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p className="mb-2">
            Agentic Commerce Framework® (ACF®) - Méthodologie propriétaire développée par{' '}
            <span className="font-semibold text-white">Vincent DORANGE</span>
          </p>
          <p>© {new Date().getFullYear()} AI CONSULTING. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
