import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero avec gradient violet/rose comme logo ACF */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 md:px-16 py-16">
          <div className="text-center">
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Gratuit • Sans inscription • Résultat immédiat
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Êtes-vous prêt pour<br />
              l'ère des agents<br />
              IA autonomes ?
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Évaluez la robustesse de votre gouvernance agentique en 10 minutes. Obtenez votre Score ACF® en 7 étapes et vos recommandations personnalisées.
            </p>
            
            <Link
              href="/calculator"
