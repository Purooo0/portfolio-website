import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Press_Start_2P, Silkscreen, Geist_Mono } from 'next/font/google'
import { portfolio } from '@/lib/portfolio-data'
import './globals.css'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const pressStart = Press_Start_2P({
  variable: '--font-press-start',
  subsets: ['latin'],
  weight: ['400'],
})

const silkscreen = Silkscreen({
  variable: '--font-silkscreen',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: `${portfolio.owner.name} — Portfolio`,
  description:
    `${portfolio.owner.name}'s personal portfolio, featuring projects, skills, and contact links.`,
  icons: {
    icon: portfolio.brand.logo,
    apple: portfolio.brand.logo,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F7F7FB',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${pressStart.variable} ${silkscreen.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
