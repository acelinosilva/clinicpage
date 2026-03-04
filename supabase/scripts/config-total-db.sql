-- ==========================================================
-- SCRIPT DE CONFIGURAÇÃO TOTAL - CLINICPAGE (FIXED)
-- Execute este script no SQL Editor do Supabase
-- ==========================================================

-- 1. Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela de Usuários / Perfis
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    plan TEXT DEFAULT 'free', -- 'free', 'pro', 'clinic'
    is_admin BOOLEAN DEFAULT FALSE,
    ai_credits_used INTEGER DEFAULT 0,
    ai_credits_limit INTEGER DEFAULT 3,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de Landing Pages
CREATE TABLE IF NOT EXISTS public.landing_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'draft', -- 'draft', 'published', 'archived'
    template_id TEXT,
    briefing JSONB,
    sections JSONB,
    theme JSONB,
    seo JSONB,
    integrations JSONB,
    custom_domain TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela de Leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    landing_page_id UUID REFERENCES public.landing_pages(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabela de Analytics
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    landing_page_id UUID REFERENCES public.landing_pages(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    device_type TEXT,
    referrer TEXT,
    ip_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Configurar RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- 7. Políticas de Segurança (Limpando e recriando)

-- Perfis
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Landing Pages
DROP POLICY IF EXISTS "Users can view own LPs" ON public.landing_pages;
CREATE POLICY "Users can view own LPs" ON public.landing_pages FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own LPs" ON public.landing_pages;
CREATE POLICY "Users can insert own LPs" ON public.landing_pages FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own LPs" ON public.landing_pages;
CREATE POLICY "Users can update own LPs" ON public.landing_pages FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can view published LPs" ON public.landing_pages;
CREATE POLICY "Anyone can view published LPs" ON public.landing_pages FOR SELECT USING (status = 'published');

-- Leads
DROP POLICY IF EXISTS "Users can view leads of their LPs" ON public.leads;
CREATE POLICY "Users can view leads of their LPs" ON public.leads FOR SELECT USING (
    landing_page_id IN (SELECT lp.id FROM public.landing_pages lp WHERE lp.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Analytics
DROP POLICY IF EXISTS "Anyone can insert analytics" ON public.analytics_events;
CREATE POLICY "Anyone can insert analytics" ON public.analytics_events FOR INSERT WITH CHECK (true);

-- 8. PROMOVER ADMIN (celticfolkmetal@hotmail.com)
-- Nota: O usuário já deve estar cadastrado no Auth para que isso funcione plenamente
INSERT INTO public.users (id, email, name, plan, is_admin, ai_credits_limit)
SELECT id, email, 'Administrator', 'clinic', true, -1
FROM auth.users
WHERE email = 'celticfolkmetal@hotmail.com'
ON CONFLICT (id) DO UPDATE 
SET is_admin = true, plan = 'clinic', ai_credits_limit = -1;

-- FIM DO SCRIPT
