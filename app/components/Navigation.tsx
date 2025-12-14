'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Send, 
  History, 
  User, 
  QrCode,
  CreditCard
} from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()
  
  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Send', href: '/send', icon: Send },
    { name: 'Top Up', href: '/add', icon: CreditCard },
    { name: 'QR', href: '/qr', icon: QrCode },
    { name: 'History', href: '/history', icon: History },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-40">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50 transform scale-105' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}