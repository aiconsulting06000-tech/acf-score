export interface FormData {
  ds: number          // Dépendance Structurelle (0-100%)
  dd: number          // Dépendance Données (0-100%)
  dt: number          // Dépendance Trafic (0-100%)
  dtr_days: number    // Dépendance Trésorerie (jours)
  company_name?: string
  email?: string
  sector: string
}

export interface ScoreResult {
  score: number
  level: 'critical' | 'warning' | 'medium' | 'good'
  levelLabel: string
  ds_contribution: number
  dd_contribution: number
  dt_contribution: number
  dtr_contribution: number
  interpretation: string
  recommendations: string[]
}

export const SECTOR_LABELS: Record<string, string> = {
  ecommerce: 'E-commerce / Retail',
  saas: 'SaaS / Software',
  finance: 'Finance / Assurance',
  industrie: 'Industrie / B2B',
  autre: 'Autre',
}

export const SECTOR_BENCHMARKS: Record<string, number> = {
  ecommerce: 42,
  saas: 65,
  finance: 58,
  industrie: 71,
  autre: 55,
}
