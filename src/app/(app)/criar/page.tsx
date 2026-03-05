'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    ChevronLeft, ChevronRight, Sparkles,
    Check, ArrowRight, Loader2, Globe,
    Stethoscope, MapPin, Phone, MessageSquare, Brain, Search, Plus, Info, Palette, Layout, Building2, Lock
} from 'lucide-react'
import MiniHeroPreview from '@/components/forms/MiniHeroPreview'
import { cn } from '@/lib/utils'
import { SPECIALTIES } from '@/constants/specialties'
import { TEMPLATES } from '@/types'
import { PLANS, Plan } from '@/lib/plans'
import { createClient } from '@/lib/supabase-client'

export default function CriarLPPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        clinicName: '',
        specialty: '',
        city: '',
        whatsapp: '',
        mainService: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        zipCode: '',
        state: '',
        templateId: 'modern_minimal',
        tone: 'professional_warm'
    })

    const [currentPlan, setCurrentPlan] = useState<Plan>('free')
    const [lpCount, setLpCount] = useState(0)

    useEffect(() => {
        async function loadPlan() {
            try {
                const supabase = createClient()
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return

                const { data: profile } = await supabase
                    .from('users')
                    .select('plan')
                    .eq('id', user.id)
                    .single()

                const { count } = await supabase
                    .from('landing_pages')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', user.id)

                if (profile) setCurrentPlan(profile.plan as Plan)
                if (count !== null) setLpCount(count)
            } catch (err) {
                console.error('Error loading plan:', err)
            }
        }
        loadPlan()
    }, [])

    const totalSteps = 5
    const progress = (step / totalSteps) * 100

    const updateFormData = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }))
    }

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1)
        else handleGenerate()
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
        else router.back()
    }

    const handleGenerate = async () => {
        setIsGenerating(true)
        setError(null)
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/login')
                return
            }

            // 1. Verificar plano e limites
            const { data: profile } = await supabase
                .from('users')
                .select('plan')
                .eq('id', user.id)
                .single()

            const { count } = await supabase
                .from('landing_pages')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)

            const planConfig = PLANS[currentPlan]

            // Verificação dinâmica de limites
            if (planConfig.limits.landing_pages_active !== -1 && lpCount >= planConfig.limits.landing_pages_active) {
                const message = currentPlan === 'free'
                    ? 'Você atingiu o limite de 1 landing page do plano gratuito. Faça upgrade para o plano Profissional para criar até 3 páginas!'
                    : `Você atingiu o limite de ${planConfig.limits.landing_pages_active} landing pages do seu plano ${planConfig.name}. Faça upgrade para o Clínica Plus para páginas ilimitadas!`
                throw new Error(message)
            }

            // 2. Chamar API de geração com IA
            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    briefing: {
                        clinic_name: formData.clinicName,
                        specialty: formData.specialty,
                        city: formData.city,
                        whatsapp: formData.whatsapp,
                        street: formData.street,
                        number: formData.number,
                        complement: formData.complement,
                        neighborhood: formData.neighborhood,
                        zip_code: formData.zipCode,
                        state: formData.state,
                        template_id: formData.templateId as any,
                        main_service: formData.mainService,
                        tone_of_voice: formData.tone,
                        primary_cta: 'whatsapp'
                    }
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao gerar landing page')
            }

            if (data.id) {
                router.push(`/editor/${data.id}`)
            } else {
                throw new Error('ID da landing page não retornado')
            }
        } catch (error: any) {
            console.error('Erro ao gerar:', error)
            setError(error.message || 'Ocorreu um erro inesperado')
            setIsGenerating(false)
        }
    }

    if (isGenerating) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
                <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-3xl bg-[#0D7C66]/10 animate-pulse flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-[#0D7C66]" />
                    </div>
                </div>
                <h1 className="text-2xl font-black text-[#0F172A] mb-2">Criando seu site com IA...</h1>
                <p className="text-[#64748B] max-w-sm">Nossa inteligência artificial está escrevendo os textos e estruturando o design da sua clínica. Isso leva cerca de 30 segundos.</p>

                <div className="w-64 h-1.5 bg-[#F1F5F9] rounded-full mt-8 overflow-hidden">
                    <div className="h-full bg-[#0D7C66] animate-[shimmer_2s_infinite] w-full origin-left" />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header / Nav */}
            <header className="fixed top-0 inset-x-0 h-20 bg-white border-b border-[#E2E8F0] z-50 flex items-center justify-between px-6 lg:px-12">
                <div className="flex items-center gap-4">
                    <button onClick={handleBack} className="p-2 hover:bg-[#F1F5F9] rounded-xl text-[#64748B]">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-[#E2E8F0]" />
                    <div>
                        <h1 className="font-bold text-[#0F172A] text-sm">Nova Landing Page</h1>
                        <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">Passo {step} de {totalSteps}</p>
                    </div>
                </div>

                <div className="w-48 hidden md:block">
                    <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#0D7C66] transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-xs text-[#94A3B8] font-medium hidden sm:block">Faltam alguns segundos</span>
                    <button
                        onClick={handleNext}
                        disabled={(step === 1 && !formData.clinicName) || (step === 2 && !formData.specialty)}
                        className="bg-[#0D7C66] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#0A6452] flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0D7C66]/20"
                    >
                        {step === totalSteps ? 'Gerar com IA' : 'Próximo'}
                        {step === totalSteps ? <Sparkles className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center">
                {error && (
                    <div className="w-full max-w-xl mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <Info className="w-4 h-4" />
                        </div>
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className="w-full max-w-xl animate-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <span className="w-12 h-12 bg-[#0D7C66]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Stethoscope className="w-6 h-6 text-[#0D7C66]" />
                            </span>
                            <h2 className="text-3xl font-black text-[#0F172A] mb-2">Primeiro, qual o nome?</h2>
                            <p className="text-[#64748B]">O nome da clínica ou do profissional que aparecerá no site.</p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] shadow-sm">
                            <label className="block text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">Nome da Clínica / Profissional</label>
                            <input
                                type="text"
                                value={formData.clinicName}
                                autoFocus
                                onChange={e => updateFormData({ clinicName: e.target.value })}
                                placeholder="Ex: Clínica Sorriso, Dr. Carlos Silva..."
                                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all font-medium"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Specialty Selector */}
                {step === 2 && (
                    <div className="w-full animate-in slide-in-from-right-4 duration-500">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-[#0F172A] mb-2">Qual a especialidade?</h2>
                            <p className="text-[#64748B]">Isso ajuda a IA a definir o tone de voz e as imagens corretas.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {SPECIALTIES.map((spec) => (
                                <button
                                    key={spec.id}
                                    onClick={() => updateFormData({ specialty: spec.id })}
                                    className={cn(
                                        "p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 text-center group",
                                        formData.specialty === spec.id
                                            ? "border-[#0D7C66] bg-[#0D7C66]/5 shadow-xl shadow-[#0D7C66]/10"
                                            : "border-transparent bg-white hover:border-[#E2E8F0]"
                                    )}
                                >
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                                        formData.specialty === spec.id ? "bg-[#0D7C66] text-white" : "bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#E2E8F0]"
                                    )}>
                                        <spec.icon className="w-6 h-6" />
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold uppercase tracking-wider",
                                        formData.specialty === spec.id ? "text-[#0D7C66]" : "text-[#94A3B8]"
                                    )}>{spec.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Template Style */}
                {step === 3 && (
                    <div className="w-full max-w-2xl animate-in slide-in-from-right-4 duration-500">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-[#0F172A] mb-2">Estilo da Página</h2>
                            <p className="text-[#64748B]">Como você quer que sua clínica seja vista?</p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] shadow-sm space-y-6">
                            <div>
                                <label className="flex items-center gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-4">
                                    <Sparkles className="w-3.5 h-3.5 text-[#0D7C66]" />
                                    Selecione o Estilo Visual
                                </label>

                                <div className="mb-8">
                                    <MiniHeroPreview
                                        templateId={formData.templateId as any}
                                        clinicName={formData.clinicName}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {TEMPLATES.map((tpl) => {
                                        const isLocked = tpl.is_premium && currentPlan === 'free'
                                        return (
                                            <button
                                                key={tpl.id}
                                                disabled={isLocked}
                                                onClick={() => !isLocked && updateFormData({ templateId: tpl.id })}
                                                className={cn(
                                                    "p-6 rounded-[2rem] border-2 text-left transition-all relative overflow-hidden group",
                                                    isLocked ? "bg-[#F8FAFC] border-[#E2E8F0] opacity-80 cursor-not-allowed" :
                                                        formData.templateId === tpl.id
                                                            ? "border-[#0D7C66] bg-[#0D7C66]/5 shadow-xl shadow-[#0D7C66]/10"
                                                            : "border-[#E2E8F0] bg-white hover:border-[#0D7C66]/30 hover:bg-[#F8FAFC]"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                                                    isLocked ? "bg-[#E2E8F0] text-[#94A3B8]" :
                                                        formData.templateId === tpl.id ? "bg-[#0D7C66] text-white" : "bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#0D7C66]/10 group-hover:text-[#0D7C66]"
                                                )}>
                                                    {isLocked ? <Lock className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                                                </div>
                                                <h3 className="font-bold text-[#1E293B] mb-1">{tpl.name}</h3>
                                                <p className="text-xs text-[#64748B] leading-relaxed mb-4">{tpl.description}</p>

                                                {isLocked ? (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D7C66]/10 text-[#0D7C66] text-[10px] font-bold uppercase tracking-widest">
                                                        <Sparkles className="w-3 h-3" />
                                                        Plano Pro
                                                    </div>
                                                ) : formData.templateId === tpl.id && (
                                                    <div className="absolute top-6 right-6">
                                                        <div className="bg-[#0D7C66] rounded-full p-1 text-white">
                                                            <Check className="w-3 h-3" />
                                                        </div>
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Localização e Contato */}
                {step === 4 && (
                    <div className="w-full max-w-xl animate-in slide-in-from-right-4 duration-500">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-[#0F172A] mb-2">Contato e Localização</h2>
                            <p className="text-[#64748B]">Onde sua clínica fica e como os pacientes agendam?</p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] shadow-sm space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                                <div className="md:col-span-9">
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-2">
                                        Rua / Logradouro
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.street}
                                        onChange={e => updateFormData({ street: e.target.value })}
                                        placeholder="Ex: Av. Paulista"
                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all font-medium"
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-2">
                                        Nº
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.number}
                                        onChange={e => updateFormData({ number: e.target.value })}
                                        placeholder="123"
                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-2">
                                        Bairro
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.neighborhood}
                                        onChange={e => updateFormData({ neighborhood: e.target.value })}
                                        placeholder="Centro"
                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-2">
                                        CEP
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={e => updateFormData({ zipCode: e.target.value })}
                                        placeholder="00000-000"
                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-2">
                                        Localidade (Cidade/UF)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={e => updateFormData({ city: e.target.value })}
                                        placeholder="São Paulo, SP"
                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-2">
                                        Complemento
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.complement}
                                        onChange={e => updateFormData({ complement: e.target.value })}
                                        placeholder="Sala 401"
                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-2">
                                    <MessageSquare className="w-3.5 h-3.5 text-[#0D7C66]" />
                                    WhatsApp para Agendamentos
                                </label>
                                <input
                                    type="tel"
                                    value={formData.whatsapp}
                                    onChange={e => updateFormData({ whatsapp: e.target.value })}
                                    placeholder="(11) 99999-9999"
                                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Final Focus */}
                {step === 5 && (
                    <div className="w-full max-w-xl animate-in slide-in-from-right-4 duration-500">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-[#0F172A] mb-2">Focus Principal</h2>
                            <p className="text-[#64748B]">Qual serviço devemos destacar na primeira dobra do site?</p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-[#E2E8F0] shadow-sm space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">Serviço em Destaque</label>
                                <input
                                    type="text"
                                    value={formData.mainService}
                                    onChange={e => updateFormData({ mainService: e.target.value })}
                                    placeholder="Ex: Implantes Dentários, Limpeza de Pele..."
                                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all font-bold text-[#0D7C66]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">Tom de Voz</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: 'professional_warm', label: 'Elegante e Acolhedor' },
                                        { id: 'modern_dynamic', label: 'Moderno e Direto' },
                                    ].map(tone => (
                                        <button
                                            key={tone.id}
                                            onClick={() => updateFormData({ tone: tone.id })}
                                            className={cn(
                                                "p-4 rounded-2xl border-2 text-xs font-bold transition-all",
                                                formData.tone === tone.id ? "border-[#0D7C66] bg-[#0D7C66]/5 text-[#0D7C66]" : "border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"
                                            )}
                                        >
                                            {tone.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-[#0F172A] p-6 rounded-[2rem] text-white flex items-center gap-4 relative overflow-hidden group">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Sparkles className="w-6 h-6 text-[#13C4A1]" />
                            </div>
                            <div className="relative z-10">
                                <h4 className="font-bold text-sm">Pronto para a mágica?</h4>
                                <p className="text-xs text-white/60">Ao clicar em Gerar, nossa IA criará um site completo baseado em suas respostas.</p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D7C66] opacity-20 blur-3xl -mr-10 -mt-10 group-hover:opacity-40 transition-opacity" />
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
