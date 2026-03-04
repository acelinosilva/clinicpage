const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Erro: NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não definidos em .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function createAdmin() {
    const email = 'celticfolkmeta@hotmail.com'
    const password = 'Ace1984@'

    console.log(`Tentando criar administrador: ${email}`)

    // 1. Create user in auth.users
    const { data: { user }, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: 'Administrator' }
    })

    if (authError) {
        if (authError.message.includes('already registered') || authError.message.includes('User already exists')) {
            console.log('Usuário já existe no Auth. Continuando para promoção...')
        } else {
            console.error('Erro ao criar no Auth:', authError.message)
            return
        }
    }

    let userId = user?.id
    if (!userId) {
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
        if (listError) {
            console.error('Erro ao listar usuários:', listError.message)
            return
        }
        userId = users.find(u => u.email === email)?.id
    }

    if (!userId) {
        console.error('ID do usuário não encontrado após tentativa de criação/listagem.')
        return
    }

    // 2. Insert/Update in public.users
    const { error: publicError } = await supabase
        .from('users')
        .upsert({
            id: userId,
            email,
            name: 'Administrator',
            plan: 'clinic',
            is_admin: true,
            ai_credits_used: 0,
            ai_credits_limit: -1
        }, { onConflict: 'id' })

    if (publicError) {
        console.error('Erro ao criar no Public:', publicError.message)
    } else {
        console.log('Administrador criado e promovido com sucesso!')
    }
}

createAdmin()
