import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServer } from '@/lib/supabase-server'

export async function POST(req: Request) {
    try {
        const { planId } = await req.json()

        // 1. Validar o plano selecionado
        const priceId = planId === 'pro'
            ? process.env.STRIPE_PRICE_ID_PRO
            : planId === 'clinic'
                ? process.env.STRIPE_PRICE_ID_CLINIC
                : null

        if (!priceId) {
            return NextResponse.json({ error: 'Plano inválido' }, { status: 400 })
        }

        // 2. Verificar se o usuário está autenticado
        const supabase = await createServer()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
        }

        // 3. Obter ou criar o Customer no Stripe
        const { data: profile } = await supabase
            .from('profiles')
            .select('stripe_customer_id, full_name, email')
            .eq('id', user.id)
            .single()

        let customerId = profile?.stripe_customer_id

        if (!customerId) {
            // Cria um novo customer na Stripe
            const customer = await stripe.customers.create({
                email: user.email,
                name: profile?.full_name || user.email?.split('@')[0],
                metadata: {
                    supabase_user_id: user.id,
                },
            })
            customerId = customer.id

            // Salva o ID do Stripe no banco
            await supabase
                .from('profiles')
                .update({ stripe_customer_id: customerId })
                .eq('id', user.id)
        }

        // 4. Criar a sessão de Checkout
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card', 'boleto', 'pix'], // Suporte para métodos brasileiros
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/planos?canceled=true`,
            metadata: {
                supabase_user_id: user.id,
                plan_id: planId
            },
            subscription_data: {
                metadata: {
                    supabase_user_id: user.id,
                    plan_id: planId
                }
            }
        })

        return NextResponse.json({ url: session.url })

    } catch (error: any) {
        console.error('❌ Erro no Checkout:', error)
        return NextResponse.json({ error: error.message || 'Erro interno do servidor' }, { status: 500 })
    }
}
