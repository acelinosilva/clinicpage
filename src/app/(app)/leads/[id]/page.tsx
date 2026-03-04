'use client'

import { useParams } from 'next/navigation'
import {
    Users, Search, Download, Filter,
    MessageSquare, Mail, Phone, Calendar,
    MoreVertical, CheckCircle2, Clock, XCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

const MOCK_LEADS = [
    { id: '1', name: 'João Silva', email: 'joao.silva@email.com', phone: '(11) 98877-6655', date: 'Hoje, 10:45', status: 'new', service: 'Implante Dentário' },
    { id: '2', name: 'Maria Souza', email: 'maria.s@gmail.com', phone: '(11) 91234-5678', date: 'Hoje, 08:30', status: 'contacted', service: 'Harmonização' },
    { id: '3', name: 'Ricardo Pereira', email: 'ricardo@pereira.adv.br', phone: '(21) 97766-5544', date: 'Ontem, 16:20', status: 'converted', service: 'Limpeza' },
    { id: '4', name: 'Ana Costa', email: 'ana.costa22@bol.com.br', phone: '(31) 99988-7766', date: 'Ontem, 09:15', status: 'lost', service: 'Clareamento' },
    { id: '5', name: 'Paulo Santos', email: 'paulo.santos@outlook.com', phone: '(11) 95544-3322', date: '02 Mar, 14:10', status: 'new', service: 'Ortodontia' },
]

const STATUS_CONFIG = {
    new: { label: 'Novo', className: 'badge-blue', icon: Clock },
    contacted: { label: 'Em contato', className: 'badge-yellow', icon: MessageSquare },
    converted: { label: 'Convertido', className: 'badge-green', icon: CheckCircle2 },
    lost: { label: 'Perdido', className: 'badge-red', icon: XCircle },
}

export default function LeadsPage() {
    const { id } = useParams()

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-[#0F172A]">Leads & Contatos</h1>
                    <p className="text-[#475569] text-sm mt-1">Gerencie os potenciais pacientes que entraram em contato</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="btn btn-ghost btn-sm bg-white border border-[#E2E8F0]">
                        <Download className="w-4 h-4" />
                        Exportar CSV
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="card mb-6 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <input
                            type="text"
                            placeholder="Buscar por nome, email ou telefone..."
                            className="input pl-10 h-10 text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="btn btn-ghost btn-sm text-[#475569] border border-[#E2E8F0] bg-white h-10 px-4">
                            <Filter className="w-3.5 h-3.5" />
                            Filtrar
                        </button>
                        <select className="input h-10 text-sm py-0 w-40">
                            <option value="">Todos os Status</option>
                            <option value="new">Novos</option>
                            <option value="contacted">Em contato</option>
                            <option value="converted">Convertidos</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Leads Table */}
            <div className="card p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-[#475569]">Nome do Paciente</th>
                                <th className="text-left px-4 py-4 font-semibold text-[#475569]">Status</th>
                                <th className="text-left px-4 py-4 font-semibold text-[#475569]">Interesse</th>
                                <th className="text-left px-4 py-4 font-semibold text-[#475569]">Contato</th>
                                <th className="text-right px-4 py-4 font-semibold text-[#475569]">Data</th>
                                <th className="text-right px-6 py-4 font-semibold text-[#475569]">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_LEADS.map((lead) => {
                                const status = STATUS_CONFIG[lead.status as keyof typeof STATUS_CONFIG]
                                const StatusIcon = status.icon
                                return (
                                    <tr key={lead.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-[#0F172A]">{lead.name}</div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <span className={cn("badge", status.className)}>
                                                <StatusIcon className="w-3 h-3" />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5 font-medium text-[#475569]">{lead.service}</td>
                                        <td className="px-4 py-5">
                                            <div className="flex items-center gap-3">
                                                <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors">
                                                    <MessageSquare className="w-4 h-4" />
                                                </a>
                                                <a href={`mailto:${lead.email}`} className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0D7C66]/10 text-[#0D7C66] hover:bg-[#0D7C66] hover:text-white transition-colors">
                                                    <Mail className="w-4 h-4" />
                                                </a>
                                                <a href={`tel:${lead.phone.replace(/\D/g, '')}`} className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#64748B]/10 text-[#64748B] hover:bg-[#64748B] hover:text-white transition-colors">
                                                    <Phone className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-right text-[#94A3B8] font-mono whitespace-nowrap">{lead.date}</td>
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

                {/* Pagination Placeholder */}
                <div className="bg-[#F8FAFC] px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8]">Exibindo 1 a 5 de 42 leads</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded border bg-white opacity-50 cursor-not-allowed">Anterior</button>
                        <button className="px-3 py-1 rounded border bg-white hover:bg-[#0D7C66]/5 hover:border-[#0D7C66] transition-all">Próxima</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
