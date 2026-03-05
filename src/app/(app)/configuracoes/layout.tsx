'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Shield, CreditCard, Key, Globe, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase-client'

const SETTINGS_NAV = [
    { href: '/configuracoes', icon: User, label: 'Meu Perfil', exact: true },
    { href: '/configuracoes/dominio', icon: Globe, label: 'Domínio Personalizado' },
    { href: '/configuracoes/plano', icon: CreditCard, label: 'Plano e Cobrança' },
    { href: '/configuracoes/seguranca', icon: Shield, label: 'Segurança' },
    { href: '/configuracoes/api', icon: Key, label: 'Chaves de API', adminOnly: true },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function checkAdmin() {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return

                const { data: profile } = await supabase
                    .from('users')
                    .select('is_admin')
                    .eq('id', user.id)
                    .single()

                setIsAdmin(!!profile?.is_admin)
            } catch (error) {
                console.error('Error checking admin status:', error)
            } finally {
                setLoading(false)
            }
        }
        checkAdmin()
    }, [])

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#0D7C66] animate-spin" />
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <header className="mb-8">
                <h1 className="text-2xl font-black text-[#0F172A]">Configurações</h1>
                <p className="text-[#64748B] text-sm">Gerencie seu perfil, segurança e preferências</p>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 space-y-1">
                    {SETTINGS_NAV.filter(item => !item.adminOnly || isAdmin).map((item) => {
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
