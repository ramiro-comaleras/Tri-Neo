import Link from 'next/link'
import { MeshBackground } from '@/shared/components/mesh-background'
import { GlassCard } from '@/shared/components/glass-card'

export default function CheckEmailPage() {
  return (
    <MeshBackground className="flex items-center justify-center p-6 min-h-[100dvh]">
      <div className="w-full max-w-md z-10">
        <Link href="/login" className="inline-block mb-8 text-white/60 hover:text-white transition-colors">
          ← Volver
        </Link>

        <GlassCard>
          <div className="text-center space-y-6">
            {/* Email icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <div>
              <h1 className="font-display text-2xl font-bold text-white mb-2">Revisá tu correo</h1>
              <p className="font-sans text-white/70">
                Te enviamos un enlace de acceso a tu email. Hacé click en el enlace para ingresar.
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-sm text-white/60">
                ¿No lo recibiste? Revisá tu carpeta de spam o volvé a intentarlo.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </MeshBackground>
  )
}
