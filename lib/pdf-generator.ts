import jsPDF from 'jspdf'
import type { FormData, ScoreResult } from './types'
import { SECTOR_LABELS } from './types'

export async function generatePDF(formData: FormData, result: ScoreResult, score: number) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  
  // Couleurs ACF
  const primaryColor: [number, number, number] = [147, 51, 234] // #9333EA
  const accentColor: [number, number, number] = [236, 72, 153] // #EC4899
  
  // Helper functions
  const addHeader = (pageNum: number, totalPages: number) => {
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.rect(0, 0, pageWidth, 15, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Score ACF® - Rapport de Souveraineté', margin, 10)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(`Page ${pageNum}/${totalPages}`, pageWidth - margin, 10, { align: 'right' })
  }
  
  const addFooter = () => {
    doc.setTextColor(128, 128, 128)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'italic')
    const footerY = pageHeight - 10
    doc.text('© 2026 Vincent DORANGE - Agentic Commerce Framework®', pageWidth / 2, footerY, { align: 'center' })
  }
  
  const getScoreColor = (score: number): [number, number, number] => {
    if (score >= 80) return [16, 185, 129] // green
    if (score >= 60) return [245, 158, 11] // yellow
    if (score >= 40) return [239, 68, 68] // orange/red
    return [220, 38, 38] // red
  }
  
  // ==================== PAGE 1: COVER ====================
  
  addHeader(1, 6)
  
  // Gradient background simulation
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(0, 15, pageWidth, 80, 'F')
  
  // Title
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(32)
  doc.setFont('helvetica', 'bold')
  doc.text('RAPPORT DE', pageWidth / 2, 45, { align: 'center' })
  doc.text('SOUVERAINETÉ ACF®', pageWidth / 2, 60, { align: 'center' })
  
  // Company name if provided
  if (formData.company_name) {
    doc.setFontSize(16)
    doc.setFont('helvetica', 'normal')
    doc.text(formData.company_name, pageWidth / 2, 80, { align: 'center' })
  }
  
  // Score box
  const scoreColor = getScoreColor(score)
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(margin + 30, 110, contentWidth - 60, 60, 5, 5, 'F')
  
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2])
  doc.setFontSize(48)
  doc.setFont('helvetica', 'bold')
  doc.text(score.toFixed(1), pageWidth / 2, 145, { align: 'center' })
  
  doc.setTextColor(80, 80, 80)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(result.levelLabel, pageWidth / 2, 160, { align: 'center' })
  
  // Date
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const today = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
  doc.text(`Généré le ${today}`, pageWidth / 2, 190, { align: 'center' })
  
  // Info box
  doc.setFillColor(240, 240, 250)
  doc.roundedRect(margin, 210, contentWidth, 40, 3, 3, 'F')
  doc.setTextColor(80, 80, 80)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Ce rapport évalue votre niveau de souveraineté commerciale selon', pageWidth / 2, 220, { align: 'center' })
  doc.text('la méthodologie ACF® (Agentic Commerce Framework).', pageWidth / 2, 228, { align: 'center' })
  doc.text(`Secteur d'activité : ${SECTOR_LABELS[formData.sector]}`, pageWidth / 2, 240, { align: 'center' })
  
  addFooter()
  
  // ==================== PAGE 2: SCORE & INTERPRETATION ====================
  
  doc.addPage()
  addHeader(2, 6)
  
  let yPos = 25
  
  // Title
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Votre Score de Souveraineté', margin, yPos)
  yPos += 15
  
  // Score summary box
  doc.setFillColor(250, 250, 250)
  doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, 'F')
  
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2])
  doc.setFontSize(36)
  doc.setFont('helvetica', 'bold')
  doc.text(score.toFixed(1), margin + 30, yPos + 22)
  
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(result.levelLabel, margin + 70, yPos + 15)
  
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const lines = doc.splitTextToSize(result.interpretation, contentWidth - 80)
  doc.text(lines, margin + 70, yPos + 24)
  
  yPos += 45
  
  // Détail des contributions
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Détail du calcul', margin, yPos)
  yPos += 10
  
  const contributions = [
    { label: 'Dépendance Structurelle (DS)', value: formData.ds, contrib: result.ds_contribution },
    { label: 'Dépendance Données (DD)', value: formData.dd, contrib: result.dd_contribution },
    { label: 'Dépendance Trafic (DT)', value: formData.dt, contrib: result.dt_contribution },
    { label: 'Dépendance Trésorerie (DTr)', value: formData.dtr_days, contrib: result.dtr_contribution, unit: ' jours' }
  ]
  
  contributions.forEach(item => {
    doc.setFillColor(245, 245, 245)
    doc.roundedRect(margin, yPos, contentWidth, 18, 2, 2, 'F')
    
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(item.label, margin + 5, yPos + 7)
    
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`${item.value}${item.unit || '%'}`, margin + 5, yPos + 14)
    
    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2])
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(`-${item.contrib.toFixed(1)}`, pageWidth - margin - 5, yPos + 11, { align: 'right' })
    
    yPos += 22
  })
  
  // Total
  yPos += 5
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setLineWidth(1)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  yPos += 8
  
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Score Final', margin + 5, yPos)
  
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2])
  doc.setFontSize(16)
  doc.text(score.toFixed(1), pageWidth - margin - 5, yPos, { align: 'right' })
  
  yPos += 15
  
  // Barème d'interprétation
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Barème d\'interprétation', margin, yPos)
  yPos += 10
  
  const scales = [
    { range: '80-100', label: 'Souveraineté forte', color: [16, 185, 129] as [number, number, number] },
    { range: '60-79', label: 'Souveraineté moyenne', color: [245, 158, 11] as [number, number, number] },
    { range: '40-59', label: 'Dépendance critique', color: [239, 68, 68] as [number, number, number] },
    { range: '0-39', label: 'Perte de contrôle', color: [220, 38, 38] as [number, number, number] }
  ]
  
  scales.forEach(scale => {
    doc.setFillColor(scale.color[0], scale.color[1], scale.color[2])
    doc.circle(margin + 3, yPos + 3, 2, 'F')
    
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(scale.range, margin + 8, yPos + 5)
    
    doc.setFont('helvetica', 'normal')
    doc.text(scale.label, margin + 28, yPos + 5)
    
    yPos += 8
  })
  
  yPos += 10
  
  // Comparatif sectoriel
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Comparatif sectoriel', margin, yPos)
  yPos += 10
  
  doc.setFillColor(250, 245, 255)
  doc.roundedRect(margin, yPos, contentWidth, 28, 3, 3, 'F')
  
  // Moyenne e-commerce
  doc.setTextColor(120, 120, 120)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('Moyenne E-commerce', margin + contentWidth/4, yPos + 8, { align: 'center' })
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('42', margin + contentWidth/4, yPos + 20, { align: 'center' })
  
  // Votre score
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('VOTRE SCORE', pageWidth/2, yPos + 8, { align: 'center' })
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2])
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text(score.toFixed(0), pageWidth/2, yPos + 20, { align: 'center' })
  
  // Top performers
  doc.setTextColor(120, 120, 120)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('Top performers', margin + 3*contentWidth/4, yPos + 8, { align: 'center' })
  doc.setTextColor(16, 185, 129)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('78+', margin + 3*contentWidth/4, yPos + 20, { align: 'center' })
  
  // Note comparative
  if (score > 42) {
    doc.setTextColor(16, 185, 129)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.text(`+${score - 42} pts vs moyenne`, pageWidth/2, yPos + 25, { align: 'center' })
  } else if (score < 42) {
    doc.setTextColor(239, 68, 68)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.text(`${score - 42} pts vs moyenne`, pageWidth/2, yPos + 25, { align: 'center' })
  }
  
  addFooter()
  
  // ==================== PAGE 3: ANALYSE DÉTAILLÉE ====================
  
  doc.addPage()
  addHeader(3, 6)
  
  yPos = 25
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Analyse détaillée', margin, yPos)
  yPos += 15
  
  // Points faibles critiques
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('⚠️  Points de vigilance identifiés', margin, yPos)
  yPos += 8
  
  const weaknesses = []
  if (formData.ds > 50) weaknesses.push(`Forte dépendance structurelle (${formData.ds}%) : risque de perte de contrôle commercial majeur`)
  if (formData.dd > 60) weaknesses.push(`Dépendance données critiq ue (${formData.dd}%) : décisions pilotées par des acteurs externes`)
  if (formData.dt > 70) weaknesses.push(`Dépendance trafic élevée (${formData.dt}%) : vulnérabilité acquisition client`)
  if (formData.dtr_days > 15) weaknesses.push(`Trésorerie bloquée (${formData.dtr_days} jours) : tension financière potentielle`)
  
  if (weaknesses.length === 0) {
    weaknesses.push('Aucun point critique majeur identifié. Situation sous contrôle.')
  }
  
  weaknesses.forEach((weakness, index) => {
    doc.setFillColor(255, 245, 245)
    doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'F')
    
    doc.setTextColor(220, 38, 38)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`${index + 1}.`, margin + 3, yPos + 7)
    
    doc.setTextColor(60, 60, 60)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const weaknessLines = doc.splitTextToSize(weakness, contentWidth - 15)
    doc.text(weaknessLines, margin + 10, yPos + 7)
    
    yPos += 24
  })
  
  yPos += 5
  
  // Points forts
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('✓  Points forts identifiés', margin, yPos)
  yPos += 8
  
  const strengths = []
  if (formData.ds <= 30) strengths.push(`Indépendance structurelle forte (${formData.ds}%)`)
  if (formData.dd <= 40) strengths.push(`Maîtrise des données (${formData.dd}% externe seulement)`)
  if (formData.dt <= 50) strengths.push(`Acquisition diversifiée (${formData.dt}% payant)`)
  if (formData.dtr_days <= 7) strengths.push(`Trésorerie fluide (${formData.dtr_days} jours)`)
  
  if (strengths.length === 0) {
    strengths.push('Opportunités d\'amélioration significatives à explorer.')
  }
  
  strengths.forEach((strength, index) => {
    doc.setFillColor(240, 255, 240)
    doc.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'F')
    
    doc.setTextColor(16, 185, 129)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`${index + 1}.`, margin + 3, yPos + 7)
    
    doc.setTextColor(60, 60, 60)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(strength, margin + 10, yPos + 7)
    
    yPos += 15
  })
  
  addFooter()
  
  // ==================== PAGE 4: RECOMMANDATIONS ====================
  
  doc.addPage()
  addHeader(4, 6)
  
  yPos = 25
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Recommandations prioritaires', margin, yPos)
  yPos += 15
  
  result.recommendations.forEach((reco, index) => {
    // Numéro dans un cercle
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.circle(margin + 4, yPos + 3, 4, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text((index + 1).toString(), margin + 4, yPos + 5, { align: 'center' })
    
    // Texte de la recommandation
    doc.setTextColor(60, 60, 60)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    const recoLines = doc.splitTextToSize(reco, contentWidth - 15)
    doc.text(recoLines, margin + 12, yPos + 5)
    
    yPos += Math.max(12, recoLines.length * 5 + 5)
    
    if (yPos > pageHeight - 30 && index < result.recommendations.length - 1) {
      addFooter()
      doc.addPage()
      addHeader(4, 6)
      yPos = 25
    }
  })
  
  yPos += 10
  
  // Timeline suggérée
  if (yPos < pageHeight - 60) {
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Timeline d\'action suggérée', margin, yPos)
    yPos += 10
    
    const timeline = [
      { period: 'Court terme (0-3 mois)', action: 'Audit approfondi + Quick wins immédiats' },
      { period: 'Moyen terme (3-12 mois)', action: 'Implémentation plan de réduction dépendances' },
      { period: 'Long terme (12+ mois)', action: 'Consolidation souveraineté + monitoring continu' }
    ]
    
    timeline.forEach(item => {
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.text(item.period, margin, yPos)
      
      doc.setTextColor(80, 80, 80)
      doc.setFont('helvetica', 'normal')
      doc.text(item.action, margin, yPos + 5)
      
      yPos += 12
    })
    
    yPos += 15
    
    // Note gouvernance et AI Act
    doc.setFillColor(255, 250, 240)
    doc.roundedRect(margin, yPos, contentWidth, 45, 3, 3, 'F')
    
    doc.setTextColor(180, 83, 9)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('⚠️  Alerte : Gouvernance & Conformité AI Act', margin + 5, yPos + 8)
    
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    const aiActText = [
      'En 2026, 40% des décisions d\'achat B2B sont gérées par des agents IA autonomes.',
      'Un Score ACF® faible (<50) indique une perte de gouvernance : les algorithmes',
      'des plateformes décident pour vous (pricing, merchandising, budget).',
      '',
      'AI Act européen (2024) : Sanctions jusqu\'à 35M€ ou 7% CA mondial pour systèmes',
      'IA opaques non conformes. Score < 50 = risque audit réglementaire élevé.',
    ]
    aiActText.forEach((line, i) => {
      doc.text(line, margin + 5, yPos + 16 + (i * 4))
    })
  }
  
  addFooter()
  
  // ==================== PAGE 5: MÉTHODOLOGIE ====================
  
  doc.addPage()
  addHeader(5, 6)
  
  yPos = 25
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Méthodologie ACF®', margin, yPos)
  yPos += 12
  
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const methodText = [
    'Le Score de Souveraineté ACF® est calculé selon une méthode propriétaire qui évalue',
    'votre niveau de contrôle sur vos décisions commerciales stratégiques.',
    '',
    'Le score est basé sur 4 dimensions critiques :'
  ]
  methodText.forEach(line => {
    doc.text(line, margin, yPos)
    yPos += 5
  })
  
  yPos += 5
  
  // Les 4 dimensions
  const dimensions = [
    {
      code: 'DS',
      name: 'Dépendance Structurelle',
      desc: 'Mesure la concentration de votre chiffre d\'affaires sur une ou plusieurs plateformes externes.'
    },
    {
      code: 'DD',
      name: 'Dépendance Données',
      desc: 'Évalue le degré auquel vos décisions business reposent sur des données hors de votre contrôle.'
    },
    {
      code: 'DT',
      name: 'Dépendance Trafic',
      desc: 'Analyse votre dépendance aux canaux d\'acquisition payants pour générer du trafic.'
    },
    {
      code: 'DTr',
      name: 'Dépendance Trésorerie',
      desc: 'Quantifie l\'impact des délais de paiement imposés par des tiers sur votre trésorerie.'
    }
  ]
  
  dimensions.forEach(dim => {
    doc.setFillColor(240, 240, 250)
    doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'F')
    
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.circle(margin + 5, yPos + 7, 3, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text(dim.code, margin + 5, yPos + 8.5, { align: 'center' })
    
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(dim.name, margin + 12, yPos + 7)
    
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    const descLines = doc.splitTextToSize(dim.desc, contentWidth - 15)
    doc.text(descLines, margin + 12, yPos + 12)
    
    yPos += 24
  })
  
  yPos += 5
  
  // Limites
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Limites de l\'outil', margin, yPos)
  yPos += 7
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const limits = [
    '• Ce score est un indicateur synthétique basé sur vos déclarations.',
    '• Un audit approfondi est recommandé pour une analyse complète.',
    '• Les recommandations sont génériques et doivent être adaptées à votre contexte.',
    '• Ce rapport n\'a pas de valeur contractuelle ou d\'engagement.'
  ]
  limits.forEach(limit => {
    doc.text(limit, margin, yPos)
    yPos += 5
  })
  
  addFooter()
  
  // ==================== PAGE 6: À PROPOS & CONTACT ====================
  
  doc.addPage()
  addHeader(6, 6)
  
  yPos = 25
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('À propos du framework ACF®', margin, yPos)
  yPos += 12
  
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const aboutText = [
    'L\'Agentic Commerce Framework® (ACF) est une méthodologie propriétaire',
    'développée par Vincent DORANGE pour aider les organisations à maîtriser',
    'leur souveraineté opérationnelle face à l\'émergence des agents IA autonomes.',
    '',
    'CONTEXTE 2026 : 40% des décisions d\'achat B2B sont déjà gérées par des',
    'agents IA (Amazon AI, Shopify Sidekick, Meta Advantage+, ChatGPT Shopping).',
    'Ces agents prennent des décisions pour vos clients : vous recommandent-ils ?',
    '',
    'Le framework ACF® évalue votre capacité à :',
    '  • Contrôler VOS données pour entraîner VOS propres agents',
    '  • Conserver la gouvernance de vos opérations (commercial, logistique, SAV)',
    '  • Garder l\'autonomie face aux agents des plateformes',
    '  • Investir dans votre souveraineté technologique',
    '  • Assurer la conformité réglementaire (AI Act, RGPD)',
  ]
  
  aboutText.forEach(line => {
    doc.text(line, margin, yPos)
    yPos += 5
  })
  
  yPos += 10
  
  // Nos offres
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Nos offres', margin, yPos)
  yPos += 10
  
  const offers = [
    {
      title: 'SaaS ACF - Monitoring continu',
      desc: 'Dashboard temps réel, 18 KPIs, alertes automatiques, rapports mensuels',
      price: 'À partir de 299€/mois'
    },
    {
      title: 'Formation Praticien ACF',
      desc: 'Certification officielle 3 jours pour maîtriser la méthodologie',
      price: '2500€ HT'
    },
    {
      title: 'Audit + Implémentation',
      desc: 'Accompagnement complet sur 3-6 mois avec tous les templates',
      price: 'Sur devis (40-150K€)'
    }
  ]
  
  offers.forEach(offer => {
    doc.setFillColor(250, 250, 255)
    doc.roundedRect(margin, yPos, contentWidth, 22, 2, 2, 'F')
    
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(offer.title, margin + 5, yPos + 7)
    
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    const offerDesc = doc.splitTextToSize(offer.desc, contentWidth - 50)
    doc.text(offerDesc, margin + 5, yPos + 12)
    
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(offer.price, pageWidth - margin - 5, yPos + 15, { align: 'right' })
    
    yPos += 26
  })
  
  yPos += 10
  
  // Contact
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Prêt à améliorer votre souveraineté ?', pageWidth / 2, yPos + 10, { align: 'center' })
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('📧 contact@acfscore.com', pageWidth / 2, yPos + 20, { align: 'center' })
  doc.text('🌐 www.acfscore.com', pageWidth / 2, yPos + 27, { align: 'center' })
  
  addFooter()
  
  // Generate PDF
  return doc
}
