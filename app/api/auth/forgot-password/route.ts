import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    // Vérifier que c'est l'email admin (vous pouvez adapter cette logique)
    const ADMIN_EMAIL = 'aiconsulting06000@gmail.com'
    
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Email non reconnu' },
        { status: 404 }
      )
    }

    // Générer un code à 6 chiffres
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // Expiration dans 15 minutes
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()

    // Créer la table si elle n'existe pas (à faire manuellement dans Supabase)
    // Table: password_reset_tokens
    // Colonnes: id (uuid), email (text), code (text), expires_at (timestamp), created_at (timestamp)

    // Supprimer les anciens codes pour cet email
    await supabase
      .from('password_reset_tokens')
      .delete()
      .eq('email', email)

    // Insérer le nouveau code
    const { error: dbError } = await supabase
      .from('password_reset_tokens')
      .insert({
        email,
        code,
        expires_at: expiresAt,
      })

    if (dbError) {
      console.error('Erreur DB:', dbError)
      throw new Error('Erreur lors de la génération du code')
    }

    // Envoyer l'email avec le code
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: 'Réinitialisation de votre mot de passe ACF®',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #9333ea, #ec4899); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">ACF®</h1>
          </div>
          
          <div style="padding: 40px; background: #ffffff;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Réinitialisation de votre mot de passe</h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Vous avez demandé à réinitialiser votre mot de passe admin. Utilisez le code ci-dessous :
            </p>
            
            <div style="background: #f3f4f6; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
              <div style="font-size: 48px; font-weight: bold; color: #9333ea; letter-spacing: 8px; font-family: monospace;">
                ${code}
              </div>
            </div>
            
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Ce code est valable pendant <strong>15 minutes</strong>.
            </p>
            
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
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
      console.error('Erreur email:', emailError)
      throw new Error('Erreur lors de l\'envoi de l\'email')
    }

    return NextResponse.json({
      success: true,
      message: 'Code envoyé par email',
    })

  } catch (error: any) {
    console.error('Erreur forgot-password:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}
