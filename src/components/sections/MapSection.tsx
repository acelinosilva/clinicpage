"use client"

import { MapSection as MapType } from '@/types'
import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'

interface MapSectionProps {
    data: MapType
    theme?: any
}

export default function MapSection({ data, theme }: MapSectionProps) {
    if (!data.show_map || !data.google_maps_embed_url) return null

    return (
        <section className="section bg-slate-50 overflow-hidden">
            <div className="container-wide">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100"
                    >
                        <MapPin className="w-3 h-3" />
                        Onde Estamos
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight"
                        style={{ fontFamily: theme?.typography?.font_heading }}
                    >
                        {data.headline}
                    </motion.h2>
                    {data.subheadline && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-600 text-lg md:text-xl font-medium"
                        >
                            {data.subheadline}
                        </motion.p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-4 flex flex-col justify-center"
                    >
                        <div className="card-modern !p-8 !rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/50 border-slate-100">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                                <Navigation className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Endereço Completo</h3>
                            <p className="text-slate-600 leading-relaxed font-medium text-lg mb-8">
                                {data.address_display}
                            </p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address_display)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary btn w-full flex items-center justify-center gap-2"
                            >
                                <Navigation className="w-4 h-4" />
                                Abrir no GPS
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-8 min-h-[400px] lg:min-h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white"
                    >
                        <iframe
                            src={data.google_maps_embed_url}
                            className="w-full h-full min-h-[400px]"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
