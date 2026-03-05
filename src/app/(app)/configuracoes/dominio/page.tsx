'use client'

import { useState, useEffect } from 'react'
import { Globe, Link as LinkIcon, AlertCircle, CheckCircle2, Loader2, Info, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

export default function DomainSettingsPage() {
    const router = useRouter()
    const [domain, setDomain] = useState('')
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userPlan, setUserPlan] = useState<string>('free')
    const [status, setStatus] = useState<'none' | 'pending' | 'active'>('none')

    useEffect(() => {
        async function loadUser() {
            try {
                const supabase = createClient()
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                    const { data } = await supabase.from('users').select('plan').eq('id', user.id).single()
                    if (data) setUserPlan(data.plan)
                }
            } finally {
                setLoading(false)
            }
        }
        loadUser()
    }, [])

    const hasDomainAccess = userPlan !== 'free'

    const handleSave = async () => {
        if (!domain) return

        setSaving(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        setStatus('pending')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#0D7C66]" />
            </div>
        )
    }

    if (!hasDomainAccess) {
        return (
            <div className="card text-center py-12 bg-white rounded-[2rem] border border-[#E2E8F0] shadow-sm">
                <div className="w-16 h-16 bg-[#0D7C66]/5 text-[#0D7C66] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Domínio Personalizado</h3>
                <p className="text-[#64748B] max-w-md mx-auto mb-6 text-sm">
                    Conecte seu próprio domínio (ex: clinica.com.br) para passar mais credibilidade aos seus pacientes. Recurso disponível a partir do plano Professional.
                </p>
                <button
                    onClick={() => router.push('/planos')}
                    className="btn btn-primary px-8"
                >
                    Fazer Upgrade agora
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-[#0D7C66]/10 flex items-center justify-center text-[#0D7C66]">
                            <Globe className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0F172A]">Domínio Personalizado</h3>
                            <p className="text-xs text-[#94A3B8]">Conecte seu próprio domínio ao seu site.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-2">Seu Domínio</label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                                    <LinkIcon className="w-4 h-4" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="ex: clinica.com.br"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="w-full bg-white border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/10 transition-all font-medium"
                                />
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={saving || !domain || status === 'active'}
                                className="btn-primary btn px-6 shrink-0"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Conectar'}
                            </button>
                        </div>
                    </div>

                    {status === 'pending' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-6 animate-in slide-in-from-top-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5">
                                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-yellow-800 text-sm mb-1">Ação Requerida: Configurar DNS</h4>
                                    <p className="text-yellow-700 text-xs mb-4 leading-relaxed">
                                        Para ativar seu domínio <strong>{domain}</strong>, você precisa adicionar as seguintes entradas DNS no painel onde registrou seu domínio (Registro.br, GoDaddy, etc).
                                    </p>

                                    <div className="bg-white rounded-lg border border-yellow-200 overflow-hidden">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-yellow-50/50 border-b border-yellow-100">
                                                <tr>
                                                    <th className="px-4 py-2 font-bold text-yellow-800">Tipo</th>
                                                    <th className="px-4 py-2 font-bold text-yellow-800">Nome (Host)</th>
                                                    <th className="px-4 py-2 font-bold text-yellow-800">Valor (Aponta para)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-yellow-100">
                                                <tr>
                                                    <td className="px-4 py-3 font-mono font-medium text-yellow-700">A</td>
                                                    <td className="px-4 py-3 font-mono text-yellow-700">@</td>
                                                    <td className="px-4 py-3 font-mono bg-yellow-100/50 text-yellow-800 font-bold tracking-wider select-all">76.76.21.21</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 font-mono font-medium text-yellow-700">CNAME</td>
                                                    <td className="px-4 py-3 font-mono text-yellow-700">www</td>
                                                    <td className="px-4 py-3 font-mono bg-yellow-100/50 text-yellow-800 font-bold tracking-wider select-all">cname.vercel-dns.com</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-[10px] text-yellow-600 font-medium">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        <span>Aguardando propagação. Pode levar até 24h para concluir.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === 'active' && (
                        <div className="bg-[#13C4A1]/10 border border-[#13C4A1]/20 rounded-xl p-4 flex items-start gap-4 animate-in fade-in">
                            <div className="mt-0.5">
                                <CheckCircle2 className="w-5 h-5 text-[#13C4A1]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#0D7C66] text-sm mb-1">Domínio Conectado e Ativo!</h4>
                                <p className="text-[#0D7C66]/80 text-xs">
                                    Seu domínio <strong>{domain}</strong> já está configurado e seu site já pode ser acessado através dele. O certificado SSL foi gerado automaticamente.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-blue-50 text-blue-800 p-6 rounded-xl border border-blue-100 space-y-4">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
                    <h5 className="font-bold text-sm">Tutorial de Configuração</h5>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h6 className="font-bold text-xs uppercase text-blue-700">No Registro.br</h6>
                        <ol className="text-xs text-blue-600/90 space-y-2 list-decimal ml-4">
                            <li>Acesse sua conta no Registro.br e selecione o domínio.</li>
                            <li>Clique em <strong>Configurar Endereçamento</strong> (ou DNS).</li>
                            <li>Escolha <strong>Editar Zona</strong> (não use DNS Personalizado).</li>
                            <li>Clique em <strong>Nova Entrada</strong>.</li>
                            <li>Adicione o Registro <strong>A</strong> (deixe o campo nome vazio) apontando para <code>76.76.21.21</code>.</li>
                            <li>Adicione o Registro <strong>CNAME</strong> com nome <code>www</code> apontando para <code>cname.vercel-dns.com</code>.</li>
                        </ol>
                    </div>

                    <div className="space-y-3">
                        <h6 className="font-bold text-xs uppercase text-blue-700">Na GoDaddy</h6>
                        <ol className="text-xs text-blue-600/90 space-y-2 list-decimal ml-4">
                            <li>Faça login no Centro de Controle de DNS da GoDaddy.</li>
                            <li>Selecione o seu domínio para acessar as <strong>Configurações de DNS</strong>.</li>
                            <li>Em Registros, edite o Registro <strong>A</strong> com nome <strong>@</strong> para o valor <code>76.76.21.21</code>.</li>
                            <li>Edite o Registro <strong>CNAME</strong> com nome <strong>www</strong> para o valor <code>cname.vercel-dns.com</code>.</li>
                            <li>Salve as alterações e aguarde a propagação.</li>
                        </ol>
                    </div>
                </div>

                <div className="pt-2 border-t border-blue-100 flex items-center gap-2 text-[10px] text-blue-500 italic">
                    <AlertCircle className="w-3 h-3" />
                    <span>Importante: Outros registros do tipo A ou CNAME para o mesmo nome devem ser removidos para evitar conflitos.</span>
                </div>
            </div>
        </div>
    )
}
