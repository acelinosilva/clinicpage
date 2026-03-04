import { BriefingData, LPSections, LPTheme, LPSEO } from '@/types'

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`

async function callGemini(prompt: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured')

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.8,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
            },
            safetySettings: [
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
            ],
        }),
    })

    if (!response.ok) {
        const err = await response.text()
        throw new Error(`Gemini API error: ${err}`)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    // Strip markdown code blocks if present
    return text.replace(/^```json\n?/i, '').replace(/\n?```$/i, '').trim()
}

const SYSTEM_PROMPT = `Você é um especialista em copywriting de alta conversão para clínicas e serviços de saúde no Brasil. Seu objetivo é gerar textos persuasivos, empáticos, éticos e otimizados para conversão. Respeite as diretrizes do CFM, CRO e demais conselhos profissionais de saúde. Nunca use linguagem de cura garantida. Sempre foque em benefícios reais e prova social. Retorne SOMENTE JSON válido, sem markdown, sem explicações adicionais.`

const TEMPLATE_STYLE_GUIDES: Record<string, string> = {
    modern_minimal: "Estilo Moderno e Minimalista: Use frases diretas, limpas e objetivas. Evite advérbios excessivos. Foco na clareza e transparência.",
    elegant_luxury: "Estilo Elegante e Premium: Use um vocabulário mais sofisticado e refinado. Destaque exclusividade, atendimento personalizado e excelência técnica. Use tons mais sóbrios e autoritários.",
    friendly_family: "Estilo Acolhedor e Familiar: Use uma linguagem calorosa, empática e protetora. Foco em segurança, carinho, cuidado e bem-estar da família. Use palavras que tragam conforto.",
    clinical_high_tech: "Estilo Clínico e Tecnológico: Foco em precisão, tecnologia de ponta, evidência científica e inovação. Use termos que remetam a modernidade, diagnóstico preciso e equipamentos avançados.",
    black_edition: "Estilo Black Edition: Use uma linguagem ousada, poderosa e exclusiva. Foco em transformação, resultados de alto impacto e luxo disruptivo. Use frases curtas e impactantes.",
    retro_classic: "Estilo Retro & Classic: Use uma linguagem rica, detalhada e nostálgica. Foco em tradição, confiança de longa data e cuidado atemporal. Use um tom caloroso e estabelecido."
}

export async function generateHeroSection(briefing: BriefingData) {
    const styleGuide = TEMPLATE_STYLE_GUIDES[briefing.template_id] || ""
    const prompt = `${SYSTEM_PROMPT} ${styleGuide}

Com base no briefing: Clínica "${briefing.clinic_name}", especialidade "${briefing.specialty}", cidade "${briefing.city}", serviço principal "${briefing.main_service}", benefício principal "${briefing.main_benefit}", diferenciais: ${briefing.differentials?.join(', ') || 'N/A'}.

Gere os textos do Hero seguindo estas regras:
1. HEADLINE: Deve ser impactante e usar uma estrutura de "Gancho + Benefício principal". Evite clichês como "Sua saúde em boas mãos". Seja específico para a especialidade. (Máx 12 palavras).
2. SUBHEADLINE: Deve detalhar como o serviço resolve a dor do paciente ou o que o torna único na cidade. Evite frases genéricas. (Máx 20 palavras).
3. CTA: Texto curto e direto ao ponto. (Máx 4 palavras).

Tom: ${briefing.tone_of_voice}.

Retorne JSON exatamente neste formato:
{"headline":"...","subheadline":"...","cta_primary_text":"...","urgency_text":"..."}`

    const raw = await callGemini(prompt)
    return JSON.parse(raw)
}

export async function generateProblemSolutionSection(briefing: BriefingData) {
    const styleGuide = TEMPLATE_STYLE_GUIDES[briefing.template_id] || ""
    const prompt = `${SYSTEM_PROMPT} ${styleGuide}

Analise as dores do paciente para a especialidade "${briefing.specialty}": ${briefing.pain_points?.join(', ') || 'dores comuns da área'}.

Gere o conteúdo da seção Problema e Solução:
1. PROBLEM_HEADLINE: Um título que ressoe com o sentimento de frustração ou dor do paciente (Máx 10 palavras).
2. PROBLEM_BODY: Um texto empático que descreva os desafios que o paciente enfrenta, mostrando que a clínica entende a situação dele (Máx 60 palavras).
3. SOLUTION_HEADLINE: Um título que traga esperança e apresente a clínica como a autoridade que resolve esses problemas (Máx 10 palavras).
4. SOLUTION_BODY: Um texto que descreva como o atendimento da "${briefing.clinic_name}" transforma a vida/saúde do paciente (Máx 60 palavras).
5. BENEFITS: Uma lista de 4 benefícios concretos e imediatos. Cada um deve ter um título curto, uma descrição de uma frase e um ícone Lucide apropriado.

Tom: ${briefing.tone_of_voice}.

Retorne JSON exatamente neste formato:
{"problem_headline":"...","problem_body":"...","solution_headline":"...","solution_body":"...","benefits":[{"icon":"LucideIconName","title":"...","description":"..."}]}`

    const raw = await callGemini(prompt)
    return JSON.parse(raw)
}

export async function generateServicesSection(briefing: BriefingData) {
    const styleGuide = TEMPLATE_STYLE_GUIDES[briefing.template_id] || ""
    const servicesList = [briefing.main_service, ...(briefing.other_services || [])].join(', ')
    const prompt = `${SYSTEM_PROMPT} ${styleGuide}

Para a clínica "${briefing.clinic_name}" com os serviços: ${servicesList}.

Gere headline da seção, subheadline e para cada serviço: nome otimizado, descrição persuasiva (máx 30 palavras) e ícone Lucide sugerido. Inclua até 6 serviços.

Retorne JSON:
{"headline":"...","subheadline":"...","services":[{"id":"s1","icon":"Stethoscope","name":"...","description":"...","cta_text":"Saiba mais"}]}`

    const raw = await callGemini(prompt)
    return JSON.parse(raw)
}

export async function generateAboutSection(briefing: BriefingData) {
    const styleGuide = TEMPLATE_STYLE_GUIDES[briefing.template_id] || ""
    const prompt = `${SYSTEM_PROMPT} ${styleGuide}

Para "${briefing.clinic_name}", especialidade "${briefing.specialty}", ${briefing.years_experience || 'vários'} anos de experiência, ${briefing.patients_served || 'centenas de'} pacientes atendidos.

Diferenciais: ${briefing.differentials?.join(', ') || 'atendimento humanizado'}.

Gere texto Sobre humanizado e profissional (máx 80 palavras) e lista de 3 diferenciais formatados.

Tom: ${briefing.tone_of_voice}.

Retorne JSON:
{"headline":"Sobre a Clínica","body":"...","differentials":["...","...","..."]}`

    const raw = await callGemini(prompt)
    return JSON.parse(raw)
}

export async function generateFAQSection(briefing: BriefingData) {
    const prompt = `${SYSTEM_PROMPT}

Para uma clínica de "${briefing.specialty}" com foco em "${briefing.main_service}".

Gere 6 perguntas frequentes realistas com respostas claras e tranquilizadoras (máx 50 palavras cada).

Retorne JSON:
{"headline":"Perguntas Frequentes","items":[{"question":"...","answer":"..."}]}`

    const raw = await callGemini(prompt)
    return JSON.parse(raw)
}

export async function generateCTAFormSection(briefing: BriefingData) {
    const prompt = `${SYSTEM_PROMPT}

Para "${briefing.clinic_name}", gere headline urgente e persuasiva para o CTA final (máx 10 palavras), subheadline de apoio (máx 20 palavras) e template de mensagem de WhatsApp pré-formatada.

Retorne JSON:
{"headline":"...","subheadline":"...","whatsapp_message_template":"Olá! Vi a página de vocês e quero agendar uma consulta para..."}`

    const raw = await callGemini(prompt)
    return JSON.parse(raw)
}

export async function generateSEOMeta(briefing: BriefingData) {
    const styleGuide = TEMPLATE_STYLE_GUIDES[briefing.template_id] || ""
    const prompt = `${SYSTEM_PROMPT} ${styleGuide}

Para "${briefing.clinic_name}", especialidade "${briefing.specialty}", cidade "${briefing.city}".

Gere: meta title SEO local (máx 60 chars), meta description (máx 155 chars), 5 palavras-chave primárias, slug URL amigável.

Retorne JSON:
{"meta_title":"...","meta_description":"...","keywords":["..."],"slug":"..."}`

    const raw = await callGemini(prompt)
    return JSON.parse(raw)
}

export async function generateFullLandingPage(briefing: BriefingData): Promise<{
    sections: Partial<LPSections>
    seo: Partial<LPSEO>
}> {
    const [hero, problemSolution, services, about, faq, ctaForm, seo] = await Promise.all([
        generateHeroSection(briefing),
        generateProblemSolutionSection(briefing),
        generateServicesSection(briefing),
        generateAboutSection(briefing),
        generateFAQSection(briefing),
        generateCTAFormSection(briefing),
        generateSEOMeta(briefing),
    ])

    const sections: Partial<LPSections> = {
        hero: {
            ...hero,
            cta_primary_type: briefing.primary_cta,
            cta_primary_value: briefing.whatsapp || briefing.cta_value || '',
            side_image_url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80",
            background_image_url: undefined,
            background_overlay_opacity: 0.5,
        },
        problem_solution: problemSolution,
        services: { ...services, layout: 'cards' },
        about: {
            ...about,
            show_team: false,
            team_members: [],
        },
        faq,
        cta_form: {
            ...ctaForm,
            form_fields: [
                { name: 'name', type: 'text', label: 'Seu nome', required: true },
                { name: 'phone', type: 'tel', label: 'Telefone / WhatsApp', required: true },
                { name: 'email', type: 'email', label: 'E-mail', required: false },
                { name: 'message', type: 'textarea', label: 'Mensagem (opcional)', required: false },
            ],
            submit_action: briefing.primary_cta === 'whatsapp' ? 'whatsapp' : 'email',
            submit_value: briefing.whatsapp || briefing.email || '',
            background_color: '#0D7C66',
        },
        map: {
            headline: "Nossa Localização",
            subheadline: "Venha nos visitar e conheça nossa estrutura",
            address_display: `${briefing.street || ''}${briefing.number ? `, ${briefing.number}` : ''}${briefing.complement ? ` - ${briefing.complement}` : ''}${briefing.neighborhood ? ` - ${briefing.neighborhood}` : ''}${briefing.city ? ` - ${briefing.city}` : ''}${briefing.state ? ` / ${briefing.state}` : ''}`,
            google_maps_embed_url: `https://maps.google.com/maps?q=${encodeURIComponent(`${briefing.street || ''} ${briefing.number || ''} ${briefing.neighborhood || ''} ${briefing.city || ''} ${briefing.state || ''}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
            show_map: !!briefing.street,
        },
        footer: {
            clinic_name: briefing.clinic_name,
            address: `${briefing.street || ''}${briefing.number ? `, ${briefing.number}` : ''}${briefing.neighborhood ? ` - ${briefing.neighborhood}` : ''}`,
            city: `${briefing.city || ''}${briefing.state ? ` - ${briefing.state}` : ''}`,
            phone: briefing.phone,
            whatsapp: briefing.whatsapp,
            email: briefing.email,
            working_hours: [
                { days: 'Segunda a Sexta', hours: '8h às 18h' },
                { days: 'Sábado', hours: '8h às 12h' },
            ],
            social_links: {},
            show_privacy_policy_link: true,
            show_cookie_banner: true,
            lgpd_compliant: true,
        },
    }

    return { sections, seo }
}
