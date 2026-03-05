'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X, MessageSquare, Rocket } from 'lucide-react'
import Link from 'next/link'

interface PublicHeaderProps {
    clinicName?: string
    logoUrl?: string
    sections?: string[]
    theme?: any
    whatsapp?: string
}

export default function PublicHeader({
    clinicName = "ClinicPage",
    logoUrl,
    sections = [],
    theme,
    whatsapp = ""
}: PublicHeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileMenuOpen])

    const isMarketing = sections.length === 0

    const navItems = isMarketing ? [
        { label: 'Início', id: 'inicio' },
        { label: 'Como funciona', id: 'como-funciona' },
        { label: 'Recursos', id: 'recursos' },
        { label: 'Preços', id: 'precos' },
    ] : [
        { label: 'Início', id: 'inicio' },
        ...(sections.includes('services') ? [{ label: 'Serviços', id: 'servicos' }] : []),
        ...(sections.includes('about') ? [{ label: 'Sobre', id: 'sobre' }] : []),
        ...(sections.includes('testimonials') ? [{ label: 'Depoimentos', id: 'depoimentos' }] : []),
        ...(sections.includes('faq') ? [{ label: 'Dúvidas', id: 'faq' }] : []),
        { label: 'Contato', id: 'contato' },
    ]

    const scrollTo = (id: string) => {
        setMobileMenuOpen(false)
        if (id === 'inicio') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        // Wait for menu close animation before scrolling
        setTimeout(() => {
            const element = document.getElementById(id)
            if (element) {
                const top = element.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top, behavior: 'smooth' })
            }
        }, 300)
    }

    return (
        <>
            {/* ── Top Bar ── */}
            <header
                className={cn(
                    "fixed top-0 inset-x-0 z-[100] transition-all duration-300",
                    isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6",
                    !isScrolled && isMarketing && "bg-white/5"
                )}
            >
                <div className="container-wide flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => scrollTo('inicio')}
                        className="flex items-center gap-3 group text-left"
                    >
                        {logoUrl ? (
                            <img src={logoUrl} alt={clinicName} className="h-10 w-auto object-contain" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white/20">
                                    {clinicName.charAt(0)}
                                </div>
                                <span className={cn(
                                    "font-black text-xl tracking-tight transition-colors",
                                    isScrolled || isMarketing ? "text-[#0F172A]" : "text-white"
                                )}>
                                    {clinicName}
                                </span>
                            </div>
                        )}
                    </button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className={cn(
                                    "text-sm font-bold transition-all hover:scale-105 active:scale-95",
                                    isScrolled || isMarketing ? "text-[#475569] hover:text-[#0D7C66]" : "text-white/80 hover:text-white"
                                )}
                            >
                                {item.label}
                            </button>
                        ))}

                        {whatsapp ? (
                            <a
                                href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary btn-sm btn shadow-lg shadow-[#0D7C66]/20"
                                style={{ backgroundColor: theme?.colors?.cta_button, color: theme?.colors?.cta_button_text }}
                            >
                                Agendar Agora
                            </a>
                        ) : (
                            <Link href="/cadastro" className="btn-primary btn-sm btn">
                                Criar Conta
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Hamburger */}
                    <button
                        aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                        className={cn(
                            "md:hidden p-2 rounded-xl transition-colors",
                            isScrolled || isMarketing ? "text-[#0F172A] hover:bg-[#F1F5F9]" : "text-white hover:bg-white/10"
                        )}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* ── Mobile Menu ── rendered OUTSIDE <header> to prevent clipping ── */}
            <div
                aria-hidden={!mobileMenuOpen}
                className={cn(
                    "fixed inset-0 bg-white z-[200] flex flex-col p-6 md:hidden",
                    "transition-transform duration-300 ease-in-out will-change-transform",
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header row */}
                <div className="flex items-center justify-between mb-12">
                    <span className="font-black text-2xl text-[#0F172A]">{clinicName}</span>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Fechar menu"
                        className="p-2 rounded-xl text-[#475569] hover:bg-[#F1F5F9] transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Nav items */}
                <nav className="flex flex-col gap-6 items-center flex-1 justify-center">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className="text-2xl font-black text-[#0F172A] hover:text-[#0D7C66] transition-colors"
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* CTA */}
                {whatsapp ? (
                    <a
                        href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-lg btn w-full"
                        style={{ backgroundColor: theme?.colors?.cta_button, color: theme?.colors?.cta_button_text }}
                    >
                        <MessageSquare className="w-5 h-5" />
                        Falar no WhatsApp
                    </a>
                ) : (
                    <Link
                        href="/cadastro"
                        className="btn-primary btn-lg btn w-full"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <Rocket className="w-5 h-5" />
                        Começar Agora
                    </Link>
                )}
            </div>
        </>
    )
}
