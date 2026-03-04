export type LandingPageStatus = 'draft' | 'published' | 'archived' | 'paused'
export type LeadStatus = 'new' | 'contacted' | 'scheduled' | 'converted' | 'lost'
export type DeviceType = 'desktop' | 'mobile' | 'tablet'
export type AnalyticsEventType =
    | 'pageview'
    | 'cta_click'
    | 'form_submit'
    | 'whatsapp_click'
    | 'phone_click'
    | 'scroll_50'
    | 'scroll_100'
    | 'time_on_page'

export type ToneOfVoice =
    | 'professional_warm'
    | 'modern_dynamic'
    | 'scientific_reliable'
    | 'friendly_casual'

export type CTAType = 'whatsapp' | 'phone' | 'form' | 'external_booking' | 'form_scroll' | 'external_link'
export type TemplateId = 'modern_minimal' | 'elegant_luxury' | 'friendly_family' | 'clinical_high_tech' | 'black_edition' | 'retro_classic' | 'universal-modern'

// ─── Sections ────────────────────────────────────────────────────────────────

export interface HeroSection {
    headline: string
    subheadline: string
    cta_primary_text: string
    cta_primary_type: CTAType
    cta_primary_value: string
    cta_secondary_text?: string
    urgency_text?: string
    background_image_url?: string
    side_image_url?: string
    background_overlay_opacity: number
}

export interface SocialProofBarItem {
    icon: string
    value: string
    label: string
}

export interface SocialProofBarSection {
    items: SocialProofBarItem[]
    show_certifications: boolean
    certification_logos: string[]
}

export interface BenefitItem {
    icon: string
    title: string
    description: string
}

export interface ProblemSolutionSection {
    problem_headline: string
    problem_body: string
    solution_headline: string
    solution_body: string
    benefits: BenefitItem[]
}

export interface ServiceItem {
    id: string
    icon: string
    name: string
    description: string
    cta_text: string
    cta_link?: string
}

export interface ServicesSection {
    headline: string
    subheadline: string
    layout: 'grid' | 'list' | 'cards'
    services: ServiceItem[]
}

export interface TeamMember {
    name: string
    role: string
    council_registration?: string
    photo_url?: string
    bio: string
}

export interface AboutSection {
    headline: string
    body: string
    image_url?: string
    show_team: boolean
    team_members: TeamMember[]
    differentials: string[]
}

export interface Testimonial {
    author_name: string
    author_photo_url?: string
    rating: number
    text: string
    date?: string
}

export interface TestimonialsSection {
    headline: string
    layout: 'carousel' | 'grid'
    show_google_rating: boolean
    google_place_id?: string
    google_rating?: number
    total_reviews?: number
    testimonials: Testimonial[]
}

export interface FAQItem {
    question: string
    answer: string
}

export interface FAQSection {
    headline: string
    items: FAQItem[]
}

export interface FormField {
    name: string
    type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
    label: string
    required: boolean
}

export interface CTAFormSection {
    headline: string
    subheadline: string
    form_fields: FormField[]
    submit_action: 'email' | 'whatsapp' | 'webhook'
    submit_value: string
    whatsapp_message_template?: string
    notification_email?: string
    background_color: string
}

export interface MapSection {
    headline: string
    subheadline?: string
    address_display: string
    google_maps_embed_url: string
    show_map: boolean
}

export interface WorkingHours {
    days: string
    hours: string
}

export interface SocialLinks {
    instagram?: string
    facebook?: string
    youtube?: string
    linkedin?: string
}

export interface FooterSection {
    clinic_name: string
    address?: string
    city?: string
    phone?: string
    whatsapp?: string
    email?: string
    working_hours: WorkingHours[]
    google_maps_embed_url?: string
    social_links: SocialLinks
    show_privacy_policy_link: boolean
    show_cookie_banner: boolean
    lgpd_compliant: boolean
}

export interface LPSections {
    hero: HeroSection
    social_proof_bar?: SocialProofBarSection
    problem_solution?: ProblemSolutionSection
    services?: ServicesSection
    about?: AboutSection
    testimonials?: TestimonialsSection
    faq?: FAQSection
    cta_form?: CTAFormSection
    map?: MapSection
    footer: FooterSection
}

// ─── Theme ────────────────────────────────────────────────────────────────────

