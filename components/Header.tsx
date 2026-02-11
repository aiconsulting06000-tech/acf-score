import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/logo-acf-blanc.png" 
              alt="ACF Logo" 
              width={100} 
              height={100}
              className="object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/pourquoi" 
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Pourquoi ACF®
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              FAQ
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Contact
            </Link>
            <Link 
              href="/calculator" 
              className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Calculer mon score
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link 
              href="/calculator" 
              className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold text-sm"
            >
              Calculer
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden pb-4 space-y-2">
          <Link 
            href="/pourquoi" 
            className="block text-gray-700 hover:text-primary font-medium"
          >
            Pourquoi ACF®
          </Link>
          <Link 
            href="/faq" 
            className="block text-gray-700 hover:text-primary font-medium"
          >
            FAQ
          </Link>
          <Link 
            href="/contact" 
            className="block text-gray-700 hover:text-primary font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}
