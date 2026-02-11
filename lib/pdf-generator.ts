import { jsPDF } from 'jspdf'
import { ACFResults } from './acf-calculations'

export function generatePDF(results: ACFResults): Blob {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  let yPos = 20

  // Header
  doc.setFillColor(139, 92, 246) // primary color
  doc.rect(0, 0, 210, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('Diagnostic ACF®', 105, 20, { align: 'center' })
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('Analyse complète de votre souveraineté opérationnelle', 105, 30, { align: 'center' })

  yPos = 50

  // Date
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(10)
  doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 20, yPos)
  yPos += 15

  // Scores principaux - 3 colonnes
  const colWidth = 60
  const startX = 15

  // Score Souveraineté
  doc.setFillColor(59, 130, 246) // blue
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
  doc.text(results.interpretationSouverainete, startX + colWidth/2, yPos + 35, { align: 'center' })

  // Score Global ACF (au milieu)
  doc.setFillColor(139, 92, 246) // primary
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
  doc.text(results.interpretationGlobale, startX + colWidth + 5 + colWidth/2, yPos + 35, { align: 'center' })

  // Niveau Maturité
  doc.setFillColor(34, 197, 94) // green
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
  const maturiteText = results.interpretationMaturite.substring(0, 35)
  doc.text(maturiteText, startX + (colWidth + 5) * 2 + colWidth/2, yPos + 35, { align: 'center' })

  yPos += 50

  // Score moyen marché
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const scoreMoyen = 42
  const ecart = results.scoreGlobal - scoreMoyen
  doc.text(`Moyenne marché : ${scoreMoyen}/100 | Votre écart : ${ecart > 0 ? '+' : ''}${ecart} points`, 105, yPos, { align: 'center' })
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

  // Analyse des 4 Couches
  doc.setDrawColor(200, 200, 200)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

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

  // Nouvelle page pour recommandations si nécessaire
  if (yPos > 240) {
    doc.addPage()
    yPos = 20
  } else {
    yPos += 10
  }

  // Recommandations
  doc.setDrawColor(200, 200, 200)
  doc.line(20, yPos, 190, yPos)
  yPos += 8

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Priorités d\'action', 20, yPos)
  yPos += 10

  results.priorites.slice(0, 3).forEach((priorite, index) => {
    doc.setFillColor(139, 92, 246)
    doc.circle(23, yPos - 2, 3, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(`${index + 1}`, 23, yPos + 1, { align: 'center' })
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const lines = doc.splitTextToSize(priorite, 160)
    doc.text(lines, 30, yPos)
    yPos += lines.length * 5 + 5
  })

  yPos += 10

  // Footer
  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'italic')
  doc.text('Ce diagnostic est une évaluation indicative. Pour un audit complet conforme au framework ACF®,', 105, yPos, { align: 'center' })
  doc.text('contactez un expert certifié.', 105, yPos + 5, { align: 'center' })
  yPos += 12
  doc.setFont('helvetica', 'normal')
  doc.text('Agentic Commerce Framework® - Méthodologie propriétaire développée par Vincent DORANGE', 105, yPos, { align: 'center' })

  return doc.output('blob')
}

export function downloadPDF(results: ACFResults) {
  const blob = generatePDF(results)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `Diagnostic-ACF-${new Date().toISOString().split('T')[0]}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}
