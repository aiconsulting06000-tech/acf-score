import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SchemaOrg from '@/components/seo/SchemaOrg'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Score ACF® - Calculateur de Souveraineté | E-commerce France',
  description: 'Calculateur gratuit de souveraineté commerciale pour e-commerce en France. Mesurez votre dépendance aux plateformes (Amazon, Shopify) en 5 minutes. Rapport PDF professionnel inclus.',
  keywords: 'souveraineté commerciale France, e-commerce France, calculateur dépendance plateforme, Amazon FBA France, audit e-commerce gratuit, agents autonomes, IA commerce, DTC France, marketplace France, indépendance commerciale',
  authors: [{ name: 'Vincent DORANGE' }],
  creator: 'Vincent DORANGE',
  publisher: 'Agentic Commerce Framework',
  
  // Métadonnées géographiques
  other: {
    'geo.region': 'FR-PAC',
    'geo.placename': 'Draguignan, France',
    'geo.position': '43.5383;6.4656',
    'ICBM': '43.5383, 6.4656',
  },
  
  // Open Graph avec locale
  openGraph: {
    title: 'Score ACF® - Calculateur de Souveraineté Commerciale',
    description: 'Outil gratuit pour mesurer votre indépendance face aux plateformes e-commerce. Made in France 🇫🇷',
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['fr_BE', 'fr_CH', 'fr_CA'],
    siteName: 'Score ACF',
    images: [
      {
        url: '/logo-acf.jpg',
        width: 1536,
        height: 1024,
        alt: 'Logo ACF - Agentic Commerce Framework',
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Score ACF® - Calculateur de Souveraineté',
    description: 'Mesurez gratuitement votre dépendance aux plateformes e-commerce en 5 minutes',
    images: ['/logo-acf.jpg'],
    creator: '@vincentdorange',
  },
  
  // Robots
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
  
  // Icônes
  icons: {
    icon: '/logo-acf.jpg',
    apple: '/logo-acf.jpg',
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Langue et région
  alternates: {
    canonical: 'https://acfscore.com',
    languages: {
      'fr-FR': 'https://acfscore.com',
      'fr-BE': 'https://acfscore.com',
      'fr-CH': 'https://acfscore.com',
      'fr-CA': 'https://acfscore.com',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr-FR" dir="ltr" className="scroll-smooth">
      <head>
        <meta name="language" content="French" />
        <meta name="geo.region" content="FR-PAC" />
        <meta name="geo.placename" content="France" />
        <SchemaOrg />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
