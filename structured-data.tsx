// Structured data pour optimisation GEO (LLMs)
// À ajouter dans le <head> de chaque page

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ACF Score',
  legalName: 'Agentic Commerce Framework',
  url: 'https://acf-score.com',
  logo: 'https://acf-score.com/logo-acf.svg',
  foundingDate: '2025',
  founder: {
    '@type': 'Person',
    name: 'Vincent DORANGE',
    jobTitle: 'Expert en Gouvernance Agentique',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'MIT Sloan School of Management',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Columbia University',
      },
    ],
  },
  description:
    'ACF Score® propose un framework propriétaire de gouvernance agentique permettant aux organisations de contrôler, superviser et optimiser leurs agents IA autonomes.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'noreply@acf-score.com',
    availableLanguage: ['French', 'English'],
  },
  sameAs: [
    'https://www.linkedin.com/company/acf-score',
    // Ajoutez vos autres réseaux sociaux ici
  ],
}

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ACF Score - Diagnostic de Gouvernance Agentique',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '250',
    bestRating: '5',
    worstRating: '1',
  },
  description:
    'Outil de diagnostic gratuit permettant d\'évaluer la robustesse de la gouvernance agentique d\'une organisation en 10 minutes.',
  featureList: [
    'Score ACF® sur 100 points',
    'Niveau de maturité agentique (0-3)',
    'Score de souveraineté',
    'Positionnement marché',
    '3 actions prioritaires personnalisées',
    'Rapport PDF complet téléchargeable',
  ],
}

export const faqPageSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

export const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '7 Risques Critiques sans Gouvernance Agentique',
  description:
    'Analyse détaillée des 7 risques majeurs que courent les entreprises utilisant des agents IA sans gouvernance structurée.',
  author: {
    '@type': 'Person',
    name: 'Vincent DORANGE',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ACF Score',
    logo: {
      '@type': 'ImageObject',
      url: 'https://acf-score.com/logo-acf.svg',
    },
  },
  datePublished: '2026-02-15',
  dateModified: '2026-02-15',
}

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Audit de Gouvernance Agentique ACF®',
  description:
    'Audit complet de votre gouvernance agentique par un expert certifié ACF®. Analyse approfondie, recommandations détaillées, plan d\'action priorisé.',
  provider: {
    '@type': 'Organization',
    name: 'ACF Score',
  },
  areaServed: {
    '@type': 'Country',
    name: 'France',
  },
  serviceType: 'Professional Consulting',
  audience: {
    '@type': 'BusinessAudience',
    audienceType: ['E-commerce', 'Retail', 'B2B', 'B2C', 'SaaS'],
  },
}

// Fonction helper pour injecter le schema dans le head
export function injectSchema(schema: any) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
