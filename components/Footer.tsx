'use client';

import { useState } from 'react';
import { 
  Home, 
  Send, 
  PlusCircle, 
  QrCode, 
  History,
  CreditCard,
  Wallet,
  Shield,
  HelpCircle,
  MessageSquare,
  ChevronUp,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [showQuickActions, setShowQuickActions] = useState(false);

  const mainNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Send', href: '/send', icon: Send },
    { name: 'Add', href: '/add', icon: PlusCircle },
    { name: 'Payout', href: '/payout', icon: DollarSign },
    { name: 'QR', href: '/qr', icon: QrCode },
    { name: 'History', href: '/history', icon: History },
  ];

  const quickActions = [
    { name: 'Quick Send', icon: Send, color: 'bg-green-500', action: () => router.push('/send') },
    { name: 'Withdraw', icon: DollarSign, color: 'bg-blue-500', action: () => router.push('/payout') },
    { name: 'Scan QR', icon: QrCode, color: 'bg-purple-500', action: () => router.push('/qr') },
    { name: 'Add Funds', icon: PlusCircle, color: 'bg-orange-500', action: () => router.push('/add') },
  ];

  return (
    <>
      {/* Main Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="px-2 py-3">
          {/* Quick Actions FAB */}
          <div className="relative mb-3 flex justify-center">
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="absolute -top-6 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ChevronUp className={`w-6 h-6 text-white transition-transform duration-300 ${showQuickActions ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Quick Actions Menu */}
          {showQuickActions && (
            <div className="absolute bottom-24 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 mb-3 animate-in slide-in-from-bottom-4 duration-300">
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.name}
                      onClick={() => {
                        action.action();
                        setShowQuickActions(false);
                      }}
                      className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-2`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">{action.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <div className="flex justify-around items-center pt-3">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 flex-1 mx-1 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-100' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium mt-1">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Shield className="w-3 h-3 mr-1 text-green-500" />
                <span>Secure</span>
              </div>
              <div className="hidden sm:flex items-center">
                <HelpCircle className="w-3 h-3 mr-1" />
                <span>Help</span>
              </div>
            </div>
            <button 
              onClick={() => router.push('/support')}
              className="flex items-center text-blue-600 font-medium hover:text-blue-700"
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Support</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Bottom Padding for Content */}
      <div className="h-24" />
    </>
  );
}