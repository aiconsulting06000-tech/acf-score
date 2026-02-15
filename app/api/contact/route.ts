import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Initialiser Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Initialiser Resend
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    console.log('=== CONTACT API CALLED ===')
    
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string || ''
    const message = formData.get('message') as string
    const subject = formData.get('subject') as string
    const hasReport = formData.get('hasReport') === 'true'
    const file = formData.get('file') as File | null
    const timestamp = formData.get('timestamp') as string

    console.log('Contact form:', { name, email, company, subject, hasReport })

    // Anti-spam : timestamp
    if (timestamp) {
      const submittedTime = parseInt(timestamp)
      const timeDiff = Date.now() - submittedTime
      if (timeDiff < 3000) {
        console.log('SPAM DETECTED: Too quick')
        return NextResponse.json(
          { error: 'Veuillez prendre le temps de remplir le formulaire' },
          { status: 400 }
        )
      }
    }

    // Validation
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Veuillez écrire un message plus détaillé' },
        { status: 400 }
      )
    }

    // Convertir le fichier PDF en base64 si présent
    let pdfBase64 = null
    let pdfFilename = null
    if (file && hasReport) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      pdfBase64 = buffer.toString('base64')
      pdfFilename = file.name
      console.log('PDF converted to base64:', pdfFilename)
    }

    // 1. ENREGISTRER DANS SUPABASE
    const { data: contact, error: dbError } = await supabase
      .from('contacts')
      .insert({
        name,
        email,
        company,
        phone,
        subject,
        message,
        has_report: hasReport,
        report_url: pdfFilename,
        status: 'new',
        user_agent: request.headers.get('user-agent'),
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Erreur lors de l\'enregistrement du message')
    }

    console.log('Contact saved in DB:', contact.id)

    // 2. ENVOYER EMAIL DE NOTIFICATION À L'ADMIN (AVEC PDF ATTACHÉ)
    const subjectLabels: Record<string, string> = {
      'general': 'Question générale',
      'audit': 'Demande d\'audit ACF®',
      'formation': 'Formation / Accompagnement',
      'certification': 'Certification ACF®',
      'partenariat': 'Partenariat',
      'presse': 'Presse / Média'
    }

    try {
      const adminEmailOptions: any = {
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.RESEND_ADMIN_EMAIL || 'contact@acf-score.com',
        subject: `🔔 Nouveau contact ACF : ${subjectLabels[subject] || subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; }
              .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #9333ea; border-radius: 4px; }
              .message-box { background: white; padding: 15px; border-radius: 4px; margin-top: 10px; white-space: pre-wrap; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
              .badge { display: inline-block; padding: 4px 12px; background: #9333ea; color: white; border-radius: 12px; font-size: 12px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📬 Nouveau contact ACF</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="label">Sujet</div>
                  <div class="value">
                    <span class="badge">${subjectLabels[subject] || subject}</span>
                  </div>
                </div>

                <div class="field">
                  <div class="label">Contact</div>
                  <div class="value">
                    <strong>${name}</strong><br>
                    ${company}<br>
                    📧 <a href="mailto:${email}">${email}</a><br>
                    ${phone ? `📞 ${phone}` : ''}
                  </div>
                </div>

                <div class="field">
                  <div class="label">Message</div>
                  <div class="message-box">${message}</div>
                </div>

                ${hasReport && pdfFilename ? `
                  <div class="field">
                    <div class="label">Rapport ACF joint</div>
                    <div class="value">
                      ✅ Rapport joint en pièce jointe<br>
                      📎 Fichier: ${pdfFilename}
                    </div>
                  </div>
                ` : ''}

                <div style="margin-top: 30px; padding: 15px; background: #eff6ff; border-left: 3px solid #3b82f6; border-radius: 4px;">
                  <strong>💡 Action recommandée :</strong><br>
                  Répondre sous 24h max pour maintenir un taux de conversion élevé
                </div>
              </div>

              <div class="footer">
                <p>ACF Score® - Agentic Commerce Framework<br>
                Message ID: ${contact.id}</p>
              </div>
            </div>
          </body>
          </html>
        `
      }

      // Attacher le PDF si présent
      if (pdfBase64 && pdfFilename) {
        adminEmailOptions.attachments = [
          {
            filename: pdfFilename,
            content: pdfBase64
          }
        ]
        console.log('PDF attached to admin email')
      }

      const adminResult = await resend.emails.send(adminEmailOptions)
      console.log('Admin notification sent:', adminResult)
    } catch (emailError: any) {
      console.error('ERROR sending admin email:', emailError)
      console.error('Error details:', emailError.message)
      // On continue quand même
    }

    // 3. ENVOYER EMAIL DE CONFIRMATION AU CLIENT
    try {
      console.log('Sending client confirmation to:', email)
      
      const clientResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: email,
        subject: '✅ Votre demande ACF a bien été reçue',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; }
              .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
              .step { display: flex; align-items: start; margin: 20px 0; }
              .step-number { width: 40px; height: 40px; background: #9333ea; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; margin-right: 15px; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
              .highlight-box { background: white; padding: 20px; border-left: 4px solid #9333ea; border-radius: 4px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">✅ Message bien reçu !</h1>
                <p style="margin: 15px 0 0 0; opacity: 0.9; font-size: 16px;">Merci pour votre intérêt pour l'ACF®</p>
              </div>
              
              <div class="content">
                <p style="font-size: 16px;">Bonjour ${name},</p>
                
                <p>Nous avons bien reçu votre demande concernant <strong>${subjectLabels[subject] || subject}</strong>.</p>

                <div class="highlight-box">
                  <h3 style="margin-top: 0; color: #9333ea;">📋 Prochaines étapes</h3>
                  
                  <div class="step">
                    <div class="step-number">1</div>
                    <div>
                      <strong>Vous allez recevoir un lien Calendly</strong><br>
                      <span style="color: #6b7280; font-size: 14px;">Dans les prochaines minutes, pour réserver votre créneau de consultation</span>
                    </div>
                  </div>

                  <div class="step">
                    <div class="step-number">2</div>
                    <div>
                      <strong>Choisissez votre créneau</strong><br>
                      <span style="color: #6b7280; font-size: 14px;">Consultation gratuite de 30 minutes par visioconférence</span>
                    </div>
                  </div>

                  <div class="step">
                    <div class="step-number">3</div>
                    <div>
                      <strong>Échange avec un expert ACF®</strong><br>
                      <span style="color: #6b7280; font-size: 14px;">Analyse de votre situation et recommandations personnalisées</span>
                    </div>
                  </div>
                </div>

                ${!hasReport ? `
                  <div style="background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; border-radius: 4px; margin: 20px 0;">
                    <strong>💡 Conseil :</strong> Pour un échange encore plus efficace, nous vous recommandons de compléter le diagnostic ACF® (10 minutes) avant notre rendez-vous.
                    <br><br>
                    <a href="https://acf-score.vercel.app/calculator" style="color: #9333ea; font-weight: bold;">→ Faire le diagnostic maintenant</a>
                  </div>
                ` : `
                  <div style="background: #d1fae5; padding: 15px; border-left: 4px solid #10b981; border-radius: 4px; margin: 20px 0;">
                    <strong>✅ Parfait !</strong> Vous avez complété le diagnostic ACF®. Notre expert pourra ainsi préparer un échange encore plus ciblé sur vos enjeux spécifiques.
                  </div>
                `}

                <p style="margin-top: 30px;">À très bientôt,</p>
                <p style="margin: 0;"><strong>L'équipe ACF®</strong></p>
              </div>

              <div class="footer">
                <p><strong>ACF Score® - Agentic Commerce Framework</strong><br>
                Gouvernance Agentique de Nouvelle Génération</p>
                <p style="margin-top: 15px; color: #9ca3af;">
                  Ce message est envoyé en réponse à votre demande de contact.<br>
                  Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.
                </p>
              </div>
            </div>
          </body>
          </html>
        `
      })
      
      console.log('Client confirmation sent:', clientResult)
    } catch (emailError: any) {
      console.error('ERROR sending client email:', emailError)
      console.error('Error details:', emailError.message)
      console.error('Full error:', JSON.stringify(emailError))
      // On continue quand même
    }

    // 4. RETOURNER SUCCÈS
    return NextResponse.json(
      { 
        success: true,
        message: 'Message enregistré et emails envoyés',
        contactId: contact.id
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('=== ERROR IN CONTACT API ===')
    console.error('Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Erreur serveur: ' + (error?.message || 'Erreur inconnue')
      },
      { status: 500 }
    )
  }
}

// GET pour tester
export async function GET() {
  return NextResponse.json({ 
    status: 'Contact API is working',
    methods: ['POST'],
    features: ['Supabase storage', 'Resend emails', 'PDF attachments', 'Anti-spam']
  })
}
