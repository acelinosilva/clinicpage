'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, LayoutDashboard, TrendingUp, Users, Eye, ArrowRight, Globe, FileText, Pause, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { cn } from '@/lib/utils'

const STATUS_CONFIG = {
    published: { label: 'Publicado', className: 'badge-green', icon: Globe },
    draft: { label: 'Rascunho', className: 'badge-gray', icon: FileText },
    paused: { label: 'Pausado', className: 'badge-yellow', icon: Pause },
    archived: { label: 'Arquivado', className: 'badge-red', icon: FileText },
}

export default function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [lps, setLps] = useState<any[]>([])
    const [user, setUser] = useState<any>(null)
    const [stats, setStats] = useState({
        visits: 0,
        leads: 0,
        conversion: 0,
        publishedCount: 0
    })

    const supabase = createClient()

    useEffect(() => {
        async function loadDashboardData() {
            setLoading(true)
            try {
                const { data: { user: authUser } } = await supabase.auth.getUser()
                if (!authUser) return

                // 1. Ensure profile exists
                const { data: profile } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', authUser.id)
                    .single()

                if (!profile) {
                    await supabase.from('users').insert({
                        id: authUser.id,
                        email: authUser.email,
                        name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
                        plan: 'free'
                    })
                }

                setUser(authUser)

                // 2. Fetch LPs
                const { data: pages } = await supabase
                    .from('landing_pages')
                    .select('*')
                    .order('updated_at', { ascending: false })

                if (pages) {
                    setLps(pages)

                    // Simple stats calculation
                    const published = pages.filter(p => p.status === 'published').length
                    setStats(prev => ({
                        ...prev,
                        publishedCount: published
                    }))
                }

            } catch (error) {
                console.error('Dashboard error:', error)
            } finally {
                setLoading(false)
            }
        }

        loadDashboardData()
    }, [])

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#0D7C66] animate-spin" />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-[#0F172A]">Painel</h1>
                    <p className="text-[#475569] text-sm mt-1">Gerencie suas landing pages e acompanhe resultados</p>
                </div>
                <Link href="/criar" className="btn-primary btn">
                    <Plus className="w-4 h-4" />
                    Nova landing page
                </Link>
            </div>

            {/* Onboarding bar */}
            {lps.length === 0 && (
                <div className="card bg-gradient-to-r from-[#0D7C66] to-[#13C4A1] text-white mb-8 border-0 shadow-lg shadow-[#0D7C66]/20">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold mb-1">Bem-vindo ao ClinicPage! 👋</h3>
                            <p className="text-white/80 text-sm">Crie sua primeira landing page em menos de 8 minutos.</p>
                        </div>
                        <Link href="/criar" className="shrink-0 inline-flex items-center gap-2 bg-white text-[#0D7C66] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-colors">
                            Começar
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Visitas totais', value: stats.visits.toLocaleString('pt-BR'), icon: Eye, delta: null },
                    { label: 'Leads recebidos', value: stats.leads.toLocaleString('pt-BR'), icon: Users, delta: null },
                    { label: 'Taxa de conversão', value: `${stats.conversion}%`, icon: TrendingUp, delta: null },
                    { label: 'LPs criadas', value: lps.length.toString(), icon: LayoutDashboard, delta: null },
                ].map((stat) => (
                    <div key={stat.label} className="card">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-8 h-8 bg-[#0D7C66]/10 rounded-lg flex items-center justify-center">
                                <stat.icon className="w-4 h-4 text-[#0D7C66]" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-[#0F172A]">{stat.value}</div>
                        <div className="text-xs text-[#94A3B8] mt-0.5">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Landing pages list */}
            <div>
                <h2 className="text-lg font-bold text-[#0F172A] mb-4">Suas landing pages</h2>

                {lps.length === 0 ? (
                    <div className="card text-center py-16 border-dashed border-2">
                        <LayoutDashboard className="w-12 h-12 text-[#CBD5E1] mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Nenhuma landing page ainda</h3>
                        <p className="text-[#475569] text-sm mb-6">Sua lista de páginas está vazia. Vamos criar a primeira?</p>
                        <Link href="/criar" className="btn-primary btn">
                            <Plus className="w-4 h-4" />
                            Criar minha primeira página
                        </Link>
                    </div>
                ) : (
                    <div className="card p-0 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                    <tr>
                                        <th className="text-left px-6 py-3 font-semibold text-[#475569]">Página</th>
                                        <th className="text-left px-4 py-3 font-semibold text-[#475569]">Status</th>
                                        <th className="text-right px-4 py-3 font-semibold text-[#475569]">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lps.map((page) => {
                                        const status = STATUS_CONFIG[page.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.draft
                                        const StatusIcon = status.icon
                                        return (
                                            <tr key={page.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="font-semibold text-[#0F172A]">{page.title}</div>
                                                        <div className="text-xs text-[#94A3B8]">/{page.slug}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={cn("badge", status.className)}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {status.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/editor/${page.id}`} className="btn-ghost btn-sm btn">
                                                            Editar
                                                        </Link>
                                                        <Link href={`/lp/${page.slug}`} target="_blank" className="btn-ghost btn-sm btn">
                                                            Ver Site
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
