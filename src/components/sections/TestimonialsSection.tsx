"use client"

import { TestimonialsSection as TestimonialsType } from '@/types'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface TestimonialsProps {
    data: TestimonialsType
    theme?: any
}

export default function TestimonialsSection({ data, theme }: TestimonialsProps) {
    const isGrid = data.layout === 'grid' || !data.layout

    return (
        <section className="section bg-[#F8FAFC] overflow-hidden">
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2
                        className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4"
                        style={{ fontFamily: theme?.typography?.font_heading }}
                    >
                        {data.headline}
                    </h2>

                    {data.show_google_rating && data.google_rating && (
                        <div className="flex items-center justify-center gap-3 mt-6">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "w-5 h-5",
                                            i < Math.floor(data.google_rating!) ? "fill-amber-400 text-amber-400" : "text-[#CBD5E1]"
                                        )}
                                    />
                                ))}
                            </div>
                            <div className="flex flex-col items-start leading-none">
                                <span className="font-black text-[#0F172A] text-lg">{data.google_rating}</span>
                                <span className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider">Google Reviews</span>
                            </div>
                        </div>
                    )}
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
                                staggerChildren: 0.15
                            }
                        }
                    }}
                    className={cn(
                        "grid gap-8",
                        isGrid ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-3xl mx-auto"
                    )}
                >
                    {data.testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, scale: 0.95, y: 20 },
                                show: { opacity: 1, scale: 1, y: 0 }
                            }}
                            className="card-modern bg-white relative pt-16 group"
                        >
                            <div className="absolute top-8 left-8 text-[#0D7C66]/10 group-hover:text-[#0D7C66]/20 transition-colors">
                                <Quote className="w-12 h-12 fill-current" />
                            </div>

                            <div className="flex gap-0.5 mb-6 relative">
                                {[...Array(5)].map((_, j) => (
                                    <Star
                                        key={j}
                                        className={cn(
                                            "w-4 h-4",
                                            j < t.rating ? "fill-amber-400 text-amber-400" : "text-[#E2E8F0]"
                                        )}
                                    />
                                ))}
                            </div>

                            <p className="text-[#334155] text-base leading-relaxed mb-8 italic relative">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                                    {t.author_photo_url ? (
                                        <img src={t.author_photo_url} alt={t.author_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center font-black text-lg text-[#0D7C66] bg-[#0D7C66]/5">
                                            {t.author_name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="leading-tight">
                                    <div className="font-black text-sm text-[#0F172A]">{t.author_name}</div>
                                    {t.date && <div className="text-[10px] uppercase tracking-wider font-bold text-[#94A3B8] mt-1">{t.date}</div>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
