import AppSidebar from '@/components/shared/AppSidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <AppSidebar />
            <main className="flex-1 min-w-0 overflow-auto">
                {children}
            </main>
        </div>
    )
}
