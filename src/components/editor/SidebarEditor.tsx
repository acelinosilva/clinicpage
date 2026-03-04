'use client'

import { useEditorStore } from '@/store/editor-store'
import { LPSections } from '@/types'
import { cn } from '@/lib/utils'
import ImageUpload from './ImageUpload'

export default function SidebarEditor() {
    const { lp, activeSection, updateSection } = useEditorStore()

    if (!lp || !activeSection) return null

    const sectionData = lp.sections[activeSection] || (activeSection === 'map' ? {
        show_map: false,
        headline: 'Onde Estamos',
        subheadline: 'Visite nossa clínica',
        formatted_address: lp.briefing.address || 'Endereço não informado',
        google_maps_embed_url: ''
    } : null)

    if (!sectionData) return null

    const handleChange = (field: string, value: any) => {
        updateSection(activeSection, { [field]: value })
    }

    const handleServiceChange = (index: number, field: string, value: string) => {
        const services = [...(sectionData as any).services]
        services[index] = { ...services[index], [field]: value }
        handleChange('services', services)
    }

    const renderInput = (label: string, field: string, type: 'text' | 'textarea' = 'text') => {
        const value = (sectionData as any)[field] || ''
        return (
            <div className="space-y-1.5 mb-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">{label}</label>
                {type === 'textarea' ? (
                    <textarea
                        value={value}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#0D7C66] focus:ring-1 focus:ring-[#0D7C66] transition-all min-h-[80px] resize-y"
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#0D7C66] focus:ring-1 focus:ring-[#0D7C66] transition-all"
                    />
                )}
            </div>
        )
    }

    return (
        <div className="p-4 space-y-2 animate-in slide-in-from-right-2 duration-300">
            <h3 className="font-bold text-[#0F172A] mb-4 capitalize flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0D7C66]" />
                Editar: {activeSection.replace('_', ' ')}
            </h3>

            {activeSection === 'hero' && (
                <>
                    <ImageUpload
                        label="Imagem de Fundo (Preenche tudo)"
                        value={(sectionData as any).background_image_url}
                        onChange={(url) => handleChange('background_image_url', url)}
                        lpId={lp.id}
                    />
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Escurecer Imagem (Contraste)</label>
                            <span className="text-[10px] font-bold text-[#0D7C66]">{Math.round(((sectionData as any).background_overlay_opacity ?? 0.6) * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="0.9"
                            step="0.05"
                            value={(sectionData as any).background_overlay_opacity ?? 0.6}
                            onChange={(e) => handleChange('background_overlay_opacity', parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-[#F1F5F9] rounded-lg appearance-none cursor-pointer accent-[#0D7C66]"
                        />
                    </div>

                    <ImageUpload
                        label="Imagem Lateral (Destaque)"
                        value={(sectionData as any).side_image_url}
                        onChange={(url) => handleChange('side_image_url', url)}
                        lpId={lp.id}
                    />
                    {renderInput('Ou cole a URL da Imagem Lateral', 'side_image_url')}
                    {renderInput('Título Principal', 'headline', 'textarea')}
                    {renderInput('Subtítulo', 'subheadline', 'textarea')}
                    {renderInput('Texto do Botão', 'cta_primary_text')}
                    {renderInput('Texto de Urgência', 'urgency_text')}
                </>
            )}

            {activeSection === 'about' && (
                <>
                    <ImageUpload
                        label="Imagem Sobre a Clínica"
                        value={(sectionData as any).image_url}
                        onChange={(url) => handleChange('image_url', url)}
                        lpId={lp.id}
                    />
                    {renderInput('Ou cole a URL da Imagem', 'image_url')}
                    {renderInput('Título', 'headline')}
                    {renderInput('Texto Sobre', 'body', 'textarea')}
                </>
            )}

            {activeSection === 'problem_solution' && (
                <>
                    {renderInput('Título do Problema', 'problem_headline')}
                    {renderInput('Texto do Problema', 'problem_body', 'textarea')}
                    {renderInput('Título da Solução', 'solution_headline')}
                    {renderInput('Texto da Solução', 'solution_body', 'textarea')}
                </>
            )}

            {activeSection === 'services' && (
                <>
                    {renderInput('Título da Seção', 'headline')}
                    {renderInput('Subtítulo', 'subheadline', 'textarea')}

                    <div className="space-y-4 mt-6">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">Serviços Individuais</label>
                        {(sectionData as any).services?.map((service: any, index: number) => (
                            <div key={service.id || index} className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-[#64748B]">Serviço #{index + 1}</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-[#94A3B8] uppercase">Nome do Serviço</label>
                                        <input
                                            type="text"
                                            value={service.name}
                                            onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                                            className="w-full text-xs p-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-[#94A3B8] uppercase">Descrição</label>
                                        <textarea
                                            value={service.description}
                                            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                                            className="w-full text-xs p-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] min-h-[60px]"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-[#94A3B8] uppercase">Ícone (Nome Lucide)</label>
                                        <input
                                            type="text"
                                            value={service.icon}
                                            onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                                            className="w-full text-xs p-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]"
                                            placeholder="Ex: Stethoscope, Heart, Activity"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {activeSection === 'testimonials' && (
                <>
                    {renderInput('Título da Seção', 'headline')}
                </>
            )}

            {activeSection === 'faq' && (
                <>
                    {renderInput('Título da Seção', 'headline')}
                </>
            )}

            {activeSection === 'cta_form' && (
                <>
                    {renderInput('Título Principal', 'headline', 'textarea')}
                    {renderInput('Subtítulo', 'subheadline', 'textarea')}
                    {renderInput('Botão do Formulário', 'submit_value')}
                </>
            )}

            {activeSection === 'map' && (
                <>
                    <div className="flex items-center justify-between mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <label className="text-xs font-bold text-slate-700">Mostrar Mapa</label>
                        <button
                            onClick={() => handleChange('show_map', !(sectionData as any).show_map)}
                            className={cn(
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                                (sectionData as any).show_map ? "bg-[#0D7C66]" : "bg-slate-300"
                            )}
                        >
                            <span
                                className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    (sectionData as any).show_map ? "translate-x-6" : "translate-x-1"
                                )}
                            />
                        </button>
                    </div>
                    {renderInput('Título da Seção', 'headline')}
                    {renderInput('Subtítulo', 'subheadline', 'textarea')}
                    {renderInput('Endereço Formatado (Exibição)', 'address_display', 'textarea')}
                </>
            )}

            {activeSection === 'footer' && (
                <>
                    {renderInput('Nome da Clínica', 'clinic_name')}
                    {renderInput('Endereço', 'address', 'textarea')}
                    {renderInput('Cidade', 'city')}
                    {renderInput('Telefone', 'phone')}
                    {renderInput('WhatsApp', 'whatsapp')}
                    {renderInput('E-mail', 'email')}
                </>
            )}

            <p className="text-[10px] text-[#94A3B8] text-center mt-6 pt-4 border-t border-[#E2E8F0]">
                As alterações são salvas automaticamente no rascunho temporário. Clique em Salvar para gravar no banco.
            </p>
        </div>
    )
}
