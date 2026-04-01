'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, Volume2, ChevronDown, Check, Book, Instagram, Smartphone } from 'lucide-react'
import { track } from '@vercel/analytics'
import { MeshBackground } from '@/shared/components/mesh-background'
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
    { q: '¿Cuánto tiempo lleva por día?', a: 'Las prácticas toman entre 5 y 10 minutos diarios. Están pensadas para encajar en una vida ocupada.' },
    { q: '¿Cómo accedo al material?', a: 'Al unirte, creas tu usuario y contraseña. Con eso ingresas directamente a nuestra plataforma web app desde tu celular.' },
    { q: '¿La app ya está disponible?', a: 'Sí. Desarrollamos una web app dedicada (PWA) para que puedas escuchar los audios, leer el libro y seguir tu proceso.' },
    { q: '¿Es un pago mensual?', a: 'No. Es un pago único que te da acceso de por vida a la plataforma, al método de 21 días, a la app y a sus futuras actualizaciones.' },
    { q: '¿Voy a poder hacerlo a mi ritmo?', a: 'Totalmente. Aunque el reto propuesto es de 21 días continuos, el acceso de por vida te permite pausar o retomar.' }
  ]

  return (
    <MeshBackground className="text-white font-sans overflow-x-hidden">
      
      {/* 1. HERO */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 flex items-center justify-center min-h-[90vh]">
        <div className="container-narrow reveal text-center flex flex-col items-center">
          <p className="text-[var(--color-sand)] tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs font-semibold mb-6">Método TRI-NEO</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-6 drop-shadow-lg text-balance">
            Cuando la mente se calma,<br className="hidden md:block" /> la vida se ordena.
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-12 font-light text-balance px-4">
            21 días para reducir el ruido mental y recuperar claridad.
          </p>
          


          <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto px-4 relative z-20">
            <a 
              href="#oferta" 
              className="btn-cta-hero w-full text-center text-lg py-4"
              onClick={() => track('Hero - Empezar Ahora')}
            >
              Acceder ahora
            </a>
            <div className="text-white/60 text-xs text-center flex flex-col items-center space-y-1 mb-2">
              <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400"/>Acceso inmediato desde tu celular.</span>
              <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400"/>Sin suscripción.</span>
            </div>
            <a 
              href="https://wa.me/5493433031111?text=Hola,%20quiero%20recibir%20la%20experiencia%20de%20prueba%20de%20TRI-NEO." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-trial mt-4"
              onClick={() => track('Hero - Experiencia Prueba')}
            >
              Acceder a una experiencia de prueba
            </a>
          </div>
        </div>
      </section>

      {/* 4. PROBLEMA & SOLUCIÓN */}
      <section className="py-20 md:py-28 bg-transparent relative z-10 border-b border-white/5">
        <div className="container-narrow reveal text-center px-4">
          <p className="text-[var(--color-sand)] font-serif text-lg md:text-xl italic mb-12 opacity-80 max-w-2xl mx-auto leading-relaxed">
            &quot;Nuestra mente no evolucionó para esta cantidad de estímulos.&quot;
          </p>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            
            {/* El Problema */}
            <div className="p-10 rounded-[2rem] bg-gradient-to-br from-red-950/20 to-black/40 border border-red-500/10 shadow-2xl backdrop-blur-sm">
              <h3 className="text-sm uppercase tracking-widest text-red-500/50 mb-8 font-bold">El problema</h3>
              <ul className="space-y-5 text-white/70 text-lg font-light text-left pl-5 border-l-2 border-red-500/20">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-500/30"></span> Mente saturada.</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-500/30"></span> No podés concentrarte.</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-500/30"></span> Ruido mental constante.</li>
              </ul>
            </div>

            {/* La Solución */}
            <div className="p-10 rounded-[2rem] bg-gradient-to-br from-[#0a1e20] to-black/40 border border-emerald-500/10 shadow-2xl backdrop-blur-sm">
              <h3 className="text-sm uppercase tracking-widest text-[var(--color-sand)]/70 mb-8 font-bold">El resultado</h3>
              <ul className="space-y-5 text-white/90 text-lg font-light text-left pl-5 border-l-2 border-[var(--color-sand)]/40">
                <li className="flex items-center gap-3"><Check size={16} className="text-[var(--color-sand)]"/> Menos ruido mental.</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-[var(--color-sand)]"/> Más claridad.</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-[var(--color-sand)]"/> Mejor foco.</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-[var(--color-sand)]"/> Más calma.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ¿QUÉ ES TRI-NEO? */}
      <section className="py-20 md:py-24 relative z-10 bg-transparent">
        <div className="container-narrow reveal text-center px-4">
          <h2 className="text-3xl md:text-5xl font-serif mb-10 text-[var(--color-sand)] text-balance">
            ¿Qué es TRI-NEO?
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto text-balance">
            TRI-NEO es un neuroentrenamiento práctico de 21 días. No vas a encontrar teorías eternas ni filosofía compleja. Es un proceso simple, claro y progresivo diseñado específicamente para la mente moderna sobreestimulada.
          </p>

          <div className="w-full max-w-[280px] mx-auto aspect-[9/19] rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.1)] ring-1 ring-white/20 mt-16 relative bg-[#0a1025]">
             <video 
               src="/video-hero.mp4" 
               autoPlay 
               muted 
               loop 
               playsInline
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 2. ¿QUÉ INCLUYE? */}
      <section className="py-16 relative border-t border-white/5 bg-black/20 backdrop-blur-sm z-10">
        <div className="container-narrow reveal text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 text-[var(--color-sand)]">¿Qué incluye?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto text-left px-4">
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="bg-[var(--color-sand)]/20 p-3 rounded-xl"><Smartphone className="text-[var(--color-sand)]" size={24}/></div>
              <div>
                <h3 className="text-white font-medium text-lg">App simple en tu celular</h3>
                <p className="text-white/50 text-sm mt-1">La app registrará tus prácticas diarias y compartirá inteligentemente tu claridad mental.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="bg-[var(--color-sand)]/20 p-3 rounded-xl"><Volume2 className="text-[var(--color-sand)]" size={24}/></div>
              <div>
                <h3 className="text-white font-medium text-lg">Audios guiados diarios</h3>
                <p className="text-white/50 text-sm mt-1">Prácticas de 5 a 15 minutos exactos.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="bg-[var(--color-sand)]/20 p-3 rounded-xl"><Play className="text-[var(--color-sand)]" size={24}/></div>
              <div>
                <h3 className="text-white font-medium text-lg">Proceso de 21 días</h3>
                <p className="text-white/50 text-sm mt-1">Neuroentrenamiento en 3 fases progresivas.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors md:col-span-1 lg:col-span-1 border-[var(--color-sand)]/20 shadow-[0_0_30px_rgba(230,223,211,0.05)]">
              <div className="bg-[var(--color-sand)]/20 p-3 rounded-xl"><Book className="text-[var(--color-sand)]" size={24}/></div>
              <div>
                <h3 className="text-[var(--color-sand)] font-medium text-lg">Libro Digital</h3>
                <p className="text-white/50 text-sm mt-1">Neurociencias y Sabiduría Ancestral.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors md:col-span-2 lg:col-span-2">
              <div className="bg-[var(--color-sand)]/20 p-3 rounded-xl"><Check className="text-[var(--color-sand)]" size={24}/></div>
              <div>
                <h3 className="text-white font-medium text-lg text-balance">Acceso de por vida a la plataforma</h3>
                <p className="text-white/50 text-sm mt-1">Pago único. Sin suscripciones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frase de respaldo científico/filosófico */}
      <div className="py-2 relative z-10 text-center px-4">
        <p className="text-white/40 text-[9px] md:text-xs uppercase tracking-[0.3em] font-light italic leading-loose">
          Basado en neurociencia, atención y prácticas contemplativas.
        </p>
      </div>

      {/* ¿TODAVÍA NO ESTÁS LISTO? - Lead Magnet */}
      <section className="py-20 md:py-24 relative z-10 bg-transparent">
        <div className="container-narrow reveal px-4">
          <div className="max-w-lg mx-auto p-10 md:p-14 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-8 text-balance leading-snug">
              ¿Todavía no estás listo para empezar el proceso completo?
            </h2>
            <p className="text-white/70 font-light text-base md:text-lg leading-relaxed mb-10 text-balance">
              Prueba primero una experiencia breve de TRI-NEO. Recibe gratis un audio guiado de 3 minutos para bajar revoluciones, volver a la respiración y sentir una primera experiencia real de calma y claridad.
            </p>
            <div className="space-y-4 text-left max-w-xs mx-auto mb-10">
              <div className="flex items-center gap-3 text-white/70">
                <Volume2 size={18} className="text-white/40 shrink-0"/>
                <span className="text-sm font-light">Audio guiado de práctica</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Check size={18} className="text-white/40 shrink-0"/>
                <span className="text-sm font-light">Acceso por WhatsApp</span>
              </div>
            </div>
            <a 
              href="https://wa.me/5493433031111?text=Hola,%20quiero%20recibir%20la%20experiencia%20de%20prueba%20de%20TRI-NEO." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-[var(--color-sand)] transition-colors shadow-lg mb-6"
              onClick={() => track('Lead Magnet - Quiero Recibirlo Gratis')}
            >
              Quiero recibirlo gratis
            </a>
            <p className="text-white/30 text-xs italic font-light leading-relaxed">
              Ideal si sientes saturación mental, exceso de estímulos o dificultad para bajar un cambio.
            </p>
          </div>
        </div>
      </section>

      {/* 4.5 TESTIMONIOS */}
      <section className="py-24 relative z-10 bg-transparent">
        <div className="container-narrow reveal text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-16 text-white text-balance tracking-wide">
            Lo que experimentan<br/>quienes lo cruzan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4 text-left">
            {/* Testimonio 1 */}
            <div className="p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors shadow-2xl backdrop-blur-sm flex flex-col justify-between">
              <p className="text-white/80 text-lg md:text-xl font-serif italic font-light leading-relaxed mb-8">
                &quot;Antes de TRI-NEO me levantaba y ya agarraba el celular por inercia. Vivía acelerada. Con la Fase 1 sentí por primera vez en meses que mi cuerpo bajaba un cambio. Ahora uso el audio cada mañana antes de arrancar.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0 border border-white/20">
                  <img src="/avatar1.png" alt="Lucía Rodríguez" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.parentElement!.innerHTML = '<span class=\'flex items-center justify-center w-full h-full text-[var(--color-sand)] font-serif font-semibold\'>LR</span>'; }} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-base tracking-wide">Lucía Rodríguez</h4>
                  <p className="text-white/40 text-sm font-light">Completó el proceso de 21 días</p>
                </div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors shadow-2xl backdrop-blur-sm flex flex-col justify-between">
              <p className="text-white/80 text-lg md:text-xl font-serif italic font-light leading-relaxed mb-8">
                &quot;El Ebook me cambió la forma de ver mi propia distracción. Entender que es saturación y no falta de ganas me quitó un peso enorme. El entrenamiento de atención en la Fase 2 es clave para mi trabajo.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0 border border-white/20">
                  <img src="/avatar2.png" alt="Javier M." className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.parentElement!.innerHTML = '<span class=\'flex items-center justify-center w-full h-full text-[var(--color-sand)] font-serif font-semibold\'>JM</span>'; }} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-base tracking-wide">Javier M.</h4>
                  <p className="text-white/40 text-sm font-light">Emprendedor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HISTORIA */}
      <section className="py-24 relative z-10">
        <div className="container-narrow reveal px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl mx-auto">
            <div className="w-full md:w-5/12 aspect-[3/4] rounded-[2.5rem] overflow-hidden ring-1 ring-white/10 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <img src="/imagen historia.jpeg" alt="Ramiro - Fundador de TRI-NEO" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-7/12">
              <h2 className="text-3xl lg:text-4xl font-serif mb-8 text-[var(--color-sand)]">De la saturación a la claridad</h2>
              <div className="text-white/70 space-y-6 font-light leading-relaxed text-lg">
                <p>Durante un tiempo cumplí varias metas externas, pero adentro <strong className="font-medium text-white">seguía habiendo ruido</strong>.</p>
                <p>Viajé, compartí tiempo con comunidades en el Amazonas y participé en retiros explorando el silencio. <span className="font-medium text-[var(--color-sand)]">De ese recorrido nació TRI-NEO.</span></p>
                <p>Hoy, esa búsqueda es un neuroentrenamiento simple de 21 días para reducir el ruido mental y volver a enfocarte en lo que realmente importa.</p>
                
                <div className="pt-6 border-t border-white/10 mt-8 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white text-lg">Ramiro</p>
                    <p className="text-xs uppercase tracking-widest text-white/40 mt-1">Fundador</p>
                  </div>
                  <a 
                    href="https://www.instagram.com/ramacomaleras/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/40 hover:text-[var(--color-sand)] transition-all duration-300 bg-white/5 px-4 py-2 rounded-full border border-white/10"
                    onClick={() => track('Click Instagram - Historia')}
                  >
                    <Instagram size={16} />
                    <span className="text-sm font-medium">@ramacomaleras</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BONUS */}
      <section className="py-20 relative z-10 bg-transparent">
        <div className="container-narrow reveal text-center px-4">
          <div className="glass-panel p-10 md:p-16 border border-[var(--color-sand)]/20 shadow-[0_0_50px_rgba(230,223,211,0.05)] relative overflow-hidden max-w-4xl mx-auto rounded-[3rem]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-sand)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="inline-block px-4 py-1.5 bg-[var(--color-sand)]/20 text-[var(--color-sand)] text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full mb-8 border border-[var(--color-sand)]/30">
              Bonus Exclusivo
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-6">Biblioteca TRI-NEO</h2>
            
            <p className="text-xl sm:text-2xl text-[var(--color-sand)] font-light max-w-2xl mx-auto mb-8 text-balance">
              +100 libros sobre mente, meditación y consciencia.
            </p>
            
            <p className="text-white/70 font-light max-w-xl mx-auto mb-10 text-lg leading-relaxed text-balance">
              Solo por hoy, junto con TRI-NEO, recibís acceso a una biblioteca digital 
              con un recurso extra invaluable para profundizar el proceso.
            </p>
            
            <div className="inline-block p-6 rounded-3xl bg-black/60 border border-white/10 shadow-2xl">
              <p className="text-sm text-white/40 line-through mb-1 uppercase tracking-wider">Valor real: +$200 USD</p>
              <p className="text-xl font-medium text-emerald-400">Incluido hoy sin costo adicional</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRECIO Y OFERTA */}
      <section id="oferta" className="py-20 text-white text-center relative z-10 bg-transparent">
        <div className="container-narrow reveal px-4">
          
          <div className="p-10 md:p-14 max-w-[440px] mx-auto mb-10 border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-md shadow-2xl">
            <div className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-4 bg-white/5 inline-block px-4 py-1 rounded-full">Acceso Inmediato y Total</div>
            <div className="text-5xl md:text-6xl font-serif font-light mb-8 text-[var(--color-sand)] drop-shadow-md">$19.000 ARG</div>
            
            <ul className="text-sm text-white/60 mb-8 space-y-3 font-light text-left max-w-[280px] mx-auto">
              <li className="flex items-center gap-2"><Check size={14} className="text-[var(--color-sand)]"/> Pago único.</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[var(--color-sand)]"/> Acceso de por vida.</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-[var(--color-sand)]"/> App + Audios + Ebook + Bonus.</li>
            </ul>

            <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-2xl p-4 mb-6 text-sm text-white/80 text-left">
              <p className="font-semibold text-emerald-400 mb-1 flex items-center gap-2"><Check size={16}/> Garantía de 7 días</p>
              <p className="font-light text-emerald-100/70 text-xs">Tenés 7 días para probarlo. Si no te sirve, te devolvemos el dinero.</p>
            </div>
            
            <p className="text-xs text-[var(--color-sand)] uppercase tracking-wider mb-6 font-semibold animate-pulse">Acceso disponible hoy. El valor puede cambiar en cualquier momento.</p>
            
            <a 
              href="https://wa.me/5493433031111?text=Hola,%20quiero%20comenzar%20el%20reto%20TRI-NEO..." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary w-full block mb-4 py-5 text-lg shadow-[0_0_30px_rgba(230,223,211,0.15)] bg-white text-black hover:bg-[var(--color-sand)] border-none"
              onClick={() => track('Oferta - Comenzar Ahora')}
            >
              Acceder ahora
            </a>

            <div className="text-white/60 text-xs text-center flex flex-col items-center space-y-1 mb-8">
              <span className="flex items-center gap-1.5"><Check size={10} className="text-[var(--color-sand)]"/>Acceso inmediato desde tu celular.</span>
              <span className="flex items-center gap-1.5"><Check size={10} className="text-[var(--color-sand)]"/>Sin suscripción.</span>
            </div>

            <div className="flex flex-col items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">Pagos seguros vía</span>
              <img 
                src="https://cdn.simpleicons.org/mercadopago/white" 
                alt="Mercado Pago" 
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>



        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 bg-transparent relative z-10 border-t border-white/5">
        <div className="container-narrow reveal px-4">
          <h2 className="text-3xl font-serif text-center mb-12 text-[var(--color-sand)]">Preguntas Frecuentes</h2>
          
          <div className="p-6 md:p-10 rounded-3xl bg-white/5 border border-white/5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item border-b border-white/5 last:border-0 last:pb-0">
                <div 
                  className="faq-question py-5 flex justify-between items-center cursor-pointer hover:text-[var(--color-sand)] transition-colors"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="pr-4 font-medium text-white/90 text-[15px]">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''} text-white/30 shrink-0`}
                  />
                </div>
                {openFaq === idx && (
                  <div className="faq-answer pb-6 text-white/60 font-light text-sm animate-fade-up leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-transparent text-center relative z-10 pb-8">
        <div className="container-narrow">
          <img src="/logo_final.png" alt="TRI-NEO" className="w-12 h-12 mx-auto mb-6 opacity-30 grayscale" />
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://www.instagram.com/ramacomaleras/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/30 hover:text-[var(--color-sand)] transition-all duration-300"
              onClick={() => track('Click Instagram - Footer')}
            >
              <Instagram size={20} />
            </a>
          </div>
          <p className="text-sm text-white/30 font-light">© 2026 TRI-NEO. Diseñado para la claridad.</p>
        </div>
      </footer>

    </MeshBackground>
  )
}
