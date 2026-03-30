'use client'

import { useState, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import { MeshBackground } from '@/shared/components/mesh-background'

export default function AudioExperiencePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const audioSrc = "/fragmento.mp3"

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setProgress(newTime)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <MeshBackground className="h-[100dvh] w-screen overflow-hidden flex flex-col items-center justify-between py-12 px-6 font-sans">
      
      {/* 1. Logo */}
      <div className="flex-none opacity-40 mt-4 md:mt-8">
        <img src="/logo_final.png" alt="TRI-NEO" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
      </div>

      {/* 2 & 3. Headlines */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-10 md:gap-14">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl text-white font-serif font-light tracking-wide text-balance">
            Escuchá esto
          </h1>
          <p className="text-[var(--color-sand)] font-light tracking-widest text-sm uppercase opacity-90 mx-auto max-w-[200px] text-center">
            3 minutos para bajar el ruido mental
          </p>
        </div>

        {/* 4. Custom Audio Player (Glassmorphism) */}
        <div className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <button 
            onClick={togglePlay}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl mb-8 group"
          >
            {isPlaying ? (
              <Pause size={36} className="opacity-80 group-hover:opacity-100" />
            ) : (
              <Play size={36} className="opacity-80 group-hover:opacity-100 ml-2" />
            )}
          </button>

          <div className="w-full flex items-center gap-4 text-xs text-white/40 font-mono">
            <span>{formatTime(progress)}</span>
            <input 
              type="range" 
              min="0" 
              max={duration || 100} 
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-0.5 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-sand)] cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* 5. Instruction */}
        <p className="text-white/30 text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium">
          Usá auriculares. Sin distracciones.
        </p>
      </div>

      {/* 6. CTA / Final Text */}
      <div className="flex-none w-full max-w-sm text-center mb-4 md:mb-8">
        <p className="text-white/50 text-sm md:text-base font-light leading-relaxed px-4">
          Cuando termines, volvé a WhatsApp y contame qué sentiste.
        </p>
      </div>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </MeshBackground>
  )
}
