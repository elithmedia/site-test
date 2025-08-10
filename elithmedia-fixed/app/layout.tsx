import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Elith Media | Paid media & content care convertesc',
    template: '%s | Elith Media'
  },
  description: 'Agentie de marketing din Bucuresti. Meta Ads, Google Ads, TikTok/IG content si raportare orientata pe rezultate.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Elith Media',
    description: 'Agentie de marketing din Bucuresti.',
    images: ['/og.jpg'],
    type: 'website'
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.ico' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        {/* Consent Mode v2 default denied */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('consent','default',{
             'ad_storage':'denied',
             'analytics_storage':'denied',
             'ad_user_data':'denied',
             'ad_personalization':'denied'
           });`}
        </Script>

        {/* GA4 (loads but won't track until consent granted) */}
        {process.env.NEXT_PUBLIC_GA4_ID ? (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#content" className="a11y-skip">Sari la continut</a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