export interface LPTheme {
    colors: {
        primary: string
        primary_dark: string
        secondary: string
        background: string
        surface: string
        text_primary: string
        text_secondary: string
        cta_button: string
        cta_button_text: string
    }
    typography: {
        font_heading: string
        font_body: string
        base_size_px: number
    }
    border_radius: 'none' | 'small' | 'medium' | 'large' | 'full'
    template_id?: TemplateId
    spacing: 'compact' | 'normal' | 'spacious'
    button_style: 'filled' | 'outlined' | 'ghost'
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export interface LPSEO {
    meta_title: string
    meta_description: string
    keywords: string[]
    og_image_url?: string
    schema_type?: string
}

// ─── Integrations ────────────────────────────────────────────────────────────

export interface LPIntegrations {
    whatsapp_phone?: string
    whatsapp_message_template?: string
    ga4_measurement_id?: string
    meta_pixel_id?: string
    gtm_container_id?: string
    webhook_url?: string
    rd_station_api_key?: string
    doctoralia_url?: string
    google_maps_embed_url?: string
}

// ─── Full Landing Page ────────────────────────────────────────────────────────

export interface LandingPage {
    id: string
    user_id: string
    title: string
    slug: string
    status: LandingPageStatus
    template_id: string
    briefing: BriefingData
    sections: LPSections
    theme: LPTheme
    seo: LPSEO
    integrations: LPIntegrations
    custom_domain?: string
    published_at?: string
    created_at: string
    updated_at: string
}

// ─── Briefing ────────────────────────────────────────────────────────────────

export interface BriefingData {
    // Step 1
    clinic_name: string
    specialty: string
    secondary_specialties?: string[]
    city: string
    years_experience?: number
    patients_served?: number
    // Step 2
    main_service: string
    other_services?: string[]
    main_benefit: string
    differentials?: string[]
    // Step 3
    target_audience?: string
    tone_of_voice: ToneOfVoice
    pain_points?: string[]
    // Step 4
    whatsapp: string
    phone?: string
    email?: string
    address?: string
    street?: string
    number?: string
    complement?: string
    neighborhood?: string
    zip_code?: string
    state?: string
    primary_cta: CTAType
    cta_value?: string
    // Step 5
    template_id: TemplateId
    primary_color?: string
    logo_url?: string
}

// ─── Lead ─────────────────────────────────────────────────────────────────────

export interface Lead {
    id: string
    landing_page_id: string
    name: string
    phone: string
    email?: string
    message?: string
    preferred_time?: string
    source: string
    status: LeadStatus
    created_at: string
}

// ─── Specialty ───────────────────────────────────────────────────────────────

export interface Specialty {
    id: string
    label: string
    icon: string
}

export const SPECIALTIES: Specialty[] = [
    { id: 'odontologia', label: 'Odontologia', icon: 'tooth' },
    { id: 'estetica', label: 'Estética e Beleza', icon: 'sparkles' },
    { id: 'psicologia', label: 'Psicologia e Saúde Mental', icon: 'brain' },
    { id: 'nutricao', label: 'Nutrição', icon: 'salad' },
    { id: 'fisioterapia', label: 'Fisioterapia', icon: 'activity' },
    { id: 'dermatologia', label: 'Dermatologia', icon: 'sun' },
    { id: 'ortopedia', label: 'Ortopedia', icon: 'bone' },
    { id: 'ginecologia', label: 'Ginecologia e Obstetrícia', icon: 'heart' },
    { id: 'pediatria', label: 'Pediatria', icon: 'baby' },
    { id: 'cardiologia', label: 'Cardiologia', icon: 'heartpulse' },
    { id: 'oftalmologia', label: 'Oftalmologia', icon: 'eye' },
    { id: 'veterinaria', label: 'Veterinária', icon: 'paw' },
    { id: 'quiropraxia', label: 'Quiropraxia', icon: 'zap' },
    { id: 'acupuntura', label: 'Acupuntura e Medicina Integrativa', icon: 'needle' },
    { id: 'clinica_geral', label: 'Clínica Geral', icon: 'stethoscope' },
    { id: 'outro', label: 'Outro', icon: 'plus' },
]

export const TEMPLATES = [
    {
        id: 'modern_minimal',
        name: 'Moderno & Minimalista',
        description: 'Design limpo, profissional, com muito espaço em branco.',
        category: 'Clean',
        is_premium: false,
        vibe: 'Clean, professional, high-trust, minimalist.'
    },
    {
        id: 'elegant_luxury',
        name: 'Elegante & Premium',
        description: 'Estilo sofisticado com fontes serifadas e detalhes refinados.',
        category: 'Premium',
        is_premium: true,
        vibe: 'Sophisticated, luxurious, high-end, premium.'
    },
    {
        id: 'friendly_family',
        name: 'Acolhedor & Familiar',
        description: 'Ideal para pediatria e clínicas familiares. Tons suaves.',
        category: 'Warm',
        is_premium: false,
        vibe: 'Friendly, warm, safe, family-oriented.'
    },
    {
        id: 'clinical_high_tech',
        name: 'Clínico & Tecnológico',
        description: 'Foco em tecnologia e precisão diagnóstica.',
        category: 'Technical',
        is_premium: false,
        vibe: 'Technical, precise, futuristic, high-tech.'
    },
    {
        id: 'black_edition',
        name: 'Black Edition',
        description: 'Design escuro, elegante e de alto impacto. Premium e disruptivo.',
        category: 'Dark',
        is_premium: true,
        vibe: 'Sleek, dark, high-contrast, bold, luxurious.'
    },
    {
        id: 'retro_classic',
        name: 'Retro & Classic',
        description: 'Estilo vintage e nostálgico com um toque moderno e confiável.',
        category: 'Vintage',
        is_premium: true,
        vibe: 'Nostalgic, warm, traditional, trustworthy, classic.'
    }
]
