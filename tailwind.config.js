/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: '#DCEFE1',
        sage: '#86A789',
        charcoal: '#1C2520',
        softgreen: '#A5C9A1',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        bloom: '0 20px 45px -15px rgba(134, 167, 137, 0.45)',
      },
    },
  },
  plugins: [],
}

