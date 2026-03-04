import { Layout, Sparkles, Building2, Heart } from 'lucide-react'

export const TEMPLATES = [
    {
        id: 'modern_minimal',
        label: 'Moderno & Minimalista',
        description: 'Design limpo, profissional, com muito espaço em branco e foco total no conteúdo.',
        vibe: 'Clean, professional, high-trust, minimalist.',
        primary_color: '#0D7C66',
        icon: Layout,
        features: ['Espaçamento amplo', 'Tipografia sem serifa', 'Foco em clareza']
    },
    {
        id: 'elegant_luxury',
        label: 'Elegante & Premium',
        description: 'Estilo sofisticado para clínicas de alto padrão. Usa fontes serifadas e detalhes refinados.',
        vibe: 'Sophisticated, luxurious, high-end, premium.',
        primary_color: '#1E293B',
        icon: Sparkles,
        features: ['Fontes serifadas', 'Cores sóbrias', 'Detalhes dourados/prateados']
    },
    {
        id: 'friendly_family',
        label: 'Acolhedor & Familiar',
        description: 'Ideal para pediatria e clínicas populares. Cores suaves, cantos arredondados e tom amigável.',
        vibe: 'Friendly, warm, safe, family-oriented.',
        primary_color: '#F43F5E',
        icon: Heart,
        features: ['Cantos arredondados', 'Cores quentes', 'Ícones amigáveis']
    },
    {
        id: 'clinical_high_tech',
        label: 'Clínico & Tecnológico',
        description: 'Foco em tecnologia e precisão diagnóstica. Design estruturado e tons de azul/ciano.',
        vibe: 'Technical, precise, futuristic, high-tech.',
        primary_color: '#0369A1',
        icon: Building2,
        features: ['Grades estruturadas', 'Tons azulados', 'Elementos tecnológicos']
    }
]

export type TemplateId = typeof TEMPLATES[number]['id']
