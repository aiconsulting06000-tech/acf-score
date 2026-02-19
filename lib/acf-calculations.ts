// Agentic Commerce Framework® - Calcul du Score de Souveraineté
// Version 2.0 - Basé sur le framework complet

export interface ACFFormData {
  // PARTIE 1 : Contexte
  secteur: string
  tailleEntreprise: string
  presenceAgentsIA: string
  
  // PARTIE 2 : Maturité Agentique
  fonctionnementAgents: string
  zonesInterdites: string
  typesAgents: string[]
  
  // PARTIE 3 : Gouvernance (Couche 1)
  comiteGouvernance: string
  charteSouverainete: string
  
  // PARTIE 4 : Politique de Décision (Couche 2)
  objectifsHierarchises: string
  seuilsSecurite: string
  
  // PARTIE 5 : Système d'Agents (Couche 3)
  mandatExplicite: string
  responsableHumain: string
  
  // PARTIE 6 : Supervision (Couche 4)
  systemeLogs: string
  mecanismeArret: string
  
  // PARTIE 7 : Dépendances (Score Souveraineté)
  dependanceStructurelle: number
  dependanceDonnees: number
  dependanceTrafic: number
  joursBloquesCA: number
}

export interface Priorite {
  titre: string
  description: string
  couche: number
}

export interface ACFResults {
  // Scores principaux
  scoreSouverainete: number
  niveauMaturite: number
  scoreGlobal: number
  
  // Scores par couche
  scoreCouche1: number // Gouvernance
  scoreCouche2: number // Politique
  scoreCouche3: number // Système
  scoreCouche4: number // Supervision
  
  // Détails
  interpretationSouverainete: string
  interpretationMaturite: string
  interpretationGlobale: string
  
  // Agents déployés
  agentsDeployes: {
    prescripteurs: boolean
    transactionnels: boolean
    operationnels: boolean
    conformite: boolean
    analytiques: boolean
  }
  
  // Recommandations
  recommandations: string[]
  priorites: Priorite[]
}

// Calcul du Score de Souveraineté (formule originale du framework)
function calculerScoreSouverainete(data: ACFFormData): number {
  const DS = data.dependanceStructurelle / 100
  const DD = data.dependanceDonnees / 100
  const DT = data.dependanceTrafic / 100
  const DTr = Math.min(data.joursBloquesCA / 60, 1) // Plafonné à 1
  
  const score = 100 - ((DS * 30) + (DD * 25) + (DT * 25) + (DTr * 20))
  
  return Math.round(score * 10) / 10 // Arrondi à 1 décimale
}

// Interprétation du Score de Souveraineté
function interpreterScoreSouverainete(score: number): string {
  if (score >= 80) return "Souveraineté forte"
  if (score >= 60) return "Souveraineté moyenne"
  if (score >= 40) return "Dépendance critique"
  return "Perte de contrôle"
}

// Calcul du Niveau de Maturité Agentique (0-3)
function calculerNiveauMaturite(data: ACFFormData): number {
  if (data.presenceAgentsIA === "non") return 0
  
  const fonctionnement = data.fonctionnementAgents
  
  if (fonctionnement === "regles-fixes") return 0
  if (fonctionnement === "proposent-humains-valident") return 1
  if (fonctionnement === "decident-cadre-strict") return 2
  if (fonctionnement === "autonomes-apprennent") return 3
  
  return 0
}

// Interprétation du Niveau de Maturité
function interpreterNiveauMaturite(niveau: number): string {
  const interpretations = [
    "Automatisation classique",
    "Agents assistés",
    "Agents gouvernés (cible recommandée)",
    "Agents autonomes supervisés"
  ]
  return interpretations[niveau] || "Non évalué"
}

// Calcul Score Couche 1 : Gouvernance & Souveraineté (25 points)
function calculerScoreCouche1(data: ACFFormData): number {
  let score = 0
  
  // Comité de gouvernance (12 points)
  if (data.comiteGouvernance === "oui-actif") score += 12
  else if (data.comiteGouvernance === "en-creation") score += 6
  
  // Charte de souveraineté (13 points)
  if (data.charteSouverainete === "oui-validee") score += 13
  else if (data.charteSouverainete === "en-redaction") score += 6
  
  return score
}

