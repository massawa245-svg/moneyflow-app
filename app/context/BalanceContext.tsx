// app/context/BalanceContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BalanceContextType {
  balance: number;
  addMoney: (amount: number) => void;
  sendMoney: (amount: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(500.00);

  const addMoney = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const sendMoney = (amount: number) => {
    setBalance(prev => prev - amount);
  };

  return (
    <BalanceContext.Provider value={{ balance, addMoney, sendMoney }}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within BalanceProvider');
  }
  return context;
}