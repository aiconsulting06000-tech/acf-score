import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Hash IP pour anonymisation
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex')
    
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Insérer dans Supabase
    const { error } = await supabase
      .from('diagnostics')
      .insert({
        secteur: data.secteur,
        taille_entreprise: data.tailleEntreprise,
        presence_agents_ia: data.presenceAgentsIA,
        fonctionnement_agents: data.fonctionnementAgents,
        types_agents: data.typesAgents || [],
        score_global: data.scoreGlobal,
        score_souverainete: data.scoreSouverainete,
        niveau_maturite: data.niveauMaturite,
        score_couche1: data.scoreCouche1,
        score_couche2: data.scoreCouche2,
        score_couche3: data.scoreCouche3,
        score_couche4: data.scoreCouche4,
        user_agent: userAgent,
        ip_hash: ipHash
      })
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving diagnostic:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
