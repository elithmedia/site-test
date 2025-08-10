import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg))',
        ink: 'hsl(var(--ink))',
        muted: 'hsl(var(--muted))',
        border: 'hsl(var(--border))',
        brand: {
          DEFAULT: 'hsl(var(--accent))',
          fg: 'hsl(var(--accent-foreground))',
        },
      },
      ringColor: {
        DEFAULT: 'hsl(var(--accent))',
      },
      boxShadow: {
        elev: '0 8px 18px rgba(15,23,42,.08)',
        elevSm: '0 6px 14px rgba(15,23,42,.07)',
        elevLg: '0 12px 26px rgba(15,23,42,.12)',
      },
    },
  },
  plugins: [],
}
export default config