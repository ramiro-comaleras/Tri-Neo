import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MeshBackground } from '@/shared/components/mesh-background'
import { GlassCard } from '@/shared/components/glass-card'
import { Button } from '@/shared/components/ui-button'
import { LogOut, Info, Shield, Award, Settings } from 'lucide-react'
import { signOut } from './actions'

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <MeshBackground className="p-6 min-h-[100dvh] pt-16 pb-32">
            <div className="max-w-md mx-auto w-full z-10 relative">
                <header className="mb-8 animate-slide-up">
                    <h1 className="font-headings text-3xl font-bold text-white mb-2">Tu Perfil</h1>
                    <p className="font-sans text-white/70">Ajustes y cuenta</p>
                </header>

                <div className="flex flex-col gap-6">
                    <GlassCard className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-petrol/50 border border-gold/30 flex items-center justify-center text-white text-xl font-bold">
                                {(profile?.name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                            </div>
                            <div>
                                <h2 className="font-headings text-lg text-white font-medium">{profile?.name || 'Usuario TRI-NEO'}</h2>
                                <p className="font-sans text-white/60 text-sm">{user.email}</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-white/80">
                                    <Award size={20} className="text-gold" />
                                    <span className="font-medium">Acceso Vitalicio</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-md font-bold ${profile?.lifetime_access ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/40'}`}>
                                    {profile?.lifetime_access ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="animate-slide-up space-y-2 p-4" style={{ animationDelay: '150ms' }}>
                        <a href="mailto:soporte@tu-email.com" className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="flex items-center gap-3 text-white/80">
                                <Info size={20} />
                                <span className="font-medium">Soporte Técnico</span>
                            </div>
                        </a>

                        {profile?.is_admin && (
                            <Link href="/admin" className="flex items-center justify-between p-4 bg-gold/5 hover:bg-gold/10 rounded-xl transition-all border border-gold/20 group">
                                <div className="flex items-center gap-3 text-gold/80 group-hover:text-gold transition-colors">
                                    <Settings size={20} />
                                    <span className="font-bold uppercase tracking-wider text-xs">Panel Administración</span>
                                </div>
                                <div className="px-2 py-0.5 bg-gold/10 border border-gold/30 rounded text-[10px] font-bold text-gold">ADMIN</div>
                            </Link>
                        )}

                        <a href="#" className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="flex items-center gap-3 text-white/80">
                                <Shield size={20} />
                                <span className="font-medium">Términos y Privacidad</span>
                            </div>
                        </a>
                    </GlassCard>

                    <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <form action={signOut}>
                            <Button variant="ghost" className="w-full flex items-center justify-center gap-2 py-4 mt-4 text-red-400 hover:text-red-300 hover:bg-red-400/10">
                                <LogOut size={20} />
                                Cerrar Sesión
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </MeshBackground>
    )
}
