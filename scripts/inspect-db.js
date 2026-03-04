const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function inspect() {
    const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')

    if (error) {
        console.error('Erro ao inspecionar:', error.message)
        return
    }

    console.log('Tabelas encontradas no schema public:')
    data.forEach(t => console.log(`- ${t.table_name}`))
}

inspect()
