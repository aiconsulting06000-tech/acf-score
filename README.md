# 🎯 Score ACF® - Calculateur de Souveraineté

Application Next.js 14 pour calculer le Score de Souveraineté selon la méthodologie **Agentic Commerce Framework®**.

## 📦 Contenu du projet

### ✅ Outil Gratuit (Version actuelle - 100% terminé)

- **Landing page** : Présentation framework + CTA
- **Calculator** : Formulaire 5 étapes (DS, DD, DT, DTr, Infos)
- **Results** : Score + graphique radar + recommandations
- **PDF Generator** : Rapport professionnel 6 pages

### 🎨 Design

- **Charte graphique** : Violet/Magenta (#9333EA → #EC4899)
- **Logo ACF** : Intégré
- **Responsive** : Mobile-first
- **Animations** : Transitions fluides

---

## 🚀 Installation locale

### Prérequis

- Node.js 18+ ([télécharger](https://nodejs.org/))
- npm (inclus avec Node.js)

### Étapes

```bash
# 1. Extraire le projet (si archive)
tar -xzf acf-score-final.tar.gz
cd acf-score

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev

# 4. Ouvrir dans le navigateur
# → http://localhost:3000
```

---

## 📁 Structure du projet

```
acf-score/
├── app/
│   ├── layout.tsx              # Layout principal + SEO
│   ├── globals.css             # Styles Tailwind + animations
│   ├── page.tsx                # Landing page
│   ├── calculator/
│   │   └── page.tsx            # Formulaire 5 steps
│   └── results/
│       └── page.tsx            # Affichage score + PDF
├── components/
│   └── charts/
│       └── RadarChart.tsx      # Graphique 4 dimensions
├── lib/
│   ├── types.ts                # Interfaces TypeScript
│   ├── calculator.ts           # Logique calcul ACF®
│   └── pdf-generator.ts        # Génération PDF
├── public/
│   └── logo-acf.png            # Logo ACF violet/magenta
├── package.json                # Dépendances
├── tailwind.config.ts          # Config Tailwind (couleurs ACF)
├── next.config.js              # Config Next.js
└── tsconfig.json               # Config TypeScript
```

---

## 🌐 Déploiement sur Vercel (GRATUIT)

### Option 1 : Depuis GitHub (recommandé)

1. **Créer un repo GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ACF Score"
   git remote add origin https://github.com/VOTRE-USERNAME/acf-score.git
   git push -u origin main
   ```

2. **Déployer sur Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer "New Project"
   - Importer votre repo GitHub
   - Cliquer "Deploy"
   - ✅ Terminé ! URL live en 2 min

### Option 2 : Depuis CLI Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# Suivre les instructions, accepter les defaults
```

### Configuration domaine personnalisé

Une fois déployé sur Vercel :

1. **Acheter le domaine** (recommandé : Namecheap, OVH, ou Vercel)
   - acfscore.com
   - acfscore.fr
   - acfscore.io

2. **Configurer dans Vercel**
   - Projet → Settings → Domains
   - Ajouter le domaine
   - Suivre les instructions DNS

---

## 🧪 Tests

### Tests manuels

```bash
# Lancer l'app
npm run dev

# Tester chaque parcours :
# 1. Landing → Calculator (vérifier navigation)
# 2. Calculator 5 steps (vérifier sliders, navigation)
# 3. Results (vérifier score, graphique)
# 4. Download PDF (vérifier génération)
```

### Scénarios de test

**Test 1 : Score élevé (80+)**
- DS: 20%
- DD: 30%
- DT: 25%
- DTr: 5 jours
→ Score attendu : ~82 (Souveraineté forte)

**Test 2 : Score moyen (60-79)**
- DS: 50%
- DD: 40%
- DT: 50%
- DTr: 10 jours
→ Score attendu : ~67 (Souveraineté moyenne)

**Test 3 : Score critique (40-59)**
- DS: 60%
- DD: 50%
- DT: 70%
- DTr: 15 jours
→ Score attendu : ~53 (Dépendance critique)

**Test 4 : Score très bas (0-39)**
- DS: 80%
- DD: 70%
- DT: 80%
- DTr: 30 jours
→ Score attendu : ~28 (Perte de contrôle)

---

## 🎨 Personnalisation

### Modifier les couleurs

Fichier : `tailwind.config.ts`

```typescript
colors: {
  primary: {
    DEFAULT: '#9333EA', // Violet principal
    light: '#A78BFA',
    dark: '#7C3AED',
  },
  accent: {
    DEFAULT: '#EC4899', // Magenta accent
    light: '#F472B6',
  },
}
```

### Modifier la formule de calcul

Fichier : `lib/calculator.ts`

```typescript
export function calculateACFScore(formData: FormData): ScoreResult {
  // Formule actuelle :
  // Score = 100 - [(DS×30) + (DD×25) + (DT×25) + (DTr×20)]
  
  // Modifier les coefficients ici
  const ds_contribution = ds * 30  // Poids DS
  const dd_contribution = dd * 25  // Poids DD
  const dt_contribution = dt * 25  // Poids DT
  const dtr_contribution = dtr * 20 // Poids DTr
}
```

---

## 📞 Support

**Créateur :** Vincent DORANGE  
**Email :** contact@acfscore.com  
**Domaine :** acfscore.com (à acheter)  

---

## 📄 Licence

© 2026 Vincent DORANGE - Tous droits réservés  
**Agentic Commerce Framework®** est une marque déposée.

---

## ✅ Checklist de lancement

- [ ] Tests complets (4 scénarios)
- [ ] Déploiement Vercel
- [ ] Achat domaine acfscore.com
- [ ] Configuration DNS
- [ ] Test domaine live
- [ ] Analytics configuré
- [ ] Email professionnel (contact@acfscore.com)
- [ ] Premier post LinkedIn

---

**🎉 Félicitations ! L'outil gratuit est 100% prêt à lancer.**
