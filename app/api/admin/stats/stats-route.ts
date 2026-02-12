import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    // Total
    const totalResult = await sql`SELECT COUNT(*) as count FROM diagnostics`
    const total = parseInt(totalResult.rows[0].count)

    // Moyennes
    const avgResult = await sql`
      SELECT 
        AVG(score_global) as avg_global,
        AVG(score_souverainete) as avg_souv
      FROM diagnostics
    `
    
    // Par secteur
    const secteurResult = await sql`
      SELECT 
        secteur,
        COUNT(*) as count,
        AVG(score_global) as avg
      FROM diagnostics
      WHERE secteur IS NOT NULL
      GROUP BY secteur
      ORDER BY count DESC
    `
    
    // Par taille
    const tailleResult = await sql`
      SELECT 
        taille_entreprise,
        COUNT(*) as count
      FROM diagnostics
      WHERE taille_entreprise IS NOT NULL
      GROUP BY taille_entreprise
      ORDER BY count DESC
    `
    
    // Évolution (7 derniers jours)
    const evolutionResult = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count,
        AVG(score_global) as avg
      FROM diagnostics
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `

    const stats = {
      total,
      moyenneGlobal: parseFloat(avgResult.rows[0].avg_global) || 0,
      moyenneSouverainete: parseFloat(avgResult.rows[0].avg_souv) || 0,
      parSecteur: secteurResult.rows.reduce((acc, row) => {
        acc[row.secteur] = {
          count: parseInt(row.count),
          avg: parseFloat(row.avg)
        }
        return acc
      }, {} as Record<string, { count: number, avg: number }>),
      parTaille: tailleResult.rows.reduce((acc, row) => {
        acc[row.taille_entreprise] = parseInt(row.count)
        return acc
      }, {} as Record<string, number>),
      evolution: evolutionResult.rows.map(row => ({
        date: row.date,
        count: parseInt(row.count),
        avg: parseFloat(row.avg)
      }))
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
