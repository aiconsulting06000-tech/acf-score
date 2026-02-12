import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Hash IP pour anonymisation
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex')
    
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Insérer dans DB
    await sql`
      INSERT INTO diagnostics (
        secteur, taille_entreprise, presence_agents_ia, 
        fonctionnement_agents, types_agents,
        score_global, score_souverainete, niveau_maturite,
        score_couche1, score_couche2, score_couche3, score_couche4,
        user_agent, ip_hash
      ) VALUES (
        ${data.secteur}, ${data.tailleEntreprise}, ${data.presenceAgentsIA},
        ${data.fonctionnementAgents}, ${data.typesAgents || []},
        ${data.scoreGlobal}, ${data.scoreSouverainete}, ${data.niveauMaturite},
        ${data.scoreCouche1}, ${data.scoreCouche2}, ${data.scoreCouche3}, ${data.scoreCouche4},
        ${userAgent}, ${ipHash}
      )
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving diagnostic:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
