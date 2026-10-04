import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContextType, AppSummary, Budget, Category, Transaction } from '../types';
import { DEFAULT_CATEGORIES } from '../constants/theme';

const STORAGE_KEYS = {
  TRANSACTIONS: '@bossmarvs_transactions',
  BUDGETS: '@bossmarvs_budgets',
  CATEGORIES: '@bossmarvs_categories',
};

const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Monthly Paycheck',
    amount: 3200.00,
    type: 'income',
    category: 'Salary',
    date: '2026-10-01',
    notes: 'Direct deposit',
    createdAt: Date.now() - 3 * 86400000,
  },
  {
    id: 'tx-2',
    title: 'Supermarket Groceries',
    amount: 145.50,
    type: 'expense',
    category: 'Groceries',
    date: '2026-10-02',
    notes: 'Weekly pantry restock',
    createdAt: Date.now() - 2 * 86400000,
  },
  {
    id: 'tx-3',
    title: 'Dinner at Italian Bistro',
    amount: 68.20,
    type: 'expense',
    category: 'Food & Dining',
    date: '2026-10-02',
    notes: 'Dinner with friends',
    createdAt: Date.now() - 2 * 86400000,
  },
  {
    id: 'tx-4',
    title: 'Metro & Train Card Top-up',
    amount: 45.00,
    type: 'expense',
    category: 'Transportation',
    date: '2026-10-03',
    notes: 'Monthly commuter card',
    createdAt: Date.now() - 1 * 86400000,
  },
  {
    id: 'tx-5',
    title: 'Home High-Speed Internet',
    amount: 65.00,
    type: 'expense',
    category: 'Utilities & Bills',
    date: '2026-10-03',
    notes: 'Monthly fiber bill',
    createdAt: Date.now() - 1 * 86400000,
  },
  {
    id: 'tx-6',
    title: 'Web Design Project',
    amount: 450.00,
    type: 'income',
    category: 'Freelance',
    date: '2026-10-04',
    notes: 'Client landing page payment',
    createdAt: Date.now() - 12 * 3600000,
  },
  {
    id: 'tx-7',
    title: 'Cinema & Popcorn',
    amount: 28.50,
    type: 'expense',
    category: 'Entertainment',
    date: '2026-10-04',
    notes: 'Weekend movie night',
    createdAt: Date.now() - 4 * 3600000,
  },
];

const SEED_BUDGETS: Budget[] = [
  { id: 'b-1', category: 'Food & Dining', limit: 300, period: 'monthly' },
  { id: 'b-2', category: 'Groceries', limit: 400, period: 'monthly' },
  { id: 'b-3', category: 'Transportation', limit: 120, period: 'monthly' },
  { id: 'b-4', category: 'Utilities & Bills', limit: 150, period: 'monthly' },
  { id: 'b-5', category: 'Entertainment', limit: 100, period: 'monthly' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate data from AsyncStorage on load
  useEffect(() => {
    async function loadStoredData() {
      try {
        const [storedTx, storedBudgets, storedCats] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS),
          AsyncStorage.getItem(STORAGE_KEYS.BUDGETS),
          AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES),
        ]);

        if (storedTx) {
          setTransactions(JSON.parse(storedTx));
        } else {
          // Initialize with seed data on first run
          setTransactions(SEED_TRANSACTIONS);
          await AsyncStorage.setItem(
            STORAGE_KEYS.TRANSACTIONS,
            JSON.stringify(SEED_TRANSACTIONS)
          );
        }

        if (storedBudgets) {
          setBudgets(JSON.parse(storedBudgets));
        } else {
          setBudgets(SEED_BUDGETS);
          await AsyncStorage.setItem(
            STORAGE_KEYS.BUDGETS,
            JSON.stringify(SEED_BUDGETS)
          );
        }

        if (storedCats) {
          setCategories(JSON.parse(storedCats));
        } else {
          setCategories(DEFAULT_CATEGORIES);
          await AsyncStorage.setItem(
            STORAGE_KEYS.CATEGORIES,
            JSON.stringify(DEFAULT_CATEGORIES)
          );
        }
      } catch (error) {
        console.error('Failed to load local budget data:', error);
        // Fallback to seed
        setTransactions(SEED_TRANSACTIONS);
        setBudgets(SEED_BUDGETS);
        setCategories(DEFAULT_CATEGORIES);
      } finally {
        setIsLoading(false);
      }
    }

    loadStoredData();
  }, []);

  const addTransaction = async (txData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTx: Transaction = {
      ...txData,
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: Date.now(),
    };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
  };

  const updateTransaction = async (tx: Transaction) => {
    const updated = transactions.map((item) => (item.id === tx.id ? tx : item));
    setTransactions(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
  };

  const deleteTransaction = async (id: string) => {
    const updated = transactions.filter((item) => item.id !== id);
    setTransactions(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
  };

  const setBudget = async (budgetData: Omit<Budget, 'id'>) => {
    const existingIndex = budgets.findIndex((b) => b.category === budgetData.category);
    let updated: Budget[];

    if (existingIndex >= 0) {
      updated = [...budgets];
      updated[existingIndex] = {
        ...updated[existingIndex],
        ...budgetData,
      };
    } else {
      const newBudget: Budget = {
        ...budgetData,
        id: `b-${Date.now()}`,
      };
      updated = [...budgets, newBudget];
    }

    setBudgets(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(updated));
  };

  const deleteBudget = async (id: string) => {
    const updated = budgets.filter((b) => b.id !== id);
    setBudgets(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(updated));
  };

  const getCategorySpent = (category: string): number => {
    return transactions
      .filter((t) => t.type === 'expense' && t.category.toLowerCase() === category.toLowerCase())
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getSummary = (): AppSummary => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
    };
  };

  const resetToSeedData = async () => {
    setTransactions(SEED_TRANSACTIONS);
    setBudgets(SEED_BUDGETS);
    setCategories(DEFAULT_CATEGORIES);
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(SEED_TRANSACTIONS));
    await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(SEED_BUDGETS));
    await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        budgets,
        categories,
        isLoading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        setBudget,
        deleteBudget,
        getCategorySpent,
        getSummary,
        resetToSeedData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
