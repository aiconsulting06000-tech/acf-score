/**
 * Tests du calculateur ACF Score
 * 
 * Pour exécuter : node tests/calculator.test.js
 */

const { calculateACFScore } = require('../lib/calculator')

// Helper pour afficher les résultats
function assert(condition, message) {
  if (condition) {
    console.log('✅', message)
    return true
  } else {
    console.error('❌', message)
    return false
  }
}

// Tests
console.log('\n🧪 Tests du calculateur ACF Score\n')

let passed = 0
let failed = 0

// Test 1 : Score élevé (souveraineté forte)
console.log('Test 1 : Score élevé (80+)')
const test1 = {
  ds: 20,
  dd: 30,
  dt: 25,
  dtr_days: 5,
  company_name: 'Test Co',
  email: 'test@test.com',
  sector: 'ecommerce'
}
const result1 = calculateACFScore(test1)
const score1 = 100 - (0.2 * 30 + 0.3 * 25 + 0.25 * 25 + (5/60) * 20)
if (assert(Math.abs(result1.score - score1) < 0.1, `Score calculé : ${result1.score.toFixed(1)} (attendu : ~${score1.toFixed(1)})`)) passed++; else failed++
if (assert(result1.score >= 80, 'Score >= 80')) passed++; else failed++
if (assert(result1.level === 'high', 'Niveau = high')) passed++; else failed++
if (assert(result1.levelLabel.includes('forte'), 'Label contient "forte"')) passed++; else failed++

// Test 2 : Score moyen (souveraineté moyenne)
console.log('\nTest 2 : Score moyen (60-79)')
const test2 = {
  ds: 50,
  dd: 40,
  dt: 50,
  dtr_days: 10,
  company_name: 'Test Co',
  email: 'test@test.com',
  sector: 'ecommerce'
}
const result2 = calculateACFScore(test2)
if (assert(result2.score >= 60 && result2.score < 80, `Score dans la fourchette : ${result2.score.toFixed(1)}`)) passed++; else failed++
if (assert(result2.level === 'medium', 'Niveau = medium')) passed++; else failed++

// Test 3 : Score critique (dépendance critique)
console.log('\nTest 3 : Score critique (40-59)')
const test3 = {
  ds: 60,
  dd: 50,
  dt: 70,
  dtr_days: 15,
  company_name: 'Test Co',
  email: 'test@test.com',
  sector: 'ecommerce'
}
const result3 = calculateACFScore(test3)
if (assert(result3.score >= 40 && result3.score < 60, `Score dans la fourchette : ${result3.score.toFixed(1)}`)) passed++; else failed++
if (assert(result3.level === 'low', 'Niveau = low')) passed++; else failed++

// Test 4 : Score très bas (perte de contrôle)
console.log('\nTest 4 : Score très bas (0-39)')
const test4 = {
  ds: 80,
  dd: 70,
  dt: 80,
  dtr_days: 30,
  company_name: 'Test Co',
  email: 'test@test.com',
  sector: 'ecommerce'
}
const result4 = calculateACFScore(test4)
if (assert(result4.score < 40, `Score < 40 : ${result4.score.toFixed(1)}`)) passed++; else failed++
if (assert(result4.level === 'critical', 'Niveau = critical')) passed++; else failed++

// Test 5 : Contributions correctes
console.log('\nTest 5 : Contributions par dimension')
const test5 = {
  ds: 50,
  dd: 40,
  dt: 60,
  dtr_days: 20,
  company_name: 'Test Co',
  email: 'test@test.com',
  sector: 'ecommerce'
}
const result5 = calculateACFScore(test5)
const expectedDS = 0.5 * 30
const expectedDD = 0.4 * 25
const expectedDT = 0.6 * 25
const expectedDTr = (20/60) * 20
if (assert(Math.abs(result5.ds_contribution - expectedDS) < 0.1, `DS contribution : ${result5.ds_contribution.toFixed(1)} (attendu : ${expectedDS.toFixed(1)})`)) passed++; else failed++
if (assert(Math.abs(result5.dd_contribution - expectedDD) < 0.1, `DD contribution : ${result5.dd_contribution.toFixed(1)} (attendu : ${expectedDD.toFixed(1)})`)) passed++; else failed++
if (assert(Math.abs(result5.dt_contribution - expectedDT) < 0.1, `DT contribution : ${result5.dt_contribution.toFixed(1)} (attendu : ${expectedDT.toFixed(1)})`)) passed++; else failed++
if (assert(Math.abs(result5.dtr_contribution - expectedDTr) < 0.1, `DTr contribution : ${result5.dtr_contribution.toFixed(1)} (attendu : ${expectedDTr.toFixed(1)})`)) passed++; else failed++

