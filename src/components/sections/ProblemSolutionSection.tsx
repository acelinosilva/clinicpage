"use client"

import { ProblemSolutionSection as PSType } from '@/types'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProblemSolutionProps {
    data: PSType
    theme?: any
}

export default function ProblemSolutionSection({ data, theme }: ProblemSolutionProps) {
    const templateId = theme?.template_id || 'modern_minimal'

    const allStyles = {
        modern_minimal: {
            problemBg: "bg-slate-50 rounded-[3rem] border-slate-100",
            solutionCard: "rounded-3xl border-2 border-[#E2E8F0] bg-white hover:border-emerald-100 hover:bg-emerald-50/10",
            iconProblem: "bg-red-100/50 text-red-500 rounded-2xl",
            iconSolution: "bg-emerald-500/10 text-emerald-600 rounded-2xl",
            heading: "font-black"
        },
        elegant_luxury: {
            problemBg: "bg-slate-900 text-white rounded-none border-none",
            solutionCard: "rounded-none border-b border-[#E2E8F0] bg-transparent hover:bg-slate-50 shadow-none",
            iconProblem: "bg-white/5 text-slate-300 rounded-none border border-white/10",
            iconSolution: "bg-transparent text-slate-800 rounded-none border-b border-[#0D7C66]/20",
            heading: "font-serif italic font-semibold"
        },
        friendly_family: {
            problemBg: "bg-rose-50 rounded-[4rem] border-rose-100",
            solutionCard: "rounded-[2.5rem] border-none bg-white shadow-md hover:shadow-xl transition-all",
            iconProblem: "bg-rose-100 text-rose-500 rounded-full",
            iconSolution: "bg-rose-500/10 text-rose-600 rounded-full",
            heading: "font-bold"
        },
        clinical_high_tech: {
            problemBg: "bg-slate-50 rounded-xl border-slate-200 border-2",
            solutionCard: "rounded-lg border-2 border-[#E2E8F0] bg-slate-50/50 hover:bg-white hover:border-blue-500/50",
            iconProblem: "bg-slate-200 text-slate-600 rounded-lg",
            iconSolution: "bg-blue-500 text-white rounded-lg",
            heading: "font-mono uppercase font-black tracking-tight"
        },
        black_edition: {
            problemBg: "bg-neutral-900 text-white rounded-[2rem] border-white/5",
            solutionCard: "rounded-[2rem] border border-white/10 bg-neutral-900 text-white hover:border-emerald-500/30",
            iconProblem: "bg-red-500 text-white rounded-xl",
            iconSolution: "bg-emerald-500 text-black rounded-xl",
            heading: "font-[900] uppercase tracking-tighter italic"
        },
        retro_classic: {
            problemBg: "bg-[#4A3728] text-[#FDF8F1] rounded-none border-none",
            solutionCard: "rounded-none border-4 border-[#4A3728] bg-[#FDF8F1] shadow-[6px_6px_0px_0px_#4A3728]",
            iconProblem: "bg-[#FDF8F1] text-[#4A3728] rounded-none border-2 border-[#4A3728]",
            iconSolution: "bg-[#D4C3A3] text-[#4A3728] rounded-none border-2 border-[#4A3728]",
            heading: "font-serif font-bold"
        }
    }

    const styles = allStyles[templateId as keyof typeof allStyles] || allStyles.modern_minimal

    return (
        <section className="section bg-white overflow-hidden">
            <div className="container-wide">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                    {/* Problem Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={cn("p-8 md:p-12 lg:p-16 relative overflow-hidden group transition-all duration-500 flex flex-col justify-center h-full", styles.problemBg)}
                    >
                        {templateId === 'modern_minimal' && <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />}

                        <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className={cn("w-14 h-14 flex items-center justify-center mb-8 shadow-sm", styles.iconProblem)}>
                                <AlertCircle className="w-7 h-7" />
                            </div>
                            <h2 className={cn("text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight", styles.heading, templateId === 'black_edition' || templateId === 'retro_classic' ? '' : 'text-slate-900')}>
                                {data.problem_headline}
                            </h2>
                            <p className={cn("text-lg md:text-xl leading-relaxed font-medium max-w-lg", templateId === 'black_edition' ? 'text-neutral-400' : templateId === 'retro_classic' ? 'text-[#FDF8F1]/80' : 'text-slate-600')}>
                                {data.problem_body}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center h-full pt-10 lg:pt-0 text-center lg:text-left"
                    >
                        <div>
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className={cn("badge mb-6 px-4 py-2 text-[10px] uppercase tracking-widest font-black inline-block", templateId === 'friendly_family' ? 'bg-rose-500/10 text-rose-600' : 'badge-green')}
                            >
                                A Solução Ideal
                            </motion.span>
                            <h2
                                className={cn("text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 mb-6 leading-[1.1]", styles.heading)}
                                style={{ fontFamily: theme?.typography?.font_heading }}
                            >
                                {data.solution_headline}
                            </h2>
                            <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                                {data.solution_body}
                            </p>
                        </div>

                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.15
                                    }
                                }
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        >
                            {data.benefits.map((benefit, i) => {
                                const IconName = benefit.icon as keyof typeof LucideIcons
                                const Icon = (LucideIcons[IconName] as any) || CheckCircle2

                                return (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            show: { opacity: 1, y: 0 }
                                        }}
                                        className={cn("p-6 transition-all", styles.solutionCard)}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className={cn("shrink-0 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all shadow-sm", styles.iconSolution)}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className={cn("text-slate-900 text-lg mb-2", styles.heading)}>{benefit.title}</h4>
                                                <p className="text-sm text-slate-500 leading-relaxed font-medium">{benefit.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
