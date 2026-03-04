import Link from 'next/link'
import { Stethoscope } from 'lucide-react'

const LINKS = {
    produto: [
        { href: '/precos', label: 'Preços' },
        { href: '/cadastro', label: 'Criar conta grátis' },
        { href: '/login', label: 'Entrar' },
    ],
    recursos: [
        { href: '/#como-funciona', label: 'Como funciona' },
        { href: '/#templates', label: 'Templates' },
        { href: '/#depoimentos', label: 'Casos de sucesso' },
    ],
    legal: [
        { href: '/privacidade', label: 'Privacidade' },
        { href: '/termos', label: 'Termos de uso' },
        { href: '/cookies', label: 'Política de cookies' },
    ],
}

export default function PublicFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#0F172A] text-white pt-16 pb-8">
            <div className="container-wide">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                            <span className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
                                <Stethoscope className="w-5 h-5 text-white" />
                            </span>
                            <span>
                                Clinic<span className="text-[#13C4A1]">Page</span>
                            </span>
                        </Link>
                        <p className="text-[#94A3B8] text-sm leading-relaxed">
                            Gere landing pages de alta conversão para clínicas em minutos, com inteligência artificial.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(LINKS).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-[#CBD5E1] mb-4 capitalize">
                                {title === 'produto' ? 'Produto' : title === 'recursos' ? 'Recursos' : 'Legal'}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((l) => (
                                    <li key={l.href}>
                                        <Link
                                            href={l.href}
                                            className="text-[#94A3B8] hover:text-white text-sm transition-colors"
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[#64748B] text-sm">
                        © {currentYear} ClinicPage. Todos os direitos reservados.
                    </p>
                    <p className="text-[#64748B] text-xs">
                        Feito com ❤️ para profissionais de saúde no Brasil
                    </p>
                </div>
            </div>
        </footer>
    )
}
