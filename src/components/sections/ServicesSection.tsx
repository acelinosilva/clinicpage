"use client"

import { ServicesSection as ServicesType } from '@/types'
import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface ServicesProps {
    data: ServicesType
    theme?: any
}

export default function ServicesSection({ data, theme }: ServicesProps) {
    const isCards = data.layout === 'cards' || !data.layout
    const isList = data.layout === 'list'
    const templateId = theme?.template_id || 'modern_minimal'

    const allStyles = {
        modern_minimal: {
            card: "rounded-3xl border-2 hover:shadow-xl",
            icon: "rounded-2xl bg-[#0D7C66]/5 text-[#0D7C66]",
            heading: "font-black"
        },
        elegant_luxury: {
            card: "rounded-none border-b border-r border-[#E2E8F0] hover:bg-slate-50 shadow-none",
            icon: "rounded-none border-b border-[#0D7C66]/20 text-slate-800 bg-transparent",
            heading: "font-serif italic font-semibold"
        },
        friendly_family: {
            card: "rounded-[3rem] border-none bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all",
            icon: "rounded-full bg-rose-500/10 text-rose-600",
            heading: "font-bold"
        },
        clinical_high_tech: {
            card: "rounded-lg border-2 border-[#E2E8F0] bg-slate-50/50 hover:bg-white hover:border-blue-500/50",
            icon: "rounded-lg bg-blue-500 text-white",
            heading: "font-mono uppercase font-black tracking-tight"
        },
        black_edition: {
            card: "rounded-3xl border border-white/10 bg-neutral-900 text-white hover:border-emerald-500/50 shadow-[0_0_30px_rgba(0,0,0,0.5)]",
            icon: "rounded-2xl bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]",
            heading: "font-[900] uppercase tracking-tighter"
        },
        retro_classic: {
            card: "rounded-none border-4 border-[#4A3728] bg-[#FDF8F1] shadow-[8px_8px_0px_0px_#4A3728] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all",
            icon: "rounded-none border-2 border-[#4A3728] text-[#4A3728] bg-transparent",
            heading: "font-serif font-bold text-[#4A3728]"
        }
    }

    const styles = allStyles[templateId as keyof typeof allStyles] || allStyles.modern_minimal

    return (
        <section className="section bg-[#F8FAFC]">
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2
                        className="text-2xl sm:text-3xl md:text-5xl font-black text-[#0F172A] mb-4"
                        style={{ fontFamily: theme?.typography?.font_heading }}
                    >
                        {data.headline}
                    </h2>
                    <p className="text-[#475569] text-lg max-w-2xl mx-auto">
                        {data.subheadline}
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className={cn(
                        "grid gap-6",
                        isCards ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                    )}
                >
                    {data.services.map((service) => {
                        const IconName = service.icon as keyof typeof LucideIcons
                        const Icon = (LucideIcons[IconName] as any) || LucideIcons.Stethoscope

                        return (
                            <motion.div
                                key={service.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                className={cn(
                                    "p-8 transition-all duration-300",
                                    styles.card,
                                    isList && "flex flex-col md:flex-row items-center gap-6 text-left"
                                )}
                            >
                                <div className={cn(
                                    "w-14 h-14 flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 transition-all duration-300",
                                    styles.icon,
                                    isList && "mb-0"
                                )}>
                                    <Icon className="w-7 h-7" />
                                </div>

                                <div className="flex-1">
                                    <h3 className={cn(
                                        "text-xl mb-3 transition-colors",
                                        styles.heading,
                                        templateId === 'black_edition' ? 'text-white' : templateId === 'retro_classic' ? 'text-[#4A3728]' : '',
                                        templateId !== 'clinical_high_tech' && templateId !== 'black_edition' && templateId !== 'retro_classic' && "group-hover:text-[#0D7C66]"
                                    )}>
                                        {service.name}
                                    </h3>
                                    <p className={cn("text-sm leading-relaxed mb-6", templateId === 'black_edition' ? 'text-neutral-400' : templateId === 'retro_classic' ? 'text-[#4A3728]/70' : 'text-[#475569]')}>
                                        {service.description}
                                    </p>

                                    {service.cta_text && (
                                        <a
                                            href={service.cta_link || '#contato'}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-[#0D7C66] group/link"
                                        >
                                            {service.cta_text}
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
