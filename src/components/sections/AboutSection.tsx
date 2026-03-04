"use client"

import { AboutSection as AboutType } from '@/types'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface AboutProps {
    data: AboutType
    theme?: any
}

export default function AboutSection({ data, theme }: AboutProps) {
    return (
        <section className="section bg-white overflow-hidden">
            <div className="container-wide">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image/Team side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#F1F5F9] relative z-10 shadow-2xl border-8 border-white">
                            {data.image_url ? (
                                <img
                                    src={data.image_url}
                                    alt={data.headline}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0D7C66]/20 to-[#13C4A1]/20">
                                    <span className="text-6xl text-[#0D7C66]/30 font-black tracking-tighter">Clinic</span>
                                </div>
                            )}
                        </div>

                        {/* Decorative element */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -bottom-6 -left-6 w-32 h-32 gradient-brand rounded-3xl -z-0 opacity-20"
                        />
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#F97316] rounded-full -z-0 opacity-10 blur-[80px]" />
                    </motion.div>

                    {/* Text side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="badge badge-green mb-6 px-4 py-2 text-[10px] uppercase tracking-widest font-black">Sobre Nós</span>
                        <h2
                            className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8 leading-tight"
                            style={{ fontFamily: theme?.typography?.font_heading }}
                        >
                            {data.headline}
                        </h2>
                        <div className="prose prose-slate max-w-none text-lg text-[#475569] leading-relaxed mb-10 font-medium">
                            {data.body.split('\n').map((para, i) => (
                                <p key={i} className="mb-4">{para}</p>
                            ))}
                        </div>

                        {/* Differentials */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                            {data.differentials.map((diff, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/50"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#0D7C66] flex items-center justify-center shrink-0 shadow-sm">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <span className="font-extrabold text-[#0F172A] text-sm">{diff}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Team members if visible */}
                        {data.show_team && data.team_members.length > 0 && (
                            <div className="pt-10 border-t border-[#E2E8F0]">
                                <h4 className="font-black text-[#0F172A] text-sm uppercase tracking-wider mb-6">Nossa Equipe</h4>
                                <div className="flex flex-wrap gap-6">
                                    {data.team_members.map((member, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -5 }}
                                            className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-slate-100"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] overflow-hidden border-2 border-slate-50 shadow-sm">
                                                {member.photo_url ? (
                                                    <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center font-black text-lg text-[#0D7C66] bg-[#0D7C66]/5">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-[#0F172A]">{member.name}</div>
                                                <div className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8]">{member.role}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
