/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff00ff',
        'neon-blue': '#00f0ff',
        'neon-purple': '#9900ff',
        'neon-green': '#00ff66',
        'neon-yellow': '#ffff00',
        'bg-dark': '#0a0a12',
        'bg-card': '#14141f',
        'bg-card-hover': '#1c1c2d',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 0.5s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { 
            boxShadow: '0 0 15px #00f0ff, 0 0 30px #00f0ff'
          },
          '50%': { 
            boxShadow: '0 0 25px #ff00ff, 0 0 50px #ff00ff'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-5px, 5px)' },
          '20%': { transform: 'translate(-10px, 10px)' },
          '30%': { transform: 'translate(5px, -5px)' },
          '40%': { transform: 'translate(10px, -10px)' },
          '50%': { transform: 'translate(-5px, 5px)' },
          '60%': { transform: 'translate(-10px, 10px)' },
          '70%': { transform: 'translate(5px, -5px)' },
          '80%': { transform: 'translate(10px, -10px)' },
          '90%': { transform: 'translate(-5px, 5px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
    },
  },
  plugins: [],
};