import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://clinicpage.com.br'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'], // Prevent crawling of private areas and system APIs
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
