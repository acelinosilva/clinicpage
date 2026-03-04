'use client'

import { useState } from 'react'
import { Key, Globe, Layout, MessageSquare, Database, ExternalLink } from 'lucide-react'

const INTEGRATIONS = [
    { name: 'Google Analytics 4', icon: Globe, status: 'connected', desc: 'Acompanhe visitas e conversões.' },
    { name: 'Meta Pixel', icon: Layout, status: 'not_connected', desc: 'Otimize seus anúncios no Facebook/Instagram.' },
    { name: 'WhatsApp', icon: MessageSquare, status: 'connected', desc: 'Receba leads direto no celular.' },
    { name: 'Webhooks', icon: Database, status: 'not_connected', desc: 'Envie dados para o seu CRM ou automação.' },
]

export default function APIKeysPage() {
    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            {/* API Keys Table */}
            <div className="card">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="font-bold text-[#0F172A]">Chaves de API</h4>
                        <p className="text-xs text-[#94A3B8]">Use essas chaves para integrar o ClinicPage com outros sistemas.</p>
                    </div>
                    <button className="btn btn-primary btn-sm px-4">Nova Chave</button>
                </header>

                <div className="space-y-3">
                    <div className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0D7C66]">
                                <Key className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-[#0F172A]">Produção · Lead Export</div>
                                <code className="text-[10px] bg-[#E2E8F0] px-1.5 py-0.5 rounded text-[#475569]">cp_live_••••••••••••••••</code>
                            </div>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-[#0D7C66] hover:underline">Revelar</button>
                    </div>
                </div>
            </div>

            {/* Native Integrations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INTEGRATIONS.map((app) => (
                    <div key={app.name} className="card hover:border-[#0D7C66] transition-all group overflow-hidden">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#64748B] group-hover:bg-[#0D7C66]/10 group-hover:text-[#0D7C66] transition-all">
                                <app.icon className="w-5 h-5" />
                            </div>
                            {app.status === 'connected' ? (
                                <span className="text-[10px] font-bold text-[#0D7C66] bg-[#0D7C66]/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Conectado</span>
                            ) : (
                                <button className="text-[10px] font-bold text-[#64748B] hover:text-[#0F172A] flex items-center gap-1 uppercase tracking-widest">
                                    Conectar <ExternalLink className="w-2.5 h-2.5" />
                                </button>
                            )}
                        </div>
                        <h4 className="text-sm font-bold text-[#0F172A] mb-1">{app.name}</h4>
                        <p className="text-xs text-[#94A3B8] leading-tight">{app.desc}</p>
                    </div>
                ))}
            </div>

            {/* Developer Help */}
            <div className="p-6 rounded-[2rem] bg-gradient-to-br from-[#0D7C66] to-[#13C4A1] text-white">
                <h4 className="font-bold mb-2">Precisa de ajuda com integrações?</h4>
                <p className="text-xs text-white/80 mb-4 max-w-md leading-relaxed">
                    Nossa documentação completa para desenvolvedores contém todos os endpoints e modelos de dados necessários para conectar qualquer sistema externo.
                </p>
                <button className="bg-white text-[#0D7C66] px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/90 transition-all">
                    Ler Documentação
                </button>
            </div>
        </div>
    )
}
