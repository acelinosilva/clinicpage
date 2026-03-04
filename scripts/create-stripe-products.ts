import dotenv from 'dotenv'
import Stripe from 'stripe'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Cargar variables de entorno desde .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../.env.local')

dotenv.config({ path: envPath })

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) {
    console.error('❌ STRIPE_SECRET_KEY não encontrada no arquivo .env.local')
    process.exit(1)
}

const stripe = new Stripe(stripeSecretKey, {
    // @ts-ignore
    apiVersion: '2023-10-16',
})

const PLANS = [
    {
        name: 'Profissional',
        description: 'O essencial para quem quer escalar resultados. (3 Landing Pages, Integrações, Domínio Personalizado)',
        price: 8500, // R$ 85,00 em centavos
        identifier: 'pro',
    },
    {
        name: 'Clínica Plus',
        description: 'Poder total para clínicas e redes médicas. (Páginas Ilimitadas, SEO Avançado, Suporte VIP)',
        price: 18500, // R$ 185,00 em centavos
        identifier: 'clinic',
    },
]

async function main() {
    console.log('🚀 Iniciando criação de produtos na Stripe LIVE...')
    const newEnvLines: string[] = []

    for (const plan of PLANS) {
        try {
            console.log(`\n📦 Criando produto: ${plan.name}...`)
            // 1. Criar o Produto
            const product = await stripe.products.create({
                name: `ClinicPage - Plano ${plan.name}`,
                description: plan.description,
                metadata: {
                    plan_identifier: plan.identifier,
                },
            })
            console.log(`✅ Produto criado! ID: ${product.id}`)

            // 2. Criar o Preço Recorrente (Assinatura Mensal)
            console.log(`💰 Criando preço de R$ ${(plan.price / 100).toFixed(2)}/mês...`)
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: plan.price,
                currency: 'brl',
                recurring: {
                    interval: 'month',
                },
                metadata: {
                    plan_identifier: plan.identifier,
                },
            })
            console.log(`✅ Preço criado! ID: ${price.id}`)

            newEnvLines.push(`STRIPE_PRICE_ID_${plan.identifier.toUpperCase()}=${price.id}`)

        } catch (error: any) {
            console.error(`❌ Erro ao criar plano ${plan.name}:`, error.message)
        }
    }

    // Anexar as novas chaves criadas ao .env.local
    if (newEnvLines.length > 0) {
        console.log('\n📝 Atualizando .env.local com os  novos Price IDs...')
        fs.appendFileSync(envPath, `\n\n# Stripe Price IDs (Auto-generated)\n${newEnvLines.join('\n')}\n`)
        console.log('✅ Arquivo .env.local atualizado com sucesso!')
    }

    console.log('\n🎉 Processo finalizado!')
}

main().catch(console.error)
