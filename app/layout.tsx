import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { BalanceProvider } from '@/app/context/BalanceContext'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MoneyFlow - Fast & Secure Money Transfers',
  description: 'Send and receive money instantly and securely',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <BalanceProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <main className="container mx-auto px-4 py-8 pb-20">
              {children}
            </main>
            <Navigation />
          </div>
        </BalanceProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}