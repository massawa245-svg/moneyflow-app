// app/qr/page.tsx
'use client';

import { useState } from 'react';
import { ArrowLeft, QrCode, Download, Share2 } from 'lucide-react';

export default function QRPage() {
  const [amount, setAmount] = useState('50.00');
  
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
          <h1 className="text-2xl font-bold text-gray-900 ml-3">QR Pay</h1>
        </div>
        
        {/* QR Code Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl text-center mb-6">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
            <div className="text-center">
              <QrCode className="w-24 h-24 text-gray-800 mx-auto" />
              <p className="mt-4 text-lg font-bold">€{amount}</p>
              <p className="text-sm text-gray-500">Scan to pay</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Amount (€)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">€</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xl font-bold border border-gray-300 rounded-xl"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {['10', '20', '50', '100', '200', '500'].map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className={`py-2 rounded-lg border ${
                    amount === value 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  €{value}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="bg-white p-4 rounded-xl border border-gray-300 flex flex-col items-center space-y-2 hover:bg-gray-50">
            <Download className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium">Save QR</span>
          </button>
          
          <button className="bg-white p-4 rounded-xl border border-gray-300 flex flex-col items-center space-y-2 hover:bg-gray-50">
            <Share2 className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
        
        {/* Instructions */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-3">How to use:</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li>1. Set the amount you want to receive</li>
            <li>2. Show the QR code to the payer</li>
            <li>3. They scan with their banking app</li>
            <li>4. Money arrives instantly in your account</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
