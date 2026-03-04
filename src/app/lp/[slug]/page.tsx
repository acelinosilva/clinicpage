import { notFound } from 'next/navigation'
import { createServer, createServiceClient } from '@/lib/supabase-server'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection'
import ServicesSection from '@/components/sections/ServicesSection'
import AboutSection from '@/components/sections/AboutSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import CTAFormSection from '@/components/sections/CTAFormSection'
import MapSection from '@/components/sections/MapSection'
import FooterSection from '@/components/sections/FooterSection'
import PublicHeader from '@/components/shared/PublicHeader'
import { LandingPage } from '@/types'

// This would ideally be a Server Component in Next.js 13+
export default async function LPRendererPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const adminSupabase = createServiceClient()
    const supabaseServer = await createServer()

    const { data: lp } = await adminSupabase
        .from('landing_pages')
        .select('*')
        .eq('slug', slug)
        .single()

    let canView = false
    if (lp) {
        if (lp.status === 'published') {
            canView = true
        } else {
            const { data: { user } } = await supabaseServer.auth.getUser()
            if (user && user.id === lp.user_id) {
                canView = true
            }
        }
    }

    if (!canView || !lp) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 text-center bg-[#F8FAFC]">
                <div>
                    <h1 className="text-4xl font-black text-[#0F172A] mb-4">Página não encontrada</h1>
                    <p className="text-[#475569] mb-8">A landing page que você está procurando não existe ou não está publicada.</p>
                    <a href="/" className="btn-primary btn">Voltar ao Site</a>
                </div>
            </div>
        )
    }

    const data = lp as LandingPage
    const { sections } = data
    const theme = {
        ...data.theme,
        template_id: data.template_id
    }

    return (
        <div className="lp-renderer min-h-screen">
            <PublicHeader
                clinicName={data.title}
                logoUrl={data.briefing.logo_url}
                sections={Object.keys(sections).filter(k => (sections as any)[k])}
                theme={theme}
                whatsapp={data.briefing.whatsapp}
            />

            <div id="inicio" />

            {sections.hero && <HeroSection data={sections.hero} theme={theme} />}

            {sections.problem_solution && (
                <div id="sobre">
                    <ProblemSolutionSection data={sections.problem_solution} theme={theme} />
                </div>
            )}

            {sections.services && (
                <div id="servicos">
                    <ServicesSection data={sections.services} theme={theme} />
                </div>
            )}

            {sections.about && <AboutSection data={sections.about} theme={theme} />}

            {sections.testimonials && (
                <div id="depoimentos">
                    <TestimonialsSection data={sections.testimonials} theme={theme} />
                </div>
            )}

            {sections.faq && (
                <div id="faq">
                    <FAQSection data={sections.faq} theme={theme} />
                </div>
            )}

            <div id="contato">
                {sections.map && sections.map.show_map && <MapSection data={sections.map} theme={theme} />}
                {sections.cta_form && <CTAFormSection data={sections.cta_form} theme={theme} />}
            </div>

            <FooterSection
                data={sections.footer}
                theme={theme}
            />

            {/* Floating WhatsApp Button */}
            <a
                href={`https://wa.me/${data.briefing.whatsapp.replace(/\D/g, '')}`}
                className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            </a>
        </div>
    )
}

// Add dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const adminSupabase = createServiceClient()
    const supabaseServer = await createServer()

    const { data: lp } = await adminSupabase
        .from('landing_pages')
        .select('title, seo, status, user_id')
        .eq('slug', slug)
        .single()

    let canView = false
    let authUserStr = ''
    if (lp) {
        if (lp.status === 'published') {
            canView = true
        } else {
            const { data: { user } } = await supabaseServer.auth.getUser()
            authUserStr = user?.id || 'none'
            if (user && user.id === lp.user_id) {
                canView = true
            }
        }
    }

    if (!canView || !lp) return { title: `Página não encontrada | Owner: ${lp?.user_id} | Auth: ${authUserStr}` }

    return {
        title: lp.seo?.meta_title || lp.title,
        description: lp.seo?.meta_description,
        keywords: lp.seo?.keywords,
        openGraph: {
            title: lp.seo?.og_title || lp.seo?.meta_title,
            description: lp.seo?.og_description || lp.seo?.meta_description,
        }
    }
}
