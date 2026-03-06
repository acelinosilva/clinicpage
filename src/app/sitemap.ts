import { MetadataRoute } from 'next'
import { createServiceClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://clinicpage.vercel.app').replace(/\/$/, '')

    let dynamicRoutes: MetadataRoute.Sitemap = []

    try {
        const supabase = createServiceClient()
        const { data: lps, error } = await supabase
            .from('landing_pages')
            .select('slug, updated_at')
            .eq('status', 'published')

        if (error) {
            console.error('Supabase error fetching landing pages for sitemap:', error)
        }

        if (lps) {
            dynamicRoutes = lps.map((lp) => ({
                url: `${baseUrl}/lp/${lp.slug}`,
                lastModified: lp.updated_at ? new Date(lp.updated_at) : new Date(),
                changeFrequency: 'daily' as const,
                priority: 0.7,
            }))
        }
    } catch (error) {
        console.error('Unexpected error generating dynamic sitemap routes:', error)
    }

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/precos`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cadastro`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        }
    ]

    return [...staticRoutes, ...dynamicRoutes]
}
