'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MeshBackground } from '@/shared/components/mesh-background'

export default function SplashPage() {
  const router = useRouter()
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Trigger fade-in
    setShow(true)

    // Redirect after 1.5 seconds + 0.5s transition
    const timer = setTimeout(() => {
      router.push('/home')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <MeshBackground className="flex items-center justify-center flex-col min-h-[100dvh]">
      <div
        className={`flex flex-col items-center justify-center text-center transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Replace with your logo from the desktop */}
        {/* Official TRI-NEO Logo */}
        <div className="w-48 h-48 mb-6 relative animate-fade-in flex items-center justify-center">
          <img
            src="/logo.png"
            alt="TRI-NEO Logo"
            className="w-full h-full object-contain filter drop-shadow-2xl"
          />
        </div>

        <p className="font-display text-lg sm:text-xl text-white tracking-wide font-medium">
          Recuperá claridad mental.
        </p>
      </div>
    </MeshBackground>
  )
}
