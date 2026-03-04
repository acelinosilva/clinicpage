import { redirect } from 'next/navigation'
import { createServer } from '@/lib/supabase-server'
import AdminSidebar from '@/components/shared/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Verify if user is admin in the public table
    const { data: profile } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single()

    if (!profile?.is_admin) {
        redirect('/dashboard')
    }

    return (
        <div className="flex min-h-screen bg-[#F1F5F9]">
            <AdminSidebar />
            <main className="flex-1 min-w-0 overflow-auto">
                {children}
            </main>
        </div>
    )
}
