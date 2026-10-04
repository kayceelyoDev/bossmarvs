import { Category } from '../types';

export const COLORS = {
  primary: '#2563EB',      // Modern royal blue
  primaryLight: '#EFF6FF',
  background: '#F8FAFC',   // Clean off-white / light slate
  surface: '#FFFFFF',      // Pure white for cards
  text: '#0F172A',         // High-contrast slate 900
  textMuted: '#64748B',    // Slate 500
  textSubtle: '#94A3B8',   // Slate 400
  border: '#E2E8F0',       // Light border slate 200

  // Financial indicators
  income: '#10B981',       // Emerald 500
  incomeLight: '#ECFDF5',
  expense: '#EF4444',      // Red 500
  expenseLight: '#FEF2F2',

  // Alert & Status colors
  warning: '#F59E0B',      // Amber 500
  warningLight: '#FFFBEB',
  danger: '#DC2626',       // Red 600
  dangerLight: '#FEF2F2',
  success: '#10B981',

  tabBarActive: '#2563EB',
  tabBarInactive: '#94A3B8',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};

export const DEFAULT_CATEGORIES: Category[] = [
  // Expense Categories
  { id: 'cat-1', name: 'Food & Dining', icon: 'restaurant-outline', color: '#F97316', type: 'expense' },
  { id: 'cat-2', name: 'Groceries', icon: 'cart-outline', color: '#10B981', type: 'expense' },
  { id: 'cat-3', name: 'Transportation', icon: 'car-outline', color: '#3B82F6', type: 'expense' },
  { id: 'cat-4', name: 'Housing & Rent', icon: 'home-outline', color: '#8B5CF6', type: 'expense' },
  { id: 'cat-5', name: 'Utilities & Bills', icon: 'flash-outline', color: '#EAB308', type: 'expense' },
  { id: 'cat-6', name: 'Entertainment', icon: 'film-outline', color: '#EC4899', type: 'expense' },
  { id: 'cat-7', name: 'Shopping', icon: 'bag-handle-outline', color: '#06B6D4', type: 'expense' },
  { id: 'cat-8', name: 'Health & Fitness', icon: 'fitness-outline', color: '#14B8A6', type: 'expense' },
  { id: 'cat-9', name: 'Personal Care', icon: 'sparkles-outline', color: '#F43F5E', type: 'expense' },

  // Income Categories
  { id: 'cat-10', name: 'Salary', icon: 'cash-outline', color: '#10B981', type: 'income' },
  { id: 'cat-11', name: 'Freelance', icon: 'laptop-outline', color: '#3B82F6', type: 'income' },
  { id: 'cat-12', name: 'Investments', icon: 'trending-up-outline', color: '#8B5CF6', type: 'income' },
  { id: 'cat-13', name: 'Other Income', icon: 'gift-outline', color: '#F59E0B', type: 'income' },
];
