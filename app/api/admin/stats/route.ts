import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    // Total
    const { count: total } = await supabase
      .from('diagnostics')
      .select('*', { count: 'exact', head: true })

    // Moyennes
    const { data: avgData } = await supabase
      .from('diagnostics')
      .select('score_global, score_souverainete')
    
    const avgGlobal = avgData ? avgData.reduce((sum, row) => sum + (row.score_global || 0), 0) / avgData.length : 0
    const avgSouv = avgData ? avgData.reduce((sum, row) => sum + (row.score_souverainete || 0), 0) / avgData.length : 0

    // Par secteur
    const { data: secteurData } = await supabase
      .from('diagnostics')
      .select('secteur, score_global')
      .not('secteur', 'is', null)
    
    const parSecteur: Record<string, { count: number, avg: number }> = {}
    secteurData?.forEach(row => {
      if (!parSecteur[row.secteur]) {
        parSecteur[row.secteur] = { count: 0, avg: 0 }
      }
      parSecteur[row.secteur].count++
      parSecteur[row.secteur].avg += row.score_global || 0
    })
    
    Object.keys(parSecteur).forEach(secteur => {
      parSecteur[secteur].avg = parSecteur[secteur].avg / parSecteur[secteur].count
    })

    // Par taille
    const { data: tailleData } = await supabase
      .from('diagnostics')
      .select('taille_entreprise')
      .not('taille_entreprise', 'is', null)
    
    const parTaille: Record<string, number> = {}
    tailleData?.forEach(row => {
      parTaille[row.taille_entreprise] = (parTaille[row.taille_entreprise] || 0) + 1
    })

    // Évolution (7 derniers jours)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const { data: evolutionData } = await supabase
      .from('diagnostics')
      .select('created_at, score_global')
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: false })
    
    const evolutionByDate: Record<string, { count: number, sum: number }> = {}
    evolutionData?.forEach(row => {
      const date = new Date(row.created_at).toISOString().split('T')[0]
      if (!evolutionByDate[date]) {
        evolutionByDate[date] = { count: 0, sum: 0 }
      }
      evolutionByDate[date].count++
      evolutionByDate[date].sum += row.score_global || 0
    })
    
    const evolution = Object.entries(evolutionByDate).map(([date, data]) => ({
      date,
      count: data.count,
      avg: data.sum / data.count
    }))

    const stats = {
      total: total || 0,
      moyenneGlobal: avgGlobal,
      moyenneSouverainete: avgSouv,
      parSecteur,
      parTaille,
      evolution
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
