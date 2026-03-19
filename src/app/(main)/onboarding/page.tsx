'use client'

import { useState } from 'react'
import { MeshBackground } from '@/shared/components/mesh-background'
import { GlassCard } from '@/shared/components/glass-card'
import { Button } from '@/shared/components/ui-button'
import { saveOnboarding } from './actions'

const STEPS = [
    {
        title: '¿Cuántas horas pasás frente a pantallas?',
        key: 'screen_hours',
        options: ['3–5 horas', '6–8 horas', '9–12 horas', '12+ horas']
    },
    {
        title: '¿Cuál es tu tipo de trabajo principal?',
        key: 'work_type',
        options: ['Desarrollo / Tech', 'Creativo digital', 'Marketing digital', 'Emprendimiento online', 'Trabajo remoto general']
    },
    {
        title: 'Principal señal de saturación',
        key: 'saturation_signs',
        options: ['Ruido mental', 'Dificultad para desconectar', 'Multitarea agotadora', 'Insomnio digital', 'Mente acelerada']
    },
    {
        title: '¿En qué momento te sentís peor?',
        key: 'critical_moment',
        options: ['Antes de trabajar', 'Durante trabajo intenso', 'Después de trabajar', 'Antes de dormir']
    },
    {
        title: '¿Qué buscás con este sistema?',
        key: 'intention',
        options: ['Más claridad', 'Más foco profundo', 'Apagar mi mente a la noche', 'Sentirme mentalmente liviano']
    }
]

export default function OnboardingPage() {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)

    const handleSelect = (option: string) => {
        const currentStepData = STEPS[step]
        const newAnswers = { ...answers, [currentStepData.key]: option }
        setAnswers(newAnswers)

        if (step < STEPS.length - 1) {
            setTimeout(() => setStep(step + 1), 300)
        }
    }

    const finishOnboarding = async () => {
        setLoading(true)
        try {
            await saveOnboarding(answers as any)
        } catch (e) {
            console.error(e)
            setLoading(false)
        }
    }

    const currentStepData = STEPS[step]

    return (
        <MeshBackground className="flex items-center justify-center p-6 min-h-[100dvh]">
            <div className="w-full max-w-lg z-10 animate-fade-in relative">
                <div className="absolute top-[-40px] left-0 w-full flex justify-between items-center px-2">
                    <span className="text-white/60 font-sans text-sm">Paso {step + 1} de {STEPS.length}</span>
                    <div className="flex gap-1">
                        {STEPS.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-300 ${i <= step ? 'w-4 bg-gold' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </div>
                </div>

                <GlassCard className="animate-slide-up" key={step}>
                    <h2 className="font-headings text-2xl sm:text-3xl text-white font-medium mb-8 text-center text-balance">
                        {currentStepData.title}
                    </h2>

                    <div className="flex flex-col gap-3">
                        {currentStepData.options.map((opt) => {
                            const isSelected = answers[currentStepData.key] === opt
                            return (
                                <button
                                    key={opt}
                                    onClick={() => handleSelect(opt)}
                                    disabled={loading}
                                    className={`
                    w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300
                    font-sans text-lg 
                    ${isSelected
                                            ? 'bg-petrol/40 border-gold/50 text-white'
                                            : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30'
                                        }
                  `}
                                    style={isSelected ? { boxShadow: '0 0 15px rgba(198, 169, 95, 0.2)' } : undefined}
                                >
                                    {opt}
                                </button>
                            )
                        })}
                    </div>

                    {step === STEPS.length - 1 && answers[currentStepData.key] && (
                        <div className="mt-8 animate-fade-in">
                            <Button
                                variant="primary"
                                className="w-full shadow-gold/20 shadow-xl"
                                onClick={finishOnboarding}
                                disabled={loading}
                            >
                                {loading ? 'Activando...' : 'Activar mi sistema'}
                            </Button>
                        </div>
                    )}
                </GlassCard>
            </div>
        </MeshBackground>
    )
}
