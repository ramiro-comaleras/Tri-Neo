import Link from 'next/link'
import { MeshBackground } from '@/shared/components/mesh-background'
import { Button } from '@/shared/components/ui-button'

export default function WelcomePage() {
    return (
        <MeshBackground className="flex flex-col items-center justify-center min-h-[100dvh] px-6 py-12">
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto text-center z-10 animate-slide-up">

                <div className="w-40 h-40 mb-10 relative">
                    <img
                        src="/logo.png"
                        alt="TRI-NEO Logo"
                        className="w-full h-full object-contain filter drop-shadow-2xl"
                    />
                </div>

                <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight text-balance">
                    Recuperá claridad mental.
                </h1>

                <p className="font-sans text-white/80 text-lg sm:text-xl mb-12 max-w-sm text-balance">
                    Sistema en 3 fases para regular tu mente digital sobreestimulada.
                </p>

                <div className="w-full flex flex-col gap-4 mt-8">
                    <Link href="/onboarding" className="w-full">
                        <Button variant="primary" className="w-full text-lg shadow-xl shadow-petrol/20">
                            Empezar
                        </Button>
                    </Link>

                    <Link href="/login" className="w-full">
                        <Button variant="secondary" className="w-full text-lg">
                            Ya tengo acceso
                        </Button>
                    </Link>
                </div>
            </div>
        </MeshBackground>
    )
}
