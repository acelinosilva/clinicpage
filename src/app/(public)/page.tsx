import type { Metadata } from 'next'
import Link from 'next/link'
import {
    Sparkles, CheckCircle, ArrowRight, Star, Users, Zap,
    TrendingUp, Stethoscope, Brain, Activity, Eye, Smile,
    PlayCircle, Shield, Clock, BarChart3,
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'ClinicPage — Landing Pages com IA para Clínicas',
    description:
        'Crie landing pages profissionais de alta conversão para sua clínica em menos de 8 minutos usando inteligência artificial. Mais pacientes, mais consultas.',
}

const FEATURES = [
    {
        icon: Sparkles,
        title: 'Gerado por IA',
        desc: 'Textos persuasivos e otimizados para conversão criados pelo Gemini AI em segundos.',
        color: 'from-violet-500 to-purple-600',
    },
    {
        icon: Zap,
        title: 'Pronto em 8 minutos',
        desc: 'Preencha o briefing, escolha um template e publique. Sem precisar de designer ou programador.',
        color: 'from-amber-400 to-orange-500',
    },
    {
        icon: TrendingUp,
        title: 'Alta conversão',
        desc: 'Templates testados com estrutura de copywriting clínico para transformar visitantes em pacientes.',
        color: 'from-[#0D7C66] to-[#13C4A1]',
    },
    {
        icon: BarChart3,
        title: 'Analytics completo',
        desc: 'Acompanhe visitantes, cliques, leads e taxa de conversão em tempo real.',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Shield,
        title: 'LGPD & CFM',
        desc: 'Textos éticos sem promessas de cura. Política de privacidade e cookie banner inclusos.',
        color: 'from-green-500 to-teal-600',
    },
    {
        icon: Clock,
        title: 'Leads em tempo real',
        desc: 'Notificação instantânea por e-mail a cada novo paciente interessado. CRM simples integrado.',
        color: 'from-rose-500 to-pink-600',
    },
]

const SPECIALTIES = [
    { icon: Smile, label: 'Odontologia' },
    { icon: Sparkles, label: 'Estética' },
    { icon: Brain, label: 'Psicologia' },
    { icon: Activity, label: 'Fisioterapia' },
    { icon: Eye, label: 'Oftalmologia' },
    { icon: Stethoscope, label: 'Clínica Geral' },
]

const TESTIMONIALS = [
    {
        name: 'Dra. Ana Beatriz',
        role: 'Cirurgiã-Dentista | São Paulo',
        text: 'Em 10 minutos criei minha página de implantes. Na primeira semana recebi 18 leads qualificados. Simplesmente incrível!',
        rating: 5,
        avatar: 'AB',
    },
    {
        name: 'Dr. Rafael Souza',
        role: 'Psicólogo | Belo Horizonte',
        text: 'A IA entendeu exatamente o tom empático que precisava para o meu consultório. A página ficou melhor que a do meu concorrente que gastou R$ 5 mil.',
        rating: 5,
        avatar: 'RS',
    },
    {
        name: 'Clínica Bella Estética',
        role: 'Estética e Harmonização | Curitiba',
        text: 'Usamos o plano Clínica para 4 especialidades diferentes. Cada landing page é única e a taxa de conversão está em 6,2%. Recomendo demais!',
        rating: 5,
        avatar: 'CB',
    },
]

const HOW_IT_WORKS = [
    {
        step: '01',
        title: 'Preencha o briefing',
        desc: '5 passos simples: nome da clínica, especialidade, serviços, contato e estilo visual.',
    },
    {
        step: '02',
        title: 'IA gera os textos',
        desc: 'O Gemini cria headline, benefícios, FAQ, CTA e SEO — tudo em português e dentro das normas do CFM.',
    },
    {
        step: '03',
        title: 'Publique e receba leads',
        desc: 'Compartilhe o link, conecte ao WhatsApp e receba notificações de novos pacientes na hora.',
    },
]

