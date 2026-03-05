'use client'

import { FAQSection as FAQType } from '@/types'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FAQProps {
    data: FAQType
    theme?: any
}

export default function FAQSection({ data, theme }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="section bg-white">
            <div className="container-narrow">
                <div className="text-center mb-16">
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] mb-4"
                        style={{ fontFamily: theme?.typography?.font_heading }}
                    >
                        {data.headline}
                    </h2>
                    <p className="text-[#475569]">Tire suas principais dúvidas sobre nossos atendimentos.</p>
                </div>

                <div className="space-y-3">
                    {data.items.map((item, i) => {
                        const isOpen = openIndex === i
                        return (
                            <div
                                key={i}
                                className={cn(
                                    "border rounded-2xl transition-all duration-200",
                                    isOpen ? "border-[#0D7C66] bg-[#0D7C66]/5" : "border-[#E2E8F0] hover:border-[#0D7C66]/30"
                                )}
                            >
                                <button
                                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                >
                                    <span className="font-bold text-[#0F172A] pr-4">{item.question}</span>
                                    {isOpen ? (
                                        <Minus className="w-5 h-5 text-[#0D7C66] shrink-0" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-[#94A3B8] shrink-0" />
                                    )}
                                </button>

                                <div className={cn(
                                    "overflow-hidden transition-all duration-300",
                                    isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
                                )}>
                                    <div className="px-6 text-[#475569] text-sm leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
