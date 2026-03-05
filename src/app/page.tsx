import Link from 'next/link'
import {
  Sparkles, Stethoscope, Zap, Shield, Users,
  ArrowRight, CheckCircle2, MessageSquare, PlayCircle, Palette,
  Smartphone, LayoutDashboard, BarChart3, Search,
  Clock, Wand2, Rocket, HelpCircle, Check, X
} from 'lucide-react'
import PublicHeader from '@/components/shared/PublicHeader'
import PublicFooter from '@/components/shared/PublicFooter'
import { CheckoutButton } from '@/components/shared/CheckoutButton'
import { cn } from '@/lib/utils'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ClinicPage',
    operatingSystem: 'Web',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'BRL',
    },
    description: 'Gerador de landing page para clinicas grátis e premium com recursos de inteligência artificial para médicos e centros de saúde.'
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Preciso ter conhecimentos técnicos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutamente não. Nossa IA cuida de toda a parte técnica, desde o código até o design. Você só precisa preencher os dados da sua clínica.'
        }
      },
      {
        '@type': 'Question',
        name: 'Posso usar meu próprio domínio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim! Nos planos Profissional e Clínica Plus você pode conectar o seu domínio (ex: www.suaclinica.com.br) facilmente.'
        }
      },
      {
        '@type': 'Question',
        name: 'Como recebo os contatos dos pacientes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A maioria das landing pages foca em converter o paciente no WhatsApp. Você receberá as mensagens direto no número configurado.'
        }
      },
      {
        '@type': 'Question',
        name: 'E se eu quiser alterar alguma coisa depois?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Temos um editor visual intuitivo onde você pode trocar textos, cores e imagens a qualquer momento com poucos cliques.'
        }
      }
    ]
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden gradient-soft">
          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center text-center gap-2 bg-[#0D7C66]/10 border border-[#0D7C66]/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold text-[#0D7C66] mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Inteligência Artificial para Clínicas e Consultórios</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#0F172A] mb-6 leading-tight animate-slide-up">
                Sua clínica merece uma <br className="hidden md:block" />
                <span className="text-[#0D7C66]">Landing Page de Elite</span>
              </h1>

              <p className="text-xl text-[#475569] mb-10 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
                Geramos páginas de alta conversão para médicos, dentistas e especialistas em menos de 8 minutos usando IA de última geração.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up [animation-delay:400ms]">
                <Link href="/cadastro" className="btn-primary btn-lg btn w-full sm:w-auto">
                  Criar minha página grátis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#como-funciona" className="btn-secondary btn-lg btn w-full sm:w-auto text-[#0D7C66]">
                  <PlayCircle className="w-5 h-5" />
                  Ver como funciona
                </Link>
              </div>
            </div>
          </div>

        </section>

        {/* Dashboard Showcase Section */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4 tracking-tight">
                Tudo o que você precisa <br /> em um só lugar
              </h2>
              <p className="text-[#475569] text-lg">
                Uma plataforma completa pensada para a rotina de profissionais de saúde.
              </p>
            </div>

            <div className="space-y-24">
              {/* Feature 1: Briefing */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 bg-[#0D7C66]/10 text-[#0D7C66] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                    <Sparkles className="w-4 h-4" />
                    Briefing Inteligente
                  </div>
                  <h3 className="text-3xl font-black text-[#0F172A] mb-6 leading-tight">
                    A IA que entende de saúde <br /> trabalha para você
                  </h3>
                  <p className="text-lg text-[#475569] mb-8 leading-relaxed">
                    Conte-nos sobre sua clínica em poucos cliques. Nossa interface intuitiva capta os detalhes essenciais para que a IA gere conteúdos que convertem.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Captação rápida de especialidade e diferenciais',
                      'Interface focada em usabilidade médica',
                      'Fluxo guiado passo a passo'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[#475569]">
                        <CheckCircle2 className="w-5 h-5 text-[#0D7C66]" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 lg:order-2 relative group">
                  <div className="absolute -inset-4 bg-[#0D7C66]/5 rounded-[2.5rem] blur-2xl group-hover:bg-[#0D7C66]/10 transition-all duration-500" />
                  <div className="relative rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-2xl bg-[#F8FAFC]">
                    <img
                      src="/screenshots/briefing_name.jpg"
                      alt="Briefing Name Step"
                      className="w-full aspect-video object-cover object-left-top"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 2: Template Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-[#0D7C66]/5 rounded-[2.5rem] blur-2xl group-hover:bg-[#0D7C66]/10 transition-all duration-500" />
                  <div className="relative rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-2xl bg-[#F8FAFC]">
                    <img
                      src="/screenshots/template_selection.jpg"
                      alt="Template Selection with Preview"
                      className="w-full aspect-video object-cover object-left-top"
                    />
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#0D7C66]/10 text-[#0D7C66] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                    <Palette className="w-4 h-4" />
                    Design de Elite
                  </div>
                  <h3 className="text-3xl font-black text-[#0F172A] mb-6 leading-tight">
                    Escolha o estilo que <br /> mais combina com você
                  </h3>
                  <p className="text-lg text-[#475569] mb-8 leading-relaxed">
                    Selecione entre diversos templates premium, do Moderno ao Retro, com visualização em tempo real da sua escolha.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Prévia em tempo real das cores e fontes',
                      'Modelos premium como Black Edition',
                      'Design otimizado para alta conversão'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[#475569]">
                        <CheckCircle2 className="w-5 h-5 text-[#0D7C66]" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Feature 3: Editor */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 bg-[#0D7C66]/10 text-[#0D7C66] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                    <LayoutDashboard className="w-4 h-4" />
                    Editor de Seções
                  </div>
                  <h3 className="text-3xl font-black text-[#0F172A] mb-6 leading-tight">
                    Controle total sobre <br /> cada detalhe da sua página
                  </h3>
                  <p className="text-lg text-[#475569] mb-8 leading-relaxed">
                    Nosso editor permite trocar textos, imagens e configurar seções inteiras de forma visual e simples, sem complicações.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Edição de texto assistida por IA',
                      'Troca rápida de imagens e planos de fundo',
                      'Ajuste fino de contrastes e cores'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[#475569]">
                        <CheckCircle2 className="w-5 h-5 text-[#0D7C66]" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 lg:order-2 relative group">
                  <div className="absolute -inset-4 bg-[#0D7C66]/5 rounded-[2.5rem] blur-2xl group-hover:bg-[#0D7C66]/10 transition-all duration-500" />
                  <div className="relative rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-2xl bg-[#F8FAFC]">
                    <img
                      src="/screenshots/editor.jpg"
                      alt="Editor de Seções ClinicPage"
                      className="w-full aspect-video object-cover object-left-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12 border-y border-[#E2E8F0] bg-white">
          <div className="container-wide">
            <p className="text-center text-xs font-black uppercase tracking-widest text-[#94A3B8] mb-8">
              CONFIADO POR MAIS DE 500 PROFISSIONAIS NO BRASIL
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale">
              <span className="text-xl font-bold">OdontoCompany</span>
              <span className="text-xl font-bold">Sorridents</span>
              <span className="text-xl font-bold">Prevent Senior</span>
              <span className="text-xl font-bold">Hospital Israelita</span>
              <span className="text-xl font-bold">Dr. Consulta</span>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="como-funciona" className="section bg-white scroll-mt-20">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4">Como funciona?</h2>
              <p className="text-[#475569] text-lg">Em apenas 3 passos simples você tem sua clínica online pronta para atrair pacientes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#0D7C66]/20 to-transparent -translate-y-1/2" />

              {[
                {
                  step: '01',
                  title: 'Preencha o Briefing',
                  desc: 'Conte-nos sobre sua especialidade, serviços e o que torna sua clínica única.',
                  icon: MessageSquare
                },
                {
                  step: '02',
                  title: 'IA Gera o Conteúdo',
                  desc: 'Nossa IA cria textos persuasivos, imagens e toda a estrutura otimizada.',
                  icon: Wand2
                },
                {
                  step: '03',
                  title: 'Publique e Receba Leads',
                  desc: 'Sua página entra no ar e os pacientes começam a te chamar no WhatsApp.',
                  icon: Rocket
                },
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#E2E8F0] flex items-center justify-center mb-6 shadow-sm group-hover:border-[#0D7C66] transition-colors">
                    <item.icon className="w-8 h-8 text-[#0D7C66]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D7C66] mb-2">{item.step}</span>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{item.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features/Benefits Section */}
        <section id="recursos" className="section bg-[#F8FAFC]">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4">Tecnologia que converte</h2>
              <p className="text-[#475569] text-lg">Deixe o trabalho pesado conosco e foque no que importa: seus pacientes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Copywriting com IA', desc: 'Textos escritos por nossa IA treinada em gatilhos mentais da área da saúde.', icon: Zap },
                { title: 'Otimizado para Mobile', desc: 'Sua página carrega em menos de 2 segundos em qualquer smartphone.', icon: Smartphone },
                { title: 'Gestão de Leads', desc: 'Receba notificações de novos contatos direto no seu painel ou WhatsApp.', icon: Users },
                { title: 'SEO Local de Elite', desc: 'Apareça para quem busca por sua especialidade na sua cidade.', icon: Search },
                { title: 'Editor Visual Drag & Drop', desc: 'Altere qualquer detalhe da sua página sem precisar de um designer.', icon: LayoutDashboard },
                { title: 'Segurança & Velocidade', desc: 'Hospedagem inclusa com SSL e performance excepcional.', icon: Shield },
              ].map((f, i) => (
                <div key={i} className="card bg-white group hover:border-[#0D7C66]/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/5 flex items-center justify-center mb-6 text-[#0D7C66] group-hover:bg-[#0D7C66] group-hover:text-white transition-colors">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{f.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="precos" className="section bg-white scroll-mt-20">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4">Planos que cabem no seu bolso</h2>
              <p className="text-[#475569] text-lg">Comece gratuitamente e evolua conforme sua clínica cresce.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  id: 'free',
                  name: 'Iniciante',
                  price: '0',
                  desc: 'Para quem está começando seu consultório.',
                  features: [
                    '1 Landing Page com IA',
                    'Modelos Básicos de Design',
                    'Domínio .clinicpage.com.br',
                    'Com marca d\'água ClinicPage'
                  ],
                  cta: 'Começar Grátis',
                  popular: false
                },
                {
                  id: 'pro',
                  name: 'Profissional',
                  price: '85',
                  desc: 'O essencial para quem quer escalar resultados.',
                  features: [
                    'Até 3 Landing Pages',
                    'Todos os Templates Premium',
                    'Integração com WhatsApp',
                    'Domínio Personalizado',
                    'Remover Marca ClinicPage'
                  ],
                  cta: 'Experimentar Pro',
                  popular: true
                },
                {
                  id: 'clinic',
                  name: 'Clínica Plus',
                  price: '185',
                  desc: 'Poder total para clínicas e redes médicas.',
                  features: [
                    'Landing Pages Ilimitadas',
                    'Múltiplos Domínios Personalizados',
                    'Integração Pixel (FB/Google)',
                    'SEO Local de Elite Avançado',
                    'Suporte Prioritário VIP'
                  ],
                  cta: 'Assinar Plus',
                  popular: false
                }
              ].map((plan, i) => (
                <div key={i} className={cn(
                  "relative flex flex-col p-8 rounded-3xl border transition-all duration-300",
                  plan.popular
                    ? "border-[#0D7C66] bg-white shadow-2xl scale-105 z-10"
                    : "border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0D7C66]/30"
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#0D7C66] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                      MAIS POPULAR
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{plan.name}</h3>
                  <p className="text-[#475569] text-sm mb-6">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-black text-[#0F172A]">R$ {plan.price}</span>
                    <span className="text-[#94A3B8] font-medium">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3 text-sm text-[#475569]">
                        <Check className="w-5 h-5 text-[#0D7C66] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {plan.id === 'free' ? (
                    <Link
                      href="/cadastro"
                      className="btn w-full font-bold btn-secondary"
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <CheckoutButton planId={plan.id} cta={plan.cta} popular={plan.popular} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section bg-[#F8FAFC]">
          <div className="container-narrow">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4">Dúvidas Frequentes</h2>
              <p className="text-[#475569] text-lg">Tudo o que você precisa saber antes de começar.</p>
            </div>

            <div className="space-y-4">
              {[
                { q: 'Preciso ter conhecimentos técnicos?', a: 'Absolutamente não. Nossa IA cuida de toda a parte técnica, desde o código até o design. Você só precisa preencher os dados da sua clínica.' },
                { q: 'Posso usar meu próprio domínio?', a: 'Sim! Nos planos Profissional e Clínica Plus você pode conectar o seu domínio (ex: www.suaclinica.com.br) facilmente.' },
                { q: 'Como recebo os contatos dos pacientes?', a: 'A maioria das landing pages foca em converter o paciente no WhatsApp. Você receberá as mensagens direto no número configurado.' },
                { q: 'E se eu quiser alterar alguma coisa depois?', a: 'Temos um editor visual intuitivo onde você pode trocar textos, cores e imagens a qualquer momento com poucos cliques.' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#0D7C66]/30 transition-colors">
                  <h4 className="font-bold text-[#0F172A] mb-2 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#0D7C66]" />
                    {item.q}
                  </h4>
                  <p className="text-[#475569] text-sm leading-relaxed ml-8">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-[#0F172A] relative overflow-hidden">
          <div className="container-narrow relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Sua clínica merece <br />
              <span className="text-[#0D7C66]">ser referência digital</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/cadastro" className="btn-primary btn-lg btn w-full sm:w-auto">
                Garanta sua página hoje
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#precos" className="btn btn-lg bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto border-0 backdrop-blur-sm">
                Conhecer os planos
              </Link>
            </div>
            <p className="mt-8 text-white/50 text-sm italic">"Mais de 50 clínicas dobraram seus agendamentos no primeiro mês!"</p>
          </div>

          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#0D7C66] opacity-10 blur-[100px] rounded-full" />
        </section>
      </main>

      <PublicFooter />
    </div >
  )
}
