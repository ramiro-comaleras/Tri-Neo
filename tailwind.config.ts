import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0F1722',
        petrol: '#43607E',
        softgray: '#B8C1CC',
        gold: '#C6A95F',
        background: '#0F1722',
        surface: 'rgba(255, 255, 255, 0.05)',
        foreground: '#FFFFFF',
        muted: '#B8C1CC',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        headings: ['var(--font-roboto-slab)', 'serif'],
        cta: ['var(--font-montserrat)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      animation: {
        'float-bg': 'floatBG 15s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        floatBG: {
          '0%, 100%': { backgroundPosition: 'center center' },
          '50%': { backgroundPosition: '70% 30%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'mesh-glow': 'radial-gradient(at 40% 20%, rgba(67, 96, 126, 0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(198, 169, 95, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(67, 96, 126, 0.2) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}

export default config
