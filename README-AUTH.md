# 🔒 AUTHENTIFICATION ADMIN - INSTALLATION URGENTE

## ⚠️ CRITIQUE : Dashboard Admin Non Protégé !

Actuellement, `/admin/*` est accessible par TOUT LE MONDE sans mot de passe !

**Cette installation est URGENTE et OBLIGATOIRE.**

---

## 📦 INSTALLATION COMPLÈTE (20 MIN)

### Étape 1 : Installer les dépendances

```bash
cd C:\Users\vdora\Downloads\acf-score-FINAL-GEO\acf-score

npm install next-auth bcryptjs
npm install --save-dev @types/bcryptjs
```

---

### Étape 2 : Copier les fichiers

```bash
# Créer les dossiers nécessaires
mkdir lib
mkdir app\api\auth\[...nextauth]
mkdir app\admin\login

# Copier les fichiers
copy auth-options.ts lib\auth-options.ts
copy route-nextauth.ts app\api\auth\[...nextauth]\route.ts
copy login-page.tsx app\admin\login\page.tsx
copy middleware.ts middleware.ts
copy AdminHeader.tsx components\AdminHeader.tsx
copy generate-password-hash.js scripts\generate-password-hash.js
```

---

### Étape 3 : Générer votre mot de passe sécurisé

**IMPORTANT : Choisissez un mot de passe FORT**

```bash
# Générer le hash de votre mot de passe
node scripts/generate-password-hash.js "VotreMotDePasseSecurise123!"
```

**Exemple de sortie :**
```
================================
MOT DE PASSE HACHÉ GÉNÉRÉ :
================================

$2a$10$rE3kJ9Xm2p8nQ7vL5wC4tOYz1hR8sK6mP9nQ2xL5wC4tOYz1hR8sK

================================
```

**COPIEZ CE HASH !**

---

### Étape 4 : Configurer les credentials admin

**Modifier `lib/auth-options.ts` :**

```typescript
const ADMIN_CREDENTIALS = {
  email: "votre-email@acf-score.com", // ← CHANGEZ ÇA
  passwordHash: "$2a$10$VotreLongHashIciQueVousAvezCopie" // ← COLLEZ VOTRE HASH ICI
}
```

---

### Étape 5 : Ajouter les variables d'environnement

**Créer/modifier `.env.local` :**

```env
# NextAuth
NEXTAUTH_URL=https://acf-score.com
NEXTAUTH_SECRET=votre_secret_aleatoire_tres_long_minimum_32_caracteres_12345

# Supabase (existant)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Resend (existant)
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
RESEND_ADMIN_EMAIL=...
```

**Générer NEXTAUTH_SECRET :**
```bash
# Sur Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString() + (New-Guid).ToString()))

# OU en ligne : https://generate-secret.vercel.app/32
```

**Ajouter sur Vercel :**
1. Vercel Dashboard → Votre projet
2. Settings → Environment Variables
3. Ajouter `NEXTAUTH_URL` et `NEXTAUTH_SECRET`
4. Redéployer

---

### Étape 6 : Modifier les pages admin existantes

**Remplacer l'ancien Header par AdminHeader dans toutes les pages admin :**

**Exemple : `app/admin/contacts/page.tsx`**

```typescript
// AVANT
import Header from '@/components/Header'

// APRÈS
import AdminHeader from '@/components/AdminHeader'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { redirect } from 'next/navigation'

export default async function AdminContactsPage() {
  // Vérifier l'authentification côté serveur
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }

  // Reste du code...
  return (
    <div>
      <AdminHeader /> {/* au lieu de Header */}
      {/* ... */}
    </div>
  )
}
```

**Faire pareil pour :**
- `app/admin/diagnostics/page.tsx`
- `app/admin/stats/page.tsx`

---

### Étape 7 : Wrapper l'app avec SessionProvider

**Créer `app/providers.tsx` :**

```typescript
'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
```

**Modifier `app/layout.tsx` :**

