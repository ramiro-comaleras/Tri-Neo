'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Play, Volume2, VolumeX, ChevronDown, Check } from 'lucide-react'
import './landing.css'

export default function LandingPage() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const faqs = [
    { q: '¿Necesito experiencia previa?', a: 'No. El neuroentrenamiento está diseñado para guiarte desde cero. Solo necesitas el compromiso de escuchar el audio diario correspondiente.' },
    { q: '¿Cuánto tiempo lleva por día?', a: 'Las prácticas toman entre 10 y 15 minutos diarios. Están pensadas para encajar en una vida ocupada, no para sumar más carga a tu rutina.' },
    { q: '¿Cómo accedo al material?', a: 'Al unirte, creas tu usuario y contraseña. Con eso ingresas directamente a nuestra plataforma web app desde tu celular o computadora.' },
    { q: '¿La app ya está disponible?', a: 'Sí. Desarrollamos una web app dedicada (PWA) para que puedas escuchar los audios, leer el libro y seguir tu proceso de 21 días sin distracciones de otras apps.' },
    { q: '¿Es un pago mensual?', a: 'No. Es un pago único que te da acceso de por vida a la plataforma, al método de 21 días, a la app y a sus futuras actualizaciones.' },
    { q: '¿Voy a poder hacerlo a mi ritmo?', a: 'Totalmente. Aunque el reto propuesto es de 21 días continuos, el acceso de por vida te permite pausar o retomar cuando lo sientas necesario.' }
  ]

  return (
    <main className="landing-body">
      
      {/* 1. Hero Premium */}
      <section className="hero-wrapper">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video-bg"
          poster="/vision_board_new.jpg"
        >
          {/* We assume the user will upload a video later, fallback to the vision board image using poster for now */}
        </video>
        <div className="hero-overlay"></div>
        
        <div className="hero-content container-narrow animate-fade-up">
          <p className="text-white/60 tracking-[0.2em] uppercase text-xs font-semibold mb-8">Método TRI-NEO</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
            Cuando la mente se<br className="block md:hidden"/> calma,<br className="hidden md:block"/>
            la vida se ordena.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light">
            21 días para reducir el ruido mental, recuperar claridad y volver a enfocarte en lo que realmente importa.
          </p>
          
          <div className="flex justify-center md:flex-wrap items-center gap-2 md:gap-4 text-[10px] sm:text-xs md:text-sm text-white/70 mb-12 w-full max-w-full overflow-hidden">
            <span className="flex items-center gap-1 whitespace-nowrap"><Check size={14}/> App Mobile</span>
            <span className="flex items-center gap-1 whitespace-nowrap"><Check size={14}/> 3 Audios Guiados</span>
            <span className="flex items-center gap-1 whitespace-nowrap"><Check size={14}/> Ebook Teórico</span>
            <span className="flex items-center gap-1 whitespace-nowrap"><Check size={14}/> Acceso vitalicio</span>
          </div>

          <a href="#oferta" className="btn-primary-inverse">
            Empezar ahora
          </a>
        </div>
      </section>

      {/* 2. El Problema Moderno */}
      <section className="section-padding bg-[var(--color-smoke)]">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-12 leading-tight">
            No te falta disciplina.<br/>
            <span className="italic text-[var(--color-petroleum)]">Te sobra saturación mental.</span>
          </h2>
          
          <div className="text-left md:text-center text-lg text-black/70 space-y-6 max-w-xl mx-auto font-light">
            <p>Pasás demasiadas horas detrás de pantallas.</p>
            <p>Sentís que tu atención se dispersa a lo largo del día y cada vez te cuesta más sostener el enfoque.</p>
            <p>Tu cabeza nunca frena del todo. Vivís procesando información, notificaciones y estímulos constantes.</p>
            <p className="font-medium text-black/90">
              No sentís que te falte capacidad. Sentís que te sobra ruido. Y cuando la mente está saturada, es imposible estar realmente presente.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Qué es TRI-NEO */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black/40 mb-4">La Solución</h2>
          <h3 className="text-3xl md:text-4xl font-serif mb-8">¿Qué es TRI-NEO?</h3>
          <p className="text-lg text-black/70 max-w-2xl mx-auto font-light leading-relaxed mb-16">
            TRI-NEO es un neuroentrenamiento práctico de 21 días. No vas a encontrar teorías eternas ni filosofía compleja. Es un proceso simple, claro y progresivo diseñado específicamente para la mente moderna sobreestimulada.
          </p>
          
          {/* Mockup Premium Placeholder */}
          <div className="aspect-[16/9] w-full max-w-4xl mx-auto bg-[#F5F5F7] rounded-3xl overflow-hidden border border-black/5 relative shadow-2xl flex items-center justify-center">
             <img src="/tri_neo_mockup_caribbean_1773948768809.png" alt="TRI-NEO App Interface" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 4. Método en 3 fases */}
      <section className="section-padding bg-[var(--color-smoke)]">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif">El método en 3 fases</h2>
            <p className="text-black/60 mt-4">Un proceso progresivo para recuperar el control de tu atención.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="method-card">
              <span className="method-number">1</span>
              <h3 className="text-xl font-bold mb-4">Calmar el sistema</h3>
              <p className="text-black/70 font-light line-clamp-4">
                El primer paso no es hacer más, es frenar. Prácticas diseñadas para apagar la alerta constante de tu sistema nervioso, bajar el ruido inicial y darle espacio a tu mente para respirar.
              </p>
            </div>
            
            <div className="method-card">
              <span className="method-number">2</span>
              <h3 className="text-xl font-bold mb-4">Reconfigurar la atención</h3>
              <p className="text-black/70 font-light line-clamp-4">
                Una vez que el agua se calma, podés ver el fondo. Aquí aprendés a salir del piloto automático, volver al cuerpo y recuperar la musculatura de tu atención para sostener el foco.
              </p>
            </div>

            <div className="method-card">
              <span className="method-number">3</span>
              <h3 className="text-xl font-bold mb-4">Expandir presencia</h3>
              <p className="text-black/70 font-light line-clamp-4">
                Desde una mente menos saturada, todo cambia. En esta fase finales abrimos espacio para que surjan la claridad, la intuición y la creatividad de forma natural y fluida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Qué incluye + 6. Beneficios (Merged visually for flow) */}
      <section className="section-padding bg-white border-t border-black/5">
        <div className="container-wide grid md:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl font-serif mb-10">Tu ecosistema de práctica</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[var(--color-sand)] text-[var(--color-petroleum)] p-2 rounded-full"><Play size={16}/></div>
                <div>
                  <h4 className="font-bold text-lg">App Web Dedicada</h4>
                  <p className="text-black/60 font-light">Una plataforma hermosa y sin distracciones para tu proceso.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[var(--color-sand)] text-[var(--color-petroleum)] p-2 rounded-full"><Volume2 size={16}/></div>
                <div>
                  <h4 className="font-bold text-lg">3 Audios Guiados Premium</h4>
                  <p className="text-black/60 font-light">Diseñados neuroacústicamente para cada una de las 3 fases.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[var(--color-sand)] text-[var(--color-petroleum)] p-2 rounded-full"><Check size={16}/></div>
                <div>
                  <h4 className="font-bold text-lg">Ebook "El Método"</h4>
                  <p className="text-black/60 font-light">50 páginas con la base clínica, filosófica y práctica.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[var(--color-sand)] text-[var(--color-petroleum)] p-2 rounded-full"><Check size={16}/></div>
                <div>
                  <h4 className="font-bold text-lg">Acceso Vitalicio</h4>
                  <p className="text-black/60 font-light">Seguimiento de 21 días. Sin suscripciones. Tuyo para siempre.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[var(--color-petroleum)] text-white p-10 md:p-16 rounded-[2rem]">
            <h3 className="text-2xl font-serif mb-8 text-[var(--color-sand)]">Lo que empieza a cambiar</h3>
            <ul className="space-y-4 font-light text-white/80">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-sand)]"></div> Menos ruido mental constante.</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-sand)]"></div> Más claridad para tomar decisiones.</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-sand)]"></div> Capacidad de sostener foco en tu trabajo.</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-sand)]"></div> Sensación real de estar presente en tu vida.</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-sand)]"></div> Retorno natural de tu creatividad e intuición.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 7. Historia del fundador */}
      <section className="section-padding bg-[var(--color-smoke)]">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-5/12 aspect-[3/4] rounded-2xl overflow-hidden bg-black/5">
              <img src="/vision_board_new.jpg" alt="Ramiro en Bocas del Toro" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-7/12">
              <h2 className="text-3xl font-serif mb-6">De la saturación a la claridad</h2>
              <div className="text-black/70 space-y-4 font-light">
                <p>Hace un tiempo, sentía que tenía la cabeza llena todo el tiempo. Pensamientos, planes, ruido constante. Me di cuenta de que por más que cambiara de lugar, si mi mente seguía igual, la saturación viajaba conmigo.</p>
                <p>Pasé los últimos 5 años viajando por América, viviendo con comunidades en el Amazonas y participando en retiros de más de 100 horas de silencio clínico y meditación profunda.</p>
                <p>TRI-NEO es la síntesis de esa búsqueda larga y honda, despojada de adornos y adaptada a la vida real. Es el método que me hubiera gustado tener cuando sentía que el ruido de la ciudad me estaba ganando.</p>
                <p className="font-medium text-black mt-6">Ramiro</p>
                <p className="text-sm uppercase tracking-widest text-black/40">Fundador</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonios */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <h2 className="text-3xl font-serif text-center mb-16">Lo que experimentan quienes lo cruzan</h2>
          
          <div className="space-y-12">
            <div className="testimonial-block">
              <p className="italic text-lg text-black/80 font-serif mb-4">
                "Antes de TRI-NEO me levantaba y ya agarraba el celular por inercia. Vivía acelerada. Con la Fase 1 sentí por primera vez en meses que mi cuerpo bajaba un cambio. Ahora uso el audio cada mañana antes de arrancar."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-xs font-bold">L</div>
                <div>
                  <p className="font-bold text-sm">Lucía Rodríguez</p>
                  <p className="text-xs text-black/50">Completó el proceso de 21 días</p>
                </div>
              </div>
            </div>

            <div className="testimonial-block">
              <p className="italic text-lg text-black/80 font-serif mb-4">
                "El Ebook me cambió la forma de ver mi propia distracción. Entender que es saturación y no falta de ganas me quitó un peso enorme. El entrenamiento de atención en la Fase 2 es clave para mi trabajo."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-xs font-bold">J</div>
                <div>
                  <p className="font-bold text-sm">Javier M.</p>
                  <p className="text-xs text-black/50">Emprendedor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Oferta Final */}
      <section id="oferta" className="section-padding bg-[var(--color-petroleum)] text-white text-center">
        <div className="container-narrow">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[var(--color-sand)]">Recuperá tu claridad mental</h2>
          <p className="text-lg text-white/70 font-light mb-12 max-w-xl mx-auto">
            Únete a la plataforma hoy y obtén acceso de por vida al neuroentrenamiento completo de 21 días.
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 max-w-md mx-auto mb-10 backdrop-blur-md">
            <div className="text-xs font-bold tracking-widest uppercase text-white/40 mb-2">Acceso Total</div>
            <div className="text-5xl font-serif font-light mb-8">US$ 19</div>
            
            <a href="https://wa.me/5493433031111?text=Hola,%20quiero%20comenzar%20el%20reto%20TRI-NEO..." target="_blank" rel="noopener noreferrer" className="btn-primary-inverse w-full block mb-4">
              Comenzar ahora
            </a>
            
            <Link href="/login" className="text-sm text-white/40 hover:text-white transition-colors block mt-6">
              Ya tengo una cuenta. Iniciar sesión.
            </Link>
          </div>

          <p className="text-sm text-white/30">* Pago único. Sin suscripciones ocultas.</p>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="section-padding bg-[var(--color-smoke)]">
        <div className="container-narrow">
          <h2 className="text-3xl font-serif text-center mb-12">Preguntas Frecuentes</h2>
          
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''} text-black/40`}
                  />
                </div>
                {openFaq === idx && (
                  <div className="faq-answer animate-fade-up">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="py-12 bg-white text-center border-t border-black/5">
        <div className="container-narrow">
          <img src="/logo_final.png" alt="TRI-NEO" className="w-12 h-12 mx-auto mb-6 opacity-30 grayscale" />
          <p className="text-sm text-black/40">© 2026 TRI-NEO. Diseñado para la claridad.</p>
        </div>
      </footer>

      {/* Ambient Audio Player (Subtle approach) */}
      <audio id="landing-ambient" ref={audioRef} loop>
        <source src="/audios/ambient.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl border ${
          isPlaying 
            ? 'bg-[var(--color-petroleum)] text-[var(--color-sand)] border-white/10' 
            : 'bg-white text-black/40 border-black/10'
        }`}
        aria-label="Toggle ambient sound"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

    </main>
  )
}
