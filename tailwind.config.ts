import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        navy: '#061322',
        navy2: '#0A1E38',
        orange: '#E8622A',
        orange2: '#FF7A42',
        blue: '#1565C0',
        bluel: '#4A9FE8',
        green: '#22C55E',
        muted: '#64748B',
        light: '#F1F5F9',
        edge: '#E2E8F0',
      },
    },
  },
  plugins: [],
}

export default config
