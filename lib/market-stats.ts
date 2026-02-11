// Statistiques de marché ACF basées sur 250+ diagnostics réels

export interface MarketStats {
  scoreMoyen: number
  fourchetteBasse: number
  fourchetteMoyenne: number
  fourchetteHaute: number
  source: string
}

export function getMarketStats(): MarketStats {
  return {
    scoreMoyen: 42,
    fourchetteBasse: 28,
    fourchetteMoyenne: 42,
    fourchetteHaute: 61,
    source: "Basé sur 250+ diagnostics ACF® (Jan 2025)"
  }
}

export function getMarketPosition(scoreGlobal: number): 'faible' | 'moyenne' | 'haute' | 'excellence' {
  const stats = getMarketStats()
  
  if (scoreGlobal >= 70) return 'excellence'
  if (scoreGlobal >= stats.fourchetteHaute) return 'haute'
  if (scoreGlobal >= stats.fourchetteBasse) return 'moyenne'
  return 'faible'
}
