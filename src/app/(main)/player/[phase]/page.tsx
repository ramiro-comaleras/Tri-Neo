'use client'

import { useState, useRef, useEffect, use } from 'react'
import { MeshBackground } from '@/shared/components/mesh-background'
import { Button } from '@/shared/components/ui-button'
import { GlassCard } from '@/shared/components/glass-card'
import { Play, Pause, ArrowLeft } from 'lucide-react'
import { saveSessionAndCheckin } from './actions'
import Link from 'next/link'

const PHASE_DETAILS = {
    '1': {
        title: 'Calmar el sistema',
        duration: 6,
        days: 'Día 1–7',
        description: 'Esta práctica entrena el gesto más simple y más profundo: volver. Volver a la respiración, al cuerpo y al momento presente. No buscás silencio ni resultados; entrenás el hábito de estar. Cada regreso le enseña al sistema nervioso que puede soltar, y algo interno empieza a ordenar el ritmo. La mente sigue activa, pero el cuerpo se regula y aparece una primera claridad. Si hay ruido o resistencia, no es un error: es la señal de que el entrenamiento ya comenzó y de que existe un lugar seguro al que podés volver.'
    },
    '2': {
        title: 'Reconfigurar atención y foco',
        duration: 11,
        days: 'Día 8–14',
        description: 'En esta etapa la atención desciende de la mente al cuerpo. Al recorrer las sensaciones entrenás la ecuanimidad: sentir sin reaccionar, observar sin intervenir. Con la práctica, sentiras que ya no reaccionas como antes y la mente se vuelve mas estable. Empezás a notar antes cuándo algo se activa en vos, y se abre un espacio interno entre el estímulo y la respuesta. El foco deja de forzarse y se sostiene solo. En ese intervalo silencioso, aparece la libertad de elegir.'
    },
    '3': {
        title: 'Presencia expandida',
        duration: 15,
        days: 'Día 15–21',
        description: 'La atención se abre y se vuelve amplia, como dejarse sostener por el Mar. No hay esfuerzo ni dirección: solo flotar. Pensamientos, emociones y sensaciones aparecen y se disuelven sin centro fijo, como olas que pasan. Hay menos reactividad y más intuición, una confianza profunda que no depende de nada externo. No es un cierre ni una meta: es el recuerdo de una unidad tranquila, un modo de estar donde ya no estás separado de lo que ocurre.'
    }
}

export default function PlayerPage(props: { params: Promise<{ phase: string }> }) {
    const params = use(props.params)
    const phaseId = params.phase as keyof typeof PHASE_DETAILS
    const phase = PHASE_DETAILS[phaseId] || PHASE_DETAILS['1']

    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [audioDuration, setAudioDuration] = useState(0)
    const [showCheckin, setShowCheckin] = useState(false)
    const [clarityScore, setClarityScore] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)

    const audioRef = useRef<HTMLAudioElement>(null)

    const AUDIO_FILES = {
        '1': '/audios/phase-1-5min.mp3',
        '2': '/audios/phase-2-10min.mp3',
        '3': '/audios/phase-3-15min.mp3'
    }
    const audioUrl = AUDIO_FILES[phaseId] || AUDIO_FILES['1']

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error(e))
            } else {
                audioRef.current.pause()
            }
        }
    }, [isPlaying])

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime
            const total = audioRef.current.duration
            setCurrentTime(current)
            if (total > 0) {
                setAudioDuration(total)
                setProgress((current / total) * 100)
            }
        }
    }

    const handleAudioEnd = () => {
        setIsPlaying(false)
        setShowCheckin(true)
    }

    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || seconds === 0) return '0:00'
        const m = Math.floor(seconds / 60)
        const s = Math.floor(seconds % 60)
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    const handleFinish = async () => {
        if (clarityScore) {
            setLoading(true)
            try {
                await saveSessionAndCheckin({
                    phase_number: parseInt(phaseId),
                    duration_minutes: phase.duration,
                    clarity_score: clarityScore
                })
            } catch (e) {
                console.error(e)
                setLoading(false)
            }
        }
    }

    return (
        <MeshBackground className="flex flex-col min-h-[100dvh]">
            {!showCheckin ? (
                <div className="flex flex-col flex-1 w-full z-10 animate-fade-in">
                    {/* Back button */}
                    <Link href="/home" className="absolute top-6 left-6 text-white/50 hover:text-white flex items-center gap-1 transition-colors z-20">
                        <ArrowLeft size={20} />
                    </Link>

                    {/* Main content - scrollable */}
                    <div className="flex flex-col items-center flex-1 px-6 pt-20 pb-10 overflow-y-auto">
                        {/* Title */}
                        <h1 className="font-display text-2xl sm:text-3xl text-white font-bold mb-2 text-center text-balance leading-tight">
                            Fase {phaseId} — {phase.title}
                        </h1>

                        {/* Days badge */}
                        <span className="text-white/40 text-xs font-sans uppercase tracking-[0.25em] mb-10">
                            {phase.days}
                        </span>

                        {/* Play button */}
                        <div
                            className="relative w-28 h-28 flex items-center justify-center mb-6 cursor-pointer group"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl group-hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
                                {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1.5" />}
                            </div>

                            {/* Ripples when playing */}
                            {isPlaying && (
                                <div className="absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                            )}
                        </div>

                        {/* Progress bar */}
                        <div className="w-full max-w-sm mb-2">
                            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white/40 transition-all duration-300 ease-linear rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Time */}
                        <div className="text-center font-sans text-base font-light tracking-widest text-white/40 mb-10 tabular-nums">
                            {formatTime(audioDuration > 0 ? audioDuration : phase.duration * 60)}
                        </div>

                        {/* Description text */}
                        <p className="font-sans text-base sm:text-lg text-white/60 text-center leading-relaxed max-w-md px-2">
                            {phase.description}
                        </p>
                    </div>

                    <audio
                        ref={audioRef}
                        src={audioUrl}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleAudioEnd}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 px-6">
                    <div className="w-full max-w-md z-10 animate-slide-up">
                        <GlassCard className="text-center">
                            <h2 className="font-display text-3xl font-bold text-white mb-4">Check-in</h2>
                            <p className="font-sans text-white/70 mb-10 text-lg">¿Cómo sentís tu claridad mental ahora?</p>

                            <div className="flex justify-between items-center mb-12 gap-2">
                                {[1, 2, 3, 4, 5].map((score) => (
                                    <button
                                        key={score}
                                        onClick={() => setClarityScore(score)}
                                        className={`
                                            w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold font-sans transition-all duration-300
                                            ${clarityScore === score
                                                ? 'bg-gold text-petrol scale-110'
                                                : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/10'}
                                        `}
                                        style={clarityScore === score ? { boxShadow: '0 0 20px rgba(198, 169, 95, 0.4)' } : undefined}
                                    >
                                        {score}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between text-xs font-sans text-white/50 uppercase tracking-widest px-2 mb-10">
                                <span>Saturado</span>
                                <span>Muy Claro</span>
                            </div>

                            <Button
                                variant="primary"
                                className="w-full shadow-gold/20 shadow-xl"
                                onClick={handleFinish}
                                disabled={!clarityScore || loading}
                            >
                                {loading ? 'Guardando...' : 'Guardar y Ver Progreso'}
                            </Button>
                        </GlassCard>
                    </div>
                </div>
            )}
        </MeshBackground>
    )
}
