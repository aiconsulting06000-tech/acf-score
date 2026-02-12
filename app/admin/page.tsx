'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Stats {
  total: number
  moyenneGlobal: number
  moyenneSouverainete: number
  parSecteur: Record<string, { count: number, avg: number }>
  parTaille: Record<string, number>
  evolution: Array<{ date: string, avg: number, count: number }>
}

export default function AdminPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin2026') {
      setAuthenticated(true)
      loadStats()
    } else {
      alert('Mot de passe incorrect')
    }
  }

  const loadStats = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error loading stats:', error)
    }
    setLoading(false)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Admin Dashboard</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Entrez le mot de passe"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (loading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard ACF®</h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Déconnexion
          </button>
        </div>

        {/* Stats globales */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-sm font-semibold text-gray-600 mb-2">Total diagnostics</div>
            <div className="text-4xl font-bold text-primary">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-sm font-semibold text-gray-600 mb-2">Score global moyen</div>
            <div className="text-4xl font-bold text-accent">{stats.moyenneGlobal.toFixed(1)}/100</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-sm font-semibold text-gray-600 mb-2">Souveraineté moyenne</div>
            <div className="text-4xl font-bold text-purple-600">{stats.moyenneSouverainete.toFixed(1)}/100</div>
          </div>
        </div>

        {/* Par secteur */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Scores moyens par secteur</h2>
          <div className="space-y-3">
            {Object.entries(stats.parSecteur).map(([secteur, data]) => (
              <div key={secteur} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900 capitalize">{secteur}</div>
                  <div className="text-sm text-gray-600">{data.count} diagnostics</div>
                </div>
                <div className="text-2xl font-bold text-primary">{data.avg.toFixed(1)}/100</div>
              </div>
            ))}
          </div>
        </div>

        {/* Par taille */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Répartition par taille d'entreprise</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(stats.parTaille).map(([taille, count]) => (
              <div key={taille} className="text-center p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">{count}</div>
                <div className="text-sm font-medium text-gray-700 mt-2 capitalize">{taille}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Évolution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Évolution dans le temps</h2>
          <div className="space-y-3">
            {stats.evolution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-700">{item.date}</div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{item.count} diagnostics</span>
                  <span className="text-lg font-bold text-primary">{item.avg.toFixed(1)}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