// Calcul Score Couche 2 : Politique de Décision (25 points)
function calculerScoreCouche2(data: ACFFormData): number {
  let score = 0
  
  // Objectifs hiérarchisés (13 points)
  if (data.objectifsHierarchises === "oui-complet") score += 13
  else if (data.objectifsHierarchises === "partiellement") score += 6
  
  // Seuils de sécurité (12 points)
  if (data.seuilsSecurite === "oui-tous") score += 12
  else if (data.seuilsSecurite === "partiellement") score += 6
  
  return score
}

// Calcul Score Couche 3 : Système d'Agents (25 points)
function calculerScoreCouche3(data: ACFFormData): number {
  let score = 0
  
  // Mandat explicite (13 points)
  if (data.mandatExplicite === "oui-tous") score += 13
  else if (data.mandatExplicite === "partiellement") score += 6
  
  // Responsable humain (12 points)
  if (data.responsableHumain === "oui-tous") score += 12
  else if (data.responsableHumain === "certains") score += 6
  
  return score
}

// Calcul Score Couche 4 : Exécution & Supervision (25 points)
function calculerScoreCouche4(data: ACFFormData): number {
  let score = 0
  
  // Système de logs (13 points)
  if (data.systemeLogs === "oui-complet") score += 13
  else if (data.systemeLogs === "partiel") score += 6
  
  // Mécanisme d'arrêt (12 points)
  if (data.mecanismeArret === "oui-teste") score += 12
  else if (data.mecanismeArret === "oui-non-teste") score += 6
  
  return score
}

// Calcul du Score Global ACF® (100 points)
function calculerScoreGlobal(
  scoreCouche1: number,
  scoreCouche2: number,
  scoreCouche3: number,
  scoreCouche4: number
): number {
  return scoreCouche1 + scoreCouche2 + scoreCouche3 + scoreCouche4
}

// Interprétation du Score Global
function interpreterScoreGlobal(score: number): string {
  if (score >= 80) return "Excellence en gouvernance agentique"
  if (score >= 60) return "Gouvernance solide, améliorations possibles"
  if (score >= 40) return "Gouvernance à renforcer significativement"
  return "Gouvernance absente ou critique"
}

// Identification des agents déployés
function identifierAgents(typesAgents: string[]) {
  return {
    prescripteurs: typesAgents.includes("prescripteurs"),
    transactionnels: typesAgents.includes("transactionnels"),
    operationnels: typesAgents.includes("operationnels"),
    conformite: typesAgents.includes("conformite"),
    analytiques: typesAgents.includes("analytiques")
  }
}

// Génération des recommandations personnalisées
function genererRecommandations(data: ACFFormData, results: Partial<ACFResults>): string[] {
  const recommandations: string[] = []
  
  // Recommandations selon maturité
  if (results.niveauMaturite === 0) {
    recommandations.push("Démarrez par l'identification de décisions optimisables avec des agents assistés (Niveau 1)")
  } else if (results.niveauMaturite === 1) {
    recommandations.push("Progressez vers le Niveau 2 avec un cadre de gouvernance strict")
  } else if (results.niveauMaturite === 3) {
    recommandations.push("Renforcez la supervision : niveau 3 nécessite une gouvernance maximale")
  }
  
  // Recommandations selon couches
  if ((results.scoreCouche1 || 0) < 15) {
    recommandations.push("Priorité : Créer un comité de gouvernance agentique avec rôles définis")
  }
  
  if ((results.scoreCouche2 || 0) < 15) {
    recommandations.push("Documenter vos objectifs business hiérarchisés et vos seuils de sécurité")
  }
  
  if ((results.scoreCouche3 || 0) < 15) {
    recommandations.push("Formaliser un mandat explicite pour chaque agent avec responsable identifié")
  }
  
  if ((results.scoreCouche4 || 0) < 15) {
    recommandations.push("Mettre en place la traçabilité complète des décisions (logs, 3 ans minimum)")
  }
  
  // Recommandations selon souveraineté
  if ((results.scoreSouverainete || 0) < 60) {
    recommandations.push("Réduire la dépendance aux plateformes tierces (diversification, DTC)")
  }
  
  if (data.zonesInterdites !== "oui-verrouillees") {
    recommandations.push("Définir et verrouiller techniquement les zones non délégables")
  }
  
  if (data.mecanismeArret !== "oui-teste") {
    recommandations.push("Implémenter et tester un mécanisme d'arrêt d'urgence (kill switch)")
  }
  
  return recommandations.slice(0, 5) // Max 5 recommandations
}

