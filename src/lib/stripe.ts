import Stripe from 'stripe'

// Lazy initialization — validated at request time, not at module load (which breaks Vercel build)
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is missing. Add it to your Vercel Environment Variables.')
    }

    if (!_stripe) {
        _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            // @ts-ignore
            apiVersion: '2023-10-16',
            appInfo: {
                name: 'ClinicPage',
                version: '0.1.0',
                url: 'https://clinicpage.com.br',
            },
        })
    }

    return _stripe
}

// Keep named export for backward compatibility but as a getter proxy
export const stripe = new Proxy({} as Stripe, {
    get(_target, prop) {
        return (getStripe() as any)[prop]
    },
})
