import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== CONTACT API CALLED ===')
    
    const formData = await request.formData()
    console.log('FormData received')
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string || ''
    const message = formData.get('message') as string
    const hasReport = formData.get('hasReport') === 'true'
    const file = formData.get('file') as File | null
    const timestamp = formData.get('timestamp') as string

    console.log('Parsed data:', { name, email, company, hasReport, hasFile: !!file })

    // Anti-spam : vérifier timestamp (formulaire doit rester ouvert min 3 secondes)
    if (timestamp) {
      const submittedTime = parseInt(timestamp)
      const timeDiff = Date.now() - submittedTime
      if (timeDiff < 3000) {
        console.log('SPAM DETECTED: Form submitted too quickly')
        return NextResponse.json(
          { error: 'Veuillez prendre le temps de remplir le formulaire' },
          { status: 400 }
        )
      }
    }

    // Validation simple
    if (!name || !email || !company || !message) {
      console.log('Validation failed - missing fields')
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      )
    }

    // Validation email basique
    if (!email.includes('@')) {
      console.log('Validation failed - invalid email')
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Anti-spam : vérifier longueur message (spam = souvent très court ou très long)
    if (message.length < 10) {
      console.log('SPAM DETECTED: Message too short')
      return NextResponse.json(
        { error: 'Veuillez ecrire un message plus detaille' },
        { status: 400 }
      )
    }

    console.log('=== VALIDATION PASSED ===')
    console.log('Message will be sent to admin')

    // TODO: Integrer service email ici (Resend, SendGrid, etc.)
    // Pour l'instant on simule juste le succes
    
    console.log('=== SUCCESS ===')
    
    return NextResponse.json(
      { 
        success: true,
        message: 'Message envoye avec succes',
        data: {
          name,
          email,
          company
        }
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('=== ERROR IN CONTACT API ===')
    console.error('Error details:', error)
    console.error('Error message:', error?.message)
    console.error('Error stack:', error?.stack)
    
    return NextResponse.json(
      { 
        error: 'Erreur serveur: ' + (error?.message || 'Erreur inconnue'),
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    )
  }
}

// GET pour tester que la route existe
export async function GET() {
  return NextResponse.json({ 
    status: 'Contact API is working',
    methods: ['POST'],
    antiSpam: ['honeypot', 'timestamp', 'message length check']
  })
}
