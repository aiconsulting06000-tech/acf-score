import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://acf-score.com'
  
  const routes = [
    { url: '', priority: 1.0, changefreq: 'daily' },
    { url: '/calculator', priority: 1.0, changefreq: 'daily' },
    { url: '/pourquoi', priority: 0.9, changefreq: 'weekly' },
    { url: '/faq', priority: 0.8, changefreq: 'weekly' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' },
    { url: '/qui-sommes-nous', priority: 0.7, changefreq: 'monthly' },
    { url: '/mentions-legales', priority: 0.5, changefreq: 'yearly' },
    { url: '/cgu', priority: 0.5, changefreq: 'yearly' },
    { url: '/confidentialite', priority: 0.5, changefreq: 'yearly' },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}
