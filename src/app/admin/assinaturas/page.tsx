import { Search, CreditCard, CheckCircle2, AlertCircle, Clock, ArrowUpRight } from 'lucide-react'
import { createServiceClient } from '@/lib/supabase-server'

export const metadata = {
    title: 'Assinaturas | Admin ClinicPage',
}

export default async function AdminSubscriptionsPage() {
    const supabase = createServiceClient()

    // Fetch users with plans other than 'free' or that have stripe info
    const { data: subscriptions } = await supabase
        .from('users')
        .select('id, email, name, plan, stripe_subscription_id, created_at')
        .neq('plan', 'free')

    const stats = [
        { label: 'MRR (Previsto)', value: 'R$ 12.400', icon: CreditCard, color: 'text-blue-600' },
        { label: 'Novos Assinantes', value: '+8', icon: CheckCircle2, color: 'text-green-600' },
        { label: 'Churn Rate', value: '2.4%', icon: AlertCircle, color: 'text-red-600' },
    ]

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-[#0F172A]">Assinaturas</h1>
                    <p className="text-[#475569] text-sm mt-1">Monitore e gerencie os planos pagos dos clientes</p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-xl bg-opacity-10 flex items-center justify-center", stat.color.replace('text', 'bg'))}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#64748B] uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-[#0F172A]">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <h2 className="font-bold text-[#0F172A]">Assinantes Ativos</h2>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                        <tr>
                            <th className="text-left px-6 py-4 font-bold text-[#475569]">Cliente</th>
                            <th className="text-left px-4 py-4 font-bold text-[#475569]">Plano</th>
                            <th className="text-left px-4 py-4 font-bold text-[#475569]">ID Assinatura</th>
                            <th className="text-left px-4 py-4 font-bold text-[#475569]">Desde</th>
                            <th className="text-right px-6 py-4 font-bold text-[#475569]">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                        {subscriptions?.map((sub) => (
                            <tr key={sub.id} className="hover:bg-[#F8FAFC] transition-colors">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-bold text-[#0F172A]">{sub.name || 'Sem nome'}</div>
                                        <div className="text-xs text-[#94A3B8]">{sub.email}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                        sub.plan === 'clinic' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                    )}>
                                        {sub.plan}
                                    </span>
                                </td>
                                <td className="px-4 py-4 font-mono text-xs text-[#64748B]">
                                    {sub.stripe_subscription_id || 'manual_sub_id'}
                                </td>
                                <td className="px-4 py-4 text-[#475569]">
                                    {new Date(sub.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[#0D7C66] hover:underline font-bold text-xs flex items-center justify-end gap-1 ml-auto">
                                        Gerenciar <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {(!subscriptions || subscriptions.length === 0) && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-[#94A3B8]">
                                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>Nenhum assinante pago encontrado no momento.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

import { cn } from '@/lib/utils'
