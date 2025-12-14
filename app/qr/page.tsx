'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, QrCode as QrCodeIcon, Download, Share2, Copy, Euro } from 'lucide-react';
import QRCode from 'react-qr-code';

export default function QRPage() {
  const [amount, setAmount] = useState('50.00');
  const [message, setMessage] = useState('');
  const [qrData, setQrData] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);

  // QR Code Daten generieren
  const generateQRData = () => {
    const data = {
      type: 'payment_request',
      amount: parseFloat(amount),
      currency: 'EUR',
      timestamp: new Date().toISOString(),
      message: message || undefined,
      account: 'demo@moneyflow.app'
    };
    return JSON.stringify(data);
  };

  // QR Code herunterladen
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `moneyflow-qr-${amount}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  // QR Code teilen
  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MoneyFlow QR Code',
          text: `Scannen Sie diesen QR-Code, um €${amount} zu senden`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(
        `MoneyFlow Zahlungsanfrage: €${amount}${message ? ` - ${message}` : ''}`
      );
      alert('Link in Zwischenablage kopiert!');
    }
  };

  // Schnellbeträge
  const quickAmounts = [5, 10, 20, 50, 100, 200];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <a
              href="/"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:shadow transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="text-2xl font-bold text-gray-900 ml-3">QR Bezahlung</h1>
          </div>
          <p className="text-gray-600">
            Generieren Sie einen QR-Code zum Geld empfangen
          </p>
        </header>

        {/* QR Code Anzeige */}
        <div className="bg-white rounded-3xl p-8 shadow-xl text-center mb-6">
          <div className="mb-6">
            <div 
              ref={qrRef}
              className="w-64 h-64 mx-auto bg-white p-4 rounded-2xl shadow-inner flex items-center justify-center"
            >
              <QRCode
                value={generateQRData()}
                size={200}
                level="H"
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Euro className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-2xl font-bold">{amount}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Scannen zum Bezahlen</p>
          </div>

          {/* Betrag eingeben */}
          <div className="space-y-4">
            <div>
              <label className="block text-left text-gray-700 mb-2 font-medium">
                Betrag (€)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">€</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-lg font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                />
              </div>
            </div>

            {/* Schnellbeträge */}
            <div>
              <label className="block text-left text-gray-700 mb-2 text-sm">
                Schnellbeträge
              </label>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value.toString())}
                    className={`py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      amount === value.toString()
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    €{value}
                  </button>
                ))}
              </div>
            </div>

            {/* Nachricht */}
            <div>
              <label className="block text-left text-gray-700 mb-2 font-medium">
                Nachricht (optional)
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="z.B. Für Pizza, Miete, etc."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Aktionen */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button
            onClick={downloadQRCode}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center space-y-2 hover:shadow-md transition"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Download</span>
          </button>

          <button
            onClick={shareQRCode}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center space-y-2 hover:shadow-md transition"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Share2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium">Teilen</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(generateQRData());
              alert('QR-Code Daten kopiert!');
            }}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center space-y-2 hover:shadow-md transition"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Copy className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium">Kopieren</span>
          </button>
        </div>

        {/* Anleitung */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center">
            <QrCodeIcon className="w-5 h-5 mr-2 text-blue-600" />
            So funktioniert's:
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                1
              </span>
              <span>Betrag eingeben und optional eine Nachricht hinzufügen</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                2
              </span>
              <span>QR-Code dem Zahlenden zeigen</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                3
              </span>
              <span>Zahlung wird nach dem Scannen automatisch verarbeitet</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                4
              </span>
              <span>Geld ist sofort auf Ihrem Konto verfügbar</span>
            </li>
          </ol>
        </div>

        {/* Sicherheitshinweis */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Sicherheitshinweis:</strong> Teilen Sie QR-Codes nur mit vertrauenswürdigen Personen. 
            Jeder mit diesem Code kann Ihnen Geld senden.
          </p>
        </div>
      </div>
    </div>
  );
}