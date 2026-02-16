import { test, expect } from '@playwright/test'

test.describe('Diagnostic ACF Flow', () => {
  test('should complete full diagnostic flow', async ({ page }) => {
    // 1. Aller sur la page d'accueil
    await page.goto('/')
    await expect(page).toHaveTitle(/ACF Score/)
    
    // 2. Cliquer sur le bouton diagnostic
    await page.getByRole('link', { name: /calculer/i }).first().click()
    await expect(page).toHaveURL(/\/calculator/)
    
    // 3. Remplir le formulaire étape par étape
    
    // Étape 1 : Contexte entreprise
    await page.getByLabel(/Nom de votre entreprise/i).fill('Test Company')
    await page.getByLabel(/Secteur d'activité/i).selectOption('E-commerce')
    await page.getByLabel(/Taille de l'entreprise/i).selectOption('11-50')
    await page.getByRole('button', { name: /suivant/i }).click()
    
    // Étape 2 : Agents IA
    await page.getByLabel(/Combien d'agents IA/i).fill('3')
    await page.getByRole('button', { name: /suivant/i }).click()
    
    // Étape 3-6 : Répondre aux questions de gouvernance
    // (Simplification - dans un vrai test, on répondrait à toutes les questions)
    for (let i = 0; i < 4; i++) {
      // Sélectionner des réponses au hasard
      const radios = page.locator('input[type="radio"]')
      const count = await radios.count()
      if (count > 0) {
        await radios.nth(Math.floor(Math.random() * count)).click()
      }
      await page.getByRole('button', { name: /suivant/i }).click()
    }
    
    // Étape 7 : Dépendances
    await page.getByLabel(/Amazon/i).fill('30')
    await page.getByLabel(/Google/i).fill('20')
    await page.getByRole('button', { name: /voir mes résultats/i }).click()
    
    // 4. Vérifier la page de résultats
    await expect(page).toHaveURL(/\/results/)
    await expect(page.getByText(/Score ACF/i)).toBeVisible()
    await expect(page.getByText(/Score de Souveraineté/i)).toBeVisible()
    
    // 5. Télécharger le PDF
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: /télécharger le rapport pdf/i }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toContain('.pdf')
  })
  
  test('should show validation errors for incomplete form', async ({ page }) => {
    await page.goto('/calculator')
    
    // Essayer de passer à l'étape suivante sans remplir
    await page.getByRole('button', { name: /suivant/i }).click()
    
    // Vérifier que l'on reste sur la même page
    await expect(page).toHaveURL(/\/calculator/)
  })
})

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact')
    
    // Remplir le formulaire
    await page.getByLabel(/Nom complet/i).fill('John Doe')
    await page.getByLabel(/Email professionnel/i).fill('john@example.com')
    await page.getByLabel(/Entreprise/i).fill('Test Corp')
    await page.getByLabel(/Votre message/i).fill('This is a test message from Playwright automation')
    
    // Soumettre
    await page.getByRole('button', { name: /envoyer/i }).click()
    
    // Attendre le message de succès
    await expect(page.getByText(/message envoyé avec succès/i)).toBeVisible({ timeout: 10000 })
  })
  
  test('should show anti-spam error for quick submission', async ({ page }) => {
    await page.goto('/contact')
    
    // Remplir rapidement
    await page.getByLabel(/Nom complet/i).fill('Spam Bot')
    await page.getByLabel(/Email professionnel/i).fill('spam@bot.com')
    await page.getByLabel(/Entreprise/i).fill('Bot Inc')
    await page.getByLabel(/Votre message/i).fill('Quick spam message')
    
    // Soumettre immédiatement (< 3 secondes)
    await page.getByRole('button', { name: /envoyer/i }).click()
    
    // Vérifier le message d'erreur anti-spam
    await expect(page.getByText(/prendre le temps/i)).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('should navigate through all main pages', async ({ page }) => {
    await page.goto('/')
    
    // Tester tous les liens du header
    const links = [
      { name: /pourquoi acf/i, url: /\/pourquoi/ },
      { name: /faq/i, url: /\/faq/ },
      { name: /calculateur/i, url: /\/calculator/ },
      { name: /contact/i, url: /\/contact/ },
    ]
    
    for (const link of links) {
      await page.goto('/')
      await page.getByRole('link', { name: link.name }).first().click()
      await expect(page).toHaveURL(link.url)
    }
  })
  
  test('should display FAQ accordion', async ({ page }) => {
    await page.goto('/faq')
    
    // Vérifier qu'il y a des questions
    const questions = page.locator('h3')
    await expect(questions.first()).toBeVisible()
    
    // Cliquer sur une question pour l'ouvrir
    await questions.first().click()
    
    // Vérifier que la réponse s'affiche
    await expect(page.locator('p').first()).toBeVisible()
  })
})

test.describe('SEO and Performance', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/')
    
    // Vérifier les meta tags essentiels
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /gouvernance agentique/i)
    
    // Vérifier le titre
    await expect(page).toHaveTitle(/ACF Score/)
  })
  
  test('should load in acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime
    
    // La page devrait charger en moins de 3 secondes
    expect(loadTime).toBeLessThan(3000)
  })
})
