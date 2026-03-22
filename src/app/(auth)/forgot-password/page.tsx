'use client'

import { MeshBackground } from '@/shared/components/mesh-background'
import { GlassCard } from '@/shared/components/glass-card'
import { Button } from '@/shared/components/ui-button'
import { resetPassword } from './actions'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function ForgotPasswordForm() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const initialEmail = searchParams.get('email') || ''

  return (
    <MeshBackground className="items-center justify-center p-6">
      <div className="w-full max-w-md animate-scale-in">
        <GlassCard>
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-white mb-2">Recuperar acceso</h1>
            <p className="font-sans text-white/70">Te enviaremos un link para crear tu nueva clave.</p>
          </div>

          <form action={resetPassword} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-sans text-sm text-white/80 font-medium ml-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                defaultValue={initialEmail}
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
              Enviar link de recuperación
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-gold hover:underline text-sm font-medium">
              ← Volver al inicio
            </Link>
          </div>
        </GlassCard>
      </div>
    </MeshBackground>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<MeshBackground />}>
      <ForgotPasswordForm />
    </Suspense>
  )
}
