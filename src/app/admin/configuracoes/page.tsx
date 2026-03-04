import { Settings, Shield, Globe, Zap, CreditCard, Save, RefreshCw } from 'lucide-react'

export const metadata = {
    title: 'Configurações | Admin ClinicPage',
}

export default function AdminSettingsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-[#0F172A]">Configurações da Plataforma</h1>
                <p className="text-[#475569] text-sm mt-1">Gerencie chaves de API, limites globais e preferências do sistema</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* General Settings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* API Keys Section */}
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h2 className="font-bold text-[#0F172A]">Integrações & IA</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#64748B] uppercase tracking-widest mb-2">Google Gemini API Key</label>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        value="••••••••••••••••••••••••••••••"
                                        disabled
                                        className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm"
                                    />
                                    <button className="bg-[#F1F5F9] text-[#475569] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#E2E8F0] transition-colors">
                                        Editar
                                    </button>
                                </div>
                                <p className="text-[10px] text-[#94A3B8] mt-2">Usada para gerar conteúdos de landing pages.</p>
                            </div>

                            <div className="pt-4">
                                <label className="block text-xs font-bold text-[#64748B] uppercase tracking-widest mb-2">Supabase Service Role Key</label>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        value="••••••••••••••••••••••••••••••"
                                        disabled
                                        className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm"
                                    />
                                    <button className="bg-[#F1F5F9] text-[#475569] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#E2E8F0] transition-colors">
                                        Editar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Platform Config Section */}
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                <Globe className="w-5 h-5" />
                            </div>
                            <h2 className="font-bold text-[#0F172A]">Preferências Globais</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-[#64748B] uppercase tracking-widest mb-2">Nome da Plataforma</label>
                                <input
                                    type="text"
                                    defaultValue="ClinicPage"
                                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0D7C66]/10 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#64748B] uppercase tracking-widest mb-2">E-mail de Suporte</label>
                                <input
                                    type="email"
                                    defaultValue="suporte@clinicpage.com.br"
                                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0D7C66]/10 outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="btn btn-primary px-6 py-2.5 flex items-center gap-2">
                                <Save className="w-4 h-4" />
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info cards */}
                <div className="space-y-6">
                    <div className="bg-[#0F172A] rounded-2xl p-6 text-white overflow-hidden relative">
                        <Shield className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
                        <h3 className="font-bold mb-4 relative z-10">Segurança do Admin</h3>
                        <p className="text-sm text-white/60 mb-6 relative z-10">Sua conta tem privilégios totais sobre a plataforma. Use com cuidado.</p>
                        <button className="bg-white/10 hover:bg-white/20 text-white w-full py-2.5 rounded-xl text-sm font-bold transition-all relative z-10">
                            Trocar Senha
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                        <h3 className="font-bold text-[#0F172A] mb-4">Informações do Servidor</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-[#64748B]">Versão da App</span>
                                <span className="font-mono font-bold text-[#0F172A]">v1.0.4-beta</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-[#64748B]">Environment</span>
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Production</span>
                            </div>
                            <div className="flex items-center justify-between text-xs pt-4 border-t border-[#F1F5F9]">
                                <span className="text-[#64748B]">Última Migração</span>
                                <span className="text-[#0F172A]">04/03/2026</span>
                            </div>
                        </div>
                        <button className="mt-6 w-full text-[#64748B] hover:text-[#0F172A] text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                            <RefreshCw className="w-3 h-3" />
                            Ver Check de Saúde
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
