import { MeshBackground } from '@/shared/components/mesh-background'
import { GlassCard } from '@/shared/components/glass-card'
import { Button } from '@/shared/components/ui-button'
import { BookOpen, Download } from 'lucide-react'

export default function EbookPage() {
    // En producción esto idealmente usa el link de descarga público del storage
    const pdfUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ebook/metodo-tri-neo.pdf`
        : '/ebook.pdf'

    return (
        <MeshBackground className="p-6 min-h-[100dvh] pt-16 flex flex-col justify-center pb-32">
            <div className="max-w-md mx-auto w-full z-10 relative">
                <GlassCard className="text-center overflow-hidden relative">

                    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-petrol/10 mix-blend-overlay"></div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-xl">
                            <BookOpen size={40} className="text-gold" />
                        </div>

                        <h1 className="font-headings text-3xl font-bold text-white mb-4 text-balance">
                            Reprograma tu mente en 21 días.
                        </h1>

                        <p className="font-sans text-white/70 text-lg mb-10 text-balance leading-relaxed">
                            El audio regula tu mente al instante. El libro te ayuda a entenderla y hackearla a largo plazo.
                        </p>

                        <a href="/ebook.pdf" download="Ebook_Metodo_TRI-NEO.pdf" className="block w-full">
                            <Button variant="primary" className="w-full flex items-center justify-center gap-3">
                                <Download size={20} />
                                Descargar PDF
                            </Button>
                        </a>
                    </div>

                </GlassCard>
            </div>
        </MeshBackground>
    )
}
