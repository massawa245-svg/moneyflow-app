import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BalanceProvider } from './context/BalanceContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
        <BalanceProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-6 pb-32">
              {children}
            </main>
            <Footer />
          </div>
        </BalanceProvider>
      </body>
    </html>
  )
}