```typescript
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

---

### Étape 8 : Tester localement

```bash
npm run dev
```

**Tests :**
1. Aller sur http://localhost:3000/admin/contacts
   → Doit rediriger vers `/admin/login`

2. Se connecter avec vos credentials
   → Email : celui que vous avez configuré
   → Mot de passe : celui dont vous avez généré le hash

3. Doit vous rediriger vers `/admin/contacts`

4. Vérifier le bouton "Déconnexion" en haut à droite

---

### Étape 9 : Déployer

```bash
git add .
git commit -m "feat: authentification admin sécurisée avec NextAuth"
git push origin main
```

**Sur Vercel :**
1. Vérifier que les variables d'env sont bien configurées
2. Attendre le déploiement
3. Tester sur https://acf-score.com/admin/contacts

---

## 🔐 SÉCURITÉ - CHECKLIST

**Vérifications obligatoires :**

- [ ] Mot de passe FORT choisi (12+ caractères, majuscules, minuscules, chiffres, symboles)
- [ ] Hash généré avec bcrypt (pas de mot de passe en clair)
- [ ] NEXTAUTH_SECRET généré de manière aléatoire (32+ caractères)
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Test de connexion/déconnexion réussi
- [ ] `/admin/*` redirige vers login si non connecté
- [ ] Session expire après 24h
- [ ] Bouton déconnexion fonctionne

---

## 🎯 CREDENTIALS PAR DÉFAUT (À CHANGER !)

**IMPORTANT : Ces credentials sont des EXEMPLES !**

**Email par défaut :** admin@acf-score.com  
**Mot de passe :** À CONFIGURER (générer le hash)

**CHANGEZ-LES IMMÉDIATEMENT !**

---

## 🔄 CHANGER LE MOT DE PASSE

**Étape 1 : Générer nouveau hash**
```bash
node scripts/generate-password-hash.js "NouveauMotDePasse456!"
```

**Étape 2 : Mettre à jour `lib/auth-options.ts`**
```typescript
const ADMIN_CREDENTIALS = {
  email: "votre-email@acf-score.com",
  passwordHash: "$2a$10$NouveauHashIci..."
}
```

**Étape 3 : Redéployer**
```bash
git add lib/auth-options.ts
git commit -m "chore: update admin password"
git push origin main
```

---

## 🚨 EN CAS DE PROBLÈME

### Problème 1 : "Invalid credentials"

**Causes possibles :**
- Hash mal copié (espaces, retours à la ligne)
- Email incorrect
- Mot de passe incorrect

**Solution :**
1. Régénérer le hash
2. Vérifier qu'il n'y a pas d'espaces
3. Copier-coller depuis le terminal

---

### Problème 2 : Redirection infinie

**Cause :** NEXTAUTH_URL incorrect

**Solution :**
```env
# Local
NEXTAUTH_URL=http://localhost:3000

# Production
NEXTAUTH_URL=https://acf-score.com
```

---

### Problème 3 : "NEXTAUTH_SECRET not defined"

**Solution :**
1. Générer un secret : https://generate-secret.vercel.app/32
2. Ajouter dans `.env.local` ET sur Vercel
3. Redémarrer dev server / Redéployer

---

## ✅ RÉSULTAT ATTENDU

**Avant :**
- `/admin/contacts` → Accessible par TOUT LE MONDE ❌

**Après :**
- `/admin/contacts` → Redirige vers `/admin/login` ✅
- Login avec credentials → Accès dashboard ✅
- Session 24h → Auto-déconnexion après ✅
- Bouton déconnexion → Retour au login ✅

---

## 🎯 AMÉLIORATIONS FUTURES (OPTIONNEL)

**Phase 2 (à faire plus tard) :**
- [ ] Mot de passe oublié (email reset)
- [ ] Multi-utilisateurs (table users dans Supabase)
- [ ] Rôles (admin, viewer, editor)
- [ ] 2FA (authentification à 2 facteurs)
- [ ] Logs des connexions
- [ ] Blocage après X tentatives échouées

---

## 🆘 SUPPORT

**Problème urgent ?**
- Email : admin@acf-score.com
- Vérifier les logs Vercel
- Tester en local d'abord

---

**⚠️ NE PAS DÉPLOYER EN PRODUCTION SANS AVOIR CONFIGURÉ L'AUTHENTIFICATION !**

**C'est une faille de sécurité critique !**
