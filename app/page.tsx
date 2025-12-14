// app/page.tsx - PREMIUM DASHBOARD (ENGLISH)
'use client';

import { useState, useEffect } from 'react';
import { 
  Send, Wallet, History, User, 
  CreditCard, Shield, TrendingUp,
  ArrowUpRight, ArrowDownLeft, QrCode,
  Bell, Settings, Search, DollarSign,
  Plus, Calendar, Clock, CheckCircle,
  BarChart3, Target, Zap, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useBalance } from '@/app/context/BalanceContext';

export default function Home() {
  const { balance, isLoading: balanceLoading } = useBalance();
  const [timeOfDay, setTimeOfDay] = useState('');
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Anna Schmidt', type: 'sent', amount: -50.00, time: '10:30 AM', date: 'Today', status: 'completed' },
    { id: 2, name: 'John Doe', type: 'received', amount: 100.00, time: 'Yesterday', date: 'Yesterday', status: 'completed' },
    { id: 3, name: 'Sarah Miller', type: 'sent', amount: -30.00, time: '14:45', date: 'Dec 12', status: 'pending' },
    { id: 4, name: 'Amazon', type: 'sent', amount: -89.99, time: '20:30', date: 'Dec 11', status: 'completed' },
  ]);
  
  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Morning');
    else if (hour < 18) setTimeOfDay('Afternoon');
    else setTimeOfDay('Evening');
  }, []);
  
  const quickActions = [
    { 
      icon: Send, 
      label: 'Send Money', 
      color: 'from-green-500 to-emerald-600', 
      href: '/send',
      description: 'Instant Transfer'
    },
    { 
      icon: QrCode, 
      label: 'QR Code', 
      color: 'from-blue-500 to-cyan-600', 
      href: '/qr',
      description: 'Request Payment'
    },
    { 
      icon: Plus, 
      label: 'Add Money', 
      color: 'from-purple-500 to-violet-600', 
      href: '/add',
      description: 'Top Up Account'
    },
    { 
      icon: History, 
      label: 'History', 
      color: 'from-orange-500 to-red-500', 
      href: '/history',
      description: 'Transactions'
    },
  ];
  
  const stats = [
    { 
      label: 'Monthly Spent', 
      value: '$1,250', 
      change: '+12%', 
      changeType: 'increase',
      icon: TrendingUp, 
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Transactions', 
      value: '24', 
      change: '+3', 
      changeType: 'increase',
      icon: BarChart3, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Success Rate', 
      value: '100%', 
      change: 'Excellent', 
      changeType: 'excellent',
      icon: Shield, 
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    { 
      label: 'Goal Progress', 
      value: '$500/$1k', 
      change: '50%', 
      changeType: 'progress',
      icon: Target, 
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
  ];

  const frequentContacts = [
    { 
      id: 1, 
      name: 'Anna Schmidt', 
      lastAmount: '$50.00', 
      lastTime: '2h ago',
      avatar: 'AS'
    },
    { 
      id: 2, 
      name: 'John Doe', 
      lastAmount: '$100.00', 
      lastTime: 'Yesterday',
      avatar: 'JD'
    },
    { 
      id: 3, 
      name: 'Sarah Miller', 
      lastAmount: '$30.00', 
      lastTime: '3 days ago',
      avatar: 'SM'
    },
    { 
      id: 4, 
      name: 'Max Mustermann', 
      lastAmount: '$25.00', 
      lastTime: 'This week',
      avatar: 'MM'
    },
  ];

  const handleSendMoney = (contactId: number) => {
    // Would normally navigate to send page with contact ID
    console.log('Send money to contact:', contactId);
  };

  // Calculated values
  const monthlySpent = 1250.00;
  const monthlyReceived = 850.00;
  const monthlyBalance = monthlyReceived - monthlySpent;

  if (balanceLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MoneyFlow
              </h1>
              <p className="text-xs text-gray-500 font-medium">Fast & Secure</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            
            <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
            
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">Max Mustermann</p>
                  <p className="text-sm text-gray-500">max@example.com</p>
                </div>
                <div className="p-2">
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Profile</a>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Settings</a>
                  <a href="#" className="block px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto pb-24 md:pb-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Good {timeOfDay}, Max! 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's your financial overview for today</p>
          
          {/* Date Display */}
          <div className="flex items-center mt-4 text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <Clock className="w-4 h-4 ml-4 mr-2" />
            <span>{new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Balance</p>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">
                      ${balance.toFixed(2)}
                    </h2>
                    <div className="flex items-center mt-4">
                      <div className="flex items-center text-blue-100">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">Account Verified</span>
                      </div>
                      <div className="w-1 h-1 bg-blue-300 rounded-full mx-3"></div>
                      <div className="flex items-center text-blue-100">
                        <Shield className="w-4 h-4 mr-1" />
                        <span className="text-sm">100% Secure</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <Wallet className="w-8 h-8" />
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-blue-100 text-sm">Daily Limit</p>
                        <p className="text-xl font-semibold mt-1">$1,000.00</p>
                      </div>
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Zap className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-blue-100 text-sm">Sent Today</p>
                        <p className="text-xl font-semibold mt-1">$150.00</p>
                      </div>
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Send className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className={`bg-gradient-to-r ${action.color} rounded-2xl p-5 text-white flex flex-col items-center justify-center space-y-3 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl group`}
                  >
                    <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <span className="font-semibold text-sm">{action.label}</span>
                      <p className="text-xs opacity-90 mt-1">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' :
                        stat.changeType === 'excellent' ? 'text-purple-600' : 'text-orange-600'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  {stat.changeType === 'progress' && (
                    <div className="mt-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                          style={{ width: '50%' }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Monthly Overview */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Monthly Overview</h3>
                <span className="text-sm text-gray-500">December 2023</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Income</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">${monthlyReceived.toFixed(2)}</p>
                    </div>
                    <ArrowDownLeft className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Expenses</p>
                      <p className="text-2xl font-bold text-red-600 mt-1">${monthlySpent.toFixed(2)}</p>
                    </div>
                    <ArrowUpRight className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                
                <div className={`p-4 rounded-2xl ${
                  monthlyBalance >= 0 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50' 
                    : 'bg-gradient-to-r from-amber-50 to-orange-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Net Balance</p>
                      <p className={`text-2xl font-bold mt-1 ${
                        monthlyBalance >= 0 ? 'text-blue-600' : 'text-amber-600'
                      }`}>
                        {monthlyBalance >= 0 ? '+' : ''}${monthlyBalance.toFixed(2)}
                      </p>
                    </div>
                    <DollarSign className={`w-8 h-8 ${
                      monthlyBalance >= 0 ? 'text-blue-500' : 'text-amber-500'
                    }`} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Transactions */}
          <div className="space-y-6">
            {/* Recent Transactions */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                <Link 
                  href="/history" 
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center text-sm"
                >
                  View All
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        tx.type === 'sent' 
                          ? 'bg-red-100 text-red-600 group-hover:bg-red-200' 
                          : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                      } transition-colors`}>
                        {tx.type === 'sent' ? (
                          <ArrowUpRight className="w-6 h-6" />
                        ) : (
                          <ArrowDownLeft className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tx.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">{tx.date}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            tx.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {tx.status === 'completed' ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        tx.amount < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">{tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequent Contacts */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequent Contacts</h3>
              <div className="space-y-4">
                {frequentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {contact.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-500">
                          Last: {contact.lastAmount} • {contact.lastTime}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleSendMoney(contact.id)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition"
                    >
                      Send
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Status
                </h3>
                <div className="px-3 py-1 bg-green-500/20 rounded-full">
                  <span className="text-xs font-medium text-green-300">Excellent</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">2FA Enabled</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">KYC Verified</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">Biometric Login</span>
                  </div>
                  <span className="text-xs text-yellow-300">Recommended</span>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    Your account is protected with 256-bit encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around shadow-lg z-50">
        {[
          { icon: Wallet, label: 'Home', href: '/', active: true },
          { icon: Send, label: 'Send', href: '/send' },
          { icon: QrCode, label: 'QR', href: '/qr' },
          { icon: History, label: 'History', href: '/history' },
          { icon: User, label: 'Profile', href: '/contacts' },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex flex-col items-center space-y-1 transition-all ${
              item.active ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              item.active ? 'bg-blue-50' : ''
            }`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}