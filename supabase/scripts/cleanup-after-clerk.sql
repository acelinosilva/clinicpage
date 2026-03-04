-- Execute este script no SQL Editor do seu projeto Supabase (lkdjiwuducafjnjldjlp)

-- 1. Remover campos antigos do Clerk
ALTER TABLE users DROP COLUMN IF EXISTS clerk_id CASCADE;

-- 2. Adicionar campo de Administrador (caso não exista)
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- 3. Atualizar Políticas de Segurança (RLS) para usar auth.uid() nativo do Supabase
-- Remover as antigas primeiro
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can view own LPs" ON landing_pages;
DROP POLICY IF EXISTS "Users can insert own LPs" ON landing_pages;
DROP POLICY IF EXISTS "Users can update own LPs" ON landing_pages;
DROP POLICY IF EXISTS "Users can view leads of their LPs" ON leads;

-- Criar as novas políticas simplificadas
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own LPs" ON landing_pages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own LPs" ON landing_pages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own LPs" ON landing_pages FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view leads of their LPs" ON leads FOR SELECT USING (
    landing_page_id IN (
        SELECT id FROM landing_pages WHERE user_id = auth.uid()
    )
);

-- Garantir acesso público para visualizar LPs publicadas e enviar leads
DROP POLICY IF EXISTS "Anyone can view published LPs" ON landing_pages;
CREATE POLICY "Anyone can view published LPs" ON landing_pages FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);
