'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/shared/components/glass-card'
import { Button } from '@/shared/components/ui-button'
import { Share, PlusSquare, X } from 'lucide-react'

export function PwaInstallPrompt() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if seen before
        const hasSeen = localStorage.getItem('pwa_prompt_seen')
        
        // Check if already installed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        
        // Only show on iOS/Safari (approximate check) or if not standalone
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream

        if (!hasSeen && !isStandalone && isIOS) {
            // Delay slightly for better effect
            const timer = setTimeout(() => setIsVisible(true), 2000)
            return () => clearTimeout(timer)
        }
    }, [])

    const dismiss = () => {
        setIsVisible(false)
        localStorage.setItem('pwa_prompt_seen', 'true')
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-6 animate-slide-up">
            <GlassCard className="max-w-md mx-auto relative overflow-hidden border-gold/30 shadow-2xl shadow-black/50">
                <button 
                    onClick={dismiss}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-4 border border-gold/20">
                        <PlusSquare className="text-gold" size={32} />
                    </div>

                    <h3 className="font-headings text-xl font-bold text-white mb-2">
                        Instala TRI-NEO en tu inicio
                    </h3>
                    <p className="font-sans text-sm text-white/70 mb-6 px-4">
                        Lleva tu proceso de 21 días siempre contigo como una app nativa en tu iPhone.
                    </p>

                    <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col gap-4 text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 shrink-0">
                                <Share size={18} />
                            </div>
                            <p className="text-xs text-white/80">
                                1. Toca el botón <strong>Compartir</strong> en Safari.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 shrink-0">
                                <PlusSquare size={18} />
                            </div>
                            <p className="text-xs text-white/80">
                                2. Busca <strong>"Agregar a pantalla de inicio"</strong>.
                            </p>
                        </div>
                    </div>

                    <Button 
                        variant="primary" 
                        onClick={dismiss}
                        className="w-full mt-6 shadow-xl shadow-gold/10"
                    >
                        ¡Entendido!
                    </Button>
                </div>
            </GlassCard>
        </div>
    )
}
