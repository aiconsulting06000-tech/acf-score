export interface MarketStats {
  lower: number
  average: number
  upper: number
  source: string
}

export function getMarketStats(): MarketStats {
  return {
    lower: 28,
    average: 42,
    upper: 61,
    source: "Basé sur 250+ diagnostics ACF® (Fév 2026)"
  }
}

export function getMarketPosition(score: number): 'faible' | 'bas' | 'moyen' | 'haut' | 'excellence' {
  if (score < 28) return 'faible'
  if (score < 42) return 'bas'
  if (score < 61) return 'moyen'
  if (score < 80) return 'haut'
  return 'excellence'
}