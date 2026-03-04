'use client'

import { useParams } from 'next/navigation'
import {
    Users, Eye, MousePointer2, TrendingUp, Calendar,
    ArrowUpRight, ArrowDownRight, Globe, Smartphone, Tablet, Monitor
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AnalyticsPage() {
    const { id } = useParams()

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-[#0F172A]">Analytics</h1>
                    <p className="text-[#475569] text-sm mt-1">Acompanhe o desempenho da sua landing page</p>
                </div>

                <div className="flex bg-white rounded-xl border p-1 border-[#E2E8F0] shadow-sm">
                    <button className="px-4 py-1.5 text-xs font-bold text-[#0D7C66] bg-[#0D7C66]/5 rounded-lg">Últimos 7 dias</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-[#94A3B8] hover:text-[#475569]">30 dias</button>
                </div>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Visitantes únicos', value: '1.240', icon: Users, delta: '+15.2%', positive: true },
                    { label: 'Total de visualizações', value: '3.150', icon: Eye, delta: '+12.5%', positive: true },
                    { label: 'Cliques no WhatsApp', value: '458', icon: MousePointer2, delta: '-2.4%', positive: false },
                    { label: 'Taxa de conversão', value: '36.9%', icon: TrendingUp, delta: '+4.1%', positive: true },
                ].map((stat, i) => (
                    <div key={i} className="card">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border flex items-center justify-center">
                                <stat.icon className="w-5 h-5 text-[#0D7C66]" />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                                stat.positive ? "text-[#166534] bg-[#DCFCE7]" : "text-[#991B1B] bg-[#FEF2F2]"
                            )}>
                                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.delta}
                            </div>
                        </div>
                        <div className="text-3xl font-black text-[#0F172A] mb-1">{stat.value}</div>
                        <p className="text-xs text-[#94A3B8]">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Chart Placeholder */}
                <div className="lg:col-span-2 card">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-[#0F172A]">Visualizações ao longo do tempo</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#0D7C66]" />
                                <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Visualizações</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 flex items-end gap-2 px-2">
                        {[40, 60, 45, 90, 65, 80, 50, 70, 85, 40, 55, 75, 95, 60].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full bg-[#0D7C66]/10 group-hover:bg-[#0D7C66]/30 rounded-t-lg transition-all"
                                    style={{ height: `${h}%` }}
                                />
                                <span className="text-[8px] text-[#CBD5E1] font-mono">{i + 1} Mar</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Devices */}
                <div className="card">
                    <h3 className="font-bold text-[#0F172A] mb-6">Dispositivos</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Mobile', icon: Smartphone, pc: 65, color: 'bg-[#0D7C66]' },
                            { label: 'Desktop', icon: Monitor, pc: 28, color: 'bg-[#13C4A1]' },
                            { label: 'Tablet', icon: Tablet, pc: 7, color: 'bg-[#F97316]' },
                        ].map((d) => (
                            <div key={d.label}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <d.icon className="w-4 h-4 text-[#94A3B8]" />
                                        <span className="text-sm font-bold text-[#475569]">{d.label}</span>
                                    </div>
                                    <span className="text-sm font-black text-[#0F172A]">{d.pc}%</span>
                                </div>
                                <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                                    <div className={cn("h-full rounded-full", d.color)} style={{ width: `${d.pc}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
