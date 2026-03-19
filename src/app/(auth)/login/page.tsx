'use client'

import { MeshBackground } from '@/shared/components/mesh-background'
import { GlassCard } from '@/shared/components/glass-card'
import { Button } from '@/shared/components/ui-button'
import { signInWithPassword, signUpWithPassword } from './actions'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense, useState } from 'react'

function LoginForm() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const initialType = searchParams.get('type') // e.g. 'register'

  const [isLogin, setIsLogin] = useState(initialType !== 'register')

  return (
    <MeshBackground className="flex items-center justify-center p-6 min-h-[100dvh]">
      <div className="w-full max-w-md animate-scale-in z-10">

        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="mb-6 w-32 h-32 relative">
            <img
              src="/logo.png"
              alt="TRI-NEO Logo"
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </Link>
        </div>

        <GlassCard>
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-white mb-2">Acceso a tu sistema</h1>
            <p className="font-sans text-white/70">Ingresa tus datos para continuar.</p>
          </div>

          <form action={isLogin ? signInWithPassword : signUpWithPassword} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-sans text-sm text-white/80 font-medium ml-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
                className="input-glass"
              />
            </div>

            <div className="flex flex-col gap-2 animate-fade-in">
              <label htmlFor="password" className="font-sans text-sm text-white/80 font-medium ml-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Tu clave secreta"
                required
                className="input-glass"
              />
            </div>

            {message && (
              <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center animate-shake">
                <p className="text-sm font-medium text-gold">{message}</p>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full mt-2 shadow-xl shadow-petrol/20">
              {isLogin ? 'Ingresar a mi portal' : 'Solicitar acceso'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-white/60">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-gold hover:underline transition-all">
              {isLogin ? "¿Primera vez? Solicita tu acceso aquí." : "¿Ya tienes cuenta? Ingresar."}
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-white/60 border-t border-white/5 pt-6">
            <p>¿Compraste y no recibiste acceso?</p>
            <a href="#" className="text-gold hover:underline mt-1 inline-block">Contactar soporte</a>
          </div>
        </GlassCard>
      </div>
    </MeshBackground>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<MeshBackground />}>
      <LoginForm />
    </Suspense>
  )
}
