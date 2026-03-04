const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function test() {
    const { data: lps, error } = await supabase
        .from('landing_pages')
        .select('*')
        .limit(3)

    console.log('All recent LPs:', lps?.map(l => ({ slug: l.slug, status: l.status })))

    if (lps && lps.length > 0) {
        const testSlug = lps[0].slug
        console.log(`\nTesting query for slug: ${testSlug}`)

        const { data: singleLp, error: singleError } = await supabase
            .from('landing_pages')
            .select('*')
            .eq('slug', testSlug)
            .single()

        console.log('Single LP result:', singleLp ? 'Found' : 'Not found')
        console.log('Single Error:', singleError)
    }
    console.log('Error:', error)
}

test()
