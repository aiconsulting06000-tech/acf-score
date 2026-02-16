import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

const verificationCodes = new Map<string, {
  code: string
  expire: number
  attempts: number
  lockUntil: number
  formData: any
}>()

function generateVerificationCode(): string {
  let code = ''
  let isValid = false
  
  while (!isValid) {
    code = String(Math.floor(Math.random() * 9) + 1)
    
    for (let i = 0; i < 5; i++) {
      code += String(Math.floor(Math.random() * 10))
    }
    
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

    if (action === 'send_code') {
      
      const errors: any[] = []
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({ field: 'email', message: 'Email invalide' })
      }
      if (!name || name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Nom requis' })
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

      const code = generateVerificationCode()
      const expire = Date.now() + 10 * 60 * 1000
      
      verificationCodes.set(email.toLowerCase(), {
        code,
        expire,
        attempts: 0,
        lockUntil: 0,
        formData: { name, company, phone, subject, message }
      })

      const { error: emailError } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: 'Code de vérification ACF®',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(to right, #9333ea, #ec4899); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">ACF®</h1>
            </div>
            
            <div style="padding: 40px; background: #ffffff;">
              <h2 style="color: #1f2937;">Code de vérification</h2>
              <p style="color: #4b5563;">Saisissez ce code pour valider votre demande :</p>
              
              <div style="background: #f3f4f6; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
                <div style="font-size: 48px; font-weight: bold; color: #9333ea; letter-spacing: 8px;">${code}</div>
              </div>
              
              <p style="color: #4b5563; font-size: 14px;">Ce code est valable 10 minutes.</p>
            </div>
          </div>
        `,
      })

      if (emailError) {
        console.error('Erreur email:', emailError)
        return NextResponse.json({ status: 'mail_error', message: "Erreur d'envoi" }, { status: 500 })
      }

      return NextResponse.json({ status: 'code_sent' })
    }

    if (action === 'verify_code') {
      
      const emailKey = email.toLowerCase()
      const stored = verificationCodes.get(emailKey)

      if (!stored) {
        return NextResponse.json({ status: 'expired' }, { status: 400 })
      }

      if (Date.now() < stored.lockUntil) {
        const remainSeconds = Math.ceil((stored.lockUntil - Date.now()) / 1000)
        return NextResponse.json({ status: 'locked', remain: remainSeconds }, { status: 429 })
      }

      if (Date.now() > stored.expire) {
        verificationCodes.delete(emailKey)
        return NextResponse.json({ status: 'expired' }, { status: 400 })
      }

      if (!verificationCode || !/^\d{6}$/.test(verificationCode)) {
        stored.attempts++
        
        if (stored.attempts >= 3) {
          stored.lockUntil = Date.now() + 5 * 60 * 1000
          return NextResponse.json({ status: 'locked', remain: 300 }, { status: 429 })
        }
        
        return NextResponse.json({ status: 'invalid', attemptsLeft: 3 - stored.attempts }, { status: 400 })
      }

      if (stored.code !== verificationCode) {
        stored.attempts++
        
        if (stored.attempts >= 3) {
          stored.lockUntil = Date.now() + 5 * 60 * 1000
          verificationCodes.delete(emailKey)
          return NextResponse.json({ status: 'locked', remain: 300 }, { status: 429 })
        }
        
        return NextResponse.json({ status: 'invalid', attemptsLeft: 3 - stored.attempts }, { status: 400 })
      }

      const { name: clientName, company: clientCompany, phone: clientPhone, subject: clientSubject, message: clientMessage } = stored.formData

      const finalEmailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #9333ea, #ec4899); padding: 20px;">
            <h1 style="color: white; margin: 0;">Nouveau contact ACF®</h1>
          </div>
          
          <div style="padding: 30px;">
            <h2>Informations client</h2>
            <p><strong>Nom :</strong> ${clientName}</p>
            <p><strong>Société :</strong> ${clientCompany || '(non renseigné)'}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${clientPhone}</p>
            <p><strong>Sujet :</strong> ${clientSubject || 'Contact'}</p>
            
            <h2>Message</h2>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
              ${clientMessage}
            </div>
          </div>
        </div>
      `

      const { error: finalEmailError } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.RESEND_ADMIN_EMAIL!,
        reply_to: email,
        subject: `[ACF®] Contact - ${clientName}`,
        html: finalEmailHTML,
      })

      verificationCodes.delete(emailKey)

      if (finalEmailError) {
        console.error('Erreur email final:', finalEmailError)
        return NextResponse.json({ status: 'final_mail_error', message: "Erreur d'envoi" }, { status: 500 })
      }

      return NextResponse.json({ status: 'success' })
    }

    return NextResponse.json({ status: 'error', message: 'Action inconnue' }, { status: 400 })

  } catch (error: any) {
    console.error('Erreur API contact:', error)
    return NextResponse.json({ status: 'server_error', message: 'Erreur serveur' }, { status: 500 })
  }
}

setInterval(() => {
  const now = Date.now()
  for (const [email, data] of verificationCodes.entries()) {
    if (now > data.expire) {
      verificationCodes.delete(email)
    }
  }
}, 5 * 60 * 1000)
