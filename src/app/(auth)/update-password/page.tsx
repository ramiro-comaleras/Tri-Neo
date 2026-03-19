'use client'

import { MeshBackground } from '@/shared/components/mesh-background'
import { GlassCard } from '@/shared/components/glass-card'
import { Button } from '@/shared/components/ui-button'
import { updatePassword } from './actions'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function UpdatePasswordForm() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  return (
    <MeshBackground className="items-center justify-center p-6">
      <div className="w-full max-w-md animate-scale-in">
        <GlassCard>
            <div className="text-center mb-8">
                <h1 className="font-display text-2xl font-bold text-white mb-2">Crear nueva clave</h1>
                <p className="font-sans text-white/70">Ingresa tu nueva contraseña para acceder.</p>
            </div>

            <form action={updatePassword} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-sans text-sm text-white/80 font-medium ml-1">
                        Nueva Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        required
                        minLength={6}
                        className="input-glass"
                    />
                </div>

                {message && (
                    <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center animate-shake">
                        <p className="text-sm font-medium text-gold">{message}</p>
                    </div>
                )}

                <Button type="submit" variant="primary" className="w-full mt-2 shadow-xl shadow-petrol/20">
                    Guardar y Entrar
                </Button>
            </form>
        </GlassCard>
      </div>
    </MeshBackground>
  )
}

export default function UpdatePasswordPage() {
    return (
        <Suspense fallback={<MeshBackground />}>
            <UpdatePasswordForm />
        </Suspense>
    )
}
