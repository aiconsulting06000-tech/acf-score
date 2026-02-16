import { Metadata } from 'next'

const baseUrl = 'https://acf-score.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'ACF Score® | Gouvernance Agentique de Nouvelle Génération',
    template: '%s | ACF Score®'
  },
  description: 'Évaluez la robustesse de votre gouvernance agentique en 10 minutes. Framework ACF® : contrôlez vos agents IA, anticipez les risques, conformité AI Act. Diagnostic gratuit.',
  keywords: [
    'gouvernance agentique',
    'agents IA',
    'Agentic Commerce Framework',
    'ACF',
    'intelligence artificielle',
    'conformité AI Act',
    'RGPD IA',
    'agents autonomes',
    'gouvernance IA',
    'diagnostic IA',
    'score ACF',
    'maturité agentique',
    'souveraineté numérique',
    'kill switch IA',
    'traçabilité IA',
    'supervision agents IA',
    'e-commerce IA',
    'retail IA',
    'pricing dynamique',
    'chatbot governance'
  ],
  authors: [{ name: 'Vincent DORANGE', url: 'https://acf-score.com' }],
  creator: 'Vincent DORANGE',
  publisher: 'ACF Score',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: baseUrl,
    title: 'ACF Score® | Gouvernance Agentique de Nouvelle Génération',
    description: 'Évaluez la robustesse de votre gouvernance agentique en 10 minutes. Framework ACF® : contrôlez vos agents IA, anticipez les risques, conformité AI Act.',
    siteName: 'ACF Score',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ACF Score - Agentic Commerce Framework',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACF Score® | Gouvernance Agentique',
    description: 'Évaluez la robustesse de votre gouvernance agentique en 10 minutes. Diagnostic gratuit.',
    images: ['/og-image.png'],
    creator: '@acfscore',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: 'votre_code_google_search_console',
    // yandex: 'votre_code',
    // bing: 'votre_code',
  },
  category: 'technology',
}

// Metadata pour page Calculator
export const calculatorMetadata: Metadata = {
  title: 'Diagnostic ACF® Gratuit | Calculateur de Score de Gouvernance Agentique',
  description: '10 minutes pour évaluer votre gouvernance agentique. Obtenez votre score ACF®, niveau de maturité, positionnement marché et 3 actions prioritaires. Gratuit sans inscription.',
  openGraph: {
    title: 'Diagnostic ACF® Gratuit | Calculateur de Gouvernance Agentique',
    description: '10 minutes pour évaluer votre gouvernance agentique. Score ACF®, niveau de maturité, actions prioritaires.',
    url: `${baseUrl}/calculator`,
  },
}

// Metadata pour page Pourquoi
export const pourquoiMetadata: Metadata = {
  title: '7 Risques Critiques sans Gouvernance Agentique | Pourquoi ACF®',
  description: 'Découvrez les 7 risques majeurs que courent les entreprises utilisant des agents IA sans gouvernance structurée. Pertes financières, conformité, souveraineté.',
  openGraph: {
    title: '7 Risques Critiques sans Gouvernance Agentique',
    description: 'Décisions contraires aux intérêts business, perte de contrôle, dépendance plateformes, responsabilité juridique...',
    url: `${baseUrl}/pourquoi`,
  },
}

// Metadata pour page FAQ
export const faqMetadata: Metadata = {
  title: 'FAQ ACF® | 33 Questions sur la Gouvernance Agentique',
  description: 'Toutes les réponses à vos questions sur l\'ACF®, le diagnostic, les agents IA, la conformité AI Act, les coûts, l\'implémentation et la certification.',
  openGraph: {
    title: 'FAQ ACF® | Questions Fréquentes Gouvernance Agentique',
    description: '33 questions/réponses sur l\'ACF®, les agents IA, la conformité et la mise en œuvre.',
    url: `${baseUrl}/faq`,
  },
}

// Metadata pour page Contact
export const contactMetadata: Metadata = {
  title: 'Contact | Parlez à un Expert en Gouvernance Agentique',
  description: 'Contactez notre équipe d\'experts ACF®. Audit personnalisé, formation, certification, accompagnement stratégique. Réponse sous 24-48h.',
  openGraph: {
    title: 'Contact | Expert Gouvernance Agentique ACF®',
    description: 'Audit, formation, certification. Consultation gratuite de 30 min.',
    url: `${baseUrl}/contact`,
  },
}

// Metadata pour page Qui sommes-nous
export const aboutMetadata: Metadata = {
  title: 'Qui sommes-nous | ACF Score® by Vincent DORANGE',
  description: 'Découvrez l\'ACF®, méthodologie propriétaire de gouvernance agentique développée par Vincent DORANGE (MIT Sloan, Columbia). 25 ans d\'expérience e-commerce & IA.',
  openGraph: {
    title: 'Qui sommes-nous | ACF Score®',
    description: 'Méthodologie ACF® par Vincent DORANGE. MIT Sloan, Columbia. 25 ans e-commerce & IA.',
    url: `${baseUrl}/qui-sommes-nous`,
  },
}
