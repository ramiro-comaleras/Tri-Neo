'use client'

import { useState, useEffect } from 'react'
import { MeshBackground } from '@/shared/components/mesh-background'
import { GlassCard } from '@/shared/components/glass-card'
import { Button } from '@/shared/components/ui-button'
import { Search, User, Check, X, Shield, History, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getUsers, toggleLifetimeAccess } from '@/features/admin/actions'

export default function AdminPage() {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    useEffect(() => {
        handleSearch()
    }, [])

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        setLoading(true)
        try {
            const data = await getUsers(search)
            setUsers(data)
        } catch (error) {
            console.error('Search error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleToggleAccess = async (user: any) => {
        setActionLoading(user.id)
        try {
            await toggleLifetimeAccess(user.id, user.lifetime_access)
            // Update local state for immediate feedback
            setUsers(users.map(u =>
                u.id === user.id ? { ...u, lifetime_access: !u.lifetime_access } : u
            ))
        } catch (error) {
            console.error('Toggle error:', error)
            alert('Error updating user. Make sure you are an admin.')
        } finally {
            setActionLoading(null)
        }
    }

    return (
        <MeshBackground className="p-6 min-h-[100dvh] pt-16 pb-32">
            <div className="max-w-4xl mx-auto w-full z-10 relative">
                <header className="mb-10 animate-fade-in flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/profile" className="text-white/50 hover:text-white transition-colors">
                                <ArrowLeft size={20} />
                            </Link>
                            <span className="text-gold text-xs font-bold uppercase tracking-widest px-2 py-0.5 bg-gold/10 border border-gold/20 rounded-md">Panel de Control</span>
                        </div>
                        <h1 className="font-headings text-4xl font-bold text-white tracking-tight">Gestión de Usuarios</h1>
                        <p className="font-sans text-white/60 mt-1">Activa accesos vitalicios manualmente después de pagos por MP.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Search Section */}
                    <div className="lg:col-span-4 mb-6">
                        <GlassCard className="p-1">
                            <form onSubmit={handleSearch} className="flex items-center gap-2 p-1">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Buscar por email..."
                                        className="w-full bg-white/5 border-none focus:ring-1 focus:ring-gold/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 font-sans"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <Button variant="primary" type="submit" disabled={loading} className="px-8 rounded-xl">
                                    {loading ? 'Buscando...' : 'Buscar'}
                                </Button>
                            </form>
                        </GlassCard>
                    </div>

                    {/* Users List */}
                    <div className="lg:col-span-4 space-y-4">
                        {users.length === 0 ? (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
                                <User className="mx-auto mb-4 opacity-20" size={48} />
                                <p>No se encontraron usuarios</p>
                            </div>
                        ) : (
                            users.map((user, idx) => (
                                <GlassCard key={user.id} className="animate-slide-up group" style={{ animationDelay: `${idx * 50}ms` }}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-petrol/50 border border-white/10 flex items-center justify-center text-white/80 font-bold overflow-hidden relative group-hover:border-gold/30 transition-colors">
                                                {user.email[0].toUpperCase()}
                                                {user.is_admin && (
                                                    <div className="absolute -bottom-1 -right-1 bg-gold rounded-full p-0.5 border border-petrol">
                                                        <Shield size={10} className="text-petrol" fill="currentColor" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-headings font-medium text-white truncate max-w-[200px] md:max-w-none">
                                                    {user.email}
                                                </h3>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    <span className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full ${user.onboarding_completed ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-white/30 border border-white/10'}`}>
                                                        {user.onboarding_completed ? 'Onboarding OK' : 'Pendiente'}
                                                    </span>
                                                    <span className="text-[10px] text-white/30 font-sans flex items-center gap-1">
                                                        <History size={10} /> {new Date(user.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className={`px-4 py-2 rounded-2xl border transition-all duration-300 flex items-center gap-2 ${user.lifetime_access ? 'bg-gold/10 border-gold/40 text-gold shadow-[0_0_15px_rgba(198,169,95,0.1)]' : 'bg-white/5 border-white/10 text-white/30'}`}>
                                                {user.lifetime_access ? <Check size={16} /> : <X size={16} />}
                                                <span className="text-sm font-bold uppercase tracking-widest">{user.lifetime_access ? 'Vitalicio' : 'Limitado'}</span>
                                            </div>

                                            <Button
                                                variant={user.lifetime_access ? 'ghost' : 'primary'}
                                                className={`rounded-2xl h-11 px-6 ${user.lifetime_access ? 'bg-white/5 hover:bg-red-500/10 hover:text-red-400' : 'shadow-lg shadow-gold/20'}`}
                                                onClick={() => handleToggleAccess(user)}
                                                disabled={actionLoading === user.id}
                                            >
                                                {actionLoading === user.id ? '...' : (user.lifetime_access ? 'Quitar Acceso' : 'Dar Acceso')}
                                            </Button>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </MeshBackground>
    )
}
