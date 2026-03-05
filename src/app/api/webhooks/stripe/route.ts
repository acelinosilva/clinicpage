import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !serviceKey) {
        console.error('❌ [STRIPIE WEBHOOK] Supabase keys missing')
        return new NextResponse('Configuration Error: Supabase keys missing', { status: 500 })
    }

    // Lazy init — avoids build-time crash when env vars not present
    const supabase = createClient(url, serviceKey)

    const body = await req.text()
    const head = await headers()
    const signature = head.get('Stripe-Signature') as string

    let event: Stripe.Event

    try {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
        if (!webhookSecret) {
            throw new Error('STRIPE_WEBHOOK_SECRET is missing')
        }
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error: any) {
        console.error(`❌ Webhook Error: ${error.message}`)
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session
    const subscription = event.data.object as Stripe.Subscription

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const userId = session.metadata?.supabase_user_id
                const planId = session.metadata?.plan_id

                if (userId && planId) {
                    await supabase
                        .from('users')
                        .update({
                            plan: planId,
                            stripe_customer_id: session.customer as string,
                            stripe_subscription_id: session.subscription as string,
                        })
                        .eq('id', userId)

                    console.log(`✅ [Webhook] User ${userId} updated to plan ${planId}`)
                }
                break
            }

            case 'customer.subscription.updated':
            case 'customer.subscription.deleted': {
                const subscriptionId = subscription.id
                const status = subscription.status

                // Encontrar o usuário por essa assinatura
                const { data: userProfile } = await supabase
                    .from('users')
                    .select('id')
                    .eq('stripe_subscription_id', subscriptionId)
                    .single()

                if (userProfile) {
                    // Se cancelado ou inadimplente, voltamos pro 'free'
                    if (status === 'canceled' || status === 'unpaid' || status === 'past_due') {
                        await supabase
                            .from('users')
                            .update({ plan: 'free' })
                            .eq('id', userProfile.id)

                        console.log(`⚠️ [Webhook] User ${userProfile.id} downgraded to free (Status: ${status})`)
                    }
                }
                break
            }
        }
    } catch (err) {
        console.error('❌ Erro processing webhook:', err)
        return new NextResponse('Internal Webhook Error', { status: 500 })
    }

    return new NextResponse('OK', { status: 200 })
}
