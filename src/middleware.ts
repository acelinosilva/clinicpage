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
