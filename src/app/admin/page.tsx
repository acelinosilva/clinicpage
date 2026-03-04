import { TrendingUp, Users, Globe, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
    title: 'Admin Dashboard | ClinicPage',
}

export default function AdminDashboardPage() {
    // These would be real counts from Supabase in a real implementation
    const stats = [
        { label: 'Total de Usuários', value: '142', icon: Users, delta: '+12%', trend: 'up' },
        { label: 'Landing Pages', value: '389', icon: Globe, delta: '+24%', trend: 'up' },
        { label: 'Assinaturas Ativas', value: '64', icon: Activity, delta: '+5%', trend: 'up' },
        { label: 'Receita Mensal', value: 'R$ 8.420', icon: DollarSign, delta: '-2%', trend: 'down' },
    ]

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-black text-[#0F172A]">Geral</h1>
                <p className="text-[#475569] text-sm mt-1">Visão holística da plataforma ClinicPage</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 bg-[#0D7C66]/10 rounded-xl flex items-center justify-center">
                                <stat.icon className="w-5 h-5 text-[#0D7C66]" />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                                stat.trend === 'up' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            )}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.delta}
                            </div>
                        </div>
                        <div className="text-3xl font-black text-[#0F172A]">{stat.value}</div>
                        <div className="text-sm font-medium text-[#64748B] mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities/Notifications */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
                        <h2 className="font-bold text-[#0F172A]">Atividades Recentes</h2>
                        <button className="text-xs font-bold text-[#0D7C66] hover:underline">Ver tudo</button>
                    </div>
                    <div className="divide-y divide-[#E2E8F0]">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-[#F8FAFC] transition-colors cursor-default">
                                <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0">
                                    <Globe className="w-5 h-5 text-[#64748B]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#0F172A] truncate">
                                        Nova Landing Page criada por <span className="text-[#0D7C66]">clínica.exemplo@email.com</span>
                                    </p>
                                    <p className="text-xs text-[#94A3B8]">Há {i * 10} minutos</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#CBD5E1]" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Health/System Stats */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
                    <h2 className="font-bold text-[#0F172A] mb-6">Status do Sistema</h2>
                    <div className="space-y-6">
                        {[
                            { label: 'Uso de API (IA)', value: 45 },
                            { label: 'Storage Utilizado', value: 28 },
                            { label: 'Carga do Banco', value: 12 },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex items-center justify-between text-xs mb-2">
                                    <span className="font-bold text-[#475569]">{item.label}</span>
                                    <span className="text-[#94A3B8]">{item.value}%</span>
                                </div>
                                <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#0D7C66] rounded-full"
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                        <p className="text-xs font-bold text-[#475569] mb-2 uppercase tracking-widest">Suporte</p>
                        <p className="text-sm text-[#64748B]">Todos os sistemas operacionais.</p>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold text-green-600">Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
