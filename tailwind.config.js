/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        navy: {
          950: '#020817',
          900: '#030a14',
          800: '#081223',
          700: '#0d1a2e',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 4.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'flow': 'flow 3s linear infinite',
        'flow-reverse': 'flow-reverse 3s linear infinite',
        'glow': 'glow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        flow: {
          '0%': { strokeDashoffset: '200' },
          '100%': { strokeDashoffset: '0' },
        },
        'flow-reverse': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '200' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(4px)' },
          '50%': { opacity: '1', filter: 'blur(8px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'grid-subtle': `
          linear-gradient(rgba(6, 182, 212, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 182, 212, 0.04) 1px, transparent 1px)
        `,
        'radial-glow': 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(6, 182, 212, 0.12) 0%, transparent 100%)',
      },
      backgroundSize: {
        'grid': '64px 64px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
        'glow-cyan-sm': '0 0 10px rgba(6, 182, 212, 0.25)',
        'glow-indigo': '0 0 20px rgba(129, 140, 248, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.6), 0 0 1px rgba(6, 182, 212, 0.2)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
