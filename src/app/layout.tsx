import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ClinicPage — Gerador de Landing Pages com IA para Clínicas',
    template: '%s | ClinicPage',
  },
  description:
    'Crie landing pages de alta conversão para sua clínica em minutos usando inteligência artificial. Atraia mais pacientes e agende mais consultas.',
  keywords: [
    'landing page para clínica',
    'página de captação de pacientes',
    'marketing para clínicas',
    'gerador de landing page',
    'IA para saúde',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://clinicpage.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'ClinicPage',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
