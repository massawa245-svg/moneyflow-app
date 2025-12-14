'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Building, 
  Wallet, 
  Phone, 
  Landmark, 
  Check,
  AlertCircle,
  Clock,
  Zap,
  Shield,
  DollarSign,
  Banknote,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PayoutPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'amount' | 'method' | 'review' | 'success'>('amount');

  const payoutMethods = [
    {
      id: 'bank',
      icon: Building,
      name: 'Bank Transfer',
      description: 'SEPA, Wire Transfer',
      fee: 'Free',
      speed: '1-3 business days',
      minAmount: 10,
      maxAmount: 10000,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'card',
      icon: CreditCard,
      name: 'Credit Card',
      description: 'Visa, Mastercard',
      fee: '1.5%',
      speed: 'Instant',
      minAmount: 5,
      maxAmount: 5000,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'ewallet',
      icon: Wallet,
      name: 'E-Wallet',
      description: 'PayPal, Skrill, Neteller',
      fee: '0.5%',
      speed: 'Instant',
      minAmount: 1,
      maxAmount: 2000,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'mobile',
      icon: Phone,
      name: 'Mobile Money',
      description: 'M-Pesa, Paytm, etc.',
      fee: '1%',
      speed: 'Instant',
      minAmount: 1,
      maxAmount: 1000,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'crypto',
      icon: TrendingUp,
      name: 'Crypto Wallet',
      description: 'Bitcoin, Ethereum, USDT',
      fee: '0.1%',
      speed: '5-30 minutes',
      minAmount: 10,
      maxAmount: 50000,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const quickAmounts = [50, 100, 200, 500, 1000, 2000];
  const selectedMethodData = payoutMethods.find(m => m.id === selectedMethod);

  const handlePayout = async () => {
    if (!amount || !selectedMethod) return;
    
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStep('success');
    setIsProcessing(false);
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    return isNaN(num) ? '$0.00' : `$${num.toFixed(2)}`;
  };

  const calculateFee = () => {
    if (!selectedMethodData || !amount) return 0;
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return 0;
    
    if (selectedMethodData.fee.includes('%')) {
      const percentage = parseFloat(selectedMethodData.fee);
      return (amountNum * percentage) / 100;
    }
    return 0;
  };

  const calculateTotal = () => {
    const amountNum = parseFloat(amount) || 0;
    const fee = calculateFee();
    return amountNum + fee;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold text-gray-900">Withdraw Money</h1>
              <div className="flex items-center justify-center space-x-2 mt-1">
                {['amount', 'method', 'review', 'success'].map((s, index) => (
                  <div key={s} className="flex items-center">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                      ${step === s ? 'bg-blue-600 text-white' : 
                        ['amount', 'method', 'review', 'success'].indexOf(step) >= index ? 
                        'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}
                    `}>
                      {step === s ? (
                        <DollarSign className="w-3 h-3" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < 3 && (
                      <div className={`
                        w-8 h-0.5 mx-2
                        ${['amount', 'method', 'review', 'success'].indexOf(step) > index ? 
                          'bg-blue-600' : 'bg-gray-200'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {step === 'amount' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-100 text-sm">Available Balance</p>
                  <h2 className="text-3xl font-bold mt-1">$1,250.50</h2>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <Banknote className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Withdrawal Amount</h3>
              
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-4 text-3xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  min="0"
                  step="0.01"
                />
                <div className="text-right mt-2">
                  <span className="text-sm text-gray-500">Max: $10,000.00</span>
                </div>
              </div>

              {/* Quick Amounts */}
              <div>
                <p className="text-sm text-gray-600 mb-3">Quick Select</p>
                <div className="grid grid-cols-3 gap-3">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className={`py-3 rounded-xl border-2 text-center transition-all ${
                        amount === quickAmount.toString()
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-bold">${quickAmount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => setStep('method')}
                  disabled={!amount || parseFloat(amount) < 1}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Continue to Withdraw {amount && `$${parseFloat(amount).toFixed(2)}`}
                </button>
                
                <button
                  onClick={() => router.push('/add')}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Need more funds? Add Money
                </button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure & Fast</h4>
                    <p className="text-sm text-gray-600 mt-1">256-bit encryption & instant processing</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-start">
                  <Zap className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Low Fees</h4>
                    <p className="text-sm text-gray-600 mt-1">Competitive rates starting from 0%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'method' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Withdrawal Method</h3>
                  <p className="text-gray-600">Select how you want to receive your money</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{formatCurrency(amount)}</div>
                  <div className="text-sm text-gray-500">Amount to withdraw</div>
                </div>
              </div>

              {/* Method Selection */}
              <div className="space-y-3">
                {payoutMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center mr-4`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{method.name}</h4>
                            <p className="text-sm text-gray-500">{method.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-600">Fee: {method.fee}</span>
                              <span className="text-xs text-gray-600">Speed: {method.speed}</span>
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="bg-blue-500 text-white p-1 rounded-full">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => setStep('review')}
                  disabled={!selectedMethod}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Continue with {selectedMethodData?.name}
                </button>
                
                <button
                  onClick={() => setStep('amount')}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Change Amount
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'review' && selectedMethodData && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Review Withdrawal</h3>
              
              {/* Summary */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-gray-600">Amount</p>
                    <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Method</p>
                    <p className="font-semibold">{selectedMethodData.name}</p>
                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Withdrawal Amount</span>
                      <span className="font-medium">{formatCurrency(amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="font-medium">${calculateFee().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3">
                      <span className="font-bold text-gray-900">Total Deducted</span>
                      <span className="font-bold text-gray-900">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Speed & Limits */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-700">Estimated arrival: {selectedMethodData.speed}</span>
                  </div>
                  <p className="text-sm text-blue-600">
                    Limits: ${selectedMethodData.minAmount} - ${selectedMethodData.maxAmount}
                  </p>
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Security Check</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      For security reasons, first-time withdrawals may take up to 24 hours to process.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handlePayout}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing Withdrawal...
                    </>
                  ) : (
                    'Confirm Withdrawal'
                  )}
                </button>
                
                <button
                  onClick={() => setStep('method')}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Change Method
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-12 animate-in slide-in-from-bottom-4">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdrawal Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your withdrawal of <span className="font-bold">{formatCurrency(amount)}</span> has been processed.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Estimated Arrival</span>
                  <span className="font-semibold">{selectedMethodData?.speed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-mono text-sm">TXN-{Date.now().toString().slice(-8)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/history')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  View Transaction History
                </button>
                
                <button
                  onClick={() => {
                    setStep('amount');
                    setAmount('');
                    setSelectedMethod(null);
                  }}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Make Another Withdrawal
                </button>
                
                <button
                  onClick={() => router.push('/')}
                  className="w-full text-blue-600 font-medium py-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Spacing */}
      <div className="h-24" />
    </div>
  );
}