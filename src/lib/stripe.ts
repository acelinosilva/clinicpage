import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is missing. Please set it in your .env.local file.')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // @ts-ignore - Stripe version typing might mismatch
    apiVersion: '2023-10-16',
    appInfo: {
        name: 'ClinicPage',
        version: '0.1.0',
        url: 'https://clinicpage.com.br',
    },
})
