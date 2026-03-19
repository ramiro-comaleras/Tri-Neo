import { createClient } from '@/shared/lib/supabase/server'
import { MeshBackground } from '@/shared/components/mesh-background'
import { GlassCard } from '@/shared/components/glass-card'
import { redirect } from 'next/navigation'

export default async function ProgressPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch sessions and checkins
    const { data: sessions } = await supabase
        .from('sessions')
        .select('*, checkins(clarity_score)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    const totalSessions = sessions?.length || 0

    let averageClarity = 0
    let mostUsedPhase = '-'
    let latestSessionStr = '-'

    if (totalSessions > 0 && sessions) {
        const validScores = sessions.map(s => s.checkins?.[0]?.clarity_score).filter(Boolean) as number[]
        if (validScores.length > 0) {
            averageClarity = validScores.reduce((a, b) => a + b, 0) / validScores.length
        }

        const phaseCounts = sessions.reduce((acc, curr) => {
            acc[curr.phase_number] = (acc[curr.phase_number] || 0) + 1
            return acc
        }, {} as Record<number, number>)

        const mostUsed = Object.entries(phaseCounts).sort((a, b) => (b[1] as number) - (a[1] as number))[0]
        if (mostUsed) {
            mostUsedPhase = `Fase ${mostUsed[0]}`
        }

        latestSessionStr = new Date(sessions[0].created_at).toLocaleDateString('es-AR', {
            month: 'short', day: 'numeric'
        })
    }

    return (
        <MeshBackground className="p-6 min-h-[100dvh] pt-16 sm:pt-24 pb-32">
            <div className="max-w-md mx-auto z-10 relative">
                <header className="mb-10 animate-slide-up">
                    <h1 className="font-headings text-3xl sm:text-4xl text-white font-medium mb-2">
                        Tu Progreso
                    </h1>
                    <p className="font-sans text-white/70 text-lg">
                        Métricas de tu regulación mental
                    </p>
                </header>

                <div className="grid grid-cols-2 gap-4">
                    <GlassCard className="p-6 text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <span className="font-display text-4xl font-bold text-white block mb-1">{totalSessions}</span>
                        <span className="font-sans text-xs text-white/50 uppercase tracking-widest">Sesiones</span>
                    </GlassCard>

                    <GlassCard className="p-6 text-center animate-slide-up" style={{ animationDelay: '150ms' }}>
                        <span className="font-display text-4xl font-bold text-gold block mb-1">{averageClarity > 0 ? averageClarity.toFixed(1) : '-'}</span>
                        <span className="font-sans text-xs text-white/50 uppercase tracking-widest">Claridad Prom.</span>
                    </GlassCard>

                    <GlassCard className="p-6 text-center flex flex-col justify-center animate-slide-up col-span-2" style={{ animationDelay: '200ms' }}>
                        <span className="font-sans text-xs text-white/50 uppercase tracking-widest mb-1">Fase Más Usada</span>
                        <span className="font-display text-3xl font-bold text-white">{mostUsedPhase}</span>
                    </GlassCard>
                </div>

                <div className="mt-8">
                    <GlassCard className="p-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
                        <h3 className="text-sm font-medium text-white/70 mb-4 uppercase tracking-wider">Historial Reciente</h3>
                        {totalSessions === 0 ? (
                            <p className="text-white/40 text-sm">Aún no hay sesiones registradas.</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {sessions?.slice(0, 3).map((session) => (
                                    <div key={session.id} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <p className="text-white font-medium">Fase {session.phase_number}</p>
                                            <p className="text-sm text-white/50">{new Date(session.created_at).toLocaleDateString()} • {session.duration_minutes} min</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gold font-bold">
                                            {session.checkins?.[0]?.clarity_score || '-'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </MeshBackground>
    )
}
