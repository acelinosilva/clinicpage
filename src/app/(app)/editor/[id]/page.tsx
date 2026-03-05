'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEditorStore } from '@/store/editor-store'
import { createClient } from '@/lib/supabase-client'
import SidebarEditor from '@/components/editor/SidebarEditor'
import ImageUpload from '@/components/editor/ImageUpload'
import {
    Settings, Eye, Save, Rocket, ChevronLeft,
    Smartphone, Tablet, Monitor, Sparkles, Loader2,
    List, Palette, Type, Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import CTAFormSection from '@/components/sections/CTAFormSection'
import MapSection from '@/components/sections/MapSection'
import FooterSection from '@/components/sections/FooterSection'

export default function EditorPage() {
    const { id } = useParams()
    const router = useRouter()
    const {
        lp, setLP, loading, setLoading, saving, setSaving,
        error, setError,
        activeSection, setActiveSection, updateSection, updateTheme
    } = useEditorStore()

    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
    const [sidebarTab, setSidebarTab] = useState<'sections' | 'style' | 'seo'>('sections')

    useEffect(() => {
        async function loadLP() {
            if (!id) return

            setLoading(true)
            setError(null)
            try {
                const supabase = createClient()
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) {
                    router.push('/login')
                    return
                }

                const { data, error: fetchError } = await supabase
                    .from('landing_pages')
                    .select('*')
                    .eq('id', id)
                    .eq('user_id', user.id)
                    .single()

                if (fetchError) throw fetchError
                if (!data) throw new Error('Landing page não encontrada ou sem permissão')

                setLP(data)
            } catch (err: any) {
                console.error('Error loading LP:', err)
                setError(err.message || 'Falha ao carregar landing page')
            } finally {
                setLoading(false)
            }
        }

        loadLP()
    }, [id, setLP, setLoading, setError, router])

    const handleSave = async () => {
        setSaving(true)
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Usuário não autenticado')

            const { error } = await supabase
                .from('landing_pages')
                .update(lp)
                .eq('id', id)
                .eq('user_id', user.id)

            if (error) throw error
            alert('Salvo com sucesso!')
        } catch (err: any) {
            alert(err.message)
        } finally {
            setSaving(false)
        }
    }

    const handlePublish = async () => {
        setSaving(true)
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Usuário não autenticado')

            const { error } = await supabase
                .from('landing_pages')
                .update({ status: 'published' })
                .eq('id', id)
                .eq('user_id', user.id)

            if (error) throw error
            window.open(`/lp/${lp?.slug}`, '_blank')
        } catch (err: any) {
            alert(err.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 text-[#0D7C66] animate-spin mb-4" />
                <p className="font-bold text-[#0F172A]">Carregando editor...</p>
            </div>
        )
    }

    if (error || !lp) {
        return (
            <div className="h-screen flex items-center justify-center bg-white p-6">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                        <Rocket className="w-10 h-10 text-red-500 rotate-180" />
                    </div>
                    <h1 className="text-2xl font-black text-[#0F172A] mb-2">Ops! Algo deu errado</h1>
                    <p className="text-[#64748B] mb-8">{error || 'Não conseguimos encontrar esta página.'}</p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="btn btn-primary w-full"
                    >
                        Voltar para o Painel
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-[#F1F5F9]">
            {/* Top Bar */}
            <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="p-2 hover:bg-[#F1F5F9] rounded-lg text-[#64748B]"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-[#E2E8F0]" />
                    <div>
                        <h1 className="font-bold text-[#0F172A] text-sm leading-none mb-1">{lp.title}</h1>
                        <p className="text-[10px] text-[#94A3B8] font-mono leading-none">clincpage.com.br/lp/{lp.slug}</p>
                    </div>
                </div>

                {/* View Switcher */}
                <div className="hidden md:flex items-center bg-[#F1F5F9] rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('desktop')}
                        className={cn("p-1.5 rounded-md transition-all", viewMode === 'desktop' ? "bg-white shadow text-[#0D7C66]" : "text-[#94A3B8] hover:text-[#64748B]")}
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('tablet')}
                        className={cn("p-1.5 rounded-md transition-all", viewMode === 'tablet' ? "bg-white shadow text-[#0D7C66]" : "text-[#94A3B8] hover:text-[#64748B]")}
                    >
                        <Tablet className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('mobile')}
                        className={cn("p-1.5 rounded-md transition-all", viewMode === 'mobile' ? "bg-white shadow text-[#0D7C66]" : "text-[#94A3B8] hover:text-[#64748B]")}
                    >
                        <Smartphone className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="btn btn-ghost btn-sm text-[#475569]">
                        <Eye className="w-4 h-4" />
                        Visualizar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn btn-secondary btn-sm"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Salvar
                    </button>
                    <button
                        onClick={handlePublish}
                        disabled={saving}
                        className="btn btn-primary btn-sm"
                    >
                        <Rocket className="w-4 h-4" />
                        Publicar
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Panel */}
                <aside className="w-80 bg-white border-r border-[#E2E8F0] flex flex-col z-40">
                    <div className="flex border-b border-[#E2E8F0]">
                        <button
                            onClick={() => setSidebarTab('sections')}
                            className={cn("flex-1 py-4 text-xs font-bold uppercase tracking-wider", sidebarTab === 'sections' ? "text-[#0D7C66] border-b-2 border-[#0D7C66]" : "text-[#94A3B8]")}
                        >
                            Seções
                        </button>
                        <button
                            onClick={() => setSidebarTab('style')}
                            className={cn("flex-1 py-4 text-xs font-bold uppercase tracking-wider", sidebarTab === 'style' ? "text-[#0D7C66] border-b-2 border-[#0D7C66]" : "text-[#94A3B8]")}
                        >
                            Estilo
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {sidebarTab === 'sections' && (
                            <>
                                <div className="space-y-3">
                                    {[...Object.keys(lp.sections), ...(lp.sections.map ? [] : ['map'])].map((key) => (
                                        <div key={key} className="flex flex-col gap-2">
                                            <button
                                                onClick={() => setActiveSection(activeSection === key ? null : (key as any))}
                                                className={cn(
                                                    "w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-all",
                                                    activeSection === key ? "border-[#0D7C66] bg-[#0D7C66]/5 text-[#0D7C66] font-bold" : "border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#475569]"
                                                )}
                                            >
                                                <span className="capitalize font-semibold">{key.replace('_', ' ')}</span>
                                                <Settings className={cn("w-4 h-4 transition-transform", activeSection === key ? "rotate-90 opacity-100" : "opacity-50")} />
                                            </button>

                                            {/* Editor Panel */}
                                            {activeSection === key && (
                                                <div className="rounded-xl border border-[#0D7C66]/20 bg-[#F1F5F9]/50 overflow-hidden">
                                                    <SidebarEditor />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-[#CBD5E1] text-[#94A3B8] text-sm hover:border-[#0D7C66] hover:text-[#0D7C66] transition-all mt-4">
                                    <List className="w-4 h-4" />
                                    Adicionar Seção
                                </button>
                            </>
                        )}

                        {sidebarTab === 'style' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-3 block">Identidade Visual</label>
                                    <ImageUpload
                                        label="Logotipo da Clínica"
                                        value={lp.briefing.logo_url}
                                        onChange={(url) => setLP({
                                            ...lp,
                                            briefing: { ...lp.briefing, logo_url: url }
                                        })}
                                        lpId={lp.id}
                                    />
                                </div>

                                <div className="h-px bg-[#F1F5F9]" />

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-3 block">Cores da Marca</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <span className="text-[10px] text-[#475569]">Primária</span>
                                            <div className="flex gap-2">
                                                <input
                                                    type="color"
                                                    value={lp.theme.colors.primary}
                                                    onChange={(e) => updateTheme({ colors: { ...lp.theme.colors, primary: e.target.value } })}
                                                    className="w-8 h-8 rounded-lg overflow-hidden border-0 p-0 cursor-pointer"
                                                />
                                                <span className="text-[10px] font-mono text-[#94A3B8] self-center">{lp.theme.colors.primary}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-[#F1F5F9]" />

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-3 block">Tipografia</label>
                                    <div className="space-y-3">
                                        <div className="space-y-1.5">
                                            <span className="text-[10px] text-[#475569]">Títulos (Heading)</span>
                                            <select
                                                value={lp.theme.typography.font_heading}
                                                onChange={(e) => updateTheme({ typography: { ...lp.theme.typography, font_heading: e.target.value } })}
                                                className="w-full text-xs p-2.5 rounded-xl border bg-[#F8FAFC]"
                                            >
                                                <option value="Outfit">Outfit</option>
                                                <option value="Inter">Inter</option>
                                                <option value="Montserrat">Montserrat</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Helper Bar */}
                    <div className="p-4 bg-gradient-to-br from-[#0D7C66] to-[#13C4A1] m-4 rounded-[1.5rem] shadow-lg text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Assistente IA</span>
                        </div>
                        <p className="text-[10px] opacity-90 mb-3">Selecione uma seção para gerar variações ou melhorar o texto.</p>
                        <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg py-2 text-xs font-bold transition-all">
                            Refinar conteúdo
                        </button>
                    </div>
                </aside>

                {/* Preview Area */}
                <main className="flex-1 bg-[#F1F5F9] overflow-y-auto p-12 flex justify-center scrollbar-hide">
                    <div className={cn(
                        "bg-white transition-all duration-500 shadow-2xl relative",
                        viewMode === 'desktop' ? "w-full" :
                            viewMode === 'tablet' ? "w-[768px] rounded-3xl overflow-hidden border-[12px] border-[#0F172A]" :
                                "w-[375px] rounded-[3rem] overflow-hidden border-[12px] border-[#0F172A]"
                    )}>
                        <div className="lp-renderer pointer-events-none select-none">
                            {lp.sections.hero && <HeroSection data={lp.sections.hero} theme={lp.theme} />}
                            {lp.sections.problem_solution && <ProblemSolutionSection data={lp.sections.problem_solution} theme={lp.theme} />}
                            {lp.sections.services && <ServicesSection data={lp.sections.services} theme={lp.theme} />}
                            {lp.sections.about && <AboutSection data={lp.sections.about} theme={lp.theme} />}
                            {lp.sections.testimonials && <TestimonialsSection data={lp.sections.testimonials} theme={lp.theme} />}
                            {lp.sections.faq && <FAQSection data={lp.sections.faq} theme={lp.theme} />}
                            {lp.sections.map && lp.sections.map.show_map && <MapSection data={lp.sections.map} theme={lp.theme} />}
                            {lp.sections.cta_form && <CTAFormSection data={lp.sections.cta_form} theme={lp.theme} />}

                            <FooterSection
                                data={lp.sections.footer}
                                theme={lp.theme}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
