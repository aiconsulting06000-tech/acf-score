'use client'

/**
 * Composant Schema.org pour le référencement GEO
 * Données structurées pour Google, Bing, etc.
 */

export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Score ACF® - Calculateur de Souveraineté",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "operatingSystem": "Web",
    "provider": {
      "@type": "Organization",
      "name": "Agentic Commerce Framework",
      "url": "https://acfscore.com",
      "logo": "https://acfscore.com/logo-acf.jpg",
      "founder": {
        "@type": "Person",
        "name": "Vincent DORANGE",
        "jobTitle": "Expert en Commerce Agentique"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR",
        "addressRegion": "Provence-Alpes-Côte d'Azur",
        "addressLocality": "Draguignan"
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "France"
        },
        {
          "@type": "Country",
          "name": "Belgique"
        },
        {
          "@type": "Country",
          "name": "Suisse"
        },
        {
          "@type": "Country",
          "name": "Luxembourg"
        },
        {
          "@type": "Country",
          "name": "Canada"
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/in/vincentdorange/"
      ]
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Business",
      "geographicArea": {
        "@type": "AdministrativeArea",
        "name": "Europe francophone"
      }
    },
    "inLanguage": "fr-FR",
    "description": "Calculateur gratuit de souveraineté commerciale pour e-commerce. Mesurez votre dépendance aux plateformes en 5 minutes. Framework ACF pour l'ère des agents autonomes et de l'IA.",
    "featureList": [
      "Calcul Score de Souveraineté",
      "Analyse 4 dimensions (DS, DD, DT, DTr)",
      "Rapport PDF professionnel",
      "Recommandations personnalisées",
      "Gratuit et sans inscription"
    ],
    "keywords": "souveraineté commerciale, e-commerce France, dépendance plateforme, Amazon FBA, agents autonomes, IA commerce, audit e-commerce, DTC France, marketplace France"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
