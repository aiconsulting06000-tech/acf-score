import type { FormData, ScoreResult } from './types'

export function calculateACFScore(formData: FormData): ScoreResult {
  // Normalisation des valeurs (0-1)
  const ds = formData.ds / 100
  const dd = formData.dd / 100
  const dt = formData.dt / 100
  const dtr = Math.min(formData.dtr_days / 60, 1) // Plafonné à 1

  // Calcul des contributions
  const ds_contribution = ds * 30
  const dd_contribution = dd * 25
  const dt_contribution = dt * 25
  const dtr_contribution = dtr * 20

  // Formule ACF®
  const rawScore = 100 - (ds_contribution + dd_contribution + dt_contribution + dtr_contribution)
  const score = Math.round(rawScore * 10) / 10

  // Déterminer le niveau
  let level: ScoreResult['level']
  let levelLabel: string
  let interpretation: string
  let recommendations: string[]

  if (score >= 80) {
    level = 'good'
    levelLabel = 'Souveraineté forte'
    interpretation = 'Votre organisation maintient un contrôle élevé sur ses décisions stratégiques. Les dépendances sont limitées et gérables.'
    recommendations = [
      'Maintenir ce niveau de souveraineté',
      'Surveiller les évolutions du marché',
      'Documenter vos bonnes pratiques',
    ]
  } else if (score >= 60) {
    level = 'medium'
    levelLabel = 'Souveraineté moyenne'
    interpretation = 'Votre organisation a des dépendances gérables mais qui nécessitent une surveillance active. Des améliorations sont possibles.'
    recommendations = [
      'Développer un plan de diversification',
      'Renforcer vos capacités internes',
      'Identifier les dépendances critiques à réduire',
    ]
  } else if (score >= 40) {
    level = 'warning'
    levelLabel = 'Dépendance critique'
    interpretation = 'Votre organisation subit une perte de contrôle significative. Un plan d\'action urgent est nécessaire.'
    recommendations = [
      'Lancer un audit approfondi de souveraineté',
      'Diversifier immédiatement les canaux critiques',
      'Établir un plan de réduction de dépendances sur 12 mois',
    ]
  } else {
    level = 'critical'
    levelLabel = 'Perte de contrôle'
    interpretation = 'Situation dangereuse : votre organisation a perdu le contrôle sur ses décisions stratégiques. Une restructuration profonde est nécessaire.'
    recommendations = [
      'Déclencher un plan d\'urgence',
      'Consulter un expert en souveraineté commerciale',
      'Restructurer l\'architecture de dépendances (18-24 mois)',
    ]
  }

  // Recommandations spécifiques par dimension
  if (formData.ds > 50) {
    recommendations.push(`Réduire la dépendance structurelle (actuellement ${formData.ds}%, objectif <30%)`)
  }
  if (formData.dt > 70) {
    recommendations.push(`Développer les canaux d'acquisition organique (actuellement ${formData.dt}% payant)`)
  }
  if (formData.dtr_days > 15) {
    recommendations.push(`Négocier les délais de paiement (actuellement ${formData.dtr_days} jours, objectif <7j)`)
  }

  return {
    score,
    level,
    levelLabel,
    ds_contribution,
    dd_contribution,
    dt_contribution,
    dtr_contribution,
    interpretation,
    recommendations,
  }
}
