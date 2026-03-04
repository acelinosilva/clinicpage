'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Stethoscope, Loader2, Github, CheckCircle2 } from 'lucide-react'

export default function CadastroPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                }
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else if (data.session) {
            const redirectParam = new URLSearchParams(window.location.search).get('redirect')
            if (redirectParam?.startsWith('checkout_')) {
                const planId = redirectParam.replace('checkout_', '')
                try {
                    const res = await fetch('/api/checkout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ planId })
                    })
                    const apiData = await res.json()
                    if (apiData.url) {
                        window.location.href = apiData.url
                        return
                    }
                } catch (e) {
                    console.error('Checkout error after signup:', e)
                }
            }
            router.push('/dashboard')
            router.refresh()
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    const handleSocialLogin = async (provider: 'github' | 'google') => {
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    if (success) {
        return (
            <div className="min-h-screen gradient-soft flex flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-md animate-slide-up bg-white rounded-2xl border border-[#E2E8F0] p-10 shadow-sm text-center">
                    <div className="w-16 h-16 bg-[#0D7C66]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0D7C66]">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-black text-[#0F172A] mb-4 tracking-tight">Quase lá!</h1>
                    <p className="text-[#64748B] text-sm leading-relaxed mb-8">
                        Enviamos um link de confirmação para <span className="font-bold text-[#0F172A]">{email}</span>. Acesse seu e-mail para ativar sua conta.
                    </p>
                    <Link href="/login" className="btn-primary btn py-3 px-8 inline-flex items-center gap-2">
                        Voltar para o login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen gradient-soft flex flex-col items-center justify-center px-4 py-12">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-12 animate-fade-in text-[#0F172A]">
                <span className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white">
                    <Stethoscope className="w-6 h-6" />
                </span>
                <span>Clinic<span className="text-[#0D7C66]">Page</span></span>
            </Link>

            <div className="w-full max-w-md animate-slide-up bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-black text-[#0F172A] mb-2 tracking-tight">Criar sua conta</h1>
                    <p className="text-[#64748B] text-sm font-medium">Comece a atrair mais pacientes hoje mesmo</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pl-1">Nome Completo</label>
                        <input
                            type="text"
                            placeholder="Dr. Silva"
                            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-4 focus:ring-[#0D7C66]/10 focus:border-[#0D7C66] outline-none transition-all text-sm font-medium"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pl-1">E-mail</label>
                        <input
                            type="email"
                            placeholder="seu@clinica.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-4 focus:ring-[#0D7C66]/10 focus:border-[#0D7C66] outline-none transition-all text-sm font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pl-1">Senha</label>
                        <input
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-4 focus:ring-[#0D7C66]/10 focus:border-[#0D7C66] outline-none transition-all text-sm font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary btn py-3.5 flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Criar conta grátis
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="my-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#E2E8F0]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">ou continue com</span>
                    <div className="h-px flex-1 bg-[#E2E8F0]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleSocialLogin('google')}
                        className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors text-sm font-bold text-[#0F172A]"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Google
                    </button>
                    <button
                        onClick={() => handleSocialLogin('github')}
                        className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors text-sm font-bold text-[#0F172A]"
                    >
                        <Github className="w-5 h-5" />
                        GitHub
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-[#F1F5F9] text-center">
                    <p className="text-sm font-medium text-[#64748B]">
                        Já possui uma conta?{' '}
                        <Link href="/login" className="text-[#0D7C66] font-bold hover:underline">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
