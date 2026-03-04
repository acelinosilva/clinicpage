'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard, Plus, BarChart3, Users2, Settings, Package,
    Stethoscope, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Painel' },
    { href: '/criar', icon: Plus, label: 'Nova Landing Page' },
    { href: '/planos', icon: Package, label: 'Planos' },
    { href: '/configuracoes', icon: Settings, label: 'Configurações' },
]

export default function AppSidebar() {
    const pathname = usePathname()

    return (
        <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-[#E2E8F0] py-6">
            {/* Logo */}
            <div className="px-6 mb-8">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
                    <span className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-white" />
                    </span>
                    <span className="text-[#0F172A]">
                        Clinic<span className="text-[#0D7C66]">Page</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn('nav-link', isActive && 'nav-link-active')}
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            {item.label}
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </Link>
                    )
                })}
            </nav>

            {/* User */}
            <div className="px-4 pt-4 border-t border-[#E2E8F0] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0D7C66]/10 flex items-center justify-center text-[#0D7C66]">
                    <Users2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <Link href="/configuracoes" className="text-sm font-bold text-[#0F172A] hover:underline block truncate">
                        Minha Conta
                    </Link>
                    <p className="text-xs text-[#94A3B8]">Configurações</p>
                </div>
            </div>
        </aside>
    )
}
