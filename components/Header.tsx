'use client';

import { useState } from 'react';
import { Bell, Settings, User, Search, Menu, X, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const menuItems = [
    { name: 'Dashboard', href: '/', icon: Wallet },
    { name: 'Send Money', href: '/send', icon: Wallet },
    { name: 'Add Money', href: '/add', icon: Wallet },
    { name: 'QR Code', href: '/qr', icon: Wallet },
    { name: 'History', href: '/history', icon: Wallet },
    { name: 'Contacts', href: '/contacts', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ];

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
            
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MoneyFlow
                </h1>
                <p className="text-xs text-gray-500 font-medium">Fast & Secure</p>
              </div>
            </Link>
          </div>

          {/* Search Bar - Desktop only */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions, contacts..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Button */}
            <button className="md:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all relative">
                <Bell className="w-5 h-5" />
                {hasNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>
            
            {/* Settings */}
            <button className="hidden sm:block p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
              <Settings className="w-5 h-5" />
            </button>
            
            {/* Profile */}
            <div className="relative group">
              <button className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                <User className="w-4 h-4 text-white" />
              </button>
              
              {/* Profile Dropdown - Desktop */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 hidden sm:block">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">Max Mustermann</p>
                  <p className="text-xs text-gray-500">max@example.com</p>
                </div>
                <div className="p-2">
                  <Link href="/profile" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg text-sm">Profile</Link>
                  <Link href="/settings" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg text-sm">Settings</Link>
                  <button className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Shows when active */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Menu Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">MoneyFlow</h2>
              <p className="text-sm text-gray-500">Welcome back!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">M</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Max Mustermann</p>
              <p className="text-xs text-gray-500">View profile</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-blue-600"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-600 w-full">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
        
        {/* Close overlay */}
        <div 
          className="fixed inset-0 bg-black/20 lg:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
          style={{ display: isMenuOpen ? 'block' : 'none' }}
        />
      </div>
    </>
  );
}