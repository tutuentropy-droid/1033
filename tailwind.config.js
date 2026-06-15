/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        parchment: {
          50: '#FBF5E6',
          100: '#F5E6C8',
          200: '#E8D5A9',
          300: '#D4BE8A',
          400: '#C4A872',
          500: '#A68C54',
        },
        tavern: {
          wood: '#5D4037',
          dark: '#3E2723',
          gold: '#D4AF37',
          wine: '#8B0000',
          ink: '#2C1810',
        },
        socrates: '#2E7D32',
        nietzsche: '#4A148C',
        beauvoir: '#C2185B',
      },
      fontFamily: {
        display: ['"Ma Shan Zheng"', 'cursive'],
        serif: ['"Noto Serif SC"', 'serif'],
      },
      animation: {
        'scroll-unfold': 'scrollUnfold 0.8s ease-out forwards',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        scrollUnfold: {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
