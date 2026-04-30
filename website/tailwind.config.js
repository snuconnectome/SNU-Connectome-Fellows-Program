/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SNU Brand Colors (Refined)
        snu: {
          blue: '#0F2146', // Deeper Navy
          navy: '#1E3A5F',
          light: '#4A90E2',
          gold: '#C5A059', // Added for premium accents
        },
        // Neuro-Futurism Palette
        neuro: {
          base: '#030712', // Rich Black
          surface: '#0B1121', // Deep Blue-Black
          card: '#151C2F', // Card Background
          primary: '#6366F1', // Indigo (Electric)
          secondary: '#A855F7', // Purple (Synapse)
          accent: '#EC4899', // Pink (Activity)
          cyan: '#06B6D4', // Cyan (Data)
          glass: 'rgba(11, 17, 33, 0.7)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-neuro': 'linear-gradient(135deg, #0B1121 0%, #151C2F 100%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, rgba(3, 7, 18, 0) 70%)',
        'gradient-text': 'linear-gradient(to right, #6366F1, #A855F7, #EC4899)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
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
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px -10px rgba(99, 102, 241, 0)' },
          'to': { boxShadow: '0 0 20px 5px rgba(99, 102, 241, 0.3)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};