/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
          light: '#3B82F6'
        },
        secondary: {
          DEFAULT: '#0EA5E9',
          dark: '#0284C7',
          light: '#38BDF8'
        },
        accent: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399'
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif']
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      }
    },
  },
  plugins: [],
}