export default function HomePage() {
    return (
        <div>
            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className="gradient-hero min-h-[90vh] flex items-center px-4 py-24">
                <div className="container-wide">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Pill badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-8 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-[#13C4A1]" />
                            Powered by Google Gemini AI
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                            Landing pages que{' '}
                            <span className="text-[#13C4A1]">atraem pacientes</span>{' '}
                            — no piloto automático
                        </h1>

                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Em menos de 8 minutos, a IA cria uma página profissional de alta conversão para sua clínica. Sem designer, sem programador, sem complicação.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/cadastro" className="btn-primary btn btn-lg text-base">
                                Criar minha landing page grátis
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="btn btn-lg text-white border border-white/30 hover:bg-white/10 text-base">
                                <PlayCircle className="w-5 h-5" />
                                Ver como funciona
                            </button>
                        </div>

                        <p className="text-white/50 text-sm mt-6">
                            ✓ Grátis para começar &nbsp; ✓ Sem cartão de crédito &nbsp; ✓ Cancele quando quiser
                        </p>

                        {/* Stats bar */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                            {[
                                { value: '500+', label: 'Clínicas ativas' },
                                { value: '8 min', label: 'Tempo médio de criação' },
                                { value: '4,2%', label: 'Conversão média' },
                                { value: '4.9★', label: 'Avaliação dos clientes' },
                            ].map((s) => (
                                <div key={s.label} className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm">
                                    <div className="text-3xl font-black text-white">{s.value}</div>
                                    <div className="text-white/60 text-xs mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Specialties bar ───────────────────────────────────────── */}
            <section className="bg-[#F8FAFC] border-y border-[#E2E8F0] section-sm">
                <div className="container-wide">
                    <p className="text-center text-[#94A3B8] text-sm font-medium mb-6 uppercase tracking-wider">
                        Funciona para todas as especialidades
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {SPECIALTIES.map((s) => (
                            <div
                                key={s.label}
                                className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-4 py-2 text-sm font-medium text-[#475569] shadow-sm"
                            >
                                <s.icon className="w-4 h-4 text-[#0D7C66]" />
                                {s.label}
                            </div>
                        ))}
                        <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-4 py-2 text-sm font-medium text-[#0D7C66]">
                            +10 especialidades →
                        </div>
                    </div>
                </div>
            </section>

            {/* ── How it works ─────────────────────────────────────────── */}
            <section id="como-funciona" className="section bg-white">
                <div className="container-wide">
                    <div className="text-center mb-16">
                        <span className="badge badge-green mb-4">Como funciona</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4">
                            De zero a pacientes em{' '}
                            <span className="text-gradient">3 passos</span>
                        </h2>
                        <p className="text-[#475569] text-lg max-w-xl mx-auto">
                            A IA faz o trabalho pesado. Você só escolhe o estilo e publica.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {HOW_IT_WORKS.map((step, i) => (
                            <div key={step.step} className="relative">
                                {i < HOW_IT_WORKS.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#0D7C66]/30 to-transparent z-0" />
                                )}
                                <div className="card relative z-10">
                                    <div className="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center text-white font-black text-lg mb-4">
                                        {step.step}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-[#475569] text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features ─────────────────────────────────────────────── */}
            <section className="section bg-[#F8FAFC]">
                <div className="container-wide">
                    <div className="text-center mb-16">
                        <span className="badge badge-blue mb-4">Recursos</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4">
                            Tudo que sua clínica precisa
                        </h2>
                        <p className="text-[#475569] text-lg max-w-xl mx-auto">
                            Uma plataforma completa para captar pacientes online.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map((f) => (
                            <div key={f.title} className="card group hover:border-[#0D7C66]/30">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                                    <f.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                                <p className="text-[#475569] text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials ─────────────────────────────────────────── */}
            <section id="depoimentos" className="section bg-white">
                <div className="container-wide">
                    <div className="text-center mb-16">
                        <span className="badge badge-yellow mb-4">Depoimentos</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4">
                            Clinicas que já usam e amam
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.name} className="card">
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-[#374151] text-sm leading-relaxed mb-6">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{t.name}</div>
                                        <div className="text-[#94A3B8] text-xs">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Strip ─────────────────────────────────────────────── */}
            <section className="gradient-brand section">
                <div className="container-wide text-center">
                    <Users className="w-12 h-12 text-white/50 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Comece grátis hoje mesmo
                    </h2>
                    <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
                        Junte-se a centenas de clínicas que já estão atraindo mais pacientes com ClinicPage.
                    </p>
                    <Link href="/cadastro" className="inline-flex items-center gap-2 bg-white text-[#0D7C66] font-bold px-10 py-4 rounded-2xl hover:bg-white/90 transition-all text-lg shadow-lg shadow-black/20">
                        Criar minha conta grátis
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <p className="text-white/50 text-sm mt-4">
                        Sem cartão de crédito • Cancele quando quiser
                    </p>
                </div>
            </section>
        </div>
    )
}
