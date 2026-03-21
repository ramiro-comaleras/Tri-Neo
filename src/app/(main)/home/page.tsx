import Link from 'next/link'
import { createClient } from '@/shared/lib/supabase/server'
import { MeshBackground } from '@/shared/components/mesh-background'
import { GlassCard } from '@/shared/components/glass-card'
import { redirect } from 'next/navigation'
import { Shield, ArrowLeft } from 'lucide-react'

const PHASES = [
    {
        id: 1,
        duration: 6,
        title: 'Calmar el sistema',
        days: 'Día 1–7',
        description: 'Volver a la respiración, al cuerpo y al momento presente.',
        color: 'from-blue-500/20 to-cyan-500/10',
        border: 'border-white/20'
    },
    {
        id: 2,
        duration: 11,
        title: 'Reconfigurar atención y foco',
        days: 'Día 8–14',
        description: 'Sentir sin reaccionar, observar sin intervenir.',
        color: 'from-orange-500/20 to-red-500/10',
        border: 'border-white/20'
    },
    {
        id: 3,
        duration: 15,
        title: 'Presencia expandida',
        days: 'Día 15–21',
        description: 'La atención se abre y se vuelve amplia.',
        color: 'from-purple-500/20 to-pink-500/10',
        border: 'border-white/20'
    }
]


export default async function HomePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch user profile
    const { data: profile } = await supabase
        .from('users')
        .select('name, onboarding_completed, lifetime_access')
        .eq('id', user.id)
        .single()

    if (!profile?.onboarding_completed) {
        redirect('/onboarding')
    }

    if (!profile.lifetime_access) {
        return (
            <MeshBackground className="flex items-center justify-center p-6 min-h-[100dvh]">
                <div className="max-w-md w-full z-10 animate-fade-in">
                    <GlassCard className="text-center p-8 border-gold/20 shadow-2xl shadow-gold/5">
                        <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gold/30">
                            <Shield className="text-gold" size={40} />
                        </div>
                        <h2 className="font-headings text-3xl font-bold text-white mb-2 tracking-tight">Acceso Limitado</h2>
                        <p className="font-sans text-white/70 mb-8 leading-relaxed">
                            Aún no tenés activado el acceso vitalicio a <strong>Método TRI-NEO</strong>.
                        </p>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-left mb-8">
                            <h4 className="font-headings text-sm font-bold text-gold uppercase tracking-widest mb-3">¿Ya realizaste el pago?</h4>
                            <p className="font-sans text-xs text-white/50 mb-4">
                                Si ya pagaste por MercadoPago, envianos tu comprobante y el email de tu cuenta para activarte manualmente.
                            </p>
                            <a
                                href="https://wa.me/5491131071077?text=Hola!%20Ya%20realicé%20el%20pago%20de%20TRI-NEO.%20Mi%20email%20es:%20"
                                target="_blank"
                                className="w-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-sm tracking-wide"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                Activar Acceso por WhatsApp
                            </a>
                        </div>

                        <div className="flex flex-col gap-3">
                            <a
                                href="https://www.mercadopago.com.ar"
                                target="_blank"
                                className="w-full bg-gold text-petrol py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-gold/20 hover:scale-[1.02] transition-all"
                            >
                                <ArrowLeft size={18} className="rotate-180" /> Adquirir Acceso Vitalicio
                            </a>
                            <Link href="/profile" className="text-white/40 hover:text-white/60 text-sm font-sans transition-colors py-2">Volver al Perfil</Link>
                        </div>
                    </GlassCard>
                </div>
            </MeshBackground>
        )
    }


    return (
        <MeshBackground className="p-6 min-h-[100dvh] pt-16 sm:pt-24 pb-24">
            <div className="max-w-md mx-auto z-10 relative">
                <header className="mb-10 animate-slide-up text-center">
                    <h1 className="font-headings text-2xl sm:text-3xl text-white font-medium mb-2 text-balance">
                        Hoy es un buen momento para volver al presente.
                    </h1>
                </header>

                {/* 3 Phases · 7 Days Each + Progress Bar */}
                <div className="mb-10 animate-slide-up" style={{ animationDelay: '50ms' }}>
                    <p className="text-center font-headings text-xs font-bold text-gold/70 uppercase tracking-[0.3em] mb-4">
                        3 Fases · 7 días cada una
                    </p>
                    {/* Minimalist progress bar */}
                    <div className="flex items-center gap-1 px-2">
                        {Array.from({ length: 21 }).map((_, i) => (
                            <div
                                key={i}
                                className={`flex-1 h-[3px] rounded-full transition-all duration-500 ${i < 0 ? 'bg-gold/80' : 'bg-white/10'
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between px-2 mt-2">
                        <span className="text-[10px] text-white/30 font-sans">Día 1</span>
                        <span className="text-[10px] text-white/30 font-sans">Día 21</span>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {PHASES.map((phase, i) => (
                        <Link key={phase.id} href={`/player/${phase.id}`} className="block group">
                            <GlassCard
                                noPadding
                                className={`
                  p-6 transition-all duration-500
                  hover:scale-[1.02] hover:shadow-2xl hover:bg-white/10
                  bg-gradient-to-br ${phase.color}
                  ${phase.border}
                `}
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 pr-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium border border-white/10">
                                                Fase {phase.id}
                                            </span>
                                            <span className="text-gold/60 text-[10px] font-bold uppercase tracking-widest">
                                                {phase.days}
                                            </span>
                                        </div>
                                        <h3 className="font-headings text-xl text-white font-medium mb-1">
                                            {phase.title}
                                        </h3>
                                        <p className="font-sans text-sm text-white/60">
                                            {phase.description}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <span className="font-display text-lg font-semibold text-white/60 tracking-tight block leading-none">
                                            {phase.duration}
                                        </span>
                                        <span className="font-sans text-[10px] font-medium text-white/40 tracking-wider uppercase mt-0.5 block">
                                            min
                                        </span>
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>
                    ))}
                </div>
            </div>
        </MeshBackground>
    )
}
