export type TransactionType = 'expense' | 'income';

export interface Category {
  id: string;
  name: string;
  icon: string; // Ionicons icon name
  color: string;
  type: TransactionType;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;     // ISO YYYY-MM-DD
  notes?: string;
  createdAt: number;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  period: 'monthly' | 'weekly';
}

export interface AppSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
}

export interface AppContextType {
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
  isLoading: boolean;
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
  updateTransaction: (tx: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  setBudget: (budget: Omit<Budget, 'id'>) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  getCategorySpent: (category: string) => number;
  getSummary: () => AppSummary;
  clearAllData: () => Promise<void>;
}