// Génération des priorités d'action - CORRIGÉ POUR TOUJOURS AVOIR 3 PRIORITÉS
function genererPriorites(results: ACFResults): Priorite[] {
  const priorites: Priorite[] = []
  
  // Identifier les couches par score (triées par score croissant)
  const couches = [
    { nom: "Gouvernance & Souveraineté", score: results.scoreCouche1, numero: 1, description: "Comité de gouvernance et charte de souveraineté" },
    { nom: "Politique de Décision", score: results.scoreCouche2, numero: 2, description: "Objectifs hiérarchisés et seuils de sécurité" },
    { nom: "Système d'Agents", score: results.scoreCouche3, numero: 3, description: "Mandats explicites et responsables humains" },
    { nom: "Exécution & Supervision", score: results.scoreCouche4, numero: 4, description: "Logs traçables et mécanisme d'arrêt" }
  ]
  
  couches.sort((a, b) => a.score - b.score)
  
  // Priorité 1 : Couche la plus faible
  priorites.push({
    titre: `Renforcer ${couches[0].nom}`,
    description: `Score actuel : ${couches[0].score}/25. ${couches[0].description}`,
    couche: couches[0].numero
  })
  
  // Priorité 2 : Deuxième couche la plus faible
  priorites.push({
    titre: `Améliorer ${couches[1].nom}`,
    description: `Score actuel : ${couches[1].score}/25. ${couches[1].description}`,
    couche: couches[1].numero
  })
  
  // Priorité 3 : TOUJOURS ajoutée
  if (results.niveauMaturite === 0) {
    priorites.push({
      titre: "Initier un projet pilote",
      description: "Démarrez avec un premier agent assisté (Niveau 1) pour tester la gouvernance",
      couche: 0
    })
  } else if (results.niveauMaturite >= 2 && results.scoreGlobal < 60) {
    priorites.push({
      titre: "Alerte : Gouvernance insuffisante",
      description: "Votre niveau d'autonomie nécessite une gouvernance plus forte pour éviter les risques",
      couche: 1
    })
  } else {
    // FALLBACK : Troisième couche la plus faible
    priorites.push({
      titre: `Consolider ${couches[2].nom}`,
      description: `Score actuel : ${couches[2].score}/25. ${couches[2].description}`,
      couche: couches[2].numero
    })
  }
  
  return priorites
}

// Fonction principale de calcul
export function calculerResultatsACF(data: ACFFormData): ACFResults {
  // Calculs des scores
  const scoreSouverainete = calculerScoreSouverainete(data)
  const niveauMaturite = calculerNiveauMaturite(data)
  
  const scoreCouche1 = calculerScoreCouche1(data)
  const scoreCouche2 = calculerScoreCouche2(data)
  const scoreCouche3 = calculerScoreCouche3(data)
  const scoreCouche4 = calculerScoreCouche4(data)
  
  const scoreGlobal = calculerScoreGlobal(scoreCouche1, scoreCouche2, scoreCouche3, scoreCouche4)
  
  // Interprétations
  const interpretationSouverainete = interpreterScoreSouverainete(scoreSouverainete)
  const interpretationMaturite = interpreterNiveauMaturite(niveauMaturite)
  const interpretationGlobale = interpreterScoreGlobal(scoreGlobal)
  
  // Agents
  const agentsDeployes = identifierAgents(data.typesAgents)
  
  // Construction résultats partiels pour recommandations
  const resultsPartial: Partial<ACFResults> = {
    scoreSouverainete,
    niveauMaturite,
    scoreGlobal,
    scoreCouche1,
    scoreCouche2,
    scoreCouche3,
    scoreCouche4
  }
  
  // Recommandations
  const recommandations = genererRecommandations(data, resultsPartial)
  
  // Résultats finaux
  const results: ACFResults = {
    scoreSouverainete,
    niveauMaturite,
    scoreGlobal,
    scoreCouche1,
    scoreCouche2,
    scoreCouche3,
    scoreCouche4,
    interpretationSouverainete,
    interpretationMaturite,
    interpretationGlobale,
    agentsDeployes,
    recommandations,
    priorites: genererPriorites({
      ...resultsPartial as ACFResults,
      agentsDeployes,
      interpretationSouverainete,
      interpretationMaturite,
      interpretationGlobale,
      recommandations,
      priorites: []
    })
  }
  
  return results
}

// Export des fonctions utilitaires pour les composants
export { interpreterScoreSouverainete, interpreterNiveauMaturite, interpreterScoreGlobal }
