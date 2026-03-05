'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle, XCircle, ArrowRight, Zap } from 'lucide-react'
import { PLANS, formatPrice, Plan } from '@/lib/plans'

const FEATURE_ROWS = [
    { label: 'Landing pages ativas', key: 'landing_pages_active', type: 'number' },
    { label: 'Créditos de IA / mês', key: 'ai_credits_per_month', type: 'number' },
    { label: 'Templates disponíveis', key: 'templates_available', type: 'number' },
    { label: 'WhatsApp flutuante', key: 'whatsapp_button', type: 'boolean' },
    { label: 'Domínio próprio', key: 'custom_domain', type: 'boolean' },
    { label: 'A/B Testing', key: 'ab_testing', type: 'boolean' },
    { label: 'Histórico de versões', key: 'version_history', type: 'boolean' },
    { label: 'Meta Pixel', key: 'meta_pixel', type: 'boolean' },
    { label: 'Google Analytics 4', key: 'google_analytics', type: 'boolean' },
    { label: 'Pop-up de conversão', key: 'popup_conversion', type: 'boolean' },
    { label: 'Barra CTA fixa', key: 'floating_bar', type: 'boolean' },
    { label: 'Exportar leads CSV', key: 'lead_export', type: 'boolean' },
    { label: 'Zapier / Make', key: 'zapier_webhook', type: 'boolean' },
    { label: 'Heatmaps', key: 'heatmaps', type: 'boolean' },
    { label: 'Remover marca ClinicPage', key: 'remove_branding', type: 'boolean' },
] as const

const PLAN_ORDER: Plan[] = ['free', 'pro', 'clinic']

function formatLimitValue(value: number | boolean | undefined, type: 'number' | 'boolean'): React.ReactNode {
    if (type === 'boolean') {
        if (value === true) return <CheckCircle className="w-5 h-5 text-[#0D7C66] mx-auto" />
        return <XCircle className="w-5 h-5 text-[#CBD5E1] mx-auto" />
    }
    if (typeof value === 'number') {
        if (value === -1) return <span className="text-[#0D7C66] font-bold">Ilimitado</span>
        if (value === 0) return <XCircle className="w-5 h-5 text-[#CBD5E1] mx-auto" />
        return <span className="font-semibold">{value}</span>
    }
    return <XCircle className="w-5 h-5 text-[#CBD5E1] mx-auto" />
}

