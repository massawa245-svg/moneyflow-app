'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface BalanceContextType {
  balance: number;
  addMoney: (amount: number) => void;
  sendMoney: (amount: number) => void;
  isLoading: boolean;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState<number>(1250.50);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading balance from API
  useEffect(() => {
    const savedBalance = localStorage.getItem('moneyflow-balance');
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
    setIsLoading(false);
  }, []);

  const addMoney = (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    localStorage.setItem('moneyflow-balance', newBalance.toString());
  };

  const sendMoney = (amount: number) => {
    if (balance >= amount) {
      const newBalance = balance - amount;
      setBalance(newBalance);
      localStorage.setItem('moneyflow-balance', newBalance.toString());
      return true;
    }
    return false;
  };

  return (
    <BalanceContext.Provider value={{ balance, addMoney, sendMoney, isLoading }}>
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