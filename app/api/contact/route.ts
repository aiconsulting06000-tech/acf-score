import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    const hasReport = formData.get('hasReport') === 'true'
    const file = formData.get('file') as File | null

    // Validation
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent etre remplis' },
        { status: 400 }
      )
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Log pour debug
    console.log('Contact form submission:', {
      name,
      email,
      company,
      phone,
      message: message.substring(0, 50) + '...',
      hasReport,
      hasFile: !!file
    })

    // TODO: Ici vous pouvez ajouter l'envoi d'email via Resend, SendGrid, etc.
    // Pour l'instant, on simule juste le succes
    
    // Exemple avec Resend (a activer quand vous avez la cle API):
    /*
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'ACF Score <contact@acf-score.com>',
      to: 'votre-email@domaine.com',
      subject: `Nouveau contact: ${name} - ${company}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Entreprise:</strong> ${company}</p>
        <p><strong>Telephone:</strong> ${phone || 'Non fourni'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        ${hasReport ? '<p><em>Le client a complete le diagnostic ACF</em></p>' : ''}
      `,
      attachments: file ? [{
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer())
      }] : []
    })
    */

    // Pour l'instant, on retourne juste un succes
    return NextResponse.json(
      { 
        success: true,
        message: 'Message envoye avec succes' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error in contact API:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}
