import { jsPDF } from 'jspdf'
import { ACFResults, ACFFormData } from './acf-calculations'
import { getMarketStats } from './market-stats'

function getScoreColor(score: number): [number, number, number] {
  if (score >= 80) return [34, 197, 94]
  if (score >= 60) return [59, 130, 246]
  if (score >= 40) return [249, 115, 22]
  return [239, 68, 68]
}

export function generatePDF(results: ACFResults, formData: ACFFormData): Blob {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  let yPos = 20

  // Header
  doc.setFillColor(139, 92, 246)
  doc.rect(0, 0, 210, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('Diagnostic ACF®', 105, 20, { align: 'center' })
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('Évaluation de votre gouvernance agentique', 105, 30, { align: 'center' })

  yPos = 50

  doc.setTextColor(100, 100, 100)
  doc.setFontSize(10)
  doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 20, yPos)
  yPos += 15

  const colWidth = 58
  const startX = 17

  // SCORES RECENTRÉS : Souveraineté - ACF au milieu - Maturité
  
  // Souveraineté
  const souvColor = getScoreColor(results.scoreSouverainete)
  doc.setFillColor(souvColor[0], souvColor[1], souvColor[2])
  doc.roundedRect(startX, yPos, colWidth, 38, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('SCORE DE SOUVERAINETÉ', startX + colWidth/2, yPos + 6, { align: 'center' })
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text(`${results.scoreSouverainete.toFixed(1)}`, startX + colWidth/2, yPos + 18, { align: 'center' })
  doc.setFontSize(9)
  doc.text('/100', startX + colWidth/2 + 13, yPos + 18)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  const souvLines = doc.splitTextToSize(results.interpretationSouverainete, colWidth - 4)
  doc.text(souvLines[0] || '', startX + colWidth/2, yPos + 28, { align: 'center' })
  if (souvLines[1]) doc.text(souvLines[1], startX + colWidth/2, yPos + 32, { align: 'center' })

  // ACF GLOBAL AU MILIEU - PLUS LARGE POUR ÉVITER TRONCATURE
  const globalColor = getScoreColor(results.scoreGlobal)
  doc.setFillColor(globalColor[0], globalColor[1], globalColor[2])
  doc.roundedRect(startX + colWidth + 3, yPos, colWidth, 38, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('SCORE GLOBAL ACF®', startX + colWidth + 3 + colWidth/2, yPos + 6, { align: 'center' })
  doc.setFontSize(32)
  doc.text(`${results.scoreGlobal}`, startX + colWidth + 3 + colWidth/2, yPos + 19, { align: 'center' })
  doc.setFontSize(10)
  doc.text('/100', startX + colWidth + 3 + colWidth/2 + 11, yPos + 19)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  const globalLines = doc.splitTextToSize(results.interpretationGlobale, colWidth - 4)
  doc.text(globalLines[0] || '', startX + colWidth + 3 + colWidth/2, yPos + 28, { align: 'center' })
  if (globalLines[1]) doc.text(globalLines[1], startX + colWidth + 3 + colWidth/2, yPos + 32, { align: 'center' })

  // Maturité
  const getMaturiteColor = (niveau: number): [number, number, number] => {
    if (niveau === 0) return [100, 100, 100]
    if (niveau === 1) return [59, 130, 246]
    if (niveau === 2) return [34, 197, 94]
    return [139, 92, 246]
  }
  
  const matColor = getMaturiteColor(results.niveauMaturite)
  doc.setFillColor(matColor[0], matColor[1], matColor[2])
  doc.roundedRect(startX + (colWidth + 3) * 2, yPos, colWidth, 38, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('NIVEAU DE MATURITÉ', startX + (colWidth + 3) * 2 + colWidth/2, yPos + 6, { align: 'center' })
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text(`${results.niveauMaturite}`, startX + (colWidth + 3) * 2 + colWidth/2, yPos + 18, { align: 'center' })
  doc.setFontSize(9)
  doc.text('/3', startX + (colWidth + 3) * 2 + colWidth/2 + 7, yPos + 18)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  const matLines = doc.splitTextToSize(results.interpretationMaturite, colWidth - 4)
  doc.text(matLines[0] || '', startX + (colWidth + 3) * 2 + colWidth/2, yPos + 28, { align: 'center' })
  if (matLines[1]) doc.text(matLines[1], startX + (colWidth + 3) * 2 + colWidth/2, yPos + 32, { align: 'center' })

  yPos += 45

  // INTERPRÉTATION GLOBALE (comme dans app)
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  const interpColor = results.scoreGlobal >= 70 ? [34, 197, 94] : results.scoreGlobal >= 50 ? [59, 130, 246] : results.scoreGlobal >= 30 ? [249, 115, 22] : [239, 68, 68]
  doc.setTextColor(interpColor[0], interpColor[1], interpColor[2])
  const interpTitle = results.scoreGlobal >= 70 ? '✅ Excellente gouvernance agentique' :
                      results.scoreGlobal >= 50 ? '👍 Gouvernance solide, à renforcer' :
                      results.scoreGlobal >= 30 ? '⚠️ Gouvernance fragile, action requise' :
                      '🚨 Situation critique, agir d\'urgence'
  doc.text(interpTitle, 105, yPos, { align: 'center' })
  yPos += 8

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  const interpMsg = results.scoreGlobal >= 70 ? 'Votre gouvernance agentique est robuste. Vous avez posé les fondations nécessaires pour contrôler vos agents IA.' :
                    results.scoreGlobal >= 50 ? 'Vous avez une base correcte mais des zones de fragilité persistent. Sans renforcement rapide, vous risquez une perte de contrôle à mesure que vos agents gagnent en autonomie. Les 3 actions prioritaires ci-dessous sont essentielles.' :
                    results.scoreGlobal >= 30 ? 'Votre gouvernance présente des failles critiques. Vous êtes exposé à des décisions IA contraires à vos intérêts business. Action immédiate nécessaire.' :
                    'ALERTE : Votre organisation est en danger. Sans gouvernance, vos agents IA peuvent prendre des décisions catastrophiques. Audit d\'urgence requis.'
  const interpLines = doc.splitTextToSize(interpMsg, 170)
  doc.text(interpLines, 20, yPos)
  yPos += interpLines.length * 4 + 8

  // POSITIONNEMENT MARCHÉ - DESIGN APP (encadrés comme app)
  const stats = getMarketStats()
  doc.setDrawColor(200, 200, 200)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('📊 Positionnement marché', 105, yPos, { align: 'center' })
  yPos += 10

  // Design avec 3 encadrés comme dans l'app
  const boxWidth = 50
  const boxStartX = 30

  // Fourchette basse
  doc.setFillColor(245, 243, 255)
  doc.roundedRect(boxStartX, yPos, boxWidth, 20, 2, 2, 'F')
  doc.setDrawColor(200, 200, 220)
  doc.roundedRect(boxStartX, yPos, boxWidth, 20, 2, 2, 'S')
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text('Fourchette basse', boxStartX + boxWidth/2, yPos + 6, { align: 'center' })
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(139, 92, 246)
  doc.text(`${stats.lower}`, boxStartX + boxWidth/2, yPos + 15, { align: 'center' })

  // Moyenne marché (au milieu, plus visible)
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(boxStartX + boxWidth + 5, yPos, boxWidth, 20, 2, 2, 'F')
  doc.setDrawColor(139, 92, 246)
  doc.setLineWidth(1.5)
  doc.roundedRect(boxStartX + boxWidth + 5, yPos, boxWidth, 20, 2, 2, 'S')
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  doc.text('Moyenne marché', boxStartX + boxWidth + 5 + boxWidth/2, yPos + 6, { align: 'center' })
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(236, 72, 153)
  doc.text(`${stats.average}`, boxStartX + boxWidth + 5 + boxWidth/2, yPos + 15, { align: 'center' })

  // Fourchette haute
  doc.setFillColor(245, 243, 255)
  doc.roundedRect(boxStartX + (boxWidth + 5) * 2, yPos, boxWidth, 20, 2, 2, 'F')
  doc.setDrawColor(200, 200, 220)
  doc.setLineWidth(0.5)
  doc.roundedRect(boxStartX + (boxWidth + 5) * 2, yPos, boxWidth, 20, 2, 2, 'S')
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  doc.text('Fourchette haute', boxStartX + (boxWidth + 5) * 2 + boxWidth/2, yPos + 6, { align: 'center' })
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(139, 92, 246)
  doc.text(`${stats.upper}`, boxStartX + (boxWidth + 5) * 2 + boxWidth/2, yPos + 15, { align: 'center' })

  yPos += 26

  // INTERPRÉTATION POSITIONNEMENT - CENTRÉ
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  const ecart = results.scoreGlobal - stats.average
  if (ecart > 0) {
    doc.setTextColor(34, 197, 94)
    doc.text(`✓ Vous êtes à +${ecart} points au-dessus de la moyenne`, 105, yPos, { align: 'center' })
  } else {
    doc.setTextColor(239, 68, 68)
    doc.text(`⚠ Vous êtes à ${ecart} points en-dessous de la moyenne`, 105, yPos, { align: 'center' })
  }
  yPos += 6
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text(stats.source, 105, yPos, { align: 'center' })
  yPos += 12

  // CHIFFRES QUI FONT PEUR - CENTRÉS
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Les chiffres qui font peur', 105, yPos, { align: 'center' })
  yPos += 10

  // Design compact centré
  const chiffreWidth = 50
  const chiffreStartX = 30

  // 73%
  doc.setFillColor(254, 226, 226)
  doc.roundedRect(chiffreStartX, yPos, chiffreWidth, 16, 2, 2, 'F')
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(220, 38, 38)
  doc.text('73%', chiffreStartX + chiffreWidth/2, yPos + 6, { align: 'center' })
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  const ch1 = doc.splitTextToSize('sans gouvernance', chiffreWidth - 4)
  doc.text(ch1, chiffreStartX + chiffreWidth/2, yPos + 10, { align: 'center' })

  // €2,4M
  doc.setFillColor(254, 226, 226)
  doc.roundedRect(chiffreStartX + chiffreWidth + 5, yPos, chiffreWidth, 16, 2, 2, 'F')
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(220, 38, 38)
  doc.text('€2,4M', chiffreStartX + chiffreWidth + 5 + chiffreWidth/2, yPos + 6, { align: 'center' })
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  const ch2 = doc.splitTextToSize('pertes moyennes', chiffreWidth - 4)
  doc.text(ch2, chiffreStartX + chiffreWidth + 5 + chiffreWidth/2, yPos + 10, { align: 'center' })

  // 89%
  doc.setFillColor(254, 226, 226)
  doc.roundedRect(chiffreStartX + (chiffreWidth + 5) * 2, yPos, chiffreWidth, 16, 2, 2, 'F')
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(220, 38, 38)
  doc.text('89%', chiffreStartX + (chiffreWidth + 5) * 2 + chiffreWidth/2, yPos + 6, { align: 'center' })
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  const ch3 = doc.splitTextToSize('craignent perte', chiffreWidth - 4)
  doc.text(ch3, chiffreStartX + (chiffreWidth + 5) * 2 + chiffreWidth/2, yPos + 10, { align: 'center' })

  yPos += 22

  // LES 3 ACTIONS PRIORITAIRES
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Vos 3 Priorités d\'Action', 105, yPos, { align: 'center' })
  yPos += 10

  results.priorites.slice(0, 3).forEach((priorite, index) => {
    // Cercle violet avec numéro CENTRÉ
    doc.setFillColor(139, 92, 246)
    doc.circle(25, yPos + 2, 4, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`${index + 1}`, 25, yPos + 3.5, { align: 'center' })
    
    // Titre et description
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(priorite.titre, 32, yPos + 3)
    yPos += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(60, 60, 60)
    const prioLines = doc.splitTextToSize(priorite.description, 155)
    doc.text(prioLines, 32, yPos)
    yPos += prioLines.length * 4 + 2
    
    // Badge couche
    doc.setFontSize(7)
    doc.setFillColor(236, 72, 153)
    doc.roundedRect(32, yPos, 20, 5, 1, 1, 'F')
    doc.setTextColor(255, 255, 255)
    doc.text(`Couche ${priorite.couche}`, 42, yPos + 3.5, { align: 'center' })
    
    yPos += 10
  })

  yPos += 5

  doc.addPage()
  yPos = 20

  // Couches AVEC EXPLICATIONS PERSONNALISÉES
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Analyse des 4 Couches Opérationnelles', 20, yPos)
  yPos += 10

  const couches = [
    { 
      nom: 'Couche 1 : Gouvernance & Souveraineté', 
      score: results.scoreCouche1, 
      desc: 'Comité gouvernance, charte souveraineté, matrice responsabilités',
      explGood: 'Excellente structure avec comité actif et charte validée. Fondations solides.',
      explMed: 'En construction. Formalisez rapidement comité et charte pour sécuriser décisions.',
      explBad: 'Absente ou critique. Créez d\'urgence un comité avec rôles définis et charte.'
    },
    { 
      nom: 'Couche 2 : Politique de Décision', 
      score: results.scoreCouche2, 
      desc: 'Objectifs hiérarchisés, seuils sécurité, règles arbitrage',
      explGood: 'Politique claire et documentée. Agents connaissent priorités et limites.',
      explMed: 'Partiellement définie. Complétez hiérarchie objectifs et seuils critiques.',
      explBad: 'Pas formalisée. Agents décident sans cadre, risque de décisions contraires.'
    },
    { 
      nom: 'Couche 3 : Système d\'Agents', 
      score: results.scoreCouche3, 
      desc: 'Mandat explicite par agent, responsable humain identifié',
      explGood: 'Bien structuré avec mandats clairs et responsables pour chaque agent.',
      explMed: 'Structure partielle. Formalisez mandats manquants et assignez responsables.',
      explBad: 'Non documentés. Impossible de savoir qui fait quoi. Risque majeur.'
    },
    { 
      nom: 'Couche 4 : Exécution & Supervision', 
      score: results.scoreCouche4, 
      desc: 'Traçabilité complète, kill switch, monitoring temps réel',
      explGood: 'Exemplaire avec traçabilité complète et kill switch testé. Vous gardez contrôle.',
      explMed: 'Partielle. Complétez logs (3 ans min) et testez kill switch pour crises.',
      explBad: 'Absente. Vous ne pouvez ni auditer ni arrêter. Risque juridique majeur.'
    }
  ]

  couches.forEach((couche) => {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(couche.nom, 20, yPos)
    
    doc.setFontSize(16)
    const scoreColor = couche.score >= 20 ? [34, 197, 94] : couche.score >= 12 ? [249, 115, 22] : [239, 68, 68]
    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2])
    doc.text(`${couche.score}/25`, 180, yPos)
    
    yPos += 6
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    const descLines = doc.splitTextToSize(couche.desc, 160)
    doc.text(descLines, 20, yPos)
    yPos += descLines.length * 3 + 2
    
    // EXPLICATION PERSONNALISÉE
    doc.setFontSize(9)
    doc.setTextColor(60, 60, 60)
    const expl = couche.score >= 20 ? couche.explGood : couche.score >= 12 ? couche.explMed : couche.explBad
    const explLines = doc.splitTextToSize(expl, 160)
    doc.text(explLines, 20, yPos)
    yPos += explLines.length * 4 + 3
    
    doc.setDrawColor(220, 220, 220)
    doc.setLineWidth(2)
    doc.line(20, yPos, 180, yPos)
    
    const progressWidth = (couche.score / 25) * 160
    doc.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2])
    doc.setLineWidth(2)
    doc.line(20, yPos, 20 + progressWidth, yPos)
    
    yPos += 8
  })

  yPos += 5

  // 7 RISQUES MAJEURS
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Les 7 Risques Majeurs Sans Gouvernance Agentique', 20, yPos)
  yPos += 10

  const risques = [
    { titre: '1. Décisions IA contraires aux intérêts business', desc: 'Agents qui optimisent métriques secondaires au détriment de rentabilité réelle' },
    { titre: '2. Perte de contrôle stratégique', desc: 'Impossibilité de piloter ou corriger décisions automatisées en temps réel' },
    { titre: '3. Dépendance critique aux plateformes', desc: 'Blocage Amazon/Google/Meta = arrêt activité pendant des semaines' },
    { titre: '4. Responsabilité juridique engagée', desc: 'Vous êtes légalement responsable même sans contrôle des agents' },
    { titre: '5. Érosion de marge incontrôlée', desc: 'Prix et promos automatiques détruisant rentabilité sans supervision' },
    { titre: '6. Atteinte à l\'image de marque', desc: 'Actions non conformes à positionnement/valeurs diffusées par agents' },
    { titre: '7. Incapacité d\'audit et correction', desc: 'Sans logs ni traçabilité, impossible comprendre ou corriger erreurs' }
  ]

  risques.forEach(risque => {
    doc.setFillColor(254, 226, 226)
    doc.roundedRect(20, yPos, 170, 15, 2, 2, 'F')
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(220, 38, 38)
    doc.text(risque.titre, 25, yPos + 5)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(60, 60, 60)
    const rLines = doc.splitTextToSize(risque.desc, 160)
    doc.text(rLines, 25, yPos + 10)
    yPos += 18
  })

  yPos += 10

  // CONTEXTE DÉTAILLÉ (APRÈS LES 7 RISQUES)
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Contexte détaillé du diagnostic', 20, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  
  const secteurLabels: Record<string, string> = {
    'ecommerce': 'E-commerce / Retail',
    'services': 'Services B2B/B2C',
    'industrie': 'Industrie / Manufacturing',
    'tech': 'Tech / SaaS',
    'finance': 'Finance / Assurance',
    'autre': 'Autre secteur'
  }
  doc.text(`Secteur : ${secteurLabels[formData.secteur] || formData.secteur}`, 20, yPos)
  yPos += 6

  const tailleLabels: Record<string, string> = {
    'tpe': 'TPE (< 10 salariés)',
    'pme': 'PME (10-250 salariés)',
    'eti': 'ETI (250-5000 salariés)',
    'ge': 'Grande Entreprise (> 5000 salariés)'
  }
  doc.text(`Taille : ${tailleLabels[formData.tailleEntreprise] || formData.tailleEntreprise}`, 20, yPos)
  yPos += 6

  const presenceLabels: Record<string, string> = {
    'non': 'Aucun agent IA',
    'quelques': 'Quelques agents en test/production',
    'nombreux': 'Nombreux agents déployés'
  }
  doc.text(`Présence agents IA : ${presenceLabels[formData.presenceAgentsIA] || formData.presenceAgentsIA}`, 20, yPos)
  yPos += 6

  const maturiteLabels: Record<string, string> = {
    'regles-fixes': 'Règles fixes (Niveau 0)',
    'proposent-humains-valident': 'Proposent, humains valident (Niveau 1)',
    'decident-cadre-strict': 'Décident dans cadre strict (Niveau 2)',
    'autonomes-apprennent': 'Autonomes et apprennent (Niveau 3)'
  }
  const fonctLines = doc.splitTextToSize(`Fonctionnement : ${maturiteLabels[formData.fonctionnementAgents] || formData.fonctionnementAgents}`, 170)
  doc.text(fonctLines, 20, yPos)
  yPos += fonctLines.length * 6 + 2

  if (formData.typesAgents && formData.typesAgents.length > 0) {
    const typesLabels: Record<string, string> = {
      'prescripteurs': 'Prescripteurs',
      'transactionnels': 'Transactionnels',
      'operationnels': 'Opérationnels',
      'conformite': 'Conformité',
      'analytiques': 'Analytiques'
    }
    const typesTexte = formData.typesAgents.map(t => typesLabels[t] || t).join(', ')
    const typesLines = doc.splitTextToSize(`Types d'agents : ${typesTexte}`, 170)
    doc.text(typesLines, 20, yPos)
    yPos += typesLines.length * 6 + 4
  }

  doc.text(`Dépendance structurelle (CA plateformes) : ${formData.dependanceStructurelle}%`, 20, yPos)
  yPos += 6
  doc.text(`Dépendance données (détenues par tiers) : ${formData.dependanceDonnees}%`, 20, yPos)
  yPos += 6
  doc.text(`Dépendance trafic (sources non-owned) : ${formData.dependanceTrafic}%`, 20, yPos)
  yPos += 6
  doc.text(`Jours pour retrouver CA si blocage : ${formData.joursBloquesCA} jours`, 20, yPos)
  yPos += 15

  // LIEN ACTIF CLIQUABLE vers /contact
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 10

  doc.setTextColor(59, 130, 246)
  doc.setFont('helvetica', 'underline')
  doc.textWithLink('📞 Planifier un audit complet ACF®', 105, yPos, {
    url: 'https://acf-score.vercel.app/contact',
    align: 'center'
  })
  yPos += 10

  // Footer
  if (yPos > 250) {
    doc.addPage()
    yPos = 20
  }

  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'italic')
  doc.text('Ce diagnostic est une évaluation indicative basée sur vos réponses.', 105, yPos, { align: 'center' })
  doc.text('Pour un audit complet et certifié ACF®, contactez un expert certifié.', 105, yPos + 5, { align: 'center' })
  yPos += 12
  doc.setFont('helvetica', 'normal')
  doc.text('Agentic Commerce Framework® - Méthodologie propriétaire développée par Vincent DORANGE', 105, yPos, { align: 'center' })

  return doc.output('blob')
}

export function downloadPDF(results: ACFResults, formData: ACFFormData) {
  const blob = generatePDF(results, formData)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `Diagnostic-ACF-${new Date().toISOString().split('T')[0]}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}
