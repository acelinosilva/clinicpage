'use client'

import { useState } from 'react'
import { CTAFormSection as CTAType } from '@/types'
import { MessageSquare, Send, Calendar, CheckCircle2, Loader2 } from 'lucide-react'

interface CTAFormProps {
    data: CTAType
    theme?: any
}

export default function CTAFormSection({ data, theme }: CTAFormProps) {
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            if (data.submit_action === 'whatsapp') {
                const message = `Olá! Gostaria de agendar um atendimento.\n\n${Object.entries(formData)
                    .map(([key, val]) => {
                        const field = data.form_fields.find(f => f.name === key)
                        return `*${field?.label || key}:* ${val}`
                    })
                    .join('\n')
                    }`

                const whatsappUrl = `https://wa.me/${data.submit_value.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, '_blank')
                setStatus('success')
            } else {
                // Simulate API call for other actions
                await new Promise(resolve => setTimeout(resolve, 1500))
                setStatus('success')
            }
        } catch (error) {
            console.error('Form error:', error)
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <section
                id="contato"
                className="section"
                style={{ backgroundColor: data.background_color || theme?.colors?.primary || '#0D7C66' }}
            >
                <div className="container-narrow text-center">
                    <div className="bg-white rounded-[2rem] p-12 shadow-2xl animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-[#13C4A1]/10 text-[#13C4A1] rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-black text-[#0F172A] mb-4">Mensagem Enviada!</h3>
                        <p className="text-[#64748B] mb-8">
                            {data.submit_action === 'whatsapp'
                                ? 'Você foi redirecionado para o WhatsApp. Caso não tenha aberto, clique no botão novamente.'
                                : 'Obrigado pelo contato! Nossa equipe retornará em breve.'}
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="btn btn-secondary"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section
            id="contato"
            className="section"
            style={{ backgroundColor: data.background_color || theme?.colors?.primary || '#0D7C66' }}
        >
            <div className="container-wide">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text side */}
                    <div className="text-white">
                        <h2
                            className="text-4xl md:text-5xl font-black mb-6 leading-tight"
                            style={{ fontFamily: theme?.typography?.font_heading }}
                        >
                            {data.headline}
                        </h2>
                        <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-lg">
                            {data.subheadline}
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                <span>Agenda aberta para novos pacientes</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-white" />
                                </div>
                                <span>Resposta em menos de 15 minutos</span>
                            </div>
                        </div>
                    </div>

                    {/* Form side */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden relative">
                        {status === 'loading' && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                                <Loader2 className="w-10 h-10 text-[#0D7C66] animate-spin" />
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {data.form_fields.map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-bold text-[#0F172A] mb-1.5">
                                        {field.label} {field.required && '*'}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            className="input min-h-[100px] py-3"
                                            placeholder={`Escreva seu ${field.label.toLowerCase()}...`}
                                            required={field.required}
                                            value={formData[field.name] || ''}
                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                            suppressHydrationWarning
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            className="input"
                                            placeholder={`Digite seu ${field.label.toLowerCase()}...`}
                                            required={field.required}
                                            value={formData[field.name] || ''}
                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                            suppressHydrationWarning
                                        />
                                    )}
                                </div>
                            ))}

                            <button
                                type="submit"
                                className="btn-primary btn-lg btn w-full mt-4"
                                style={{ backgroundColor: theme?.colors?.cta_button, color: theme?.colors?.cta_button_text }}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : data.submit_action === 'whatsapp' ? (
                                    <>
                                        <MessageSquare className="w-5 h-5" />
                                        Agendar por WhatsApp
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Enviar mensagem
                                    </>
                                )}
                            </button>

                            <p className="text-center text-[10px] text-[#94A3B8] mt-4 uppercase tracking-widest font-bold">
                                🔒 Seus dados estão seguros conosco
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
