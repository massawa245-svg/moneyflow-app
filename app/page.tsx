// app/page.tsx - PREMIUM DASHBOARD
'use client';

import { useState, useEffect } from 'react';
import { 
  Send, Wallet, History, User, 
  CreditCard, Shield, TrendingUp,
  ArrowUpRight, ArrowDownLeft, QrCode,
  Bell, Settings, Search
} from 'lucide-react';

export default function Home() {
  const [balance] = useState(50000); // €500
  const [timeOfDay, setTimeOfDay] = useState('');
  
  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Morning');
    else if (hour < 18) setTimeOfDay('Afternoon');
    else setTimeOfDay('Evening');
  }, []);
  
  const quickActions = [
    { icon: Send, label: 'Send Money', color: 'from-green-500 to-emerald-600', href: '/send' },
    { icon: QrCode, label: 'QR Pay', color: 'from-blue-500 to-cyan-600', href: '/qr' },
    { icon: CreditCard, label: 'Add Money', color: 'from-purple-500 to-violet-600', href: '/add' },
    { icon: History, label: 'History', color: 'from-orange-500 to-red-500', href: '/history' },
  ];
  
  const stats = [
    { label: 'Monthly Sent', value: '€1,250', change: '+12%', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Transactions', value: '24', change: '+3', icon: History, color: 'text-blue-500' },
    { label: 'Success Rate', value: '100%', change: 'Excellent', icon: Shield, color: 'text-purple-500' },
  ];
  
  const recentTransactions = [
    { id: 1, name: 'Anna Schmidt', type: 'sent', amount: -5000, time: '10:30 AM', status: 'completed' },
    { id: 2, name: 'John Doe', type: 'received', amount: 10000, time: 'Yesterday', status: 'completed' },
    { id: 3, name: 'Sarah Miller', type: 'sent', amount: -3000, time: 'Dec 12', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MoneyFlow</h1>
              <p className="text-xs text-gray-500">Secure & Fast</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Good {timeOfDay}, Max! 
          </h1>
          <p className="text-gray-600 mt-2">Here's your financial overview</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100">Total Balance</p>
                  <h2 className="text-5xl font-bold mt-2 tracking-tight">
                    €{(balance / 100).toFixed(2)}
                  </h2>
                  <p className="text-blue-100 mt-4">Account: MT-7890-1234-5678</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <Wallet className="w-8 h-8" />
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-blue-100 text-sm">Daily Limit</p>
                  <p className="text-xl font-semibold mt-1">€1,000.00</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-blue-100 text-sm">Sent Today</p>
                  <p className="text-xl font-semibold mt-1">€150.00</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className={`bg-gradient-to-r ${action.color} rounded-2xl p-6 text-white flex flex-col items-center justify-center space-y-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <action.icon className="w-8 h-8" />
                    <span className="font-semibold text-sm">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${stat.color}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.color.replace('text', 'bg')} bg-opacity-10`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Recent Transactions */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                <a href="/history" className="text-blue-600 hover:text-blue-700 font-medium">
                  View All 
                </a>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        tx.type === 'sent' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {tx.type === 'sent' ? (
                          <ArrowUpRight className="w-6 h-6" />
                        ) : (
                          <ArrowDownLeft className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tx.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">{tx.time}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            tx.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        tx.amount < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {tx.amount < 0 ? '-' : '+'}€{(Math.abs(tx.amount) / 100).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">{tx.time.includes('Today') ? 'Today' : tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contacts */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequent Contacts</h3>
              <div className="space-y-4">
                {[
                  { id: 1, name: 'Anna Schmidt', lastAmount: '€50.00' },
                  { id: 2, name: 'John Doe', lastAmount: '€100.00' },
                  { id: 3, name: 'Sarah Miller', lastAmount: '€30.00' },
                ].map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-500">Last: {contact.lastAmount}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Send
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Status */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Security Status</h3>
            <Shield className="w-5 h-5" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">2FA Enabled</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">KYC Verified</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Biometric Login</span>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around">
        {[
          { icon: Wallet, label: 'Home', href: '/' },
          { icon: Send, label: 'Send', href: '/send' },
          { icon: CreditCard, label: 'Cards', href: '/add' },
          { icon: User, label: 'Profile', href: '/contacts' },
        ].map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
