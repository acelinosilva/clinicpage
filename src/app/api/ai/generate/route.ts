import { NextRequest, NextResponse } from 'next/server'
import { generateFullLandingPage, generateSEOMeta } from '@/lib/ai'
import { createServiceClient, createServer } from '@/lib/supabase-server'
import { PLANS, Plan } from '@/lib/plans'
import { generateSlug } from '@/lib/utils'
import { BriefingData } from '@/types'

export async function POST(req: NextRequest) {
    const supabaseServer = await createServer()
    const { data: { user: authUser }, error: authError } = await supabaseServer.auth.getUser()

    if (authError || !authUser) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = authUser.id

    try {
        const { briefing }: { briefing: BriefingData } = await req.json()
        if (!briefing) {
            return NextResponse.json({ error: 'Briefing não fornecido' }, { status: 400 })
        }

        // Add fallbacks for missing but expected fields
        if (!briefing.main_benefit) briefing.main_benefit = `Melhor atendimento em ${briefing.specialty}`
        if (!briefing.differentials) briefing.differentials = ['Atendimento humanizado', 'Tecnologia de ponta', 'Ambiente acolhedor']
        if (!briefing.tone_of_voice) briefing.tone_of_voice = 'professional_warm'

        const supabase = createServiceClient()

        // 1. Get user and check credits/plan
        const { data: existingUser, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single()

        let user = existingUser

        // Create user if doesn't exist (basic onboarding)
        if (!user) {
            console.log('User profile not found, creating...', userId)
            const { data: newUser, error: insertError } = await supabase.from('users').insert({
                id: userId,
                email: authUser.email || briefing.email || '',
                name: briefing.clinic_name,
                plan: 'free',
                ai_credits_used: 0,
                ai_credits_limit: 3,
            }).select().single()

            if (insertError || !newUser) {
                console.error('Insert user error:', insertError)
                throw new Error('Falha ao criar usuário no banco de dados')
            }
            user = newUser
        }

        const planConfig = PLANS[user.plan as Plan]
        if (planConfig.limits.ai_credits_per_month !== -1 && user.ai_credits_used >= user.ai_credits_limit) {
            return NextResponse.json({ error: 'Limite de créditos de IA atingido. Faça upgrade para continuar.' }, { status: 403 })
        }

        // 2. Generate content via Gemini
        const { sections, seo: generatedSeo } = await generateFullLandingPage(briefing)

        // 3. Prepare final data
        const finalSeo = {
            ...generatedSeo,
            og_image_url: undefined, // Add default if needed
        }

        const slug = briefing.clinic_name ? generateSlug(briefing.clinic_name) : `lp-${Math.random().toString(36).slice(2, 7)}`

        // 4. Save to DB
        const { data: lp, error: lpError } = await supabase
            .from('landing_pages')
            .insert({
                user_id: user?.id || userId,
                title: briefing.clinic_name,
                slug: slug,
                status: 'draft',
                template_id: briefing.template_id,
                briefing: briefing,
                sections: sections,
                theme: {
                    colors: {
                        primary: briefing.primary_color || '#0D7C66',
                        primary_dark: '#095c4b',
                        secondary: '#13C4A1',
                        background: '#FFFFFF',
                        surface: '#F8FAFC',
                        text_primary: '#0F172A',
                        text_secondary: '#475569',
                        cta_button: briefing.primary_color || '#0D7C66',
                        cta_button_text: '#FFFFFF',
                    },
                    typography: {
                        font_heading: 'Outfit',
                        font_body: 'Inter',
                        base_size_px: 16,
                    },
                    border_radius: 'large',
                    spacing: 'normal',
                    button_style: 'filled',
                },
                seo: finalSeo,
                integrations: {
                    whatsapp_phone: briefing.whatsapp,
                    whatsapp_message_template: sections.cta_form?.whatsapp_message_template,
                },
            })
            .select()
            .single()

        if (lpError) {
            console.error('LP creation error:', lpError)
            return NextResponse.json({ error: 'Erro ao salvar landing page' }, { status: 500 })
        }

        // 5. Update user credits
        if (user && user.plan !== 'clinic' && user.plan !== 'pro') {
            await supabase.from('users').update({ ai_credits_used: user.ai_credits_used + 1 }).eq('id', user.id)
        }

        return NextResponse.json({ id: lp.id, slug: lp.slug })
    } catch (error: any) {
        console.error('AI generate error:', error)
        return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 })
    }
}
