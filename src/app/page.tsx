'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import './landing.css'

export default function LandingPage() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2
      // Attempt to play on load (usually blocked by browsers)
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        console.log('Autoplay blocked, waiting for interaction')
      })
    }

    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(console.error)
        setIsPlaying(true)
      }
      document.body.removeEventListener('click', unlockAudio)
    }

    document.body.addEventListener('click', unlockAudio)
    return () => document.body.removeEventListener('click', unlockAudio)
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Background Effects */}
      <div className="background-fx">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
        <div className="atmosphere-glow"></div>
        <div className="cosmic-ocean wave-1"></div>
        <div className="cosmic-ocean wave-2"></div>
        <div className="cosmic-ocean wave-3"></div>
      </div>

      {/* Hero Section */}
      <section className="landing-hero landing-container">
        <div className="hero-logo animate-enter delay-1">
          <img src="/logo_final.png" alt="Tri-Neo Logo" />
        </div>
        <h1 className="animate-enter delay-2">
          Hay lugares donde<br />
          <span className="italic">el tiempo se detiene.</span>
        </h1>
        <p className="animate-enter delay-3">
          21 días para devolverle calma al sistema nervioso y bajar la ansiedad mental.
        </p>
      </section>

      {/* Value Propositions */}
      <section className="landing-container landing-section" style={{ paddingTop: 0 }}>
        <div className="value-props">
          <div className="prop-card">
            <h3 className="prop-title">Calma Profunda</h3>
            <div className="prop-visual">
              <img src="/prop1_new.jpg" alt="Calma Profunda" />
            </div>
            <p className="prop-desc">Pensamientos que van y vienen.<br />
              TRI-NEO fue diseñado para quienes sienten que su interior necesita espacio para respirar.</p>
          </div>

          <div className="prop-card">
            <h3 className="prop-title">Salir del Automático</h3>
            <div className="prop-visual">
              <img src="/prop2.png" alt="Salir del Automático" />
            </div>
            <p className="prop-desc">Vivimos ocupados, pero poco presentes. Buscamos hacer cosas para distraernos. Aquí
              te acompañamos a fortalecer la atención, salir del automático y volver a estar presente en tu
              día a día.</p>
          </div>

          <div className="prop-card">
            <h3 className="prop-title">Creatividad e Intuición</h3>
            <div className="prop-visual">
              <img src="/prop3.png" alt="Creatividad e Intuición" />
            </div>
            <p className="prop-desc">En estados de mayor calma y presencia, la intuición aparece con más claridad y las
              ideas comienzan a fluir sin esfuerzo. Aprenderás a crear la realidad que deseas de una manera muy
              efectiva.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="landing-container landing-section testimonials">
        <h2 className="main-heading">Lo que dicen</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="author-info">
                <span className="author-name">Lucía Rodríguez</span>
                <span className="author-handle">@luci_rod</span>
              </div>
            </div>
            <p className="testimonial-text">"Muy bueno el método, lo uso todas las mañanas"</p>
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="author-info">
                <span className="author-name">Carla Ruiz</span>
                <span className="author-handle">_carla_ruiz</span>
              </div>
            </div>
            <p className="testimonial-text">"Me gusta mucho."</p>
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="author-info">
                <span className="author-name">Julián Vázquez</span>
                <span className="author-handle">@julian_v</span>
              </div>
            </div>
            <p className="testimonial-text">"Muy bueno, me gustó el pilar 3 del ebook donde aprendí el proceso de
              creación de una idea a un proyecto, muy creativo."</p>
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </section>

      {/* What Includes */}
      <section className="landing-container landing-section includes-section">
        <h2 className="main-heading">¿Qué incluye <br /> TRI-NEO?</h2>
        <div className="cosmic-grid">
          <div className="orbit-items">
            {[
              { icon: '📱', title: 'Plataforma Móvil', desc: 'Donde se integra todo el programa.' },
              { icon: '🎧', title: 'Audios Diarios', desc: 'Claros, progresivos y guiados.' },
              { icon: '📖', title: 'Libro Digital', desc: '50 páginas con el método paso a paso.' },
              { icon: '📈', title: 'Seguimiento 21 Días', desc: 'Para sostener el proceso y cumplir el reto.' },
              { icon: '💡', title: 'Ejercicios Simples', desc: 'Para estimular la creatividad.' },
              { icon: '♾️', title: 'Acceso de por vida', desc: 'Pago único, sin suscripciones.' }
            ].map((item, index) => (
              <div key={index} className="orbit-card">
                <span className="orbit-icon">{item.icon}</span>
                <div className="orbit-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bonuses-grid mx-auto max-w-[600px] mb-16">
          <div className="bonus-holo-card">
            <div className="holo-badge">🎁 BONO</div>
            <h3>Biblioteca Consciente</h3>
            <p>Para los próximos 10 usuarios nuevos regalaremos más de 100 libros de autores reconocidos en PDF
              sobre meditación, neurociencia y espiritualidad práctica para profundizar y acompañar el proceso.
            </p>
          </div>
        </div>

        <p className="final-note">No necesitás experiencia previa.<br />Solo compromiso con el proceso.</p>
      </section>

      {/* Pricing */}
      <section id="precio" className="landing-section">
        <div className="landing-container">
          <div className="price-card">
            <div className="price-glow"></div>
            <h2>Pago único acceso de por vida</h2>
            <p className="text-gray-400 mt-4 text-xl">Si sentís el llamado envíanos un mensaje para comenzar.</p>
            <div className="price-tag"><span>US$</span>19</div>

            <div className="flex flex-col items-center gap-6">
              <a href="https://wa.me/5493433031111?text=Quiero%20saber%20mas%20información%20del%20Reto%20TRI%20NEO..."
                target="_blank" rel="noopener noreferrer" className="contact-button">
                Hablar por WhatsApp
              </a>
              <Link href="/login"
                className="text-gray-500 no-underline text-sm opacity-60 hover:opacity-100 transition-opacity">
                Ya tengo mi acceso →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="landing-container landing-section">
        <div className="bio-hero-container mt-[-2rem]">
          <div className="bio-hero-img">
            <img src="/vision_board_new.jpg" alt="Vision Board" />
          </div>
          <div className="bio-text-full">
            <p>
              Durante los últimos 5 años he viajado por distintos rincones de América, viviendo y aprendiendo de
              los sabios de la Naturaleza en el Amazonas, participando en retiros de más de 100 horas de
              meditación junto a monjes budistas y estudiando sus técnicas para crear este método.
              <br /><br />
              Tri-Neo es la síntesis de todo ese aprendizaje, adaptado a la vida moderna.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer landing-container">
        <p className="mt-16 text-xs text-gray-800">© 2026 Tri-Neo. Todos los derechos reservados.</p>
      </footer>

      {/* Landing Ambient Music */}
      <audio id="landing-ambient" ref={audioRef} loop>
        <source src="/audios/ambient.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        style={{ opacity: isPlaying ? 1 : 0.5 }}
        className="fixed bottom-5 right-5 z-[1000] bg-black/50 border border-white/20 rounded-full w-[50px] h-[50px] text-white flex justify-center items-center cursor-pointer backdrop-blur-[5px] transition-opacity"
      >
        🎵
      </button>
    </main>
  )
}
