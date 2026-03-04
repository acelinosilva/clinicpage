const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function setup() {
    console.log('Checking buckets...')
    const { data: buckets } = await supabase.storage.listBuckets()

    if (!buckets?.find(b => b.id === 'landing-pages')) {
        console.log('Creating landing-pages bucket...')
        const { error } = await supabase.storage.createBucket('landing-pages', {
            public: true,
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
            fileSizeLimit: 5242880 // 5MB
        })
        if (error) console.error('Error creating bucket:', error)
        else console.log('Bucket created successfully.')
    } else {
        console.log('Bucket landing-pages already exists.')
    }
}

setup()
