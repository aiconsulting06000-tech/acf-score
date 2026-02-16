import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { hash } from 'bcryptjs'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { code, newPassword } = await request.json()

    if (!code || !newPassword) {
      return NextResponse.json(
        { error: 'Code et nouveau mot de passe requis' },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Le mot de passe doit faire au moins 8 caractères' },
        { status: 400 }
      )
    }

    // Vérifier le code dans la base de données
    const { data: tokenData, error: tokenError } = await supabase
      .from('password_reset_tokens')
      .select('*')
      .eq('code', code)
      .single()

    if (tokenError || !tokenData) {
      return NextResponse.json(
        { error: 'Code invalide ou expiré' },
        { status: 400 }
      )
    }

    // Vérifier que le code n'a pas expiré
    if (new Date(tokenData.expires_at) < new Date()) {
      // Supprimer le code expiré
      await supabase
        .from('password_reset_tokens')
        .delete()
        .eq('code', code)

      return NextResponse.json(
        { error: 'Code expiré. Demandez un nouveau code.' },
        { status: 400 }
      )
    }

    // Générer le nouveau hash
    const newPasswordHash = await hash(newPassword, 10)

    // Mettre à jour le fichier auth-options.ts
    try {
      const authOptionsPath = path.join(process.cwd(), 'lib', 'auth-options.ts')
      let fileContent = readFileSync(authOptionsPath, 'utf8')

      // Remplacer le hash dans le fichier
      const hashRegex = /passwordHash:\s*["'](\$2[aby]\$\d+\$[A-Za-z0-9./]{53})["']/
      fileContent = fileContent.replace(
        hashRegex,
        `passwordHash: "${newPasswordHash}"`
      )

      writeFileSync(authOptionsPath, fileContent, 'utf8')
    } catch (fileError) {
      console.error('Erreur mise à jour fichier:', fileError)
      throw new Error('Impossible de mettre à jour le mot de passe')
    }

    // Supprimer le code utilisé
    await supabase
      .from('password_reset_tokens')
      .delete()
      .eq('code', code)

    return NextResponse.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès',
    })

  } catch (error: any) {
    console.error('Erreur reset-password:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}
