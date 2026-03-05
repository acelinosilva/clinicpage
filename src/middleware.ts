import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase-middleware'

const isPublicRoute = (path: string) => {
    const publicPaths = [
        '/',
        '/precos',
        '/login',
        '/cadastro',
        '/lp/',
        '/api/analytics/event',
        '/api/leads',
        '/api/subscriptions/webhook',
    ]
    return publicPaths.some(publicPath => path.startsWith(publicPath))
}

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createMiddlewareClient(request, response)
    const { data: { user } } = await supabase.auth.getUser()

    const url = request.nextUrl
    const host = request.headers.get('host') || ''
    const mainDomain = process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, '') || 'clinicpage.com.br'

    // ── Custom Domain Logic ──
    const isCustomDomain = host !== mainDomain && !host.includes('localhost') && !host.includes('vercel.app')

    if (isCustomDomain && !url.pathname.startsWith('/api') && !url.pathname.startsWith('/_next')) {
        // Search for this domain in Supabase
        const { data: lp } = await supabase
            .from('landing_pages')
            .select('slug')
            .eq('custom_domain', host.toLowerCase())
            .eq('status', 'published')
            .single()

        if (lp) {
            // Rewrite the URL to the landing page path
            const newUrl = new URL(`/lp/${lp.slug}${url.pathname === '/' ? '' : url.pathname}`, request.url)
            return NextResponse.rewrite(newUrl)
        }
    }

    // If no user and not a public route, redirect to login
    if (!user && !isPublicRoute(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If user and on login/signup, redirect to dashboard
    if (user && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/cadastro'))) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
