'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Wallet, Building, Phone, Landmark, Check, Plus, Minus, Loader2, Shield, Zap, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddMoneyPage() {
  const router = useRouter();
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<string | null>('50');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(500.00);

  const paymentMethods = [
    { 
      id: 'card', 
      icon: CreditCard, 
      label: 'Kredit-/Debitkarte', 
      description: 'Visa, Mastercard, Maestro',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      fee: 0,
      speed: 'Sofort'
    },
    { 
      id: 'bank', 
      icon: Building, 
      label: 'Banküberweisung', 
      description: 'SEPA, Instant Payment',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      fee: 0,
      speed: '1-2 Tage'
    },
    { 
      id: 'wallet', 
      icon: Wallet, 
      label: 'E-Wallet', 
      description: 'PayPal, Skrill, Neteller',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      fee: 0.5,
      speed: 'Sofort'
    },
    { 
      id: 'mobile', 
      icon: Phone, 
      label: 'Mobile Money', 
      description: 'Apple Pay, Google Pay',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      fee: 0,
      speed: 'Sofort'
    },
  ];

  const quickAmounts = [
    { amount: '10', label: '€10', popular: false },
    { amount: '50', label: '€50', popular: true },
    { amount: '100', label: '€100', popular: false },
    { amount: '200', label: '€200', popular: false },
    { amount: '500', label: '€500', popular: false },
    { amount: '1000', label: '€1000', popular: false },
  ];

  // Betrag für Anzeige berechnen
  const displayAmount = selectedAmount || customAmount || '0';

  // Transaktion simulieren
  const handleAddMoney = async () => {
    if (!displayAmount || parseFloat(displayAmount) <= 0) {
      alert('Bitte geben Sie einen gültigen Betrag ein');
      return;
    }

    if (!selectedMethod) {
      alert('Bitte wählen Sie eine Zahlungsmethode');
      return;
    }

    setIsLoading(true);
    
    // Simuliere API-Aufruf
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Aktualisiere Kontostand
    const amountToAdd = parseFloat(displayAmount);
    const newBalance = currentBalance + amountToAdd;
    setCurrentBalance(newBalance);
    
    // Erfolgsmeldung
    alert(`Erfolgreich! €${amountToAdd.toFixed(2)} wurden Ihrem Konto hinzugefügt.`);
    
    setIsLoading(false);
    
    // Optional: Zurück zur Startseite navigieren
    // router.push('/');
  };

  // Eingabe validieren
  const handleCustomAmountChange = (value: string) => {
    const numValue = parseFloat(value);
    if (value === '' || (numValue >= 0 && numValue <= 10000)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:shadow transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Geld aufladen</h1>
            <div className="w-10"></div>
          </div>
          
          {/* Kontostand Karte */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-100 text-sm font-medium">Aktueller Kontostand</p>
                <h2 className="text-4xl font-bold mt-1">€{currentBalance.toFixed(2)}</h2>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center text-blue-100 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              <span>Ihr Geld ist gesichert durch SSL-Verschlüsselung</span>
            </div>
          </div>
        </header>

        {/* Schnellbeträge */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Schnellbeträge</h3>
            <span className="text-sm text-gray-500">Beliebte Optionen</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {quickAmounts.map((item) => (
              <button
                key={item.amount}
                onClick={() => {
                  setSelectedAmount(item.amount);
                  setCustomAmount('');
                }}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  selectedAmount === item.amount
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Beliebt
                  </span>
                )}
                <div className="text-xl font-bold text-gray-900">€{item.amount}</div>
                {selectedAmount === item.amount && (
                  <div className="mt-2">
                    <Check className="w-5 h-5 text-blue-500 mx-auto" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Eigenen Betrag */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Eigener Betrag</h3>
            <button
              onClick={() => setCustomAmount('')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Zurücksetzen
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500">€</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="w-full pl-12 pr-24 py-4 text-3xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="0.00"
              step="0.01"
              min="0"
              max="10000"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              <button
                onClick={() => handleCustomAmountChange((parseFloat(customAmount || '0') - 10).toString())}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCustomAmountChange((parseFloat(customAmount || '0') + 10).toString())}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Min: €1.00 • Max: €10,000.00
          </div>
        </section>

        {/* Zahlungsmethoden */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Zahlungsmethode</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`${method.color} w-12 h-12 rounded-xl flex items-center justify-center mr-4`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">{method.label}</div>
                  <div className="text-sm text-gray-500">{method.description}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-600">Gebühr: {method.fee === 0 ? 'Keine' : `${method.fee}%`}</span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-600">Geschwindigkeit: {method.speed}</span>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <div className="ml-4">
                    <Check className="w-5 h-5 text-blue-500" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Zusammenfassung */}
        <section className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Zusammenfassung</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Betrag</span>
              <span className="font-semibold">€{displayAmount || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Servicegebühr</span>
              <span className="font-semibold">€0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Geschätzte Ankunft</span>
              <span className="font-semibold text-green-600">Sofort</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Gesamtbetrag</span>
                <span>€{displayAmount || '0.00'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sicherheitsinfo */}
        <div className="mb-8 bg-blue-50 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Sicher und geschützt</p>
              <p className="text-xs text-blue-700 mt-1">
                Ihre Zahlung wird mit Bank-Level-Sicherheit verarbeitet. 
                Wir speichern nie Ihre Kartendaten.
              </p>
            </div>
          </div>
        </div>

        {/* Aktion Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleAddMoney}
            disabled={isLoading || !displayAmount || parseFloat(displayAmount) <= 0}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Wird verarbeitet...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Jetzt €{displayAmount || '0.00'} aufladen
              </>
            )}
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 font-medium py-4 rounded-xl hover:bg-gray-50 transition"
          >
            Abbrechen
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-gray-500 space-y-2">
          <p>
            Durch Klicken auf "Aufladen" stimmen Sie unseren 
            <a href="#" className="text-blue-600 hover:text-blue-700 ml-1">AGB</a> und 
            <a href="#" className="text-blue-600 hover:text-blue-700 ml-1">Datenschutzrichtlinien</a> zu.
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center">
              <Shield className="w-3 h-3 mr-1" /> SSL Secure
            </span>
            <span>•</span>
            <span>PCI DSS compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}