'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LineChart, BookOpen, User } from 'lucide-react'

export function BottomNav() {
    const pathname = usePathname()

    const tabs = [
        { name: 'Home', href: '/home', icon: Home },
        { name: 'Progreso', href: '/progress', icon: LineChart },
        { name: 'Ebook', href: '/ebook', icon: BookOpen },
        { name: 'Perfil', href: '/profile', icon: User },
    ]

    // Hide on auth pages or onboarding or player
    if (
        pathname === '/' ||
        pathname.startsWith('/welcome') ||
        pathname.includes('/login') ||
        pathname.includes('/onboarding') ||
        pathname.includes('/player/')
    ) {
        return null
    }

    return (
        <nav className="fixed bottom-0 inset-x-0 z-50 px-4 pb-6 pt-4 animate-slide-up">
            <div className="max-w-md mx-auto bg-midnight/80 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-4 flex justify-between items-center shadow-2xl">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href
                    const Icon = tab.icon
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-gold scale-110' : 'text-white/40 hover:text-white/80'}`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={`text-[10px] font-sans font-medium ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{tab.name}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
