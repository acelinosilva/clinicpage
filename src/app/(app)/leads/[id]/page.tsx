'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
    Users, Search, Download, Filter,
    MessageSquare, Mail, Phone, Calendar,
    MoreVertical, CheckCircle2, Clock, XCircle, Loader2, ArrowLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase-client'
import Link from 'next/link'

interface Lead {
    id: string
    name: string
    email: string
    phone: string
    status: string
    created_at: string
    data: any
    landing_page_id: string
}

const STATUS_CONFIG = {
    new: { label: 'Novo', className: 'badge-blue', icon: Clock },
    contacted: { label: 'Em contato', className: 'badge-yellow', icon: MessageSquare },
    converted: { label: 'Convertido', className: 'badge-green', icon: CheckCircle2 },
    lost: { label: 'Perdido', className: 'badge-red', icon: XCircle },
}

export default function LeadsPage() {
    const { id: lpId } = useParams()
    const router = useRouter()
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        async function loadLeads() {
            if (!lpId) return
            setLoading(true)
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) {
                    router.push('/login')
                    return
                }

                // 1. Verificar se a LP pertence ao usuário
                const { data: lp, error: lpError } = await supabase
                    .from('landing_pages')
                    .select('id, title')
                    .eq('id', lpId)
                    .eq('user_id', user.id)
                    .single()

                if (lpError || !lp) {
                    throw new Error('Landing page não encontrada ou sem permissão')
                }

                // 2. Buscar leads da LP
                const { data: leadsData, error: leadsError } = await supabase
                    .from('leads')
                    .select('*')
                    .eq('landing_page_id', lpId)
                    .order('created_at', { ascending: false })

                if (leadsError) throw leadsError
                setLeads(leadsData || [])
            } catch (err: any) {
                console.error('Error loading leads:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadLeads()
    }, [lpId, router])

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#0D7C66] animate-spin mb-4" />
                <p className="text-[#64748B] font-medium">Carregando seus leads...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-2">Erro ao carregar leads</h2>
                <p className="text-[#64748B] mb-6">{error}</p>
                <Link href="/dashboard" className="btn btn-primary">Voltar ao Painel</Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <Link href="/dashboard" className="flex items-center gap-2 text-[#64748B] hover:text-[#0D7C66] text-xs font-bold uppercase tracking-wider mb-2 transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Voltar ao Dashboard
                    </Link>
                    <h1 className="text-2xl font-black text-[#0F172A]">Leads & Contatos</h1>
                    <p className="text-[#475569] text-sm mt-1">Gerencie os potenciais pacientes que entraram em contato</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        disabled={leads.length === 0}
                        className="btn btn-ghost btn-sm bg-white border border-[#E2E8F0] disabled:opacity-50"
                    >
                        <Download className="w-4 h-4" />
                        Exportar CSV
                    </button>
                </div>
            </div>

            {/* Leads Table */}
            <div className="card p-0 overflow-hidden min-h-[400px]">
                {leads.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
                        <div className="w-16 h-16 bg-[#F1F5F9] rounded-2xl flex items-center justify-center mb-4">
                            <Users className="w-8 h-8 text-[#94A3B8]" />
                        </div>
                        <h3 className="font-bold text-[#0F172A] mb-1">Nenhum lead ainda</h3>
                        <p className="text-sm text-[#64748B] max-w-xs">Assim que alguém entrar em contato através da sua landing page, ele aparecerá aqui.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                <tr>
                                    <th className="text-left px-6 py-4 font-semibold text-[#475569]">Nome do Paciente</th>
                                    <th className="text-left px-4 py-4 font-semibold text-[#475569]">Status</th>
                                    <th className="text-left px-4 py-4 font-semibold text-[#475569]">Contato</th>
                                    <th className="text-right px-4 py-4 font-semibold text-[#475569]">Data</th>
                                    <th className="text-right px-6 py-4 font-semibold text-[#475569]">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => {
                                    const status = STATUS_CONFIG[lead.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.new
                                    const StatusIcon = status.icon
                                    return (
                                        <tr key={lead.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-[#0F172A]">{lead.name}</div>
                                                <div className="text-[10px] text-[#94A3B8]">{lead.email}</div>
                                            </td>
                                            <td className="px-4 py-5">
                                                <span className={cn("badge", status.className)}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-5 font-medium text-[#475569]">
                                                <div className="flex items-center gap-2">
                                                    {lead.phone && (
                                                        <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors">
                                                            <MessageSquare className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                    {lead.email && (
                                                        <a href={`mailto:${lead.email}`} className="p-1.5 rounded-lg bg-[#0D7C66]/10 text-[#0D7C66] hover:bg-[#0D7C66] hover:text-white transition-colors">
                                                            <Mail className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-5 text-right text-[#94A3B8] font-mono whitespace-nowrap">
                                                {new Date(lead.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="p-2 hover:bg-[#E2E8F0] rounded-lg">
                                                    <MoreVertical className="w-4 h-4 text-[#94A3B8]" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
