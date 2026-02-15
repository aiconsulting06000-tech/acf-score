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

  let yPos = 15

  // HEADER COMPACT
  doc.setFillColor(139, 92, 246)
  doc.rect(0, 0, 210, 25, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('Diagnostic ACF - ' + new Date().toLocaleDateString('fr-FR'), 105, 15, { align: 'center' })

  yPos = 35

  const colWidth = 58
  const startX = 17

  // SCORES (3 COLONNES)
  const souvColor = getScoreColor(results.scoreSouverainete)
  doc.setFillColor(souvColor[0], souvColor[1], souvColor[2])
  doc.roundedRect(startX, yPos, colWidth, 35, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('SCORE DE SOUVERAINETE', startX + colWidth/2, yPos + 5, { align: 'center' })
  doc.setFontSize(26)
  doc.setFont('helvetica', 'bold')
  doc.text(results.scoreSouverainete.toFixed(1).toString(), startX + colWidth/2, yPos + 16, { align: 'center' })
  doc.setFontSize(9)
  doc.text('/100', startX + colWidth/2 + 12, yPos + 16)

  const globalColor = getScoreColor(results.scoreGlobal)
  doc.setFillColor(globalColor[0], globalColor[1], globalColor[2])
  doc.roundedRect(startX + colWidth + 3, yPos, colWidth, 35, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('SCORE GLOBAL ACF', startX + colWidth + 3 + colWidth/2, yPos + 5, { align: 'center' })
  doc.setFontSize(28)
  doc.text(results.scoreGlobal.toString(), startX + colWidth + 3 + colWidth/2, yPos + 17, { align: 'center' })
  doc.setFontSize(9)
  doc.text('/100', startX + colWidth + 3 + colWidth/2 + 10, yPos + 17)

  const getMaturiteColor = (niveau: number): [number, number, number] => {
    if (niveau === 0) return [100, 100, 100]
    if (niveau === 1) return [59, 130, 246]
    if (niveau === 2) return [34, 197, 94]
    return [139, 92, 246]
  }
  
  const matColor = getMaturiteColor(results.niveauMaturite)
  doc.setFillColor(matColor[0], matColor[1], matColor[2])
  doc.roundedRect(startX + (colWidth + 3) * 2, yPos, colWidth, 35, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('NIVEAU DE MATURITE', startX + (colWidth + 3) * 2 + colWidth/2, yPos + 5, { align: 'center' })
  doc.setFontSize(26)
  doc.setFont('helvetica', 'bold')
  doc.text(results.niveauMaturite.toString(), startX + (colWidth + 3) * 2 + colWidth/2, yPos + 16, { align: 'center' })
  doc.setFontSize(9)
  doc.text('/3', startX + (colWidth + 3) * 2 + colWidth/2 + 6, yPos + 16)

  yPos += 42

  // INTERPRETATION GLOBALE
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 7

  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  const interpColor = results.scoreGlobal >= 70 ? [34, 197, 94] : results.scoreGlobal >= 50 ? [59, 130, 246] : results.scoreGlobal >= 30 ? [249, 115, 22] : [239, 68, 68]
  doc.setTextColor(interpColor[0], interpColor[1], interpColor[2])
  const interpTitle = results.scoreGlobal >= 70 ? 'Excellente gouvernance agentique' :
                      results.scoreGlobal >= 50 ? 'Gouvernance solide, a renforcer' :
                      results.scoreGlobal >= 30 ? 'Gouvernance fragile, action requise' :
                      'Situation critique, agir d\'urgence'
  doc.text(interpTitle, 105, yPos, { align: 'center' })
  yPos += 7

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  const interpMsg = results.scoreGlobal >= 70 ? 'Votre gouvernance agentique est robuste. Vous avez pose les fondations necessaires pour controler vos agents IA.' :
                    results.scoreGlobal >= 50 ? 'Vous avez une base correcte mais des zones de fragilite persistent. Sans renforcement rapide, vous risquez une perte de controle a mesure que vos agents gagnent en autonomie.' :
                    results.scoreGlobal >= 30 ? 'Votre gouvernance presente des failles critiques. Vous etes expose a des decisions IA contraires a vos interets business. Action immediate necessaire.' :
                    'ALERTE : Votre organisation est en danger. Sans gouvernance, vos agents IA peuvent prendre des decisions catastrophiques. Audit d\'urgence requis.'
  const interpLines = doc.splitTextToSize(interpMsg, 170)
  doc.text(interpLines, 20, yPos)
  yPos += interpLines.length * 4 + 8

  // POSITIONNEMENT MARCHE
  const stats = getMarketStats()
  doc.setDrawColor(200, 200, 200)
  doc.line(20, yPos, 190, yPos)
  yPos += 7

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Positionnement marche', 105, yPos, { align: 'center' })
  yPos += 9

  const boxWidth = 50
  const boxStartX = 30

  doc.setFillColor(245, 243, 255)
  doc.roundedRect(boxStartX, yPos, boxWidth, 18, 2, 2, 'F')
  doc.setDrawColor(200, 200, 220)
  doc.roundedRect(boxStartX, yPos, boxWidth, 18, 2, 2, 'S')
  doc.setFontSize(7)
  doc.setTextColor(100, 100, 100)
  doc.text('Fourchette basse', boxStartX + boxWidth/2, yPos + 5, { align: 'center' })
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(139, 92, 246)
  doc.text(stats.lower.toString(), boxStartX + boxWidth/2, yPos + 13, { align: 'center' })

  doc.setFillColor(255, 255, 255)
  doc.roundedRect(boxStartX + boxWidth + 5, yPos, boxWidth, 18, 2, 2, 'F')
  doc.setDrawColor(139, 92, 246)
  doc.setLineWidth(1.5)
  doc.roundedRect(boxStartX + boxWidth + 5, yPos, boxWidth, 18, 2, 2, 'S')
  doc.setFontSize(7)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  doc.text('Moyenne marche', boxStartX + boxWidth + 5 + boxWidth/2, yPos + 5, { align: 'center' })
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(236, 72, 153)
  doc.text(stats.average.toString(), boxStartX + boxWidth + 5 + boxWidth/2, yPos + 13, { align: 'center' })

  doc.setFillColor(245, 243, 255)
  doc.roundedRect(boxStartX + (boxWidth + 5) * 2, yPos, boxWidth, 18, 2, 2, 'F')
  doc.setDrawColor(200, 200, 220)
  doc.setLineWidth(0.5)
  doc.roundedRect(boxStartX + (boxWidth + 5) * 2, yPos, boxWidth, 18, 2, 2, 'S')
  doc.setFontSize(7)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  doc.text('Fourchette haute', boxStartX + (boxWidth + 5) * 2 + boxWidth/2, yPos + 5, { align: 'center' })
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(139, 92, 246)
  doc.text(stats.upper.toString(), boxStartX + (boxWidth + 5) * 2 + boxWidth/2, yPos + 13, { align: 'center' })

  yPos += 22

  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  const ecart = results.scoreGlobal - stats.average
  if (ecart > 0) {
    doc.setTextColor(34, 197, 94)
    doc.text('Vous etes a +' + ecart + ' points au-dessus de la moyenne', 105, yPos, { align: 'center' })
  } else {
    doc.setTextColor(239, 68, 68)
    doc.text('Vous etes a ' + ecart + ' points en-dessous de la moyenne', 105, yPos, { align: 'center' })
  }
  yPos += 4
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text(stats.source, 105, yPos, { align: 'center' })
  yPos += 10

  // LES 3 ACTIONS PRIORITAIRES - ESPACEMENT AMELIORE
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 7

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Vos 3 Priorites d\'Action', 105, yPos, { align: 'center' })
  yPos += 10

  results.priorites.slice(0, 3).forEach((priorite, index) => {
    doc.setFillColor(139, 92, 246)
    doc.circle(24, yPos + 2, 3.5, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text((index + 1).toString(), 24, yPos + 3, { align: 'center' })
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(priorite.titre, 32, yPos + 3)
    yPos += 7
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(60, 60, 60)
    const prioLines = doc.splitTextToSize(priorite.description, 155)
    doc.text(prioLines, 32, yPos)
    yPos += prioLines.length * 4 + 3
    
    doc.setFontSize(6)
    doc.setFillColor(236, 72, 153)
    doc.roundedRect(32, yPos, 18, 4, 1, 1, 'F')
    doc.setTextColor(255, 255, 255)
    doc.text('Couche ' + priorite.couche, 41, yPos + 2.5, { align: 'center' })
    
    yPos += 9
  })

  // BOUTON AUDIT SOUS LES ACTIONS
  yPos += 3
  doc.setTextColor(59, 130, 246)
  doc.setFont('helvetica', 'underline')
  doc.setFontSize(10)
  doc.textWithLink('Planifier un audit complet ACF', 105, yPos, {
    url: 'https://acf-score.vercel.app/contact',
    align: 'center'
  })
  yPos += 10

  // NOUVELLE PAGE POUR LES 4 COUCHES
  doc.addPage()
  yPos = 20

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text('Analyse des 4 Couches Operationnelles', 20, yPos)
  yPos += 8

  const couches = [
    { 
      nom: 'Couche 1 : Gouvernance & Souverainete', 
      score: results.scoreCouche1, 
      desc: 'Comite gouvernance, charte souverainete, matrice responsabilites',
      explGood: 'Excellente structure avec comite actif et charte validee. Fondations solides.',
      explMed: 'En construction. Formalisez rapidement comite et charte pour securiser decisions.',
      explBad: 'Absente ou critique. Creez d\'urgence un comite avec roles definis et charte.'
    },
    { 
      nom: 'Couche 2 : Politique de Decision', 
      score: results.scoreCouche2, 
      desc: 'Objectifs hierarchises, seuils securite, regles arbitrage',
      explGood: 'Politique claire et documentee. Agents connaissent priorites et limites.',
      explMed: 'Partiellement definie. Completez hierarchie objectifs et seuils critiques.',
      explBad: 'Pas formalisee. Agents decident sans cadre, risque de decisions contraires.'
    },
    { 
      nom: 'Couche 3 : Systeme d\'Agents', 
      score: results.scoreCouche3, 
      desc: 'Mandat explicite par agent, responsable humain identifie',
      explGood: 'Bien structure avec mandats clairs et responsables pour chaque agent.',
      explMed: 'Structure partielle. Formalisez mandats manquants et assignez responsables.',
      explBad: 'Non documentes. Impossible de savoir qui fait quoi. Risque majeur.'
    },
    { 
      nom: 'Couche 4 : Execution & Supervision', 
      score: results.scoreCouche4, 
      desc: 'Tracabilite complete, kill switch, monitoring temps reel',
      explGood: 'Exemplaire avec tracabilite complete et kill switch teste. Vous gardez controle.',
      explMed: 'Partielle. Completez logs (3 ans min) et testez kill switch pour crises.',
      explBad: 'Absente. Vous ne pouvez ni auditer ni arreter. Risque juridique majeur.'
    }
  ]

  couches.forEach((couche) => {
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(couche.nom, 20, yPos)
    
    doc.setFontSize(15)
    const scoreColor = couche.score >= 20 ? [34, 197, 94] : couche.score >= 12 ? [249, 115, 22] : [239, 68, 68]
    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2])
    doc.text(couche.score + '/25', 180, yPos)
    
    yPos += 5
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    const descLines = doc.splitTextToSize(couche.desc, 160)
    doc.text(descLines, 20, yPos)
    yPos += descLines.length * 3 + 2
    
    doc.setFontSize(8)
    doc.setTextColor(60, 60, 60)
    const expl = couche.score >= 20 ? couche.explGood : couche.score >= 12 ? couche.explMed : couche.explBad
    const explLines = doc.splitTextToSize(expl, 160)
    doc.text(explLines, 20, yPos)
    yPos += explLines.length * 3.5 + 2
    
    doc.setDrawColor(220, 220, 220)
    doc.setLineWidth(2)
    doc.line(20, yPos, 180, yPos)
    
    const progressWidth = (couche.score / 25) * 160
    doc.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2])
    doc.setLineWidth(2)
    doc.line(20, yPos, 20 + progressWidth, yPos)
    
    yPos += 8
  })

  // CHIFFRES QUI FONT PEUR
  if (yPos > 225) {
    doc.addPage()
    yPos = 20
  }

  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 6

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Les chiffres qui font peur', 105, yPos, { align: 'center' })
  yPos += 8

  const chiffreWidth = 50
  const chiffreStartX = 30

  doc.setFillColor(254, 226, 226)
  doc.roundedRect(chiffreStartX, yPos, chiffreWidth, 14, 2, 2, 'F')
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(220, 38, 38)
  doc.text('73%', chiffreStartX + chiffreWidth/2, yPos + 5, { align: 'center' })
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  const ch1 = doc.splitTextToSize('sans gouvernance', chiffreWidth - 4)
  doc.text(ch1, chiffreStartX + chiffreWidth/2, yPos + 9, { align: 'center' })

  doc.setFillColor(254, 226, 226)
  doc.roundedRect(chiffreStartX + chiffreWidth + 5, yPos, chiffreWidth, 14, 2, 2, 'F')
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(220, 38, 38)
  doc.text('2,4M', chiffreStartX + chiffreWidth + 5 + chiffreWidth/2, yPos + 5, { align: 'center' })
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  const ch2 = doc.splitTextToSize('pertes moyennes', chiffreWidth - 4)
  doc.text(ch2, chiffreStartX + chiffreWidth + 5 + chiffreWidth/2, yPos + 9, { align: 'center' })

  doc.setFillColor(254, 226, 226)
  doc.roundedRect(chiffreStartX + (chiffreWidth + 5) * 2, yPos, chiffreWidth, 14, 2, 2, 'F')
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(220, 38, 38)
  doc.text('89%', chiffreStartX + (chiffreWidth + 5) * 2 + chiffreWidth/2, yPos + 5, { align: 'center' })
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  const ch3 = doc.splitTextToSize('craignent perte', chiffreWidth - 4)
  doc.text(ch3, chiffreStartX + (chiffreWidth + 5) * 2 + chiffreWidth/2, yPos + 9, { align: 'center' })

  yPos += 18

  // 7 RISQUES MAJEURS
  if (yPos > 225) {
    doc.addPage()
    yPos = 20
  }

  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 6

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Les 7 Risques Majeurs Sans Gouvernance Agentique', 20, yPos)
  yPos += 8

  const risques = [
    { titre: '1. Decisions IA contraires aux interets business', desc: 'Agents qui optimisent metriques secondaires au detriment de rentabilite reelle' },
    { titre: '2. Perte de controle strategique', desc: 'Impossibilite de piloter ou corriger decisions automatisees en temps reel' },
    { titre: '3. Dependance critique aux plateformes', desc: 'Blocage Amazon/Google/Meta = arret activite pendant des semaines' },
    { titre: '4. Responsabilite juridique engagee', desc: 'Vous etes legalement responsable meme sans controle des agents' },
    { titre: '5. Erosion de marge incontrolee', desc: 'Prix et promos automatiques detruisant rentabilite sans supervision' },
    { titre: '6. Atteinte a l\'image de marque', desc: 'Actions non conformes a positionnement/valeurs diffusees par agents' },
    { titre: '7. Incapacite d\'audit et correction', desc: 'Sans logs ni tracabilite, impossible comprendre ou corriger erreurs' }
  ]

  risques.forEach(risque => {
    if (yPos > 268) {
      doc.addPage()
      yPos = 20
    }

    doc.setFillColor(254, 226, 226)
    doc.roundedRect(20, yPos, 170, 13, 2, 2, 'F')
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(220, 38, 38)
    doc.text(risque.titre, 25, yPos + 4)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(60, 60, 60)
    const rLines = doc.splitTextToSize(risque.desc, 160)
    doc.text(rLines, 25, yPos + 9)
    yPos += 15
  })

  yPos += 8

  // CONTEXTE DETAILLE
  if (yPos > 225) {
    doc.addPage()
    yPos = 20
  }

  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(20, yPos, 190, yPos)
  yPos += 6

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Contexte detaille du diagnostic', 20, yPos)
  yPos += 8

  doc.setFontSize(9)
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
  doc.text('Secteur : ' + (secteurLabels[formData.secteur] || formData.secteur), 20, yPos)
  yPos += 5

  const tailleLabels: Record<string, string> = {
    'tpe': 'TPE (< 10 salaries)',
    'pme': 'PME (10-250 salaries)',
    'eti': 'ETI (250-5000 salaries)',
    'ge': 'Grande Entreprise (> 5000 salaries)'
  }
  doc.text('Taille : ' + (tailleLabels[formData.tailleEntreprise] || formData.tailleEntreprise), 20, yPos)
  yPos += 5

  const presenceLabels: Record<string, string> = {
    'non': 'Aucun agent IA',
    'quelques': 'Quelques agents en test/production',
    'nombreux': 'Nombreux agents deployes'
  }
  doc.text('Presence agents IA : ' + (presenceLabels[formData.presenceAgentsIA] || formData.presenceAgentsIA), 20, yPos)
  yPos += 5

  const maturiteLabels: Record<string, string> = {
    'regles-fixes': 'Regles fixes (Niveau 0)',
    'proposent-humains-valident': 'Proposent, humains valident (Niveau 1)',
    'decident-cadre-strict': 'Decident dans cadre strict (Niveau 2)',
    'autonomes-apprennent': 'Autonomes et apprennent (Niveau 3)'
  }
  const fonctLines = doc.splitTextToSize('Fonctionnement : ' + (maturiteLabels[formData.fonctionnementAgents] || formData.fonctionnementAgents), 170)
  doc.text(fonctLines, 20, yPos)
  yPos += fonctLines.length * 5 + 2

  if (formData.typesAgents && formData.typesAgents.length > 0) {
    const typesLabels: Record<string, string> = {
      'prescripteurs': 'Prescripteurs',
      'transactionnels': 'Transactionnels',
      'operationnels': 'Operationnels',
      'conformite': 'Conformite',
      'analytiques': 'Analytiques'
    }
    const typesTexte = formData.typesAgents.map(t => typesLabels[t] || t).join(', ')
    const typesLines = doc.splitTextToSize('Types d\'agents : ' + typesTexte, 170)
    doc.text(typesLines, 20, yPos)
    yPos += typesLines.length * 5 + 3
  }

  doc.text('Dependance structurelle (CA plateformes) : ' + formData.dependanceStructurelle + '%', 20, yPos)
  yPos += 5
  doc.text('Dependance donnees (detenues par tiers) : ' + formData.dependanceDonnees + '%', 20, yPos)
  yPos += 5
  doc.text('Dependance trafic (sources non-owned) : ' + formData.dependanceTrafic + '%', 20, yPos)
  yPos += 5
  doc.text('Jours pour retrouver CA si blocage : ' + formData.joursBloquesCA + ' jours', 20, yPos)
  yPos += 12

  if (yPos > 270) {
    doc.addPage()
    yPos = 20
  }

  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'italic')
  doc.text('Ce diagnostic est une evaluation indicative basee sur vos reponses.', 105, yPos, { align: 'center' })
  doc.text('Pour un audit complet et certifie ACF, contactez un expert certifie.', 105, yPos + 4, { align: 'center' })
  yPos += 10
  doc.setFont('helvetica', 'normal')
  doc.text('Agentic Commerce Framework - Methodologie propriete developpee par Vincent DORANGE', 105, yPos, { align: 'center' })

  return doc.output('blob')
}

export function downloadPDF(results: ACFResults, formData: ACFFormData) {
  const blob = generatePDF(results, formData)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'Diagnostic-ACF-' + new Date().toISOString().split('T')[0] + '.pdf'
  link.click()
  URL.revokeObjectURL(url)
}
