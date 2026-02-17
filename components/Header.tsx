'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    { href: '/pourquoi', label: 'Pourquoi ACF®' },
    { href: '/calculator', label: 'Calculateur' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo + Slogan */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo-acf.svg"
              alt="ACF® Logo"
              width={52}
              height={52}
              className="object-contain"
              priority
            />
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent leading-tight">
                Score ACF®
              </div>
              <div className="text-xs text-gray-500 font-medium leading-tight">
                Gouvernance Agentique de Nouvelle Génération
              </div>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === item.href
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {hasResults && (
              <Link
                href="/results"
                className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition"
              >
                📊 Mes résultats
              </Link>
            )}
          </nav>

          {/* Burger mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition mb-1 ${
                  pathname === item.href
                    ? 'bg-purple-600 text-white'
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
                className="block mt-2 px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center"
              >
                📊 Mes résultats
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
