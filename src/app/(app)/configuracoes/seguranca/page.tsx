'use client'

import { useState } from 'react'
import { Shield, Key, Lock, Monitor, Smartphone, AlertTriangle } from 'lucide-react'

export default function SecurityPage() {
    const [saving, setSaving] = useState(false)

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            {/* Change Password */}
            <div className="card">
                <header className="mb-6">
                    <h4 className="font-bold text-[#0F172A]">Alterar Senha</h4>
                    <p className="text-xs text-[#94A3B8]">Recomendamos uma senha forte com pelo menos 8 caracteres.</p>
                </header>

                <div className="max-w-md space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-1">Senha Atual</label>
                        <div className="relative">
                            <input type="password" placeholder="••••••••" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/10" />
                            <Lock className="w-4 h-4 text-[#CBD5E1] absolute right-4 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-1">Nova Senha</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/10" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-1">Confirmar Nova Senha</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/10" />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button className="btn btn-primary btn-sm px-6 h-11">
                            Atualizar Senha
                        </button>
                    </div>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="card">
                <header className="mb-6">
                    <h4 className="font-bold text-[#0F172A]">Sessões Ativas</h4>
                    <p className="text-xs text-[#94A3B8]">Dispositivos que acessaram sua conta recentemente.</p>
                </header>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0D7C66]">
                                <Monitor className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-[#0F172A]">Windows PC · São Paulo, BR</div>
                                <div className="text-[10px] text-[#0D7C66] font-bold uppercase tracking-widest mt-0.5">Sessão Atual</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-[#E2E8F0] transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#64748B]">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-[#0F172A]">iPhone 15 Pro · Rio de Janeiro, BR</div>
                                <div className="text-[10px] text-[#94A3B8] font-bold tracking-widest uppercase mt-0.5">Último acesso: 2 horas atrás</div>
                            </div>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Encerrar</button>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="card border-red-100 bg-red-50/10">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-red-600 mb-1">Apagar minha conta</h4>
                        <p className="text-xs text-red-900/60 leading-relaxed mb-4">
                            Ao excluir sua conta, todos os seus sites, leads e dados serão removidos permanentemente. Esta ação não pode ser desfeita.
                        </p>
                        <button className="text-xs font-bold text-red-600 border border-red-200 bg-white px-4 py-2 rounded-lg hover:bg-red-50 transition-all">
                            Excluir conta permanentemente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
