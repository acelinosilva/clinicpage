'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Shield, CreditCard, Key, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const SETTINGS_NAV = [
    { href: '/configuracoes', icon: User, label: 'Meu Perfil', exact: true },
    { href: '/configuracoes/dominio', icon: Globe, label: 'Domínio Personalizado' },
    { href: '/configuracoes/plano', icon: CreditCard, label: 'Plano e Cobrança' },
    { href: '/configuracoes/seguranca', icon: Shield, label: 'Segurança' },
    { href: '/configuracoes/api', icon: Key, label: 'Chaves de API' },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <header className="mb-8">
                <h1 className="text-2xl font-black text-[#0F172A]">Configurações</h1>
                <p className="text-[#64748B] text-sm">Gerencie seu perfil, segurança e preferências</p>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 space-y-1">
                    {SETTINGS_NAV.map((item) => {
                        const isActive = item.exact
                            ? pathname === item.href
                            : pathname.startsWith(item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                                    isActive
                                        ? "bg-[#0D7C66]/5 text-[#0D7C66] font-bold"
                                        : "text-[#64748B] hover:bg-[#F1F5F9]"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        )
                    })}
                </aside>

                {/* Content */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    )
}
