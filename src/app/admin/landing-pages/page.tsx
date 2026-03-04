import { Search, Globe, Eye, MoreHorizontal, ExternalLink, Calendar } from 'lucide-react'
import { createServiceClient } from '@/lib/supabase-server'
import Link from 'next/link'

export const metadata = {
    title: 'Landing Pages | Admin ClinicPage',
}

export default async function AdminLandingPagesPage() {
    const supabase = createServiceClient()
    const { data: pages } = await supabase
        .from('landing_pages')
        .select(`
            *,
            users (
                email,
                name
            )
        `)
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-[#0F172A]">Landing Pages</h1>
                    <p className="text-[#475569] text-sm mt-1">Gerencie todas as páginas públicas geradas na plataforma</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <input
                            type="text"
                            placeholder="Buscar página..."
                            className="bg-white border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66]/20 transition-all w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages?.map((page) => (
                    <div key={page.id} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all overflow-hidden group">
                        <div className="aspect-video bg-[#F1F5F9] relative overflow-hidden flex items-center justify-center p-8">
                            <Globe className="w-12 h-12 text-[#CBD5E1] group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-3 left-3">
                                <span className={cn(
                                    "px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider",
                                    page.status === 'published' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                                )}>
                                    {page.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="min-w-0">
                                    <h3 className="font-bold text-[#0F172A] truncate mb-1">{page.title}</h3>
                                    <p className="text-xs text-[#94A3B8] truncate flex items-center gap-1">
                                        <Globe className="w-3 h-3" />
                                        /{page.slug}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/lp/${page.slug}`}
                                        target="_blank"
                                        className="p-1.5 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B] hover:text-[#0F172A]"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-6 h-6 rounded-full bg-[#0D7C66]/10 flex items-center justify-center text-[10px] font-bold text-[#0D7C66]">
                                        {(page.users as any)?.email?.[0].toUpperCase()}
                                    </div>
                                    <p className="text-xs font-medium text-[#475569] truncate">{(page.users as any)?.email}</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(page.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {(!pages || pages.length === 0) && (
                    <div className="col-span-full py-24 text-center bg-white rounded-2xl border border-dashed border-[#CBD5E1]">
                        <Globe className="w-12 h-12 text-[#CBD5E1] mx-auto mb-4" />
                        <h3 className="font-bold text-lg text-[#475569]">Nenhuma landing page encontrada</h3>
                        <p className="text-sm text-[#94A3B8]">As páginas aparecerão aqui conforme forem criadas.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

import { cn } from '@/lib/utils'
