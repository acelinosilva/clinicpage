export type Plan = 'free' | 'pro' | 'clinic'

export interface PlanLimits {
  landing_pages_active: number // -1 = unlimited
  ai_credits_per_month: number
  templates_available: number
  custom_domain: boolean
  custom_domains_limit?: number
  ab_testing: boolean
  ab_testing_variants?: number
  version_history: boolean
  version_history_limit: number // -1 = unlimited
  analytics_retention_days: number // -1 = unlimited
  team_members: number
  whatsapp_button: boolean
  meta_pixel: boolean
  google_analytics: boolean
  popup_conversion: boolean
  floating_bar: boolean
  zapier_webhook: boolean
  lead_export: boolean
  custom_badge: boolean
  remove_branding: boolean
  heatmaps?: boolean
  scheduling_integration?: boolean
}

export interface PlanConfig {
  id: Plan
  name: string
  price_brl_monthly: number
  price_brl_yearly: number
  limits: PlanLimits
  support: string
  badge_on_page: boolean
}

export const PLANS: Record<Plan, PlanConfig> = {
  free: {
    id: 'free',
    name: 'Gratuito',
    price_brl_monthly: 0,
    price_brl_yearly: 0,
    limits: {
      landing_pages_active: 1,
      ai_credits_per_month: 3,
      templates_available: 5,
      custom_domain: false,
      ab_testing: false,
      version_history: false,
      version_history_limit: 0,
      analytics_retention_days: 30,
      team_members: 1,
      whatsapp_button: true,
      meta_pixel: false,
      google_analytics: false,
      popup_conversion: false,
      floating_bar: false,
      zapier_webhook: false,
      lead_export: false,
      custom_badge: false,
      remove_branding: false,
    },
    support: 'email',
    badge_on_page: true,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price_brl_monthly: 9700,
    price_brl_yearly: 87000,
    limits: {
      landing_pages_active: 5,
      ai_credits_per_month: -1,
      templates_available: -1,
      custom_domain: true,
      custom_domains_limit: 1,
      ab_testing: true,
      ab_testing_variants: 2,
      version_history: true,
      version_history_limit: 30,
      analytics_retention_days: 180,
      team_members: 1,
      whatsapp_button: true,
      meta_pixel: true,
      google_analytics: true,
      popup_conversion: true,
      floating_bar: true,
      zapier_webhook: false,
      lead_export: true,
      custom_badge: false,
      remove_branding: true,
    },
    support: 'priority_email',
    badge_on_page: false,
  },
  clinic: {
    id: 'clinic',
    name: 'Clínica',
    price_brl_monthly: 24700,
    price_brl_yearly: 222000,
    limits: {
      landing_pages_active: -1,
      ai_credits_per_month: -1,
      templates_available: -1,
      custom_domain: true,
      custom_domains_limit: 5,
      ab_testing: true,
      ab_testing_variants: -1,
      version_history: true,
      version_history_limit: -1,
      analytics_retention_days: -1,
      team_members: 3,
      whatsapp_button: true,
      meta_pixel: true,
      google_analytics: true,
      popup_conversion: true,
      floating_bar: true,
      zapier_webhook: true,
      lead_export: true,
      custom_badge: true,
      remove_branding: true,
      heatmaps: true,
      scheduling_integration: true,
    },
    support: 'dedicated_success_manager',
    badge_on_page: false,
  },
}

export function formatPrice(cents: number): string {
  if (cents === 0) return 'Grátis'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

export function canUseFeature(plan: Plan, feature: keyof PlanLimits): boolean {
  const limits = PLANS[plan].limits
  const val = limits[feature]
  if (typeof val === 'boolean') return val
  if (typeof val === 'number') return val !== 0
  return false
}
