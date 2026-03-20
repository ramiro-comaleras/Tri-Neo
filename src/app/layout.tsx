import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Slab, Montserrat, Space_Grotesk } from 'next/font/google'
import { siteConfig } from '@/config/siteConfig'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const robotoSlab = Roboto_Slab({ subsets: ['latin'], variable: '--font-roboto-slab' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0a1025',
}

export const metadata: Metadata = {
  title: siteConfig.seo.siteTitle,
  description: siteConfig.seo.defaultDescription,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TRI-NEO',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: siteConfig.seo.siteTitle,
    description: siteConfig.seo.defaultDescription,
    locale: siteConfig.seo.locale,
    siteName: siteConfig.firmName,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${robotoSlab.variable} ${montserrat.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased min-h-screen overscroll-none">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
