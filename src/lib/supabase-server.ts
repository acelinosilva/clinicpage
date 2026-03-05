import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createServer = async () => {
    const cookieStore = await cookies()

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
        throw new Error('Supabase environment variables (URL/ANON_KEY) are missing in server context.')
    }

    return createServerClient(
        url,
        key,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                    }
                },
            },
        }
    )
}

export function createServiceClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
        throw new Error(`Supabase Service Client missing variables: ${!url ? 'URL ' : ''}${!key ? 'SERVICE_ROLE_KEY' : ''}`)
    }

    return createServerClient(
        url,
        key,
        {
            cookies: {
                getAll() { return [] },
                setAll() { },
            },
            auth: { persistSession: false }
        }
    )
}
