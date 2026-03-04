'use client'

import { PLANS, Plan } from '@/lib/plans'
import { Check, Rocket, Zap, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PlansPage() {
    const currentPlan: Plan = 'free' // This would come from user data

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-black text-[#0F172A] mb-3">Escolha o plano ideal</h1>
                <p className="text-[#475569] max-w-lg mx-auto">Potencialize sua clínica com ferramentas avançadas de marketing e IA.</p>

                <div className="mt-6 inline-flex p-1 bg-[#F1F5F9] rounded-xl border">
                    <button className="px-6 py-2 text-xs font-bold text-[#0D7C66] bg-white rounded-lg shadow-sm">Assinatura Mensal</button>
                    <button className="px-6 py-2 text-xs font-bold text-[#94A3B8]">Assinatura Anual <span className="text-[#0D7C66]">-20%</span></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Free Plan */}
                <div className={cn("card relative", currentPlan === 'free' && "border-[#0D7C66] ring-1 ring-[#0D7C66]")}>
                    {currentPlan === 'free' && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-green font-bold">Plano Atual</span>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-[#94A3B8]" />
                        <h3 className="font-bold text-[#475569]">Gratuito</h3>
                    </div>
                    <div className="text-4xl font-black text-[#0F172A] mb-6">R$ 0<span className="text-sm font-normal text-[#94A3B8]">/mês</span></div>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            1 landing page ativa
                        </li>
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            3 créditos de IA p/ mês
                        </li>
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            Templates básicos
                        </li>
                    </ul>

                    <button className="btn btn-ghost w-full border border-[#E2E8F0]" disabled>
                        Plano Selecionado
                    </button>
                </div>

                {/* Pro Plan */}
                <div className={cn("card relative scale-105 border-[#0D7C66] shadow-2xl overflow-hidden")}>
                    <div className="absolute top-0 right-0 px-8 py-1 bg-[#0D7C66] text-white text-[10px] font-black uppercase tracking-widest rotate-45 translate-x-8 translate-y-4">Popular</div>

                    <div className="flex items-center gap-2 mb-4">
                        <Rocket className="w-5 h-5 text-[#0D7C66]" />
                        <h3 className="font-bold text-[#0D7C66]">Profissional</h3>
                    </div>
                    <div className="text-4xl font-black text-[#0F172A] mb-6">R$ 97<span className="text-sm font-normal text-[#94A3B8]">/mês</span></div>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            <strong>5 landing pages</strong> ativas
                        </li>
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            <strong>50 créditos</strong> de IA p/ mês
                        </li>
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            Remover selo ClinicPage
                        </li>
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            Domínio personalizado
                        </li>
                    </ul>

                    <button className="btn btn-primary w-full">
                        Upgrade para Pro
                    </button>
                </div>

                {/* Clinic Plan */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-4">
                        <Crown className="w-5 h-5 text-[#F97316]" />
                        <h3 className="font-bold text-[#475569]">Clínica Plus</h3>
                    </div>
                    <div className="text-4xl font-black text-[#0F172A] mb-6">R$ 197<span className="text-sm font-normal text-[#94A3B8]">/mês</span></div>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            Landing pages <strong>ilimitadas</strong>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            Créditos de IA <strong>ilimitados</strong>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            Suporte prioritário
                        </li>
                        <li className="flex items-center gap-3 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#0D7C66] shrink-0" />
                            Funcionalidades Beta
                        </li>
                    </ul>

                    <button className="btn btn-ghost w-full border border-[#E2E8F0] hover:bg-[#F1F5F9]">
                        Falar com consultor
                    </button>
                </div>
            </div>
        </div>
    )
}
