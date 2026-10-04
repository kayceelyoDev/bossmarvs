import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContextType, AppSummary, Budget, Category, Transaction } from '../types';
import { DEFAULT_CATEGORIES } from '../constants/theme';

// Storage keys versioned to ensure clean slate with no residual sample data
const STORAGE_KEYS = {
  TRANSACTIONS: '@bossmarvs_v2_transactions',
  BUDGETS: '@bossmarvs_v2_budgets',
  CATEGORIES: '@bossmarvs_v2_categories',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Fresh, empty state — zero sample data
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);

  // Load existing user data from AsyncStorage
  useEffect(() => {
    async function loadData() {
      try {
        const [storedTx, storedBudgets, storedCats] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS),
          AsyncStorage.getItem(STORAGE_KEYS.BUDGETS),
          AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES),
        ]);

        if (storedTx) {
          setTransactions(JSON.parse(storedTx));
        } else {
          setTransactions([]); // Clean zero state
        }

        if (storedBudgets) {
          setBudgets(JSON.parse(storedBudgets));
        } else {
          setBudgets([]); // Clean zero state
        }

        if (storedCats) {
          setCategories(JSON.parse(storedCats));
        } else {
          setCategories(DEFAULT_CATEGORIES);
        }
      } catch (error) {
        console.error('Failed to load storage data:', error);
        setTransactions([]);
        setBudgets([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
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

  const clearAllData = async () => {
    setTransactions([]);
    setBudgets([]);
    await AsyncStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    await AsyncStorage.removeItem(STORAGE_KEYS.BUDGETS);
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
        clearAllData,
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
