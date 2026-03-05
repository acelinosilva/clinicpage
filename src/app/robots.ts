import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://clinicpage.com.br'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/lp/'], // Prevent crawling of private areas and generated pages without domains
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
