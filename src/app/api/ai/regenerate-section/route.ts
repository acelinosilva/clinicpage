import { NextRequest, NextResponse } from 'next/server'
import {
    generateHeroSection,
    generateProblemSolutionSection,
    generateServicesSection,
    generateAboutSection,
    generateFAQSection,
    generateCTAFormSection,
} from '@/lib/ai'
import { createServiceClient, createServer } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
    const supabaseServer = await createServer()
    const { data: { user: authUser }, error: authError } = await supabaseServer.auth.getUser()

    if (authError || !authUser) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = authUser.id

    try {
        const { id, sectionId, briefing } = await req.json()
        if (!id || !sectionId || !briefing) {
            return NextResponse.json({ error: 'Parâmetros ausentes' }, { status: 400 })
        }

        let newSectionContent: any

        switch (sectionId) {
            case 'hero':
                newSectionContent = await generateHeroSection(briefing)
                break
            case 'problem_solution':
                newSectionContent = await generateProblemSolutionSection(briefing)
                break
            case 'services':
                newSectionContent = await generateServicesSection(briefing)
                break
            case 'about':
                newSectionContent = await generateAboutSection(briefing)
                break
            case 'faq':
                newSectionContent = await generateFAQSection(briefing)
                break
            case 'cta_form':
                newSectionContent = await generateCTAFormSection(briefing)
                break
            default:
                return NextResponse.json({ error: 'Seção inválida' }, { status: 400 })
        }

        const supabase = createServiceClient()

        // Get current LP
        const { data: lp, error: getError } = await supabase
            .from('landing_pages')
            .select('sections')
            .eq('id', id)
            .eq('user_id', userId) // Security check
            .single()

        if (getError || !lp) {
            return NextResponse.json({ error: 'Landing page não encontrada' }, { status: 404 })
        }

        // Update sections
        const updatedSections = {
            ...lp.sections,
            [sectionId]: {
                ...lp.sections[sectionId],
                ...newSectionContent,
            },
        }

        const { error: updateError } = await supabase
            .from('landing_pages')
            .update({ sections: updatedSections })
            .eq('id', id)

        if (updateError) {
            throw new Error('Erro ao atualizar seção no banco')
        }

        return NextResponse.json({ success: true, section: updatedSections[sectionId] })
    } catch (error: any) {
        console.error('Regenerate section error:', error)
        return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 })
    }
}
