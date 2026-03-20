'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, Volume2, ChevronDown, Check } from 'lucide-react'
import './landing.css'

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => elements.forEach((el) => observer.unobserve(el))
  }, [])
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  useScrollReveal()

  const faqs = [
    { q: '¿Necesito experiencia previa?', a: 'No. El neuroentrenamiento está diseñado para guiarte desde cero. Solo necesitas el compromiso de escuchar el audio diario.' },
    { q: '¿Cuánto tiempo lleva por día?', a: 'Las prácticas toman entre 10 y 15 minutos diarios. Están pensadas para encajar en una vida ocupada, no para sumar más carga a tu rutina.' },
    { q: '¿Cómo accedo al material?', a: 'Al unirte, creas tu usuario y contraseña. Con eso ingresas directamente a nuestra plataforma web app desde tu celular o computadora.' },
    { q: '¿La app ya está disponible?', a: 'Sí. Desarrollamos una web app dedicada (PWA) para que puedas escuchar los audios, leer el libro y seguir tu proceso sin distracciones.' },
    { q: '¿Es un pago mensual?', a: 'No. Es un pago único que te da acceso de por vida a la plataforma, al método de 21 días, a la app y a sus futuras actualizaciones.' },
    { q: '¿Voy a poder hacerlo a mi ritmo?', a: 'Totalmente. Aunque el reto propuesto es de 21 días continuos, el acceso de por vida te permite pausar o retomar cuando lo sientas necesario.' }
  ]

  return (
    <main className="landing-body overflow-x-hidden">
      
      {/* 1. Hero Premium */}
      <section className="hero-wrapper">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video-bg"
          poster="/fondo hero.jpeg"
        >
        </video>
        <div className="hero-overlay"></div>
        
        <div className="hero-content container-narrow animate-fade-up">
          <p className="text-[var(--color-sand)] tracking-[0.3em] uppercase text-[10px] font-semibold mb-6">Método TRI-NEO</p>
          <h1 className="text-[2.6rem] sm:text-4xl md:text-6xl font-serif text-white leading-[1.1] mb-8 drop-shadow-lg">
            Cuando la mente se<br className="block md:hidden"/>
            calma,<br className="block md:hidden"/>
            la vida se ordena.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light text-balance px-4 drop-shadow-md">
            21 días para reducir el ruido mental, recuperar claridad y volver a enfocarte en lo que realmente importa.
          </p>
          
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-[10px] sm:text-xs md:text-sm text-white/60 mb-14 w-full max-w-lg mx-auto px-2">
            <div className="flex flex-col items-center gap-1.5"><Check size={16} className="text-[var(--color-sand)]"/> <span className="whitespace-nowrap">App dedicada</span></div>
            <div className="flex flex-col items-center gap-1.5"><Check size={16} className="text-[var(--color-sand)]"/> <span className="whitespace-nowrap">3 Audios</span></div>
            <div className="flex flex-col items-center gap-1.5"><Check size={16} className="text-[var(--color-sand)]"/> <span className="whitespace-nowrap">Ebook</span></div>
            <div className="flex flex-col items-center gap-1.5"><Check size={16} className="text-[var(--color-sand)]"/> <span className="whitespace-nowrap">Acceso de por vida</span></div>
          </div>

          <a href="#oferta" className="btn-cta-hero">
            Empezar ahora
          </a>
        </div>
      </section>

      {/* 2. El Problema Moderno */}
      <section className="section-padding bg-[var(--color-smoke)] relative">
        <div className="ambient-glow glow-petroleum w-[600px] h-[600px] top-0 left-[-300px]"></div>
        <div className="container-narrow text-center reveal">
          <h2 className="text-3xl md:text-5xl font-serif mb-12 leading-tight">
            No se trata de falta de capacidad.<br/>
            <span className="italic text-[var(--color-sand)]">Se trata de exceso de ruido.</span>
          </h2>
          
          <div className="glass-panel p-8 md:p-12 text-left md:text-center text-lg text-white/70 space-y-6 max-w-xl mx-auto font-light leading-relaxed">
            <p>Pasás muchas horas detrás de pantallas.</p>
            <p>Tu atención se fragmenta a lo largo del día.</p>
            <p>Te cuesta sostener el foco, estar presente y sentir claridad.</p>
            <p className="font-medium text-white pt-4">
              No necesariamente te falta disciplina.<br/> 
              Muchas veces, lo que sobra es saturación mental.
            </p>
            <p className="pt-2">
              Y cuando la mente vive procesando estímulos todo el tiempo,<br/>
              hasta lo simple empieza a sentirse pesado.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Qué es TRI-NEO */}
      <section className="section-padding relative">
        <div className="ambient-glow glow-petroleum w-[800px] h-[800px] right-[-400px] bottom-0"></div>
        <div className="container-narrow text-center reveal">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white/40 mb-4">La Solución</h2>
          <h3 className="text-3xl md:text-4xl font-serif mb-8 text-[var(--color-sand)]">¿Qué es TRI-NEO?</h3>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed mb-16">
            TRI-NEO es un neuroentrenamiento práctico de 21 días. No vas a encontrar teorías eternas ni filosofía compleja. Es un proceso simple, claro y progresivo diseñado específicamente para la mente moderna sobreestimulada.
          </p>
          
          <div className="aspect-[9/17] w-full max-w-xs mx-auto rounded-3xl overflow-hidden relative shadow-2xl flex items-center justify-center p-2 bg-gradient-to-tr from-white/5 to-white/10 ring-1 ring-white/10">
             <video 
               autoPlay 
               loop 
               muted 
               playsInline 
               className="w-full h-full object-cover rounded-2xl"
               style={{ objectPosition: 'center bottom' }}
               poster="/interfaz app/interfaz app-Cover.jpg"
             >
               <source src="/interfaz app/interfaz-app.mp4" type="video/mp4" />
               <source src="/interfaz app/interfaz app.mov" type="video/quicktime" />
             </video>
          </div>
        </div>
      </section>

      {/* 4. Método en 3 fases */}
      <section className="section-padding bg-[var(--color-smoke)] relative">
        <div className="ambient-glow glow-sand w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-0"></div>
        <div className="container-wide">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-serif">El método en 3 fases</h2>
            <p className="text-white/60 mt-4">Un proceso progresivo para recuperar el control de tu atención.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-10 reveal delay-100">
              <span className="method-number">1</span>
              <h3 className="text-xl font-bold mb-4 text-[var(--color-sand)]">Calmar el sistema</h3>
              <p className="text-white/70 font-light">
                El primer paso no es hacer más, es frenar. Prácticas diseñadas para apagar la alerta constante de tu sistema nervioso, bajar el ruido inicial y darle espacio a tu mente para respirar.
              </p>
            </div>
            
            <div className="glass-panel p-10 reveal delay-200">
              <span className="method-number">2</span>
              <h3 className="text-xl font-bold mb-4 text-[var(--color-sand)]">Reconfigurar la atención</h3>
              <p className="text-white/70 font-light">
                Una vez que el agua se calma, podés ver el fondo. Aquí aprendés a salir del piloto automático, volver al cuerpo y recuperar la musculatura de tu atención para sostener el foco.
              </p>
            </div>

            <div className="glass-panel p-10 reveal delay-300">
              <span className="method-number">3</span>
              <h3 className="text-xl font-bold mb-4 text-[var(--color-sand)]">Expandir presencia</h3>
              <p className="text-white/70 font-light">
                Desde una mente menos saturada, todo cambia. En esta fase final abrimos espacio para que surjan la claridad, la intuición y la creatividad de forma natural y fluida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Qué incluye + 6. Beneficios */}
      <section className="section-padding relative border-t border-white/5">
        <div className="container-wide grid md:grid-cols-2 gap-16 items-center">
          
          <div className="reveal">
            <h2 className="text-3xl font-serif mb-10 text-[var(--color-sand)]">Tu ecosistema de práctica</h2>
            <ul className="space-y-8 text-left">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[var(--color-sand)] text-[var(--color-petroleum)] p-2 rounded-full"><Play size={16}/></div>
                <div>
                  <h4 className="font-bold text-lg leading-tight mb-1 text-white">App web dedicada</h4>
                  <p className="text-white/60 font-light">Una plataforma simple, clara y sin distracciones para hacer el proceso a tu ritmo.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[var(--color-sand)] text-[var(--color-petroleum)] p-2 rounded-full"><Volume2 size={16}/></div>
                <div>
                  <h4 className="font-bold text-lg leading-tight mb-1 text-white">3 audios guiados</h4>
                  <p className="text-white/60 font-light">Diseñados neuroacústicamente para cada una de las 3 fases.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[var(--color-sand)] text-[var(--color-petroleum)] p-2 rounded-full"><Check size={16}/></div>
                <div>
                  <h4 className="font-bold text-lg leading-tight mb-1 text-white">Ebook del método</h4>
                  <p className="text-white/60 font-light">La base teórica, práctica y filosófica de TRI-NEO, explicada de forma clara y aplicable.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[var(--color-sand)] text-[var(--color-petroleum)] p-2 rounded-full"><Check size={16}/></div>
                <div>
                  <h4 className="font-bold text-lg leading-tight mb-1 text-white">Acceso de por vida</h4>
                  <p className="text-white/60 font-light">
                    Pago único. Sin suscripciones.<br/>
                    El proceso queda disponible para vos siempre.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-10 md:p-16 reveal delay-100">
            <h3 className="text-2xl font-serif mb-8 text-white">Lo que empieza a cambiar</h3>
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
      <section className="section-padding bg-[var(--color-smoke)] relative">
        <div className="ambient-glow glow-petroleum w-[600px] h-[600px] top-1/2 -translate-y-1/2 left-[-100px]"></div>
        <div className="container-narrow reveal">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-5/12 aspect-[3/4] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <img src="/historia.jpeg" alt="Ramiro - Fundador de TRI-NEO" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-7/12">
              <h2 className="text-3xl font-serif mb-6 text-[var(--color-sand)]">De la saturación a la claridad</h2>
              <div className="text-white/70 space-y-5 font-light leading-relaxed">
                <p>Durante un tiempo cumplí varias metas que pensaba que me iban a hacer sentir pleno. Había comprado mi casa, mi auto, vivía viajando y, desde afuera, parecía que todo estaba bastante bien.</p>
                <p className="font-medium text-white">Pero adentro seguía habiendo ruido.</p>
                <p>Ahí entendí algo que me cambió la mirada: cumplí cosas que pensé que me iban a llenar, pero la plenitud no apareció porque el desorden estaba adentro.</p>
                <p>Desde esa búsqueda empecé a profundizar más: viajé por América, compartí tiempo con comunidades dentro del Amazonas y participé en retiros en las montañas, explorando prácticas de silencio y meditación.</p>
                <p className="font-medium text-[var(--color-sand)]">De ese recorrido nació TRI-NEO.</p>
                <p>Hoy, esa búsqueda se convirtió en un neuroentrenamiento de 21 días en 3 fases para reducir el ruido mental, recuperar claridad y volver a enfocarte en lo que realmente importa. </p>
                <div className="pt-6 border-t border-white/10 mt-6">
                  <p className="font-medium text-white">Ramiro</p>
                  <p className="text-sm uppercase tracking-widest text-white/40">Fundador</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonios */}
      <section className="section-padding relative">
        <div className="ambient-glow glow-sand w-[600px] h-[600px] right-[-200px] top-0"></div>
        <div className="container-narrow">
          <h2 className="text-3xl font-serif text-center mb-16 reveal">Lo que experimentan quienes lo cruzan</h2>
          
          <div className="space-y-8">
            <div className="glass-panel p-8 md:p-12 reveal">
              <p className="italic text-lg text-white/90 font-serif mb-6 leading-relaxed">
                "Antes de TRI-NEO me levantaba y ya agarraba el celular por inercia. Vivía acelerada. Con la Fase 1 sentí por primera vez en meses que mi cuerpo bajaba un cambio. Ahora uso el audio cada mañana antes de arrancar."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[var(--color-sand)]">L</div>
                <div>
                  <p className="font-bold text-sm text-[var(--color-sand)]">Lucía Rodríguez</p>
                  <p className="text-xs text-white/40">Completó el proceso de 21 días</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 md:p-12 reveal delay-100">
              <p className="italic text-lg text-white/90 font-serif mb-6 leading-relaxed">
                "El Ebook me cambió la forma de ver mi propia distracción. Entender que es saturación y no falta de ganas me quitó un peso enorme. El entrenamiento de atención en la Fase 2 es clave para mi trabajo."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[var(--color-sand)]">J</div>
                <div>
                  <p className="font-bold text-sm text-[var(--color-sand)]">Javier M.</p>
                  <p className="text-xs text-white/40">Emprendedor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Oferta Final */}
      <section id="oferta" className="section-padding bg-[var(--color-smoke)] text-white text-center border-t border-white/5 relative">
        <div className="ambient-glow glow-petroleum w-full h-[500px] bottom-0 left-0"></div>
        <div className="container-narrow reveal">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[var(--color-sand)]">Recuperá tu claridad mental</h2>
          <p className="text-lg text-white/70 font-light mb-12 max-w-xl mx-auto">
            Únete a la plataforma hoy y obtén acceso de por vida al neuroentrenamiento completo de 21 días.
          </p>
          
          <div className="glass-panel p-10 max-w-md mx-auto mb-10 border border-[var(--color-sand)]/20 shadow-[0_0_50px_rgba(230,223,211,0.05)]">
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-sand)] mb-2">Acceso Total</div>
            <div className="text-5xl font-serif font-light mb-8">US$ 19</div>
            
            <a href="https://wa.me/5493433031111?text=Hola,%20quiero%20comenzar%20el%20reto%20TRI-NEO..." target="_blank" rel="noopener noreferrer" className="btn-primary w-full block mb-4">
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
      <section className="section-padding relative">
        <div className="container-narrow reveal">
          <h2 className="text-3xl font-serif text-center mb-12 text-[var(--color-sand)]">Preguntas Frecuentes</h2>
          
          <div className="glass-panel p-8 md:p-12">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''} text-white/40`}
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
      <footer className="py-12 bg-[#000] text-center border-t border-white/5 relative z-10">
        <div className="container-narrow">
          <img src="/logo_final.png" alt="TRI-NEO" className="w-12 h-12 mx-auto mb-6 opacity-30 grayscale" />
          <p className="text-sm text-white/40">© 2026 TRI-NEO. Diseñado para la claridad.</p>
        </div>
      </footer>

    </main>
  )
}
