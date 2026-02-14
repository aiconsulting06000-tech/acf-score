'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [hasResults, setHasResults] = useState(false)

  useEffect(() => {
    // Vérifier si des résultats existent dans localStorage
    const savedResults = localStorage.getItem('acf_results')
    setHasResults(!!savedResults)
  }, [])

  const navItems = [
    { href: '/pourquoi', label: 'Pourquoi ACF' },
    { href: '/calculator', label: 'Calculateur' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo + Slogan */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ACF</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-gray-900">ACF Score</div>
              <div className="text-xs text-gray-600">Gouvernance Agentique de Nouvelle Génération</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
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
                className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent/90 transition"
              >
                Mes résultats
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
