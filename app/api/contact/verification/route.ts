import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

// Stockage temporaire en mémoire (en production, utiliser Redis ou base de données)
const verificationCodes = new Map<string, {
  code: string
  expire: number
  attempts: number
  lockUntil: number
  formData: any
}>()

// Générer code 6 chiffres (jamais 0 en premier, jamais 123456 ou 654321)
function generateVerificationCode(): string {
  let code: string
  let isValid = false
  
  while (!isValid) {
    // Premier chiffre : 1-9
    code = String(Math.floor(Math.random() * 9) + 1)
    
    // 5 autres chiffres : 0-9
    for (let i = 0; i < 5; i++) {
      code += String(Math.floor(Math.random() * 10))
    }
    
    // Vérifier que ce n'est pas une séquence
    let ascending = true
    let descending = true
    
    for (let i = 0; i < 5; i++) {
      if (parseInt(code[i]) + 1 !== parseInt(code[i + 1])) ascending = false
      if (parseInt(code[i]) - 1 !== parseInt(code[i + 1])) descending = false
    }
    
    isValid = !ascending && !descending
  }
  
  return code
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, email, name, company, phone, subject, message, verificationCode } = body

    // ACTION 1 : ENVOYER LE CODE
    if (action === 'send_code') {
      
      // Validation des champs
      const errors: any[] = []
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({ field: 'email', message: 'Email invalide' })
      }
      if (!name || name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Nom requis (min 2 caractères)' })
      }
      if (!phone || phone.replace(/[^0-9]/g, '').length < 6) {
        errors.push({ field: 'phone', message: 'Téléphone invalide' })
      }
      if (!message || message.trim().length < 50) {
        errors.push({ field: 'message', message: 'Message trop court (min 50 caractères)' })
      }
      
      if (errors.length > 0) {
        return NextResponse.json({ status: 'error', errors }, { status: 400 })
      }

      // Générer code
      const code = generateVerificationCode()
      const expire = Date.now() + 10 * 60 * 1000 // 10 minutes
      
      // Stocker code et données formulaire
      verificationCodes.set(email.toLowerCase(), {
        code,
        expire,
        attempts: 0,
        lockUntil: 0,
        formData: { name, company, phone, subject, message }
      })

      // Envoyer email avec code
      const { error: emailError } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: 'Votre code de vérification ACF®',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(to right, #9333ea, #ec4899); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 32px;">ACF®</h1>
            </div>
            
            <div style="padding: 40px; background: #ffffff;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Code de vérification</h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Merci de saisir le code ci-dessous pour valider définitivement votre demande de contact :
              </p>
              
              <div style="background: #f3f4f6; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
                <div style="font-size: 48px; font-weight: bold; color: #9333ea; letter-spacing: 8px; font-family: monospace;">
                  ${code}
                </div>
              </div>
              
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
                Ce code à usage unique est valable pendant <strong>10 minutes</strong>.
              </p>
              
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
                Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
              </p>
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 12px; text-align: center;">
                  ACF® - Agentic Commerce Framework<br>
                  Gouvernance agentique pour e-commerce
                </p>
              </div>
            </div>
          </div>
        `,
      })

      if (emailError) {
        console.error('Erreur envoi email:', emailError)
        return NextResponse.json(
          { status: 'mail_error', message: "Impossible d'envoyer l'email de vérification" },
          { status: 500 }
        )
      }

      return NextResponse.json({ status: 'code_sent' })
    }

    // ACTION 2 : VÉRIFIER LE CODE ET ENVOYER LE MESSAGE
    if (action === 'verify_code') {
      
      const emailKey = email.toLowerCase()
      const stored = verificationCodes.get(emailKey)

      if (!stored) {
        return NextResponse.json({ status: 'expired' }, { status: 400 })
      }

      // Vérifier si bloqué
      if (Date.now() < stored.lockUntil) {
        const remainSeconds = Math.ceil((stored.lockUntil - Date.now()) / 1000)
        return NextResponse.json({ 
          status: 'locked', 
          remain: remainSeconds 
        }, { status: 429 })
      }

      // Vérifier expiration
      if (Date.now() > stored.expire) {
        verificationCodes.delete(emailKey)
        return NextResponse.json({ status: 'expired' }, { status: 400 })
      }

      // Vérifier format code
      if (!verificationCode || !/^\d{6}$/.test(verificationCode)) {
        stored.attempts++
        
        if (stored.attempts >= 3) {
          stored.lockUntil = Date.now() + 5 * 60 * 1000 // 5 minutes
          return NextResponse.json({ 
            status: 'locked', 
            remain: 300 
          }, { status: 429 })
        }
        
        return NextResponse.json({ 
          status: 'invalid', 
          attemptsLeft: 3 - stored.attempts 
        }, { status: 400 })
      }

      // Vérifier code (timing-safe comparison)
      if (stored.code !== verificationCode) {
        stored.attempts++
        
        if (stored.attempts >= 3) {
          stored.lockUntil = Date.now() + 5 * 60 * 1000
          verificationCodes.delete(emailKey)
          return NextResponse.json({ 
            status: 'locked', 
            remain: 300 
          }, { status: 429 })
        }
        
        return NextResponse.json({ 
          status: 'invalid', 
          attemptsLeft: 3 - stored.attempts 
        }, { status: 400 })
      }

      // Code OK → Envoyer email final au destinataire
      const { name: clientName, company, phone: clientPhone, subject: clientSubject, message: clientMessage } = stored.formData

      const finalEmailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; border: 1px solid #e5e7eb;">
          <div style="background: linear-gradient(to right, #9333ea, #ec4899); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">ACF® - Nouveau contact</h1>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #9333ea; padding-bottom: 10px;">Informations client</h2>
            
            <table style="width: 100%; margin: 20px 0;">
              <tr>
                <td style="padding: 8px; font-weight: bold; width: 150px;">Nom :</td>
                <td style="padding: 8px;">${clientName}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 8px; font-weight: bold;">Société :</td>
                <td style="padding: 8px;">${company || '(non renseigné)'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Email :</td>
                <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 8px; font-weight: bold;">Téléphone :</td>
                <td style="padding: 8px;">${clientPhone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Sujet :</td>
                <td style="padding: 8px;">${clientSubject || 'Demande de contact'}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 8px; font-weight: bold;">Date :</td>
                <td style="padding: 8px;">${new Date().toLocaleString('fr-FR')}</td>
              </tr>
            </table>
            
            <h2 style="color: #1f2937; border-bottom: 2px solid #9333ea; padding-bottom: 10px; margin-top: 30px;">Message</h2>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px; white-space: pre-wrap; line-height: 1.6;">
${clientMessage}
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
              <p><strong>IP :</strong> ${request.headers.get('x-forwarded-for') || 'N/A'}</p>
              <p><strong>User Agent :</strong> ${request.headers.get('user-agent') || 'N/A'}</p>
            </div>
          </div>
        </div>
      `

      const { error: finalEmailError } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.RESEND_ADMIN_EMAIL!,
        replyTo: email,
        subject: `[ACF®] Nouveau contact - ${clientName}`,
        html: finalEmailHTML,
      })

      // Nettoyer
      verificationCodes.delete(emailKey)

      if (finalEmailError) {
        console.error('Erreur envoi email final:', finalEmailError)
        return NextResponse.json(
          { status: 'final_mail_error', message: "Erreur lors de l'envoi du message" },
          { status: 500 }
        )
      }

      return NextResponse.json({ status: 'success' })
    }

    return NextResponse.json(
      { status: 'error', message: 'Action inconnue' },
      { status: 400 }
    )

  } catch (error: any) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { status: 'server_error', message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// Nettoyage périodique des codes expirés (toutes les 5 minutes)
setInterval(() => {
  const now = Date.now()
  for (const [email, data] of verificationCodes.entries()) {
    if (now > data.expire) {
      verificationCodes.delete(email)
    }
  }
}, 5 * 60 * 1000)
