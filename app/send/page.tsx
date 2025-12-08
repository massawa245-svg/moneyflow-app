// app/send/page.tsx - SEND MONEY
'use client';

import { useState } from 'react';
import { ArrowLeft, User, CheckCircle, CreditCard, Shield } from 'lucide-react';

export default function SendPage() {
  const [step, setStep] = useState('form'); // 'form' or 'success'
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const contacts = [
    { id: 1, name: 'Anna Schmidt', email: 'anna@example.com' },
    { id: 2, name: 'John Doe', email: 'john@example.com' },
    { id: 3, name: 'Sarah Miller', email: 'sarah@example.com' },
  ];
  
  const handleSend = () => {
    if (!amount || !recipient) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1500);
  };
  
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Success! </h1>
          <p className="text-gray-600 mb-6">Money sent successfully</p>
          
          <div className="my-8">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              €{parseFloat(amount).toFixed(2)}
            </div>
            <p className="text-gray-600">to {recipient}</p>
            {note && <p className="text-gray-500 text-sm mt-2">"{note}"</p>}
          </div>
          
          <div className="space-y-3">
            <a
              href="/"
              className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition"
            >
              Back to Dashboard
            </a>
            <button
              onClick={() => {
                setStep('form');
                setAmount('');
                setRecipient('');
                setNote('');
              }}
              className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
            >
              Send Another Payment
            </button>
          </div>
        </div>
      </div>
    );
  }
  
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
          <h1 className="text-2xl font-bold text-gray-900 ml-3">Send Money</h1>
        </div>
        
        {/* Balance */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
          <p className="text-blue-100">Available Balance</p>
          <h2 className="text-4xl font-bold mt-2">€500.00</h2>
        </div>
        
        {/* Amount */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow">
          <label className="block text-gray-700 mb-2">Amount (€)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">€</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-3xl font-bold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
              min="0.01"
            />
          </div>
        </div>
        
        {/* Recipient */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow">
          <label className="block text-gray-700 mb-3">Send to</label>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setRecipient(contact.name)}
                className={`w-full flex items-center p-4 rounded-xl transition ${
                  recipient === contact.name 
                    ? 'bg-blue-50 border-2 border-blue-200' 
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Note */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow">
          <label className="block text-gray-700 mb-2">Note (optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., For dinner, Birthday gift"
            maxLength={50}
          />
        </div>
        
        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={isLoading || !amount || !recipient}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:opacity-90 transition mb-6"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
              Processing...
            </span>
          ) : (
            `Send €${amount || '0.00'}`
          )}
        </button>
        
        {/* Security */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="font-bold text-gray-900">Secure Transfer</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Bank-level 256-bit encryption
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Instant processing
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              No hidden fees
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
