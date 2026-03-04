import { createServerClient } from '@supabase/ssr'

export const createMiddlewareClient = (request: Request, response: Response) => {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return (request as any).cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        (request as any).cookies.set(name, value)
                    )
                    cookiesToSet.forEach(({ name, value, options }) =>
                        (response as any).cookies.set(name, value, options)
                    )
                },
            },
        }
    )
}
