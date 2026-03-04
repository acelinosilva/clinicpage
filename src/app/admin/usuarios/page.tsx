import { Search, Filter, MoreHorizontal, UserCheck, Shield, Zap, CreditCard } from 'lucide-react'
import { createServiceClient } from '@/lib/supabase-server'

export const metadata = {
    title: 'Usuários | Admin ClinicPage',
}

export default async function AdminUsersPage() {
    const supabase = createServiceClient()
    const { data: users } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-[#0F172A]">Usuários</h1>
                    <p className="text-[#475569] text-sm mt-1">Gerencie os acessos e planos dos clientes</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <input
                            type="text"
                            placeholder="Buscar usuário..."
                            className="bg-white border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all w-64"
                        />
                    </div>
                    <button className="bg-white border border-[#E2E8F0] p-2 rounded-xl hover:bg-[#F8FAFC]">
                        <Filter className="w-4 h-4 text-[#64748B]" />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                        <tr>
                            <th className="text-left px-6 py-4 font-bold text-[#475569]">Usuário</th>
                            <th className="text-left px-4 py-4 font-bold text-[#475569]">Plano</th>
                            <th className="text-center px-4 py-4 font-bold text-[#475569]">Créditos AI</th>
                            <th className="text-left px-4 py-4 font-bold text-[#475569]">Status</th>
                            <th className="text-right px-6 py-4 font-bold text-[#475569]">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                        {users?.map((user) => (
                            <tr key={user.id} className="hover:bg-[#F8FAFC] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B] font-bold">
                                            {user.name?.[0] || user.email[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#0F172A] flex items-center gap-1">
                                                {user.name || 'Sem nome'}
                                                {user.is_admin && <Shield className="w-3 h-3 text-[#0D7C66]" />}
                                            </div>
                                            <div className="text-xs text-[#94A3B8]">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                        user.plan === 'clinic' ? "bg-purple-100 text-purple-700" :
                                            user.plan === 'pro' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                                    )}>
                                        {user.plan}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <div className="flex items-center justify-center gap-1.5 font-bold text-[#0F172A]">
                                        <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                        {user.ai_credits_used} / {user.ai_credits_limit === -1 ? '∞' : user.ai_credits_limit}
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <span className="flex items-center gap-1.5 text-xs text-green-600 font-bold">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        Ativo
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#94A3B8] hover:text-[#0F172A]">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

import { cn } from '@/lib/utils'
