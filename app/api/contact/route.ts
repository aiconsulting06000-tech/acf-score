import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      )
    }

    // Template email de confirmation au visiteur
    const confirmationEmailText = `Bonjour ${name},

Merci d'avoir contacté l'équipe ACF Score !

Nous avons bien reçu votre message :
"${message}"

📅 PROCHAINE ÉTAPE : Réservez votre créneau de consultation

Pour échanger avec un expert ACF® sur votre Score de Souveraineté et votre stratégie face aux agents IA autonomes, cliquez sur le lien Calendly ci-dessous :

🔗 https://calendly.com/aiconsulting_fr/30min

DURÉE : 30 minutes
FORMAT : Visioconférence

Nous analyserons ensemble :
✓ Votre Score ACF® et ses implications
✓ Vos dépendances critiques identifiées
✓ Un plan d'action sur 90 jours
✓ Les modules ACF® adaptés à votre situation

À très bientôt !

L'équipe ACF Score®
contact@acfscore.com
https://acfscore.com

---
Agentic Commerce Framework® - Préparez-vous à l'économie des agents IA`

    // Template email notification interne
    const internalNotificationText = `🔔 NOUVEAU CONTACT ACF SCORE

Nom : ${name}
Email : ${email}
Entreprise : ${company || 'Non renseignée'}

Message :
${message}

---
Envoyé depuis https://acfscore.com/contact
Date : ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`

    try {
      // Email de confirmation au visiteur
      const confirmationEmail = await resend.emails.send({
        from: 'ACF Score <contact@acfscore.com>',
        to: email,
        subject: '✅ Message reçu - Réservez votre consultation ACF®',
        text: confirmationEmailText,
      })

      // Email de notification à l'équipe
      const notificationEmail = await resend.emails.send({
        from: 'ACF Score <contact@acfscore.com>',
        to: 'contact@acfscore.com',
        subject: `🔔 Nouveau contact: ${name} (${company || 'Pas d\'entreprise'})`,
        text: internalNotificationText,
      })

      console.log('✅ Emails envoyés:', {
        confirmation: confirmationEmail.id,
        notification: notificationEmail.id,
      })

      return NextResponse.json({
        success: true,
        message: 'Emails envoyés avec succès',
        emailIds: {
          confirmation: confirmationEmail.id,
          notification: notificationEmail.id,
        },
      })

    } catch (emailError) {
      console.error('❌ Erreur envoi emails Resend:', emailError)
      
      // Retourner succès quand même pour ne pas bloquer l'utilisateur
      // Mais logger l'erreur pour investigation
      return NextResponse.json({
        success: true,
        message: 'Message reçu (email en cours de traitement)',
        warning: 'Emails en attente d\'envoi',
      })
    }

  } catch (error) {
    console.error('❌ Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
