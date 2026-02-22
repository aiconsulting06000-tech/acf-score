'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [hasResults, setHasResults] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const savedResults = localStorage.getItem('acf_results')
    setHasResults(!!savedResults)
  }, [])

  const navItems = [
    { href: '/pourquoi', label: 'Pourquoi ACF' },
    { href: '/faq', label: 'FAQ' },
    { href: '/blog', label: 'Blog' },
    { href: '/calculator', label: 'Calculateur' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <img
              src="/logo-acf.png"
              alt="ACF Logo"
              className="h-20 w-auto object-contain"
            />
            <div>
              <div className="text-lg font-bold text-gray-900">ACF Score®</div>
              <div className="text-sm text-gray-600">Gouvernance Agentique de Nouvelle Génération</div>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-base font-medium transition ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {hasResults && (
              <Link
                href="/results"
                className="ml-2 px-4 py-2 rounded-lg text-base font-medium bg-accent text-white hover:bg-accent/90 transition"
              >
                📊 Mes résultats
              </Link>
            )}
          </nav>

          {/* Hamburger button mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Menu mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {hasResults && (
              <Link
                href="/results"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-medium bg-accent text-white hover:bg-accent/90 transition"
              >
                📊 Mes résultats
              </Link>
            )}
            <div className="pt-2 mt-1 border-t border-gray-100">
              <Link
                href="/calculator"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
              >
                Calculer mon score →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
