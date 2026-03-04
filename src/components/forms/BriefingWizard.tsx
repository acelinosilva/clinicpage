'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    ArrowRight, ArrowLeft, Sparkles, Loader2, Check,
    Building2, Scissors, MessageSquare, Phone, Palette,
    Share2, Eye, Layout, Type, MousePointer2, Image as ImageIcon,
    MapPin, Globe, CheckCircle2
} from 'lucide-react'
import MiniHeroPreview from './MiniHeroPreview'
import { SPECIALTIES, TEMPLATES, BriefingData } from '@/types'
import { cn } from '@/lib/utils'

const briefingSchema = z.object({
    clinic_name: z.string().min(2, 'Obrigatório'),
    specialty: z.string().min(1, 'Selecione uma especialidade'),
    city: z.string().min(2, 'Obrigatório'),
    years_experience: z.coerce.number().nullable().optional(),
    patients_served: z.coerce.number().nullable().optional(),
    main_service: z.string().min(3, 'Obrigatório'),
    main_benefit: z.string().min(5, 'Obrigatório'),
    tone_of_voice: z.enum(['professional_warm', 'modern_dynamic', 'scientific_reliable', 'friendly_casual']),
    whatsapp: z.string().min(10, 'WhatsApp obrigatório'),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    address: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    zip_code: z.string().optional(),
    state: z.string().optional(),
    primary_cta: z.enum(['whatsapp', 'phone', 'form', 'external_booking', 'form_scroll', 'external_link']),
    template_id: z.string().min(1, 'Selecione um template'),
    primary_color: z.string().optional(),
})

type BriefingSchema = z.infer<typeof briefingSchema>

const STEPS = [
    { icon: Building2, title: 'Sobre sua Clínica', desc: 'Informações básicas' },
    { icon: Scissors, title: 'Serviços', desc: 'O que você oferece' },
    { icon: MessageSquare, title: 'Comunicação', desc: 'Tom e público' },
    { icon: Phone, title: 'Contato e CTA', desc: 'Como os pacientes chegam' },
    { icon: Palette, title: 'Template e Estilo', desc: 'Visual da sua página' },
]

const TONES = [
    { value: 'professional_warm', label: 'Profissional e Acolhedor', desc: 'Ideal para clínicas de saúde geral e psicologia' },
    { value: 'modern_dynamic', label: 'Moderno e Dinâmico', desc: 'Perfeito para estética e odontologia' },
    { value: 'scientific_reliable', label: 'Científico e Confiável', desc: 'Ótimo para cardiologia e oncologia' },
    { value: 'friendly_casual', label: 'Descontraído e Próximo', desc: 'Pediatria, psicologia infantil' },
]

const CTA_OPTIONS = [
    { value: 'whatsapp', label: '💬 Chamar no WhatsApp' },
    { value: 'phone', label: '📞 Ligar agora' },
    { value: 'form', label: '📝 Formulário de agendamento' },
    { value: 'external_booking', label: '🔗 Link externo de agendamento' },
]