// Test 6 : DTr plafonné à 60 jours
console.log('\nTest 6 : DTr plafonné à 60 jours')
const test6 = {
  ds: 50,
  dd: 50,
  dt: 50,
  dtr_days: 90, // Plus de 60
  company_name: 'Test Co',
  email: 'test@test.com',
  sector: 'ecommerce'
}
const result6 = calculateACFScore(test6)
const maxDTr = (60/60) * 20 // Devrait être plafonné à 60 jours
if (assert(result6.dtr_contribution <= maxDTr + 0.1, `DTr plafonné : ${result6.dtr_contribution.toFixed(1)} <= ${maxDTr.toFixed(1)}`)) passed++; else failed++

// Test 7 : Recommandations présentes
console.log('\nTest 7 : Recommandations')
if (assert(result1.recommendations.length > 0, 'Recommandations générées')) passed++; else failed++
if (assert(Array.isArray(result1.recommendations), 'Recommandations est un array')) passed++; else failed++

// Test 8 : Valeurs extrêmes (0%)
console.log('\nTest 8 : Valeurs extrêmes (tout à 0)')
const test8 = {
  ds: 0,
  dd: 0,
  dt: 0,
  dtr_days: 0,
  company_name: 'Test Co',
  email: 'test@test.com',
  sector: 'ecommerce'
}
const result8 = calculateACFScore(test8)
if (assert(result8.score === 100, `Score parfait : ${result8.score}`)) passed++; else failed++
if (assert(result8.level === 'high', 'Niveau = high')) passed++; else failed++

// Test 9 : Valeurs extrêmes (100%)
console.log('\nTest 9 : Valeurs extrêmes (tout à 100)')
const test9 = {
  ds: 100,
  dd: 100,
  dt: 100,
  dtr_days: 60,
  company_name: 'Test Co',
  email: 'test@test.com',
  sector: 'ecommerce'
}
const result9 = calculateACFScore(test9)
if (assert(result9.score === 0, `Score minimal : ${result9.score}`)) passed++; else failed++
if (assert(result9.level === 'critical', 'Niveau = critical')) passed++; else failed++

// Test 10 : Structure du résultat
console.log('\nTest 10 : Structure du résultat')
if (assert(typeof result1.score === 'number', 'score est un nombre')) passed++; else failed++
if (assert(typeof result1.level === 'string', 'level est une string')) passed++; else failed++
if (assert(typeof result1.levelLabel === 'string', 'levelLabel est une string')) passed++; else failed++
if (assert(typeof result1.interpretation === 'string', 'interpretation est une string')) passed++; else failed++
if (assert(typeof result1.ds_contribution === 'number', 'ds_contribution est un nombre')) passed++; else failed++
if (assert(typeof result1.dd_contribution === 'number', 'dd_contribution est un nombre')) passed++; else failed++
if (assert(typeof result1.dt_contribution === 'number', 'dt_contribution est un nombre')) passed++; else failed++
if (assert(typeof result1.dtr_contribution === 'number', 'dtr_contribution est un nombre')) passed++; else failed++

// Résumé
console.log('\n' + '='.repeat(50))
console.log(`\n📊 Résultat : ${passed} tests passés, ${failed} tests échoués`)
if (failed === 0) {
  console.log('\n✅ Tous les tests sont passés !\n')
  process.exit(0)
} else {
  console.log(`\n❌ ${failed} test(s) ont échoué\n`)
  process.exit(1)
}
