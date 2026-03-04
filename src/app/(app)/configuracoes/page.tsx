'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Save, Loader2, Sparkles, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'

export default function ProfilePage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState({
        full_name: '',
        email: ''
    })

    const supabase = createClient()

    useEffect(() => {
        async function loadData() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser(user)
                setProfile({
                    full_name: user.user_metadata?.full_name || '',
                    email: user.email || ''
                })
            }
            setLoading(false)
        }
        loadData()
    }, [])

    const handleSave = async () => {
        setSaving(true)
        const { error } = await supabase.auth.updateUser({
            data: { full_name: profile.full_name }
        })
        setSaving(false)
        if (!error) {
            alert('Perfil atualizado com sucesso!')
        }
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    if (loading) return null

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="card">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#0D7C66]/10 flex items-center justify-center text-[#0D7C66]">
                        <User className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#0F172A]">Informações Pessoais</h3>
                        <p className="text-xs text-[#94A3B8]">Esses dados são usados para personalizar seus sites.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-1.5 ml-1">Nome Completo</label>
                        <input
                            type="text"
                            value={profile.full_name}
                            onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/10 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-1.5 ml-1">E-mail</label>
                        <div className="relative">
                            <input
                                type="email"
                                disabled
                                value={profile.email}
                                className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm cursor-not-allowed opacity-70"
                            />
                            <Mail className="w-4 h-4 text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="pt-4 flex items-center justify-between">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="btn btn-primary btn-sm"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Salvar Alterações
                        </button>

                        <button
                            onClick={handleSignOut}
                            className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Sair da conta
                        </button>
                    </div>
                </div>
            </div>

            <div className="card bg-[#0F172A] border-0 text-white overflow-hidden relative group">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-[#13C4A1]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">IA Credits</span>
                    </div>
                    <div className="text-2xl font-black">20 <span className="text-xs font-normal opacity-50">restantes</span></div>
                    <p className="text-[10px] text-white/50 mt-1">Créditos renovam automaticamente todo mês.</p>
                </div>
                <button className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all">
                    Comprar mais
                </button>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D7C66] opacity-20 blur-3xl -mr-16 -mt-16 group-hover:opacity-40 transition-opacity" />
            </div>
        </div>
    )
}