export default function BriefingWizard() {
    const router = useRouter()
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState({ other_services: [] as string[], differentials: [] as string[], pain_points: [] as string[] })
    const [tagInput, setTagInput] = useState({ other_services: '', differentials: '', pain_points: '' })

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<any>({
        resolver: zodResolver(briefingSchema),
        defaultValues: {
            tone_of_voice: 'professional_warm',
            primary_cta: 'whatsapp',
            template_id: 'universal-modern',
            primary_color: '#0D7C66',
        },
    })

    function addTag(field: keyof typeof tags, max: number) {
        const val = tagInput[field].trim()
        if (!val || tags[field].length >= max) return
        setTags((t) => ({ ...t, [field]: [...t[field], val] }))
        setTagInput((t) => ({ ...t, [field]: '' }))
    }

    function removeTag(field: keyof typeof tags, idx: number) {
        setTags((t) => ({ ...t, [field]: t[field].filter((_, i) => i !== idx) }))
    }

    async function onSubmit(data: BriefingSchema) {
        setLoading(true)
        try {
            const briefing: Partial<BriefingData> = {
                ...data,
                other_services: tags.other_services,
                differentials: tags.differentials,
                pain_points: tags.pain_points,
            } as any

            const res = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ briefing }),
            })

            if (!res.ok) throw new Error('Falha ao gerar a landing page')
            const { id } = await res.json()
            router.push(`/editor/${id}`)
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    const isLastStep = step === STEPS.length - 1

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            {/* Step indicator */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    {STEPS.map((s, i) => (
                        <div key={i} className="flex-1 flex items-center">
                            <button
                                type="button"
                                onClick={() => i < step && setStep(i)}
                                className={cn(
                                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all',
                                    i === step ? 'gradient-brand text-white shadow-lg' :
                                        i < step ? 'bg-[#0D7C66] text-white' :
                                            'bg-[#E2E8F0] text-[#94A3B8]'
                                )}
                            >
                                {i < step ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                            </button>
                            {i < STEPS.length - 1 && (
                                <div className={cn('flex-1 h-px mx-2', i < step ? 'bg-[#0D7C66]' : 'bg-[#E2E8F0]')} />
                            )}
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-xl font-black text-[#0F172A]">{STEPS[step].title}</h2>
                    <p className="text-[#94A3B8] text-sm">{STEPS[step].desc} · Etapa {step + 1} de {STEPS.length}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 0: About */}
                {step === 0 && (
                    <div className="space-y-4">
                        <div>
                            <label className="label">Nome da Clínica *</label>
                            <input {...register('clinic_name')} className="input" placeholder="Ex: Clínica Sorriso Belo" />
                            {errors.clinic_name && <p className="text-red-500 text-xs mt-1">{(errors.clinic_name as any).message}</p>}
                        </div>
                        <div>
                            <label className="label">Especialidade Principal *</label>
                            <select {...register('specialty')} className="input">
                                <option value="">Selecione...</option>
                                {SPECIALTIES.map((s) => (
                                    <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                            </select>
                            {errors.specialty && <p className="text-red-500 text-xs mt-1">{(errors.specialty as any).message}</p>}
                        </div>
                        <div>
                            <label className="label">Cidade / Bairro *</label>
                            <input {...register('city')} className="input" placeholder="Ex: São Paulo, Moema" />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{(errors.city as any).message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Anos de experiência</label>
                                <input {...register('years_experience')} type="number" className="input" placeholder="Ex: 10" />
                            </div>
                            <div>
                                <label className="label">Pacientes atendidos</label>
                                <input {...register('patients_served')} type="number" className="input" placeholder="Ex: 2000" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 1: Services */}
                {step === 1 && (
                    <div className="space-y-4">
                        <div>
                            <label className="label">Serviço ou Tratamento Principal *</label>
                            <input {...register('main_service')} className="input" placeholder="Ex: Implante Dentário, Harmonização Facial..." />
                            {errors.main_service && <p className="text-red-500 text-xs mt-1">{(errors.main_service as any).message}</p>}
                        </div>
                        <div>
                            <label className="label">Principal Benefício para o Paciente *</label>
                            <input {...register('main_benefit')} className="input" placeholder="Ex: Recupere seu sorriso em 3 visitas" />
                            {errors.main_benefit && <p className="text-red-500 text-xs mt-1">{(errors.main_benefit as any).message}</p>}
                        </div>
                        <div>
                            <label className="label">Outros Serviços <span className="text-[#94A3B8]">(até 8)</span></label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    value={tagInput.other_services}
                                    onChange={e => setTagInput(t => ({ ...t, other_services: e.target.value }))}
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag('other_services', 8))}
                                    className="input"
                                    placeholder="Digite e pressione Enter"
                                />
                                <button type="button" onClick={() => addTag('other_services', 8)} className="btn-secondary btn shrink-0">Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.other_services.map((t, i) => (
                                    <span key={i} className="badge badge-green cursor-pointer" onClick={() => removeTag('other_services', i)}>
                                        {t} ×
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="label">Diferenciais da Clínica <span className="text-[#94A3B8]">(até 5)</span></label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    value={tagInput.differentials}
                                    onChange={e => setTagInput(t => ({ ...t, differentials: e.target.value }))}
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag('differentials', 5))}
                                    className="input"
                                    placeholder="Ex: Sem dor, Parcelamento, Emergência"
                                />
                                <button type="button" onClick={() => addTag('differentials', 5)} className="btn-secondary btn shrink-0">Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.differentials.map((t, i) => (
                                    <span key={i} className="badge badge-blue cursor-pointer" onClick={() => removeTag('differentials', i)}>
                                        {t} ×
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Communication */}
                {step === 2 && (
                    <div className="space-y-5">
                        <div>
                            <label className="label">Tom de Voz *</label>
                            <div className="grid grid-cols-1 gap-3">
                                {TONES.map((tone) => {
                                    const selected = watch('tone_of_voice') === tone.value
                                    return (
                                        <label
                                            key={tone.value}
                                            className={cn(
                                                'flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all',
                                                selected ? 'border-[#0D7C66] bg-[#0D7C66]/5' : 'border-[#E2E8F0] hover:border-[#0D7C66]/30'
                                            )}
                                        >
                                            <input type="radio" {...register('tone_of_voice')} value={tone.value} className="sr-only" />
                                            <div className={cn('w-4 h-4 rounded-full border-2 shrink-0 mt-0.5', selected ? 'border-[#0D7C66] bg-[#0D7C66]' : 'border-[#CBD5E1]')} />
                                            <div>
                                                <div className="font-semibold text-sm">{tone.label}</div>
                                                <div className="text-xs text-[#94A3B8]">{tone.desc}</div>
                                            </div>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <label className="label">Dores e Medos do Paciente <span className="text-[#94A3B8]">(até 4)</span></label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    value={tagInput.pain_points}
                                    onChange={e => setTagInput(t => ({ ...t, pain_points: e.target.value }))}
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag('pain_points', 4))}
                                    className="input"
                                    placeholder="Ex: Medo de agulha, Vergonha do sorriso"
                                />
                                <button type="button" onClick={() => addTag('pain_points', 4)} className="btn-secondary btn shrink-0">Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.pain_points.map((t, i) => (
                                    <span key={i} className="badge badge-yellow cursor-pointer" onClick={() => removeTag('pain_points', i)}>
                                        {t} ×
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Contact & CTA */}
                {step === 3 && (
                    <div className="space-y-4">
                        <div>
                            <label className="label">WhatsApp para agendamento *</label>
                            <input {...register('whatsapp')} className="input" placeholder="(11) 99999-0000" />
                            {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{(errors.whatsapp as any).message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Telefone</label>
                                <input {...register('phone')} className="input" placeholder="(11) 3333-0000" />
                            </div>
                            <div>
                                <label className="label">E-mail</label>
                                <input {...register('email')} type="email" className="input" placeholder="contato@clinica.com.br" />
                            </div>
                        </div>
                        <div>
                            <label className="label">Endereço da Clínica</label>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                                <div className="md:col-span-9">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Rua / Logradouro</label>
                                    <input {...register('street')} className="input" placeholder="Ex: Av. Paulista" />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Número</label>
                                    <input {...register('number')} className="input" placeholder="123" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Bairro</label>
                                    <input {...register('neighborhood')} className="input" placeholder="Centro" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">CEP</label>
                                    <input {...register('zip_code')} className="input" placeholder="00000-000" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Complemento</label>
                                    <input {...register('complement')} className="input" placeholder="Sala 42" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Estado</label>
                                    <input {...register('state')} className="input" placeholder="SP" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="label">Ação principal da landing page *</label>
                            <div className="grid grid-cols-2 gap-3">
                                {CTA_OPTIONS.map((opt) => {
                                    const selected = watch('primary_cta') === opt.value
                                    return (
                                        <label
                                            key={opt.value}
                                            className={cn(
                                                'flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-sm transition-all',
                                                selected ? 'border-[#0D7C66] bg-[#0D7C66]/5 font-semibold text-[#0D7C66]' : 'border-[#E2E8F0] text-[#374151]'
                                            )}
                                        >
                                            <input type="radio" {...register('primary_cta')} value={opt.value} className="sr-only" />
                                            {opt.label}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Template */}
                {step === 4 && (
                    <div className="space-y-5">
                        <div>
                            <label className="label">Escolha um Template *</label>

                            <div className="mb-6">
                                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Eye className="w-3.5 h-3.5" />
                                    Visualização do Estilo
                                </div>
                                <MiniHeroPreview
                                    templateId={watch('template_id')}
                                    clinicName={watch('clinic_name')}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {TEMPLATES.map((tpl) => {
                                    const selected = watch('template_id') === tpl.id
                                    return (
                                        <label
                                            key={tpl.id}
                                            className={cn(
                                                'p-5 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden group',
                                                selected
                                                    ? 'border-[#0D7C66] bg-[#0D7C66]/5 shadow-md shadow-[#0D7C66]/10'
                                                    : 'border-[#E2E8F0] hover:border-[#0D7C66]/30 hover:bg-[#F8FAFC]'
                                            )}
                                        >
                                            <input type="radio" {...register('template_id')} value={tpl.id} className="sr-only" />

                                            {tpl.is_premium && (
                                                <div className="absolute -right-12 top-4 bg-[#F59E0B] text-white text-[10px] font-bold py-1 px-12 rotate-45 shadow-sm">
                                                    PREMIUM
                                                </div>
                                            )}

                                            <div className="flex flex-col h-full">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors",
                                                    selected ? "bg-[#0D7C66] text-white" : "bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#0D7C66]/10 group-hover:text-[#0D7C66]"
                                                )}>
                                                    <Palette className="w-6 h-6" />
                                                </div>

                                                <div className="font-bold text-sm text-[#1E293B] mb-1">{tpl.name}</div>
                                                <div className="text-xs text-[#64748B] leading-relaxed mb-3">
                                                    {tpl.description}
                                                </div>

                                                <div className="mt-auto flex flex-wrap gap-1">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mr-2">Estilo:</span>
                                                    <span className="text-[10px] font-medium bg-[#E2E8F0] px-2 py-0.5 rounded text-[#475569]">
                                                        {tpl.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {selected && (
                                                <div className="absolute top-4 right-4 text-[#0D7C66]">
                                                    <div className="bg-[#0D7C66] rounded-full p-1 text-white">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                </div>
                                            )}
                                        </label>
                                    )
                                })}
                            </div>
                            {errors.template_id && <p className="text-red-500 text-xs mt-1">{(errors.template_id as any).message}</p>}
                        </div>
                        <div>
                            <label className="label">Cor principal da marca</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    {...register('primary_color')}
                                    className="w-12 h-12 rounded-xl border border-[#E2E8F0] cursor-pointer"
                                />
                                <span className="text-sm text-[#475569]">Escolha a cor da sua marca</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-[#E2E8F0]">
                    <button
                        type="button"
                        onClick={() => setStep(s => s - 1)}
                        disabled={step === 0}
                        className="btn-ghost btn disabled:opacity-30"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Anterior
                    </button>

                    {isLastStep ? (
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary btn btn-lg"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Gerando com IA...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Gerar landing page
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setStep(s => s + 1)}
                            className="btn-primary btn"
                        >
                            Próximo
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
