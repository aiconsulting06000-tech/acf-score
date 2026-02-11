import { jsPDF } from 'jspdf'
import { ACFResults, ACFFormData } from './acf-calculations'
import { getMarketStats } from './market-stats'

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

  // Date
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(10)
  doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 20, yPos)
  yPos += 15

  // Scores principaux - 3 colonnes
  const colWidth = 60
  const startX = 15

  // Score Souveraineté - COULEUR SELON SCORE
  const getSouvColor = (score: number): [number, number, number] => {
    if (score >= 80) return [34, 197, 94] // vert
    if (score >= 60) return [59, 130, 246] // bleu
    if (score >= 40) return [249, 115, 22] // orange
    return [239, 68, 68] // rouge
  }
  
  const souvColor = getSouvColor(results.scoreSouverainete)
  doc.setFillColor(souvColor[0], souvColor[1], souvColor[2])
  doc.roundedRect(startX, yPos, colWidth, 40, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.text('SCORE DE SOUVERAINETÉ', startX + colWidth/2, yPos + 8, { align: 'center' })
  doc.setFontSize(32)
  doc.setFont('helvetica', 'bold')
  doc.text(`${results.scoreSouverainete.toFixed(1)}`, startX + colWidth/2, yPos + 25, { align: 'center' })
  doc.setFontSize(12)
  doc.text('/100', startX + colWidth/2 + 15, yPos + 25)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const souvText = results.interpretationSouverainete.substring(0, 20)
  doc.text(souvText, startX + colWidth/2, yPos + 35, { align: 'center' })

  // Score Global ACF (au milieu)
  doc.setFillColor(139, 92, 246)
  doc.roundedRect(startX + colWidth + 5, yPos, colWidth, 40, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.text('SCORE GLOBAL ACF®', startX + colWidth + 5 + colWidth/2, yPos + 8, { align: 'center' })
  doc.setFontSize(32)
  doc.setFont('helvetica', 'bold')
  doc.text(`${results.scoreGlobal}`, startX + colWidth + 5 + colWidth/2, yPos + 25, { align: 'center' })
  doc.setFontSize(12)
  doc.text('/100', startX + colWidth + 5 + colWidth/2 + 12, yPos + 25)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const globalText = results.interpretationGlobale.substring(0, 20)
  doc.text(globalText, startX + colWidth + 5 + colWidth/2, yPos + 35, { align: 'center' })

  // Niveau Maturité
  const getMaturiteColor = (niveau: number): [number, number, number] => {
    if (niveau === 0) return [100, 100, 100]
    if (niveau === 1) return [59, 130, 246]
    if (niveau === 2) return [34, 197, 94]
    return [139, 92, 246]
  }
  
  const matColor = getMaturiteColor(results.niveauMaturite)
  doc.setFillColor(matColor[0], matColor[1], matColor[2])
  doc.roundedRect(startX + (colWidth + 5) * 2, yPos, colWidth, 40, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.text('NIVEAU DE MATURITÉ', startX + (colWidth + 5) * 2 + colWidth/2, yPos + 8, { align: 'center' })
  doc.setFontSize(32)
  doc.setFont('helvetica', 'bold')
  doc.text(`${results.niveauMaturite}`, startX + (colWidth + 5) * 2 + colWidth/2, yPos + 25, { align: 'center' })
  doc.setFontSize(12)
  doc.text('/3', startX + (colWidth + 5) * 2 + colWidth/2 + 8, yPos + 25)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const maturiteText = results.interpretationMaturite.substring(0, 25)
  doc.text(maturiteText, startX + (colWidth + 5) * 2 + colWidth/2, yPos + 35, { align: 'center' })

  yPos += 50

  // Fourchettes marché
  const stats = getMarketStats()
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Comparaison marché :', 20, yPos)
  yPos += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(`Fourchette basse: ${stats.fourchetteBasse} | Moyenne: ${stats.fourchetteMoyenne} | Haute: ${stats.fourchetteHaute}`, 20, yPos)
  yPos += 4
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(8)
  doc.text(stats.source, 20, yPos)
  yPos += 3
  
  const ecart = results.scoreGlobal - stats.fourchetteMoyenne
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  if (ecart > 0) {
    doc.setTextColor(34, 197, 94)
    doc.text(`✓ Vous êtes à +${ecart} pts au-dessus de la moyenne`, 20, yPos)
  } else {
    doc.setTextColor(239, 68, 68)
    doc.text(`⚠ Vous êtes à ${ecart} pts en-dessous de la moyenne`, 20, yPos)
  }
  yPos += 15

  // Barème d'interprétation
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Barème d\'interprétation Score Global ACF®', 105, yPos, { align: 'center' })
  yPos += 8

  const baremeItems = [
    { range: '80-100', label: 'Excellence', color: [34, 197, 94] },
    { range: '60-79', label: 'Solide', color: [59, 130, 246] },
    { range: '40-59', label: 'À renforcer', color: [249, 115, 22] },
    { range: '0-39', label: 'Critique', color: [239, 68, 68] }
  ]

  const baremeStartX = 30
  const baremeWidth = 35
  baremeItems.forEach((item, index) => {
    const x = baremeStartX + index * (baremeWidth + 5)
    doc.setFillColor(item.color[0], item.color[1], item.color[2])
    doc.roundedRect(x, yPos, baremeWidth, 15, 2, 2, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(item.range, x + baremeWidth/2, yPos + 7, { align: 'center' })
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(item.label, x + baremeWidth/2, yPos + 12, { align: 'center' })
  })

  yPos += 25

  // Nouvelle page pour le reste
  doc.addPage()
  yPos = 20

  // Analyse des 4 Couches
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Analyse des 4 Couches Opérationnelles', 20, yPos)
  yPos += 10

  const couches = [
    { nom: 'Couche 1 : Gouvernance & Souveraineté', score: results.scoreCouche1, desc: 'Comité de gouvernance, charte de souveraineté' },
    { nom: 'Couche 2 : Politique de Décision', score: results.scoreCouche2, desc: 'Objectifs hiérarchisés, seuils de sécurité' },
    { nom: 'Couche 3 : Système d\'Agents', score: results.scoreCouche3, desc: 'Mandat explicite par agent, responsable humain' },
    { nom: 'Couche 4 : Exécution & Supervision', score: results.scoreCouche4, desc: 'Traçabilité complète, mécanisme d\'arrêt d\'urgence' }
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
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text(couche.desc, 20, yPos)
    
    // Barre de progression
    yPos += 4
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

  // Priorités d'action
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Priorités d\'action', 20, yPos)
  yPos += 10

  results.priorites.slice(0, 3).forEach((priorite, index) => {
    // Rond violet avec numéro CENTRÉ
    doc.setFillColor(139, 92, 246)
    doc.circle(23, yPos - 1, 3, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    // CORRECTION : centrage vertical précis
    doc.text(`${index + 1}`, 23, yPos + 0.8, { align: 'center' })
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const lines = doc.splitTextToSize(priorite, 160)
    doc.text(lines, 30, yPos)
    yPos += lines.length * 5 + 5
  })

  yPos += 10

  // Contexte du diagnostic
  doc.setDrawColor(200, 200, 200)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Informations du diagnostic', 20, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  
  // Secteur
  const secteurLabels: Record<string, string> = {
    'ecommerce': 'E-commerce',
    'services': 'Services',
    'industrie': 'Industrie',
    'tech': 'Tech',
    'finance': 'Finance',
    'autre': 'Autre'
  }
  doc.text(`Secteur : ${secteurLabels[formData.secteur] || formData.secteur}`, 20, yPos)
  yPos += 6

  // Taille entreprise
  const tailleLabels: Record<string, string> = {
    'tpe': 'TPE (< 10 salariés)',
    'pme': 'PME (10-250 salariés)',
    'eti': 'ETI (250-5000 salariés)',
    'ge': 'Grande Entreprise (> 5000 salariés)'
  }
  doc.text(`Taille : ${tailleLabels[formData.tailleEntreprise] || formData.tailleEntreprise}`, 20, yPos)
  yPos += 6

  // Présence agents
  const presenceLabels: Record<string, string> = {
    'non': 'Aucun agent IA',
    'quelques': 'Quelques agents IA',
    'nombreux': 'Nombreux agents IA'
  }
  doc.text(`Agents IA : ${presenceLabels[formData.presenceAgentsIA] || formData.presenceAgentsIA}`, 20, yPos)
  yPos += 6

  // Niveau maturité
  const maturiteLabels: Record<string, string> = {
    'regles-fixes': 'Règles fixes (Niveau 0)',
    'proposent-humains-valident': 'Agents assistés (Niveau 1)',
    'decident-cadre-strict': 'Agents gouvernés (Niveau 2)',
    'autonomes-apprennent': 'Agents autonomes (Niveau 3)'
  }
  doc.text(`Fonctionnement : ${maturiteLabels[formData.fonctionnementAgents] || formData.fonctionnementAgents}`, 20, yPos)
  yPos += 6

  // Types agents déployés
  if (formData.typesAgents && formData.typesAgents.length > 0) {
    const typesLabels: Record<string, string> = {
      'prescripteurs': 'Prescripteurs',
      'transactionnels': 'Transactionnels',
      'operationnels': 'Opérationnels',
      'conformite': 'Conformité',
      'analytiques': 'Analytiques'
    }
    const typesTexte = formData.typesAgents.map(t => typesLabels[t] || t).join(', ')
    const typesLines = doc.splitTextToSize(`Types agents : ${typesTexte}`, 170)
    doc.text(typesLines, 20, yPos)
    yPos += typesLines.length * 6 + 4
  }

  yPos += 5

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
