import PublicHeader from '@/components/shared/PublicHeader'
import PublicFooter from '@/components/shared/PublicFooter'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PublicHeader />
            <main className="pt-16">{children}</main>
            <PublicFooter />
        </>
    )
}
