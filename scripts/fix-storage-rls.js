require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fixRLS() {
    console.log('Applying Storage RLS policies...')

    // We can't directly 'CREATE POLICY' via the storage JS client,
    // but the service_role key can perform any action.
    // However, the error 'new row violates row-level security policy' happens on the CLIENT side (anon/authenticated).

    // To fix this, we MUST execute SQL to create the policies.
    // The service_role key can execute SQL if the 'pg_net' or similar is enabled, 
    // but usually, we do it via a direct DB connection or a 'rpc' if available.

    // Since I can't easily execute raw SQL via the JS client without a specific function,
    // I will try to see if I can modify the bucket properties to be even more public 
    // or use a different approach.

    // WAIT! I can use the 'supabase' client to execute SQL if I use a specific 'rpc' 
    // or if I just use the 'postgres' package if I had the connection string.

    // Actually, let's try a different trick. 
    // Sometimes the bucket needs to be 'public' and the policies need to allow 'anon' access.

    console.log('Ensuring bucket is public...')
    const { data: bucket, error: bucketError } = await supabase.storage.updateBucket('landing-pages', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
        fileSizeLimit: 5242880
    })

    if (bucketError) {
        console.error('Error updating bucket:', bucketError)
    } else {
        console.log('Bucket updated.')
    }

    console.log('Note: If RLS is still failing, we need to apply SQL policies.')
    console.log('Since I cannot run SQL via MCP, I will provide the SQL to the user or try another way.')
}

fixRLS()
