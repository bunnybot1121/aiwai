/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          bg: '#F7F8FA',
          surface: '#FFFFFF',
          border: '#E6E8EC',
          hover: '#F2F4F7',
          subtle: '#FAFAFC',
        },
        content: {
          primary: '#111318',
          secondary: '#667085',
          tertiary: '#98A2B3',
        },
        brand: {
          50: '#F5F3FF',
          100: '#ECE9FE',
          500: '#5B4BDB',
          600: '#4C38CA',
          700: '#3B29B1',
        },
        status: {
          success: '#12B76A',
          warning: '#F79009',
          critical: '#F04438',
          info: '#2E90FA',
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Departure Mono', 'DepartureMono', 'Silkscreen', 'Pixelify Sans', 'VT323', 'Space Mono', 'JetBrains Mono', 'Consolas', 'monospace'],
        pixel: ['Departure Mono', 'DepartureMono', 'Silkscreen', 'Pixelify Sans', 'VT323', 'monospace'],
        departure: ['Departure Mono', 'DepartureMono', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 4px 20px rgba(16, 24, 40, 0.04)',
        'card': '0 1px 3px rgba(16, 24, 40, 0.06), 0 1px 2px rgba(16, 24, 40, 0.04)',
        'dropdown': '0 12px 32px -4px rgba(16, 24, 40, 0.08), 0 4px 12px -2px rgba(16, 24, 40, 0.04)',
        'accent': '0 4px 14px rgba(91, 75, 219, 0.25)',
      }
    },
  },
  plugins: [],
}
