'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard, Users2, Settings, Package,
    Stethoscope, ChevronRight, Globe, BarChart3, LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase-client'

const ADMIN_NAV_ITEMS = [
    { href: '/admin', icon: LayoutDashboard, label: 'Geral' },
    { href: '/admin/usuarios', icon: Users2, label: 'Usuários' },
    { href: '/admin/landing-pages', icon: Globe, label: 'Landing Pages' },
    { href: '/admin/assinaturas', icon: Package, label: 'Planos' },
    { href: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
]

export default function AdminSidebar() {
    const pathname = usePathname()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    return (
        <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[#0F172A] text-white py-6 border-r border-white/10">
            {/* Logo */}
            <div className="px-6 mb-8">
                <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
                    <span className="w-9 h-9 rounded-xl bg-[#0D7C66] flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-white" />
                    </span>
                    <span className="text-white">
                        Admin<span className="text-[#0D7C66]">Panel</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                <p className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Gerenciamento</p>
                {ADMIN_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                                isActive
                                    ? 'bg-[#0D7C66] text-white shadow-lg shadow-[#0D7C66]/20'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                            )}
                        >
                            <item.icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80')} />
                            {item.label}
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="px-4 pt-4 border-t border-white/10 mt-auto">
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all group"
                >
                    <LogOut className="w-5 h-5" />
                    Sair do Admin
                </button>
            </div>
        </aside>
    )
}
