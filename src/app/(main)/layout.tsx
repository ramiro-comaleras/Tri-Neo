import { BottomNav } from '@/shared/components/bottom-nav'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}
