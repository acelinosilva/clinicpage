"use client"

import { cn } from '@/lib/utils'

import { HeroSection as HeroType } from '@/types'
import { MessageSquare, Calendar, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeroProps {
    data: HeroType
    theme?: any
}

export default function HeroSection({ data, theme }: HeroProps) {
    const templateId = theme?.template_id || 'modern_minimal'

    const allStyles = {
        modern_minimal: {
            container: "rounded-[2rem]",
            heading: "font-[800] tracking-tight",
            button: "rounded-2xl",
            badge: "bg-emerald-500/10 text-emerald-600",
            overlay: "bg-[#0D7C66]/40"
        },
        elegant_luxury: {
            container: "rounded-none",
            heading: "font-serif italic font-[500] tracking-normal",
            button: "rounded-none border-b-2 border-gold-500",
            badge: "bg-white/5 text-slate-300 border-white/10",
            overlay: "bg-slate-900/70"
        },
        friendly_family: {
            container: "rounded-[4rem]",
            heading: "font-[700] tracking-normal",
            button: "rounded-full shadow-lg hover:shadow-xl",
            badge: "bg-rose-500/10 text-rose-600",
            overlay: "bg-rose-900/30"
        },
        clinical_high_tech: {
            container: "rounded-xl",
            heading: "font-mono font-[900] uppercase tracking-wider",
            button: "rounded-lg border-2",
            badge: "bg-blue-500/10 text-blue-600",
            overlay: "bg-slate-900/60"
        },
        black_edition: {
            container: "rounded-[2rem] border-emerald-500/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]",
            heading: "font-[900] tracking-tighter uppercase italic",
            button: "rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]",
            badge: "bg-emerald-500 text-black font-black",
            overlay: "bg-black/90",
            sectionBg: "bg-neutral-950"
        },
        retro_classic: {
            container: "rounded-none border-[12px] border-[#D4C3A3] shadow-none",
            heading: "font-serif font-[700] tracking-tight text-[#4A3728]",
            button: "rounded-sm bg-[#4A3728] text-[#FDF8F1] hover:bg-[#5D4632] shadow-none border-b-4 border-black/20",
            badge: "bg-[#D4C3A3] text-[#4A3728] border-[#4A3728]/20",
            overlay: "bg-[#FDF8F1]/40",
            sectionBg: "bg-[#FDF8F1]"
        }
    }

    const styles = allStyles[templateId as keyof typeof allStyles] || allStyles.modern_minimal

    return (
        <section
            className={cn("relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden", (styles as any).sectionBg)}
            style={{
                backgroundColor: (styles as any).sectionBg ? undefined : (theme?.colors?.primary || '#0D7C66'),
                fontFamily: theme?.typography?.font_body
            }}
        >
            {/* Full Background Image Layer */}
            {data.background_image_url && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src={data.background_image_url}
                        className="w-full h-full object-cover"
                        alt=""
                    />
                    <div
                        className="absolute inset-0 bg-black"
                        style={{ opacity: data.background_overlay_opacity ?? 0.6 }}
                    />
                </div>
            )}

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: templateId === 'black_edition' ? 0.05 : 0.1 }}
                    transition={{ duration: 2 }}
                    className={cn("absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[120px]", templateId === 'black_edition' ? 'bg-emerald-500' : 'bg-white')}
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className={cn("absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[100px]", templateId === 'black_edition' ? 'bg-emerald-900' : 'bg-[#13C4A1]')}
                />
            </div>

            <div className="container-wide relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={cn("text-center lg:text-left", templateId === 'retro_classic' ? 'text-[#4A3728]' : 'text-white')}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-6", styles.badge, templateId !== 'black_edition' && "border-white/20")}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", templateId === 'friendly_family' ? 'bg-rose-400' : templateId === 'black_edition' ? 'bg-black' : 'bg-[#13C4A1]')}></span>
                                <span className={cn("relative inline-flex rounded-full h-2 w-2", templateId === 'friendly_family' ? 'bg-rose-500' : templateId === 'black_edition' ? 'bg-black' : 'bg-[#13C4A1]')}></span>
                            </span>
                            Atendimento Prioritário
                        </motion.div>

                        <h1
                            className={cn("text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.1]", styles.heading)}
                            style={{ fontFamily: theme?.typography?.font_heading }}
                        >
                            {data.headline}
                        </h1>

                        <p className={cn("text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium", templateId === 'retro_classic' ? 'text-[#4A3728]/80' : 'text-white/80')}>
                            {data.subheadline}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <a
                                href={data.cta_primary_type === 'whatsapp' ? `https://wa.me/${data.cta_primary_value.replace(/\D/g, '')}` : data.cta_primary_value || '#contato'}
                                className={cn("btn btn-whatsapp btn-lg w-full sm:w-auto group", styles.button)}
                            >
                                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {data.cta_primary_text}
                            </a>
                            {data.cta_secondary_text && (
                                <a
                                    href="#servicos"
                                    className={cn(
                                        "btn btn-secondary btn-lg bg-transparent text-white hover:bg-white/10 w-full sm:w-auto",
                                        styles.button,
                                        templateId === 'retro_classic' ? "border-[#4A3728] text-[#4A3728] hover:bg-[#4A3728]/5" : "border-white/30 text-white"
                                    )}
                                >
                                    {data.cta_secondary_text}
                                    <ChevronRight className="w-4 h-4 opacity-50" />
                                </a>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                        className="relative hidden lg:block"
                    >
                        <div className={cn("relative z-10 overflow-hidden shadow-2xl border-[8px] border-white/10 aspect-[4/3]", styles.container)}>
                            <img
                                src={data.side_image_url || data.background_image_url || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80"}
                                alt="Clinica"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className={cn("absolute -top-6 -right-6 bg-white p-4 rounded-3xl shadow-xl z-20 flex items-center gap-3 border", templateId === 'friendly_family' ? 'border-rose-50' : 'border-emerald-50')}
                        >
                            <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", templateId === 'friendly_family' ? 'bg-rose-500/10' : 'bg-emerald-500/10')}>
                                <Calendar className={cn("w-5 h-5", templateId === 'friendly_family' ? 'text-rose-600' : 'text-emerald-600')} />
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Agendas</div>
                                <div className="text-sm font-black text-slate-800">Horários Livres</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
