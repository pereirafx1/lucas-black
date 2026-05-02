import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C86D',
          dark: '#9A7A28',
        },
        ink: {
          DEFAULT: '#080808',
          surface: '#111111',
          raised: '#1A1A1A',
          high: '#252525',
        },
        cream: '#F5F0E8',
        muted: '#888888',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, #C9A84C 0%, #E8C86D 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #080808 0%, #111111 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201,168,76,0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
