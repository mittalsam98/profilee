import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  darkMode: ['class'],

  content: ['./src/**/*.tsx', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)'
          }
        }
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite'
      }
    }
  },
  plugins: []
} satisfies Config;
