'use client'

import { CreditCard, Check, Sparkles, Calendar, Receipt } from 'lucide-react'

const PLANS = [
    {
        name: 'Essential',
        price: 'R$ 97',
        period: '/mês',
        description: 'Ideal para profissionais liberais começando.',
        features: ['1 Landing Page', 'Geração por IA Standard', 'Leads ilimitados', 'Suporte via Chat'],
        current: false
    },
    {
        name: 'Professional',
        price: 'R$ 197',
        period: '/mês',
        description: 'Perfeito para clínicas em crescimento.',
        features: ['5 Landing Pages', 'Geração por IA Advanced', 'Leads ilimitados', 'Domínio Personalizado', 'Certificado SSL Automático', 'Suporte Prioritário'],
        current: true
    }
]

export default function BillingPage() {
    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            {/* Current Plan Summary */}
            <div className="card border-[#0D7C66] bg-[#0D7C66]/5 overflow-hidden relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-[#0D7C66]" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D7C66]">Seu Plano Atual</span>
                        </div>
                        <h3 className="text-2xl font-black text-[#0F172A]">Professional Plan</h3>
                        <p className="text-sm text-[#475569] mt-1">Sua próxima cobrança será em **14 de Abril, 2024**</p>
                    </div>
                    <button className="btn btn-secondary btn-sm h-11 px-6">
                        Gerenciar Assinatura
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D7C66] opacity-5 blur-3xl -mr-16 -mt-16" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {PLANS.map((plan) => (
                    <div
                        key={plan.name}
                        className={`card flex flex-col ${plan.current ? 'ring-2 ring-[#0D7C66] ring-offset-2' : ''}`}
                    >
                        <div className="mb-6">
                            <h4 className="font-bold text-[#0F172A] text-lg">{plan.name}</h4>
                            <p className="text-xs text-[#64748B] mt-1">{plan.description}</p>
                        </div>

                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-3xl font-black text-[#0F172A]">{plan.price}</span>
                            <span className="text-sm text-[#94A3B8] font-medium">{plan.period}</span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-xs text-[#475569]">
                                    <div className="w-4 h-4 rounded-full bg-[#0D7C66]/10 flex items-center justify-center text-[#0D7C66]">
                                        <Check className="w-2.5 h-2.5" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            disabled={plan.current}
                            className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${plan.current
                                ? "bg-[#F1F5F9] text-[#94A3B8] cursor-default"
                                : "bg-[#0F172A] text-white hover:bg-[#1E293B]"
                                }`}
                        >
                            {plan.current ? 'Plano Atual' : 'Fazer Upgrade'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Billing History */}
            <div className="card">
                <header className="flex items-center justify-between mb-6">
                    <div>
                        <h4 className="font-bold text-[#0F172A]">Histórico de Faturas</h4>
                        <p className="text-xs text-[#94A3B8]">Visualize e baixe seus comprovantes.</p>
                    </div>
                    <Receipt className="w-5 h-5 text-[#CBD5E1]" />
                </header>

                <div className="space-y-2">
                    {[
                        { date: '14 Mar, 2024', amount: 'R$ 197,00', status: 'pago' },
                        { date: '14 Fev, 2024', amount: 'R$ 197,00', status: 'pago' },
                    ].map((invoice, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F8FAFC] transition-all border border-transparent hover:border-[#E2E8F0] group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-[#64748B]" />
                                </div>
                                <span className="text-sm font-medium text-[#475569]">{invoice.date}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-[#0F172A]">{invoice.amount}</span>
                                <button className="text-[10px] font-black uppercase tracking-widest text-[#0D7C66] opacity-0 group-hover:opacity-100 transition-opacity">PDF</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
