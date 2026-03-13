/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f3f6f0',
          100: '#e1ead6',
          200: '#c5d5b3',
          300: '#a3b98b',
          400: '#839b67',
          500: '#677f4c',
          600: '#50633b',
          700: '#404f31',
          800: '#34402a',
          900: '#2b3523',
          950: '#151c10',
        },
        olive: {
          50:  '#f5f7e8',
          100: '#e3e9c0',
          200: '#c9d48a',
          300: '#aebe55',
          400: '#96aa38',
          500: '#708238',
          600: '#636B2F',
          700: '#4b5124',
          800: '#32381a',
          900: '#1e220f',
          950: '#0f1205',
        },
        slate: {
          850: '#181c16',
          950: '#0e110d',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(112, 130, 56, 0.35)',
        'glow-lg': '0 0 60px rgba(112, 130, 56, 0.5)',
        'glow-olive': '0 0 45px rgba(112, 130, 56, 0.65)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.glass-effect': {
          'background': 'rgba(112, 130, 56, 0.08)',
          'backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(112, 130, 56, 0.2)',
        },
      })
    },
  ],
}
