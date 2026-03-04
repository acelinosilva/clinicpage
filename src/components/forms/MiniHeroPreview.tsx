"use client"

import { TemplateId } from '@/types'
import { cn } from '@/lib/utils'
import { MessageSquare, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

interface MiniHeroPreviewProps {
    templateId: TemplateId
    clinicName?: string
}

export default function MiniHeroPreview({ templateId, clinicName = 'Sua Clínica' }: MiniHeroPreviewProps) {
    const styles = {
        modern_minimal: {
            bg: "bg-[#0D7C66]",
            heading: "font-[800] text-white",
            button: "rounded-lg bg-white/20",
            card: "rounded-xl bg-white/10",
            dot: "bg-emerald-400"
        },
        elegant_luxury: {
            bg: "bg-slate-900",
            heading: "font-serif italic text-white",
            button: "rounded-none border-b border-white/30",
            card: "rounded-none border border-white/10",
            dot: "bg-slate-400"
        },
        friendly_family: {
            bg: "bg-rose-50",
            heading: "font-bold text-rose-900",
            button: "rounded-full bg-rose-500",
            card: "rounded-2xl bg-white shadow-sm",
            dot: "bg-rose-400"
        },
        clinical_high_tech: {
            bg: "bg-slate-100",
            heading: "font-mono uppercase text-slate-900",
            button: "rounded-md bg-blue-600",
            card: "rounded-lg border-2 border-slate-200 bg-white",
            dot: "bg-blue-500"
        },
        black_edition: {
            bg: "bg-black",
            heading: "font-black uppercase italic text-emerald-500",
            button: "rounded-full bg-emerald-500 text-black",
            card: "rounded-2xl border border-emerald-500/20 bg-neutral-900",
            dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
        },
        retro_classic: {
            bg: "bg-[#FDF8F1]",
            heading: "font-serif font-bold text-[#4A3728]",
            button: "rounded-sm bg-[#4A3728] text-white",
            card: "rounded-none border-4 border-[#4A3728] bg-white shadow-[4px_4px_0px_#4A3728]",
            dot: "bg-[#D4C3A3]"
        },
        'universal-modern': {
            bg: "bg-[#2563EB]",
            heading: "font-bold text-white",
            button: "rounded-lg bg-white/20",
            card: "rounded-xl bg-white/10",
            dot: "bg-blue-400"
        }
    }[templateId] || {
        bg: "bg-slate-200",
        heading: "font-bold",
        button: "rounded-lg",
        card: "rounded-xl",
        dot: "bg-slate-400"
    }

    const isLight = templateId === 'friendly_family' || templateId === 'clinical_high_tech' || templateId === 'retro_classic'

    return (
        <div className={cn("w-full aspect-video rounded-3xl overflow-hidden relative border border-black/5 shadow-inner", styles.bg)}>
            {/* Mini content grid */}
            <div className="absolute inset-0 p-6 flex items-center">
                <div className="grid grid-cols-2 gap-4 w-full items-center">
                    <div className="space-y-3">
                        <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider", isLight ? "bg-slate-200 text-slate-600" : "bg-white/10 text-white/60")}>
                            <div className={cn("w-1.5 h-1.5 rounded-full", styles.dot)} />
                            Preview Ativo
                        </div>
                        <h4 className={cn("text-lg leading-tight", styles.heading)}>
                            {clinicName}
                        </h4>
                        <div className="flex gap-2">
                            <div className={cn("h-6 w-16", styles.button)} />
                            <div className={cn("h-6 w-6", styles.button)} />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div className={cn("w-full aspect-[4/3] relative overflow-hidden", styles.card)}>
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
                            <div className="absolute top-2 right-2 flex gap-1">
                                <div className="w-4 h-4 rounded-full bg-white/20" />
                                <div className="w-4 h-4 rounded-full bg-white/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Badge overlay */}
            <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-20 rotate-12 origin-top-right">
                    {templateId.replace('_', ' ')}
                </span>
            </div>
        </div>
    )
}
