import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Lading Page para Clínicas Grátis | Gerador ClinicPage',
    template: '%s | ClinicPage',
  },
  description:
    'Crie uma landing page para clinicas grátis ou premium em minutos. Atraia mais pacientes com páginas otimizadas para conversão e SEO.',
  keywords: [
    'landing page para clinicas grátis',
    'gerador de landing page para médicos',
    'criador de site para clinica',
    'landing page odontologia',
    'marketing para clínicas médicas',
    'página de captação de pacientes',
    'como atrair pacientes',
    'templates de site de saúde',
  ],
  authors: [{ name: 'ClinicPage' }],
  creator: 'ClinicPage',
  publisher: 'ClinicPage',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://clinicpage.com.br'),
  verification: {
    google: 'ozQtHOPAWC45ktZNpYunFDoB8dn2ZNKoGE9poIdDU6g',
  },
  openGraph: {
    title: 'ClinicPage | Lading Page para Clínicas Grátis',
    description: 'Crie landing pages de alta conversão para sua clínica em minutos usando inteligência artificial.',
    url: 'https://clinicpage.com.br',
    siteName: 'ClinicPage',
    images: [
      {
        url: '/og-image.jpg', // Recommend creating an actual og-image later
        width: 1200,
        height: 630,
        alt: 'ClinicPage Dashboard',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClinicPage | Gerador de Landing Pages Médico',
    description: 'Crie sua página otimizada para pacientes em minutos.',
    images: ['/og-image.jpg'],
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
