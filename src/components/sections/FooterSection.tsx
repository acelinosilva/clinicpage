"use client"

import { FooterSection as FooterType } from '@/types'
import { MapPin, Phone, MessageSquare, Mail, Instagram, Facebook, Youtube, Linkedin, Stethoscope } from 'lucide-react'
import { motion } from 'framer-motion'

interface FooterProps {
    data: FooterType
    theme?: any
}

export default function FooterSection({ data, theme }: FooterProps) {
    const currentYear = new Date().getFullYear()

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white border-t border-[#E2E8F0] pt-16 pb-8"
        >
            <div className="container-wide">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
                >
                    {/* Clinic Brand */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="col-span-1 lg:col-span-1"
                    >
                        <div className="flex items-center gap-2 font-black text-xl mb-6">
                            <span
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                                style={{ backgroundColor: theme?.colors?.primary || '#0D7C66' }}
                            >
                                <Stethoscope className="w-5 h-5" />
                            </span>
                            <span className="text-[#0F172A]">{data.clinic_name}</span>
                        </div>

                        <div className="space-y-4">
                            {data.address && (
                                <div className="flex items-start gap-3 text-sm text-[#475569] font-medium">
                                    <MapPin className="w-5 h-5 text-[#94A3B8] shrink-0" />
                                    <p>{data.address}{data.city && `, ${data.city}`}</p>
                                </div>
                            )}
                            {data.phone && (
                                <div className="flex items-center gap-3 text-sm text-[#475569] font-medium">
                                    <Phone className="w-5 h-5 text-[#94A3B8] shrink-0" />
                                    <p>{data.phone}</p>
                                </div>
                            )}
                            {data.whatsapp && (
                                <div className="flex items-center gap-3 text-sm text-[#475569] font-medium">
                                    <MessageSquare className="w-5 h-5 text-[#94A3B8] shrink-0" />
                                    <p>{data.whatsapp}</p>
                                </div>
                            )}
                            {data.email && (
                                <div className="flex items-center gap-3 text-sm text-[#475569] font-medium">
                                    <Mail className="w-5 h-5 text-[#94A3B8] shrink-0" />
                                    <p className="break-all">{data.email}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Working Hours */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                    >
                        <h4 className="font-black text-[#0F172A] text-sm uppercase tracking-wider mb-6">Atendimento</h4>
                        <div className="space-y-3">
                            {data.working_hours.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8] font-bold uppercase text-[10px] tracking-wide">{item.days}</span>
                                    <span className="font-black text-[#475569]">{item.hours}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Social & Maps */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                    >
                        <h4 className="font-black text-[#0F172A] text-sm uppercase tracking-wider mb-6">Siga-nos</h4>
                        <div className="flex gap-4">
                            {data.social_links.instagram && (
                                <a href={data.social_links.instagram} className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#475569] hover:bg-[#0D7C66] hover:text-white hover:shadow-lg transition-all border border-slate-100">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {data.social_links.facebook && (
                                <a href={data.social_links.facebook} className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#475569] hover:bg-[#0D7C66] hover:text-white hover:shadow-lg transition-all border border-slate-100">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                            {data.social_links.youtube && (
                                <a href={data.social_links.youtube} className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#475569] hover:bg-[#0D7C66] hover:text-white hover:shadow-lg transition-all border border-slate-100">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            )}
                            {data.social_links.linkedin && (
                                <a href={data.social_links.linkedin} className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#475569] hover:bg-[#0D7C66] hover:text-white hover:shadow-lg transition-all border border-slate-100">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Map Embed or CTA */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            show: { opacity: 1, scale: 1 }
                        }}
                        className="bg-[#F8FAFC] rounded-[2rem] p-4 overflow-hidden h-44 relative border border-slate-100 shadow-inner"
                    >
                        {data.google_maps_embed_url ? (
                            <iframe
                                src={data.google_maps_embed_url}
                                className="absolute inset-0 w-full h-full grayscale border-0"
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <MapPin className="w-8 h-8 text-[#CBD5E1] mb-2" />
                                <span className="text-xs text-[#94A3B8] font-bold uppercase tracking-widest">Mapa não disponível</span>
                            </div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Bottom bar */}
                <div className="border-t border-[#E2E8F0] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-xs text-[#94A3B8]">
                        © {currentYear} {data.clinic_name}. Todos os direitos reservados.
                    </div>

                    <div className="flex gap-6 text-xs font-semibold text-[#475569]">
                        {data.show_privacy_policy_link && <a href="/privacidade" className="hover:text-[#0D7C66]">Política de Privacidade</a>}
                        {data.lgpd_compliant && <span className="text-[#0D7C66] flex items-center gap-1">✓ LGPD Compliant</span>}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">
                        Desenvolvido por
                        <a href="https://clinicpage.com.br" className="text-[#0D7C66] hover:underline">ClinicPage</a>
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}