export default function PrecosPage() {
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

    return (
        <div className="bg-white">
            {/* Header */}
            <section className="section bg-gradient-to-b from-[#f0fdf4] to-white text-center">
                <div className="container-narrow">
                    <span className="badge badge-green mb-4">Preços transparentes</span>
                    <h1 className="text-5xl font-black text-[#0F172A] mb-4">
                        Planos para toda clínica
                    </h1>
                    <p className="text-[#475569] text-xl mb-10">
                        Comece grátis, escale quando quiser. Sem taxas escondidas.
                    </p>

                    {/* Billing toggle */}
                    <div className="inline-flex items-center bg-[#F1F5F9] rounded-full p-1 mb-12">
                        <button
                            onClick={() => setBilling('monthly')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${billing === 'monthly'
                                ? 'bg-white text-[#0F172A] shadow-sm'
                                : 'text-[#64748B]'
                                }`}
                        >
                            Mensal
                        </button>
                        <button
                            onClick={() => setBilling('yearly')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${billing === 'yearly'
                                ? 'bg-white text-[#0F172A] shadow-sm'
                                : 'text-[#64748B]'
                                }`}
                        >
                            Anual
                            <span className="badge badge-green text-xs">-25%</span>
                        </button>
                    </div>

                    {/* Plan cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        {PLAN_ORDER.map((planId) => {
                            const plan = PLANS[planId]
                            const price =
                                billing === 'monthly' ? plan.price_brl_monthly : plan.price_brl_yearly
                            const isPopular = planId === 'pro'

                            return (
                                <div
                                    key={planId}
                                    className={`card relative ${isPopular
                                        ? 'border-2 border-[#0D7C66] shadow-lg shadow-[#0D7C66]/10'
                                        : ''
                                        }`}
                                >
                                    {isPopular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="badge badge-green px-4 py-1 text-xs font-bold shadow-sm">
                                                <Zap className="w-3 h-3" /> Mais popular
                                            </span>
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                                        <div className="flex items-end gap-1">
                                            <span className="text-4xl font-black text-[#0F172A]">
                                                {price === 0 ? 'Grátis' : formatPrice(price)}
                                            </span>
                                            {price > 0 && (
                                                <span className="text-[#94A3B8] text-sm mb-1">
                                                    /{billing === 'monthly' ? 'mês' : 'ano'}
                                                </span>
                                            )}
                                        </div>
                                        {billing === 'yearly' && price > 0 && (
                                            <p className="text-xs text-[#0D7C66] mt-1">
                                                {formatPrice(Math.round(price / 12))}/mês cobrado anualmente
                                            </p>
                                        )}
                                    </div>

                                    <Link
                                        href="/cadastro"
                                        className={`btn w-full justify-center mb-6 shadow-sm ${isPopular ? 'btn-primary' : planId === 'clinic' ? 'btn-primary' : 'btn-secondary'
                                            }`}
                                    >
                                        {planId === 'free' ? 'Criar conta grátis' : 'Assinar agora'}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>

                                    <ul className="space-y-3">
                                        {[
                                            `${plan.limits.landing_pages_active === -1 ? 'Ilimitadas' : plan.limits.landing_pages_active} landing page${plan.limits.landing_pages_active !== 1 ? 's' : ''}`,
                                            `${plan.limits.ai_credits_per_month === -1 ? 'Créditos ilimitados de IA' : `${plan.limits.ai_credits_per_month} créditos de IA/mês`}`,
                                            plan.limits.custom_domain ? 'Domínio próprio' : null,
                                            plan.limits.ab_testing ? 'A/B Testing' : null,
                                            plan.limits.remove_branding ? 'Sem marca ClinicPage' : null,
                                            `Suporte ${plan.support === 'email' ? 'por e-mail' : plan.support === 'priority_email' ? 'prioritário' : 'dedicado'}`,
                                        ]
                                            .filter(Boolean)
                                            .map((item) => (
                                                <li key={item} className="flex items-center gap-2 text-sm text-[#374151]">
                                                    <CheckCircle className="w-4 h-4 text-[#0D7C66] shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Feature comparison table */}
            <section className="section-sm bg-[#F8FAFC]">
                <div className="container-wide">
                    <h2 className="text-3xl font-black text-center mb-10">Comparação completa de recursos</h2>
                    <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[#E2E8F0]">
                                    <th className="text-left px-6 py-4 font-semibold text-[#475569] w-1/2">Recurso</th>
                                    {PLAN_ORDER.map((planId) => (
                                        <th key={planId} className="px-6 py-4 font-bold text-center">
                                            {PLANS[planId].name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {FEATURE_ROWS.map((row, i) => (
                                    <tr
                                        key={row.key}
                                        className={`border-b border-[#E2E8F0] last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
                                    >
                                        <td className="px-6 py-3 text-[#374151]">{row.label}</td>
                                        {PLAN_ORDER.map((planId) => (
                                            <td key={planId} className="px-6 py-3 text-center">
                                                {formatLimitValue(
                                                    (PLANS[planId].limits as any)[row.key] as number | boolean,
                                                    row.type
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section bg-white">
                <div className="container-narrow">
                    <h2 className="text-3xl font-black text-center mb-10">Dúvidas frequentes</h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Posso cancelar a qualquer momento?',
                                a: 'Sim. Sem multa, sem burocracia. Você cancela com um clique nas configurações da sua conta.',
                            },
                            {
                                q: 'O que é um crédito de IA?',
                                a: 'Cada geração completa de uma landing page consome 1 crédito. Reger seções isoladas consome 0,5 créditos. Nos planos Pro e Clínica, os créditos são ilimitados.',
                            },
                            {
                                q: 'Minha landing page fica no ar se eu cancelar?',
                                a: 'Se você cancelar, suas páginas ficam em modo draft. Para mantê-las publicadas, é necessário um plano ativo.',
                            },
                            {
                                q: 'Aceita Pix?',
                                a: 'Sim! Aceitamos Pix, cartão de crédito e débito via Stripe. Para planos anuais, o Pix tem desconto adicional.',
                            },
                        ].map((faq) => (
                            <div key={faq.q} className="card">
                                <h4 className="font-bold mb-2">{faq.q}</h4>
                                <p className="text-[#475569] text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
