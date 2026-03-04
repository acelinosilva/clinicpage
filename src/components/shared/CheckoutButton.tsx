'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export function CheckoutButton({ planId, cta, popular }: { planId: string, cta: string, popular: boolean }) {
    const [loading, setLoading] = useState(false)

    const handleCheckout = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId })
            })

            if (res.status === 401) {
                window.location.href = '/cadastro?redirect=checkout_' + planId
                return
            }

            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                alert(data.error || 'Erro ao iniciar checkout')
            }
        } catch (e) {
            alert('Erro ao processar pagamento')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className={cn(
                "btn w-full font-bold flex items-center justify-center gap-2",
                popular ? "btn-primary" : "btn-secondary",
                loading && "opacity-70 cursor-not-allowed"
            )}
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : cta}
        </button>
    )
}
