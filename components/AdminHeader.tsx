'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AdminHeader() {
  const { data: session } = useSession()

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 text-white py-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">Dashboard Admin ACF®</h1>
            <nav className="hidden md:flex space-x-4">
              <Link
                href="/admin/contacts"
                className="px-3 py-2 rounded hover:bg-white/20 transition"
              >
                Contacts
              </Link>
              <Link
                href="/admin/diagnostics"
                className="px-3 py-2 rounded hover:bg-white/20 transition"
              >
                Diagnostics
              </Link>
              <Link
                href="/admin/stats"
                className="px-3 py-2 rounded hover:bg-white/20 transition"
              >
                Stats
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {session?.user && (
              <>
                <div className="text-sm">
                  <div className="font-medium">{session.user.name}</div>
                  <div className="text-white/80 text-xs">{session.user.email}</div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/admin/login' })}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Déconnexion</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
