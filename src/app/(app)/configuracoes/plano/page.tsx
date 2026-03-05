'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Check, Sparkles, Calendar, Receipt, Loader2 } from 'lucide-react'
import { PLANS, Plan, formatPrice } from '@/lib/plans'
import { createClient } from '@/lib/supabase-client'

export default function BillingPage() {
    const [currentPlan, setCurrentPlan] = useState<Plan>('free')
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function loadPlan() {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return

                const { data: profile } = await supabase
                    .from('users')
                    .select('plan')
                    .eq('id', user.id)
                    .single()

                if (profile?.plan) {
                    setCurrentPlan(profile.plan as Plan)
                }
            } catch (error) {
                console.error('Error loading plan:', error)
            } finally {
                setLoading(false)
            }
        }
        loadPlan()
    }, [])

    if (loading) {
        return (
            <div className="h-[40vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#0D7C66] animate-spin" />
            </div>
        )
    }

    const displayedPlans = [PLANS.pro, PLANS.clinic]

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
                        <h3 className="text-2xl font-black text-[#0F172A]">{PLANS[currentPlan].name}</h3>
                        <p className="text-sm text-[#475569] mt-1">Status: **Ativo**</p>
                    </div>
                    <button className="btn btn-secondary btn-sm h-11 px-6">
                        Gerenciar Assinatura
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D7C66] opacity-5 blur-3xl -mr-16 -mt-16" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {displayedPlans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`card flex flex-col ${currentPlan === plan.id ? 'ring-2 ring-[#0D7C66] ring-offset-2' : ''}`}
                    >
                        <div className="mb-6">
                            <h4 className="font-bold text-[#0F172A] text-lg">{plan.name}</h4>
                            <p className="text-xs text-[#64748B] mt-1">
                                {plan.id === 'pro'
                                    ? 'Perfeito para profissionais liberais e clínicas em início.'
                                    : 'A solução completa para clínicas de alto volume.'
                                }
                            </p>
                        </div>

                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-3xl font-black text-[#0F172A]">{formatPrice(plan.price_brl_monthly)}</span>
                            <span className="text-sm text-[#94A3B8] font-medium">/mês</span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-xs text-[#475569]">
                                <div className="w-4 h-4 rounded-full bg-[#0D7C66]/10 flex items-center justify-center text-[#0D7C66]">
                                    <Check className="w-2.5 h-2.5" />
                                </div>
                                {plan.limits.landing_pages_active === -1 ? 'Landing Pages Ilimitadas' : `${plan.limits.landing_pages_active} Landing Pages`}
                            </li>
                            <li className="flex items-center gap-2 text-xs text-[#475569]">
                                <div className="w-4 h-4 rounded-full bg-[#0D7C66]/10 flex items-center justify-center text-[#0D7C66]">
                                    <Check className="w-2.5 h-2.5" />
                                </div>
                                {plan.limits.ai_credits_per_month === -1 ? 'Geração por IA Ilimitada' : `${plan.limits.ai_credits_per_month} Créditos de IA`}
                            </li>
                            {plan.limits.custom_domain && (
                                <li className="flex items-center gap-2 text-xs text-[#475569]">
                                    <div className="w-4 h-4 rounded-full bg-[#0D7C66]/10 flex items-center justify-center text-[#0D7C66]">
                                        <Check className="w-2.5 h-2.5" />
                                    </div>
                                    Domínio Personalizado
                                </li>
                            )}
                            <li className="flex items-center gap-2 text-xs text-[#475569]">
                                <div className="w-4 h-4 rounded-full bg-[#0D7C66]/10 flex items-center justify-center text-[#0D7C66]">
                                    <Check className="w-2.5 h-2.5" />
                                </div>
                                Suporte Prioritário
                            </li>
                        </ul>

                        <button
                            disabled={currentPlan === plan.id}
                            className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${currentPlan === plan.id
                                ? "bg-[#F1F5F9] text-[#94A3B8] cursor-default"
                                : "bg-[#0F172A] text-white hover:bg-[#1E293B]"
                                }`}
                        >
                            {currentPlan === plan.id ? 'Plano Atual' : 'Fazer Upgrade'}
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
                    <p className="text-xs text-[#64748B] italic">Nenhuma fatura encontrada ainda.</p>
                </div>
            </div>
        </div>
    )
}
