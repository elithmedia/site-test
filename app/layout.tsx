import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = { title: 'Elith Media', description: 'Paid media si content.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <a className="sr-only focus:not-sr-only" href="#content">Sari la conținut</a>
        {children}
      </body>
    </html>
  )
}
