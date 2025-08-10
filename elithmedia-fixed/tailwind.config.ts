import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' }
    },
  },
  darkMode: ['class'],
  plugins: [],
} satisfies Config
