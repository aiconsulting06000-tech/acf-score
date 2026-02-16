'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminStatsPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('30') // jours

  useEffect(() => {
    fetchStats()
  }, [period])

  async function fetchStats() {
    setLoading(true)
    try {
      const since = new Date()
      since.setDate(since.getDate() - parseInt(period))

      // Fetch diagnostics
      const { data: diagnostics, error: diagError } = await supabase
        .from('diagnostics')
        .select('*')
        .gte('created_at', since.toISOString())

      // Fetch contacts
      const { data: contacts, error: contactError } = await supabase
        .from('contacts')
        .select('*')
        .gte('created_at', since.toISOString())

      if (diagError) throw diagError
      if (contactError) throw contactError

      // Calculer stats
      const totalDiag = diagnostics?.length || 0
      const totalContacts = contacts?.length || 0

      const avgScoreACF =
        totalDiag > 0
          ? Math.round(diagnostics!.reduce((sum, d) => sum + d.score_acf, 0) / totalDiag)
          : 0

      const avgSouv =
        totalDiag > 0
          ? Math.round(diagnostics!.reduce((sum, d) => sum + d.score_souverainete, 0) / totalDiag)
          : 0

      const conversionRate =
        totalDiag > 0 ? Math.round((totalContacts / totalDiag) * 100) : 0

      // Distribution par secteur
      const sectorDistribution = diagnostics?.reduce((acc: any, d) => {
        acc[d.sector] = (acc[d.sector] || 0) + 1
        return acc
      }, {})

      // Distribution par taille
      const sizeDistribution = diagnostics?.reduce((acc: any, d) => {
        acc[d.company_size] = (acc[d.company_size] || 0) + 1
        return acc
      }, {})

      // Distribution des scores
      const scoreRanges = {
        'Critique (0-29)': diagnostics?.filter((d) => d.score_acf < 30).length || 0,
        'Fragile (30-49)': diagnostics?.filter((d) => d.score_acf >= 30 && d.score_acf < 50).length || 0,
        'Solide (50-69)': diagnostics?.filter((d) => d.score_acf >= 50 && d.score_acf < 70).length || 0,
        'Excellent (70-100)': diagnostics?.filter((d) => d.score_acf >= 70).length || 0,
      }

      // Évolution temporelle
      const dailyStats = diagnostics?.reduce((acc: any, d) => {
        const date = new Date(d.created_at).toLocaleDateString('fr-FR')
        if (!acc[date]) {
          acc[date] = { diagnostics: 0, avgScore: 0, scores: [] }
        }
        acc[date].diagnostics++
        acc[date].scores.push(d.score_acf)
        acc[date].avgScore = Math.round(
          acc[date].scores.reduce((s: number, v: number) => s + v, 0) / acc[date].scores.length
        )
        return acc
      }, {})

      // Status contacts
      const contactStatus = {
        new: contacts?.filter((c) => c.status === 'new').length || 0,
        contacted: contacts?.filter((c) => c.status === 'contacted').length || 0,
        converted: contacts?.filter((c) => c.status === 'converted').length || 0,
        archived: contacts?.filter((c) => c.status === 'archived').length || 0,
      }

      setStats({
        totalDiag,
        totalContacts,
        avgScoreACF,
        avgSouv,
        conversionRate,
        sectorDistribution,
        sizeDistribution,
        scoreRanges,
        dailyStats,
        contactStatus,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Admin - Statistiques</h1>
              <p className="text-sm opacity-90 mt-1">Vue d'ensemble des performances</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/admin/contacts"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                Contacts
              </Link>
              <Link
                href="/admin/diagnostics"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                Diagnostics
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period selector */}
        <div className="bg-white rounded-lg shadow p-4 mb-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">Période d'analyse</div>
          <div className="flex gap-2">
            {['7', '30', '90', '365'].map((days) => (
              <button
                key={days}
                onClick={() => setPeriod(days)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  period === days
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {days} jours
              </button>
            ))}
          </div>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Diagnostics</div>
            <div className="text-3xl font-bold text-purple-600">{stats.totalDiag}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Contacts</div>
            <div className="text-3xl font-bold text-pink-600">{stats.totalContacts}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Score ACF moyen</div>
            <div className="text-3xl font-bold text-blue-600">{stats.avgScoreACF}/100</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Souveraineté moy.</div>
            <div className="text-3xl font-bold text-indigo-600">{stats.avgSouv}/100</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Taux conversion</div>
            <div className="text-3xl font-bold text-green-600">{stats.conversionRate}%</div>
            <div className="text-xs text-gray-500 mt-1">Diag → Contact</div>
          </div>
        </div>

        {/* Distribution des scores */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Distribution des scores ACF</h2>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(stats.scoreRanges).map(([label, count], idx) => {
              const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
              const percentage =
                stats.totalDiag > 0 ? Math.round(((count as number) / stats.totalDiag) * 100) : 0
              return (
                <div key={idx}>
                  <div className={`${colors[idx]} text-white rounded-lg p-6 text-center mb-2`}>
                    <div className="text-4xl font-bold">{count as number}</div>
                    <div className="text-sm opacity-90 mt-2">{percentage}%</div>
                  </div>
                  <div className="text-sm text-gray-600 text-center">{label}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Distribution par secteur */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Secteurs d'activité</h2>
            <div className="space-y-3">
              {Object.entries(stats.sectorDistribution || {})
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 10)
                .map(([sector, count], idx) => {
                  const percentage = Math.round(((count as number) / stats.totalDiag) * 100)
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{sector}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {count as number} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Distribution par taille */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Taille des entreprises</h2>
            <div className="space-y-3">
              {Object.entries(stats.sizeDistribution || {})
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([size, count], idx) => {
                  const percentage = Math.round(((count as number) / stats.totalDiag) * 100)
                  const sizeLabels: Record<string, string> = {
                    '1-10': '1-10 employés',
                    '11-50': '11-50 employés',
                    '51-200': '51-200 employés',
                    '201-1000': '201-1000 employés',
                    '1000+': '1000+ employés',
                  }
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">
                          {sizeLabels[size] || size}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {count as number} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>

        {/* Status des contacts */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Pipeline de conversion</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Nouveaux', count: stats.contactStatus.new, color: 'bg-blue-500' },
              { label: 'Contactés', count: stats.contactStatus.contacted, color: 'bg-yellow-500' },
              { label: 'Convertis', count: stats.contactStatus.converted, color: 'bg-green-500' },
              { label: 'Archivés', count: stats.contactStatus.archived, color: 'bg-gray-500' },
            ].map((status, idx) => (
              <div key={idx} className="text-center">
                <div className={`${status.color} text-white rounded-lg p-6 mb-2`}>
                  <div className="text-4xl font-bold">{status.count}</div>
                </div>
                <div className="text-sm text-gray-600">{status.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Évolution quotidienne */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Évolution quotidienne</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Diagnostics
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Score moyen
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.dailyStats || {})
                  .sort(([a], [b]) => new Date(b.split('/').reverse().join('-')).getTime() - new Date(a.split('/').reverse().join('-')).getTime())
                  .slice(0, 14)
                  .map(([date, data]: [string, any], idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{date}</td>
                      <td className="px-4 py-3 text-sm font-medium text-purple-600">
                        {data.diagnostics}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">
                        {data.avgScore}/100
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
