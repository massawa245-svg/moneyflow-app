// app/add/page.tsx - IMPROVED
'use client';

import { ArrowLeft, CreditCard, Wallet, Building, Phone, Landmark } from 'lucide-react';

export default function AddMoneyPage() {
  const paymentMethods = [
    { icon: CreditCard, label: 'Credit/Debit Card', color: 'bg-blue-500' },
    { icon: Landmark, label: 'Bank Transfer', color: 'bg-green-500' },
    { icon: Wallet, label: 'E-Wallet', color: 'bg-purple-500' },
    { icon: Phone, label: 'Mobile Money', color: 'bg-orange-500' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <a
            href="/"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="text-2xl font-bold text-gray-900 ml-3">Add Money</h1>
        </div>
        
        {/* Balance */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-8">
          <p className="text-blue-100">Current Balance</p>
          <h2 className="text-4xl font-bold mt-2">€500.00</h2>
        </div>
        
        {/* Quick Amounts */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Add</h3>
          <div className="grid grid-cols-3 gap-3">
            {['10', '50', '100', '200', '500', '1000'].map((amount) => (
              <button
                key={amount}
                className="bg-white border border-gray-300 rounded-xl py-4 text-lg font-medium hover:border-blue-500 hover:text-blue-600 transition"
              >
                €{amount}
              </button>
            ))}
          </div>
        </div>
        
        {/* Custom Amount */}
        <div className="mb-8">
          <label className="block text-gray-700 mb-2">Custom Amount (€)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">€</span>
            <input
              type="number"
              className="w-full pl-12 pr-4 py-4 text-2xl font-bold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <button
                key={index}
                className="w-full flex items-center p-4 bg-white border border-gray-300 rounded-xl hover:border-blue-500 transition"
              >
                <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center mr-4`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium">{method.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Add Button */}
        <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:opacity-90 transition">
          Add Money
        </button>
      </div>
    </div>
  );
}
